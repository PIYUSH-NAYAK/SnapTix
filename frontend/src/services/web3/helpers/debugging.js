import { ethers } from 'ethers';
import { getProvider } from '../core/provider';
import { getTicketNFT, getContractAddresses, getContractArtifacts } from '../core/contracts';

/**
 * Verify if the contract exists and is valid
 */
export const verifyContract = async () => {
  try {
    const provider = await getProvider();
    const contractAddresses = getContractAddresses();
    
    const address = contractAddresses.TicketNFT;
    console.log("Verifying contract at:", address);
    
    // Check if the address has code deployed
    const code = await provider.getCode(address);
    
    if (!code || code === "0x") {
      console.error("❌ No code deployed at this address! This is not a valid contract.");
      return {
        valid: false,
        message: "No contract found at the specified address"
      };
    }
    
    console.log(`✅ Contract code found (${code.length} bytes)`);
    
    // Try to call a few common ERC721 functions to verify it's the right type of contract
    try {
      // Try to call supportsInterface (ERC165)
      const supportsInterfaceData = ethers.id("supportsInterface(bytes4)").slice(0, 10) +
        "80ac58cd".padStart(64, '0'); // ERC721 interface ID
        
      const supportsResult = await provider.call({
        to: address,
        data: supportsInterfaceData
      });
      
      const supportsERC721 = supportsResult && 
        parseInt(supportsResult.slice(2).padStart(64, '0'), 16) === 1;
        
      console.log("Contract supports ERC721:", supportsERC721);
      
      return {
        valid: true,
        isERC721: supportsERC721,
        bytecodeSize: code.length
      };
    } catch (err) {
      console.error("Error calling contract methods:", err);
      return {
        valid: true,
        isERC721: false,
        error: err.message,
        bytecodeSize: code.length
      };
    }
  } catch (err) {
    console.error("Verification failed:", err);
    return {
      valid: false,
      message: err.message
    };
  }
};

/**
 * Debug ticket contract to check its functions and state
 */
export const debugTicketContract = async () => {
  try {
    const provider = await getProvider();
    const ticketNFT = await getTicketNFT();
    const contractAddresses = getContractAddresses();
    
    console.log("Contract Address:", contractAddresses.TicketNFT);
    
    // Try to get the bytecode at the contract address
    const bytecode = await provider.getCode(contractAddresses.TicketNFT);
    console.log("Contract bytecode length:", bytecode ? bytecode.length : 0);
    
    // Check if contract exists (bytecode length > 2 because "0x" is returned for non-existent contracts)
    if (!bytecode || bytecode.length <= 2) {
      console.error("⚠️ NO CONTRACT EXISTS at the specified address!");
      return false;
    }
    
    // Get basic contract info
    console.log("Attempting to call contract functions...");
    
    try {
      // Try ERC721 standard functions
      const name = await ticketNFT.name();
      console.log("Contract name:", name);
      
      const symbol = await ticketNFT.symbol();
      console.log("Contract symbol:", symbol);
      
      const supportsInterface = await ticketNFT.supportsInterface('0x80ac58cd'); // ERC721 interface ID
      console.log("Supports ERC721:", supportsInterface);
      
    } catch (err) {
      console.error("Failed to call ERC721 standard functions:", err.message);
    }
    
    // Try more specific functions to check contract compatibility
    try {
      const totalSupply = await ticketNFT.totalSupply();
      console.log("Total supply:", totalSupply.toString());
      
      // If we have tokens, check the first few
      if (totalSupply > 0) {
        console.log("Checking first few tokens...");
        const maxToCheck = Math.min(totalSupply, 3);
        
        for (let i = 0; i < maxToCheck; i++) {
          try {
            const tokenId = await ticketNFT.tokenByIndex(i);
            console.log(`Token at index ${i}:`, tokenId.toString());
            
            try {
              const owner = await ticketNFT.ownerOf(tokenId);
              console.log(`Owner of token ${tokenId}:`, owner);
            } catch (ownerErr) {
              console.error(`Failed to get owner of token ${tokenId}:`, ownerErr.message);
            }
          } catch (tokenErr) {
            console.error(`Failed to get token at index ${i}:`, tokenErr.message);
          }
        }
      }
    } catch (err) {
      console.error("Failed to call totalSupply or enumeration functions:", err.message);
    }
    
    // Try to call a contract-specific function
    try {
      console.log("Checking for events in the contract...");
      for (let i = 1; i <= 3; i++) {
        try {
          const eventData = await ticketNFT.events(i);
          console.log(`Event ${i}:`, eventData);
        } catch (e) {
          console.log(`No data for event ${i} or function not available:`, e.message);
        }
      }
    } catch (err) {
      console.error("Failed to check events:", err.message);
    }
    
    return true;
  } catch (err) {
    console.error("Debug contract error:", err);
    return false;
  }
};

/**
 * Debug contract general info
 */
export const debugContract = async () => {
  try {
    const ticketNFT = await getTicketNFT();
    const contractAddresses = getContractAddresses();
    
    console.log("Contract debugging information:");
    console.log("Contract addresses:", {
      TicketNFT: contractAddresses.TicketNFT,
      TicketMarketplace: contractAddresses.TicketMarketplace
    });
    
    // Check if ABIs are loaded properly
    const artifacts = getContractArtifacts();
    console.log("TicketNFT ABI length:", artifacts.TicketNFT.abi?.length || 0);
    console.log("TicketMarketplace ABI length:", artifacts.TicketMarketplace.abi?.length || 0);
    
    console.log("Available functions in contract ABI:");
    if (ticketNFT.interface && ticketNFT.interface.fragments) {
      ticketNFT.interface.fragments.forEach(fragment => {
        if (fragment.type === "function") {
          console.log(`- ${fragment.name}(${fragment.inputs.map(i => `${i.type} ${i.name}`).join(', ')})`);
        }
      });
    } else {
      console.log("No interface fragments available");
    }
    
    // Try to call some view functions
    try {
      const name = await ticketNFT.name();
      console.log("Contract name:", name);
    } catch (err) {
      console.error("Failed to get name:", err.message);
    }
    
    try {
      const symbol = await ticketNFT.symbol();
      console.log("Contract symbol:", symbol);
    } catch (err) {
      console.error("Failed to get symbol:", err.message);
    }
    
    try {
      const totalSupply = await ticketNFT.totalSupply();
      console.log("Total supply:", totalSupply.toString());
    } catch (err) {
      console.error("Failed to get totalSupply:", err.message);
    }
    
    return true;
  } catch (error) {
    console.error("Error debugging contract:", error);
    return false;
  }
};