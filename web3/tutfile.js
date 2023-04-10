let Web3=require('web3');

let web3=new Web3(new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545"));

const ABI=[
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_x",
				"type": "uint256"
			}
		],
		"name": "setvaluex",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "x",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]

let contract=new web3.eth.Contract(ABI,"0x47D130cD9b164e953aFA34C576C2594dbDa5D02b");

let num=80;

contract.methods.setvaluex(num).send({from:"0x1Bc3C4F84c2904Eb709120F95Cba04CdBEa3030c"});

contract.methods.x().call().then((result)=>{
    console.log("The result of x is :"+result);
});