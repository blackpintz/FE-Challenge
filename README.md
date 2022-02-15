#FE-Challenge

## Getting Started

- clone the project.
- run ```npm install```
- create a ```.env``` file with the following variables:
    - ```PROJECT_ID``` (project id from infura project).
    - ```PRIVATE_KEY```.
    - ```SEED_PHRASE```.
    - ```PASSWORD``` (eg. metamask12).

- run ```npx hardhat run .\scripts\Deploy.js --network kovan``` to get the game address, then go to ```config.js```, and replace the ```gameAddress```.

- run ```npm start``` and open the app on ```localhost:3000```.

## Tests

### Jest

- run ```npm test```.

### Cypress

- ensure the account private key is not approved/joined the game when you are running this test.
- the account private key should have ETH and DAI in the kovan testnet.
- run ```npm run test:e2e```.
