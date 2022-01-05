pragma solidity 0.4.24;
pragma experimental ABIEncoderV2;

import "https://github.com/ConsenSysMesh/real-estate-standards/node_modules/openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";
import "https://github.com/ConsenSysMesh/real-estate-standards/node_modules/openzeppelin-solidity/contracts/token/ERC20/PausableToken.sol";
import "https://github.com/ConsenSysMesh/real-estate-standards/node_modules/openzeppelin-solidity/contracts/token/ERC20/MintableToken.sol";
import "https://github.com/ConsenSysMesh/real-estate-standards/node_modules/openzeppelin-solidity/contracts/token/ERC20/TokenTimelock.sol";
import "https://github.com/ConsenSysMesh/real-estate-standards/node_modules/openzeppelin-solidity/contracts/crowdsale/Crowdsale.sol";
import "https://github.com/ConsenSysMesh/real-estate-standards/node_modules/openzeppelin-solidity/contracts/crowdsale/emission/MintedCrowdsale.sol";
import "https://github.com/ConsenSysMesh/real-estate-standards/node_modules/openzeppelin-solidity/contracts/crowdsale/validation/CappedCrowdsale.sol";
import "https://github.com/ConsenSysMesh/real-estate-standards/node_modules/openzeppelin-solidity/contracts/crowdsale/validation/TimedCrowdsale.sol";
import "https://github.com/ConsenSysMesh/real-estate-standards/node_modules/openzeppelin-solidity/contracts/crowdsale/validation/WhitelistedCrowdsale.sol";
import "https://github.com/ConsenSysMesh/real-estate-standards/node_modules/openzeppelin-solidity/contracts/crowdsale/distribution/RefundableCrowdsale.sol";

import "./Integers.sol";

// DappTokenCrowdsale

