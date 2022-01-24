const hre = require("hardhat");

async function main() {
  const GoodGhosting = await hre.ethers.getContractFactory("GoodGhosting");
  const goodGhosting = await GoodGhosting.deploy();

  await goodGhosting.deployed();

  console.log("GoodGhosting deployed to:", goodGhosting.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
