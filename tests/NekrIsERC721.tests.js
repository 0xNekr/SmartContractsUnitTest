const { expect } = require('chai');

describe('Tests NekrIsERC721', function () {
    let contract;
    let owner;
    let user

    before(async function () {
        [owner, user] = await ethers.getSigners();
        const Contract = await ethers.getContractFactory('NekrIsERC721');
        contract = await Contract.deploy(
            'ipfsURI'
        );
    });

    it("should have 100 NFTs of total supply", async function () {
        const supply = await contract.MAX_SUPPLY();
        expect(supply).to.equal(100);
    });

    it("should be able to mint a NFT", async function () {
        const balanceBeforeMint = await contract.balanceOf(user.address);

        expect(balanceBeforeMint).to.equal(0);

        const price = ethers.utils.parseEther('0.00001');
        await contract.connect(user).mintNFTs(1, {value: price });

        const balanceAfterMint = await contract.balanceOf(user.address);

        expect(balanceAfterMint).to.equal(1);
    });
})
