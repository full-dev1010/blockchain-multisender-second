import React, { Component } from 'react';
import { Form } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import bsCustomFileInput from 'bs-custom-file-input';
import moment from 'moment';
import { ProgressBar } from 'react-bootstrap';

import bscnetwork from '../../assets/new_images/icons/bscnetwork.png'

import { useEffect, useState } from "react";
import {
    connectWallet,
    getCurrentWalletConnected,
    getTokenInfo,
    getPresaleInfo,
    getTokenAndPresaleAddress,
    getTimeWillStartAndEnd,
    getPresaledTotalAmount,
    setTokenAdditionalInformationByID,
    getPresaleTotalCount,
    getPresaleIdByWalletAddress,
    addManyToWhitelist,
    addToWhitelist
} from "./tokenAPI/utils/interact.js";

import {
    fromEther,
    calculatePercent
} from './tokenAPI/utils/ethers';

const ManagePresale = () => {
    const [walletAddress, setWallet] = useState("");
    const [status, setStatus] = useState("first");
    const [message, setMessage] = useState("No connection to the network."); //default message
    const [newMessage, setNewMessage] = useState("");

    const [tokenAddress, setTokenAddress] = useState('0xff90962f83810f1d4fbf4ba970a6b443b41267a5');
    const [presaleAddress, setPresaleAddress] = useState('0xff90962f83810f1d4fbf4ba970a6b443b41267a5');
    const [tokenName, setTokenName] = useState('Sphynx');
    const [tokenSymbol, setTokenSymbol] = useState('Sphynx');
    const [tokenDecimal, setTokenDecimal] = useState(18);
    const [presaleRate, setPresaleRate] = useState('500');
    const [softCap, setSoftCap] = useState('50');
    const [hardCap, setHardCap] = useState('100');
    const [minBuy, setMinBuy] = useState('0.01');
    const [maxBuy, setMaxBuy] = useState('10');
    const [swapLiquidity, setSwapLiquidity] = useState('70');
    const [swapListingRate, setSwapListingRate] = useState('400');
    const [presaleStartTime, setPresaleStartTime] = useState(moment(new Date()).format('MM/DD/YYYY, hh:mm A'));
    const [presaleEndTime, setPresaleEndTime] = useState(moment(new Date()).format('MM/DD/YYYY, hh:mm A'));
    const [liquidityLockedTime, setLiquidityLockedTime] = useState(moment(new Date()).format('MM/DD/YYYY, hh:mm A'));

    const [logoLink, setLogoLink] = useState('https://cryptologos.cc/logos/thumbs/basic-attention-token.png?v=014');
    const [websiteLink, setWebsiteLink] = useState('websiteLink');
    const [githubLink, setGithubLink] = useState('githubLink');
    const [twitterLink, setTwitterLink] = useState('twitterLink');
    const [redditLink, setRedditLink] = useState('redditLink');
    const [telegramLink, setTelegramLink] = useState('telegramLink');
    const [projectDescription, setProjectDescription] = useState('projectDescription');
    const [provideParticipants, setProvideParticipants] = useState('provideParticipants');

    const [weiRaised, setWeiRaised] = useState('0');
    const [percent, setPercent] = useState('0');
    const [presaleCount, setPresaleCount] = useState(0);
    const [currentPresaleId, setCurrentPresaleId] = useState(0);
    const [remainStartTime, setRemainStartTime] = useState(0);
    const [remainEndTime, setRemainEndTime] = useState(0);
    const [whitelistWalletAddress, setWhitelistWalletAddress] = useState("");

    const onUpdatePressed = async () => {
        const { status } = await setTokenAdditionalInformationByID(
            currentPresaleId,
            walletAddress,
            logoLink,
            websiteLink,
            githubLink,
            twitterLink,
            redditLink,
            telegramLink,
            projectDescription,
            provideParticipants
        );
        setStatus(status);
    };

    const onAddToWhitelist = async () => {
        if (whitelistWalletAddress.trim() == '') return;
        const { status } = addToWhitelist(walletAddress, currentPresaleId, whitelistWalletAddress);
        setStatus(status);
    }

    const onAddManyToWhitelist = async () => {
        if (whitelistWalletAddress.trim() == '') return;
        let arr = whitelistWalletAddress.split(',');
        const { status } = addToWhitelist(walletAddress, currentPresaleId, arr);
        setStatus(status);
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

    const asyncGetPresaleTotalCount = async () => {
        const value = await getPresaleTotalCount();
        setPresaleCount(value)
        return value;
    }

    const asyncFetchTokenData = async () => {

        const { address, status } = await getCurrentWalletConnected();

        setWallet(address);
        setStatus(status);
        addWalletListener();

        let currentPresaleId = await getPresaleIdByWalletAddress(address);
        console.log("CGI currentPresaleId", currentPresaleId);
        if (currentPresaleId >= presaleCount) {
            currentPresaleId--;
            // return;
        }

        setCurrentPresaleId(currentPresaleId);

        // console.log("CGI wallet", address);
        // console.log("CGI status", status);

        const tokenInfo = await getTokenInfo(currentPresaleId);
        setTokenName(tokenInfo.name);
        setTokenSymbol(tokenInfo.symbol);
        setTokenDecimal(tokenInfo.decimals);

        setLogoLink(tokenInfo.logoLink);
        setWebsiteLink(tokenInfo.websiteLink);
        setGithubLink(tokenInfo.githubLink);
        setTwitterLink(tokenInfo.twitterLink);
        setRedditLink(tokenInfo.redditLink);
        setTelegramLink(tokenInfo.redditLink);
        setProjectDescription(tokenInfo.projectDescription);
        setProvideParticipants(tokenInfo.provideParticipants);

        const presaleInfo = await getPresaleInfo(currentPresaleId);

        setPresaleRate(presaleInfo.presaleRate);
        setHardCap(fromEther(presaleInfo.hardCap));
        setSoftCap(fromEther(presaleInfo.softCap));
        setMaxBuy(fromEther(presaleInfo.maxBuy));
        setMinBuy(fromEther(presaleInfo.minBuy));
        setSwapLiquidity(presaleInfo.swapLiquidity);
        setSwapListingRate(presaleInfo.swapListingRate);
        setPresaleStartTime(moment(new Date(parseInt(presaleInfo.presaleStartTime))).format('MM/DD/YYYY, hh:mm A'));
        setPresaleEndTime(moment(new Date(parseInt(presaleInfo.presaleEndTime))).format('MM/DD/YYYY, hh:mm A'));
        setLiquidityLockedTime(moment(new Date(parseInt(presaleInfo.liquidityLockedTime))).format('MM/DD/YYYY, hh:mm A'));


        const weiRaised = await getPresaledTotalAmount(currentPresaleId);
        const percent = calculatePercent(weiRaised, presaleInfo.hardCap);

        setWeiRaised(weiRaised);
        setPercent(percent);

        const presaleAndTokenAddress = await getTokenAndPresaleAddress(currentPresaleId);
        const presaleRemainTime = await getTimeWillStartAndEnd(currentPresaleId);

        setRemainStartTime(presaleRemainTime.remainStartTime);
        setRemainEndTime(presaleRemainTime.remainEndTime);
        setTokenAddress(presaleAndTokenAddress.tokenAddress);
        setPresaleAddress(presaleAndTokenAddress.presaleAddress);

        // const value = await getLogoLink(tokenContract, 0);
        // setLogoLink(value);
    }

    useEffect(() => {
        bsCustomFileInput.init()
        if (status == 'first') {
            asyncGetPresaleTotalCount();
            asyncFetchTokenData();
        }
    });

    return (
        <div className="manage-presale">
            <div className="page-header">
                <h1>Manage Presale
                    {/* {myTokenSymbol} */}
                </h1>
                <nav aria-label="breadcrumb">
                    <button className="btn btn-info bscnetwork-button">
                        <img src={bscnetwork}></img>
                        BSC Network
                    </button>
                </nav>
                <p className="mobile-heading">Manage Presale</p>
            </div>
            <div className="">
                <div className="col-12 grid-margin stretch-card not-flex">
                    <div className="card create-sale-card">
                        <div className="card-body">
                            <div>
                                <img src={require('../../assets/images/new_images/images/spiral-notepad.png')} alt="logo" />
                                <a>Manage Presale</a>
                            </div>
                            <p>
                                <br />
                                Congratulations your presale is created successfully.
                                <br />
                            </p>
                            <p className="para-warning">
                                If your token contains special transfers such as burn, rebase or something else you must ensure the Presale LP Router Address and the Presale Address are excluded from these features! Or you must set fees, burns or whatever else to be 0 or disabled for the duration of the presale and until the finalize button is clicked!
                            </p>
                            <p className="router-address">Presale LP Router Address: {presaleAddress}</p>
                            <p className="preslae-address">Presale Address: {tokenAddress}</p>
                            <p className="detail-content">
                                - You must deposit the required number of tokens to the presale address to start the sale (Click the Deposit Tokens button below) <br />
                                - The finalize button will become available once you hit your hard cap or presale time ends.<br />
                                - Clicking the finalize button will list your token on SphynxSwap immediately. Listing will be done at the set SphynxSwap rate with liquidity locked by DxLock.<br />
                                - Once finalized your BNB will be released to the creation wallet.
                            </p>
                        </div>
                    </div>
                    <div className="second-blcok">
                        <p className="">Here is a summary of your presale (more details on the presale page):</p>
                        <div className="raised-progress">
                            <p className="progress-status">{weiRaised}/{hardCap} BNB Raised</p>
                            <ProgressBar variant="success" className="my-progress-bar" now={percent} />
                        </div>
                        <div className="token-address-container">
                            <div className="token-infos">
                                <p className="token-name">Name: {tokenName}</p>
                                <p className="token-name">Symbol: {tokenSymbol}</p>
                                <p className="token-name">Token Address: {tokenAddress}</p>
                                <p className="token-name">Shareable Presale Link: {websiteLink}</p>
                                <p className="token-name">Status:{status}</p>
                            </div>
                        </div>
                        <div className="">You need to deposit 71318400 FLOCK to complete your presale! (Total Tokens for Presale + SphynxSwap + Platform Fee)</div>
                        <div className="btn btn-rounded btn-info btn-lg deposit-token">DEPOSIT TOKENS</div>
                        <div className="warning-text">Make sure you disable fees before depositing or whitelist the presale address first!</div>
                        <div className="current-token-balance">Current Token Balance of Presale Address: 0</div>
                        <button className="btn btn-primary btn-rounded call-finalize disabled" disabled>CALL FINALIZE</button><br />
                        <div className="btn btn-primary btn-rounded cancel-sale">CANCEL SALE</div>
                        <div className="finalize-text">If you have trouble with finalizing please ensure the required address are whitelisted or your special transfer functions are disabled!</div>
                        <div>If you still cannot finalize then please cancel your sale and test your contract throughly on our supported test nets!</div>

                    </div>
                </div>
            </div>
            <div className="presale-whitelist">
                <div className="title-label">
                    <img src={require('../../assets/images/new_images/images/spiral-notepad.png')} alt="logo" />
                    <div>
                        <a>Presale Whitelist</a>
                        <p className="">Whitelist specific users that can contribute to the sale</p>
                    </div>
                </div>
                <div className="whitelist-status">Whitelist: <span>Active</span></div>
                <button className="btn btn-danger btn-rounded btn-lg btn-disable-whitelist">Disable Whitelist</button>
                <div className="red">If you disable whiltelists any users will be able to contribute! Once disabled a fee will need to be paid to re-enable again!</div>
                <Form.Group>
                    <label htmlFor="addRemoveAddress">Add/Remove Wallet Address from Whitelist (Comma seperated)</label>
                    <Form.Control type="text" id="addRemoveAddress"
                        name="walletAddress"
                        value={whitelistWalletAddress}
                        onChange={(e) => setWhitelistWalletAddress(e.target.value)}
                    />
                </Form.Group>
                <div className="action-buttons">
                    <button className="btn btn-info btn-rounded"
                        onClick={onAddToWhitelist}>ADD</button>
                    <button className="btn btn-info btn-rounded"
                        onClick={onAddManyToWhitelist}>REMOVE</button>
                    <button className="btn btn-info btn-rounded">SHOW WHITELIST</button>
                </div>
            </div>
            <div className="additional-presale-details">
                <div className="title-label">
                    <img src={require('../../assets/images/new_images/images/spiral-notepad.png')} alt="logo" />
                    <div>
                        <a>Additional Presale Details</a>
                        <p className="">Modify any additional information for your presale below:</p>
                    </div>
                </div>
                <form className="forms-sample forms-of-input">
                    <Form.Group>
                        <label htmlFor="inputLogoLink">
                            Logo Link: (URL must end with a supported image extension png, jpg, jpeg or gif)</label>
                        <Form.Control type="text" id="inputLogoLink"
                            name="logoLink"
                            value={logoLink} onChange={(e) => setLogoLink(e.target.value)}
                        />
                        <p className="hint">You can use a website like <span><a href="">PostImages</a></span> to upload your image then copy the direct link here in the above field</p>
                    </Form.Group>
                    <Form.Group>
                        <label htmlFor="inputWebsiteLink">
                            Website Link
                        </label>
                        <Form.Control type="text" id="inputWebsiteLink"
                            name="websiteLink"
                            value={websiteLink} onChange={(e) => setWebsiteLink(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group>
                        <label htmlFor="inputGithubLink">
                            Github Link
                        </label>
                        <Form.Control type="text" id="inputGithubLink"
                            name="githubLink"
                            value={githubLink} onChange={(e) => setGithubLink(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group>
                        <label htmlFor="inputTwitterLink">
                            Twitter Link
                        </label>
                        <Form.Control type="text" id="inputTwitterLink"
                            name="twitterLink"
                            value={twitterLink} onChange={(e) => setTwitterLink(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group>
                        <label htmlFor="inputRedditLink">
                            Reddit Link
                        </label>
                        <Form.Control type="text" id="inputRedditLink"
                            name="redditLink"
                            value={redditLink} onChange={(e) => setRedditLink(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group>
                        <label htmlFor="inputTelegramLink">
                            Telegram Link
                        </label>
                        <Form.Control type="text" id="inputTelegramLink"
                            name="telegramLink"
                            value={telegramLink} onChange={(e) => setTelegramLink(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group>
                        <label htmlFor="inputProjectDescription">
                            Project Description
                        </label>
                        <Form.Control type="text" id="inputProjectDescription"
                            name="projectDescription"
                            value={projectDescription} onChange={(e) => setProjectDescription(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group>
                        <label htmlFor="inputProvideParticipants">
                            Any update you want to provide to participants
                        </label>
                        <Form.Control type="text" id="inputProvideParticipants"
                            name="provideParticipants"
                            value={provideParticipants} onChange={(e) => setProvideParticipants(e.target.value)}
                        />
                    </Form.Group>
                </form>
                <button className="btn btn-primary btn-lg btn-rounded btn-update" onClick={onUpdatePressed}>UPDATE DATA</button>
            </div>
        </div >
    )
}

export default ManagePresale;

