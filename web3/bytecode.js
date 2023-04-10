/**
 * * This is Tutorial for ABI and ByteCode generation
 * ! Through Web3 JS
 */

solc = require("solc");

fs = require("fs");

Web3 = require("web3");

const { log } = require("console");

let web3 = new Web3(new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545"));

let filec = fs.readFileSync("demo.sol").toString();

console.log(filec);

var input = {

    language: "Solidity",
    sources: {
        "demo.sol": {
            content: filec,
        },
    },

    settings: {
        outputSelection: {
            "*": {

                "*": ["*"],

            },
        },
    },

};

var output = JSON.parse(solc.compile(JSON.stringify(input)));
console.log("The Output is : " + output);

ABI = output.contracts["demo.sol"]["demo"].abi;
// bytecode=output.contracts["demo.sol"]["dmeo"].evm.bytecode.object;

console.log("Abi is : " + ABI);
// console.log("Bytecode is : "+bytecode);