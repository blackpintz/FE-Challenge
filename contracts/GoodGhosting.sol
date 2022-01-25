//SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

import "@openzeppelin/contracts/utils/Counters.sol";
import './DaiToken.sol';

contract GoodGhosting {
    DaiToken public daiToken;

    mapping(address => bool) public playerJoins;

    constructor() {
        daiToken = DaiToken(0xFf795577d9AC8bD7D90Ee22b6C1703490b6512FD);
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
         playerJoins[msg.sender] = true;
    }

    function withdrawGame(uint _amount) public payable {
        require(playerJoins[msg.sender] == true, 'You are not a player.');
        uint discountedAmount = _amount * 99/100;
        daiToken.transfer(msg.sender, discountedAmount);
        playerJoins[msg.sender] = false;
    }
}
