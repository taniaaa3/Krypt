// SPDX-License-Identifier: UNLICENSED
// Contract Address : 0x33f4f5f0F3411492d98D634E2278005f980a24dd

pragma solidity ^0.8.0;

contract Transactions{
    uint transactionCount;

    event Transfer(address from, address to, uint value, string message, uint timestamp, string keyword);

    struct transferStruct{
        address sender;
        address receiver;
        uint amount;
        string message;
        uint timestamp;
        string keyword;
    }

    transferStruct[] transactions;

    function addToBlockchain(address payable _receiver, uint _amount, string memory _message, string memory _keyword) public {
        transactionCount += 1;
        transactions.push(transferStruct(msg.sender, _receiver, _amount, _message, block.timestamp, _keyword));
        emit Transfer(msg.sender, _receiver, _amount, _message, block.timestamp, _keyword);
    }

    function getAllTransactions() public view returns(transferStruct[] memory){
        return transactions;
    }

    function getTransactionCount() public view returns(uint) {
        return transactionCount;
    }
}