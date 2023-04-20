const { expect } = require('chai');
const { ethers } = require('hardhat');


describe('Counter', () => {
    let counter;

    beforeEach(async ()=>{
        const Counter = await ethers.getContractFactory('Counter');
          counter = await Counter.deploy( 1,"Jaydip patel");
    })

    describe('deployment',()=>{
        it('set the name', async () => { 
            const name =  await counter.name();
            console.log(name);
            expect(name).to.equal("Jaydip patel");
        })
    
        it('store the count', async () => { 
            const count =  await counter.count();
            expect(count).to.equal(1);
        })
    })

    describe('increment', ()=>{
        let trx;
        it('increment count', async()=>{
            trx = await counter.Increment();
             await trx.wait();
             expect(await counter.count()).to.equal(2)
        })
    })

    describe('decrement', ()=>{
        let trx;
        it('decrement count', async()=>{
            trx = await counter.decrement();
             await trx.wait();
             expect(await counter.count()).to.equal(0)
        })
    })
    describe('setName', ()=>{
        let trx;
        it('setName ', async()=>{
            trx = await counter.setName("Dharampur");
             await trx.wait();
             expect(await counter.name()).to.equal('Dharampur')
        })
    })
})