// require("dotenv").config();
// const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY;
// const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
// const web3 = createAlchemyWeb3(alchemyKey);

// https://ropsten.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161

import web3 from './web3';
import moment from 'moment';
import { ether } from './ethers';

const {
  BigNumber,
} = require("@ethersproject/bignumber");

const TenBN = BigNumber.from(10);
const EtherBN = TenBN.pow(BigNumber.from(18));

// const contractABI = require("../abi/FLOCKchain.json");
// const contractAddress = "0xff90962f83810f1d4fbf4ba970a6b443b41267a5";

// const contractABI = require("../abi/TokenContract.json");
// const contractAddress = "0xE229167c621c42FFF07A3754c72b87293C1C7075";

// const contractABI = require("../abi/TokenContract.json");
// const contractAddress = "0xb1A5FDCb5407Ae83E30eDD693157b408726C2696";


const tokenContractABI = require("../abi/TokenContract.json");
const presaleContractABI = require("../abi/PresaleContract.json");
const contractABI = require("../abi/PresaleFactoryContract.json");

// test1
// const contractAddress = "0x2EbeA8B7c743A5eC77976a1C7E394D7F8B0e848c";
// test2
const contractAddress = "0xfDa5abf3c7e544D23763699Db32C6a9677D3C1f1";
// real1
// const contractAddress = "0xfDa5abf3c7e544D23763699Db32C6a9677D3C1f1";

export const presaleFactoryContract = new web3.eth.Contract(
  contractABI,
  contractAddress
);

// by CGI
export const createContract = async (contractABI, contractAddress) => {
    const presaleFactoryContract = new web3.eth.Contract(contractABI, contractAddress);
    return presaleFactoryContract;
}

export const getPresaleTotalCount = async() => {
  const [presaleTotalCount] = await Promise.all([
    presaleFactoryContract.methods.getTotalCount().call()
  ]);
  return presaleTotalCount;
}

export const getTokenAndPresaleAddress = async (id) => {
  const [presaleAddress] = await Promise.all([
    presaleFactoryContract.methods.presaleAddress(id).call()
  ]);
  const presaleContract = new web3.eth.Contract(
    presaleContractABI,
    presaleAddress
  );    
  const [tokenAddress] = await Promise.all([
    presaleContract.methods.token().call()
  ]);

  console.log("CGI tokenAddress presaleAddress", tokenAddress, presaleAddress);
  return {
    tokenAddress: tokenAddress,
    presaleAddress: presaleAddress
  };
}



// async function getTokenInfo(presaleFactoryContract) {
export const getTokenInfo = async (id) =>{
    console.log("CGI getTokenInfo start");
    const [tokenAddress] = await Promise.all([
      presaleFactoryContract.methods.tokenAddress(id).call()
    ]);
    console.log("tokenAddress", tokenAddress);
    
    const tokenContract = new web3.eth.Contract(
      tokenContractABI,
      tokenAddress
    );    
    const [
      name, symbol, decimals, logoLink, websiteLink, githubLink, twitterLink, redditLink, telegramLink, projectDescription, provideParticipants
    ] = await Promise.all([
      tokenContract.methods.name().call(),
      tokenContract.methods.symbol().call(),
      tokenContract.methods.decimals().call(),
      tokenContract.methods.logoLink().call(),
      tokenContract.methods.websiteLink().call(),
      tokenContract.methods.githubLink().call(),
      tokenContract.methods.twitterLink().call(),
      tokenContract.methods.redditLink().call(),
      tokenContract.methods.telegramLink().call(),
      tokenContract.methods.projectDescription().call(),
      tokenContract.methods.provideParticipants().call(),
    ]);
    console.log("CGI TokenInfo ");
    return {
      name,
      symbol,
      decimals,
      logoLink,
      websiteLink,
      githubLink,
      twitterLink,
      redditLink,
      telegramLink,
      projectDescription,
      provideParticipants,
    };
    // const [decimals, name, symbol] = await Promise.all([
    //   presaleFactoryContract.methods.decimals().call(),
    // //   presaleFactoryContract.methods.name().call(),
    //   presaleFactoryContract.methods.getName().call(),
    //   presaleFactoryContract.methods.symbol().call(),
    // ]);
    // return { decimals, name, symbol };
}

export const getPresaleInfo = async (id) =>{
  console.log("CGI getPresaleInfo start");
  const [presaleAddress] = await Promise.all([
    presaleFactoryContract.methods.presaleAddress(id).call()
  ]);
  console.log("presaleAddress", presaleAddress);
  
  const presaleContract = new web3.eth.Contract(
    presaleContractABI,
    presaleAddress
  );    
  const [
    rate, hardCap, softCap, maxBuy, minBuy, swapLiquidity, swapListingRate, 
    presaleStartTime, presaleEndTime, liquidityLockedTime, presaleState, presaleBlockTime
  ] = await Promise.all([
    presaleContract.methods.rate().call(),
    presaleContract.methods.cap().call(),
    presaleContract.methods.goal().call(),
    presaleContract.methods.investorMaxBuy().call(),
    presaleContract.methods.investorMinBuy().call(),
    presaleContract.methods.tokenSalePercentage().call(),
    presaleContract.methods.swapListingRate().call(),
    presaleContract.methods.openingTime().call(),
    presaleContract.methods.closingTime().call(),
    presaleContract.methods.releaseTime().call(),
    presaleContract.methods.presaleState().call(),
    presaleContract.methods.getBlockCurrentTime().call()
  ]);

  console.log("CGI PresaleInfo ", presaleBlockTime);
  let blockTime = presaleBlockTime * 1000;
  return {
    rate, hardCap, softCap, maxBuy, minBuy, swapLiquidity, swapListingRate, 
    presaleStartTime, presaleEndTime, liquidityLockedTime, presaleState, blockTime
  };
}




export const getLogoLink = async (presaleFactoryContract, id) =>{
    console.log("CGI getlogoLink start");
    const [logoLink] = await Promise.all([
        presaleFactoryContract.methods.getLogoLinkByID(id).call()
    ]);
    console.log("CGI logoLink ", logoLink);
    return logoLink;
}


export const loadCurrentMessage = async () => {
//   const message = await flockchainContract.methods.message().call();
    const message = '';
    return message;
};

export const connectWallet = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const obj = {
        status: "👆🏽 Write a message in the text-field above.",
        address: addressArray[0],
      };
      return obj;
    } catch (err) {
      return {
        address: "",
        status: "😥 " + err.message,
      };
    }
  } else {
    return {
      address: "",
      status: '<span><p>🦊<a target="_blank" href={`https://metamask.io/download.html`}>You must install Metamask, a virtual Ethereum wallet, in your browser.</a></p></span>',
    };
  }
};

export const getCurrentWalletConnected = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_accounts",
      });
      console.log("CGI getCurrentWalletConnected ", addressArray);
      if (addressArray.length > 0) {
        return {
          address: addressArray[0],
          status: "👆🏽 Write a message in the text-field above.",
        };
      } else {
        return {
          address: "",
          status: "🦊 Connect to Metamask using the top right button.",
        };
      }
    } catch (err) {
      return {
        address: "",
        status: "😥 " + err.message,
      };
    }
  } else {
    return {
      address: "",
      status: '<span><p>🦊<a target="_blank" href={`https://metamask.io/download.html`}>You must install Metamask, a virtual Ethereum wallet, in your browser.</a></p></span>',
    };
  }
};

export const updateMessage = async (address, message) => {
  //input error handling
  if (!window.ethereum || address === null) {
    return {
      status:
        "💡 Connect your Metamask wallet to update the message on the blockchain.",
    };
  }

  if (message.trim() === "") {
    return {
      status: "❌ Your message cannot be an empty string.",
    };
  }
  //set up transaction parameters
  const transactionParameters = {
    to: contractAddress, // Required except during contract publications.
    from: address, // must match user's active address.
    data: presaleFactoryContract.methods.update(message).encodeABI(),
  };

  //sign the transaction
  try {
    const txHash = await window.ethereum.request({
      method: "eth_sendTransaction",
      params: [transactionParameters],
    });
    return {
      status: '<span>✅<a target="_blank" href={`https://ropsten.etherscan.io/tx/${txHash}`}>View the status of your transaction on Etherscan!</a><br/>ℹ️ Once the transaction is verified by the network, the message will be updated automatically.</span>',
    };
  } catch (error) {
    return {
      status: "😥 " + error.message,
    };
  }
};

