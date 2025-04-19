"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { fetchAllEvents, searchEvents } from '../services/chatApi';

export default function EventsPage() {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    type: '',
    location: '',
    genre: ''
  });

  const [locations, setLocations] = useState([]);
  const [types, setTypes] = useState([]);
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const loadEvents = async () => {
      const result = await fetchAllEvents();
      if (result.success) {
        setEvents(result.data);
        setFilteredEvents(result.data);

        const locationSet = new Set(result.data.map(event => event.location));
        const typeSet = new Set(result.data.map(event => event.type));
        const genreSet = new Set(result.data.filter(event => event.genre).map(event => event.genre));

        setLocations(Array.from(locationSet).sort());
        setTypes(Array.from(typeSet).sort());
        setGenres(Array.from(genreSet).sort());
      }
      setLoading(false);
    };

    loadEvents();
  }, []);

  useEffect(() => {
    const applyFilters = async () => {
      setLoading(true);

      if (filters.type || filters.location || filters.genre || searchTerm) {
        const searchParams = {
          ...filters,
          title: searchTerm
        };

        const result = await searchEvents(searchParams);
        if (result.success) {
          setFilteredEvents(result.data);
        }
      } else {
        setFilteredEvents(events);
      }

      setLoading(false);
    };

    applyFilters();
  }, [filters, searchTerm, events]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      type: '',
      location: '',
      genre: ''
    });
    setSearchTerm('');
  };

  return (
    <main className="min-h-screen bg-gray-900 text-white">
      {/* <header className="bg-black/30 backdrop-blur-sm py-6 px-4 md:px-8">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/" className="text-3xl font-bold text-pink-500">SnapTix</Link>
          <nav className="space-x-6">
            <Link href="/events" className="text-pink-400">Events</Link>
            <Link href="/discover" className="text-white hover:text-pink-400 transition">Discover</Link>
            <Link href="/ai-assistant" className="bg-pink-600 hover:bg-pink-700 px-4 py-2 rounded-lg transition">
              AI Assistant
            </Link>
          </nav>
        </div>
      </header> */}

      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Explore Events</h1>

        {/* Search and filter bar */}
        <div className="bg-gray-800 p-4 rounded-xl mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search events..."
                className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg focus:ring-2 focus:ring-pink-500 focus:outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 flex-1">
              <select
                name="type"
                value={filters.type}
                onChange={handleFilterChange}
                className="bg-gray-700 text-white px-4 py-2 rounded-lg focus:ring-2 focus:ring-pink-500 focus:outline-none"
              >
                <option value="">All Types</option>
                {types.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>

              <select
                name="location"
                value={filters.location}
                onChange={handleFilterChange}
                className="bg-gray-700 text-white px-4 py-2 rounded-lg focus:ring-2 focus:ring-pink-500 focus:outline-none"
              >
                <option value="">All Locations</option>
                {locations.map(location => (
                  <option key={location} value={location}>{location}</option>
                ))}
              </select>

              <select
                name="genre"
                value={filters.genre}
                onChange={handleFilterChange}
                className="bg-gray-700 text-white px-4 py-2 rounded-lg focus:ring-2 focus:ring-pink-500 focus:outline-none"
              >
                <option value="">All Genres</option>
                {genres.map(genre => (
                  <option key={genre} value={genre}>{genre}</option>
                ))}
              </select>
            </div>

            <button
              onClick={clearFilters}
              className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg"
            >
              Clear
            </button>
          </div>
        </div>

        {/* Events grid */}
        {loading ? (
          <div className="flex justify-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"></div>
          </div>
        ) : filteredEvents.length === 0 ? (
          <div className="text-center py-16">
            <h3 className="text-2xl font-medium mb-4">No events found</h3>
            <p className="text-gray-400">Try adjusting your filters or search term</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredEvents.map(event => (
              <Link href={`/events/${event.id}`} key={event.id} className="group">
                <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-pink-500/20 transition h-full flex flex-col">
                  <div className="h-48 bg-gray-700 relative">
                    {event.image ? (
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = `https://source.unsplash.com/random/800x600/?${event.type || 'event'}`;
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-3xl font-bold text-gray-600">{event.type?.charAt(0).toUpperCase() || 'E'}</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-4">
                      <span className="text-white font-medium">View Details</span>
                    </div>
                  </div>
                  <div className="p-4 flex-1 flex flex-col">
                    <div className="flex-1">
                      <p className="text-xs font-medium text-pink-400 mb-1">{event.type}</p>
                      <h3 className="text-lg font-semibold group-hover:text-pink-400 transition">{event.title}</h3>
                      <p className="text-sm text-gray-400 mt-1">
                        {event.artist && <span className="block">By {event.artist}</span>}
                        {event.genre && <span className="block">Genre: {event.genre}</span>}
                      </p>
                    </div>
                    <div className="mt-3 text-sm text-gray-400">
                      <div className="flex items-center">
                        <svg className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                        </svg>
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center mt-1">
                        <svg className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                        </svg>
                        <span>{event.location}</span>
                      </div>
                      {event.price && (
                        <div className="mt-2 text-pink-500 font-medium">
                          {event.price}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}