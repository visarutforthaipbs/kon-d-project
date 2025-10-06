import { useRouter } from "next/router";
import { Container, VStack } from "@chakra-ui/react";
import useSWR from "swr";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import QuestionCard from "@/components/QuestionCard";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Q1Page() {
  const router = useRouter();

  const { data, error } = useSWR("/api/answers?questionId=q1", fetcher, {
    refreshInterval: 8000,
    revalidateOnFocus: false,
  });

  const words = data?.words || [];

  const handleNext = () => {
    router.push("/q2");
  };

  return (
    <VStack minH="100vh" spacing={0}>
      <Header />

      <Container maxW="6xl" flex="1" py={8}>
        <QuestionCard
          question="1) ความดีคืออะไร"
          questionId="q1"
          words={words}
          onNext={handleNext}
          showNext={true}
        />
      </Container>

      <Footer />
    </VStack>
  );
}
