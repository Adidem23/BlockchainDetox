const { expect } = require("chai");
const { ethers } = require("hardhat");

const tokens = (n) => {
    return ethers.utils.parseUnits(n.toString(), 'ether');
}

const ID = 1
const NAME = "Shoes"
const CATEGORY = "Clothing"
const IMAGE = "https://images.pexels.com/photos/248747/pexels-photo-248747.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
const COST = tokens(1);
const RATING = 5
const STOCK = 9


describe('contractdeployed', () => {

    let contractdeployed;

    beforeEach(async () => {

        [deployer, buyer] = await ethers.getSigners();

        const contract = await ethers.getContractFactory("dapp");

        contractdeployed = await contract.deploy();

    })

    describe('Deployment', () => {

        it('CheckOwner', async () => {

            expect(await contractdeployed.owner()).to.equal(deployer.address);

        });

    })

    describe('Listing', () => {

        let transaction;

        beforeEach(async () => {

            transaction = await contractdeployed.connect(deployer).list(
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


        it('CheckProduts', async () => {

            const item = await contractdeployed.products(ID);

            expect(item.id).to.equal(ID)
            expect(item.name).to.equal(NAME)
            expect(item.category).to.equal(CATEGORY)
            expect(item.image).to.equal(IMAGE)
            expect(item.cost).to.equal(COST)
            expect(item.rating).to.equal(RATING)
            expect(item.stock).to.equal(STOCK)

        });

        it("Emitts Event", async () => {

            expect(transaction).to.emit(contractdeployed, "List");

        })



    })


    describe('Buying', () => {

        let transaction;

        beforeEach(async () => {

            transaction = await contractdeployed.connect(deployer).list(
                ID,
                NAME,
                CATEGORY,
                IMAGE,
                COST,
                RATING,
                STOCK
            )

            await transaction.wait();


            transaction = await contractdeployed.connect(buyer).buy(ID, { value: COST })

        })


        it('ContractBalance', async () => {

            const resultbal = await ethers.provider.getBalance(contractdeployed.address);

            const actualbalance = await ethers.utils.formatEther(resultbal)

            console.log(actualbalance);

            expect(resultbal).to.equal(COST);

        })


        it('ordercount', async () => {

            const order = await contractdeployed.orders(buyer.address, 1);

            expect(order.time).to.be.greaterThan(0);
            expect(order.item.name).to.equal(NAME);

        });


        it("Emits BuyEvent", async () => {

            expect(transaction).to.emit(contractdeployed, "List");

        })


    })


    describe("Withdrawing", () => {
        let balanceBefore

        beforeEach(async () => {
            // List a item
            let transaction = await contractdeployed.connect(deployer).list(ID, NAME, CATEGORY, IMAGE, COST, RATING, STOCK)
            await transaction.wait()

            // Buy a item
            transaction = await contractdeployed.connect(buyer).buy(ID, { value: COST })
            await transaction.wait()

            // Get Deployer balance before
            balanceBefore = await ethers.provider.getBalance(deployer.address)

            // Withdraw
            transaction = await contractdeployed.connect(deployer).withdraw()
            
            await transaction.wait()
        })

        it('Updates the owner balance', async () => {
            const balanceAfter = await ethers.provider.getBalance(deployer.address)
            expect(balanceAfter).to.be.greaterThan(balanceBefore)
        })

        it('Updates the contract balance', async () => {
            const result = await ethers.provider.getBalance(contractdeployed.address)
            expect(result).to.equal(0)
        })
    })


    

})