import React, { useState } from "react";
import { Button, Input, Text, Textarea, VStack, Icon } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";

const { TextArea } = Input;

function RecoverAccount({ setWallet, setSeedPhrase }) {
  const navigate = useNavigate();
  const [typedSeed, setTypedSeed] = useState("");
  const [nonValid, setNonValid] = useState(false);

  const seedAdjust = (e) => {
    setNonValid(false);
    setTypedSeed(e.target.value);
  };

  const recoverWallet = () => {
    let recoveredWallet;
    try {
      recoveredWallet = ethers.Wallet.fromPhrase(typedSeed);
    } catch (err) {
      setNonValid(true);
      return;
    }

    setSeedPhrase(typedSeed);
    setWallet(recoveredWallet.address);
    navigate("/yourwallet");
  };

  return (
    <VStack spacing={4} align="center" p={4}>
      <VStack align="center">
        <Icon boxSize={8} color="red.500" />
        <Text>Enter your 12 word seed phrase, seperated by spaces below to log in!</Text>
      </VStack>
      <Textarea
        value={typedSeed}
        onChange={seedAdjust}
        rows={4}
        variant="filled"
        className="seedPhraseContainer"
      />
      <Button
        disabled={
          typedSeed.split(" ").length !== 12 || typedSeed.slice(-1) === " "
        }
        colorScheme="pink"
        size="lg"
        className="frontPageRecoverButton"
        onClick={recoverWallet}
      >
        Recover Wallet
      </Button>
      {nonValid && <Text color="red.500" fontWeight="bold">Invalid Seed Phrase</Text>}
      <Text
        color="pink.500"
        textDecoration="underline"
        fontWeight="bold"
        cursor="pointer"
        _hover={{ color: "pink.700", textDecoration: "underline" }}
        onClick={() => navigate("/")}
      >
        Back Home
      </Text>
    </VStack>
  );
}

export default RecoverAccount;
