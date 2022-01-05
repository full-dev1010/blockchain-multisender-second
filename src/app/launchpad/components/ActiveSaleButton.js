
import React, { Component } from 'react'

const ActiveSaleButton = ({percent}) => {
    return (
        <div>
            <p className="active-status">Active Sale</p>
            <p className="percent">{percent}%</p>
        </div>
    )
}

export default ActiveSaleButton;
