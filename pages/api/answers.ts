import type { NextApiRequest, NextApiResponse } from "next";
import crypto from "crypto";
import dbConnect from "@/lib/db";
import Answer from "@/models/Answer";

// In-memory rate limiting (simple approach)
const ipLastSeen = new Map<string, number>();
const RATE_LIMIT_WINDOW = 10000; // 10 seconds

// Thai tokenizer function
const tokenizeThaiText = (text: string): string[] => {
  if (!text.trim()) return [];

  // Thai stopwords
  const stopwords = new Set([
    "แล้ว",
    "และ",
    "ที่",
    "เป็น",
    "การ",
    "ใน",
    "มี",
    "จะ",
    "ได้",
    "ของ",
    "กับ",
    "ให้",
    "ใช้",
    "ไป",
    "มา",
    "อยู่",
    "คือ",
    "ผม",
    "ฉัน",
    "เรา",
    "เขา",
    "เธอ",
    "มัน",
    "นี้",
    "นั้น",
    "อัน",
    "บ้าง",
    "เอา",
    "ทำ",
    "เลย",
    "ค่ะ",
    "ครับ",
    "นะ",
    "จ้า",
    "ละ",
    "ด้วย",
    "แต่",
    "หรือ",
    "ก็",
    "เถอะ",
  ]);

  try {
    // Check if Intl.Segmenter is available
    if (typeof (Intl as any).Segmenter !== "undefined") {
      const segmenter = new (Intl as any).Segmenter("th", {
        granularity: "word",
      });
      const segments = Array.from(segmenter.segment(text));

      const tokens = segments
        .map((segment: any) => segment.segment.trim())
        .filter((token: string) => {
          if (!token || token.length < 2) return false;
          if (
            /^[\s\u0E00-\u0E7F\p{P}\p{N}]*$/u.test(token) &&
            !/[\u0E00-\u0E7F]/.test(token)
          )
            return false;
          if (stopwords.has(token)) return false;
          return true;
        })
        .slice(0, 200);

      return tokens;
    }
  } catch (error) {
    console.warn("Intl.Segmenter not available, using fallback");
  }

  // Fallback tokenization
  return text
    .split(
      /[\s\u0020-\u002F\u003A-\u0040\u005B-\u0060\u007B-\u007E\u0E2F\u0E3F\u0E4F\u0E5A-\u0E5B]+/
    )
    .filter((token) => {
      if (!token || token.length < 2) return false;
      if (stopwords.has(token)) return false;
      return /[\u0E00-\u0E7F]/.test(token); // Contains Thai characters
    })
    .slice(0, 200);
};

function getClientIP(req: NextApiRequest): string {
  const forwarded = req.headers["x-forwarded-for"];
  const ip = forwarded
    ? Array.isArray(forwarded)
      ? forwarded[0]
      : forwarded.split(",")[0]
    : req.socket.remoteAddress || "unknown";
  return ip;
}

function hashIP(ip: string): string {
  return crypto.createHash("sha256").update(ip).digest("hex").slice(0, 16);
}

function checkRateLimit(ipHash: string): boolean {
  const now = Date.now();
  const lastSeen = ipLastSeen.get(ipHash);

  if (lastSeen && now - lastSeen < RATE_LIMIT_WINDOW) {
    return false; // Rate limited
  }

  ipLastSeen.set(ipHash, now);
  return true;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  if (req.method === "POST") {
    try {
      const { questionId, text } = req.body;

      // Validation
      if (!questionId || !["q1", "q2"].includes(questionId)) {
        return res.status(400).json({ error: "Invalid questionId" });
      }

      if (!text || typeof text !== "string" || !text.trim()) {
        return res.status(400).json({ error: "Text is required" });
      }

      if (text.length > 1000) {
        return res.status(400).json({ error: "Text too long" });
      }

      // Rate limiting
      const clientIP = getClientIP(req);
      const ipHash = hashIP(clientIP);

      if (!checkRateLimit(ipHash)) {
        return res.status(429).json({ error: "Rate limit exceeded" });
      }

      // Tokenize text
      const tokens = tokenizeThaiText(text.trim());

      // Save answer
      const answer = new Answer({
        questionId,
        text: text.trim(),
        tokens,
        ipHash,
        ua: req.headers["user-agent"]?.slice(0, 500),
      });

      await answer.save();

      res.status(201).json({ ok: true, id: answer._id });
    } catch (error) {
      console.error("Error saving answer:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  } else if (req.method === "GET") {
    try {
      const { questionId } = req.query;

      if (!questionId || !["q1", "q2"].includes(questionId as string)) {
        return res.status(400).json({ error: "Invalid questionId" });
      }

      // Aggregate full text entries instead of tokens
      const aggregation = await Answer.aggregate([
        { $match: { questionId } },
        {
          $group: {
            _id: "$text",
            value: { $sum: 1 },
          },
        },
        { $sort: { value: -1 } },
        { $limit: 50 }, // Show top 50 full sentences
        {
          $project: {
            _id: 0,
            text: "$_id",
            value: 1,
          },
        },
      ]);

      const words = aggregation.map((item) => ({
        text: item.text,
        value: item.value,
      }));

      res.status(200).json({ words });
    } catch (error) {
      console.error("Error fetching words:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).json({ error: "Method not allowed" });
  }
}
