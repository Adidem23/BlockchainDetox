// SPDX-License-Identifier:MIT

pragma solidity ^0.8.9;

contract Greet {
    string public str = "Hello Welcome to Greet Dappp!!!";

    function getstr() public view returns (string memory) {
        return str;
    }

    function updatestr(string memory _str) public {
        str = _str;
    }
}
