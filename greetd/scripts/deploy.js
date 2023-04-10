const hre = require("hardhat");

async function main() {

const contract=await hre.ethers.getContractFactory("Greet");

const del= await contract.deploy();

await del.deployed();

console.log("The address of contract: "+del.address);

// Contract Address : 0x345F56E0A9315D432B83892C4f88C5dF8F95bD7b


}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
