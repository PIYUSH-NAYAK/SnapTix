"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function FeaturedEvents({ featuredInView, loading, featuredEvents }) {
  if (loading || featuredEvents.length === 0) {
    return null;
  }

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={featuredInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
            Featured Events
          </h2>
          <motion.div
            initial={{ width: 0 }}
            animate={featuredInView ? { width: "80px" } : { width: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="h-1 bg-gradient-to-r from-pink-500 to-violet-500 mx-auto rounded-full"
          />
          <p className="text-gray-300 mt-4 max-w-2xl mx-auto">
            Discover the hottest upcoming events handpicked just for you
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredEvents.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 30 }}
              animate={featuredInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className="bg-gray-800/40 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700/50 hover:border-pink-500/30 transition-all duration-300 shadow-lg"
            >
              <Link href={`/events/${event.id}`} className="block">
                <div className="h-48 bg-gray-700 relative overflow-hidden">
                  <img
                    src={event.image || `https://source.unsplash.com/random/800x600/?${event.type || 'event'}`}
                    alt={event.title}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 hover:opacity-100 transition-opacity flex items-end p-4">
                    <span className="inline-block bg-pink-600 text-white text-xs px-2 py-1 rounded">
                      {event.type}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-semibold text-white mb-1 line-clamp-1">
                    {event.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-3 line-clamp-1">
                    {event.artist && `By ${event.artist}`}
                  </p>
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-gray-400">
                      {event.date}
                    </div>
                    <div className="text-pink-500 font-medium">
                      {event.price}
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={featuredInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-12 text-center"
        >
          <Link
            href="/events"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500/20 to-purple-600/20 hover:from-pink-500/30 hover:to-purple-600/30 text-pink-400 px-6 py-3 rounded-lg font-medium border border-pink-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-pink-500/10"
          >
            View All Events
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}