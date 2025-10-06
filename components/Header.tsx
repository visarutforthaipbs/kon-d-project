import { Box, Heading, Text, Image, Link } from "@chakra-ui/react";
import { keyframes } from "@emotion/react";

const float = keyframes`
  0%, 100% { transform: translateY(0px) rotate(-10deg); }
  50% { transform: translateY(-10px) rotate(-8deg); }
`;

const pulse = keyframes`
  0%, 100% { transform: scale(1) rotate(-10deg); }
  50% { transform: scale(1.05) rotate(-8deg); }
`;

const Header = () => {
  return (
    <Box bg="brand.orange" color="white" p={6} textAlign="center" width="100%">
      <Image
        src="/image/logos/mainlogo.png"
        alt="เสียงเยาวชนไทย Logo"
        mx="auto"
        mb={4}
        maxH="150px"
        objectFit="contain"
        animation={`${float} 3s ease-in-out infinite, ${pulse} 2s ease-in-out infinite`}
        _hover={{
          animation: `${pulse} 0.5s ease-in-out infinite`,
          cursor: "pointer",
        }}
        transition="all 0.3s ease"
      />
      <Text fontSize="md" fontWeight="500">
        จัดทำแบบสำรวจ
        <Link
          href="https://www.pubint.site/"
          isExternal
          textDecoration="underline"
          _hover={{ opacity: 0.8 }}
        >
          โดยทีม PI
        </Link>{" "}
        ภายใต้โครงการ Good Society Day 2025 ที่ไทยพีบีเอสร่วมกับภาคีเครือข่าย
      </Text>
    </Box>
  );
};

export default Header;
