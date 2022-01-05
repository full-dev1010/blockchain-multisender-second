import React, { Component } from 'react';
import bsCustomFileInput from 'bs-custom-file-input';
import { useState, useEffect } from 'react';

import logo from '../../assets/new_images/images/logo.png';
import bscnetwork from '../../assets/new_images/icons/bscnetwork.png';
import life from '../../assets/new_images/images/life.png';
import shiva from '../../assets/new_images/images/shiva.png';
import sniffer from '../../assets/new_images/images/sniffer.png';
import lambo from '../../assets/new_images/images/lambo.png';
import afi from '../../assets/new_images/images/afi.png';
import galabet from '../../assets/new_images/images/galabet.png';
import like from '../../assets/new_images/icons/like.png';
import dislike from '../../assets/new_images/icons/dislike.png';
import warn from '../../assets/new_images/icons/warn.png';
import smile from '../../assets/new_images/icons/smile.png';
import pancakeswap from '../../assets/new_images/icons/pancakeswap.png';
import sphynxswap from '../../assets/new_images/icons/sphynxswap.png';

import moment from 'moment';

import {
  getCurrentWalletConnected,
  getTokenInfo,
  getPresaleInfo,
  getTokenAndPresaleAddress
} from "./tokenAPI/utils/interact.js";

import { fromEther} from './tokenAPI/utils/ethers';


