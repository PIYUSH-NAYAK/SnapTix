import { ethers } from 'ethers';
import { getProvider } from '../core/provider';
import { getTicketNFT, getContractAddresses } from '../core/contracts';
import { getMockTickets } from '../helpers/utils';
import { getConnectedAccount } from '../core/provider';

let lastSuccessfulContractAddress = null;

/**
 * Get user's tickets using different approaches
 */
export const getUserTickets = async () => {
  try {
    if (!window.ethereum) {
      console.log("MetaMask not available");
      return getMockTickets();
    }

    const ticketNFT = await getTicketNFT();
    const provider = await getProvider();
    
    const account = await getConnectedAccount();
    if (!account) {
      console.log("No connected account found");
      return getMockTickets();
    }
    
    console.log("Getting tickets for account:", account);
    
    // Try multiple approaches to find tickets
    
    // APPROACH 1: Try directly using balanceOf + tokenOfOwnerByIndex
    try {
      console.log("Approach 1: Using balanceOf and tokenOfOwnerByIndex...");
      const balance = await ticketNFT.balanceOf(account);
      console.log(`Balance reported by contract: ${balance}`);
      
      if (balance > 0) {
        const tickets = [];
        for (let i = 0; i < balance; i++) {
          try {
            const tokenId = await ticketNFT.tokenOfOwnerByIndex(account, i);
            console.log(`Found token ID at index ${i}:`, tokenId.toString());
            
            const ticketDetails = await ticketNFT.tickets(tokenId);
            const tokenURI = await ticketNFT.tokenURI(tokenId);
            
            tickets.push({
              tokenId: tokenId.toString(),
              eventId: ticketDetails.eventId.toString(),
              seatInfo: ticketDetails.seatInfo,
              price: ethers.formatEther(ticketDetails.price) + " ETH",
              isUsed: ticketDetails.isUsed,
              tokenURI,
              eventTitle: `Event ${ticketDetails.eventId}`,
              isRealTicket: true
            });
          } catch (err) {
            console.error(`Error getting token at index ${i}:`, err);
          }
        }
        
        if (tickets.length > 0) {
          console.log(`Found ${tickets.length} tickets using approach 1`);
          return tickets;
        }
      }
    } catch (err) {
      console.error("Approach 1 failed:", err.message);
    }
    
    // APPROACH 2: Try to look for Transfer events
    try {
      console.log("Approach 2: Searching for Transfer events...");
      const blockNumber = await provider.getBlockNumber();
      console.log("Current block number:", blockNumber);
      
      const contractAddresses = getContractAddresses();
      const filter = {
        address: contractAddresses.TicketNFT,
        fromBlock: Math.max(0, blockNumber - 100000),
        toBlock: 'latest',
        topics: [
          ethers.id("Transfer(address,address,uint256)"),
          null,
          ethers.zeroPadValue(account.toLowerCase(), 32)
        ]
      };
      
      console.log("Search filter:", filter);
      const logs = await provider.getLogs(filter);
      console.log("Found Transfer events:", logs.length);
      
      if (logs.length > 0) {
        // Process logs...
        // ... (similar to original code)
      }
    } catch (err) {
      console.error("Approach 2 failed:", err.message);
    }
    
    // No tickets found after all approaches
    console.log("No balance returned or empty result, assuming balance is 0");
    console.log("Creating mock tickets for testing UI...");
    return getMockTickets();
  } catch (error) {
    console.error("Error getting user tickets:", error);
    return getMockTickets();
  }
};

/**
 * Get tickets using direct query approach
 */
