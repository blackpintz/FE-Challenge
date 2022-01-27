import { useEffect, useState } from 'react';
import Web3Modal from 'web3modal';
import {ethers} from 'ethers';
import './App.css';

import Game from './artifacts/contracts/Game.sol/Game.json';
import DaiToken from './artifacts/contracts/DaiToken.sol/DaiToken.json';

import {gameAddress, tokenAddress} from './config'

function App() {
  const [address, setAddress] = useState('')
  const [network, setNetwork] = useState('')
  let gameContract;
  let daiToken;
  let amount;
  let signerAddress;

  const handleAccountChanged = (accounts) => {
    setAddress(accounts[0])
  }

  useEffect(() => {
    window.ethereum.on('accountsChanged', handleAccountChanged)
    loadWeb3()

    return () => {
      window.ethereum.removeListener('accountsChanged', handleAccountChanged);
    }
  },[])


  async function loadWeb3() {
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()
    signerAddress = await signer.getAddress()
    setAddress(signerAddress)
    gameContract = new ethers.Contract(gameAddress, Game.abi, signer)
    daiToken = new ethers.Contract(tokenAddress, DaiToken.abi, signer)
    amount = ethers.utils.parseUnits('1', 'ether')
    // ***Check Gas Estimates for txs***
    // const estimate = await gameContract.estimateGas.withdrawGame(amount)
    // console.log(estimate.toString())
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
    <h4>Network:{network}</h4>
    <h4>Address: {address}</h4>
    <button onClick={approveGame}>Approve Game</button>
    <button onClick={joinGame}>Join Game</button>
    <button onClick={withdrawGame}>Withdraw Game</button>
    </div>
  );
}

export default App;
