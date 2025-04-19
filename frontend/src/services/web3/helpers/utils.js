// FILE: /home/mod/Project/prac/SnapTix/frontend/src/services/web3/helpers/utils.js
import { ethers } from 'ethers';

/**
 * Returns mock tickets data for testing
 */
export const getMockTickets = () => {
  return [
    {
      tokenId: "1",
      eventId: "42",
      seatInfo: "A1",
      price: "0.01 ETH",
      tokenURI: "https://snaptix.example/metadata/42-A1",
      eventTitle: "Sample Concert",
      isUsed: false
    },
    {
      tokenId: "2", 
      eventId: "76",
      seatInfo: "B3",
      price: "0.015 ETH",
      tokenURI: "https://snaptix.example/metadata/76-B3",
      eventTitle: "Rock Festival",
      isUsed: true
    }
  ];
};

/**
 * Encode function call data
 */
export const encodeFunctionCall = (functionName, types, values) => {
  const functionSignature = `${functionName}(${types.join(',')})`;
  const functionSelector = ethers.id(functionSignature).slice(0, 10);
  const encodedParams = ethers.AbiCoder.defaultAbiCoder().encode(types, values).slice(2);
  return functionSelector + encodedParams;
};