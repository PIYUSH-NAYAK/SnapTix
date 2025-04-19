/**
 * Re-export everything from the modular web3 folder
 * This allows existing code to continue using imports from web3Service.js
 * without needing to update all import statements
 */

import {
  // Core exports
  initWeb3,
  getProvider,
  getSigner, 
  getConnectedAccount,
  getTicketNFT,
  getTicketMarketplace,
  getContractAddresses,
  
  // Helper exports
  getMockTickets,
  verifyContract,
  debugTicketContract,
  debugContract,
  
  // Ticket query exports
  getUserTickets,
  getTicketsDirectQuery,
  testEventCreation,
  
  // Ticket action exports
  buyTicket,
  buyTicketDirect
} from './web3';

// Re-export everything
export {
  initWeb3,
  getProvider,
  getSigner, 
  getConnectedAccount,
  getTicketNFT,
  getTicketMarketplace,
  getContractAddresses,
  
  getMockTickets,
  verifyContract,
  debugTicketContract,
  debugContract,
  
  getUserTickets,
  getTicketsDirectQuery,
  testEventCreation,
  
  buyTicket,
  buyTicketDirect
};