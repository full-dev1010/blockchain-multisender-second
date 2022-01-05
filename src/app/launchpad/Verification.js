import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import bsCustomFileInput from 'bs-custom-file-input';
import ReactFileReader from "react-file-reader";
import AceEditor from 'react-ace';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';


import {
  getCurrentWalletConnected,
  updateTokenName,
} from "./tokenAPI/utils/interact.js";

import{ 
  validateAddress,
  validateAmount,
  validateTransaction
} from './tokenAPI/utils/validatorMultisender.js';

import axios from "axios";

var recipientsList = [
  {
    address: '0x7D52422D3A5fE9bC92D3aE8167097eE09F1b347d',
    amount: 1.5
  },{
    address: '0x64c9525A3c3a65Ea88b06f184F074C2499578A7E',
    amount: 1
  }
];

const styleModal = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  borderRadius: '5px',
  boxShadow: 24,
};

const exampleTxInfo = `0x63d4610ab717854858bcb07b7aface2cfb3bb4332f7dfd3bcdaf96957442b9a4\n0xe0718bf44b70df05332015920140f3bb90cd0f2ce24be5a8d175354ef7e201fa`
const exampleAddressInfo = `0xA3361322364CC901d73050D5Dee388f962B9f897,1000\n0x38d8EaC80539223e2b3c3040347a0DbBbF7E86Ab,10.2`

const Verification = () => {
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

  const [transactionList, setTransactionList] = useState([])
  const [transactionsInfo, setTransactionsInfo] = useState("")
  const [addressList, setAddressList] = useState([])
  const [addressInfo, setAddressInfo] = useState('');
  const [amountList, setAmountList] = useState([])
  const [tokenBalance, setTokenBalance] = useState(10000)
  const [isApproval, setIsApproval] = useState(false)
  const [isWarning, setIsWarning] = useState(false);
  const [showExampleStatus, setShowExampleStatus] = useState('txInfo');

  const [mounted, setMounted] = React.useState(false)

    const onChangeAddressInfo = value => {
      setAddressInfo(value)
    }

    const onChangeTransactionsInfo = value => {
      setTransactionsInfo(value)
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

    const nextValidation1 = (e) => {
      e.preventDefault();
      if( tokenAvailable != true ){
        alert("Your Token address # is an invalid Address!");
        return;
      }
    };

    const [open, setOpen] = useState(false);
    const handleOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };
    const handleOpenTransactions = () => {
      setShowExampleStatus('txInfo');
      handleOpen();
    }

    const handleOpenAddress = () => {
      setShowExampleStatus('addressInfo');
      handleOpen();
    }

    const uploadHandler = (e) => {
      e.preventDefault();

    }

    const handleAddressFiles = files => {
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
        setAddressInfo(content);
      }
      reader.readAsText(files[0]);
    } 

    const handleTxFiles = files => {
      var reader = new FileReader();
      reader.onload = function(e) {
          // Use reader.result
        const orgContent = reader.result;
        const orgArray = orgContent.split(/\r\n|\n|\r/);
        let content = '';
        let resTxList = [];
        for(let i = 0; i < orgArray.length; i++){
          if(orgArray[i].trim() == '') continue;
          const address = orgArray[i].trim();
          if( !validateAddress(address, 'ETH') ){
            setIsWarning(true);
            continue;
          }
          if( resTxList.length > 0 ){
            content += '\n';
          }
          content += address;
          resTxList.push(address);
        }
        setTransactionList(resTxList);
        setTransactionsInfo(content);
      }
      reader.readAsText(files[0]);
    } 

    if (!mounted) return null;

  
    return (
      <div className="div-verification">
        {/* <div className="page-header">
        </div> */}
        <div className="row-header">
            <div className="verification-title">Batch Verification</div>
            <div className="verification-description">If you have a list of recipients and a list of transactions from your previous multi-send, you can check which recipients received their tokens.
            </div>
        </div>

        <div className="row token-address-container">
          <div className="grid-margin stretch-card col-step-card">
            <div className="card step-card">
              <div className="card-body">
                    <form className="forms-sample form-transaction">
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
                        <label className="lable-table" htmlFor="inputRecipients">Yours TX's hashes
                          <span className="btn-show-example-csv" onClick={handleOpenTransactions}>Show Example CSV</span>
                        </label>
                        <div className="div-ace-editor">
                          <AceEditor
                            placeholder={`0x63d4610ab717854858bcb07b7aface2cfb3bb4332f7dfd3bcdaf96957442b9a4\n0xe0718bf44b70df05332015920140f3bb90cd0f2ce24be5a8d175354ef7e201fa`}
                            width="100%"
                            height="300px"
                            setOptions={{ 
                              fontSize: "18px",
                              lineHeight: "28px"
                            }}
                            value={transactionsInfo}
                            onChange={val => onChangeTransactionsInfo(val)}
                          />
                        </div>
                      </Form.Group>

                      <ReactFileReader handleFiles={handleTxFiles} fileTypes={'.csv'} 
                        className="btn btn-danger btn-icon-text btn-upload"
                        onClick={uploadHandler}                      
                      >
                        <i className="mdi mdi-upload btn-icon-prepend"></i>                                                    
                        Upload CSV File                    
                      </ReactFileReader>
                      {
                        isWarning && 
                        <div className="div-warning"></div>
                      }
                    </form>

                    <form className="forms-sample form-address">
                      <Form.Group>
                        <label className="lable-table" htmlFor="inputRecipients">Original list of recipients
                          <span className="btn-show-example-csv" onClick={handleOpenAddress}>Show Example CSV</span>
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
                            value={addressInfo}
                            onChange={val => onChangeAddressInfo(val)}
                          />
                        </div>
                      </Form.Group>

                      <ReactFileReader handleFiles={handleAddressFiles} fileTypes={'.csv'} 
                        className="btn btn-danger btn-icon-text btn-upload"
                        onClick={uploadHandler}                      
                      >
                        <i className="mdi mdi-upload btn-icon-prepend"></i>                                                    
                        Upload CSV File                    
                      </ReactFileReader>
                      <button className="btn btn-next mr-2 btn-check"
                        onClick={(e) => nextValidation1(e)}
                      >Check</button>

                      {
                        isWarning && 
                        <div className="div-warning"></div>
                      }
                    </form>

              </div>
            </div>
          </div>
        </div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="parent-modal-title"
          aria-describedby="parent-modal-description"
        >
          <Box sx={{ ...styleModal, width: showExampleStatus == 'txInfo' ? 670 : 500 }}>
            <div className="div-ace-editor">
                <AceEditor
                  width="100%"
                  height="300px"
                  setOptions={{ 
                    fontSize: "18px",
                    lineHeight: "28px"
                  }}
                  value={ showExampleStatus == 'txInfo' ? exampleTxInfo : exampleAddressInfo}
                />
              </div>
          </Box>
        </Modal>

      </div>

    );
  };
  
export default Verification;

