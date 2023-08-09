import React from "react";
import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { Image } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";

import bioname from "../biometra.png";
import bionameDark from "../biometradark.png";

function Home({ darkMode }) {
  const navigate = useNavigate();
  const logoImage = darkMode ? bionameDark : bioname;

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      height="100vh"
      px="4" // Horizontal padding
      my="4" // Margin on Y-axis
      mx="4" // Margin on Y-axis
      p="4"
      borderRadius="lg"
      boxShadow="md"
    >
        <Image src={logoImage} alt="logo" maxWidth="250px" mb="7" />

        <Text fontSize="xl" fontWeight="bold" mb="4">
          Welcome Back!
        </Text>

        <Button
          onClick={() => navigate("/yourwallet")}
          colorScheme="blue"
          size="lg"
          width="100%"
          mb="2"
        >
          Create A Wallet
        </Button>

        <Button
          onClick={() => navigate("/recover")}
          size="lg"
          width="100%"
          variant="outline"
          mb="2"
        >
          Sign In With Seed Phrase
        </Button>

      <Box my="4"> {/* Added margin on Y-axis */}
        <Text fontSize="sm">
          Copyright © Biometra
        </Text>
      </Box>
    </Box>
  );
}

export default Home;
