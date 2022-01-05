import React, { Component } from 'react';
import { Form } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import bsCustomFileInput from 'bs-custom-file-input';
import ReactApexChart from 'react-apexcharts';
import { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';

import logo from '../../assets/new_images/images/logo.png';
import bscnetwork from '../../assets/new_images/icons/bscnetwork.png';
import life from '../../assets/new_images/images/life.png';
import shiva from '../../assets/new_images/images/shiva.png';
import sniffer from '../../assets/new_images/images/sniffer.png';
import lambo from '../../assets/new_images/images/lambo.png';
import afi from '../../assets/new_images/images/afi.png';
import galabet from '../../assets/new_images/images/galabet.png'

import ActiveSaleButton from './components/ActiveSaleButton';
import PendingSaleButton from './components/PendingSaleButton';
import FailedSaleButton from './components/FailedSaleButton';

import moment from 'moment';
import {
  getCurrentWalletConnected,
  getTokenInfo,
  getPresaleInfo,
  getTokenAndPresaleAddress,
  getPresaleTotalCount
} from "./tokenAPI/utils/interact.js";
import { fromEther} from './tokenAPI/utils/ethers';


export default function LaunchpadListings() {

  let presaleData = [
    {
      presaleId: 1,
      tokenName: 'LAMBO',
      tokenSymbol: 'Lambo Sports',
      presaleStartTime: '06:23:49:16',
      presaleEndTime: '06:23:49:16',
      img: lambo,
      saleStatus: 'pending',
      percent: [1]
    },
    {
      presaleId: 2,
      tokenName: 'AFI',
      tokenSymbol: 'Afi Token',
      presaleStartTime: '06:23:49:16',
      presaleEndTime: '06:23:49:16',
      img: afi,
      saleStatus: 'failed',
      percent: [2]
    },
    {
      presaleId: 3,
      tokenName: 'GALABET',
      tokenSymbol: 'Galabet',
      presaleStartTime: '06:23:49:16',
      presaleEndTime: '06:23:49:16',
      img: galabet,
      saleStatus: 'pending',
      percent: [3]
    },
    {
      presaleId: 4,
      tokenName: 'SHIVA',
      tokenSymbol: 'Shiva Token',
      presaleStartTime: '06:23:49:16',
      presaleEndTime: '06:23:49:16',
      img: shiva,
      saleStatus: 'pending',
      percent: [4]
    },
    {
      presaleId: 5,
      tokenName: 'SHIVA',
      tokenSymbol: 'Shiva Token',
      presaleStartTime: '06:23:49:16',
      presaleEndTime: '06:23:49:16',
      img: shiva,
      saleStatus: 'pending',
      percent: [5]
    },
    {
      presaleId: 6,
      tokenName: 'SPHYNX',
      tokenSymbol: 'Sphynx Token',
      presaleStartTime: '06:23:49:16',
      presaleEndTime: '06:23:49:16',
      img: logo,
      saleStatus: 'active',
      percent: [6]
    },
    {
      presaleId: 7,
      tokenName: 'SHIVA',
      tokenSymbol: 'Shiva Token',
      presaleStartTime: '06:23:49:16',
      presaleEndTime: '06:23:49:16',
      img: shiva,
      saleStatus: 'active',
      percent: [7]
    },
    {
      presaleId: 8,
      tokenName: 'SNIFFER',
      tokenSymbol: 'Sniffer Scan',
      presaleStartTime: '06:23:49:16',
      presaleEndTime: '06:23:49:16',
      img: sniffer,
      saleStatus: 'active',
      percent: [8]
    },
    {
      presaleId: 9,
      tokenName: 'SNIFFER',
      tokenSymbol: 'Sniffer Scan',
      presaleStartTime: '06:23:49:16',
      presaleEndTime: '06:23:49:16',
      img: sniffer,
      saleStatus: 'active',
      percent: [9]
    },
    {
      presaleId: 10,
      tokenName: 'LAMBO',
      tokenSymbol: 'Lambo Sports',
      presaleStartTime: '06:23:49:16',
      presaleEndTime: '06:23:49:16',
      img: lambo,
      saleStatus: 'pending',
      percent: [10]
    },
    {
      presaleId: 11,
      tokenName: 'AFI',
      tokenSymbol: 'Afi Token',
      presaleStartTime: '06:23:49:16',
      presaleEndTime: '06:23:49:16',
      img: afi,
      saleStatus: 'failed',
      percent: [11]
    },
    {
      presaleId: 12,
      tokenName: 'GALABET',
      tokenSymbol: 'Galabet',
      presaleStartTime: '06:23:49:16',
      presaleEndTime: '06:23:49:16',
      img: galabet,
      saleStatus: 'pending',
      percent: [12]
    },
    {
      presaleId: 13,
      tokenName: 'SHIVA',
      tokenSymbol: 'Shiva Token',
      presaleStartTime: '06:23:49:13',
      presaleEndTime: '06:23:49:16',
      img: shiva,
      saleStatus: 'pending',
      percent: [16]
    },
    {
      presaleId: 14,
      tokenName: 'SHIVA',
      tokenSymbol: 'Shiva Token',
      presaleStartTime: '06:23:49:16',
      presaleEndTime: '06:23:49:16',
      img: shiva,
      saleStatus: 'pending',
      percent: [14]
    },
    {
      presaleId: 17,
      tokenName: 'SPHYNX',
      tokenSymbol: 'Sphynx Token',
      presaleStartTime: '06:23:49:16',
      presaleEndTime: '06:23:49:16',
      img: logo,
      saleStatus: 'active',
      percent: [17]
    },
    {
      presaleId: 16,
      tokenName: 'SHIVA',
      tokenSymbol: 'Shiva Token',
      presaleStartTime: '06:23:49:16',
      presaleEndTime: '06:23:49:16',
      img: shiva,
      saleStatus: 'active',
      percent: [16]
    },
    {
      presaleId: 15,
      tokenName: 'SNIFFER',
      tokenSymbol: 'Sniffer Scan',
      presaleStartTime: '06:23:49:16',
      presaleEndTime: '06:23:49:16',
      img: sniffer,
      saleStatus: 'active',
      percent: [15]
    },
  ]

  const state = {
    options: {
      fill: {
        colors: 'rgba(139,42,155, 1)',
      },
      plotOptions: {
        radialBar: {
          track: {
            background: 'rgba(255, 255, 255, 1)',
          },
          hollow: {
            size: "55%",
          },
          dataLabels: {
            show: false
          }
        },
      },
      stroke: {
        lineCap: "round",
      },
    },
  }

  
  const [page, setPage] = useState(1);
  const [contracts, setContracts] = useState([]);
  // const [contracts, setContracts] = useState(presaleData);
  const [searchedContracts, setSearchedContracts] = useState('');
  const [status, setStatus] = useState('');
  const [walletAddress, setWallet] = useState("");
  const [presaleCount, setPresaleCount] = useState(0);
  const [currentPresaleId, setIncreasePresaleId] = useState(0);
  
  const handleSearch = (event) => {
    setSearchedContracts(event.target.value);
  };
  const handleSelect = (event) => {
    setStatus(event.target.value);
  };

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

  const asyncFetchData = async () => {
    // const { address, status } = await getCurrentWalletConnected();
    // setWallet(address);
    // setStatus(status);
    // addWalletListener();
    const presaleCount = await getPresaleTotalCount();
    console.log("CGI presaleCount ", presaleCount);
    let i;
    let updateData = [];
    for(i = presaleCount - 1; i >= 0; i--){
      const tokenInfo = await getTokenInfo(i);
      const presaleInfo = await getPresaleInfo(i);
      const presaleAndTokenAddress = await getTokenAndPresaleAddress(i);
      // TODO: should
      console.log("CGI getPresaleInfo(id)", i);
      updateData.push(
        {
          presaleId: i,
          tokenName: tokenInfo.name,
          tokenSymbol: tokenInfo.symbol,
          presaleStartTime: moment(new Date(parseInt(presaleInfo.presaleStartTime))).format('DD:hh:mm:ss'),
          presaleEndTime: moment(new Date(parseInt(presaleInfo.presaleEndTime))).format('DD:hh:mm:ss'),
          img: tokenInfo.logoLink,
          saleStatus: 'pending',
          percent: [i]
        }  
      );
      // setContracts(updateData);  
    }
    // for(i = 16; i >= 0; i--) {
    //   updateData.push(presaleData[i]);
    // }
    setContracts(updateData);
  }

  // getPresaleTotalCount
  useEffect(() => {
    asyncFetchData();
    console.log("CGI presaleData is ", contracts);
  });

  const filteredContracts = contracts.filter(
    contract => {
      if(status !== "all"){
        return contract.tokenName.toLowerCase().includes(searchedContracts.toLowerCase()) && contract.saleStatus.toLowerCase().includes(status.toLocaleLowerCase())
      }else if(status === "all"){
        return contract.tokenName.toLowerCase().includes(searchedContracts.toLowerCase())
      }
    }
  )

const [totalPages, setTotalPages] = useState();
const [pageNumber, setPageNumber] = useState(1)
const [loadMoreCount, setLoadMore] = useState(0);
useEffect(() => {
  setTotalPages(Math.ceil(filteredContracts.length / 6))
});

const handleNextpage = () => {
  if(pageNumber < totalPages){
    setPageNumber(pageNumber + 1)
    setLoadMore(0);
  }
}

const handlePrevpage = () => {
  if(pageNumber > 1){
    setPageNumber(pageNumber - 1)
    setLoadMore(0);
  }
}

const handleLoadMore = () => {
  setLoadMore(loadMoreCount + 1);
}

const showPages = filteredContracts.slice((pageNumber-1) * 6, (pageNumber + loadMoreCount) * 6);

  return (
      <div className="launchpad-listings">
        <div className="page-header sub-launchpad">
          <h1>Launchpad Listings</h1>
          <nav aria-label="breadcrumb">
            <button className="btn btn-info bscnetwork-button">
              <img src={bscnetwork}></img>
              BSC Network
            </button>
          </nav>
          <p className="mobile-heading">Launchpad Listings</p>
        </div>
        <div className="forms-parent">
          <Form.Group>
            <label htmlFor="salesStatus">STORE BY</label>
            <select className="form-control" name="filterValue" value={status} id="salesStatus" onChange={handleSelect}>
              <option value="all">All</option>
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="failed">Failed</option>
            </select>
          </Form.Group>
          <Form.Group>
            <label htmlFor="exampleInputName1">SEARCH</label>
            <Form.Control type="text" className="form-control" name="searchValue" id="exampleInputName1" placeholder="Name" onChange={handleSearch} />
          </Form.Group>
        </div>
        <div className="row">
          {showPages && showPages.map((contract, index) => (
            <div className="col-xl-4 col-sm-6 grid-margin stretch-card" key={index}>
              <div className="card">
                <div className="card-body custom-card token-card social-card">
                  <div className="card-header-container">
                    <div className="card-header-subcontainer">
                      <img src={contract.img} className="card-image" />
                      <div className="token-content">
                        <p className="token-name">{contract.tokenName}</p>
                        <p className="token-style">{contract.tokenSymbol}</p>
                      </div>
                    </div>
                    {contract.saleStatus === "active" &&
                      <div className="sales-time">
                        <p>Sales end in:</p>
                        <p>{contract.presaleEndTime}</p>
                      </div>
                    }
                    {contract.saleStatus === "pending" &&
                      <div className="sales-time">
                        <p>Sales start in:</p>
                        <p>{contract.presaleStartTime}</p>
                      </div>
                    }
                    {contract.saleStatus === "failed" &&
                      <div className="sales-time">
                      </div>
                    }
                  </div>
                  <Link to={"/launchpad/presale-" +
                    (contract.saleStatus == 'pending' ? 'live' : 'complete')
                    + "/" + contract.presaleId} 
                    className="link-to-presale-live">
                  <div id="chart" className="chart">
                    <ReactApexChart
                      options={state.options}
                      series={contract.percent}
                      type="radialBar"
                      height={300}
                    />
                    <div className="chart-lables">
                      {contract.saleStatus === "active" &&
                        <ActiveSaleButton percent={contract.percent} />
                      }
                      {contract.saleStatus === "pending" &&
                        <PendingSaleButton percent={contract.percent} />
                      }
                      {contract.saleStatus === "failed" &&
                        <FailedSaleButton percent={contract.percent} />
                      }
                    </div>
                  </div>
                  <div><p className="raised">Raised: 0.00/300</p></div>
                  <div><p className="under-raised">Soft Cap/Hard Cap: 150/300 BNB</p></div>
                  <div><p className="double-under-raised">Min/Max contribution: 0.1/3 BNB</p></div>
                  </Link>
                  <div className="token-card-footer"><div className="tooltips"><img src={life} /><span className="tooltiptext">Tokens can be clones and can have the same name as existing coins. Token creators can pretend to be owners of the real project. Please use provided social links to research and examine every project to avoid scams.</span></div><p className="custom-contract">Custom Contract</p></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="loadmore-button">
          <button className="btn btn-info btn-lg" onClick={handleLoadMore}>Load More</button>
        </div>
        <hr className="horizon-line" />
        <div className="page-button-container">
          <button className="btn btn-info" onClick={handlePrevpage}>←</button>
          <p>Page {pageNumber} of {totalPages}</p>
          <button className="btn btn-info" onClick={handleNextpage}>→</button>
        </div>
      </div>
  )
}