export const updateTokenName = async (
    walletAddress, 
    name, 
    symbol, 
    decimals) => {
  //input error handling
  if (!window.ethereum || walletAddress === null) {
    return {
      status:
        "💡 Connect your Metamask wallet to update the name on the blockchain.",
    };
  }

  if (name.trim() === "") {
    return {
      status: "❌ Your name cannot be an empty string.",
    };
  }
  //set up transaction parameters
  try {
    await presaleFactoryContract.methods.generateCoin(name, symbol, decimals).send({
        from: walletAddress
    });
    // await presaleFactoryContract.methods.setName(name).send({
    //   from: walletAddress,
    // //   value: web3.utils.toWei(value, 'ether'),
    // });
    return {
      status: '<span>✅<a target="_blank" href={`https://ropsten.etherscan.io/tx/${txHash}`}>View the status of your transaction on Etherscan!</a><br/>ℹ️ Once the transaction is verified by the network, the name will be updated automatically.</span>',
    };
  } catch (error) {
    return {
      status: "😥 " + error.message,
    };
  }
};

export const createTokenInfo = async (
    walletAddress, 
    tokenAddress,
    name, 
    symbol, 
    logoLink,
    websiteLink,
    githubLink,
    twitterLink,
    redditLink,
    telegramLink,
    projectDescription,
    provideParticipants,
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
    ) => {
  //input error handling
  if (!window.ethereum || walletAddress === null) {
    return {
      status:
        "💡 Connect your Metamask wallet to update the name on the blockchain.",
    };
  }

//   if (name.trim() === "") {
//     return {
//       status: "❌ Your name cannot be an empty string.",
//     };
//   }
  
  //set up transaction parameters

  console.log("CGI timing1", presaleStartTime, presaleEndTime, liquidityLockedTime);

  try {
    let presaleStartTimeNumber = "" + moment(new Date(presaleStartTime), 'MM/DD/YYYY, hh:mm A').valueOf();
    let presaleEndTimeNumber = "" + moment(new Date(presaleEndTime), 'MM/DD/YYYY, hh:mm A').valueOf();
    let liquidityLockedTimeNumber = "" + moment(new Date(liquidityLockedTime), 'MM/DD/YYYY, hh:mm A').valueOf();
    // let b = "" + moment(presaleStartTime, 'MM/DD/YYYY, hh:mm A').add(10, "minute").valueOf();
    // let c = "" + moment(presaleStartTime, 'MM/DD/YYYY, hh:mm A').add(1, "months").valueOf();

    // let strSoftCap = ether(parseFloat(softCap)).toString();
    let strSoftCap = ether(softCap).toString();
    let strHardCap = ether(hardCap).toString();
    let strMinBuy = ether(minBuy).toString();
    let strMaxBuy = ether(maxBuy).toString();

    console.log("CGI Cap", strSoftCap, strHardCap, strMinBuy, strMaxBuy);

    let addLinks = [];
    addLinks.push(name);
    addLinks.push(symbol);
    addLinks.push(logoLink);
    addLinks.push(websiteLink);
    addLinks.push(githubLink);
    addLinks.push(twitterLink);
    addLinks.push(redditLink);
    addLinks.push(telegramLink);
    addLinks.push(projectDescription);
    addLinks.push(provideParticipants);
    addLinks.push(presaleRate);
    addLinks.push(strHardCap);
    addLinks.push(strSoftCap);
    addLinks.push(presaleStartTimeNumber);
    addLinks.push(presaleEndTimeNumber);
    addLinks.push(liquidityLockedTimeNumber);
    addLinks.push(strMaxBuy);
    addLinks.push(strMinBuy);
    addLinks.push(swapLiquidity);
    addLinks.push(swapListingRate);
    // let conditionValues = ["10", "10", "10", "10", "10", "10"];


    let wallets = [
        walletAddress,
        walletAddress,
        walletAddress,
        walletAddress
    ];

    console.log("CGI timing", presaleStartTimeNumber, presaleEndTimeNumber, liquidityLockedTimeNumber);
    // let tokenName = "CGI";
    // await presaleFactoryContract.methods.generateCoin(tokenName).send({
    //   from: walletAddress
    // });
    // tokenAddress = "";
    await presaleFactoryContract.methods.generateCoin(
        addLinks,
        tokenAddress,
        wallets
        ).send({
        from: walletAddress,
        value: web3.utils.toWei("0.01", 'ether')
        // value: web3.utils.toWei("1", 'ether')
    });

    // await presaleFactoryContract.methods.setName(name).send({
    //   from: walletAddress,
    // //   value: web3.utils.toWei(value, 'ether'),
    // });
    return {
      status: '<span>✅<a target="_blank" href={`https://ropsten.etherscan.io/tx/${txHash}`}>View the status of your transaction on Etherscan!</a><br/>ℹ️ Once the transaction is verified by the network, the name will be updated automatically.</span>',
    };
  } catch (error) {
      console.log("CGI error is ", error);
    return {
      status: "😥 " + error.message,
    };
  }
};

