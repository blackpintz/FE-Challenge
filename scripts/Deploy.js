const hre = require("hardhat");

async function main() {
  const Game = await hre.ethers.getContractFactory("Game");
  const game = await Game.deploy();

  await game.deployed();

  console.log("GoodGhosting deployed to:", game.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
