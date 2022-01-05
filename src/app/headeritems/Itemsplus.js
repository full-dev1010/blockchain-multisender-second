import React, { Component } from 'react';
import Marquee from 'react-fast-marquee';
import networkList from '../launchpad/networks';

class HeaderItemsPlus extends Component {
    state = {
        tokennames: [],
    }
    componentDidMount() {
        this.setState({
            tokennames: networkList
        })
    }

    render() {
        const { tokennames } = this.state;
        return (
            <>
                    {tokennames && tokennames.map((tokenname, index) => (
                        <>
                            <img className="imgMarqueeNetwork" src={tokenname.url}></img>
                            <p className="pairs">{tokenname.name}</p>&nbsp;&nbsp;&nbsp;
                        </>
                    ))}
            </>
        )
    }
}

export default HeaderItemsPlus;