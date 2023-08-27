import React, { useState, useEffect } from "react";
import { Button, Image, Box, Text, extendTheme } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { motion, useCycle } from "framer-motion";
import bioname from "../biometra.png";
import bionameDark from "../biometradark.png";

// Extract the spinning animation into a constant
const spinningAnimation = { rotate: [0, 360] };

// Define animation transitions
const animationTransitions = [
  { type: "spring", stiffness: 300, damping: 10 },
  { duration: 3 }, // Spin duration
];

function Home({ darkMode }) {
  const navigate = useNavigate();
  const [isSpinning, toggleIsSpinning] = useCycle(false, true);
  const logoImage = darkMode ? bionameDark : bioname;

  const theme = extendTheme({
    styles: {
      global: {
        ".shine-button:hover": {
          background: "linear-gradient(135deg, #f6d365 0%, #fda085 100%)",
          backgroundSize: "200% 200%",
          animation: "shine 1.5s infinite",
        },
        "@keyframes shine": {
          "0%": {
            backgroundPosition: "0% 0%",
          },
          "100%": {
            backgroundPosition: "200% 200%",
          },
        },
      },
    },
  });

  const handleImageClick = () => {
    toggleIsSpinning(); // Toggle spinning on image click
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      height="100vh"
      px="6"
      my="6"
      mx="6"
      p="6"
      borderRadius="lg"
      boxShadow="md"
    >
      <motion.div
        onClick={handleImageClick}
        initial={false}
        animate={isSpinning && spinningAnimation}
        transition={animationTransitions}
      >
        <Image src={logoImage} alt="logo" maxWidth="220px" mb="7" />
      </motion.div>

      <Text fontSize="xl" fontWeight="bold" mb="4">
        Welcome!
      </Text>

      <Button
        onClick={() => navigate("/yourwallet")}
        colorScheme="pink"
        size="lg"
        width="100%"
        mb="7"
        className="shine-button"
      >
        Create Wallet
      </Button>

      <Button
        onClick={() => navigate("/recover")}
        size="lg"
        width="100%"
        variant="outline"
        colorScheme="pink"
        mb="7"
        className="shine-button"
      >
        Unlock Wallet
      </Button>

      <Box my="4">
        <Text fontSize="sm" fontWeight="bold">
          Copyright © Biometra
        </Text>
      </Box>
    </Box>
  );
}

export default Home;
