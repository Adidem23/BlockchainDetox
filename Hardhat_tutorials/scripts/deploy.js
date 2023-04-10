const { ethers } = require("hardhat");

async function main() {

    const [deployers] = await ethers.getSigners();
    const Token = await ethers.getContractFactory("token");
    const hardhatToken = await Token.deploy();
    console.log("Token Address: ", hardhatToken.address);
}

main()
.then(() => process.exit(0))
.catch((err) => {
console.log(err);
process.exit(0);
});