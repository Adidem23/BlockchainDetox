const { ethers } = require("ethers");

const provider = new ethers.providers.JsonRpcProvider(`https://goerli.infura.io/v3/ce02f5ac47354de88ee33a8a0e84e671`);

const query = async () => {

    const block = await provider.getBlockNumber();
    console.log("Current Block Number: ", block);

   const balance=await provider.getBalance("0x2188E7b75731040EC61740F18EA6E9b5Ec5F40CB");
    
   const balance2=ethers.utils.formatEther(balance);

   console.log("The balance is : ",balance2);


}

query();