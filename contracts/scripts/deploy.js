const { ethers } = require("hardhat");
const fs = require("fs");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying with account:", deployer.address);

  // Deploy TicketNFT
  const TicketNFT = await ethers.getContractFactory("TicketNFT");
  const ticketNFT = await TicketNFT.deploy();
  await ticketNFT.waitForDeployment();
  const ticketNFTAddress = await ticketNFT.getAddress();
  console.log("TicketNFT deployed to:", ticketNFTAddress);

  // Deploy TicketMarketplace
  const TicketMarketplace = await ethers.getContractFactory("TicketMarketplace");
  const ticketMarketplace = await TicketMarketplace.deploy(ticketNFTAddress);
  await ticketMarketplace.waitForDeployment();
  const ticketMarketplaceAddress = await ticketMarketplace.getAddress();
  console.log("TicketMarketplace deployed to:", ticketMarketplaceAddress);

  // Save addresses to frontend config
  const configDir = "../frontend/src/config";
  if (!fs.existsSync(configDir)) fs.mkdirSync(configDir, { recursive: true });
  fs.writeFileSync(`${configDir}/contracts.json`, JSON.stringify({
    TicketNFT: ticketNFTAddress,
    TicketMarketplace: ticketMarketplaceAddress,
  }, null, 2));

  console.log("Contract addresses saved to frontend/src/config/contracts.json");
  console.log("Deployment complete!");
}

main().then(() => process.exit(0)).catch((err) => { console.error(err); process.exit(1); });
