pragma solidity ^0.8.0;

contract Counter {
    uint public count;
    string public name;

    constructor(uint _count, string memory _name) {
        count = _count;
        name = _name;
    }

    function Increment() public returns(uint){
        return count++;
    }

    function decrement() public returns(uint){
        return count--;
    }

    function setName(string memory _name) public returns(string memory){
        name =_name;
        return name;
    }
    function getCount()public view returns(uint){
        return count;
    }
}
