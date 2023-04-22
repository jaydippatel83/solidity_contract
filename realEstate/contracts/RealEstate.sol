// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract RealEstate is ERC721URIStorage  {
using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
 
    constructor() ERC721("Real Estate", "REAL") {
        mint("https://ipfs.io/ipfs/QmTudSYeM7mz3PkYEWXWqPjomRPHogcMFSq7XAvsvsgAPS");
    }

    function mint(string memory tokenURI)
        public
        returns (uint256)
    {
        _tokenIds.increment(); 
        uint256 newItemId = _tokenIds.current();
        _mint(msg.sender, newItemId);
        _setTokenURI(newItemId, tokenURI); 
        return newItemId;
    }
}