//SPDX-License-Identifier:MIT

pragma solidity ^0.8.10;

contract dapp {
    address public owner;

    struct Items {
        uint256 id;
        string name;
        string category;
        string image;
        uint256 cost;
        uint256 rating;
        uint256 stock;
    }

    struct Order {
        uint256 time;
        Items item;
    }

    mapping(uint256 => Items) public products;

    mapping(address => uint256) public ordercount;

    mapping(address => mapping(uint256 => Order)) public orders;

    event List(string name, uint256 price, uint256 quantity);

    event Buy(address buyer, uint256 orderID, uint256 ItemId);

    modifier onlyOwner() {
        require(owner == msg.sender, "You Must Be Owner");
        _; // Do this thing before the function Body //
    }

    constructor() {
        owner = msg.sender;
    }



    function list(
        uint256 _id,
        string memory _name,
        string memory _category,
        string memory _image,
        uint256 _cost,
        uint256 _rating,
        uint256 _stock
    ) public onlyOwner {
        Items memory itemsb = Items(
            _id,
            _name,
            _category,
            _image,
            _cost,
            _rating,
            _stock
        );

        products[_id] = itemsb;

        emit List(_name, _cost, _stock);
    }

    function buy(uint256 _id) public payable {
        Items memory item = products[_id];

        require(msg.value >= item.cost);

        require(item.stock > 0);

        Order memory orderc = Order(block.timestamp, item);

        ordercount[msg.sender] = ordercount[msg.sender] + 1;

        orders[msg.sender][ordercount[msg.sender]] = orderc;

        products[_id].stock = item.stock - 1;

        emit Buy(msg.sender, ordercount[msg.sender], item.id);
    }

    function withdraw() public onlyOwner {
        (bool success, ) = owner.call{value: address(this).balance}("");
        require(success);
    }
}
