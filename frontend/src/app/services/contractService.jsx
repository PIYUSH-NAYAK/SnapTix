import { ethers } from 'ethers';
import TicketNFTAbi from '../../../artifacts/src/TicketNFT.sol/TicketNFT.json';
import TicketMarketplaceAbi from '../../../artifacts/src/TicketMarketplace.sol/TicketMarketplace.json';

// Import contract addresses
let contractAddresses;
try {
  contractAddresses = require('../../config/contracts.json');
} catch (error) {
  console.error('Contract addresses not found. Make sure to deploy contracts first.');
  contractAddresses = {
    TicketNFT: '',
    TicketMarketplace: ''
  };
}

export const connectWallet = async () => {
  if (!window.ethereum) {
    throw new Error('MetaMask is not installed!');
  }

  try {
    // Request account access
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    
    return { accounts, provider, signer };
  } catch (error) {
    console.error('Error connecting to wallet:', error);
    throw error;
  }
};

export const getContracts = async (signer) => {
  if (!contractAddresses.TicketNFT || !contractAddresses.TicketMarketplace) {
    throw new Error('Contract addresses not configured');
  }
  
  const ticketNFT = new ethers.Contract(
    contractAddresses.TicketNFT,
    TicketNFTAbi.abi,
    signer
  );
  
  const ticketMarketplace = new ethers.Contract(
    contractAddresses.TicketMarketplace,
    TicketMarketplaceAbi.abi,
    signer
  );
  
  return { ticketNFT, ticketMarketplace };
};

// Purchase a ticket for an event
export const purchaseTicket = async (eventId, price) => {
  try {
    const { signer } = await connectWallet();
    const { ticketNFT } = await getContracts(signer);
    
    const tx = await ticketNFT.mintTicket(eventId, { value: price });
    return await tx.wait();
  } catch (error) {
    console.error('Error purchasing ticket:', error);
    throw error;
  }
};

// Get all user tickets
export const getUserTickets = async () => {
  try {
    const { signer } = await connectWallet();
    const { ticketNFT } = await getContracts(signer);
    const address = await signer.getAddress();
    
    const balance = await ticketNFT.balanceOf(address);
    const tickets = [];
    
    for (let i = 0; i < balance; i++) {
      const tokenId = await ticketNFT.tokenOfOwnerByIndex(address, i);
      const eventId = await ticketNFT.ticketToEvent(tokenId);
      const eventDetails = await ticketNFT.events(eventId);
      
      tickets.push({
        tokenId: tokenId.toString(),
        eventId: eventId.toString(),
        eventDetails
      });
    }
    
    return tickets;
  } catch (error) {
    console.error('Error getting user tickets:', error);
    throw error;
  }
};