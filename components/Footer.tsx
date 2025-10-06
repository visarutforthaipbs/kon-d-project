import { Box, Text, Flex, Image, Link } from "@chakra-ui/react";

const Footer = () => {
  const logos = [
    "/image/logos/Asset 2fung-favicon.png",
    "/image/logos/Asset 3fung-favicon.png",
    "/image/logos/Asset 4fung-favicon.png",
    "/image/logos/Asset 5fung-favicon.png",
    "/image/logos/Asset 6fung-favicon.png",
    "/image/logos/Asset 7fung-favicon.png",
    "/image/logos/Asset 8fung-favicon.png",
  ];

  return (
    <Box as="footer" py={8} px={4} bg="brand.orange" width="100%">
      {/* Partner Logos */}
      <Flex
        justify="center"
        align="center"
        wrap="wrap"
        gap={6}
        mb={6}
        mx="auto"
      >
        {logos.map((logo, index) => (
          <Box key={index} p={2}>
            <Image
              src={logo}
              alt={`Partner logo ${index + 1}`}
              maxH="60px"
              maxW="120px"
              objectFit="contain"
              opacity={0.8}
              _hover={{ opacity: 1 }}
              transition="opacity 0.2s"
            />
          </Box>
        ))}
      </Flex>
    </Box>
  );
};

export default Footer;
