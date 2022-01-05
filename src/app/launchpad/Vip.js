import React, { Component } from 'react';
import { Form } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import bsCustomFileInput from 'bs-custom-file-input';
import moment from 'moment';

import crown from '../../assets/new_images/images/crown.png'

import AceEditor from 'react-ace';

import { useEffect, useState } from "react";
import {
  connectWallet,
  getCurrentWalletConnected,
  createTokenInfo,
  updateTokenName,
} from "./tokenAPI/utils/interact.js";

import { fromEther} from './tokenAPI/utils/ethers';
import http from "../http/http.js";
import axios from "axios";

const Vip = () => {
  const [walletAddress, setWallet] = useState("");
  const [status, setStatus] = useState("");
  const [message, setMessage] = useState("No connection to the network."); //default message

  // 0xff90962f83810f1d4fbf4ba970a6b443b41267a5

  const [tokenAvailable, setTokenAvailable] = useState(false);
  const [tokenAddress, setTokenAddress] = useState('');
  const [tokenName, setTokenName] = useState('');
  const [tokenSymbol, setTokenSymbol] = useState('');
  const [tokenDecimal, setTokenDecimal] = useState();
  const [tokenTotalSupply, setTokenTotalSupply] = useState(1000000000);
  const [presaleRate, setPresaleRate] = useState('');
  const [softCap, setSoftCap] = useState('');
  const [hardCap, setHardCap] = useState('');
  const [minBuy, setMinBuy] = useState('');
  const [maxBuy, setMaxBuy] = useState('');
  const [swapLiquidity, setSwapLiquidity] = useState('');
  const [swapListingRate, setSwapListingRate] = useState('');
  const [presaleStartTime, setPresaleStartTime] = useState(moment(new Date()).format('MM/DD/YYYY, hh:mm A'));
  const [presaleEndTime, setPresaleEndTime] = useState(moment(new Date()).format('MM/DD/YYYY, hh:mm A'));
  const [liquidityLockedTime, setLiquidityLockedTime] = useState(moment(new Date()).format('MM/DD/YYYY, hh:mm A'));

  const [addressList, setAddressList] = useState("")
  const [mainCoinName, setMainCoinName] = useState("BNB");

  const [mounted, setMounted] = React.useState(false)
  const fee1 = 0.02;
  const fee2 = 0.1;
  const fee3 = 0.25;
  const fee4 = 1;

    const onChangeAddressList = value => {
      console.log('SET TO\n', value)
      setAddressList(value)
      let arr = value.split('\n');
      console.log('NEW STATE\n', arr)
    }

    const getTokenInfoAction = (e) => {
      setTokenAddress(e.target.value);
      var authOptions = {
        method: 'POST',
        url: '/api/v1/getToken',
        data: {
          "contractaddress": e.target.value.trim(),
          // "contractaddress": "0xff90962f83810f1d4fbf4ba970a6b443b41267a5",
          "apikey" : "ifxygq7umocwcw4cc0gok04sskwskow4w040c04gs8g4448og0wogowko0w8csog"
        },
        crossDomain: true,
        dataType: 'json'
      };

      axios(authOptions)
      .then((response) => {
          console.log(response.data)
          setTokenName(response.data.name);
          setTokenSymbol(response.data.symbol);
          setTokenDecimal(response.data.decimals);
          setTokenAvailable(response.data.ok);
          setTokenTotalSupply(response.data.supply)
      })
      .catch((error) => {
          console.log(error)
      })
    }

    //called only once
    useEffect(() => {
      bsCustomFileInput.init()
      setMounted(true)

      const asyncFetchTokenData = async () => {

        const { address, status } = await getCurrentWalletConnected();
    
        setWallet(address);
        setStatus(status);
    
        addWalletListener();
        
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
    
    const submitForm = async (e) => {
      e.preventDefault();

      const { status } = await createTokenInfo(
        walletAddress, 
        tokenAddress,
        tokenName,
        tokenSymbol,
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        presaleRate,
        softCap,
        hardCap,
        minBuy,
        maxBuy,
        swapLiquidity,
        swapListingRate,
        presaleStartTime,
        presaleEndTime,
        liquidityLockedTime          
      );

      setStatus(status);
    };

    const onClickSubmit = async () => {

      const { status } = await updateTokenName(walletAddress, tokenName);
      setStatus(status);
      setMessage('You have been entered!');
    };

    const connectWalletPressed = async () => {
      const walletResponse = await connectWallet();
      setStatus(walletResponse.status);
      setWallet(walletResponse.address);
    };
  
    const [expanded, setExpanded] = useState('panel1');

    const handleChange = (panel) => (event, newExpanded) => {
      setExpanded(newExpanded ? panel : false);
    };
  
    const nextValidation1 = (e) => {
      e.preventDefault();
      if( tokenAvailable != true ){
        alert("Your Token address # is an invalid Address!");
        return;
      }
      setExpanded('panel2');
    };

    const nextValidation8 = (e) => {
      e.preventDefault();
      setExpanded('panel9');
    };

    const editAction = (e) => {
      e.preventDefault();
      setExpanded('panel1');
    }

    const backAction = (e, toStep) => {
      e.preventDefault();
      setExpanded('panel' + toStep)
    }


    if (!mounted) return null;


    return (
      <div className="div-vip">
        <div className="row-header">
          <div className="grid-margin stretch-card">
            <img id="img-tax-free" src={crown}></img>
          </div>
          <div className="div-vip-description">
            <p>VIP gives you discounted access to Multisender.app and all of your tx will be free.</p>
            <p>Keep in mind, you would still need to pay for {mainCoinName} network fees.</p>
            <p>If you need additional information, feel free to ask in our Telegram channel. <a href="https://t.me/MultiSender" target="_blank">t.me/MultiSender</a></p>
          </div>
        </div>

        <div className="row">
          <div className="grid-margin stretch-card col-step-card">
            <Form.Group>
                <div className="form-check">
                    <label className="form-check-label">
                        <input type="radio" className="form-check-input" name="optionsRadios" id="optionsRadios1" value=""/>
                        <i className="input-helper"></i>1 day
                        <span className="text-fee-value">{fee1} {mainCoinName}</span>
                    </label>
                </div>
                <div className="form-check">
                    <label className="form-check-label">
                        <input type="radio" className="form-check-input" name="optionsRadios" id="optionsRadios2" value="option2" defaultChecked/>
                        <i className="input-helper"></i>
                        7 days
                        <span className="text-fee-value">{fee2} {mainCoinName}</span>
                    </label>
                </div>
                <div className="form-check">
                    <label className="form-check-label">
                        <input type="radio" className="form-check-input" name="optionsRadios" id="optionsRadios3" value="option3" defaultChecked/>
                        <i className="input-helper"></i>
                        1 month
                        <span className="text-fee-value">{fee3} {mainCoinName}</span>
                    </label>
                </div>
                <div className="form-check">
                    <label className="form-check-label">
                        <input type="radio" className="form-check-input" name="optionsRadios" id="optionsRadios4" value="option4" defaultChecked/>
                        <i className="input-helper"></i>
                          no limit
                        <span className="text-fee-value">{fee4} {mainCoinName}</span>
                    </label>
                </div>
            </Form.Group>
          </div>
          <button type="button" className="btn btn-icon-text btn-buy">
            Buy
          </button>

        </div>

      </div>

    );
  };
  
export default Vip;

