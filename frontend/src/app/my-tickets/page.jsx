"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../../context/AuthContext";
import { getEventById } from "../services/chatApi";
import Link from "next/link";
import Image from "next/image";
import toast from "react-hot-toast";

export default function MyTickets() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    // Function to fetch the specific ticket events
    const fetchSpecificTickets = async () => {
      try {
        // Array of specific event IDs we want to show as tickets
        const eventIds = ["8", "18", "16", "23"];
        
        const ticketPromises = eventIds.map(async (id) => {
          const result = await getEventById(id);
          
          if (result.success && result.data) {
            const event = result.data;
            // Create a ticket object based on the event data
            return {
              id: `ticket-${id}`,
              eventId: id,
              eventName: event.title,
              eventType: event.type,
              venue: event.location,
              date: event.date,
              time: event.time,
              seatInfo: `Section ${String.fromCharCode(65 + Math.floor(Math.random() * 5))}, Row ${Math.floor(Math.random() * 20) + 1}, Seat ${Math.floor(Math.random() * 30) + 1}`,
              price: event.price,
              status: "confirmed",
              purchaseDate: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toISOString(),
              image: event.image
            };
          }
          return null;
        });
        
        const fetchedTickets = (await Promise.all(ticketPromises)).filter(Boolean);
        setTickets(fetchedTickets);
      } catch (error) {
        console.error("Error fetching tickets:", error);
        toast.error("Failed to load tickets");
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchSpecificTickets();
    } else {
      setLoading(false);
    }
  }, [user]);

  // Format date helper
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black pt-[calc(3rem+1px)] flex justify-center items-center">
        <div className="relative w-16 h-16">
          <div className="w-16 h-16 border-4 border-gray-700 border-t-pink-500 rounded-full animate-spin"></div>
          <div className="absolute top-0 left-0 w-16 h-16 border-4 border-t-4 border-transparent border-t-purple-500 rounded-full animate-spin" style={{ animationDuration: '1.5s' }}></div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-black pt-[calc(3rem+1px)] flex flex-col justify-center items-center p-4">
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          className="text-center max-w-md mx-auto"
        >
          <h1 className="text-3xl font-bold text-white mb-4">Access Required</h1>
          <p className="text-gray-400 mb-6">Please log in to view your tickets.</p>
          <Link 
            href="/login" 
            className="px-5 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg shadow-lg hover:shadow-pink-500/30 transition-all duration-300"
          >
            Log In
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pt-[calc(3rem+1px)] pb-16 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-white mt-8 mb-2"
        >
          My Tickets
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-gray-400 mb-8"
        >
          View and manage your confirmed tickets
        </motion.p>

        {tickets.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 text-center"
          >
            <h2 className="text-xl text-white font-medium mb-4">No tickets found</h2>
            <p className="text-gray-400 mb-6">You haven't purchased any tickets yet.</p>
            <Link href="/events" className="px-5 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg">
              Browse Events
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tickets.map((ticket, index) => (
              <motion.div
                key={ticket.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={ticket.image || "/images/placeholder.jpg"}
                    alt={ticket.eventName}
                    fill
                    className="object-cover"
                    unoptimized={true}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 w-full p-4">
                    <h3 className="text-xl font-bold text-white">{ticket.eventName}</h3>
                    <p className="text-pink-400 text-sm">{ticket.eventType}</p>
                  </div>
                </div>
                
                <div className="p-4 border-t border-gray-700">
                  <div className="flex justify-between mb-4">
                    <div>
                      <p className="text-gray-400 text-sm">Date & Time</p>
                      <p className="text-white">{formatDate(ticket.date)} • {ticket.time}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-gray-400 text-sm">Venue</p>
                      <p className="text-white">{ticket.venue}</p>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <p className="text-gray-400 text-sm">Seat</p>
                    <p className="text-white">{ticket.seatInfo}</p>
                  </div>
                  
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-gray-400 text-xs">Purchase Date</p>
                      <p className="text-gray-300 text-sm">{formatDate(ticket.purchaseDate)}</p>
                    </div>
                    <div>
                      <span className="bg-green-500/20 text-green-400 text-xs font-medium px-2.5 py-0.5 rounded-full border border-green-500/30">
                        {ticket.status}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 flex justify-end items-center border-t border-gray-700 bg-black/30">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-pink-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-pink-700 transition"
                  >
                    View Details
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
