import { ethers } from 'ethers';

const BASE_SEPOLIA_CHAIN_ID = '0x14A34'; // 84532

let provider;
let signer;
let metaMaskProvider = null;

// Find MetaMask specifically from the injected providers list
const getMetaMask = () => {
  if (typeof window === 'undefined') return null;
  // Multiple wallets installed — find MetaMask in the list
  if (window.ethereum?.providers?.length) {
    return window.ethereum.providers.find((p) => p.isMetaMask && !p.isPhantom) || null;
  }
  // Single wallet — only use if it's MetaMask (not Phantom)
  if (window.ethereum?.isMetaMask && !window.ethereum?.isPhantom) {
    return window.ethereum;
  }
  return null;
};

const switchToBaseSepolia = async (eth) => {
  try {
    await eth.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: BASE_SEPOLIA_CHAIN_ID }],
    });
  } catch (err) {
    if (err.code === 4902) {
      await eth.request({
        method: 'wallet_addEthereumChain',
        params: [{
          chainId: BASE_SEPOLIA_CHAIN_ID,
          chainName: 'Base Sepolia',
          nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 },
          rpcUrls: ['https://sepolia.base.org'],
          blockExplorerUrls: ['https://sepolia.basescan.org'],
        }],
      });
    } else {
      throw err;
    }
  }
};

/**
 * Initialize Web3 provider and signer using MetaMask specifically
 */
export const initProvider = async () => {
  try {
    metaMaskProvider = getMetaMask();
    if (!metaMaskProvider) {
      throw new Error("MetaMask not found. Please install MetaMask and disable other wallets for this site.");
    }

    await metaMaskProvider.request({ method: 'eth_requestAccounts' });

    const chainId = await metaMaskProvider.request({ method: 'eth_chainId' });
    if (chainId !== BASE_SEPOLIA_CHAIN_ID) {
      await switchToBaseSepolia(metaMaskProvider);
    }

    provider = new ethers.BrowserProvider(metaMaskProvider);
    signer = await provider.getSigner();

    metaMaskProvider.on('chainChanged', () => { provider = null; signer = null; });
    metaMaskProvider.on('accountsChanged', () => { provider = null; signer = null; });

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
    const eth = metaMaskProvider || getMetaMask();
    if (!eth) return null;
    const accounts = await eth.request({ method: 'eth_accounts' });
    return accounts?.[0] || null;
  } catch (error) {
    console.error("Error getting connected account:", error);
    return null;
  }
};