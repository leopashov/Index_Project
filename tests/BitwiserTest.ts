import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { ethers } from "hardhat";
import { Bitwiser } from "../typechain-types";

describe("Bitwiser Contract", async() => {
    let bitwiserContract: Bitwiser;
    let deployer: SignerWithAddress;
    let acc1: SignerWithAddress;

    beforeEach(async () =>{
        // Deploy contract
        [deployer, acc1] = await ethers.getSigners();
                
        const contractFactory = await ethers.getContractFactory('BitwiserIndex');
        bitwiserContract = await contractFactory.connect(deployer).deploy();
        await bitwiserContract.deployed();          
    })
    describe("When the contract is deployed", async () => {
        beforeEach(async () => {})

        it("Can return the address of the index token contract", async () => {
            throw new Error("not implmented yet")
        })
        it("Can return the address of the governance token", async () => {
            // does governace token have to be connected?
            throw new Error("not implmented yet")
        })
        it("Can be initialised", async () => {
            // recommended to initialise contract rather than give big constructor
            throw new Error("not implmented yet")
        })
        it("has a maximum allowed ratio deviation", async () => {
            throw new Error("not implmented yet")
        })
        it("has a target BTC weight for the index", async () => {
            throw new Error("not implmented yet")
        })
        it("has a value for the amount of yield shaved off", async () => {
            throw new Error("not implmented yet")
        })
    })
    describe("When a user wants to deposit to the index", async () => {
        it("allows users to deposit WETH tokens", async () => {
            throw new Error("not implmented yet")
        })
        it("allows users to deposit WBTC tokens", async () => {
            throw new Error("not implmented yet")
        })
        it("allows users to deposit equal amounts of WBTC and WETH tokens", async () => {
            throw new Error("not implmented yet")
        })
        it("allows users to deposit WETH and 'zap' into the index", async () => {
            throw new Error("not implmented yet")
        })
        it("Allows users to deposit native eth", async () => {
            // xref alchemix eth gateway contract
            throw new Error("not implmented yet")
        })
    })
    describe("When a user deposits to the index", async () => {
        it("Uses a token wrapper to deposit the underlying asset(s) to the yearn vault", async () => {
            // XREF "integration guide" section of docs
            throw new Error("not implmented yet")
        })
        it("It fines or rewards the user based on index balance and user action", async () => {
            throw new Error("not implmented yet")
        })
        it("Updates the value of the Index", async () => {
            throw new Error("not implmented yet")
        })
        it("updates the proportion of BTC in the index", async () => {
            throw new Error("not implmented yet")
        })
        it("updates the value of the reward pool", async () => {
            throw new Error("not implmented yet")
        })
        it("Returns the correct number of index tokens to the user", async () => {
            throw new Error("not implmented yet")
        })
    })
    describe("When a user withdraws from the index", async () => {
        it("Uses a token wrapper to withdraw the underlying asset(s) from the yearn vault", async () => {
            // XREF "integration guide" section of docs
            throw new Error("not implmented yet")
        })
        it("It fines or rewards the user based on index balance and user action", async () => {
            throw new Error("not implmented yet")
        })
        it("Updates the value of the Index", async () => {
            throw new Error("not implmented yet")
        })
        it("updates the proportion of yvBTC in the index", async () => {
            throw new Error("not implmented yet")
        })
        it("updates the value of the reward pool", async () => {
            throw new Error("not implmented yet")
        })
        it("Returns the correct number of underlying tokens to the user", async () => {
            throw new Error("not implmented yet")
        })
    })
    describe("When the contract is paused", async () => {
        it("should not allow deposits or withdrawals", async () => {
            throw new Error("not implmented yet")
        })
        it("Should not allow minting of index tokens", async () => {
            throw new Error("not implmented yet")
        })
        it("Should not allow burning of index tokens", async () => {
            throw new Error("not implmented yet")
        })
    })
    describe("When key functions (e.g deposit) are called", async () => {
        it("Checks the calling contract is whitelisted", async () => {
            throw new Error("not implmented yet")
            // XREF alchemix: https://alchemix-finance.gitbook.io/v2/
        })
    })
    describe("When a user tries to disbalance the index beyond the allowed maximum ratio", async () => {
        it("Reverts the transaction", async () => {
            throw new Error("not implmented yet")
        })
    })
})