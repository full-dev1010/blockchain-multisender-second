import React, { useState } from 'react'
import networkList from '../networks';
import ChangeNetworkBoxItem from './ChangeNetworkBoxItem'

const style = {
    box: {
        backgroundColor: '#0b152d',
        width: '100%',
        borderRadius: '5px',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        backgroundColor: '#152856',
        color: 'white',
        fontSize: '20px',
        width: '100%',
        textAlign: 'center',
        padding: '12px',
        borderBottom: '1px solid #1677b8',
        borderTopLeftRadius: '6px',
        borderTopRightRadius: '6px',    
    },
}

const networkData = networkList

const ChangeNetworkBox = ({}) => {

    const [selectedID, setSelectedID] = useState(-1);

    return (
        <div style={style.box}>
            <div style={style.title}>Change Network</div>
            {networkData && networkData.map((item, index) => (
                <ChangeNetworkBoxItem 
                    networkName={item.networkName}
                    url={item.url}
                    idx={index}
                    active={selectedID == index}
                    onClick={() => {setSelectedID(index)}}
                />
            ))}

        </div>
    )
}

export default ChangeNetworkBox;
