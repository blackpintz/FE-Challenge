//SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";

import './DaiToken.sol';
import './GoodGhosting.sol';

contract Game {
    using SafeMath for uint256;
    address wallet = 0xc69a569405EAE312Ca13C2eD85a256FbE4992A35;
    DaiToken public daiToken;
    GoodGhosting public goodGhosting;

    constructor() {
        daiToken = DaiToken(0xFf795577d9AC8bD7D90Ee22b6C1703490b6512FD);
        goodGhosting = GoodGhosting(wallet);
    }

    function approveGame() public {
        daiToken.transferFrom(msg.sender, wallet, 1);
    }

    function joinGame() public payable {
        goodGhosting.joinGame();
    }

    function withdrawGame(uint _amount) public payable {
        uint discountedAmount = _amount * 99/100;
        daiToken.transfer(msg.sender, discountedAmount);
    }
}
