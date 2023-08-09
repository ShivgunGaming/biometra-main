import React, { useState } from "react";
import { Button, Image, Box, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { motion, useCycle } from "framer-motion"; // Import useCycle for toggling animations
import bioname from "../biometra.png";
import bionameDark from "../biometradark.png";

function Home({ darkMode }) {
  const navigate = useNavigate();
  const [isBouncing, setIsBouncing] = useState(false);

  // Use useCycle to toggle between spinning and not spinning
  const [isSpinning, toggleIsSpinning] = useCycle(false, true);

  const logoImage = darkMode ? bionameDark : bioname;

  const handleImageClick = () => {
    if (!isBouncing) {
      setIsBouncing(true);
      setTimeout(() => {
        setIsBouncing(false);
        toggleIsSpinning(); // Toggle spinning after bounce
      }, 1000);
    } else {
      toggleIsSpinning(); // Toggle spinning on each click after bounce
    }
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
        animate={[
          { scale: isBouncing ? 1.2 : 1 }, // Bounce animation
          { rotate: isSpinning ? 360 : 0 }, // Spin animation
        ]}
        transition={[
          { type: "spring", stiffness: 300, damping: 10 },
          { duration: 1 }, // Spin duration
        ]}
      >
        <Image src={logoImage} alt="logo" maxWidth="220px" mb="7" />
      </motion.div>

      <Text fontSize="xl" fontWeight="bold" mb="4">
        Welcome Back!
      </Text>

      <Button
        onClick={() => navigate("/yourwallet")}
        colorScheme="blue"
        size="lg"
        width="100%"
        mb="7" // Add spacing here
      >
        Create Wallet
      </Button>

      <Button
        onClick={() => navigate("/recover")}
        size="lg"
        width="100%"
        variant="solid"
        mb="7" // Add spacing here
      >
        Unlock Wallet
      </Button>

      <Box my="4">
        {" "}
        {/* Added margin on Y-axis */}
        <Text fontSize="sm" fontWeight="bold">
          Copyright © Biometra
        </Text>
      </Box>
    </Box>
  );
}

export default Home;
