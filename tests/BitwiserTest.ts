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

})
})