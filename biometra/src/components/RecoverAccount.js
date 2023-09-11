import React, { useState } from "react";
import { Button, Input, Text, Textarea, VStack, Icon } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";
import PassageAuth from "./PassageAuth"; // Import your PassageAuth component

const { TextArea } = Input;

function RecoverAccount({ setWallet, setSeedPhrase }) {
  const navigate = useNavigate();
  const [typedSeed, setTypedSeed] = useState("");
  const [nonValid, setNonValid] = useState(false);
  const [showPassage, setShowPassage] = useState(false); // Control whether to show Passage

  const seedAdjust = (e) => {
    setNonValid(false);
    setTypedSeed(e.target.value);
  };

  const handleSeedSubmission = () => {
    // Check the seed phrase and show Passage if it's valid
    if (typedSeed.split(" ").length === 12 && typedSeed.slice(-1) !== " ") {
      setShowPassage(true);
    } else {
      setNonValid(true);
    }
  };

  const handleAuthenticate = (eventDetail) => {
    // Handle authentication here, for example, by updating state or navigating to the wallet page.
    console.log("User authenticated with Passage", eventDetail);
    // You can access user details from eventDetail if needed.
    // For example, eventDetail.user.email, eventDetail.user.name, etc.
  };

  return (
    <VStack spacing={4} align="center" p={4}>
      <VStack align="center">
        <Icon boxSize={8} color="red.500" />
        <Text>
          Enter your 12-word seed phrase, separated by spaces below to log in!
        </Text>
      </VStack>
      <Textarea
        focusBorderColor="pink.500"
        borderColor="pink.500"
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
        onClick={handleSeedSubmission}
      >
        Recover Wallet
      </Button>
      {nonValid && (
        <Text color="red.500" fontWeight="bold">
          Invalid Seed Phrase
        </Text>
      )}
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

      {/* Conditionally render the PassageAuth component */}
      {showPassage && (
        <PassageAuth appId="NOT_YOUR_BUSINESS" onAuthenticate={handleAuthenticate} />
      )}
    </VStack>
  );
}

export default RecoverAccount;
