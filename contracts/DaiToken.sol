//SPDX-License-Identifier: MIT

pragma solidity 0.8.4;

interface DaiToken  { 
    function approve(address spender, uint256 value) external returns (bool success);
    function transfer(address to, uint256 value) external returns (bool success);
    function transferFrom(address from, address to, uint256 value) external returns (bool success);
    function balanceOf(address owner) external view returns (uint256 balance);
    function allowance(address owner, address spender) external view returns (uint256 remaining);
}