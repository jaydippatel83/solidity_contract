const { expect } = require("chai");
const { ethers } = require("hardhat");

describe('RealEstate', () => {
    let realEstate, escrow;
    let deployer, seller;
    let nftId = 1;

    beforeEach(async () => {
        accounts = await ethers.getSigners();
        deployer = accounts[0];
        seller = deployer;


        const RealEstate = await ethers.getContractFactory('RealEstate');
        const Escrow = await ethers.getContractFactory('Escrow');

        realEstate = await RealEstate.deploy();
        escrow = await Escrow.deploy(
            realEstate.address,
            nftId
        );
    })

    describe('Deployment', () => {
        it('send an NFT to seller / deployer', async () => { 
            expect(await realEstate.ownerOf(nftId)).to.equal(seller.address);
        });  
    })
})