let Web3 = require('web3');

let web3 = new Web3(new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545"));

let balance = web3.eth.getBalance("0x1Bc3C4F84c2904Eb709120F95Cba04CdBEa3030c").then((result) => {
    let result2 = web3.utils.fromWei(result, "ether")
    console.log("The Balance is " + result2 + " Ethers");
})

web3.eth.sendTransaction({from:"0x1Bc3C4F84c2904Eb709120F95Cba04CdBEa3030c",to:"0xD7cD1590783C5BcC975a62BBBC7dd7c81EDdAd03",value:web3.utils.toWei("5","ether")});