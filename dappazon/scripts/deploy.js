
const hre = require("hardhat")
const { ethers } = require('hardhat');
const { items } = require("../src/items.json")

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), 'ether')
}

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  const Dappazon = await hre.ethers.getContractFactory("Dappazon");
  const dappazon = await Dappazon.deploy();

  await dappazon.deployed();
  console.log("Contract address is: ", dappazon.address);


  for (let index = 0; index < items.length; index++) {
     const trx = await dappazon.connect(deployer).list(
      items[index].id,
      items[index].name,
      items[index].category,
      items[index].image,
      tokens(items[index].price),
      items[index].rating,
      items[index].stock
     );

     await trx.wait();

     console.log(`Listing Items ${items[index].id} : ${items[index].name}`);
  }

}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
