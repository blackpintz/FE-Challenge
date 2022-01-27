import { useEffect } from 'react';
import Web3Modal from 'web3modal';
import {ethers} from 'ethers';
import './App.css';

import Game from './artifacts/contracts/Game.sol/Game.json';
import DaiToken from './artifacts/contracts/DaiToken.sol/DaiToken.json';

import {gameAddress, tokenAddress} from './config'

function App() {
  
  let gameContract;
  let daiToken;
  let amount;
  let signer;

  useEffect(() => {
    loadWeb3()
  },[])

  async function loadWeb3() {
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    signer = provider.getSigner()
    gameContract = new ethers.Contract(gameAddress, Game.abi, signer)
    daiToken = new ethers.Contract(tokenAddress, DaiToken.abi, signer)
    amount = ethers.utils.parseUnits('1', 'ether')
    // ***Check Gas Estimates for txs***
    // const estimate = await gameContract.estimateGas.withdrawGame(amount)
    // console.log(estimate.toString())
  }

  async function misc() {
    const addr = await signer.getAddress()
    console.log(addr)
    await daiToken.approve('0xc69a569405EAE312Ca13C2eD85a256FbE4992A35', amount)
  }

  async function approveGame() {
    const allowance = await checkAllowance()
    const joined = await checkJoined()
    if(allowance.toString() !== amount.toString() && joined === false) {
      await daiToken.approve(gameAddress, amount);
    } else {
      console.log("You are already approved.")
    }
    
    
  }

  async function joinGame() {
    const allowance = await checkAllowance()
    if(allowance.toString() === amount.toString()) {
      await gameContract.joinGame(amount, {gasLimit:400000, gasPrice:2500000000})
    } else {
      console.log('Either you are not approved or you are already a player.')
    }
  }

  async function checkBalance() {
    const balance = await gameContract.checkBalance()
    // let value = ethers.utils.formatEther(balance)
    console.log(balance)
  }

  async function checkAllowance() {
    const allowance = await gameContract.checkAllowance()
    return allowance;
  }

  async function checkJoined() {
    const joined = await gameContract.checkJoined()
    return joined;
  }

  async function withdrawGame() {
    await gameContract.withdrawGame(amount, {gasLimit:300000, gasPrice:2500000000})
  }

  return (
    <div className="App">
    <h2>Hello World!</h2>
    <button onClick={approveGame}>Approve Game</button>
    <button onClick={joinGame}>Join Game</button>
    <button onClick={checkBalance}>Check Balance</button>
    <button onClick={checkAllowance}>Check Allowance</button>
    <button onClick={withdrawGame}>Withdraw Game</button>
    <button onClick={misc}>Misc</button>
    </div>
  );
}

export default App;
