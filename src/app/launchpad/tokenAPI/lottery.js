import web3 from './utils/web3';
import tokenAbi from './abi/FLOCKchain.json';

const address = '0xff90962f83810f1d4fbf4ba970a6b443b41267a5';

const abi = tokenAbi;

// @ts-ignore
export default new web3.eth.Contract(abi, address);