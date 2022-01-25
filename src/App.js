import { useEffect } from 'react';
import Web3Modal from 'web3modal';
import {ethers} from 'ethers';
import './App.css';

import Game from './artifacts/contracts/Game.sol/Game.json';
import DaiToken from './artifacts/contracts/DaiToken.sol/DaiToken.json';

import {gameAddress, tokenAddress, ggAddress} from './config'

function App() {

  let gameContract;
  let daiToken;

  useEffect(() => {
    loadWeb3()
  },[])

  async function loadWeb3() {
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()
    gameContract = new ethers.Contract(gameAddress, Game.abi, signer)
    daiToken = new ethers.Contract(tokenAddress, DaiToken.abi, signer)
  }

  async function approveGame() {
    let amount = ethers.utils.parseUnits('1', 'ether')
    await daiToken.approve(gameAddress, amount);
    await daiToken.approve(ggAddress, amount);
    await gameContract.approveGame({gasLimit:100000, gasPrice:2500000000})
  }

  async function joinGame() {
    // let amount = ethers.utils.parseUnits('1', 'ether')
    await gameContract.joinGame({gasLimit:100000, gasPrice:2500000000})
  }

  async function checkBalance() {
    const balance = await daiToken.balanceOf('0xc69a569405EAE312Ca13C2eD85a256FbE4992A35')
    console.log(balance.toString())
  }

  return (
    <div className="App">
    <h2>Hello World!</h2>
    <button onClick={approveGame}>Approve Game</button>
    <button onClick={joinGame}>Join Game</button>
    <button onClick={checkBalance}>Check Balance</button>
    </div>
  );
}

export default App;
