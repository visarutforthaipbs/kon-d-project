import { Container, VStack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import useSWR from "swr";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import QuestionCard from "@/components/QuestionCard";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Q2Page() {
  const router = useRouter();
  const { data, error } = useSWR("/api/answers?questionId=q2", fetcher, {
    refreshInterval: 8000,
    revalidateOnFocus: false,
  });

  const words = data?.words || [];

  const handleBackToQ1 = () => {
    router.push("/");
  };

  return (
    <VStack minH="100vh" spacing={0}>
      <Header />

      <Container maxW="6xl" flex="1" py={8}>
        <QuestionCard
          question="2) ต้องทำอย่างไรให้สังคมดี"
          questionId="q2"
          words={words}
          showNext={false}
          showBackToQ1={true}
          onBackToQ1={handleBackToQ1}
        />
      </Container>

      <Footer />
    </VStack>
  );
}
