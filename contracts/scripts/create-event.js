const { ethers } = require("hardhat");
const fs = require("fs");
const path = require("path");

async function main() {
  console.log("Creating popular events on deployed contracts...");
  
  // Read contract addresses from frontend config
  const contractAddressesPath = "../frontend/src/config/contracts.json";
  const contractAddresses = JSON.parse(fs.readFileSync(contractAddressesPath, "utf8"));
  
  console.log("Using contract address:", contractAddresses.TicketNFT);
  
  // Get the deployed contract instance
  const TicketNFT = await ethers.getContractFactory("TicketNFT");
  const ticketNFT = await TicketNFT.attach(contractAddresses.TicketNFT);
  
  // Get the signer account
  const [deployer] = await ethers.getSigners();
  console.log("Using account:", deployer.address);
  
  // Check if the account has permission to create events
  try {
    // Try to check if the account is the owner
    const owner = await ticketNFT.owner();
    console.log("Contract owner:", owner);
    console.log("Current account is owner:", owner.toLowerCase() === deployer.address.toLowerCase());
  } catch (error) {
    console.log("Could not check owner - contract might not have an owner() function");
  }
  
  // Only include IDs of popular/featured events
  const popularEventIds = ['1', '2', '3', '7', '18']; 
  
  // Import events data from backend
  const eventsDataPath = path.join(__dirname, "../../backend/Service/eventData.js");
  console.log("Loading events from:", eventsDataPath);
  
  const { eventsList } = require(eventsDataPath);
  console.log(`Found ${eventsList.length} total events`);
  
  // Filter to only the popular events
  const popularEvents = eventsList.filter(event => popularEventIds.includes(event.id));
  
  console.log(`Creating ${popularEvents.length} popular events on blockchain...`);
  
  // Create a single event first as a test
  const testEvent = popularEvents[0];
  console.log(`TEST: Creating event ${testEvent.id}: ${testEvent.title}`);
  
  try {
    const currentTime = Math.floor(Date.now() / 1000);
    
    // Debug - log the transaction we're about to send
    const createEventTx = await ticketNFT.populateTransaction.createEvent(
      testEvent.title,
      currentTime,
      currentTime + (365 * 24 * 60 * 60),
      testEvent.location || "SnapTix Venue",
      100,
      true
    );
    
    console.log("Transaction data:", createEventTx.data);
    
    // Send the transaction
    const tx = await ticketNFT.createEvent(
      testEvent.title,
      currentTime,
      currentTime + (365 * 24 * 60 * 60),
      testEvent.location || "SnapTix Venue",
      100,
      true,
      { gasLimit: 300000 } // Add explicit gas limit
    );
    
    console.log("Transaction hash:", tx.hash);
    const receipt = await tx.wait();
    console.log("Transaction receipt:", receipt);
    
    if (receipt.status === 1) {
      console.log(`Event ${testEvent.id}: ${testEvent.title} created successfully!`);
    } else {
      console.error(`Transaction failed with status ${receipt.status}`);
    }
  } catch (error) {
    console.error(`Failed to create test event:`, error);
    
    // Check if there's a revert reason
    if (error.reason) {
      console.error("Revert reason:", error.reason);
    }
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });