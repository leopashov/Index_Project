import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { ethers } from "hardhat";
import { BitwiserIndex } from "../typechain-types";


describe("Index Token Contract", async() => {
    let indexTokenContract: BitwiserIndex;
    let deployer: SignerWithAddress;
    let acc1: SignerWithAddress;

    beforeEach(async () =>{
        [deployer, acc1] = await ethers.getSigners();
        // console.log("deployer address: ",deployer.address, "acc1 address: ", acc1.address)
        
        const indexTokenFactory = await ethers.getContractFactory('BitwiserIndex');
        indexTokenContract = await indexTokenFactory.connect(deployer).deploy();
        await indexTokenContract.deployed();
        // console.log("Index token address: ", indexTokenContract.address)
        // console.log("minter role address: ", await indexTokenContract.MINTER_ROLE())
          
    })

    describe("When the token is first deployed", async () => {
        it("Has zero starting balance", async () => {
            const initialTokenSupply = await indexTokenContract.totalSupply();
            expect(initialTokenSupply).to.eq(0);
        })
        it("Has the deployer address as the minter role", async () => {
            const minterRoleHash = indexTokenContract.MINTER_ROLE();
            const deployerAddress = deployer.address;
            const deployerHasMinterRole = await indexTokenContract.hasRole(minterRoleHash, deployerAddress);

            expect(deployerHasMinterRole).to.eq(true);
        })
    })

    describe("When the deployer calls mint and burn functions", async () => {

        it("mints tokens, increasing token total supply", async () => {
            const initialTokenSupply = await indexTokenContract.totalSupply();

            const tokensToMint = Math.floor(Math.random() * 100);
            console.log(tokensToMint)
            const tokensToMintBN = ethers.utils.parseEther(String(tokensToMint));
            const mintTx = await indexTokenContract.connect(deployer).mint(indexTokenContract.address, tokensToMintBN);
            await mintTx.wait();
            const finalTokenSupply = await indexTokenContract.totalSupply();
            const expectedFinalTokenSupply = initialTokenSupply.add(tokensToMintBN)
            expect(finalTokenSupply).to.eq(expectedFinalTokenSupply)
        })
    })
})