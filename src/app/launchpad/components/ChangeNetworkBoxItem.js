import { styled } from '@material-ui/styles'
import React, { useState, useEffect } from 'react'

const style = {
    flex: 'none',
    width: '33.33333%',
    display: 'block',
    padding: '0.75rem',
    item: {
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        fontSize: '.929rem',
        border: '1px solid transparent',
        backgroundColor: 'hsla(0,0%,100%,.1)',
        transition: 'background-color .15s ease-in-out',
        padding: '1rem',
        height: '66px',
        borderRadius: '6px',
    },
    img: {
        width: '20px',
        height: '21px',
    },
    name: {
        marginLeft: '12px',
        fontSize: '14px'
    }
}


const ChangeNetworkBoxItem = ({networkName, url, active, onClick}) => {

    const [opacity, setOpacity] = useState('1')
    const contentBackgroundColor = active == true ? '#17264f' : 'hsla(0,0%,100%,.1)'
    const contentBorderColor = active == true ? '#10b3ff' : 'transparent'

    let contentStyle = {
        ...style,
        opacity: `${opacity}`,
    }

    let itemStyle = {
        ...style.item,
        backgroundColor: `${contentBackgroundColor}`,
        borderColor: `${contentBorderColor}`    
    }

    return (
        <div 
            style={contentStyle}
            onMouseEnter={() => setOpacity('0.8')}
            onMouseLeave={() => setOpacity('1.0')}
            onClick={onClick}
        >
            <div style={itemStyle}>
                <img src={url} style={style.img}></img>
                <span style={style.name}>{networkName}</span>
            </div>
        </div>
    )
}

export default ChangeNetworkBoxItem;
