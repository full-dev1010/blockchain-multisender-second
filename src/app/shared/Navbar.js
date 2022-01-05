import React, { Component } from 'react';
import { Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Trans } from 'react-i18next';
import HeaderItemsPlus from '../headeritems/Itemsplus';
import ChangeNetworkBox from '../launchpad/components/ChangeNetworkBox';

import Marquee from 'react-fast-marquee';
import { useState, useEffect } from 'react';

import bscnetwork from '../../assets/new_images/icons/bscnetwork.png'

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

import {
  connectWallet,
  getCurrentWalletConnected,
} from "../launchpad/tokenAPI/utils/interact.js";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  borderRadius: '5px',
  boxShadow: 24,
};

const Navbar = () => {

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
    
  const [status, setStatus] = useState('');
  const [walletAddress, setWallet] = useState("");

  const connectWalletPressed = async () => {
    const walletResponse = await connectWallet();
    setStatus(walletResponse.status);
    setWallet(walletResponse.address);
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


  useEffect(() => {
    const asyncFetchTokenData = async () => {
      const { address, status } = await getCurrentWalletConnected();
      setWallet(address);
      setStatus(status);
      addWalletListener();  
    }
    asyncFetchTokenData();
  });

  const toggleOffcanvas = () => {
    document.querySelector('.sidebar-offcanvas').classList.toggle('active');    
  }

  const toggleRightSidebar = () => {
    document.querySelector('.right-sidebar').classList.toggle('open');
  }

  // toggleOffcanvas() {
  //   document.querySelector('.sidebar-offcanvas').classList.toggle('active');
  // }
  // toggleRightSidebar() {
  //   document.querySelector('.right-sidebar').classList.toggle('open');
  // }
  return (
      <nav className="navbar p-0 fixed-top d-flex flex-row">
        <div className="navbar-brand-wrapper d-flex d-lg-none align-items-center justify-content-center">
          <Link className="navbar-brand brand-logo-mini" to="/"><img src={require('../../assets/images/logo2.png')} alt="logo" /></Link>
        </div>
        <div className="navbar-menu-wrapper flex-grow d-flex align-items-stretch">
          {/* <button className="navbar-toggler align-self-center" type="button" onClick={ () => document.body.classList.toggle('sidebar-icon-only') }>
            <span className="mdi mdi-menu"></span>
          </button> */}
          <ul className="navbar-nav mobile-absolute">
            <li className="nav-item w-100">
                <div className="leftlabel">
                  <p className="labelletters labelletters-networks"><span className="top-pairs">Networks</span></p>
                </div>
                  <Marquee gradient={false} className="react-fast-scrolling">
                    <HeaderItemsPlus />
                  </Marquee>
            </li>
          </ul>
          <ul className="navbar-nav navbar-nav-right">
            <button className="btn btn-info bscnetwork-button"
              onClick={handleOpen}
            >
                <img src={bscnetwork}></img>
            </button>
            <Dropdown alignRight as="li" className="nav-item d-lg-block">
                <Dropdown.Toggle className="nav-link btn btn-blue create-new-button no-caret"
                  style={{display: walletAddress.length > 0 ? 'none' : 'block'}}
                  onClick={connectWalletPressed}>
                  <Trans>
                    {walletAddress.length > 0 ? ( 'Connect' ) : (
                        'Connect'
                      )}
                    </Trans>
                </Dropdown.Toggle>
              </Dropdown>
            <Dropdown alignRight as="li" className="nav-item mobile-display-none">
              <Dropdown.Toggle as="a" className="nav-link cursor-pointer no-caret">
                <div className="navbar-profile">
                  <p className="mb-0 d-none d-sm-block navbar-profile-name"><Trans>
                    {walletAddress.length > 0 ? (
                      String(walletAddress).substring(0, 6) +
                        "..." +
                      String(walletAddress).substr(38)
                      ) : (
                        ''
                      )}
                    </Trans></p>
                  <i className="mdi mdi-menu-down d-none d-sm-block"></i>
                </div>
              </Dropdown.Toggle>

              <Dropdown.Menu className="navbar-dropdown preview-list navbar-profile-dropdown-menu">
                <h6 className="p-3 mb-0"><Trans>Profile</Trans></h6>
                <Dropdown.Divider />
                <Dropdown.Item href="!#" onClick={evt =>evt.preventDefault()} className="preview-item">
                  <div className="preview-thumbnail">
                    <div className="preview-icon bg-dark rounded-circle">
                      <i className="mdi mdi-settings text-success"></i>
                    </div>
                  </div>
                  <div className="preview-item-content">
                    <p className="preview-subject mb-1"><Trans>Settings</Trans></p>
                  </div>
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item href="!#" onClick={evt =>evt.preventDefault()}  className="preview-item">
                  <div className="preview-thumbnail">
                    <div className="preview-icon bg-dark rounded-circle">
                      <i className="mdi mdi-logout text-danger"></i>
                    </div>
                  </div>
                  <div className="preview-item-content">
                    <p className="preview-subject mb-1"><Trans>Log Out</Trans></p>
                  </div>
                </Dropdown.Item>
                <Dropdown.Divider />
                <p className="p-3 mb-0 text-center"><Trans>Advanced settings</Trans></p>
              </Dropdown.Menu>
            </Dropdown>
          </ul>
          <button className="navbar-toggler navbar-toggler-right d-lg-none align-self-center" type="button" onClick={toggleOffcanvas}>
            <span className="mdi mdi-format-line-spacing"></span>
          </button>
        </div>

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="parent-modal-title"
          aria-describedby="parent-modal-description"
        >
          <Box sx={{ ...style, width: 650 }}>
            <ChangeNetworkBox />
          </Box>
        </Modal>
      </nav>
    );
}

export default Navbar;
