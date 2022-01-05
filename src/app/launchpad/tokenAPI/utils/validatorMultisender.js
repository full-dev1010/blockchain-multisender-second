var WAValidator = require('wallet-address-validator');
const rx_live = /^[+-]?\d*(?:[.,]\d*)?$/;

export const validateAddress = (address, tokenSymbol) => {
    return WAValidator.validate(address, tokenSymbol);
}

export const validateTransaction = (address) => {
    return address.length == 66;
}

export const validateAmount = amount => {
    return rx_live.test(amount);
}

export const validateInvestorsList = content => {
    const investorsArray = content.split(/\r\n|\n|\r/);
    let count = 0;
    for(let i = 0; i < investorsArray.length; i++){
        const item = investorsArray[i].trim();
        if( item == '' ) continue;
        const arr = item.split(',');
        if( arr == undefined || arr.length < 2 ) return false;
        const address = arr[0].trim();
        const amount = arr[1].trim();
        if( address == '' || amount == ''
            || !validateAddress(address, 'ETH') || !validateAmount(amount) ) return false;
        count++;
    }
    return count < 2 ? false : true;
}

