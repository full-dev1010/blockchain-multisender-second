import React, { Component } from 'react';
import { Doughnut } from 'react-chartjs-2';
import Slider from "react-slick";
import { TodoListComponent } from '../apps/TodoList'
import { VectorMap } from "react-jvectormap";
import yellowtoken from '../../assets/new_images/images/yellowtoken.png';
import logo from '../../assets/new_images/images/logo.png';
import token1 from '../../assets/new_images/images/token1.png';
import token2 from '../../assets/new_images/images/token2.png';
import token3 from '../../assets/new_images/images/token3.png';
import twitter from '.././../assets/new_images/images/twitter.png';
import file from '../../assets/new_images/images/file.png';
import discord from '../../assets/new_images/images/discord.png';
import telegram from '../../assets/new_images/images/telegram.png';
import bscnetwork from '../../assets/new_images/icons/bscnetwork.png'



export class Dashboard extends Component {
  render () {
    return (
      <div>
        <div className="top-line">
          <button className="btn btn-info bscnetwork-button">
            <img src={bscnetwork}></img>
            BSC Network
          </button>
        </div>
        <div className="welcome">
          <div><p className="sub-welcome">Welcome To Token MultiSender!</p></div>
          <div>
            <p className="sub-welcome-content">A tool that allows you to batch send ERC20 tokens.
            </p>
          </div>
          <div>
            <button className="btn btn-info btn-lg create-presale">Create Presale</button>
          </div>
        </div>
        
        <div className="row container-prices-card">
          <div className="col-xl-3 col-sm-6 grid-margin stretch-card">
            <div className="card">
              <div className="card-body custom-card">
                <p className="price">$ 1.8M</p>
                <p className="card-content">Total Liquidity Raised</p>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-sm-6 grid-margin stretch-card">
            <div className="card">
              <div className="card-body custom-card">
                <p className="price">12</p>
                <p className="card-content">Projects</p>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-sm-6 grid-margin stretch-card">
            <div className="card">
              <div className="card-body custom-card">
                <p className="price">3200</p>
                <p className="card-content">Participants</p>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-sm-6 grid-margin stretch-card">
            <div className="card">
              <div className="card-body custom-card">
                <p className="price">$ 1.8M</p>
                <p className="card-content">Total Liquidity Raised</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="blockchain">
            <p className="blockchains">Blockchains</p>
          <div className="supported-blockchain"><p className="sub-support">SUPPORTED BLOCKCHAIN</p></div>
          <div className="parent-yellow-token"><img src={yellowtoken} /></div>
          <div><p className="binance">Binance</p></div>
        </div>

          <div><p className="ecosystem">Ecosystem</p></div>
          <div><p className="header-ecosystem">A NEW REVOLUTIONARY ECOSYSTEM</p></div>
          <div className="row justify-content-center token-parent">
          <div className="col-xl-3 col-sm-6 grid-margin stretch-card">
            <div className="card">
              <div className="card-body custom-card token-card">
                <img src={logo} />
                <p className="card-content">Sphynx Swap</p>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-sm-6 grid-margin stretch-card">
            <div className="card">
              <div className="card-body custom-card token-card">
                <img src={token1} />
                <p className="card-content">Sphynx Token</p>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-sm-6 grid-margin stretch-card">
            <div className="card">
              <div className="card-body custom-card token-card">
                <img src={token2} />
                <p className="card-content">Sphynx TV</p>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-sm-6 grid-margin stretch-card">
            <div className="card">
              <div className="card-body custom-card token-card">
                <img src={logo} />
                <p className="card-content">Sphynx Wallet</p>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-sm-6 grid-margin stretch-card">
            <div className="card">
              <div className="card-body custom-card token-card">
                <img src={logo} />
                <p className="card-content">Sphynx Sale</p>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-sm-6 grid-margin stretch-card">
            <div className="card">
              <div className="card-body custom-card token-card">
                <img src={token3} />
                <p className="card-content">Sphynx NFT’s</p>
              </div>
            </div>
          </div>
        </div>

        <div className="community">
          <div><p className="community">Community</p></div>
          <div><p className="community-header">BE A PART OF ACTIVE COMMUNITY</p></div>
        </div>

        <div className="row social-tags">
        <div className="col-xl-3 col-sm-6 grid-margin stretch-card">
            <div className="card">
              <div className="card-body custom-card token-card social-card">
                <img src={twitter} />
                <p className="card-content">Follow us on Twitter</p>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-sm-6 grid-margin stretch-card">
            <div className="card">
              <div className="card-body custom-card token-card social-card">
                <img src={telegram} />
                <p className="card-content">Join Community on Telegram</p>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-sm-6 grid-margin stretch-card">
            <div className="card">
              <div className="card-body custom-card token-card social-card">
                <img src={file} />
                <p className="card-content">Read our Documentation</p>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-sm-6 grid-margin stretch-card">
            <div className="card">
              <div className="card-body custom-card token-card social-card">
                <img src={discord} />
                <p className="card-content">Join Discord</p>
              </div>
            </div>
          </div>
        </div>
        
          </div>
       
    );
  }
}

export default Dashboard;