//  addToWhitelist

export const addToWhitelist = async (
  walletAddress,
  presaleId,
  address
  ) => {
  //input error handling
  if (!window.ethereum || walletAddress === null) {
    return {
      status:
        "💡 Connect your Metamask wallet to update the name on the blockchain.",
    };
  }

  try {
    const [presaleAddress] = await Promise.all([
      presaleFactoryContract.methods.presaleAddress(presaleId).call()
    ]);
    
    const presaleContract = new web3.eth.Contract(
      presaleContractABI,
      presaleAddress
    );    
  
    await presaleContract.methods.addToWhitelist(address).send({
        from: walletAddress,
        // value: web3.utils.toWei("" + contributeAmount, 'ether')
    });
    return {
      status: '<span>✅<a target="_blank" href={`https://ropsten.etherscan.io/tx/${txHash}`}>View the status of your transaction on Etherscan!</a><br/>ℹ️ Once the transaction is verified by the network, the name will be updated automatically.</span>',
    };
  } catch (error) {
      console.log("CGI error is ", error);
    return {
      status: "😥 " + error.message,
    };
  }
};

//  addManyToWhitelist

export const addManyToWhitelist = async (
  walletAddress,
  presaleId,
  arrayAddress
  ) => {
  //input error handling
  if (!window.ethereum || walletAddress === null) {
    return {
      status:
        "💡 Connect your Metamask wallet to update the name on the blockchain.",
    };
  }

  try {
    const [presaleAddress] = await Promise.all([
      presaleFactoryContract.methods.presaleAddress(presaleId).call()
    ]);
    
    const presaleContract = new web3.eth.Contract(
      presaleContractABI,
      presaleAddress
    );    
  
    await presaleContract.methods.addManyToWhitelist(arrayAddress).send({
        from: walletAddress,
        // value: web3.utils.toWei("" + contributeAmount, 'ether')
    });
    return {
      status: '<span>✅<a target="_blank" href={`https://ropsten.etherscan.io/tx/${txHash}`}>View the status of your transaction on Etherscan!</a><br/>ℹ️ Once the transaction is verified by the network, the name will be updated automatically.</span>',
    };
  } catch (error) {
      console.log("CGI error is ", error);
    return {
      status: "😥 " + error.message,
    };
  }
};


//  removeFromWhitelist




//  isWhitelisted
export const isWhitelisted = async (presaleId) => {
  const [presaleAddress] = await Promise.all([
    presaleFactoryContract.methods.presaleAddress(presaleId).call()
  ]);
  
  const presaleContract = new web3.eth.Contract(
    presaleContractABI,
    presaleAddress
  );    

  const [value] = await Promise.all([
    presaleContract.methods.isWhitelisted().call()
  ]);

  return value;
}

export const contributeBNB = async (
  walletAddress, 
  presaleId,
  contributeAmount
  ) => {
  //input error handling
  if (!window.ethereum || walletAddress === null) {
    return {
      status:
        "💡 Connect your Metamask wallet to update the name on the blockchain.",
    };
  }

  try {
    console.log("CGI contributeAmount", contributeAmount, presaleId);
    const [presaleAddress] = await Promise.all([
      presaleFactoryContract.methods.presaleAddress(presaleId).call()
    ]);
    
    const presaleContract = new web3.eth.Contract(
      presaleContractABI,
      presaleAddress
    );    
  
    await presaleContract.methods.buyTokens(walletAddress).send({
        from: walletAddress,
        value: web3.utils.toWei("" + contributeAmount, 'ether')
    });
    return {
      status: '<span>✅<a target="_blank" href={`https://ropsten.etherscan.io/tx/${txHash}`}>View the status of your transaction on Etherscan!</a><br/>ℹ️ Once the transaction is verified by the network, the name will be updated automatically.</span>',
    };
  } catch (error) {
      console.log("CGI error is ", error);
    return {
      status: "😥 " + error.message,
    };
  }
};

