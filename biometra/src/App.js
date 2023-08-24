import React, { useState, useCallback } from "react";
import { ChakraProvider, color, CSSReset, extendTheme } from "@chakra-ui/react";
import { Routes, Route } from "react-router-dom";
import { Select } from "antd";
import { motion } from "framer-motion";
import Home from "./components/Home";
import CreateAccount from "./components/CreateAccount.js";
import RecoverAccount from "./components/RecoverAccount.js";
import WalletView from "./components/WalletView.js";
import logoDark from "./biodarklogothree.png";
import "@innovatrics/dot-auto-capture-ui/face";
import "./App.css";

const App = () => {
  const [darkMode, setDarkMode] = useState(true); // Set dark mode as default
  const [wallet, setWallet] = useState(null);
  const [seedPhrase, setSeedPhrase] = useState(null);
  const [selectedChain, setSelectedChain] = useState("0x1");

  const handleFacePhotoTaken = (image, resolution) => {
    console.log("Face image:", image);
    console.log("Resolution:", resolution);
  };

  const customTheme = extendTheme({
    components: {
      Select: {
        baseStyle: {
          _hover: {
            borderColor: "pink",
          },
          _focus: {
            borderColor: "pink",
          },
        },
      },
    },
  });  

  const handleError = useCallback((error) => {
    alert(error);
  }, []);

  const handleChainChange = (val) => {
    setSelectedChain(val);
  };

  const headerLogoVariants = {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
  };

  const renderRoutes = () => {
    if (wallet && seedPhrase) {
      return (
        <Route
          path="/yourwallet"
          element={
            <WalletView
              wallet={wallet}
              setWallet={setWallet}
              seedPhrase={seedPhrase}
              setSeedPhrase={setSeedPhrase}
              selectedChain={selectedChain}
            />
          }
        />
      );
    }

    return (
      <>
        <Route path="/" element={<Home darkMode={darkMode} />} />
        <Route
          path="/recover"
          element={
            <RecoverAccount
              setSeedPhrase={setSeedPhrase}
              setWallet={setWallet}
            />
          }
        />
        <Route
          path="/yourwallet"
          element={
            <CreateAccount
              setSeedPhrase={setSeedPhrase}
              setWallet={setWallet}
            />
          }
        />
      </>
    );
  };

  return (
    <ChakraProvider>
      <CSSReset />
      <div className={`App ${darkMode ? "dark" : "light"}`}>
        <header>
          <div className="headerContent">
            {/* Apply the animation to the headerLogo */}
            <motion.img
              src={logoDark}
              className="headerLogo"
              alt="logo"
              variants={headerLogoVariants}
              initial="initial"
              animate="animate"
            />
            <Select
              theme={customTheme}
              dropdownStyle={{
                backgroundColor: "#333333",
                color: "#ffffff",
                border: "1px solid pink",
              }}
              style={{ color: "#ffffff" }}
              onChange={handleChainChange}
              value={selectedChain}
              options={[
                { label: "Ethereum", value: "0x1" },
                { label: "Avalanche", value: "0xa86a" },
                { label: "Binance", value: "0x38" },
              ]}
              className={`dropdown ${darkMode ? "dark" : ""}`}
              _hover={{
                borderColor: "pink",
              }}
              _focus={{
                borderColor: "pink",
              }}
            />
          </div>
        </header>
        <div className="content">
          <Routes>{renderRoutes()}</Routes>
        </div>
      </div>
    </ChakraProvider>
  );  
};

export default App;
