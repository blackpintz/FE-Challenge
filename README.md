#FE-Challenge

## Getting Started

- clone the project.
- run ```npm install```
- create a ```.env``` file with the following variables:
    - ```PROJECT_ID``` (project id from infura project).
    - ```PRIVATE_KEY```.
    - ```SEED_PHRASE```.
    - ```PASSWORD``` (eg. metamask12).

- run ```npx hardhat run .\scripts\Deploy.js --network kovan``` to compile contracts. Copy the address, go to ```src/config.js```, and replace the ```gameAddress``` address.

- run ```npm start``` and open the app on ```localhost:3000```.
- Visit ![etherscan](https://kovan.etherscan.io/address/0xc69a569405EAE312Ca13C2eD85a256FbE4992A35#readContract), paste game address  under players to confirm status when you join/withdraw the game.

## Tests

### Jest

- run ```npm test```.

### Cypress

- ensure the account private key is not approved/joined the game when you are running this test.
- the account private key should have ETH and DAI in the kovan testnet.
- run ```npm run test:e2e```.
