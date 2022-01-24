//SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

import './DaiToken.sol';

contract GoodGhosting {
    address wallet = 0xc69a569405EAE312Ca13C2eD85a256FbE4992A35;
    DaiToken public daiToken;

    constructor() {
        daiToken = DaiToken(0xFf795577d9AC8bD7D90Ee22b6C1703490b6512FD);
    }

    function approveGame(uint _amount) public {
        daiToken.transferFrom(msg.sender, address(this), _amount);
    }

    function joinGame(uint _amount) public payable {
        daiToken.transfer(wallet, _amount);
    }

    function withdrawGame(uint _amount) public payable {
        uint discountedAmount = _amount * 99/100;
        daiToken.transfer(msg.sender, discountedAmount);
    }
}
