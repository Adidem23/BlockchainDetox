//SPDX-License-Identifier:MIT

pragma solidity ^0.8.10;

contract simpl{

uint256 a;

function setter(uint256 _a) public{
 a=_a;
}

function getter() view public returns(uint256){
    return a;
}

// artifacts=abi +bytecode//

}