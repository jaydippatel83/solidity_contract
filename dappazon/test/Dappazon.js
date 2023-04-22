const { expect } = require("chai")
const { ethers } = require('hardhat');

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), 'ether')
}

const ID = 1;
const NAME = "Shoes";
const CATEGORY = "Clothing";
const IMAGE = "Image1";
const COST = tokens(1);
const RATING = 4;
const STOCK = 5;

describe("Dappazon", () => {
  let dappazon;
  let deployer, buyer;
  beforeEach(async () => {
    [deployer, buyer] = await ethers.getSigners();
    const Dappazon = await ethers.getContractFactory('Dappazon');
    dappazon = await Dappazon.deploy();
  })

  describe('Deployment', () => {
    it('set the owner', async () => {
      expect(await dappazon.owner()).to.equal(deployer.address);
    })
  })

  describe('Listing', () => {
    let transaction;

    beforeEach(async () => {
      transaction = await dappazon.connect(deployer).list(
        ID,
        NAME,
        CATEGORY,
        IMAGE,
        COST,
        RATING,
        STOCK
      )
      await transaction.wait();
    })

    it('Returns Item attributes', async () => {
      const item = await dappazon.items(ID);
      expect(item.id).to.equal(ID);
      expect(item.name).to.equal(NAME);
      expect(item.category).to.equal(CATEGORY);
      expect(item.image).to.equal(IMAGE);
      expect(item.cost).to.equal(COST);
      expect(item.rating).to.equal(RATING);
      expect(item.stock).to.equal(STOCK);
    })
    it('Emits list events', () => {
      expect(transaction).to.emit(dappazon, "List");
    })
  })

  describe('buying', () => {
    let transaction;

    beforeEach(async () => {
      transaction = await dappazon.connect(deployer).list(
        ID,
        NAME,
        CATEGORY,
        IMAGE,
        COST,
        RATING,
        STOCK
      )
      await transaction.wait();

      transaction = await dappazon.connect(buyer).buy(ID, { value: COST });
      await transaction.wait();
    })

    it('Update the contract balance', async () => {
      const res = await ethers.provider.getBalance(dappazon.address);
      expect(res).to.equal(COST);
    })

    it('Update  buyers count', async () => {
      const res = await dappazon.orderCount(buyer.address);
      expect(res).to.equal(1);
    })

    it('Add the orders', async () => {
      const res = await dappazon.orders(buyer.address, 1);
      expect(res.time).to.be.greaterThan(0);
      expect(res.item.name).to.equal(NAME);
    })

    it('Update the contract balance', async () => {
      const res = await ethers.provider.getBalance(dappazon.address);
      expect(res).to.equal(COST);
    })

    it('Emit buy event', async () => {
      expect(transaction).to.emit(dappazon, "buy")
    })

  })

  describe('withdraw funds', () => {
    let balanceNefore, transaction;

    beforeEach(async () => {
      transaction = await dappazon.connect(deployer).list(ID, NAME, CATEGORY, IMAGE, COST, RATING, STOCK);
      await transaction.wait();

      transaction = await dappazon.connect(buyer).buy(ID, { value: COST })
      await transaction.wait();

      balanceNefore = await ethers.provider.getBalance(deployer.address);

      transaction = await dappazon.connect(deployer).withdraw()
      await transaction.wait();
    })

    it('updates the owner balance', async () => {
      const balanceAfter = await ethers.provider.getBalance(deployer.address);
      expect(balanceAfter).to.be.greaterThan(balanceNefore);
    })

    it('Update the contract balance', async () => {
      const result = await ethers.provider.getBalance(dappazon.address);
      expect(result).to.equal(0);
    })
  })

})
