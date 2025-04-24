"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';
import { connectWallet, getContracts } from '../services/contractService';

const Web3Context = createContext();

export function Web3Provider({ children }) {
  const [account, setAccount] = useState(null);
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contracts, setContracts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const initWeb3 = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Check if we're in a browser environment with ethereum
        if (typeof window !== 'undefined' && window.ethereum) {
          const { accounts, provider, signer } = await connectWallet();
          setAccount(accounts[0]);
          setProvider(provider);
          setSigner(signer);
          
          const contractInstances = await getContracts(signer);
          setContracts(contractInstances);
          
          // Setup listeners for account changes
          window.ethereum.on('accountsChanged', (newAccounts) => {
            setAccount(newAccounts[0]);
          });
          
          // Setup listeners for chain changes
          window.ethereum.on('chainChanged', () => {
            window.location.reload();
          });
        }
      } catch (err) {
        console.error('Failed to initialize web3', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    initWeb3();
    
    // Cleanup listeners
    return () => {
      if (window.ethereum) {
        window.ethereum.removeAllListeners('accountsChanged');
        window.ethereum.removeAllListeners('chainChanged');
      }
    };
  }, []);

  const connect = async () => {
    try {
      const { accounts, provider, signer } = await connectWallet();
      setAccount(accounts[0]);
      setProvider(provider);
      setSigner(signer);
      
      const contractInstances = await getContracts(signer);
      setContracts(contractInstances);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Web3Context.Provider value={{ 
      account, 
      provider, 
      signer,
      contracts,
      loading,
      error,
      connect
    }}>
      {children}
    </Web3Context.Provider>
  );
}

export function useWeb3() {
  return useContext(Web3Context);
}