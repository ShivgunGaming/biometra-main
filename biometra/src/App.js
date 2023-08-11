import React, { useState, useCallback } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { Routes, Route } from "react-router-dom";
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

  const handleError = useCallback((error) => {
    alert(error);
  }, []);

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
          element={<RecoverAccount setSeedPhrase={setSeedPhrase} setWallet={setWallet} />}
        />
        <Route
          path="/yourwallet"
          element={<CreateAccount setSeedPhrase={setSeedPhrase} setWallet={setWallet} />}
        />
      </>
    );
  };

  return (
    <ChakraProvider>
      <div className={`App ${darkMode ? "dark" : "light"}`}>
        <header>
          <div className="headerContent">
            <img
              src={logoDark}
              className="headerLogo"
              alt="logo"
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