export const getTicketsDirectQuery = async () => {
  try {
    if (!window.ethereum) {
      console.log("MetaMask not available");
      return getMockTickets();
    }

    const provider = await getProvider();
    const ticketNFT = await getTicketNFT();
    const contractAddresses = getContractAddresses();
    
    const account = await getConnectedAccount();
    if (!account) {
      console.log("No connected account found");
      return getMockTickets();
    }
    
    console.log("Directly querying tickets for account:", account);
    
    // First verify the contract exists
    const bytecode = await provider.getCode(contractAddresses.TicketNFT);
    if (!bytecode || bytecode.length <= 2) {
      console.error("Contract does not exist at specified address!");
      return getMockTickets();
    }
    
    // Get the current block number for logging purposes
    const blockNumber = await provider.getBlockNumber();
    console.log("Current block number:", blockNumber);
    
    // We'll check tokens with IDs from 1 to 10 (adjust as needed)
    const tickets = [];
    let checkedTokens = 0;
    let foundTokens = 0;
    
    console.log("Starting direct token ownership check...");
    
    for (let tokenId = 1; tokenId <= 30; tokenId++) {
      try {
        checkedTokens++;
        // Try to get the owner of this token ID
        const owner = await ticketNFT.ownerOf(tokenId);
        
        // Check if the owner matches our account
        if (owner.toLowerCase() === account.toLowerCase()) {
          console.log(`Found token ${tokenId} owned by current user!`);
          foundTokens++;
          
          // Get ticket details
          try {
            const ticketDetails = await ticketNFT.tickets(tokenId);
            console.log("Ticket details:", ticketDetails);
            
            let eventTitle = `Event ${ticketDetails.eventId}`;
            let tokenURI = "";
            
            // Try to get more data about the event
            try {
              const eventDetails = await ticketNFT.events(ticketDetails.eventId);
              if (eventDetails && eventDetails.title) {
                eventTitle = eventDetails.title;
              }
            } catch (eventErr) {
              console.log(`Couldn't get event details for ID ${ticketDetails.eventId}`);
            }
            
            // Try to get token URI
            try {
              tokenURI = await ticketNFT.tokenURI(tokenId);
            } catch (uriErr) {
              console.log(`Couldn't get URI for token ${tokenId}`);
            }
            
            // Add this ticket to our found tickets
            tickets.push({
              tokenId: tokenId.toString(),
              eventId: ticketDetails.eventId.toString(),
              seatInfo: ticketDetails.seatInfo,
              price: ethers.formatEther(ticketDetails.price) + " ETH",
              isUsed: ticketDetails.isUsed,
              tokenURI,
              eventTitle,
              isRealTicket: true
            });
          } catch (detailsErr) {
            console.error(`Error getting details for token ${tokenId}:`, detailsErr);
          }
        }
      } catch (err) {
        // This is expected for tokens that don't exist
        if (!err.message.includes("nonexistent token") && !err.message.includes("decode result data")) {
          console.log(`Error checking token ${tokenId}:`, err.message);
        }
      }
      
      // Log progress every 10 tokens
      if (tokenId % 10 === 0) {
        console.log(`Checked ${tokenId} tokens, found ${tickets.length} owned by user`);
      }
    }
    
    console.log(`Direct query complete! Checked ${checkedTokens} tokens, found ${foundTokens} owned by user`);
    
    if (tickets.length > 0) {
      console.log("Found tickets:", tickets);
      return tickets;
    } else {
      console.log("No real tickets found via direct query");
      // Return mock tickets if we don't find any real ones
      return getMockTickets();
    }
  } catch (error) {
    console.error("Error in direct ticket query:", error);
    return getMockTickets();
  }
};

/**
 * Test event creation (helper function)
 */
export const testEventCreation = async (eventId) => {
  try {
    const ticketNFT = await getTicketNFT();
    
    const eventIdNum = typeof eventId === 'string' ? parseInt(eventId) : eventId;
    
    console.log("Testing event creation for event ID:", eventIdNum);
    
    const currentTime = Math.floor(Date.now() / 1000);
    
    const createTx = await ticketNFT.createEvent(
      `Event ${eventIdNum}`,
      currentTime,
      currentTime + (365 * 24 * 60 * 60),
      "SnapTix Venue",
      100,
      true,
      { gasLimit: 500000 }
    );
    
    console.log("Test event creation tx submitted:", createTx.hash);
    await createTx.wait();
    console.log("Test event created successfully!");
    
    return true;
  } catch (error) {
    console.error("Test event creation failed:", error);
    return false;
  }
};