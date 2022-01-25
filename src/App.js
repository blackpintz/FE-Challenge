import { useEffect } from 'react';
import Web3Modal from 'web3modal';
import {ethers} from 'ethers';
import './App.css';

import GoodGhosting from './artifacts/contracts/GoodGhosting.sol/GoodGhosting.json';
import DaiToken from './artifacts/contracts/DaiToken.sol/DaiToken.json';

import {ggAddress, tokenAddress} from './config'

function App() {
  
  let ggContract;
  let daiToken;
  let amount;

  useEffect(() => {
    loadWeb3()
  },[])

  async function loadWeb3() {
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()
    ggContract = new ethers.Contract(ggAddress, GoodGhosting.abi, signer)
    daiToken = new ethers.Contract(tokenAddress, DaiToken.abi, signer)
    amount = ethers.utils.parseUnits('1', 'ether')
  }

  async function approveGame() {
    const allowance = await checkAllowance()
    const joined = await checkJoined()
    if(allowance.toString() !== amount.toString() && joined === false) {
      await daiToken.approve(ggAddress, amount);
    } else {
      console.log("You are already approved.")
    }
    
    
  }

  async function joinGame() {
    const allowance = await checkAllowance()
    if(allowance.toString() === amount.toString()) {
      await ggContract.joinGame(amount, {gasLimit:100000, gasPrice:2500000000})
    } else {
      console.log('Either you are not approved or you are already a player.')
    }
  }

  async function checkBalance() {
    let amount = ethers.utils.parseUnits('1', 'ether')
    const balance = await ggContract.checkBalance()
    // let value = ethers.utils.formatEther(balance)
    console.log(balance)
  }

  async function checkAllowance() {
    const allowance = await ggContract.checkAllowance()
    return allowance;
  }

  async function checkJoined() {
    const joined = await ggContract.checkJoined()
    return joined;
  }

  async function withdrawGame() {
    let amount = ethers.utils.parseUnits('1', 'ether')
    await ggContract.withdrawGame(amount, {gasLimit:100000, gasPrice:2500000000})
  }

  return (
    <div className="App">
    <h2>Hello World!</h2>
    <button onClick={approveGame}>Approve Game</button>
    <button onClick={joinGame}>Join Game</button>
    <button onClick={checkBalance}>Check Balance</button>
    <button onClick={checkAllowance}>Check Allowance</button>
    <button onClick={withdrawGame}>Withdraw Game</button>
    </div>
  );
}

export default App;
