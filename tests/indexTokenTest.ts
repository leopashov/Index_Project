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
                
        const indexTokenFactory = await ethers.getContractFactory('BitwiserIndex');
        indexTokenContract = await indexTokenFactory.connect(deployer).deploy();
        await indexTokenContract.deployed();
                  
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
        it("Has the deployer address as the default admin role", async () => {
            const defaultAdminRoleHash = indexTokenContract.DEFAULT_ADMIN_ROLE();
            const deployerAddress = deployer.address;
            const deployerHasAdminRole = await indexTokenContract.hasRole(defaultAdminRoleHash, deployerAddress);

            expect(deployerHasAdminRole).to.eq(true);
        })
        it("Has the deployer address as the pauser role", async () => {
            const pauserRoleHash = indexTokenContract.PAUSER_ROLE();
            const deployerAddress = deployer.address;
            const deployerHasPauserRole = await indexTokenContract.hasRole(pauserRoleHash, deployerAddress);

            expect(deployerHasPauserRole).to.eq(true);
        })
    })

    describe("When the deployer calls mint and burn functions", async () => {

        it("mints tokens, increasing token total supply", async () => {
            const initialTokenSupply = await indexTokenContract.totalSupply();
            // generate random number between 10 and 100
            const tokensToMint = Math.floor(Math.random() * 91) + 10;
            console.log(tokensToMint)
            const tokensToMintBN = ethers.utils.parseEther(String(tokensToMint));
            const mintTx = await indexTokenContract.connect(deployer).mint(indexTokenContract.address, tokensToMintBN);
            await mintTx.wait();
            const finalTokenSupply = await indexTokenContract.totalSupply();
            const expectedFinalTokenSupply = initialTokenSupply.add(tokensToMintBN)
            expect(finalTokenSupply).to.eq(expectedFinalTokenSupply)
        })
        it("burns tokens, decreasing token total supply", async () => {
            // Mint Tokens to deployer address
            const tokensToMint = Math.floor(Math.random() * 91) + 10;
            console.log("Minting ", tokensToMint, "tokens")
            const tokensToMintBN = ethers.utils.parseEther(String(tokensToMint));
            const mintTx = await indexTokenContract.connect(deployer).mint(deployer.address, tokensToMintBN);
            await mintTx.wait();
            
            const initialTokenSupply = await indexTokenContract.totalSupply();
            console.log("Initial token supply (BN): ", initialTokenSupply)
            const tokensToBurn = Math.floor(Math.random() * 10);
            console.log("Burning ", tokensToBurn, "tokens")
            // Burn tokens (from deployer - burn burns from msg.sender)
            const tokensToBurnBN = ethers.utils.parseEther(String(tokensToBurn));
            const BurnTx = await indexTokenContract.connect(deployer).burn(tokensToBurnBN);
            await BurnTx.wait();
            const finalTokenSupply = await indexTokenContract.totalSupply();
            const expectedFinalTokenSupply = initialTokenSupply.sub(tokensToBurnBN)
            expect(finalTokenSupply).to.eq(expectedFinalTokenSupply)
        })
    })
    describe("When acc1 calls mint and burn functions", async () => {
        it("Reverts the mint transaction", async () => {
            const initialTokenSupply = await indexTokenContract.totalSupply();
            console.log("initial token supply: ", initialTokenSupply);
            const tokensToMint = Math.floor(Math.random() * 91) + 10;
            console.log(tokensToMint);
            const tokensToMintBN = ethers.utils.parseEther(String(tokensToMint));

            expect(indexTokenContract.connect(acc1).mint(indexTokenContract.address, tokensToMintBN)).to.be.reverted
        })

        it("Reverts the burn transaction", async () => {
            // Mint Tokens to acc1 address
            const tokensToMint = Math.floor(Math.random() * 91) + 10;
            console.log("Minting ", tokensToMint, "tokens")
            const tokensToMintBN = ethers.utils.parseEther(String(tokensToMint));
            const mintTx = await indexTokenContract.connect(deployer).mint(acc1.address, tokensToMintBN);
            await mintTx.wait();
            const initialTokenSupply = await indexTokenContract.totalSupply();
            console.log("initial token supply: ", initialTokenSupply);
            const tokensToBurn = Math.floor(Math.random() * 10);
            console.log(tokensToBurn);
            const tokensToBurnBN = ethers.utils.parseEther(String(tokensToBurn));

            expect(indexTokenContract.connect(acc1).burn(tokensToBurnBN)).to.be.reverted
        })
    })
})