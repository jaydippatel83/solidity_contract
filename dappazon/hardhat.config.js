require("dotenv").config({ path: "./.env" });
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-etherscan");

const PRIVATE_KEY = process.env.REACT_APP_PRIVATE_KEY;

module.exports = {
  solidity: "0.8.17",   
};
