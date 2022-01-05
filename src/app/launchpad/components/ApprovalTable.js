import React, { Component } from 'react'
import { Form } from 'react-bootstrap';
import { useState, useEffect } from 'react';


const ApprovalTable = ({recipientsList, scanUrl, isValid, txAddress, txScanUrl, isCheckTx}) => {
    const [currentRecipients, setCurrentRecipients] = useState([]);
    const [totalPages, setTotalPages] = useState((recipientsList.length + 5)/ 6);
    const [pageNumber, setPageNumber] = useState(1)
    const handleNextpage = () => {
        if(pageNumber < totalPages){
            setPageNumber(pageNumber + 1)
        }
    }
    const handlePrevpage = () => {
        if(pageNumber > 1){
            setPageNumber(pageNumber - 1)
        }
    }

    const calculateTotalTokenAmount = () => {
        let sum = 0;
        for (let i = 0; i < recipientsList.length; i++){
            sum += recipientsList[i].amount;
        }
        return sum;
    }

    const showRecipients = recipientsList.slice((pageNumber-1) * 6, pageNumber * 6);

    const convertTxAddress = (txAddress) => {
        txAddress = '0x3d1c07f7d2f6f0b32ddb696cef99d08c8c7ebd801b688efb636de6ed34c5b98c'
        return String(txAddress).substring(0, 20) +
                "..." +
            String(txAddress).substr(48);
    }

    return (
        <div className="div-approval-table row">
            <div className="table-title">List of recipients</div>
            <table>
                <thead>
                    <th>Address</th>
                    <th>Amount</th>
                </thead>
                <tbody>
                {showRecipients && showRecipients.map((item, index) => (
                    <tr>
                        <td><a href={scanUrl + item.address} target="_blank" role="button">{item.address}</a></td>
                        <td>{item.amount}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            <div className="div-pagination">
                <button className="btn-handler" onClick={handleNextpage}>
                    <i class="mdi mdi-chevron-right mdi-24px"></i>
                </button>
                <button className="btn-handler" onClick={handlePrevpage}>
                    <i class="mdi mdi-chevron-left mdi-24px"></i>
                </button>
                <span>{(pageNumber-1) * 6 + 1} - 
                { pageNumber * 6 > recipientsList.length ? recipientsList.length : pageNumber * 6}
                 / 
                {recipientsList.length}</span>

            </div>
            <div className="div-approval-amount">
                <div className="div-approval-amount-title">
                    { isValid ? 'Approve transaction hash' :
                        'Amount to approve'
                    }
                </div>
                <div className="div-approval-amount-select">
                    { !isValid && 
                        <Form.Group>
                            <div className="form-check">
                            <label className="form-check-label">
                                <input type="radio" className="form-check-input" name="optionsRadios" id="optionsRadios1" value=""/>
                                <i className="input-helper"></i>Exact amount to be sent ({calculateTotalTokenAmount()})
                            </label>
                            </div>
                            <div className="form-check">
                            <label className="form-check-label">
                                <input type="radio" className="form-check-input" name="optionsRadios" id="optionsRadios2" value="option2" defaultChecked/>
                                <i className="input-helper"></i>
                                Unlimited amount
                            </label>
                            </div>
                        </Form.Group>
                    }
                    { isValid && 
                        <div className="div-transaction-confirmed">
                            <a href={txScanUrl + txAddress} target="_blank" className="tx-address">{convertTxAddress(txAddress)}</a>
                            <span className="tx-status menu-icon">
                                <i className={"mdi mdi-" + (isCheckTx ? "check" : "close")}></i>
                            </span>

                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default ApprovalTable;
