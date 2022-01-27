//SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

import './DaiToken.sol';
import './GoodGhosting.sol';

contract Game {
    address wallet = 0xc69a569405EAE312Ca13C2eD85a256FbE4992A35;
    DaiToken public daiToken;
    GoodGhosting public goodGhosting;

    mapping(address => bool) public playerJoins;

    constructor() {
        daiToken = DaiToken(0xFf795577d9AC8bD7D90Ee22b6C1703490b6512FD);
        goodGhosting = GoodGhosting(wallet);
    }

    function checkJoined() public view returns(bool) {
        return playerJoins[msg.sender];
    }


    function checkAllowance() public view returns(uint) {
        return daiToken.allowance(msg.sender, address(this));
    }

    function joinGame(uint _amount) public payable {
        require(playerJoins[msg.sender] == false, 'You are already a player.');
         daiToken.transferFrom(msg.sender, address(this), _amount);
         daiToken.approve(wallet, _amount);
         goodGhosting.joinGame();
         playerJoins[msg.sender] = true;
    }

    function withdrawGame(uint _amount) public payable {
        require(playerJoins[msg.sender] == true, 'You are not a player.');
        uint discountedAmount = _amount * 99/100;
        goodGhosting.earlyWithdraw();
        daiToken.transfer(msg.sender, discountedAmount);
        playerJoins[msg.sender] = false;
    }
}
