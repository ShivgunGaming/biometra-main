import React, { useEffect, useState } from "react";
import { Divider, List, Avatar, Spin, Tabs } from "antd";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { TabIndicator } from "@chakra-ui/react";
import { Spinner } from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
import { Stack } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";
import { Image } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import { Tooltip } from "@chakra-ui/react";
import { LogoutOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import logo from "../noImg.png";
import axios from "axios";
import { CHAINS_CONFIG } from "../chains";
import { ethers } from "ethers";

function WalletView({
  wallet,
  setWallet,
  seedPhrase,
  setSeedPhrase,
  selectedChain,
  darkMode,
}) {
  const navigate = useNavigate();
  const [tokens, setTokens] = useState(null);
  const [nfts, setNfts] = useState(null);
  const [balance, setBalance] = useState(0);
  const [fetching, setFetching] = useState(true);
  const [amountToSend, setAmountToSend] = useState(null);
  const [sendToAddress, setSendToAddress] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [hash, setHash] = useState(null);

  async function sendTransaction(to, amount) {

    if (!to || !amount) {
      console.error("Invalid input for sending transaction.");
      return;
    }

    const chain = CHAINS_CONFIG[selectedChain];

    const provider = new ethers.JsonRpcProvider(chain.rpcUrl);

    const privateKey = ethers.Wallet.fromPhrase(seedPhrase).privateKey;

    const wallet = new ethers.Wallet(privateKey, provider);

    const tx = {
      to: to,
      value: ethers.parseEther(amount.toString()),
    };

    setProcessing(true);
    try {
      const transaction = await wallet.sendTransaction(tx);

      setHash(transaction.hash);
      const receipt = await transaction.wait();

      setHash(null);
      setProcessing(false);
      setAmountToSend(null);
      setSendToAddress(null);

      if (receipt.status === 1) {
        getAccountTokens();
      } else {
        console.log("failed");
      }
    } catch (err) {
      setHash(null);
      setProcessing(false);
      setAmountToSend(null);
      setSendToAddress(null);
    }
  }

  async function getAccountTokens() {
    setFetching(true);

    const res = await axios.get(
      `https://biometra-main.onrender.com/getTokens`,
      {
        params: {
          userAddress: wallet,
          chain: selectedChain,
        },
      }
    );

    const response = res.data;

    if (response.tokens.length > 0) {
      setTokens(response.tokens);
    }

    if (response.nfts.length > 0) {
      setNfts(response.nfts);
    }

    setBalance(response.balance);

    setFetching(false);
  }

  const NFTDetails = ({ nftName, tokenId }) => {
    return (
      <Box
        position="absolute"
        top="0"
        left="0"
        zIndex="1"
        bg="white"
        p="2"
        opacity="0"
        transition="opacity 0.3s"
        _hover={{ opacity: 1 }}
      >
        <p>NFT Name: {nftName}</p>
        <p>Token ID: {tokenId}</p>
        {/* Add other details as needed */}
      </Box>
    );
  };

  function logout() {
    setSeedPhrase(null);
    setWallet(null);
    setNfts(null);
    setTokens(null);
    setBalance(0);
    navigate("/");
  }

  useEffect(() => {
    if (!wallet || !selectedChain) return;
    setNfts(null);
    setTokens(null);
    setBalance(0);
    getAccountTokens();
  }, [wallet, selectedChain]);

  return (
    <div className={`content ${darkMode ? "dark" : "light"}`}>
      <div className="logoutButton" onClick={logout}>
        <LogoutOutlined />
      </div>
      <Text as="cite" className="walletName">Wallet</Text>
      <Tooltip title={wallet}>
        <Text as="b">
          {wallet.slice(0, 4)}...{wallet.slice(38)}
        </Text>
      </Tooltip>
      <Divider />
      {fetching ? (
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="pink.500"
        />
      ) : (
        <Tabs
          defaultActiveKey="1"
          className="walletView"
          bg="pink.500"
          items={[
            {
              key: "3",
              label: "Tokens",
              color: "pink.500",
              children: tokens ? (
                <div className={darkMode ? "tokenRow dark" : "tokenRow"}>
                  <List
                    itemLayout="horizontal"
                    dataSource={tokens}
                    renderItem={(item, index) => (
                      <List.Item
                        key={item.id ? item.id.toString() : index}
                        style={{ textAlign: "left" }}
                        className={darkMode ? "token dark" : "token"}
                      >
                        <List.Item.Meta
                          avatar={<Avatar src={item.logo || logo} />}
                          description={
                            <Text as="samp" className="tokenText">
                              {item.symbol}
                            </Text>
                          }
                          title={
                            <Text as="b" className="tokenText">
                              {item.name}
                            </Text>
                          }
                        />
                        <Text className="tokenText" as="b">
                          {(
                            Number(item.balance) /
                            10 ** Number(item.decimals)
                          ).toFixed(2)}
                        </Text>
                      </List.Item>
                    )}
                  />
                  <br />
                  <Text as="b" className="frontPageBottom">Copyright © Biometra</Text>
                </div>
              ) : (
                <>
                  <span>You seem to not have any tokens yet</span>
                  <p className="frontPageBottom">Copyright © Biometra</p>
                </>
              ),
            },
            {
              key: "2",
              label: "NFTs",
              children: nfts ? (
                <>
                  {nfts.map((e, i) => (
                    <div key={i}>
                      {e && (
                        <Image
                          key={i}
                          className="nftImage"
                          alt="nftImage"
                          src={e}
                          boxSize="200px"
                          marginLeft="16"
                          marginY="5"
                        />
                      )}
                    </div>
                  ))}
                  <br />
                  <Text as="b" className="frontPageBottom">Copyright © Biometra</Text>
                </>
              ) : (
                <>
                  <span>You seem to not have any tokens yet </span>
                  <p className="frontPageBottom">Copyright © Biometra</p>
                </>
              ),
            },
            {
            key: "1",
            label: "Transfer",
            children: (
              <>
                <div>
                  <Text as="b" fontSize="2xl">
                    Native Balance
                  </Text>
                  <br />
                  <Text as="b">
                    {balance.toFixed(4)}{" "}
                    {CHAINS_CONFIG[selectedChain].ticker}
                  </Text>
                </div>
                <br />
                <div className="sendRow">
                  <p style={{ width: "90px", textAlign: "left" }}>To:</p>
                  <Input
                    className="inputText darkerPlaceholder"
                    variant="outline"
                    errorBorderColor='pink.900'
                    focusBorderColor='pink.500'
                    value={sendToAddress || ""}
                    onChange={(e) => setSendToAddress(e.target.value)}
                    placeholder="0x..."
                    _placeholder={{ opacity: 1, color: "white" }}
                  />
                </div>
                <br />
                <div className="sendRow">
                  <p style={{ width: "90px", textAlign: "left" }}>Amount:</p>
                  <Input
                    className="inputText darkerPlaceholder"
                    variant="outline"
                    errorBorderColor='pink.900'
                    focusBorderColor='pink.500'
                    value={amountToSend || ""}
                    onChange={(e) => setAmountToSend(e.target.value)}
                    placeholder="Amount you wish to send..."
                    _placeholder={{ opacity: 1, color: "white" }}
                  />
                </div>
                <br />
                <Button
                  colorScheme="pink"
                  variant="solid"
                  type="primary"
                  onClick={() => sendTransaction(sendToAddress, amountToSend)}
                >
                  Send Tokens
                </Button>
                {processing && (
                  <>
                    <Spinner
                      thickness="4px"
                      speed="0.65s"
                      emptyColor="gray.200"
                      color="pink.500"
                    />
                    {hash && (
                      <Tooltip title={hash}>
                        <Text as="i">Processing Tx...</Text>
                      </Tooltip>
                      )}
                    </>
                  )}
                </>
              ),
            },
          ]}
        />
        
      )}
    </div>
  );
}

export default WalletView;
