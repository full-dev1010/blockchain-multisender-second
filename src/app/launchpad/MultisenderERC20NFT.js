import React, { useEffect, useState } from 'react';
import MultisenderERC20 from './MultisenderERC20';
import ManagePresale from './ManagePresale';

import {
  getCurrentWalletConnected,
  getPresaleTotalCount,
  getPresaleIdByWalletAddress
} from "./tokenAPI/utils/interact.js";

import { fromEther} from './tokenAPI/utils/ethers';
import http from "../http/http.js";
import axios from "axios";

const MultisenderERC20NFT = () => {
  const [walletAddress, setWallet] = useState("");
  const [status, setStatus] = useState(true);
  const [hasPresale, setHasPresale] = useState(false);
  const [mounted, setMounted] = React.useState(false)

    useEffect(() => {
      setMounted(true)

      const asyncFetchTokenData = async () => {

        const { address, status } = await getCurrentWalletConnected();
    
        setWallet(address);
        setStatus(status);
    
        addWalletListener();
        const presaleTotalCount = await getPresaleTotalCount();
        const presaleId = await getPresaleIdByWalletAddress(address);
        console.log("CGICGI", address, presaleId, presaleTotalCount);
        setHasPresale(presaleId < presaleTotalCount);
      }             
      asyncFetchTokenData();
    });

    function addWalletListener() {
      if (window.ethereum) {
        window.ethereum.on("accountsChanged", (accounts) => {
          if (accounts.length > 0) {
            setWallet(accounts[0]);
            setStatus("👆🏽 Write a message in the text-field above.");
          } else {
            setWallet("");
            setStatus("🦊 Connect to Metamask using the top right button.");
          }
        });
      } else {
        setStatus(
          <p>
            {" "}
            🦊{" "}
            <a target="_blank" href={`https://metamask.io/download.html`}>
              You must install Metamask, a virtual Ethereum wallet, in your
              browser.
            </a>
          </p>
        );
      }
    }
    if (!mounted) return null;
    console.log("CGI State", status)
    return (
      hasPresale != true ? <MultisenderERC20></MultisenderERC20> : <ManagePresale></ManagePresale>
    );
  };
  
export default MultisenderERC20NFT;

