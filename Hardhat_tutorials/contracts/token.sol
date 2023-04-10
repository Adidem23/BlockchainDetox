//SPDX-License-Identifier: MIT

pragma solidity 0.8.19;

import "hardhat/console.sol";

contract token {

    string public name = "Aditya Weds Sakshi";
    string public symbol = "SAS";
    uint256 public totalsupply = 1000;
    address public owner;

    mapping(address => uint256) balance;

    constructor() {
        balance[msg.sender] = totalsupply;
        owner = msg.sender;
    }
 
   function transfer(address _to, uint256 _amount) external payable {

    console.log("1.Sender is %s sending Tokens %s Addresses : ",_amount,_to);
    console.log("2.Sender Balance %s Tokens: ",balance[msg.sender]);

    require((balance[msg.sender]>=_amount),"NOT ENOUGH MONEY");
    
    balance[msg.sender]=balance[msg.sender]- (_amount);

    balance[_to]+=_amount;

   }

  function getbalance(address _add) external view returns(uint256){

     return balance[_add] ;
  }



}
