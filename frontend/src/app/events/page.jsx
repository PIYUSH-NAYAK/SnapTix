"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { fetchAllEvents, searchEvents } from '../services/chatApi';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

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
  
  // Animation refs
  const [headerRef, headerInView] = useInView({ threshold: 0.2, triggerOnce: true });
  const [filterRef, filterInView] = useInView({ threshold: 0.2, triggerOnce: true });
  const [eventsGridRef, eventsGridInView] = useInView({ threshold: 0.1, triggerOnce: true });

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
    <main className="min-h-screen bg-black text-white pt-[calc(3rem+1px)]">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: -20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.7 }}
        >
          <h1 className="text-4xl font-bold mb-8">Explore Events</h1>
        </motion.div>

        {/* Search and filter bar */}
        <motion.div
          ref={filterRef}
          initial={{ opacity: 0, y: 30 }}
          animate={filterInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="bg-gray-800/70 backdrop-blur-sm p-4 rounded-xl mb-8 shadow-lg"
        >
          <div className="flex flex-col md:flex-row gap-4">
            <motion.div 
              className="flex-1"
              initial={{ opacity: 0, x: -20 }}
              animate={filterInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <input
                type="text"
                placeholder="Search events..."
                className="w-full bg-gray-700/80 text-white px-4 py-3 rounded-lg focus:ring-2 focus:ring-pink-500 focus:outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 flex-1">
              <motion.select
                name="type"
                value={filters.type}
                onChange={handleFilterChange}
                className="bg-gray-700/80 text-white px-4 py-3 rounded-lg focus:ring-2 focus:ring-pink-500 focus:outline-none"
                initial={{ opacity: 0, y: 10 }}
                animate={filterInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <option value="">All Types</option>
                {types.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </motion.select>

              <motion.select
                name="location"
                value={filters.location}
                onChange={handleFilterChange}
                className="bg-gray-700/80 text-white px-4 py-3 rounded-lg focus:ring-2 focus:ring-pink-500 focus:outline-none"
                initial={{ opacity: 0, y: 10 }}
                animate={filterInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <option value="">All Locations</option>
                {locations.map(location => (
                  <option key={location} value={location}>{location}</option>
                ))}
              </motion.select>

              <motion.select
                name="genre"
                value={filters.genre}
                onChange={handleFilterChange}
                className="bg-gray-700/80 text-white px-4 py-3 rounded-lg focus:ring-2 focus:ring-pink-500 focus:outline-none"
                initial={{ opacity: 0, y: 10 }}
                animate={filterInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <option value="">All Genres</option>
                {genres.map(genre => (
                  <option key={genre} value={genre}>{genre}</option>
                ))}
              </motion.select>
            </div>

            <motion.button
              onClick={clearFilters}
              className="bg-gray-700/80 hover:bg-gray-600 text-white px-4 py-3 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-pink-500/20 border border-transparent hover:border-pink-500/30"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              initial={{ opacity: 0, x: 20 }}
              animate={filterInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              Clear
            </motion.button>
          </div>
        </motion.div>

        {/* Events grid */}
        <div ref={eventsGridRef}>
          {loading ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="flex justify-center py-16"
            >
              <motion.div
                animate={{ 
                  rotate: 360,
                  borderColor: ['rgba(236, 72, 153, 1)', 'rgba(139, 92, 246, 1)', 'rgba(236, 72, 153, 1)']
                }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                className="rounded-full h-16 w-16 border-4 border-t-transparent"
              />
            </motion.div>
          ) : filteredEvents.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={eventsGridInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.7 }}
              className="text-center py-16"
            >
              <h3 className="text-2xl font-medium mb-4">No events found</h3>
              <p className="text-gray-400">Try adjusting your filters or search term</p>
              <motion.button
                onClick={clearFilters}
                className="mt-6 px-6 py-2 bg-pink-600 hover:bg-pink-700 rounded-lg text-white transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Reset Filters
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={eventsGridInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {filteredEvents.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={eventsGridInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ duration: 0.5, delay: 0.1 + (index % 8) * 0.05 }}
                  whileHover={{ y: -8, transition: { duration: 0.2 } }}
                >
                  <Link href={`/events/${event.id}`} className="group block h-full">
                    <div className="bg-gray-800/70 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg hover:shadow-pink-500/20 transition h-full flex flex-col">
                      <div className="h-48 bg-gray-700 relative overflow-hidden">
                        {event.image ? (
                          <img
                            src={event.image}
                            alt={event.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = `https://source.unsplash.com/random/800x600/?${event.type || 'event'}`;
                            }}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <motion.span 
                              animate={{ 
                                scale: [1, 1.1, 1],
                                opacity: [0.7, 0.9, 0.7]
                              }}
                              transition={{ duration: 2, repeat: Infinity }}
                              className="text-5xl font-bold text-gray-600"
                            >
                              {event.type?.charAt(0).toUpperCase() || 'E'}
                            </motion.span>
                          </div>
                        )}
                        <motion.div
                          initial={{ opacity: 0 }}
                          whileHover={{ opacity: 1 }}
                          className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end justify-center pb-4 transition-opacity"
                        >
                          <motion.span 
                            initial={{ y: 20 }}
                            whileHover={{ y: 0 }}
                            transition={{ type: "spring", stiffness: 300 }}
                            className="text-white font-medium"
                          >
                            View Details
                          </motion.span>
                        </motion.div>
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
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </main>
  );
}