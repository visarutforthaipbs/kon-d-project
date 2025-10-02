import { useEffect, useRef } from "react";
import { Box } from "@chakra-ui/react";
import cloud from "d3-cloud";

interface WordData {
  text: string;
  value: number;
}

interface WordCloudProps {
  words: WordData[];
}

const WordCloudCanvas = ({ words }: WordCloudProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!words.length || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d")!;
    const width = canvas.width;
    const height = canvas.height;

    // Clear canvas
    context.clearRect(0, 0, width, height);

    // Prepare words for d3-cloud
    const maxValue = Math.max(...words.map((w) => w.value));
    const minValue = Math.min(...words.map((w) => w.value));

    const wordsWithSize = words.map((word) => ({
      text: word.text,
      size: Math.max(
        14,
        Math.min(
          32,
          14 + ((word.value - minValue) / (maxValue - minValue || 1)) * 18
        )
      ), // Smaller size range for sentences
      value: word.value,
    }));

    const layout = cloud()
      .size([width, height])
      .words(wordsWithSize)
      .padding(8) // More padding for sentences
      .rotate(() => 0) // No rotation for better readability of sentences
      .font("Bai Jamjuree, Arial, sans-serif") // Use custom font
      .fontSize((d) => d.size || 14)
      .on("end", (words) => {
        // Draw words
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.fillStyle = "#fd4420";

        words.forEach((word) => {
          if (word.x && word.y && word.text) {
            context.save();
            context.translate(word.x + width / 2, word.y + height / 2);
            if (word.rotate) {
              context.rotate((word.rotate * Math.PI) / 180);
            }
            context.font = `${word.size}px Bai Jamjuree, Arial, sans-serif`;
            context.fillText(word.text, 0, 0);
            context.restore();
          }
        });
      });

    layout.start();
  }, [words]);

  return (
    <Box
      w="100%"
      h="400px"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <canvas
        ref={canvasRef}
        width={800}
        height={400}
        style={{
          maxWidth: "100%",
          height: "auto",
          border: "1px solid #e2e8f0",
          borderRadius: "8px",
        }}
      />
    </Box>
  );
};

export default WordCloudCanvas;
