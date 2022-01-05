import React, { Component } from 'react'

const FailedSaleButton = ({percent}) => {
    return (
        <div>
            <p className="failed-status">Failed Sale</p>
            <p className="percent">{percent}%</p>
        </div>
    )
}

export default FailedSaleButton;
