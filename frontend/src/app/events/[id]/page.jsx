"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  initWeb3,
  buyTicket,
  getConnectedAccount,
} from "../../../services/web3Service";
import { getEventById, getSuggestedEvents } from "../../services/chatApi";
import { ethers } from "ethers";

export default function EventDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const [event, setEvent] = useState(null);
  const [suggestedEvents, setSuggestedEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [walletConnected, setWalletConnected] = useState(false);
  const [buying, setBuying] = useState(false);
  const [selectedSeat, setSelectedSeat] = useState("");
  const [txHash, setTxHash] = useState("");
  const [ethPrice, setEthPrice] = useState(null);
  const [exchangeRate, setExchangeRate] = useState(null);
  const [seats] = useState([
    "A1",
    "A2",
    "A3",
    "B1",
    "B2",
    "B3",
    "C1",
    "C2",
    "C3",
  ]); // Example seats

  useEffect(() => {
    async function fetchEvent() {
      try {
        const result = await getEventById(id);
        if (result.success) {
          setEvent(result.data);

          // Fetch suggested events using chatApi service
          try {
            const suggestedResult = await getSuggestedEvents(id);
            if (suggestedResult.success) {
              setSuggestedEvents(suggestedResult.data);
            } else {
              console.warn("Failed to fetch suggested events:", suggestedResult.message);
            }
          } catch (suggestedErr) {
            console.error("Error fetching suggested events:", suggestedErr);
          }
        } else {
          throw new Error(result.message || "Failed to fetch event");
        }
      } catch (err) {
        console.error("Error fetching event:", err);
        setError("Failed to load event details. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    // Just check if MetaMask is already connected without forcing connection
    function checkWalletStatus() {
      try {
        if (window.ethereum && window.ethereum.selectedAddress) {
          setWalletConnected(true);
        }
      } catch (err) {
        console.error("Error checking wallet status:", err);
      }
    }

    fetchEvent();
    checkWalletStatus(); // This won't force a connection
  }, [id]);

  // Add a separate useEffect to fetch the exchange rate when event data is available
  useEffect(() => {
    // Function to fetch ETH to INR rate
    async function fetchEthPrice() {
      try {
        const response = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=inr");
        const data = await response.json();
        setExchangeRate(data.ethereum.inr);
        
        // If we have event price, calculate ETH equivalent
        if (event?.price) {
          const priceInINR = parseFloat(event.price.replace(/[^0-9.]/g, ''));
          if (!isNaN(priceInINR)) {
            setEthPrice((priceInINR / data.ethereum.inr).toFixed(6));
          }
        }
      } catch (err) {
        console.error("Error fetching ETH price:", err);
      }
    }
    
    if (event?.price) {
      fetchEthPrice();
    }
  }, [event]);
  
  const connectWallet = async () => {
    try {
      // Only initialize the wallet connection but don't do anything else
      await initWeb3();
      setWalletConnected(true);
      return true;
    } catch (err) {
      console.error("Failed to connect wallet:", err);
      if (err.code === 4001) {
        alert("You rejected the connection request. Please try again.");
      } else if (err.message.includes("already processing")) {
        alert("Wallet connection already in progress. Please check your wallet.");
      } else {
        alert("Failed to connect wallet: " + err.message);
      }
      return false;
    }
  };

  const handleBuyTicket = async () => {
    if (!walletConnected) {
      alert("Please connect your wallet first");
      return;
    }

    if (!selectedSeat) {
      alert("Please select a seat");
      return;
    }

    try {
      setBuying(true);

      // Extract numeric price value from string (e.g. "₹150" -> 150)
      let priceInINR = 0;
      if (event.price && typeof event.price === "string") {
        // Remove non-numeric characters (₹ and commas) and convert to number
        priceInINR = parseFloat(event.price.replace(/[^0-9.]/g, ''));
      }
      
      // Fallback if price parsing fails
      if (isNaN(priceInINR) || priceInINR === 0) {
        priceInINR = 100; // Default price (₹100)
      }

      let priceInEth;
      
      // Use the already fetched exchange rate if available
      if (exchangeRate && ethPrice) {
        priceInEth = ethPrice;
        console.log(`Using cached exchange rate: 1 ETH = ₹${exchangeRate}`);
      } else {
        // Fetch live exchange rate (INR to ETH) if not already available
        try {
          const response = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=inr");
          const data = await response.json();
          
          // Get ETH/INR rate
          const ethInrRate = data.ethereum.inr;
          setExchangeRate(ethInrRate);
          
          // Convert INR to ETH
          priceInEth = (priceInINR / ethInrRate).toFixed(6);
          setEthPrice(priceInEth);
          
          console.log(`Fetched new exchange rate: 1 ETH = ₹${ethInrRate}`);
        } catch (fetchError) {
          console.error("Error fetching exchange rate:", fetchError);
          // Fallback price in ETH if API fails
          priceInEth = (priceInINR / 200000).toFixed(6); // Assuming 1 ETH = ₹200,000 as fallback
          console.log("Using fallback exchange rate: 1 ETH = ₹200,000");
        }
      }
      
      console.log(`Converting price: ₹${priceInINR} = ${priceInEth} ETH`);
      
      // Convert ETH to Wei for blockchain transaction
      const priceInWei = ethers.parseEther(priceInEth);
      
      // Ensure event ID is properly formatted as number
      const eventIdNum = typeof id === 'string' ? parseInt(id) : id;

      // Call the buyTicket function
      console.log("Before contract call:");
      console.log("Event ID (type):", typeof eventIdNum, eventIdNum);
      console.log("Seat Info:", selectedSeat);
      console.log("Price (INR):", `₹${priceInINR}`);
      console.log("Price (ETH):", priceInEth);
      console.log("Price (Wei):", priceInWei.toString());

      const hash = await buyTicket(eventIdNum, selectedSeat, priceInWei);
      setTxHash(hash);

      alert(`Success! Ticket purchased for ₹${priceInINR} (${priceInEth} ETH). Transaction hash: ${hash}`);

      // try {
      //   // Try to navigate to user tickets page
      //   router.push("/my-tickets");
      // } catch (navError) {
      //   console.error("Error navigating after purchase:", navError);
      //   // Provide fallback option if navigation fails
      //   alert("Your ticket has been purchased. Please navigate to 'My Tickets' to view it.");
      // }
    } catch (err) {
      console.error("Error buying ticket:", err);
      // Provide more specific error messages based on common issues
      if (err.code === 4001) {
        alert("Transaction was rejected. Please try again.");
      } else if (err.message.includes("insufficient funds")) {
        alert("You don't have enough ETH in your wallet to complete this purchase.");
      } else if (err.message.includes("failed to fetch")) {
        alert("Failed to get currency conversion rate. Please try again later.");
      } else {
        alert("Failed to buy ticket: " + err.message);
      }
    } finally {
      setBuying(false);
    }
  };

  // Function to render event details with safety checks
  const renderEventDetails = () => {
    // Safety check for required fields
    if (!event) return <div>Event data is missing</div>;
    
    return (
      <div className="bg-gray-900 p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold mb-4">{event.title || "Untitled Event"}</h2>
        
        {/* Only render artist if exists */}
        {event.artist && (
          <p className="text-lg mb-4">
            <span className="text-pink-500 font-medium">{event.artist}</span>
          </p>
        )}
  
        {/* Only render tags if they exist */}
        {event.tags && event.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {event.tags.map((tag, index) => (
              <span
                key={index}
                className="bg-pink-700 text-white px-3 py-1 rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-gray-300">
              <span className="font-medium">Date:</span>{" "}
              {event.date || "Date not specified"}
            </p>
            <p className="text-gray-300">
              <span className="font-medium">Time:</span>{" "}
              {event.time || "Time not specified"}
            </p>
            <p className="text-gray-300">
              <span className="font-medium">Location:</span>{" "}
              {event.location || "Location not specified"}
            </p>
            <p className="text-gray-300">
              <span className="font-medium">Price:</span>{" "}
              {event.price || "Free"}
              {ethPrice && (
                <span className="text-sm text-gray-400 ml-2">
                  (~{ethPrice} ETH)
                </span>
              )}
              {exchangeRate && (
                <span className="block text-xs text-gray-500 mt-1">
                  Exchange rate: 1 ETH = ₹{exchangeRate}
                </span>
              )}
            </p>
          </div>
          <div>
            {event.genre && (
              <p className="text-gray-300">
                <span className="font-medium">Genre:</span> {event.genre}
              </p>
            )}
            {event.type && (
              <p className="text-gray-300">
                <span className="font-medium">Event Type:</span> {event.type}
              </p>
            )}
          </div>
        </div>
  
        {event.description && (
          <div className="mt-4 border-t border-gray-700 pt-4">
            <h3 className="text-xl font-semibold mb-2">About This Event</h3>
            <p className="text-gray-300">{event.description}</p>
          </div>
        )}
      </div>
    );
  };

  if (loading)
    return <div className="text-center py-10">Loading event details...</div>;
  if (error)
    return <div className="text-center py-10 text-red-500">{error}</div>;
  if (!event) return <div className="text-center py-10">Event not found</div>;

  return (
    <div className="bg-gray-900 min-h-screen text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Event Header */}
        <div className="flex flex-wrap mb-8">
          <div className="w-full lg:w-1/2 mb-6 lg:mb-0">
            <img
              src={
                event.image ||
                "https://via.placeholder.com/500x300?text=Event+Image"
              }
              alt={event.title}
              className="w-full rounded-lg shadow-lg object-cover"
              style={{ maxHeight: "500px" }}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = `/images/events/event-${event.type || "default"}.jpg`;
              }}
            />
          </div>
          <div className="w-full lg:w-1/2 lg:pl-8">
            {/* Use the renderEventDetails function */}
            {renderEventDetails()}

            {/* Seat Selection */}
            <div className="mt-6 mb-6">
              <h2 className="text-xl font-semibold mb-2">Select a Seat</h2>
              <div className="grid grid-cols-3 gap-2">
                {seats.map((seat) => (
                  <button
                    key={seat}
                    onClick={() => setSelectedSeat(seat)}
                    className={`py-2 px-4 border ${
                      selectedSeat === seat
                        ? "border-pink-500 bg-pink-500 bg-opacity-20"
                        : "border-gray-700"
                    } rounded-lg text-center hover:border-pink-500 transition duration-200`}
                  >
                    {seat}
                  </button>
                ))}
              </div>
            </div>

            {/* Buy Ticket Section */}
            <div className="mb-6">
              {!walletConnected ? (
                <button
                  onClick={connectWallet}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-lg font-medium transition w-full"
                >
                  Connect Wallet to Buy Tickets
                </button>
              ) : (
                <button
                  onClick={handleBuyTicket}
                  disabled={buying || !selectedSeat}
                  className={`${
                    buying || !selectedSeat
                      ? "bg-gray-600 cursor-not-allowed"
                      : "bg-pink-600 hover:bg-pink-700"
                  } text-white px-6 py-3 rounded-lg text-lg font-medium transition w-full`}
                >
                  {buying ? "Processing..." : "Buy Ticket as NFT"}
                </button>
              )}
            </div>

            {/* Transaction Hash */}
            {txHash && (
              <div className="mt-4 p-4 bg-gray-800 rounded-lg">
                <p className="font-medium text-green-400">
                  Transaction successful!
                </p>
                <p className="text-sm break-all mt-1">Hash: {txHash}</p>
                <div className="mt-2">
                  <Link
                    href="/my-tickets"
                    className="text-pink-400 hover:text-pink-300"
                  >
                    View my tickets →
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Suggested Events */}
        {suggestedEvents.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">You Might Also Like</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {suggestedEvents.map((suggestedEvent) => (
                <Link key={suggestedEvent.id} href={`/events/${suggestedEvent.id}`}>
                  <div className="bg-gray-800 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                    <img
                      src={
                        suggestedEvent.image ||
                        "/images/events/event-placeholder.jpg"
                      }
                      alt={suggestedEvent.title}
                      className="w-full h-48 object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = `/images/events/event-${suggestedEvent.type || "default"}.jpg`;
                      }}
                    />
                    <div className="p-4">
                      <h3 className="text-lg font-semibold">{suggestedEvent.title}</h3>
                      {suggestedEvent.artist && (
                        <p className="text-pink-500">{suggestedEvent.artist}</p>
                      )}
                      <div className="flex items-center mt-2 text-sm">
                        <span>{suggestedEvent.date || "Date TBA"}</span>
                        <span className="mx-2">•</span>
                        <span>{suggestedEvent.location || "Location TBA"}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}