export default function PresaleLive() {

  const defaultInfo = 
    {
      presaleId: 671,
      presaleAddress: '',
      tokenAddress: '',
      totalSupply: '9,195,981.563',
      tokensForPresale: '4,600,000',
      tokensForLiquidity: '3,220,000',
      tokenSymbol: 'SHIVA',
      tokenName: 'Shiva Token',
      logoLink: '../../assets/new_images/images/logo.png',
      softCap: '100',
      hardCap: '200',
      presaleRate: '23,000',
      swapListingRate: '23,000',
      swapLiquidity: '70',
      minBuy: '0.1',
      maxBuy: '1',
      presaleStartTime: '30 Sep 2021 at 22:30',
      presaleEndTime: '1 Oct 2021 at 00:30',
      setLiquidityLockedTime: '30 Sep 2022 at 22:30',
    }
  
  
  const [status, setStatus] = useState('first');
  const [walletAddress, setWallet] = useState("");
  const [infos, setInformation] = useState(defaultInfo);

  const getPresaleIdFromLocation = (location) => {
    let arr = String(location).split('/');
    return arr[arr.length - 1];
  }

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

  const asyncFetchTokenData = async () => {

    let currentPresaleId = getPresaleIdFromLocation(window.location);

    const { address, status } = await getCurrentWalletConnected();

    setWallet(address);
    setStatus(status);
    addWalletListener();

    const tokenInfo = await getTokenInfo(currentPresaleId);
    const presaleInfo = await getPresaleInfo(currentPresaleId);
    const presaleAndTokenAddress = await getTokenAndPresaleAddress(currentPresaleId);

    setInformation({
      presaleId: currentPresaleId,
      presaleAddress: presaleAndTokenAddress.presaleAddress,
      tokenAddress: presaleAndTokenAddress.tokenAddress,
      totalSupply: '9,195,981.563',
      tokensForPresale: '4,600,000',
      tokensForLiquidity: '3,220,000',
      tokenSymbol: tokenInfo.symbol,
      tokenName: tokenInfo.name,
      logoLink: tokenInfo.logoLink,
      softCap: fromEther(presaleInfo.softCap),
      hardCap: fromEther(presaleInfo.hardCap),
      presaleRate: presaleInfo.presaleRate,
      swapListingRate: presaleInfo.swapListingRate,
      swapLiquidity: presaleInfo.swapLiquidity,
      minBuy: fromEther(presaleInfo.minBuy),
      maxBuy: fromEther(presaleInfo.maxBuy),
      presaleStartTime: moment(new Date(parseInt(presaleInfo.presaleStartTime))).format('MM/DD/YYYY, hh:mm A'),
      presaleEndTime: moment(new Date(parseInt(presaleInfo.presaleEndTime))).format('MM/DD/YYYY, hh:mm A'),
      setLiquidityLockedTime: moment(new Date(parseInt(presaleInfo.liquidityLockedTime))).format('MM/DD/YYYY, hh:mm A'),
    });
  }

  useEffect(() => {
    bsCustomFileInput.init()    
    if( status == 'first') asyncFetchTokenData();
  });

  return (
    <div className="presale-live">
      <div className="page-header sub-launchpad sub-presale-live">
        <nav aria-label="breadcrumb">
          <button className="btn btn-info bscnetwork-button">
            <img src={bscnetwork}></img>
            BSC Network
          </button>
        </nav>
      </div>
      <div className="presale-container">
        <div className="col-xl-3 col-sm-6 grid-margin stretch-card">
          <div className="presale-card left-card">
            <div className="left-card-header">SphynxSale Automated Warning System</div>
            <div className="left-card-subheader">3 Warnings Detected</div>
            <div className="warning-header">DeFi Zone Warning</div>
            <div className="warning-content">
              This sale is listed in the DeFi Zone. Presales in this area use custom contracts that are not vetted by the DxSale team. Developers of tokens in this area can block transfers, can stop users from claiming tokens, can stop trading on exchanges and requires extra vetting. Participate at your own risk!(You could lose your funds)
            </div>
            <div className="warning-header">Soft Cap Warning</div>
            <div className="warning-content">
              The softcap of this sale is very low.
            </div>
            <div className="warning-header">Liquidity Percentage Warning</div>
            <div className="warning-content">
              This sale has a very low liquidity percentage
            </div>
          </div>
        </div>
        <div className="col-xl-6 col-sm-6 grid-margin stretch-card">
          <div className="presale-card middle-card">
            <div className="middle-card-header">
              <img src={infos.logoLink} className="card-image" />
              <div className="token-content">
                <p className="token-name">{infos.tokenName}</p>
                <p className="token-style">{infos.tokenSymbol}</p>
              </div>
            </div>
            <div className="explain">
              $SHIVA is a new reflection protocol on the Binance Smart Chain with a deflationary burn mechanism that offers reflections to holders with 0% buy and sell tax.
            </div>
            <div className="presale-address">Presale Address: <a>{infos.presaleAddress}</a></div>
            <div className="token-address">Token Address: <a>{infos.tokenAddress}</a></div>
            <div className="warn">Do not send BNB to the token address!</div>
            <div className="custom-contract-parent"><img src={life} /><p className="custom-contract">Custom Contract</p></div>
            <div className="enabled-whitelist-card">
              <div className="whitelist-card-header">Whitelist Enabled Sale</div>
              <div className="whitelist-content">Only Whitelisted Wallets can Purchase This Token!</div>
              <div className="whitelist-warn"><i className="mdi mdi-alert btn-icon-prepend"></i>Your wallet address is not whitelisted</div>
            </div>
            {/* <div className="progress-status"><p>Raised: 270.5/300</p></div>
            <ProgressBar variant="success" className="my-progress-bar" now={70} />
            <Form.Group>
              <Form.Control type="text" className="form-control bnb-to-token" name="searchValue" id="" placeholder="1 BNB = 250000000 SHIVA" />
            </Form.Group>
            <div className="tokenswillget"><p>Tokens you will get</p></div>
            <div className="contribute-button-container"><button className="btn btn-info btn-lg contribute">Contribute</button></div>
            <div className="sale-end-time"><p>Sale ends in: 06:23:49:16</p></div> */}
            <div className="presale-end-message"><p className="">This presale has ended. Go back to the dashboard to view others!</p></div>
            <div className="trade-pancakeswap"><button className="btn btn-third btn-lg"><img src={pancakeswap} alt="pancakeswap" />Trade on PancakeSwap</button></div>
            <div className="trade-sphynxswap"><button className="btn btn-info btn-lg"><img src={sphynxswap} alt="pancakeswap" />Trade on SphynxSwap</button></div>
            <div className="if-text"><p>If you participated in the presale please click the claim button below to claim your tokens!</p></div>
            <div className="claim-token"><button className="btn btn-info btn-lg">Claim Token</button></div>
            <div className="locker"><button className="btn btn-info btn-md withdraw disabled">SphynxLock Locker</button></div>

            <div className="ctr-rev-container">
              <div className="ctr-amount">
                <p className="amount">Your Contributed Amount</p>
                <p className="amount1">1BNB</p>
              </div>
              <div className="res-amount">
                <p className="amount">Your Reserved Tokens</p>
                <p className="amount1">250000000 SHIVA</p>
              </div>
            </div>
            <div className="withdrawbutton"><button className="btn btn-info btn-md withdraw disabled">Emergency Withdraw</button></div>
            <div className="information">
              <div className="info-labels">
                <p className="info-label">Sale ID</p>
                <p className="info-label">Total Supply</p>
                <p className="info-label">Tokens For Presale</p>
                <p className="info-label">Tokens For Liquidity</p>
                <p className="info-label">Soft Cap</p>
                <p className="info-label">Hard Cap</p>
                <p className="info-label">Presale Rate</p>
                <p className="info-label">PancakeSwap Listinag Rate</p>
                <p className="info-label">PancakeSwap Liquidity</p>
                <p className="info-label">Minimum Contribution</p>
                <p className="info-label">Maximum Contribution</p>
                <p className="info-label">Presale Start Time</p>
                <p className="info-label">Presale End Time</p>
                <p className="info-label">Liquidity Unlock</p>
              </div>
              <div className="info-values">
                <p className="info-value">{infos.presaleId + 1}</p>
                <p className="info-value">{infos.totalSupply} {" " + infos.tokenSymbol}</p>
                <p className="info-value">{infos.tokensForPresale} {" " + infos.tokenSymbol}</p>
                <p className="info-value">{infos.tokensForLiquidity} {" " + infos.tokenSymbol}</p>
                <p className="info-value">{infos.softCap} BNB</p>
                <p className="info-value">{infos.hardCap} BNB</p>
                <p className="info-value">{infos.presaleRate} {' BZAP per BNB'}</p>
                <p className="info-value">{infos.swapListingRate} {' BZAP per BNB'}</p>
                <p className="info-value">{infos.swapLiquidity}%</p>
                <p className="info-value">{infos.minBuy} BNB</p>
                <p className="info-value">{infos.maxBuy} BNB</p>
                <p className="info-value">{infos.presaleStartTime}</p>
                <p className="info-value">{infos.presaleEndTime}</p>
                <p className="info-value">{infos.setLiquidityLockedTime}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-sm-6 grid-margin stretch-card right-card-parent">
          <div className="presale-card right-card">
            <div className="right-card-header">What do you think?</div>
            <div className="follow">
              <div className="like-container">
                <div className="like"><img src={like} alt="like" /><p>Like</p></div>
                <div className="hillarious"><img src={smile} alt="hillarious" /><p>Hillarious</p></div>
              </div>
              <div className="like-container">
                <div className="dislike"><img src={dislike} alt="dislike" /><p>Dislike</p></div>
                <div className="scam"><img src={warn} alt="scam" /><p>Scam</p></div>
              </div>
            </div>
            <div className="comments-community">
              <p className="under-comments">Comments</p>
              <p className="under-community">Community</p>
            </div>
            <div className="comments-content"><p className="join-discussion">Join Discussion</p></div>
          </div>
        </div>

      </div>
    </div>
  )
}