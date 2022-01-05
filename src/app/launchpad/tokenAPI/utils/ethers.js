import web3 from './web3';
import { BigNumber } from "bignumber.js";

// const {
//     BigNumber,
// } = require("@ethersproject/bignumber");


// const TenBN = BigNumber.from(10);
// const EtherBN = TenBN.pow(BigNumber.from(18));
const TenBN = new BigNumber(10);
const EtherBN = (TenBN).pow(18);

export const ether = function(n) {
    let a = new BigNumber(n);
    return a.multipliedBy(EtherBN);
    // return BigNumber.from(web3.utils.toWei(n, 'ether'));
}

export const fromEther = function(n){
    let a = new BigNumber(n);
    return a.div(EtherBN).toString();
}

export const calculatePercent = function(a, b){
    let na = new BigNumber(a);
    let hundred = new BigNumber(100);
    let nb = new BigNumber(b);
    return na.multipliedBy(hundred).div(nb).toString();
}
  