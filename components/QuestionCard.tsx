import { useState } from "react";
import {
  Box,
  Heading,
  Textarea,
  Button,
  VStack,
  HStack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { mutate } from "swr";
import WordCloudCanvas from "./WordCloud";

interface WordData {
  text: string;
  value: number;
}

interface QuestionCardProps {
  question: string;
  questionId: "q1" | "q2";
  words: WordData[];
  onNext?: () => void;
  showNext?: boolean;
  showBackToQ1?: boolean;
  onBackToQ1?: () => void;
}

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
    const segmenter = new Intl.Segmenter("th", { granularity: "word" });
    const segments = Array.from(segmenter.segment(text));

    const tokens = segments
      .map((segment) => segment.segment.trim())
      .filter((token) => {
        // Filter out empty, punctuation, digits, and stopwords
        if (!token || token.length < 2) return false;
        if (/^[\s\p{P}\p{N}]+$/u.test(token)) return false;
        if (stopwords.has(token)) return false;
        return true;
      })
      .slice(0, 200); // Keep first 200 tokens max

    return tokens;
  } catch (error) {
    // Fallback if Intl.Segmenter is not available
    console.warn("Intl.Segmenter not available, using basic tokenization");
    return text
      .split(/[\s\p{P}]+/u)
      .filter((token) => token.length >= 2 && !stopwords.has(token))
      .slice(0, 200);
  }
};

const QuestionCard = ({
  question,
  questionId,
  words,
  onNext,
  showNext,
  showBackToQ1,
  onBackToQ1,
}: QuestionCardProps) => {
  const [text, setText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const toast = useToast();

  // Function to count words in Thai text
  const countWords = (inputText: string): number => {
    if (!inputText.trim()) return 0;

    try {
      const segmenter = new Intl.Segmenter("th", { granularity: "word" });
      const segments = Array.from(segmenter.segment(inputText));

      const words = segments.filter((segment) => {
        const token = segment.segment.trim();
        // Count meaningful words (not punctuation or spaces)
        return token.length > 0 && !/^[\s\p{P}\p{N}]+$/u.test(token);
      });

      return words.length;
    } catch (error) {
      // Fallback: simple word counting
      return inputText
        .trim()
        .split(/[\s\p{P}]+/u)
        .filter((word) => word.length > 0).length;
    }
  };

  // Handle text change with word limit
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    const words = countWords(newText);

    if (words <= 30) {
      setText(newText);
      setWordCount(words);
    } else {
      // Show warning toast if exceeding limit
      toast({
        title: "เกินจำนวนคำที่กำหนด",
        description: "กรุณาใส่ไม่เกิน 30 คำ",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const handleSubmit = async () => {
    if (!text.trim()) {
      toast({
        title: "กรุณาใส่คำตอบ",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (wordCount > 30) {
      toast({
        title: "เกินจำนวนคำที่กำหนด",
        description: "กรุณาใส่ไม่เกิน 30 คำ",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/answers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          questionId,
          text: text.trim(),
        }),
      });

      if (response.ok) {
        setText("");
        setWordCount(0);
        setHasSubmitted(true);
        toast({
          title: "ส่งคำตอบแล้ว",
          description: "ขอบคุณสำหรับความคิดเห็นของคุณ",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        // Refresh the word cloud data
        mutate(`/api/answers?questionId=${questionId}`);
      } else {
        throw new Error("Failed to submit");
      }
    } catch (error) {
      toast({
        title: "เกิดข้อผิดพลาด",
        description: "กรุณาลองใหม่อีกครั้ง",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box
      bg="white"
      borderRadius="2xl"
      boxShadow="md"
      p={6}
      maxW="4xl"
      mx="auto"
    >
      <VStack spacing={6} align="stretch">
        <Heading
          as="h2"
          size="lg"
          textAlign="center"
          color="gray.700"
          fontWeight="700"
        >
          {question}
        </Heading>

        <VStack spacing={4} align="stretch">
          <VStack spacing={2} align="stretch">
            <Textarea
              value={text}
              onChange={handleTextChange}
              placeholder="พิมพ์ความเห็นของคุณสั้น ๆ (ไม่เกิน 30 คำ)"
              size="lg"
              minH="120px"
              maxLength={1000}
              fontSize="16px"
            />
            <Text
              fontSize="sm"
              color={wordCount > 27 ? "red.500" : "gray.500"}
              textAlign="right"
            >
              {wordCount}/30 คำ
            </Text>
          </VStack>

          <HStack spacing={4} justify="center">
            <Button
              onClick={handleSubmit}
              isLoading={isSubmitting}
              loadingText="กำลังส่ง..."
              variant="solid"
              size="lg"
              minW="120px"
            >
              ส่งคำตอบ
            </Button>

            {showNext && onNext && (
              <Button
                onClick={onNext}
                variant="outline"
                size="lg"
                minW="140px"
                borderColor="brand.orange"
                color="brand.orange"
                _hover={{
                  bg: "brand.orange",
                  color: "white",
                }}
              >
                ไปข้อถัดไป →
              </Button>
            )}

            {showBackToQ1 && onBackToQ1 && hasSubmitted && (
              <Button
                onClick={onBackToQ1}
                variant="outline"
                size="lg"
                minW="140px"
                borderColor="brand.orange"
                color="brand.orange"
                _hover={{
                  bg: "brand.orange",
                  color: "white",
                }}
              >
                ← กลับไปข้อแรก
              </Button>
            )}
          </HStack>
        </VStack>

        <VStack spacing={4} align="stretch">
          <Text fontSize="sm" color="gray.600" textAlign="center">
            คำสำคัญจากคำตอบทั้งหมด · อัปเดตอัตโนมัติทุก ~8 วินาที
          </Text>

          <WordCloudCanvas words={words} />
        </VStack>
      </VStack>
    </Box>
  );
};

export default QuestionCard;
