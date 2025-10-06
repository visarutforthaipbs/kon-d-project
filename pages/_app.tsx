import type { AppProps } from "next/app";
import Head from "next/head";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "@/theme";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>แบบสำรวจความเห็น Good Society Day 2025</title>
        <link rel="icon" href="/image/logos/mainlogo.png" />
        <meta
          name="description"
          content="จัดทำแบบสำรวจโดยทีม PI ภายใต้โครงการ Good Society Day 2025 ที่ไทยพีบีเอสร่วมกับภาคีเครือข่าย"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* Preload custom fonts */}
        <link
          rel="preload"
          href="/fonts/BaiJamjuree-Bold.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />
      </Head>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </>
  );
}
