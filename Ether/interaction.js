const {ethers} =require("ethers");

const provider = new ethers.providers.JsonRpcProvider(`https://goerli.infura.io/v3/ce02f5ac47354de88ee33a8a0e84e671`);

const walletaddress='0x24a62e06dce74d7e380eea281c85168852330e78';

const abi=[
	{
		"inputs": [],
		"name": "sendEthContract",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_user",
				"type": "address"
			}
		],
		"name": "sendEthUser",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_num",
				"type": "uint256"
			}
		],
		"name": "setValue",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_address",
				"type": "address"
			}
		],
		"name": "accountBalance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "contractBalance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getValue",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]

const interaction=async ()=>{

    const walletcontract=new ethers.Contract(walletaddress,abi,provider);

    const contractname= await walletcontract.name();
    console.log("The name is : ",contractname);
   
    const num=await walletcontract.getValue();
    console.log("The Number is : ",String(num));


    const contractBalance=await walletcontract.contractBalance();

    const contractBalance2=await ethers.utils.formatEther(contractBalance);

    console.log("The Contract Balance is : ",contractBalance2);

    const userbalanace=await walletcontract.accountBalance("0x2188E7b75731040EC61740F18EA6E9b5Ec5F40CB");

    const contractBalance3=await ethers.utils.formatEther(userbalanace);

    console.log("The User Balance is : ",contractBalance3);

}

interaction();