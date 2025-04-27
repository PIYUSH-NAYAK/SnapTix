"use client";
import contractAddresses from "../../config/contracts.json";

import { useState, useEffect } from "react";
import {
  getUserTickets,
  getConnectedAccount,
  initWeb3,
  getTicketsDirectQuery,
  debugTicketContract,
  verifyContract,
} from "../../services/web3Service";
import Link from "next/link";

export default function MyTicketsPage() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [walletConnected, setWalletConnected] = useState(false);
  const [account, setAccount] = useState("");
  const [useDirectQuery, setUseDirectQuery] = useState(true); // Default to direct query

  useEffect(() => {
    async function checkWalletAndLoadTickets() {
      try {
        // Only proceed if window.ethereum exists
        if (!window.ethereum) {
          console.log("Ethereum provider not available");
          setWalletConnected(false);
          setLoading(false);
          return;
        }

        // Just check if already connected without prompting
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });
        if (accounts && accounts.length > 0) {
          setWalletConnected(true);
          setAccount(accounts[0]);

          console.log("Fetching tickets for account:", accounts[0]);
          try {
            setLoading(true);

            // Use direct query approach by default
            const userTickets = useDirectQuery
              ? await getTicketsDirectQuery()
              : await getUserTickets();

            console.log("Got tickets:", userTickets);

            if (userTickets.length > 0 && userTickets[0].isRealTicket) {
              console.log("Showing real blockchain tickets!");
            } else {
              console.log("Showing mock tickets - no real tickets found");
            }

            setTickets(userTickets);
            setLoading(false);
          } catch (ticketsError) {
            console.error("Error fetching tickets:", ticketsError);
            setError("Unable to fetch your tickets. Please try again later.");
            setLoading(false);
          }
        } else {
          setWalletConnected(false);
          setLoading(false);
        }
      } catch (err) {
        console.error("Error:", err);
        setError("Failed to check wallet connection.");
        setLoading(false);
      }
    }

    checkWalletAndLoadTickets();
  }, [useDirectQuery]);

  const connectWallet = async () => {
    try {
      setLoading(true);
      setError(null);

      // This will prompt for wallet connection
      await initWeb3();

      const account = await getConnectedAccount();

      if (account) {
        setWalletConnected(true);
        setAccount(account);

        try {
          // Use direct query approach by default
          const userTickets = useDirectQuery
            ? await getTicketsDirectQuery()
            : await getUserTickets();

          setTickets(userTickets);
        } catch (ticketsError) {
          console.error("Error fetching tickets:", ticketsError);
          setError(
            "Unable to load tickets. Please refresh the page and try again."
          );
        }
      } else {
        setError("No account found. Please make sure your wallet is unlocked.");
      }
    } catch (err) {
      console.error("Failed to connect wallet:", err);
      setError("Failed to connect wallet: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const forceRefresh = async () => {
    try {
      setLoading(true);
      setError(null);

      // First, run the debug function to check contract state
      await debugTicketContract();

      // Then get tickets using direct query
      const directTickets = await getTicketsDirectQuery();

      if (directTickets.length > 0 && directTickets[0].isRealTicket) {
        setTickets(directTickets);
        alert(`Found ${directTickets.length} real tickets!`);
      } else {
        setTickets(directTickets); // Will be mock tickets
        alert("No real tickets found. Showing mock data.");
      }
    } catch (err) {
      console.error("Force refresh error:", err);
      setError("Failed to refresh tickets: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-gray-900 min-h-screen text-white">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-3xl font-bold mb-8">My Tickets</h1>
          <div className="text-center py-10">Loading your tickets...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-[calc(3rem+1px)] bg-gray-900 min-h-screen text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">My Tickets</h1>

          {walletConnected && (
            <div className="flex space-x-2">
              <button
                onClick={forceRefresh}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm"
              >
                Force Refresh
              </button>
              <button
                onClick={async () => {
                  try {
                    setLoading(true);
                    const result = await verifyContract();
                    console.log("Contract verification result:", result);
                    setLoading(false);

                    // Show verification result to user
                    if (result.valid) {
                      alert(`Contract verification: Valid contract found
Bytecode size: ${result.bytecodeSize} bytes
ERC721 compliant: ${result.isERC721 ? "Yes" : "No"}`);
                    } else {
                      alert(`Contract verification failed: ${result.message}`);
                    }
                    await debugTicketContract();
                  } catch (err) {
                    console.error("Verification error:", err);
                    setLoading(false);
                    alert("Error verifying contract: " + err.message);
                  }
                }}
                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm"
              >
                Diagnose Contract
              </button>
            </div>
          )}
        </div>

        {error && (
          <div className="bg-red-900/30 border border-red-800 rounded-lg p-4 mb-8">
            <p className="text-white">{error}</p>
            <button
              onClick={() => setError(null)}
              className="text-sm text-red-300 hover:text-white mt-2"
            >
              Dismiss
            </button>
          </div>
        )}

        {!walletConnected ? (
          <div className="text-center py-12">
            <p className="text-xl mb-6">
              Connect your wallet to view your tickets
            </p>
            <button
              onClick={connectWallet}
              className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-lg text-lg font-medium transition"
            >
              Connect Wallet
            </button>
          </div>
        ) : tickets.length === 0 ? (
          <div className="text-center py-12 bg-gray-800 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">No tickets found</h2>
            <p className="mb-6">You don't have any tickets yet.</p>
            <Link
              href="/events"
              className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-lg text-lg font-medium transition"
            >
              Browse Events
            </Link>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <p className="text-sm text-gray-400">
                {tickets[0].isRealTicket
                  ? "Showing your actual NFT tickets from the blockchain"
                  : "Showing mock tickets (no real NFT tickets found)"}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tickets.map((ticket) => (
                <div
                  key={ticket.tokenId}
                  className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700"
                >
                  <div className="p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h2 className="text-xl font-bold">
                          {ticket.eventTitle}
                        </h2>
                        <p className="text-pink-500 mt-2">
                          Seat: {ticket.seatInfo}
                        </p>
                      </div>
                      <div
                        className={`text-sm px-3 py-1 rounded-full ${
                          ticket.isUsed
                            ? "bg-gray-600 text-gray-300"
                            : "bg-green-600 text-white"
                        }`}
                      >
                        {ticket.isUsed ? "Used" : "Valid"}
                      </div>
                    </div>

                    <div className="mt-4">
                      <p className="text-sm text-gray-400">
                        NFT ID: #{ticket.tokenId}
                      </p>
                      <p className="text-sm text-gray-400 mt-1">
                        Event ID: {ticket.eventId}
                      </p>
                      <p className="text-sm text-gray-400 mt-1">
                        Price: {ticket.price}
                      </p>
                      {ticket.isRealTicket && (
                        <p className="text-xs text-green-500 mt-1">
                          Real blockchain ticket
                        </p>
                      )}
                    </div>

                    <div className="mt-6 flex justify-between">
                      <Link
                        href={`/events/${ticket.eventId}`}
                        className="text-blue-400 hover:text-blue-300 text-sm"
                      >
                        View Event Details
                      </Link>

                      <Link
                        href={
                          contractAddresses && contractAddresses.TicketNFT
                            ? `https://sepolia.basescan.org/token/${contractAddresses.TicketNFT}?a=${ticket.tokenId}`
                            : "#"
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-300 text-sm"
                      >
                        View on Blockchain
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
