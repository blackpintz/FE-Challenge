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
  }

  async function approveGame() {
    let amount = ethers.utils.parseUnits('1', 'ether')
    await daiToken.approve(ggAddress, amount);
  }

  async function joinGame() {
    let amount = ethers.utils.parseUnits('1', 'ether')
    await ggContract.joinGame(amount, {gasLimit:100000, gasPrice:2500000000})
  }

  async function checkBalance() {
    const balance = await daiToken.balanceOf(ggAddress)
    console.log(balance.toString())
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
    <button onClick={withdrawGame}>Withdraw Game</button>
    </div>
  );
}

export default App;
