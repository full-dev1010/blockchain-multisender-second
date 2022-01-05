pragma solidity ^0.4.24;
pragma experimental ABIEncoderV2;

// import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol";

import "./PresaleSphynx.sol";
import "./DappToken.sol";

import "./Integers.sol";


contract PresaleFactorySphynx {

    mapping(address => DappToken) public tokens;
    address[] public tokenAddress;

    mapping(address => PresaleSphynx) public presales;
    address[] public presaleAddress;

    // DappTokenCrowdsale        
    
    function generateCoin(
        string[] presaleInfo,
        address _token,
        // ERC20 _token,
        address[] _walletAddress
    ) public payable{
        require(presaleInfo.length > 15, "not fullfill");
        // if (msg.value < 1000000000000000000 ) {
        //     revert("Only exact payments!");
        // }
        uint i;
        string[] memory _tokenInfolinks = new string[](10);
        for(i = 0; i < 10; i++) _tokenInfolinks[i] = presaleInfo[i];        
        DappToken newToken = new DappToken(
            _tokenInfolinks
        );
        
        // _conditionValues
        string[] memory _conditionValues = new string[](6);
        for(i = 0; i < 6; i++) _conditionValues[i] = presaleInfo[i + 10];        
        PresaleSphynx newPresale = new PresaleSphynx(
            _token,
            _conditionValues,
            _walletAddress
        );
        
        tokens[address(newToken)] = newToken;    
        tokenAddress.push(address(newToken));

        presales[address(newPresale)] = newPresale;    
        presaleAddress.push(address(newPresale));

    }
    
    function getTotalCount() public view returns(uint){
        return tokenAddress.length;
    }
    
    function setTokenAdditionalInformationByID(uint id, string[] memory links) public payable{
        require(id < tokenAddress.length, "id is over");
        // if (msg.value < 1000000000000000000 ) {
        //     revert("Only exact payments!");
        // }
        tokens[tokenAddress[id]].setAdditionalInformation(links);
    }

}
