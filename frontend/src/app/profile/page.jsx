"use client";

import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

export default function Profile() {
  const { user, loading, logout, authFetch } = useAuth();
  const router = useRouter();
  const [profile, setProfile] = useState(null);
  const [displayName, setDisplayName] = useState("");
  const [saving, setSaving] = useState(false);
  const [bookingCount, setBookingCount] = useState(0);

  useEffect(() => {
    if (!loading && !user) router.push("/login");
    if (user) fetchProfile();
  }, [user, loading]);

  const fetchProfile = async () => {
    try {
      const res = await authFetch("/auth/profile");
      const data = await res.json();
      if (data.success) {
        setProfile(data.user);
        setDisplayName(data.user.displayName || "");
      }
      const bookRes = await authFetch("/bookings");
      const bookData = await bookRes.json();
      if (bookData.success) setBookingCount(bookData.bookings.filter(b => b.status === "confirmed").length);
    } catch (err) {
      console.warn("Failed to fetch profile:", err.message);
      if (user) setDisplayName(user.displayName || "");
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await authFetch("/auth/profile", {
        method: "PUT",
        body: JSON.stringify({ displayName }),
      });
      const data = await res.json();
      if (data.success) {
        setProfile(data.user);
        toast.success("Profile updated!");
      }
    } catch (err) {
      toast.error("Failed to save");
    } finally {
      setSaving(false);
    }
  };

  const getAccountType = () => {
    if (!user?.providerData?.length) return "Email & Password";
    return user.providerData[0]?.providerId === "google.com" ? "Google Account" : "Email & Password";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-gray-700 border-t-pink-500 rounded-full animate-spin" />
      </div>
    );
  }

  const avatarLetter = ((user?.displayName || user?.email || "U").charAt(0)).toUpperCase();

  return (
    <main className="pt-[calc(3rem+1px)] min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
      <div className="max-w-4xl mx-auto py-12 px-4">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold mb-8 bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent"
        >
          Your Profile
        </motion.h1>

        {/* Avatar + info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 mb-6"
        >
          <div className="flex items-center gap-5 mb-6">
            <div className="w-20 h-20 rounded-full overflow-hidden bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center flex-shrink-0">
              {user?.photoURL ? (
                <img src={user.photoURL} alt="avatar" className="w-full h-full object-cover" />
              ) : (
                <span className="text-3xl font-bold text-white">{avatarLetter}</span>
              )}
            </div>
            <div>
              <h2 className="text-xl font-semibold">{user?.displayName || "User"}</h2>
              <p className="text-gray-400 text-sm">{user?.email}</p>
              <span className="mt-1 inline-block text-xs px-2 py-0.5 bg-pink-500/20 text-pink-400 border border-pink-500/30 rounded-full">
                {getAccountType()}
              </span>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-white/5 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold text-pink-400">{bookingCount}</p>
              <p className="text-gray-400 text-sm">Active Tickets</p>
            </div>
            <div className="bg-white/5 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold text-purple-400">{profile?.savedEvents?.length || 0}</p>
              <p className="text-gray-400 text-sm">Saved Events</p>
            </div>
          </div>

          {/* Edit display name */}
          <div>
            <label className="block text-sm text-gray-400 mb-1">Display Name</label>
            <div className="flex gap-3">
              <input
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-pink-500 transition"
                placeholder="Your name"
              />
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSave}
                disabled={saving}
                className="px-5 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg text-sm font-medium disabled:opacity-60"
              >
                {saving ? "Saving..." : "Save"}
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Quick links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 gap-4 mb-6"
        >
          <Link
            href="/my-tickets"
            className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl p-4 text-center transition"
          >
            <p className="text-2xl mb-1">🎟️</p>
            <p className="text-white font-medium">My Tickets</p>
          </Link>
          <Link
            href="/events"
            className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl p-4 text-center transition"
          >
            <p className="text-2xl mb-1">🎭</p>
            <p className="text-white font-medium">Browse Events</p>
          </Link>
        </motion.div>

        {/* Actions */}
        <div className="flex gap-4">
          <button
            onClick={() => router.push("/")}
            className="px-5 py-2 border border-white/20 text-gray-300 rounded-lg hover:bg-white/5 transition text-sm"
          >
            Back to Home
          </button>
          <button
            onClick={async () => { await logout(); router.push("/"); }}
            className="px-5 py-2 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-lg hover:opacity-90 transition text-sm"
          >
            Sign Out
          </button>
        </div>
      </div>
    </main>
  );
}
