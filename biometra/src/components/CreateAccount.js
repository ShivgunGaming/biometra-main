import React, { useState } from "react";
import {
  Button,
  Card,
  Text,
  Icon,
  VStack,
  Spacer,
  Link,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";

function CreateAccount({ setWallet, setSeedPhrase }) {
  const [newSeedPhrase, setNewSeedPhrase] = useState(null);
  const navigate = useNavigate();

  const generateWallet = () => {
    const mnemonic = ethers.Wallet.createRandom().mnemonic.phrase;
    setNewSeedPhrase(mnemonic);
  };

  const setWalletAndMnemonic = () => {
    setSeedPhrase(newSeedPhrase);
    setWallet(ethers.Wallet.fromPhrase(newSeedPhrase).address);
  };

  return (
    <VStack spacing={4} align="center" p={4} className="content">
      <div className="mnemonic">
        <Icon boxSize={8} color="red.500" />
        <div>Securely save generated seed phrase to recover wallet later!</div>
      </div>
      <Button
        colorScheme="blue"
        size="lg"
        width="100%"
        mb="3" // Adjust this value to control the space
        py={2}
        className="frontPageButton"
        onClick={generateWallet}
      >
        Generate Seed Phrase
      </Button>
      {newSeedPhrase && (
        <Card p={5} className="seedPhraseContainer" maxW="sm">
          <Text as="pre" whiteSpace="pre-wrap" fontSize="sm">
            {newSeedPhrase}
          </Text>
        </Card>
      )}
      <Button
        colorScheme="blue"
        size="lg"
        width="100%"
        mb="7"
        onClick={setWalletAndMnemonic}
        py={2}
      >
        Open Your New Wallet
      </Button>
      <Link
        className="frontPageBottom"
        onClick={() => navigate("/")}
        color="blue.500"
        fontWeight="bold"
        textDecoration="underline"
        _hover={{ color: "blue.700", textDecoration: "underline" }}
      >
        Back Home
      </Link>
      <Spacer />
    </VStack>
  );
}

export default CreateAccount;
