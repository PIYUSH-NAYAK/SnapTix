import { ethers } from 'ethers';
import { getSigner, getConnectedAccount } from '../core/provider';
import { getTicketNFT, getContractAddresses } from '../core/contracts';

/**
 * Buy a ticket for an event
 */
export const buyTicket = async (eventId, seatInfo, price) => {
  try {
    const ticketNFT = await getTicketNFT();
    
    // Convert eventId to a number if it's a string
    const eventIdNum = typeof eventId === 'string' ? parseInt(eventId) : eventId;
    
    // Get the connected account
    const account = await getConnectedAccount();
    
    console.log("Buying ticket with params:", {
      account,
      eventId: eventIdNum,
      seatInfo,
      price: price.toString()
    });
    
    // Skip the event creation step and directly attempt to mint the ticket
    console.log("Attempting to mint ticket directly...");
    
    // Prepare metadata URI
    const metadataUri = `https://snaptix.example/metadata/${eventIdNum}-${seatInfo}`;
    
    // Encode mintTicket function data for debugging
    const mintData = ticketNFT.interface.encodeFunctionData("mintTicket", [
      account,
      eventIdNum,
      seatInfo,
      price,
      metadataUri
    ]);
    console.log("Encoded mintTicket data:", mintData);
    
    try {
      // Try to mint the ticket directly
      const mintTx = await ticketNFT.mintTicket(
        account,
        eventIdNum,
        seatInfo,
        price,
        metadataUri,
        { gasLimit: 500000 }
      );
      
      console.log("Mint transaction submitted:", mintTx.hash);
      const mintReceipt = await mintTx.wait();
      console.log("Ticket minted successfully:", mintReceipt);
      
      return mintTx.hash;
      
    } catch (mintError) {
      // If minting fails (likely because event doesn't exist), create the event and then try minting again
      if (mintError.message.includes("event does not exist") || mintError.message.includes("revert")) {
        console.log("Minting failed. Event may not exist. Creating event first...");
        
        const currentTime = Math.floor(Date.now() / 1000);
        
        // Create the event
        const createTx = await ticketNFT.createEvent(
          `Event ${eventIdNum}`,
          currentTime,
          currentTime + (365 * 24 * 60 * 60),
          "SnapTix Venue",
          100,
          true,
          { gasLimit: 500000 }
        );
        
        console.log("Event creation tx submitted:", createTx.hash);
        await createTx.wait();
        console.log("Event created successfully!");
        
        // Now try minting again
        const mintTx = await ticketNFT.mintTicket(
          account,
          eventIdNum,
          seatInfo,
          price,
          metadataUri,
          { gasLimit: 500000 }
        );
        
        console.log("Mint transaction submitted:", mintTx.hash);
        const mintReceipt = await mintTx.wait();
        console.log("Ticket minted successfully:", mintReceipt);
        
        return mintTx.hash;
      } else {
        // If it's some other error, rethrow it
        throw mintError;
      }
    }
    
  } catch (error) {
    console.error("Error buying ticket:", error);
    throw error;
  }
};

/**
 * Buy ticket with direct transaction (fallback method)
 */
export const buyTicketDirect = async (eventId, seatInfo, price) => {
  try {
    const signer = await getSigner();
    const contractAddresses = getContractAddresses();
    
    console.log("Attempting direct transaction as fallback...");
    
    const account = await signer.getAddress();
    const eventIdNum = BigInt(typeof eventId === 'string' ? parseInt(eventId) : eventId);
    const tokenURI = `https://snaptix.example/metadata/${eventId}-${seatInfo}`;
    
    // Manually construct the function data for mintTicket
    // Function signature: mintTicket(address,uint256,string,uint256,string)
    const functionSignature = "mintTicket(address,uint256,string,uint256,string)";
    const functionSelector = ethers.id(functionSignature).substring(0, 10); // First 4 bytes
    
    console.log("Function selector:", functionSelector);
    
    // Encode parameters
    const abiCoder = ethers.AbiCoder.defaultAbiCoder();
    const encodedParams = abiCoder.encode(
      ["address", "uint256", "string", "uint256", "string"],
      [account, eventIdNum, seatInfo, price, tokenURI]
    );
    
    console.log("Encoded parameters:", encodedParams);
    
    // Combine function selector and encoded parameters
    const mintTicketData = functionSelector + encodedParams.substring(2);
    
    console.log("Complete transaction data:", mintTicketData);
    
    const tx = await signer.sendTransaction({
      to: contractAddresses.TicketNFT,
      data: mintTicketData,
      value: "0",
      gasLimit: ethers.toBigInt("500000")
    });
    
    console.log("Direct transaction submitted:", tx.hash);
    const receipt = await tx.wait();
    console.log("Direct transaction receipt:", receipt);
    return tx.hash;
  } catch (error) {
    console.error("Error with direct transaction:", error);
    throw error;
  }
};