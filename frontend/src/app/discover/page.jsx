"use client";
import { useState, useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import { fetchAllEvents } from "../services/chatApi";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function DiscoverPage() {
  // 1. All useState hooks must be at the top
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [sortedEventsByCategory, setSortedEventsByCategory] = useState({});
  
  // Store initial load state
  const initialLoadRef = useRef(true);
  
  // 2. Create a single ref for the header
  const [headerRef, headerInView] = useInView({ threshold: 0.2, triggerOnce: true });
  
  // 3. Create refs for categories - maximum of 10 categories to avoid excessive hooks
  // All hooks need to be called unconditionally at the top level
  const [cat0Ref, cat0InView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [cat1Ref, cat1InView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [cat2Ref, cat2InView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [cat3Ref, cat3InView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [cat4Ref, cat4InView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [cat5Ref, cat5InView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [cat6Ref, cat6InView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [cat7Ref, cat7InView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [cat8Ref, cat8InView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [cat9Ref, cat9InView] = useInView({ threshold: 0.1, triggerOnce: true });
  
  // 4. Load events effect
  useEffect(() => {
    const loadEvents = async () => {
      const result = await fetchAllEvents();
      if (result.success) {
        setEvents(result.data);

        // Limit to 10 categories to match our refs
        const types = [...new Set(result.data.map((event) => event.type))].slice(0, 10);
        setCategories(types);
        
        // Pre-sort events by category and save them
        const sortedEvents = {};
        types.forEach(category => {
          sortedEvents[category] = result.data
            .filter((event) => event.type === category)
            .sort(() => 0.5 - Math.random())
            .slice(0, 4);
        });
        
        setSortedEventsByCategory(sortedEvents);
      }
      setLoading(false);
      initialLoadRef.current = false;
    };

    loadEvents();
  }, []);

  // Map categories to their corresponding refs
  const categoryInViewRefs = useMemo(() => {
    const refsArray = [
      { ref: cat0Ref, inView: cat0InView },
      { ref: cat1Ref, inView: cat1InView },
      { ref: cat2Ref, inView: cat2InView },
      { ref: cat3Ref, inView: cat3InView },
      { ref: cat4Ref, inView: cat4InView },
      { ref: cat5Ref, inView: cat5InView },
      { ref: cat6Ref, inView: cat6InView },
      { ref: cat7Ref, inView: cat7InView },
      { ref: cat8Ref, inView: cat8InView },
      { ref: cat9Ref, inView: cat9InView },
    ];

    const refs = {};
    categories.forEach((category, index) => {
      // Safely map categories to pre-created refs
      if (index < 10) {
        refs[category] = refsArray[index];
      }
    });
    
    return refs;
  }, [
    categories,
    cat0Ref, cat0InView,
    cat1Ref, cat1InView,
    cat2Ref, cat2InView,
    cat3Ref, cat3InView,
    cat4Ref, cat4InView,
    cat5Ref, cat5InView,
    cat6Ref, cat6InView,
    cat7Ref, cat7InView,
    cat8Ref, cat8InView,
    cat9Ref, cat9InView,
  ]);

  // Get events by category from pre-sorted array instead of sorting on each render
  const getEventsByCategory = (category) => {
    return sortedEventsByCategory[category] || [];
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1, rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop", ease: "linear" }}
          className="h-16 w-16 border-4 border-pink-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <main className="pt-[calc(3rem+1px)] min-h-screen bg-black text-white">
      <motion.div 
        ref={headerRef}
        initial={{ opacity: 0, y: -20 }}
        animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
        transition={{ duration: 0.7 }}
        className="max-w-7xl mx-auto px-4 py-8"
      >
        <motion.h1 
          initial={{ opacity: 0 }}
          animate={headerInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-4xl font-bold mb-2"
        >
          Discover Events
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={headerInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="text-gray-400 mb-12"
        >
          Explore curated collections of events based on your interests
        </motion.p>

        {categories.map((category, categoryIndex) => (
          <motion.section 
            key={category}
            ref={categoryInViewRefs[category]?.ref} 
            initial={{ opacity: 0, y: 50 }}
            animate={categoryInViewRefs[category]?.inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mb-16"
          >
            <div className="flex justify-between items-center mb-6">
              <motion.h2 
                initial={{ opacity: 0, x: -20 }}
                animate={categoryInViewRefs[category]?.inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-2xl font-semibold capitalize"
              >
                {category}s
              </motion.h2>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={categoryInViewRefs[category]?.inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                whileHover={{ x: 5 }}
              >
                <Link
                  href={`/events?type=${category}`}
                  className="text-pink-400 hover:text-pink-300 flex items-center"
                >
                  View all
                  <svg
                    className="h-5 w-5 ml-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
              </motion.div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {getEventsByCategory(category).map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={categoryInViewRefs[category]?.inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  whileHover={{ y: -8, transition: { duration: 0.2 } }}
                >
                  <Link
                    href={`/events/${event.id}`}
                    className="group block h-full"
                  >
                    <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-pink-500/20 transition h-full">
                      <div className="h-48 bg-gray-700 relative">
                        <img
                          src={event.image || `https://source.unsplash.com/random/800x600/?${event.type || 'event'}`}
                          alt={event.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-4">
                          <motion.span 
                            initial={{ y: 20, opacity: 0 }}
                            whileHover={{ y: 0, opacity: 1 }}
                            transition={{ type: "spring", stiffness: 300 }}
                            className="text-white font-medium"
                          >
                            View Details
                          </motion.span>
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="text-lg font-semibold group-hover:text-pink-400 transition">
                          {event.title}
                        </h3>
                        <div className="flex items-center justify-between mt-2 text-gray-400 text-sm">
                          <span>{event.date}</span>
                          <span>{event.location}</span>
                        </div>
                        {event.price && (
                          <p className="mt-2 text-pink-500 font-medium">{event.price}</p>
                        )}
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.section>
        ))}
      </motion.div>
    </main>
  );
}
