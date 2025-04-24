"use client";
import { useState, useEffect } from 'react';
import { useWeb3 } from '../context/Web3Context';
import { getUserTickets } from '../services/contractService';
import Link from 'next/link';

export default function MyTicketsPage() {
  const { account, loading: web3Loading, error: web3Error, connect } = useWeb3();
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadTickets = async () => {
      if (!account) return;
      
      try {
        setLoading(true);
        const userTickets = await getUserTickets();
        setTickets(userTickets);
      } catch (err) {
        setError('Failed to load tickets: ' + err.message);
      } finally {
        setLoading(false);
      }
    };

    if (account) {
      loadTickets();
    }
  }, [account]);

  if (web3Loading) {
    return (
      <main className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 to-black text-white p-4">
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"></div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 to-black text-white">
      <header className="bg-black/30 backdrop-blur-sm py-6 px-4 md:px-8">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold text-pink-500">
            <Link href="/">SnapTix</Link>
          </h1>
          <nav className="space-x-6">
            <Link href="/events" className="text-white hover:text-pink-400 transition">
              Events
            </Link>
            <Link href="/my-tickets" className="text-white hover:text-pink-400 transition">
              My Tickets
            </Link>
            <Link href="/ai-assistant" className="bg-pink-600 hover:bg-pink-700 px-4 py-2 rounded-lg transition">
              AI Assistant
            </Link>
          </nav>
        </div>
      </header>

      <div className="flex-1 p-4 md:p-8 max-w-7xl mx-auto w-full">
        <h2 className="text-3xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
          My Tickets
        </h2>

        {!account ? (
          <div className="bg-gray-800 rounded-lg p-6 text-center">
            <p className="mb-4">Connect your wallet to view your tickets</p>
            <button 
              onClick={connect}
              className="bg-pink-600 hover:bg-pink-700 px-6 py-3 rounded-lg transition"
            >
              Connect Wallet
            </button>
          </div>
        ) : loading ? (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"></div>
          </div>
        ) : error ? (
          <div className="bg-red-900/30 border border-red-500 rounded-lg p-4">
            {error}
          </div>
        ) : tickets.length === 0 ? (
          <div className="bg-gray-800 rounded-lg p-6 text-center">
            <p>You don't have any tickets yet.</p>
            <Link href="/events" className="inline-block mt-4 bg-pink-600 hover:bg-pink-700 px-6 py-3 rounded-lg transition">
              Browse Events
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tickets.map((ticket) => (
              <div key={ticket.tokenId} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-pink-500/20 transition">
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{ticket.eventDetails.title}</h3>
                  <p className="text-gray-300 mb-2">{ticket.eventDetails.location}</p>
                  <p className="text-gray-300 mb-4">{ticket.eventDetails.date}</p>
                  <div className="bg-gray-700 p-3 rounded-md">
                    <p className="text-sm font-mono">Token ID: #{ticket.tokenId}</p>
                    <p className="text-sm font-mono">Event ID: #{ticket.eventId}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}