import React, { Component } from 'react'

const PendingSaleButton = ({percent}) => {
    return (
        <div>
            <p className="pending-status">Pending Sale</p>
            <p className="percent">{percent}%</p>
        </div>
    )
}

export default PendingSaleButton;
