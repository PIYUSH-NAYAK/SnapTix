"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  initWeb3,
  buyTicket,
  getConnectedAccount,
} from "../../../services/web3Service";
import { getEventById, getSuggestedEvents } from "../../services/chatApi";
import { ethers } from "ethers";
import { useAuth } from "../../../context/AuthContext";
import toast from "react-hot-toast";

export default function EventDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const { authFetch } = useAuth();
  const [event, setEvent] = useState(null);
  const [suggestedEvents, setSuggestedEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [walletConnected, setWalletConnected] = useState(false);
  const [buying, setBuying] = useState(false);
  const [selectedSeat, setSelectedSeat] = useState("");
  const [txHash, setTxHash] = useState("");
  const [buyingStep, setBuyingStep] = useState("");
  const [ethPrice, setEthPrice] = useState(null);
  const [exchangeRate, setExchangeRate] = useState(null);
  const [bookedSeats, setBookedSeats] = useState([]);

  // Generate rows A-F, seats 1-8
  const rows = ["A", "B", "C", "D", "E", "F"];
  const seatsPerRow = 8;
  const allSeats = rows.flatMap((row) =>
    Array.from({ length: seatsPerRow }, (_, i) => `${row}${i + 1}`)
  );
  
  // Animation refs
  const [mainImageRef, mainImageInView] = useInView({ threshold: 0.2, triggerOnce: true });
  const [detailsRef, detailsInView] = useInView({ threshold: 0.2, triggerOnce: true });
  const [seatsRef, seatsInView] = useInView({ threshold: 0.2, triggerOnce: true });
  const [suggestedRef, suggestedInView] = useInView({ threshold: 0.1, triggerOnce: true });

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
    checkWalletStatus();

    // Fetch booked seats for this event
    const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000/api";
    fetch(`${BACKEND}/events/${id}/booked-seats`)
      .then((r) => r.json())
      .then((d) => { if (d.success) setBookedSeats(d.seats); })
      .catch(() => {});
  }, [id]);

  // Add a separate useEffect to fetch the exchange rate when event data is available
  useEffect(() => {
    // Function to fetch ETH to INR rate
    async function fetchEthPrice() {
      try {
        const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000/api";
        const response = await fetch(`${BACKEND}/eth-price`);
        const data = await response.json();
        const rate = data.inr || 220000;
        setExchangeRate(rate);
        if (event?.price) {
          const priceInINR = parseFloat(event.price.replace(/[^0-9.]/g, ''));
          if (!isNaN(priceInINR)) {
            setEthPrice((priceInINR / rate).toFixed(6));
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

  // Handle wallet connection
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

  // Handle buying a ticket
  const handleBuyTicket = async () => {
    if (!walletConnected) {
      toast.error("Please connect your wallet first");
      return;
    }

    if (!selectedSeat) {
      toast.error("Please select a seat");
      return;
    }

    try {
      setBuying(true);
      setBuyingStep("Converting price...");

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
          const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000/api";
          const response = await fetch(`${BACKEND}/eth-price`);
          const data = await response.json();
          const ethInrRate = data.inr || 220000;
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

      setBuyingStep("Confirm the transaction in MetaMask...");
      const hash = await buyTicket(eventIdNum, selectedSeat, priceInWei, setBuyingStep);
      setTxHash(hash);
      setBuyingStep("Saving your booking...");

      // Save booking to MongoDB
      try {
        await authFetch("/bookings", {
          method: "POST",
          body: JSON.stringify({
            eventId: id,
            eventTitle: event.title,
            eventDate: event.date,
            eventLocation: event.location,
            eventImage: event.image,
            seatInfo: selectedSeat,
            price: event.price,
            txHash: hash,
          }),
        });
      } catch (err) {
        console.warn("Failed to save booking to backend:", err.message);
      }

      setBookedSeats((prev) => [...prev, selectedSeat]);
      setSelectedSeat("");
      setBuyingStep("");
      toast.success("🎟️ Ticket purchased! Redirecting to My Tickets...", { duration: 3000 });
      setTimeout(() => router.push("/my-tickets"), 2000);

    } catch (err) {
      console.error("Error buying ticket:", err);
      
      // Provide more specific error messages based on common issues
      if (err.code === 4001) {
        toast.error("Transaction rejected. Please try again.");
      } else if (err.message?.includes("insufficient funds")) {
        toast.error("Not enough ETH in your wallet.");
      } else if (err.message?.includes("MetaMask not found")) {
        toast.error("MetaMask not found. Please install it.");
      } else {
        toast.error("Failed to buy ticket: " + (err.reason || err.message));
      }
    } finally {
      setBuying(false);
      setBuyingStep("");
    }
  };

  // Function to render event details with safety checks
  const renderEventDetails = () => {
    // Safety check for required fields
    if (!event) return <div>Event data is missing</div>;
    
    return (
      <div className="bg-gray-900/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-gray-800">
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

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: 1, 
            scale: 1, 
            rotate: 360,
            borderColor: ['rgba(236, 72, 153, 1)', 'rgba(139, 92, 246, 1)', 'rgba(236, 72, 153, 1)']
          }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          className="h-16 w-16 border-4 border-t-transparent rounded-full"
        />
      </div>
    );
  }
  
  if (error) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen bg-black text-white flex items-center justify-center px-4"
      >
        <div className="bg-red-900/30 border border-red-800 rounded-lg p-6 max-w-md text-center">
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <svg className="w-16 h-16 text-red-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </motion.div>
          <h2 className="text-2xl font-bold mb-2">Error</h2>
          <p className="text-white/80 mb-6">{error}</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push('/events')}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition"
          >
            Back to Events
          </motion.button>
        </div>
      </motion.div>
    );
  }
  
  if (!event) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen bg-black text-white flex items-center justify-center"
      >
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Event not found</h2>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push('/events')}
            className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-2 rounded-lg transition"
          >
            Browse Events
          </motion.button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="bg-black min-h-screen text-white pt-[calc(3rem+1px)]">

      {/* Purchase loading overlay */}
      {buying && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center gap-6"
        >
          {/* Spinning ring */}
          <div className="relative w-20 h-20">
            <div className="absolute inset-0 rounded-full border-4 border-pink-500/20" />
            <motion.div
              className="absolute inset-0 rounded-full border-4 border-t-pink-500 border-r-purple-500 border-b-transparent border-l-transparent"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
            <div className="absolute inset-0 flex items-center justify-center text-2xl">🎟️</div>
          </div>

          <div className="text-center">
            <p className="text-white font-semibold text-lg mb-1">Processing your ticket</p>
            <motion.p
              key={buyingStep}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-gray-400 text-sm"
            >
              {buyingStep}
            </motion.p>
          </div>

          {/* Steps */}
          <div className="flex flex-col gap-2 text-sm w-64">
            {[
              "Converting price...",
              "Confirm the transaction in MetaMask...",
              "Creating event on-chain...",
              "Saving your booking...",
            ].map((step) => (
              <div key={step} className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${
                buyingStep === step
                  ? "bg-pink-500/20 text-pink-300 border border-pink-500/30"
                  : "text-gray-600"
              }`}>
                <span>{buyingStep === step ? "⏳" : "○"}</span>
                <span>{step}</span>
              </div>
            ))}
          </div>
        </motion.div>
      )}
      <div className="container mx-auto px-4 py-8">
        {/* Event Header */}
        <div className="flex flex-wrap mb-8">
          <motion.div 
            className="w-full lg:w-1/2 mb-6 lg:mb-0"
            ref={mainImageRef}
            initial={{ opacity: 0, y: 20 }}
            animate={mainImageInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.7 }}
          >
            <motion.img
              src={event.image || "https://via.placeholder.com/500x300?text=Event+Image"}
              alt={event.title}
              className="w-full rounded-lg shadow-lg object-cover"
              style={{ maxHeight: "500px" }}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = `/images/events/event-${event.type || "default"}.jpg`;
              }}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
          <motion.div 
            className="w-full lg:w-1/2 lg:pl-8"
            ref={detailsRef}
            initial={{ opacity: 0, x: 20 }}
            animate={detailsInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            {/* Use the renderEventDetails function */}
            {renderEventDetails()}

            {/* Seat Selection */}
            <motion.div 
              className="mt-6 mb-6"
              ref={seatsRef}
              initial={{ opacity: 0, y: 20 }}
              animate={seatsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              <h2 className="text-xl font-semibold mb-3">Select a Seat</h2>

              {/* Legend */}
              <div className="flex gap-4 mb-3 text-xs text-gray-400">
                <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-gray-700 inline-block" /> Available</span>
                <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-pink-600 inline-block" /> Selected</span>
                <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-gray-600 opacity-40 inline-block" /> Booked</span>
              </div>

              {/* Stage indicator */}
              <div className="w-full text-center text-xs text-gray-500 mb-2 border-t border-gray-700 pt-2">STAGE</div>

              {/* Seat grid — rows */}
              <div className="space-y-1.5">
                {rows.map((row) => (
                  <div key={row} className="flex items-center gap-1.5">
                    <span className="text-xs text-gray-500 w-4 flex-shrink-0">{row}</span>
                    <div className="flex gap-1.5 flex-wrap">
                      {Array.from({ length: seatsPerRow }, (_, i) => {
                        const seat = `${row}${i + 1}`;
                        const isBooked = bookedSeats.includes(seat);
                        const isSelected = selectedSeat === seat;
                        return (
                          <motion.button
                            key={seat}
                            disabled={isBooked}
                            onClick={() => setSelectedSeat(isSelected ? "" : seat)}
                            whileHover={isBooked ? {} : { scale: 1.1 }}
                            whileTap={isBooked ? {} : { scale: 0.95 }}
                            className={`w-8 h-8 rounded text-xs font-medium transition-all ${
                              isBooked
                                ? "bg-gray-700 text-gray-600 cursor-not-allowed opacity-40"
                                : isSelected
                                ? "bg-pink-600 text-white shadow-lg shadow-pink-500/30 border border-pink-400"
                                : "bg-gray-800 text-gray-300 border border-gray-700 hover:border-pink-500 hover:bg-pink-500/10"
                            }`}
                          >
                            {i + 1}
                          </motion.button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              {selectedSeat && (
                <p className="mt-3 text-sm text-pink-400 font-medium">
                  Selected: <span className="text-white">{selectedSeat}</span>
                </p>
              )}
            </motion.div>

            {/* Buy Ticket Section */}
            <motion.div 
              className="mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={seatsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.7, delay: 0.6 }}
            >
              {!walletConnected ? (
                <motion.button
                  onClick={connectWallet}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-lg font-medium transition w-full shadow-lg hover:shadow-blue-500/30"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Connect Wallet to Buy Tickets
                </motion.button>
              ) : (
                <motion.button
                  onClick={handleBuyTicket}
                  disabled={buying || !selectedSeat}
                  className={`${
                    buying || !selectedSeat
                      ? "bg-gray-600 cursor-not-allowed"
                      : "bg-pink-600 hover:bg-pink-700"
                  } text-white px-6 py-3 rounded-lg text-lg font-medium transition w-full shadow-lg hover:shadow-pink-500/30`}
                  whileHover={buying || !selectedSeat ? {} : { scale: 1.02 }}
                  whileTap={buying || !selectedSeat ? {} : { scale: 0.98 }}
                >
                  {buying ? "Processing..." : "Buy Ticket as NFT"}
                </motion.button>
              )}
            </motion.div>

            {/* Transaction Hash */}
            {txHash && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mt-4 p-4 bg-gray-800/70 backdrop-blur-sm rounded-lg border border-green-500/30"
              >
                <motion.p 
                  animate={{ color: ['#10b981', '#34d399', '#10b981'] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="font-medium text-green-400"
                >
                  Transaction successful!
                </motion.p>
                <p className="text-sm break-all mt-1">Hash: {txHash}</p>
                <div className="mt-2">
                  <motion.div whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                    <Link
                      href="/my-tickets"
                      className="text-pink-400 hover:text-pink-300 flex items-center"
                    >
                      View my tickets 
                      <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* Suggested Events */}
        {suggestedEvents.length > 0 && (
          <motion.div 
            className="mt-12"
            ref={suggestedRef}
            initial={{ opacity: 0, y: 30 }}
            animate={suggestedInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.7 }}
          >
            <motion.h2 
              initial={{ opacity: 0, y: 10 }}
              animate={suggestedInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-2xl font-bold mb-6"
            >
              You Might Also Like
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {suggestedEvents.map((suggestedEvent, index) => (
                <motion.div
                  key={suggestedEvent.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={suggestedInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  whileHover={{ y: -8, transition: { duration: 0.2 } }}
                >
                  <Link href={`/events/${suggestedEvent.id}`}>
                    <div className="bg-gray-800/70 backdrop-blur-sm rounded-lg overflow-hidden hover:shadow-lg hover:shadow-pink-500/20 transition-all duration-300">
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={
                            suggestedEvent.image ||
                            "/images/events/event-placeholder.jpg"
                          }
                          alt={suggestedEvent.title}
                          className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = `/images/events/event-${suggestedEvent.type || "default"}.jpg`;
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 hover:opacity-100 transition-opacity flex items-end justify-center pb-4">
                          <span className="text-white font-medium">View Event</span>
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="text-lg font-semibold">{suggestedEvent.title}</h3>
                        {suggestedEvent.artist && (
                          <p className="text-pink-500">{suggestedEvent.artist}</p>
                        )}
                        <div className="flex items-center mt-2 text-sm text-gray-400">
                          <span>{suggestedEvent.date || "Date TBA"}</span>
                          <span className="mx-2">•</span>
                          <span>{suggestedEvent.location || "Location TBA"}</span>
                        </div>
                        {suggestedEvent.price && (
                          <p className="mt-2 text-pink-500 font-medium">{suggestedEvent.price}</p>
                        )}
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );


}
