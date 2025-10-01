import type { AppProps } from "next/app";
import Head from "next/head";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "@/theme";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>เสียงเยาวชนไทย - สำรวจความคิดเห็น</title>
        <link rel="icon" href="/image/logos/mainlogo.png" />
        <meta
          name="description"
          content="สำรวจความคิดเห็น 2 คำถาม เพื่อสะท้อนภาพรวมสังคม"
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
        <link
          rel="preload"
          href="/fonts/Montserrat-SemiBold.ttf"
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
