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
      <div className="mnemonic">
        <Icon boxSize={8} color="red.500" />
        <div>
          {" "}
          Type your seed phrase in the field below to recover your wallet (it
          should include 12 words separated with spaces){" "}
        </div>
      </div>
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
      {nonValid && <Text color="red.500">Invalid Seed Phrase</Text>}
      <Text
        color="blue.500"
        textDecoration="underline"
        cursor="pointer"
        onClick={() => navigate("/")}
      >
        Back Home
      </Text>
    </VStack>
  );
}

export default RecoverAccount;