contract PresaleSphynx is Crowdsale, MintedCrowdsale, CappedCrowdsale, TimedCrowdsale, WhitelistedCrowdsale, RefundableCrowdsale {

    // using Integers for string;

  // Track investor contributions
  uint256 public investorMinBuy = 100000000000000000; // 0.1 ether
  uint256 public investorMaxBuy = 10000000000000000000; // 10 ether

  uint256 public investorSoftCap = 50; // 50%
  uint256 public investorHardCap = 100; // 100%

  mapping(address => uint256) public contributions;

  // Crowdsale Stages
  enum CrowdsaleStage { PreICO, ICO }
  // Default to presale stage
  CrowdsaleStage public stage = CrowdsaleStage.PreICO;

  // Token Distribution
  uint256 public tokenSalePercentage   = 70;
  uint256 public foundersPercentage    = 10;
  uint256 public foundationPercentage  = 10;
  uint256 public partnersPercentage    = 10;

  // Token reserve funds
  address public foundersFund;
  address public foundationFund;
  address public partnersFund;

  // Token time lock
  uint256 public releaseTime;
  address public foundersTimelock;
  address public foundationTimelock;
  address public partnersTimelock;
    
// uint256[] conditionValues;
    // 0: _rate,
    // 1: _cap, => maxBuy
    // 2: _goal, => minBuy
    // 3: _openingTime,
    // 4: _closingTime,
    // 5: _releaseTime,
// address[] walletAddress
    // 0: _wallet
    // 1: _foundersFund
    // 2: _foundationFund,
    // 3: _partnersFund
   
  constructor(
    // ERC20 _token,
    address _token,
    string[] _conditionValues,
    address[] _walletAddress
  )
    Crowdsale( Integers.parseInt(_conditionValues[0]), _walletAddress[0], ERC20(_token))    // Crowdsale(_rate, _wallet, _token)
    CappedCrowdsale( Integers.parseInt(_conditionValues[1]))    // CappedCrowdsale(_cap)
    TimedCrowdsale( Integers.parseInt(_conditionValues[3]), Integers.parseInt(_conditionValues[4]))    // TimedCrowdsale(_openingTime, _closingTime)
    RefundableCrowdsale( Integers.parseInt(_conditionValues[2]))    // RefundableCrowdsale(_goal)
    public
  {
    require(_conditionValues.length >= 6 && _walletAddress.length >= 4 && Integers.parseInt(_conditionValues[2]) < Integers.parseInt(_conditionValues[1]), "aaa");    // require(_goal <= _cap);
    // require(Integers.parseInt(_conditionValues[4]) < Integers.parseInt(_conditionValues[1]));    // require(_goal <= _cap);
    foundersFund = _walletAddress[1];    // foundersFund   = _foundersFund;
    foundationFund = _walletAddress[2];    // foundationFund = _foundationFund;
    partnersFund = _walletAddress[3];    // partnersFund   = _partnersFund;
    releaseTime = Integers.parseInt(_conditionValues[5]);    // releaseTime    = _releaseTime;
  }

  /**
  * @dev Returns the amount contributed so far by a sepecific user.
  * @param _beneficiary Address of contributor
  * @return User contribution so far
  */
  function getUserContribution(address _beneficiary)
    public view returns (uint256)
  {
    return contributions[_beneficiary];
  }

  /**
  * @dev Allows admin to update the crowdsale stage
  * @param _stage Crowdsale stage
  */
  function setCrowdsaleStage(uint _stage) public onlyOwner {
    if(uint(CrowdsaleStage.PreICO) == _stage) {
      stage = CrowdsaleStage.PreICO;
    } else if (uint(CrowdsaleStage.ICO) == _stage) {
      stage = CrowdsaleStage.ICO;
    }

    if(stage == CrowdsaleStage.PreICO) {
      rate = 500;
    } else if (stage == CrowdsaleStage.ICO) {
      rate = 250;
    }
  }

  /**
   * @dev forwards funds to the wallet during the PreICO stage, then the refund vault during ICO stage
   */
  function _forwardFunds() internal {
    if(stage == CrowdsaleStage.PreICO) {
      wallet.transfer(msg.value);
    } else if (stage == CrowdsaleStage.ICO) {
      super._forwardFunds();
    }
  }

  /**
  * @dev Extend parent behavior requiring purchase to respect investor min/max funding cap.
  * @param _beneficiary Token purchaser
  * @param _weiAmount Amount of wei contributed
  */
  function _preValidatePurchase(
    address _beneficiary,
    uint256 _weiAmount
  )
    internal
  {
    super._preValidatePurchase(_beneficiary, _weiAmount);
    uint256 _existingContribution = contributions[_beneficiary];
    uint256 _newContribution = _existingContribution.add(_weiAmount);
    require(_newContribution >= investorSoftCap && _newContribution <= investorHardCap);
    contributions[_beneficiary] = _newContribution;
  }


  /**
   * @dev enables token transfers, called when owner calls finalize()
  */
  function finalization() internal {
    if(goalReached()) {
      MintableToken _mintableToken = MintableToken(token);
      uint256 _alreadyMinted = _mintableToken.totalSupply();

      uint256 _finalTotalSupply = _alreadyMinted.div(tokenSalePercentage).mul(100);

      foundersTimelock   = new TokenTimelock(token, foundersFund, releaseTime);
      foundationTimelock = new TokenTimelock(token, foundationFund, releaseTime);
      partnersTimelock   = new TokenTimelock(token, partnersFund, releaseTime);

      _mintableToken.mint(address(foundersTimelock),   _finalTotalSupply.mul(foundersPercentage).div(100));
      _mintableToken.mint(address(foundationTimelock), _finalTotalSupply.mul(foundationPercentage).div(100));
      _mintableToken.mint(address(partnersTimelock),   _finalTotalSupply.mul(partnersPercentage).div(100));

      _mintableToken.finishMinting();
      // Unpause the token
      PausableToken _pausableToken = PausableToken(token);
      _pausableToken.unpause();
      _pausableToken.transferOwnership(wallet);
    }

    super.finalization();
  }

}