export const getPresaledTotalAmount = async (presaleId) => {
  const [presaleAddress] = await Promise.all([
    presaleFactoryContract.methods.presaleAddress(presaleId).call()
  ]);
  
  const presaleContract = new web3.eth.Contract(
    presaleContractABI,
    presaleAddress
  );    

  const [weiRaised] = await Promise.all([
    presaleContract.methods.weiRaised().call()
  ]);

  return weiRaised;
}

export const getPresaleIdByWalletAddress = async (walletAddress) => {
  const [presaleId] = await Promise.all([
    presaleFactoryContract.methods.getPresaleIdByWallet(walletAddress).call()
  ]);
  
  return presaleId;
}




export const getTimeWillStartAndEnd = async (presaleId) => {
  const [presaleAddress] = await Promise.all([
    presaleFactoryContract.methods.presaleAddress(presaleId).call()
  ]);
  
  const presaleContract = new web3.eth.Contract(
    presaleContractABI,
    presaleAddress
  );    

  const [openingTime, closingTime, blockTime] = await Promise.all([
    presaleContract.methods.openingTime().call(),
    presaleContract.methods.closingTime().call(),
    presaleContract.methods.getBlockCurrentTime().call()
  ]);
  
  // console.log("CGI getRemainTime", openingTime, closingTime, blockTime);
  return {
    remainStartTime: openingTime - blockTime * 1000,
    remainEndTime: closingTime - blockTime * 1000
  };
}


export const setTokenAdditionalInformationByID = async (
    id,
    walletAddress, 
    logoLink,
    websiteLink,
    githubLink,
    twitterLink,
    redditLink,
    telegramLink,
    projectDescription,
    provideParticipants
    ) => {
  //input error handling
  if (!window.ethereum || walletAddress === null) {
    return {
      status:
        "💡 Connect your Metamask wallet to update the name on the blockchain.",
    };
  }

  //set up transaction parameters
  try {
    let addLinks = [];
    addLinks.push(logoLink);
    addLinks.push(websiteLink);
    addLinks.push(githubLink);
    addLinks.push(twitterLink);
    addLinks.push(redditLink);
    addLinks.push(telegramLink);
    addLinks.push(projectDescription);
    addLinks.push(provideParticipants);

    await presaleFactoryContract.methods.setTokenAdditionalInformationByID(id, addLinks).send({
        from: walletAddress
    });
    // await tokenContract.methods.setName(name).send({
    //   from: walletAddress,
    // //   value: web3.utils.toWei(value, 'ether'),
    // });
    return {
      status: '<span>✅<a target="_blank" href={`https://ropsten.etherscan.io/tx/${txHash}`}>View the status of your transaction on Etherscan!</a><br/>ℹ️ Once the transaction is verified by the network, the name will be updated automatically.</span>',
    };
  } catch (error) {
    return {
      status: "😥 " + error.message,
    };
  }
};

export const createPresale = async (
    walletAddress, 
    name, 
    symbol, 
    decimals) => {
  //input error handling
  if (!window.ethereum || walletAddress === null) {
    return {
      status:
        "💡 Connect your Metamask wallet to update the name on the blockchain.",
    };
  }

  if (name.trim() === "") {
    return {
      status: "❌ Your name cannot be an empty string.",
    };
  }
  //set up transaction parameters
  try {
    await presaleFactoryContract.methods.genCoin(name, symbol, decimals).send({
        from: walletAddress
    });
    // await tokenContract.methods.setName(name).send({
    //   from: walletAddress,
    // //   value: web3.utils.toWei(value, 'ether'),
    // });
    return {
      status: '<span>✅<a target="_blank" href={`https://ropsten.etherscan.io/tx/${txHash}`}>View the status of your transaction on Etherscan!</a><br/>ℹ️ Once the transaction is verified by the network, the name will be updated automatically.</span>',
    };
  } catch (error) {
    return {
      status: "😥 " + error.message,
    };
  }
};
