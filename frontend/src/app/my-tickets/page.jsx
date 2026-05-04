"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../../context/AuthContext";
import Link from "next/link";
import Image from "next/image";
import toast from "react-hot-toast";

export default function MyTickets() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, authFetch } = useAuth();

  useEffect(() => {
    if (!user) { setLoading(false); return; }
    fetchBookings();
  }, [user]);

  const fetchBookings = async () => {
    try {
      const res = await authFetch("/bookings");
      const data = await res.json();
      if (data.success) {
        setBookings(data.bookings);
      } else {
        toast.error("Failed to load tickets");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to load tickets");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Date TBA";
    try {
      return new Date(dateString).toLocaleDateString(undefined, {
        year: "numeric", month: "long", day: "numeric",
      });
    } catch { return dateString; }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black pt-[calc(3rem+1px)] flex justify-center items-center">
        <div className="w-16 h-16 border-4 border-gray-700 border-t-pink-500 rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-black pt-[calc(3rem+1px)] flex flex-col justify-center items-center p-4">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center max-w-md mx-auto">
          <h1 className="text-3xl font-bold text-white mb-4">Access Required</h1>
          <p className="text-gray-400 mb-6">Please log in to view your tickets.</p>
          <Link href="/login" className="px-5 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg">
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

        {bookings.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 text-center"
          >
            <div className="text-6xl mb-4">🎟️</div>
            <h2 className="text-xl text-white font-medium mb-4">No tickets yet</h2>
            <p className="text-gray-400 mb-6">You haven't purchased any tickets yet.</p>
            <Link href="/events" className="px-5 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg">
              Browse Events
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {bookings.map((booking, index) => (
              <motion.div
                key={booking._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700"
              >
                {/* Image */}
                <div className="relative h-44 overflow-hidden bg-gray-800">
                  {booking.eventImage ? (
                    <Image
                      src={booking.eventImage}
                      alt={booking.eventTitle || "Event"}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-4xl">🎫</div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
                  <div className="absolute bottom-0 left-0 w-full p-4">
                    <h3 className="text-xl font-bold text-white">{booking.eventTitle || "Event"}</h3>
                  </div>
                  <div className="absolute top-3 right-3">
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full border ${
                      booking.status === "confirmed"
                        ? "bg-green-500/20 text-green-400 border-green-500/30"
                        : "bg-red-500/20 text-red-400 border-red-500/30"
                    }`}>
                      {booking.status}
                    </span>
                  </div>
                </div>

                {/* Details */}
                <div className="p-4 space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <p className="text-gray-400 text-xs">Date</p>
                      <p className="text-white text-sm">{formatDate(booking.eventDate)}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-xs">Venue</p>
                      <p className="text-white text-sm truncate">{booking.eventLocation || "TBA"}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-xs">Seat</p>
                      <p className="text-white text-sm">{booking.seatInfo || "General"}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-xs">Price</p>
                      <p className="text-pink-400 text-sm font-medium">{booking.price || "—"}</p>
                    </div>
                  </div>

                  {booking.txHash && (
                    <div>
                      <p className="text-gray-400 text-xs">Tx Hash</p>
                      <a
                        href={`https://sepolia.basescan.org/tx/${booking.txHash}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-purple-400 text-xs hover:text-purple-300 truncate block"
                      >
                        {booking.txHash.slice(0, 20)}...
                      </a>
                    </div>
                  )}

                  <p className="text-gray-500 text-xs">
                    Booked on {formatDate(booking.createdAt)}
                  </p>
                </div>

                {/* Actions */}
                <div className="px-4 pb-4">
                  <Link
                    href={`/events/${booking.eventId}`}
                    className="block text-center py-2 border border-gray-600 text-gray-300 rounded-lg text-sm hover:border-pink-500 hover:text-pink-400 transition"
                  >
                    View Event
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
