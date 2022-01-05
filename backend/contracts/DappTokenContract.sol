pragma solidity ^0.4.24;
pragma experimental ABIEncoderV2;

import "https://github.com/ConsenSysMesh/real-estate-standards/node_modules/openzeppelin-solidity/contracts/token/ERC20/DetailedERC20.sol";
import "https://github.com/ConsenSysMesh/real-estate-standards/node_modules/openzeppelin-solidity/contracts/token/ERC20/MintableToken.sol";
import "https://github.com/ConsenSysMesh/real-estate-standards/node_modules/openzeppelin-solidity/contracts/token/ERC20/PausableToken.sol";

contract DappToken is MintableToken, PausableToken, DetailedERC20 {

    string public logoLink = '';
    string public websiteLink = '';
    string public githubLink = '';
    string public twitterLink = '';
    string public redditLink = '';
    string public telegramLink = '';
    string public projectDescription = '';
    string public provideParticipants = '';

    constructor(
        string[] memory tokenInfoLinks
    )
        DetailedERC20(tokenInfoLinks[0], tokenInfoLinks[1], 18)// DetailedERC20(_name, _symbol, 18)
        public
    {
        require(tokenInfoLinks.length >= 10, "info is not fullfill");
        logoLink = tokenInfoLinks[2]; //_logoLink;
        websiteLink = tokenInfoLinks[3]; //_websiteLink;
        githubLink = tokenInfoLinks[4]; //_githubLink;
        twitterLink = tokenInfoLinks[5]; //_twitterLink;
        redditLink = tokenInfoLinks[6]; //_redditLink;
        telegramLink = tokenInfoLinks[7]; //_telegramLink;
        projectDescription = tokenInfoLinks[8]; //_projectDescription;
        provideParticipants = tokenInfoLinks[9]; //_provideParticipants;
    }
    
    function setAdditionalInformation(string[] memory links) public{
        logoLink = links[0]; //_logoLink;
        websiteLink = links[1]; //_websiteLink;
        githubLink = links[2]; //_githubLink;
        twitterLink = links[3]; //_twitterLink;
        redditLink = links[4]; //_redditLink;
        telegramLink = links[5]; //_telegramLink;
        projectDescription = links[6]; //_projectDescription;
        provideParticipants = links[7]; //_provideParticipants;
    }

    
}
