import React, { Component } from 'react';
import { Form } from 'react-bootstrap';
import ReactFileReader from "react-file-reader";
import bsCustomFileInput from 'bs-custom-file-input';
import moment from 'moment';

// import logo from '../../assets/new_images/images/logo4.png'

import AceEditor from 'react-ace';

import ApprovalInfo from './components/ApprovalInfo';
import ApprovalTable from './components/ApprovalTable';
import WarningComponent from './components/WarningComponent';

import { useEffect, useState } from "react";
import {
  connectWallet,
  getCurrentWalletConnected,
  createTokenInfo,
  updateTokenName,
} from "./tokenAPI/utils/interact.js";

import{ 
  validateAddress,
  validateAmount,
  validateInvestorsList
} from './tokenAPI/utils/validatorMultisender.js';

import { fromEther} from './tokenAPI/utils/ethers';
import Accordion from '@material-ui/core/Accordion';  
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import axios from "axios";

var recipientsList = [];



const MultisenderERC20 = () => {
  const [walletAddress, setWallet] = useState("");
  const [status, setStatus] = useState("");
  const [message, setMessage] = useState("No connection to the network."); //default message

  // 0xff90962f83810f1d4fbf4ba970a6b443b41267a5

  const [tokenAvailable, setTokenAvailable] = useState(false);
  const [tokenAddress, setTokenAddress] = useState('');
  const [tokenBalance, setTokenBalance] = useState('');
  const [tokenSymbol, setTokenSymbol] = useState('');
  const [presaleRate, setPresaleRate] = useState('');
  const [investorsInfo, setInvestorsInfo] = useState('')
  const [addressList, setAddressList] = useState([])
  const [amountList, setAmountList] = useState([])

  const [isApproval, setIsApproval] = useState(false)
  const [isWarning, setIsWarning] = useState(false)
  const [totalTokenAmount, setTotalTokenAmount] = useState(0)
  const [ownerTokenBalance, setOwnerTokenBalance] = useState(0)
  const [ownerMainCoinBalance, setOwnerMainCoinBalance] = useState(0)
  const [mainCoinName, setMainCoinName] = useState('BNB')
  const [approvalCount, setApprovalCount] = useState(0)

  const [mounted, setMounted] = useState(false)


    const onChangeAddressList = value => {
      setInvestorsInfo(value)
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
      })
      .catch((error) => {
          console.log(error)
      })
    }

    //called only once
    useEffect(() => {

      bsCustomFileInput.init()
      // const message = await loadCurrentMessage();
      // setMessage(message);
      // addSmartContractListener();
  
      setMounted(true)

      const asyncFetchTokenData = async () => {

        const { address, status } = await getCurrentWalletConnected();
    
        setWallet(address);
        setStatus(status);
    
        addWalletListener();
        
        // console.log("CGI wallet", address);
        // console.log("CGI status", status);

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
    
    const finalValidation = () => {
      // if( minBuyValue > maxBuyValue ){
      //   alert("The minimum contribution limit cannot be higher than max limit. For equal amounts put the same number Ex. 0.5,0.5");
      //   return false;
      // }

      return true;
    }

    const submitForm = async (e) => {
      e.preventDefault();

      if( finalValidation() != true ){
        return;
      }

      const { status } = await createTokenInfo(
        walletAddress, 
        tokenAddress,
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
      );

      setStatus(status);
      // setTimeout(() => {
      //   const { status } = setTokenAdditionalInformationLast(
      //     walletAddress, 
      //     provideParticipants          
      //   );
      //   setStatus(status);
      //   console.log("CGI setTokenAdditionalInformation");
      // }, 10000);
    };

    const onClickSubmit = async () => {

      // const accounts = await web3.eth.getAccounts();
      // setMessage('Waiting on transaction success...');
      setStatus(status);
      setMessage('You have been entered!');
    };

    const connectWalletPressed = async () => {
      const walletResponse = await connectWallet();
      setStatus(walletResponse.status);
      setWallet(walletResponse.address);
    };
  
    //the UI of our component
    const [expanded, setExpanded] = useState('panel1');

    const handleChange = (panel) => (event, newExpanded) => {
      if( isWarning ) return;
      setExpanded(newExpanded ? panel : false);
    };
  
    const nextValidation1 = (e) => {
      e.preventDefault();
      if( !validateInvestorsList(investorsInfo) ){
        setIsWarning(true);
        return;
      }
      setIsWarning(false);
      setExpanded('panel2');
    };

    const nextValidation2 = (e) => {
      e.preventDefault();
      if(totalTokenAmount < ownerTokenBalance){
        setIsWarning(true);
        return;
      }
      setIsWarning(false);
      setExpanded('panel3');
    };

    const nextValidation3 = (e) => {
      e.preventDefault();
      if( finalValidation() != true ){
        return;
      }
      setExpanded('panel9');
    };

    const backAction = (e, toStep) => {
      e.preventDefault();
      setExpanded('panel' + toStep)
    }

    const uploadHandler = (e) => {
      e.preventDefault();

    }

    const handleFiles = files => {
      var reader = new FileReader();
      reader.onload = function(e) {
          // Use reader.result
        const orgContent = reader.result;
        const orgArray = orgContent.split(/\r\n|\n|\r/);
        let tokenAmount = 0;
        let content = '';
        let resAddressList = [];
        let resAmountList = [];
        recipientsList = [];
        for(let i = 0; i < orgArray.length; i++){
          if(orgArray[i].trim() == '') continue;
          const info = orgArray[i].split(',');
          if( info == undefined || info.length < 2 ){
            setIsWarning(true);
            continue;
          }
          const address = info[0].trim();
          const amount = info[1].trim();
          if( !validateAddress(address, 'ETH') || !validateAmount(amount) ){
            setIsWarning(true);
            continue;
          }
          if( resAddressList.length > 0 ){
            content += '\n';
          }
          content += address + ',' + amount;
          resAddressList.push(address);
          resAmountList.push(parseFloat(amount));  
          recipientsList.push(
            {
              address: address,
              amount: parseFloat(amount)
            }
          );
          tokenAmount += parseFloat(amount);
        }
        setAddressList(resAddressList);
        setAmountList(resAmountList);
        setInvestorsInfo(content);
        setApprovalCount(recipientsList.length);
        setTotalTokenAmount(tokenAmount);
      }
      reader.readAsText(files[0]);
    } 

    if (!mounted) return null;

    return (
      <div className="launchpad-create-manage-presale">
        {/* <div className="page-header">
        </div> */}
        <div className="row row-header">
          <div className="col-12 grid-margin stretch-card">
            <div className="card create-sale-card">
              <div className="card-body">
                <div>
                  <img src={require('../../assets/new_images/images/logo4.png')} alt="logo" />                  
                  {/* <img src={require('../../assets/images/new_images/images/spiral-notepad.png')} alt="logo" /> */}
                  <a>Multisender ERC20</a>
                </div>
                <p>
                  A tool that allows you to batch send ERC20 tokens
                </p>
                <p className="para-warning">
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="row token-address-container">
          <div className="grid-margin stretch-card col-step-card">
            <div className="card step-card">
              <div className="card-body">
                <Accordion disableGutters expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                  <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                    <div className="card-title">
                      <span className="step-badge">1</span>
                      <span className="title-content">Prepare</span>
                    </div>
                  </AccordionSummary>
                  <AccordionDetails>
                    <form className="forms-sample">
                      <Form.Group>
                        <label htmlFor="inputTokenAddress">Token Address</label>
                        { tokenBalance > 0 && 
                          <span className="text-balance">Balance: {tokenBalance}</span>
                        }
                        <Form.Control type="text" id="inputTokenAddress" placeholder="0x"
                          name="tokenAddress"
                          value={tokenAddress} 
                          onChange={ (e) => getTokenInfoAction(e) } />
                          {/* // onChange={(e) => setTokenAddress(e.target.value)} /> */}
                        <label className="lable-table" htmlFor="inputRecipients">Please provide list of recipients
                          <span className="btn-show-example-csv">Show Example CSV</span>
                        </label>
                        <div className="div-ace-editor">
                          <AceEditor
                            placeholder={`0xA3361322364CC901d73050D5Dee388f962B9f897,1000\n0x38d8EaC80539223e2b3c3040347a0DbBbF7E86Ab,10.2`}
                            width="100%"
                            height="300px"
                            setOptions={{ 
                              fontSize: "18px",
                              lineHeight: "28px"
                            }}
                            value={investorsInfo}
                            onChange={val => onChangeAddressList(val)}
                          />
                        </div>
                      </Form.Group>

                      <button className="btn btn-next mr-2"
                        onClick={(e) => nextValidation1(e)}
                      >Next</button>
                      <ReactFileReader handleFiles={handleFiles} fileTypes={'.csv'} 
                        className="btn btn-danger btn-icon-text btn-upload"
                        onClick={uploadHandler}                      
                      >
                        <i className="mdi mdi-upload btn-icon-prepend"></i>                                                    
                        Upload CSV File                    
                      </ReactFileReader>
                      {
                        isWarning && 
                        // <div className="div-warning">Invaild information!</div>
                        <WarningComponent 
                          warningText={'Invalid information!'}
                        />
                      }
                    </form>
                    </AccordionDetails>
                </Accordion>
                <Accordion disableGutters expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                  <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                    <div className="card-title">
                      <span className="step-badge">2</span>
                      <span className="title-content">Approve</span>
                    </div>
                  </AccordionSummary>
                  <AccordionDetails>
                    <form className="forms-sample">
                      <ApprovalInfo 
                        approvalCount={approvalCount}
                        totalTokenAmount={totalTokenAmount}
                        ownerTokenBalance={ownerTokenBalance}
                        ownerMainCoinBalance={ownerMainCoinBalance}
                        tokenName={tokenSymbol}
                        mainCoinName={mainCoinName}
                        />
                      <ApprovalTable 
                        recipientsList={recipientsList}
                        scanUrl={"https://bscscan.com/address/"}
                        isValid={isApproval}
                      />
                      <button className="btn btn-dark btn-back"
                        onClick={(e) => backAction(e, 1)}
                      >Back</button>
                      <button className="btn btn-next mr-2 btn-approve"
                        onClick={(e) => nextValidation2(e)}
                      >{isApproval ? 'Proceed' : 'Approve'}</button>
                      {
                        isWarning && 
                        <WarningComponent 
                          warningText={'Invalid information!'}
                        />
                      }
                    </form>
                  </AccordionDetails>
                </Accordion>
                  <Accordion disableGutters expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                    <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                      <div className="card-title">
                        <span className="step-badge">3</span>
                        <span className="title-content">Multisend</span>
                      </div>
                    </AccordionSummary>
                    <AccordionDetails>
                      <form className="forms-sample row no-margin-top col-step-finalize-card"
                        onSubmit={submitForm}
                      >
                        Success!
                      </form>
                    </AccordionDetails>
                  </Accordion>

              </div>
            </div>
          </div>
        </div>

      </div>

    );
  };
  
export default MultisenderERC20;

