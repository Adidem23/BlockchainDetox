const hre = require("hardhat");
const {items}=require("../client/src/items.json");

const tokens=(n)=>{
  return ethers.utils.parseUnits(n.toString(),'ether');
}

async function main() {

  const [deployer]=await ethers.getSigners();

  const contract = await hre.ethers.getContractFactory("dapp");

  const contractdeployed = await contract.deploy();

  await contractdeployed.deployed();

  console.log("Contract Address is: " + contractdeployed.address);

for (let i = 0; i < items.length; i++) {
  
  const transcation=await contractdeployed.connect(deployer).list(
    items[i].id,
    items[i].name,
    items[i].category,
    items[i].image,
    tokens(items[i].price),
    items[i].rating,
    items[i].stock,
  )

  await transcation.wait();

  console.log(`Listed Item:-> ${items[i].id} ${items[i].name} `);

}



}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
