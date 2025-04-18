// Deployment script for SnapTix contracts

const { ethers } = require("hardhat");

async function main() {
  console.log("Deploying SnapTix Contracts...");

  // Deploy TicketNFT
  const TicketNFT = await ethers.getContractFactory("TicketNFT");
  const ticketNFT = await TicketNFT.deploy();
  await ticketNFT.waitForDeployment();

  const ticketNFTAddress = await ticketNFT.getAddress();
  console.log(`TicketNFT deployed to: ${ticketNFTAddress}`);

  // Deploy Marketplace with TicketNFT address
  const TicketMarketplace = await ethers.getContractFactory("TicketMarketplace");
  const ticketMarketplace = await TicketMarketplace.deploy(ticketNFTAddress);
  await ticketMarketplace.waitForDeployment();

  const ticketMarketplaceAddress = await ticketMarketplace.getAddress();
  console.log(`TicketMarketplace deployed to: ${ticketMarketplaceAddress}`);

  console.log("Deployment complete!");

  // Export contract addresses for frontend config
  const fs = require("fs");
  const contractAddresses = {
    TicketNFT: ticketNFTAddress,
    TicketMarketplace: ticketMarketplaceAddress,
  };

  // Make sure the config directory exists
  const configDir = "../frontend/src/config";
  if (!fs.existsSync(configDir)) {
    fs.mkdirSync(configDir, { recursive: true });
  }

  fs.writeFileSync(
    `${configDir}/contracts.json`,
    JSON.stringify(contractAddresses, null, 2)
  );
  console.log("Contract addresses exported to frontend config!");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });