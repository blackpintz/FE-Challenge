import { useEffect, useState } from 'react';
import Web3Modal from 'web3modal';
import {ethers} from 'ethers';
import './App.css';

import Game from './artifacts/contracts/Game.sol/Game.json';
import DaiToken from './artifacts/contracts/DaiToken.sol/DaiToken.json';

import {gameAddress, tokenAddress} from './config'

function App() {
  const [address, setAddress] = useState('');
  const [network, setNetwork] = useState('no value');
  const [netName, setName] = useState('')
  const [gameContract, setGameContract] = useState(undefined);
  const [daiToken, setDaiToken] = useState(undefined);
  const [amount, setAmount] = useState(undefined);
  const [connected, setConnected] = useState(false)

  async function connectWallet() {
    if(window.ethereum) {
      const accounts = await window.ethereum.request({method: 'eth_requestAccounts'})
      setAddress(accounts[0])
      const network = await window.ethereum.request({method: 'eth_chainId'})
      setNetwork(network)
      const web3Modal = new Web3Modal()
      const connection = await web3Modal.connect()
      const provider = new ethers.providers.Web3Provider(connection, 'any')
      const signer = await provider.getSigner()
      const gameContract = new ethers.Contract(gameAddress, Game.abi, signer)
      setGameContract(gameContract)
      const daiToken = new ethers.Contract(tokenAddress, DaiToken.abi, signer)
      setDaiToken(daiToken)
      const amount = ethers.utils.parseUnits('1', 'ether')
      setAmount(amount)
      setConnected(true)
      const {name} = await provider.getNetwork()
      setName(name)
    } else {
      console.log('Install Metamask.')
    }
  }

  const handleAccountChanged = (accounts) => {
    setAddress(accounts[0])
  }

  const networkChanged = async (chainId) => {
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection, 'any')
    const {name} = await provider.getNetwork()
    setName(name)
    setNetwork(chainId)
  }

  useEffect(() => {
    window.ethereum.on('accountsChanged', handleAccountChanged);
    window.ethereum.on("chainChanged", networkChanged);

    return () => {
      window.ethereum.removeListener('accountsChanged', handleAccountChanged);
      window.ethereum.removeListener("chainChanged", networkChanged);
    }
  },[])

  async function switchNetwork() {
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{chainId: '0x2a'}]
    })
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
    <h2>Saving Game</h2>
    {connected ? (
      <>
        <h4>Address: {address}</h4>
        <h4>Network: {netName}</h4>
        {network === '0x2a' ? (
          <>
          <div>
          <button onClick={approveGame}>Approve Game</button>
          </div>
          <div>
          <button onClick={joinGame}>Join Game</button>
          </div>
          <div>
          <button onClick={withdrawGame}>Withdraw Game</button>
          </div>
          </>
        ) : (
          <>
          <h5>Please switch to Kovan network</h5>
          <button onClick={switchNetwork}>Switch to Kovan</button>
          </>
        )}
      </>
    ) : (
      <>
      <button onClick={connectWallet}>Connect Wallet</button>
      </>
    )}
    </div>
  );
}

export default App;
