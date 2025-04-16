"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { fetchAllEvents } from '../services/chatApi';

export default function DiscoverPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const loadEvents = async () => {
      const result = await fetchAllEvents();
      if (result.success) {
        setEvents(result.data);

        const types = [...new Set(result.data.map(event => event.type))];
        setCategories(types);
      }
      setLoading(false);
    };

    loadEvents();
  }, []);

  const getEventsByCategory = (category) => {
    return events
      .filter(event => event.type === category)
      .sort(() => 0.5 - Math.random())
      .slice(0, 4);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"></div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-900 text-white">
      <header className="bg-black/30 backdrop-blur-sm py-6 px-4 md:px-8">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/" className="text-3xl font-bold text-pink-500">SnapTix</Link>
          <nav className="space-x-6">
            <Link href="/events" className="text-white hover:text-pink-400 transition">Events</Link>
            <Link href="/discover" className="text-pink-400">Discover</Link>
            <Link href="/ai-assistant" className="bg-pink-600 hover:bg-pink-700 px-4 py-2 rounded-lg transition">
              AI Assistant
            </Link>
          </nav>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-2">Discover Events</h1>
        <p className="text-gray-400 mb-12">Explore curated collections of events based on your interests</p>

        {categories.map((category) => (
          <section key={category} className="mb-16">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold capitalize">{category}s</h2>
              <Link href={`/events?type=${category}`} className="text-pink-400 hover:text-pink-300 flex items-center">
                View all
                <svg className="h-5 w-5 ml-1" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {getEventsByCategory(category).map((event) => (
                <Link href={`/events/${event.id}`} key={event.id} className="group">
                  <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-pink-500/20 transition">
                    <div className="h-48 bg-gray-700 relative">
                      {/* Optional: Add image here */}
                      {/* <img src={event.imageUrl} alt={event.title} className="w-full h-full object-cover" /> */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-4">
                        <span className="text-white font-medium">View Details</span>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-semibold group-hover:text-pink-400 transition">{event.title}</h3>
                      <div className="flex items-center justify-between mt-2 text-gray-400 text-sm">
                        <span>{event.date}</span>
                        <span>{event.location}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
