import React, { Component } from 'react';
import { useEffect, useState } from "react";
import Accordion from '@material-ui/core/Accordion';  
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';


const Faq = () => {
  const [networkName, setnetworkName] = useState("Binance");
  const [expanded, setExpanded] = useState('panel1');

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

    useEffect(() => {
    });
  
    return (
      <div className="div-faq">
        <div className="div-faq-title">
            <div className="faq-title">Frequently asked questions</div>
        </div>
        <Accordion disableGutters expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
            <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                <div className="faq-subtitle">What is Multisender?
                    <div className="div-expanded-status">
                        <i className={"mdi mdi-chevron-" + (expanded ==='panel1' ? 'up' : 'down')}></i>
                    </div>
                </div>
            </AccordionSummary>
            <AccordionDetails>
                <div className="div-how-to">
                    <div className="how-to-description only-description">
                        <div className="how-to-subdescription">
                        This DApp allows users to send thousands of tokens to multiple addresses efficiently by batching the transfers and automating the process. This tool enables users to save time by automatically generating transactions on MetaMask. Multisender also allows users to maintain their account secure by delegating the trust of their private keys to a safe MetaMask wallet.                        
                        </div>
                    </div>
                </div>
            </AccordionDetails>
        </Accordion>

        <Accordion disableGutters expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
            <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                <div className="faq-subtitle">Is it a safe tool?
                    <div className="div-expanded-status">
                        <i className={"mdi mdi-chevron-" + (expanded ==='panel2' ? 'up' : 'down')}></i>
                    </div>
                </div>
            </AccordionSummary>
            <AccordionDetails>
                <div className="div-how-to">
                    <div className="how-to-description only-description">
                        <div className="how-to-subdescription">
                        Yes. This tool is in production since 2018. It accounts for over 20,000 transactions on Mainnet, which is equivalent to a few billion dollars. You can find the Multisender Smart contract along with all previous transactions on Etherscan.
                        </div>
                    </div>
                </div>
            </AccordionDetails>
        </Accordion>

        <Accordion disableGutters expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
            <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                <div className="faq-subtitle">How much time multisending take?
                    <div className="div-expanded-status">
                        <i className={"mdi mdi-chevron-" + (expanded ==='panel3' ? 'up' : 'down')}></i>
                    </div>
                </div>
            </AccordionSummary>
            <AccordionDetails>
                <div className="div-how-to">
                    <div className="how-to-description only-description">
                        <div className="how-to-subdescription">
                        It depends on the gas price and network congestion. Usually, it takes 3 to 5 minutes.
                        </div>
                    </div>
                </div>
            </AccordionDetails>
        </Accordion>

        <Accordion disableGutters expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
            <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                <div className="faq-subtitle">How to use the tool?
                    <div className="div-expanded-status">
                        <i className={"mdi mdi-chevron-" + (expanded ==='panel4' ? 'up' : 'down')}></i>
                    </div>
                </div>
            </AccordionSummary>
            <AccordionDetails>

                <div className="div-tutorial-video">
                    <div className="tutorial-video">
                    </div>
                </div>
                <div className="div-how-to">
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
            </AccordionDetails>
        </Accordion>

        <Accordion disableGutters expanded={expanded === 'panel5'} onChange={handleChange('panel5')}>
            <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                <div className="faq-subtitle">Which wallets can I use?
                    <div className="div-expanded-status">
                        <i className={"mdi mdi-chevron-" + (expanded ==='panel5' ? 'up' : 'down')}></i>
                    </div>
                </div>
            </AccordionSummary>
            <AccordionDetails>
                <div className="div-how-to">
                    <div className="how-to-description only-description">
                        <div className="how-to-subdescription">
                        You can use Metamask, hardware wallets or any wallet that is supported by WalletConnect.
                        </div>
                    </div>
                </div>
            </AccordionDetails>
        </Accordion>

        <Accordion disableGutters expanded={expanded === 'panel6'} onChange={handleChange('panel6')}>
            <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                <div className="faq-subtitle">How much does it cost to use Multisender?
                    <div className="div-expanded-status">
                        <i className={"mdi mdi-chevron-" + (expanded ==='panel6' ? 'up' : 'down')}></i>
                    </div>
                </div>
            </AccordionSummary>
            <AccordionDetails>
                <div className="div-how-to">
                    <div className="how-to-description only-description">
                        <div className="how-to-subdescription">
                        The cost of the transaction depends of varies on your specific ERC-20 token implementation the number of addresses, network specifics and the number of tokens to be sent. The best estimate is to engage in using the tool and before confirming the transactions you’ll see the cost of the planned multisend. It’ll take you only 2-3 minutes.
                        </div>
                    </div>
                </div>
            </AccordionDetails>
        </Accordion>

        <Accordion disableGutters expanded={expanded === 'panel7'} onChange={handleChange('panel7')}>
            <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                <div className="faq-subtitle">What does VIP give?
                    <div className="div-expanded-status">
                        <i className={"mdi mdi-chevron-" + (expanded ==='panel7' ? 'up' : 'down')}></i>
                    </div>
                </div>
            </AccordionSummary>
            <AccordionDetails>
                <div className="div-how-to">
                    <div className="how-to-description only-description">
                        <div className="how-to-subdescription">
                        With VIP, all your transactions will be free. You will only need to pay for the network fees. VIP makes using Multisender cheaper when you have a very long list of addresses.
                        </div>
                    </div>
                </div>
            </AccordionDetails>
        </Accordion>

        <Accordion disableGutters expanded={expanded === 'panel8'} onChange={handleChange('panel8')}>
            <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                <div className="faq-subtitle">What if it's too expensive for me?
                    <div className="div-expanded-status">
                        <i className={"mdi mdi-chevron-" + (expanded ==='panel8' ? 'up' : 'down')}></i>
                    </div>
                </div>
            </AccordionSummary>
            <AccordionDetails>
                <div className="div-how-to">
                    <div className="how-to-description only-description">
                        <div className="how-to-subdescription">
                        In order to apply for our discount program, please contact us on Telegram.
                        </div>
                    </div>
                </div>
            </AccordionDetails>
        </Accordion>

        <Accordion disableGutters expanded={expanded === 'panel9'} onChange={handleChange('panel9')}>
            <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                <div className="faq-subtitle">Can I test the app on a Testnet?
                    <div className="div-expanded-status">
                        <i className={"mdi mdi-chevron-" + (expanded ==='panel9' ? 'up' : 'down')}></i>
                    </div>
                </div>
            </AccordionSummary>
            <AccordionDetails>
                <div className="div-how-to">
                    <div className="how-to-description only-description">
                        <div className="how-to-subdescription">
                        Absolutely! You can use Goerli or Kovan for testing to make sure that everything is working as expected.
                        </div>
                    </div>
                </div>
            </AccordionDetails>
        </Accordion>

        <Accordion disableGutters expanded={expanded === 'panel10'} onChange={handleChange('panel10')}>
            <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                <div className="faq-subtitle">The maximum number of addresses to which you can send at one time?
                    <div className="div-expanded-status">
                        <i className={"mdi mdi-chevron-" + (expanded ==='panel10' ? 'up' : 'down')}></i>
                    </div>
                </div>
            </AccordionSummary>
            <AccordionDetails>
                <div className="div-how-to">
                    <div className="how-to-description only-description">
                        <div className="how-to-subdescription">
                        There are no restrictions. You can send as many tokens as wanted to as many addresses as you wanted.
                        </div>
                    </div>
                </div>
            </AccordionDetails>
        </Accordion>

        <Accordion disableGutters expanded={expanded === 'panel11'} onChange={handleChange('panel11')}>
            <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                <div className="faq-subtitle">How many addresses per batch?
                    <div className="div-expanded-status">
                        <i className={"mdi mdi-chevron-" + (expanded ==='panel11' ? 'up' : 'down')}></i>
                    </div>
                </div>
            </AccordionSummary>
            <AccordionDetails>
                <div className="div-how-to">
                    <div className="how-to-description only-description">
                        <div className="how-to-subdescription">
                        With Multisender, your recipients' addresses are grouped by batches to be split into multiples transactions. Each batch can hold 200-400 addresses depending on your specific ERC-20 token implementation.
                        </div>
                    </div>
                </div>
            </AccordionDetails>
        </Accordion>

        <Accordion disableGutters expanded={expanded === 'panel12'} onChange={handleChange('panel12')}>
            <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                <div className="faq-subtitle">What is a deflationary token?
                    <div className="div-expanded-status">
                        <i className={"mdi mdi-chevron-" + (expanded ==='panel12' ? 'up' : 'down')}></i>
                    </div>
                </div>
            </AccordionSummary>
            <AccordionDetails>
                <div className="div-how-to">
                    <div className="how-to-description only-description">
                        <div className="how-to-subdescription">
                        It's a token that doesn't follow ERC-20 standards. Usually, it’s a token that burns a certain amount at each transfer.
                        </div>
                    </div>
                </div>
            </AccordionDetails>
        </Accordion>

        <Accordion disableGutters expanded={expanded === 'panel13'} onChange={handleChange('panel13')}>
            <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                <div className="faq-subtitle">Which chains does Multisender support?
                    <div className="div-expanded-status">
                        <i className={"mdi mdi-chevron-" + (expanded ==='panel13' ? 'up' : 'down')}></i>
                    </div>
                </div>
            </AccordionSummary>
            <AccordionDetails>
                <div className="div-how-to">
                    <div className="how-to-description only-description">
                        <div className="how-to-subdescription">
                        The application supports Ethereum Mainnet, Binance Smart Chain, Avalanche C Chain, Fantom Opera, IoTeX, Matic Network, POA Network, xDai, Arbitrum One, Moonriver, Cronos.
                        </div>
                    </div>
                </div>
            </AccordionDetails>
        </Accordion>

        <Accordion disableGutters expanded={expanded === 'panel14'} onChange={handleChange('panel14')}>
            <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                <div className="faq-subtitle">How to switch from a chain to another?
                    <div className="div-expanded-status">
                        <i className={"mdi mdi-chevron-" + (expanded ==='panel14' ? 'up' : 'down')}></i>
                    </div>
                </div>
            </AccordionSummary>
            <AccordionDetails>
                <div className="div-how-to">
                    <div className="how-to-description only-description">
                        <div className="how-to-subdescription">
                        By clicking on the button with the chain icon in the upper right corner of the page.
                        </div>
                    </div>
                </div>
            </AccordionDetails>
        </Accordion>

        <Accordion disableGutters expanded={expanded === 'panel15'} onChange={handleChange('panel15')}>
            <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                <div className="faq-subtitle">What does the «Approve» mean?
                    <div className="div-expanded-status">
                        <i className={"mdi mdi-chevron-" + (expanded ==='panel15' ? 'up' : 'down')}></i>
                    </div>
                </div>
            </AccordionSummary>
            <AccordionDetails>
                <div className="div-how-to">
                    <div className="how-to-description only-description">
                        <div className="how-to-subdescription">
                        You give permission to the app contract to send your tokens to the addresses you provided.
                        </div>
                    </div>
                </div>
            </AccordionDetails>
        </Accordion>

        <Accordion disableGutters expanded={expanded === 'panel16'} onChange={handleChange('panel16')}>
            <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                <div className="faq-subtitle">On the second step, I get the following error message: Insufficient balance on your account.
                    <div className="div-expanded-status">
                        <i className={"mdi mdi-chevron-" + (expanded ==='panel16' ? 'up' : 'down')}></i>
                    </div>
                </div>
            </AccordionSummary>
            <AccordionDetails>
                <div className="div-how-to">
                    <div className="how-to-description only-description">
                        <div className="how-to-subdescription">
                        The app simulates a multisend to make sure that everything is in order and will go well. For this operation, your balance must be greater than the amount on the error message. Please top up your balance.
                        </div>
                    </div>
                </div>
            </AccordionDetails>
        </Accordion>

        <Accordion disableGutters expanded={expanded === 'panel17'} onChange={handleChange('panel17')}>
            <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                <div className="faq-subtitle">What is self-generated key?
                    <div className="div-expanded-status">
                        <i className={"mdi mdi-chevron-" + (expanded ==='panel17' ? 'up' : 'down')}></i>
                    </div>
                </div>
            </AccordionSummary>
            <AccordionDetails>
                <div className="div-how-to">
                    <div className="how-to-description only-description">
                        <div className="how-to-subdescription">
                        This is the fastest recommended way to use Multisender. The app generates a burner key on your device. After the burner key receives the funds, it will automatically post all your transactions on the blockchain.
                        </div>
                    </div>
                </div>
            </AccordionDetails>
        </Accordion>

        <Accordion disableGutters expanded={expanded === 'panel18'} onChange={handleChange('panel18')}>
            <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                <div className="faq-subtitle">Which wallets can I use?
                    <div className="div-expanded-status">
                        <i className={"mdi mdi-chevron-" + (expanded ==='panel18' ? 'up' : 'down')}></i>
                    </div>
                </div>
            </AccordionSummary>
            <AccordionDetails>
                <div className="div-tutorial-video">
                    <div className="tutorial-video">
                    </div>
                </div>
                <div className="div-how-to">
                    <div className="how-to-description">
                        <div className="how-to-subtitle">
                            Multisend using self-generated key
                        </div>
                        <div className="how-to-subdescription">
                            <p>
                            If the app calculated 5 or more transactions you can proceed with self-generated key, it will generate a burner key on your device in your browser storage and it will automatically post all transactions to the blockchain.
                            </p>
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
                                    Select 'self-generated key', click 'Sign key' and sign the message in your wallet.
                                </li><li class="info-list__item">
                                    Click 'Proceed with self-generated key' and confirm the transaction in the wallet.
                                </li><li class="info-list__item">
                                    Done! You don't have to do anything else. You don't need to press any buttons. Everything is already done. Just wait until all transactions are mined.
                                </li><li class="info-list__item">
                                    After the multisend is completed, there may be some funds left on your self-generated key. To refund these funds go to the 'Profile' page and click 'Refund' button under the field with your private key. Keep in mind that the key will be stored in your browser cache until you start a new multisend.
                                </li>
                                </ul>                        
                        </div>
                    </div>
                </div>
            </AccordionDetails>
        </Accordion>

        <Accordion disableGutters expanded={expanded === 'panel19'} onChange={handleChange('panel19')}>
            <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                <div className="faq-subtitle">How can I restore my self-generated key?
                    <div className="div-expanded-status">
                        <i className={"mdi mdi-chevron-" + (expanded ==='panel19' ? 'up' : 'down')}></i>
                    </div>
                </div>
            </AccordionSummary>
            <AccordionDetails>
                <div className="div-how-to">
                    <div className="how-to-description only-description">
                        <div className="how-to-subdescription">
                        There is no way to restore a self-generated key. However, you can ask for a refund on the profile page.
                        </div>
                    </div>
                </div>
            </AccordionDetails>
        </Accordion>

        <Accordion disableGutters expanded={expanded === 'panel20'} onChange={handleChange('panel20')}>
            <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                <div className="faq-subtitle">Does Multisender have API?
                    <div className="div-expanded-status">
                        <i className={"mdi mdi-chevron-" + (expanded ==='panel20' ? 'up' : 'down')}></i>
                    </div>
                </div>
            </AccordionSummary>
            <AccordionDetails>
                <div className="div-how-to">
                    <div className="how-to-description only-description">
                        <div className="how-to-subdescription">
                        You can prefill the form with query parameters

                        Query Parameters:

                        TOKEN - token address
                        CSV - your list separated with
                        Example

                        https://multisender.app/?token=0x000000000000000000000000000000000000bEEF&csv=0x0039f22efb07a647557c7c5d17854cfd6d489ef3,1\n0xC8c30Fa803833dD1Fd6DBCDd91Ed0b301EFf87cF,2
                        </div>
                    </div>
                </div>
            </AccordionDetails>
        </Accordion>

      </div>

    );
  };
  
export default Faq;

