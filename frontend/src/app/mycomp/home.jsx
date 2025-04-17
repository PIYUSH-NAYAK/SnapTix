"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { fetchAllEvents } from "../services/chatApi";

export default function Home() {
  const [featuredEvents, setFeaturedEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadEvents = async () => {
      const result = await fetchAllEvents();
      if (result.success) {
        // Get 4 random events to feature
        const randomEvents = result.data
          .sort(() => 0.5 - Math.random())
          .slice(0, 4);
        setFeaturedEvents(randomEvents);
      }
      setLoading(false);
    };

    loadEvents();
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white flex flex-col">
      <header className="w-full py-6 px-4 md:px-8 flex justify-between items-center bg-black/30 backdrop-blur-sm">
        <h1 className="text-3xl font-bold text-pink-500">SnapTix</h1>
        <nav className="space-x-6">
          <Link
            href="/events"
            className="text-white hover:text-pink-400 transition"
          >
            Events
          </Link>
          <Link
            href="/discover"
            className="text-white hover:text-pink-400 transition"
          >
            Discover
          </Link>
          <Link
            href="/ai-assistant"
            className="bg-pink-600 hover:bg-pink-700 px-4 py-2 rounded-lg transition"
          >
            AI Assistant
          </Link>
        </nav>
      </header>

      <section className="text-center mt-16 px-4 max-w-5xl mx-auto">
        <h2 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
          Discover Amazing Events
        </h2>
        <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto">
          Find and book tickets for concerts, festivals, sports, and more with
          our AI-powered event discovery platform.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/events"
            className="bg-pink-600 hover:bg-pink-700 text-white px-8 py-3 rounded-xl text-lg font-medium transition"
          >
            Browse Events
          </Link>
          <Link
            href="/ai-assistant"
            className="bg-transparent border-2 border-pink-500 hover:bg-pink-500/20 text-white px-8 py-3 rounded-xl text-lg font-medium transition"
          >
            Ask AI
          </Link>
        </div>
      </section>

      <section className="mt-24 px-4 max-w-6xl mx-auto w-full">
        <h3 className="text-2xl font-semibold mb-8 text-center">
          Featured Events
        </h3>

        {loading ? (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredEvents.map((event) => (
              <Link
                href={`/events/${event.id}`}
                key={event.id}
                className="group"
              >
                
                <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-pink-500/20 transition">
                  <div className="h-48 bg-gray-700 relative">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-4">
                      <span className="text-white font-medium">
                        View Details
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="text-xs font-medium text-pink-400">
                      {event.type}
                    </p>
                    <h4 className="text-lg font-semibold mt-1 group-hover:text-pink-400 transition">
                      {event.title}
                    </h4>
                    <div className="flex items-center mt-2 text-gray-400 text-sm">
                      <span className="mr-3">{event.date}</span>
                      <span>{event.location}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        <div className="text-center mt-12">
          <Link
            href="/events"
            className="text-pink-400 hover:text-pink-300 inline-flex items-center"
          >
            View all events
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 ml-1"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
        </div>
      </section>

      <footer className="mt-auto py-8 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} SnapTix. All rights reserved.
      </footer>
    </main>
  );
}
