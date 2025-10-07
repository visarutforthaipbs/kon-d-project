import {
  Box,
  Text,
  Flex,
  Image,
  Link,
  Button,
  Collapse,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";

const Footer = () => {
  const [showQR, setShowQR] = useState(false);

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
      {/* QR Code Section */}
      <VStack spacing={4} mb={6}>
        <Button
          onClick={() => setShowQR(!showQR)}
          variant="outline"
          size="sm"
          color="white"
          borderColor="white"
          _hover={{
            bg: "white",
            color: "brand.orange",
          }}
        >
          {showQR ? "ซ่อน QR Code" : "แสดง QR Code"}
        </Button>

        <Collapse in={showQR} animateOpacity>
          <VStack spacing={3}>
            <Text fontSize="sm" color="white" textAlign="center">
              สแกน QR Code เพื่อเข้าสู่แบบสำรวจ
            </Text>
            <Box bg="white" p={3} borderRadius="lg" shadow="md">
              <Image
                src="/image/logos/Kon-D-Project-QR-code.jpg"
                alt="QR Code สำหรับแบบสำรวจเสียงเยาวชนไทย"
                maxW={{ base: "150px", md: "200px" }}
                objectFit="contain"
              />
            </Box>
          </VStack>
        </Collapse>
      </VStack>

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
              maxH={
                index === 0
                  ? { base: "60px", md: "90px" }
                  : { base: "40px", md: "60px" }
              }
              maxW={
                index === 0
                  ? { base: "120px", md: "180px" }
                  : { base: "80px", md: "120px" }
              }
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
