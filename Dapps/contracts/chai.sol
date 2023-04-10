//SPDX-License-Identifier:MIT

pragma solidity ^0.8.10;

contract chai {

    struct Memo {
        string  name;
        string message;
        uint256 timestamp;
        address from;
    }

    string nameo;
    string mego;

    Memo[] memos;

    address payable owner;

    constructor() {
        owner = payable(msg.sender);
    }

    function buyChai(string memory _name, string memory _message)
        public
        payable
    {
        owner.transfer(msg.value);
        memos.push(Memo(_name, _message, block.timestamp, msg.sender));
    }


    function getmemo() public view returns (Memo[] memory) {
        return memos;
    }

}
