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

  // Create initial events in the contract
  console.log("Creating initial events in the contract...");
  
  // Sample events data
  const events = [
    {
      id: 1,
      title: "Taylor Swift Concert",
      location: "Madison Square Garden, New York"
    },
    {
      id: 2,
      title: "NBA Finals Game 1",
      location: "Chase Center, San Francisco"
    },
    {
      id: 3,
      title: "Coldplay World Tour",
      location: "Wembley Stadium, London"
    },
    {
      id: 4,
      title: "Tech Conference 2025",
      location: "Moscone Center, San Francisco"
    },
    {
      id: 5,
      title: "Comic-Con International",
      location: "San Diego Convention Center"
    }
  ];
  
  // Create events on the blockchain
  for (const event of events) {
    console.log(`Creating event: ${event.title}`);
    try {
      const currentTime = Math.floor(Date.now() / 1000);
      await ticketNFT.createEvent(
        event.title,
        currentTime, // Start time: now
        currentTime + (365 * 24 * 60 * 60), // End in 1 year
        event.location,
        100, // Max tickets
        true // Reserved seating
      );
      console.log(`Event ${event.id}: ${event.title} created successfully`);
    } catch (error) {
      console.error(`Failed to create event ${event.id}:`, error.message);
    }
  }

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