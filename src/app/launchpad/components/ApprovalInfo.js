import React, { Component } from 'react'

const ApprovalInfo = ({approvalCount, totalTokenAmount, ownerTokenBalance, ownerMainCoinBalance, tokenName, mainCoinName}) => {
    return (
        <div className="div-approval-info row">
            <div className="row">
                <div className="col-md-3">
                    <div className="view-value">{approvalCount}</div>
                    <div className="description">Your current multisender approval</div>
                </div>
                <div className="col-md-3">
                    <div className="view-value">{totalTokenAmount} &nbsp; {tokenName}</div>
                    <div className="description">Total number of tokens to send</div>
                </div>
                <div className="col-md-3">
                    <div className="view-value">{ownerTokenBalance} &nbsp; {tokenName}</div>
                    <div className="description">Your token balance</div>
                </div>
                <div className="col-md-3">
                    <div className="view-value">{ownerMainCoinBalance}</div>
                    <div className="description">Your {mainCoinName} balance</div>
                </div>
            </div>
            <div className="div-approval-description">The full estimate will be shown on the next page</div>
        </div>

    )
}

export default ApprovalInfo;
