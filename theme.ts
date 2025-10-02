import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  fonts: {
    heading:
      'Bai Jamjuree, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif',
    body: 'Bai Jamjuree, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif',
  },
  colors: {
    brand: {
      orange: "#fd4420",
      sand: "#ffe5b6",
    },
  },
  styles: {
    global: {
      "@font-face": [
        {
          fontFamily: "Bai Jamjuree",
          fontStyle: "normal",
          fontWeight: "700",
          fontDisplay: "swap",
          src: "url('/fonts/BaiJamjuree-Bold.ttf') format('truetype')",
        },
      ],
      body: {
        bg: "brand.sand",
        color: "#1a202c",
        fontSize: "16px",
        fontFamily: "body",
        backgroundImage: `
          linear-gradient(rgba(255, 229, 182, 0.1), rgba(255, 229, 182, 0.1)),
          url('/image/logos/11Asset%201fung-favicon.svg')
        `,
        backgroundRepeat: "repeat",
        backgroundSize: "auto, 200px 200px",
        backgroundAttachment: "fixed",
      },
    },
  },
  components: {
    Button: {
      baseStyle: {
        borderRadius: "2xl",
        fontSize: "16px",
        fontWeight: "700",
        fontFamily: "body",
      },
      variants: {
        solid: {
          bg: "brand.orange",
          color: "white",
          _hover: {
            bg: "#e03e1c",
          },
          _focus: {
            boxShadow: "0 0 0 3px rgba(253, 68, 32, 0.6)",
          },
        },
      },
    },
    Card: {
      baseStyle: {
        container: {
          borderRadius: "2xl",
          boxShadow: "md",
          bg: "white",
          p: 6,
        },
      },
    },
  },
});

export default theme;
