// interact.js

const API_KEY = process.env.API_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;

const { ethers } = require('hardhat');
const contractInterface = require('../artifacts/contracts/HelloWorld.sol/HelloWorld.json');

const alchemyProvider = new ethers.providers.AlchemyProvider(network='goerli', API_KEY);
const signer = new ethers.Wallet(PRIVATE_KEY, alchemyProvider);
const helloWorldContract = new ethers.Contract(CONTRACT_ADDRESS, contractInterface.abi, signer);

// read and write message variable
async function main() {
    const oldMessage = await helloWorldContract.message();
    console.log("old message is: " + oldMessage);

    console.log("Updating the message...");
    const tx = await helloWorldContract.update("This is the new message.");
    await tx.wait();

    const newMessage = await helloWorldContract.message();
    console.log("new message is: " + newMessage);
}
main();
