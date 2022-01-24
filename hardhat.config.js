require("@nomiclabs/hardhat-waffle");
require('dotenv').config()

module.exports = {
  networks: {
    hardhat: {
      chainId: 1337
    },
    kovan: {
      url: `https://kovan.infura.io/v3/${process.env.PROJECT_ID}`,
      accounts: [process.env.PRIVATE_KEY, process.env.PRIVATE_KEY_1]
    }
  },
  solidity: "0.8.4",
  settings: {
    evmVersion: 'byzantium'
  },
  paths: {
    artifacts: './src/artifacts',
  }
};