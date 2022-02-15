import React  from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

 
const wallet_address = '0x8C80F6003f0aF11d2BF0FCb850C8eDEC120990fc'
let chain_id;
window.ethereum = {
  isMetaMask: true,
  request: async(request)=> {
    if(['eth_accounts', 'eth_requestAccounts'].includes(request.method)) return [wallet_address]
    if(request.method === 'eth_chainId') return chain_id
  },
  on: jest.fn(),
  removeListener: jest.fn(),
}

jest.spyOn(React, 'useEffect').mockImplementation(() => 'App loaded')

test('renders app correctly', async () => {
  chain_id = '0x3'
  render(<App />);
  const btn = await screen.queryByText(/Connect Wallet/)
  await waitFor(() => {
    expect(btn).toBeInTheDocument()
  })
});

test('displays switch to kovan button when the detected network is not kovan', async () => {
  chain_id = '0x3'
  render(<App />)
  const btn = await screen.queryByText(/Connect Wallet/)
   await act(async () => {
    userEvent.click(btn)
  })
  const btn2 = await screen.queryByText(/Switch to Kovan/)
  const network = await screen.queryByText(/Network: ropsten/)
  await waitFor(() => {
    expect(btn2).toBeInTheDocument()
    expect(network).toBeInTheDocument()
  })
})

test('displays join game button when the detected network is kovan', async () => {
  chain_id = '0x2a'
  render(<App />)
  const btn = await screen.queryByText(/Connect Wallet/)
  await act(async () => {
   userEvent.click(btn)
 })

 const btn2 = await screen.queryByText(/Approve Game/)
 const network = await screen.queryByText(/Network: kovan/)
 const info = await screen.queryByText(/Please approve before joining the game!/)

 await waitFor(() => {
  expect(btn2).toBeInTheDocument()
  expect(network).toBeInTheDocument()
  expect(info).toBeInTheDocument()
})
})
