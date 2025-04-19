// FILE: /home/mod/Project/prac/SnapTix/frontend/src/services/web3/core/contracts.js
import { ethers } from 'ethers';
import contractAddresses from '../../../config/contracts.json';

// Import full artifacts
import TicketNFTArtifact from '../../../config/abis/TicketNFT.json';
import TicketMarketplaceArtifact from '../../../config/abis/TicketMarketplace.json';
import { getProvider, getSigner } from './provider';

// Log ABI loading status
console.log("TicketNFT ABI loaded:", !!TicketNFTArtifact.abi && TicketNFTArtifact.abi.length > 0);
console.log("TicketMarketplace ABI loaded:", !!TicketMarketplaceArtifact.abi && TicketMarketplaceArtifact.abi.length > 0);

let ticketNFT;
let ticketMarketplace;

/**
 * Initialize contracts with provider/signer
 */
export const initContracts = async () => {
  try {
    const signer = await getSigner();
    
    // Initialize contracts with proper error handling for ABIs
    if (!TicketNFTArtifact.abi || TicketNFTArtifact.abi.length === 0) {
      throw new Error("TicketNFT ABI is empty or missing");
    }
    
    if (!TicketMarketplaceArtifact.abi || TicketMarketplaceArtifact.abi.length === 0) {
      throw new Error("TicketMarketplace ABI is empty or missing");
    }
    
    ticketNFT = new ethers.Contract(
      contractAddresses.TicketNFT,
      TicketNFTArtifact.abi,
      signer
    );
    
    ticketMarketplace = new ethers.Contract(
      contractAddresses.TicketMarketplace,
      TicketMarketplaceArtifact.abi,
      signer
    );
    
    console.log("Contracts initialized:", {
      ticketNFT: !!ticketNFT,
      ticketMarketplace: !!ticketMarketplace
    });
    
    return { ticketNFT, ticketMarketplace };
  } catch (error) {
    console.error("Error initializing contracts:", error);
    throw error;
  }
};

/**
 * Get the TicketNFT contract instance
 */
export const getTicketNFT = async () => {
  if (!ticketNFT) {
    await initContracts();
  }
  return ticketNFT;
};

/**
 * Get the TicketMarketplace contract instance
 */
export const getTicketMarketplace = async () => {
  if (!ticketMarketplace) {
    await initContracts();
  }
  return ticketMarketplace;
};

/**
 * Get contract addresses
 */
export const getContractAddresses = () => {
  return contractAddresses;
};

/**
 * Get contract artifacts (ABIs)
 */
export const getContractArtifacts = () => {
  return {
    TicketNFT: TicketNFTArtifact,
    TicketMarketplace: TicketMarketplaceArtifact
  };
};