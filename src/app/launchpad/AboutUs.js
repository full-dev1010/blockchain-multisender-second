import React, { Component } from 'react';

import { useEffect, useState } from "react";
const AboutUs = () => {
  const [networkName, setnetworkName] = useState("Binance");

    useEffect(() => {
    });
  
    return (
      <div className="div-aboutus">
        <div className="row-header">
            <div className="aboutus-title">About us</div>
            <div className="aboutus-description">
            This DApp allows users to send thousands of tokens to multiple addresses efficiently by batching the transfers and automating the process. This tool enables users to save time by automatically generating transactions on MetaMask. Multisender also allows users to maintain their account secure by delegating the trust of their private keys to a safe MetaMask wallet. This tool is in production since 2022. It accounts for over 20,000 transactions on Mainnet, which is equivalent to a few billion dollars. You can find the Multisender Smart contract along with all previous transactions on {networkName} .
            </div>
        </div>

        <div className="div-tutorial-video">
            <div className="tutorial-video-title">Tutorial Video</div>
            <div className="tutorial-video">
            </div>
        </div>

        <div className="div-how-to">
            <div className="how-to-title">How to send ERC20 tokens to multiple addresses</div>
            <div className="how-to-description">
                <div className="how-to-subtitle">
                    Multisend of ERC20 token
                </div>
                <div className="how-to-subdescription">
                    <ul class="info-list">
                        <li class="info-list__item">
                            Connect your wallet to the app.
                        </li><li class="info-list__item">
                            Select your token and specify a list of addresses in CSV format, if you don't know what CSV is click the 'Show example CSV' button.
                        </li><li class="info-list__item">
                            Click 'Send' and proceed to the next step.
                        </li><li class="info-list__item">
                            Click 'Approve' and confirm in the wallet.
                        </li><li class="info-list__item">
                            Click 'Proceed' and go to the third step.
                        </li><li class="info-list__item">
                            This step shows the full estimation. Also you can change the values of gas price, we don't recommend changing these values.
                        </li><li class="info-list__item">
                            Click 'Proceed' and confirm the transactions in the wallet.
                        </li><li class="info-list__item">
                            Done!
                        </li>
                    </ul>
                </div>
            </div>
        </div>
      </div>

    );
  };
  
export default AboutUs;

