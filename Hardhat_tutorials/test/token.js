const { expect } = require('chai');
const { ethers } = require('hardhat');

describe("Token", () => {

    it("Deployment Setting: ", () => {

        let Token;
        let hardhatToken;
        let owner;
        let add1;
        let add2;
        let addrs;

        //beforeEach is running for every test explicitly //

        beforeEach(async function () {
            Token = await ethers.getContractFactory("token");
            [owner, add1, add2, ...addrs] = await ethers.getSigners();
            hardhatToken = await Token.deploy();
        });


        describe("Deployment", () => {

            it("Owner Setting Test : ", async () => {

                expect(await hardhatToken.owner()).to.equal(owner.address);


            })


            it("Balance of Owner Test : ", async () => {

                const ownerbalance = hardhatToken.getbalance(owner.address);

                expect(await hardhatToken.totalsupply()).to.equal(1000);

            })


        })


        describe("Transactions", () => {

            it("Transfer Token Test", async () => {

                await hardhatToken.transfer(add1.address, 10)

                expect(await hardhatToken.getbalance(add1.address)).to.equal(10);

                await hardhatToken.connect(add1).transfer(add2.address, 5);

                expect(await hardhatToken.getbalance(add2.address)).to.equal(5)
            });


            it("Transfer Success : ", async () => {

                const iniownerbalance = await hardhatToken.getbalance(owner.address);

                await expect(hardhatToken.connect(add1).transfer(owner.address, 1)).to.be.revertedWith("NOT ENOUGH MONEY");

                expect(await hardhatToken.getbalance(owner.address)).to.equal(iniownerbalance);
            });

          it("Balances After Transaction : ", async () => {

            const iniownerbalance = await hardhatToken.getbalance(owner.address);

            await hardhatToken.transfer(add1.address,5);
            
            await hardhatToken.transfer(add2.address,10);

            const finalbalance=await hardhatToken.getbalance(owner.address);

            expect(await hardhatToken.getbalance(add1.address)).to.equal(5);

            expect(await hardhatToken.getbalance(add2.address)).to.equal(10);

            expect(await hardhatToken.getbalance(owner.address)).to.equal(iniownerbalance-15);


          });

        })


    });

});