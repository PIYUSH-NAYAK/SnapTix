// FILE: /home/mod/Project/prac/SnapTix/frontend/src/services/web3/core/provider.js
import { ethers } from 'ethers';

let provider;
let signer;

/**
 * Initialize Web3 provider and signer without connecting to contracts
 */
export const initProvider = async () => {
  try {
    // Check if MetaMask is installed
    if (!window.ethereum) {
      throw new Error("Please install MetaMask to use this application");
    }

    // Create provider
    provider = new ethers.BrowserProvider(window.ethereum);
    
    // Request account access
    await window.ethereum.request({ method: 'eth_requestAccounts' });
    
    // Get signer
    signer = await provider.getSigner();
    
    return { provider, signer };
  } catch (error) {
    console.error("Error initializing Web3 provider:", error);
    throw error;
  }
};

/**
 * Get the current provider
 */
export const getProvider = async () => {
  if (!provider) {
    await initProvider();
  }
  return provider;
};

/**
 * Get the current signer
 */
export const getSigner = async () => {
  if (!signer) {
    await initProvider();
  }
  return signer;
};

/**
 * Get the connected account address
 */
export const getConnectedAccount = async () => {
  try {
    if (!window.ethereum) {
      console.log("MetaMask is not installed");
      return null;
    }
    
    const accounts = await window.ethereum.request({ method: 'eth_accounts' });
    if (accounts && accounts.length > 0) {
      return accounts[0];
    }
    
    return null;
  } catch (error) {
    console.error("Error getting connected account:", error);
    return null;
  }
};