// Core imports
import { 
    initProvider, 
    getProvider,
    getSigner, 
    getConnectedAccount 
  } from './core/provider';
  
  import {
    initContracts,
    getTicketNFT,
    getTicketMarketplace,
    getContractAddresses
  } from './core/contracts';
  
  // Helper imports
  import { getMockTickets } from './helpers/utils';
  import { 
    verifyContract, 
    debugTicketContract, 
    debugContract 
  } from './helpers/debugging';
  
  // Ticket functions imports
  import {
    getUserTickets,
    getTicketsDirectQuery,
    testEventCreation
  } from './tickets/ticketQueries';
  
  import {
    buyTicket,
    buyTicketDirect
  } from './tickets/ticketActions';
  
  /**
   * Initialize web3 (combines provider and contracts initialization)
   */
  export const initWeb3 = async () => {
    try {
      const { provider, signer } = await initProvider();
      const { ticketNFT, ticketMarketplace } = await initContracts();
      
      return { provider, signer, ticketNFT, ticketMarketplace };
    } catch (error) {
      console.error("Error in initWeb3:", error);
      throw error;
    }
  };
  
  // Export all functions
  export {
    // Core exports
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
  };