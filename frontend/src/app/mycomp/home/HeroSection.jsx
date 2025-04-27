"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function HeroSection({ heroInView, user }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Track mouse movement for parallax effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX / window.innerWidth - 0.5,
        y: e.clientY / window.innerHeight - 0.5,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Floating ticket backgrounds
  const tickets = [
    { color: "from-pink-500/30 to-purple-600/30", delay: 0, size: "w-64 h-72" },
    {
      color: "from-blue-500/20 to-indigo-500/20",
      delay: 0.3,
      size: "w-56 h-64",
    },
    {
      color: "from-red-500/20 to-orange-500/20",
      delay: 0.7,
      size: "w-60 h-80",
    },
    {
      color: "from-green-500/20 to-teal-500/20",
      delay: 1.1,
      size: "w-52 h-68",
    },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center py-20 px-4 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {tickets.map((ticket, index) => (
          <motion.div
            key={index}
            className={`absolute bg-gradient-to-br ${ticket.color} rounded-2xl backdrop-blur-3xl border border-white/10 shadow-lg ${ticket.size}`}
            style={{
              left: `${20 + index * 25}%`,
              top: `${index % 2 === 0 ? 15 : 35}%`,
              zIndex: 0,
              filter: "blur(2px)",
            }}
            initial={{ opacity: 0, y: 100 }}
            animate={
              heroInView
                ? {
                    opacity: 0.7,
                    y: 0,
                    x: mousePosition.x * -20,
                    rotate: index % 2 === 0 ? -5 : 5,
                  }
                : { opacity: 0, y: 100 }
            }
            transition={{
              duration: 1.5,
              delay: ticket.delay,
              ease: "easeOut",
            }}
          />
        ))}

        {/* Animated gradient circles */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-gradient-to-r from-purple-600/20 to-pink-500/20 blur-3xl"
          animate={{
            x: mousePosition.x * -30,
            y: mousePosition.y * -30,
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />

        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-gradient-to-r from-blue-500/10 to-indigo-600/10 blur-3xl"
          animate={{
            x: mousePosition.x * -20,
            y: mousePosition.y * -20,
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            repeatType: "reverse",
            delay: 0.5,
          }}
        />
      </div>

      {/* Content with better spacing and animated elements */}
      <div className="container relative z-10 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={
              heroInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }
            }
            transition={{ duration: 0.5 }}
            className="mb-3"
          >
            <span className="px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm text-sm font-medium text-pink-300 border border-pink-500/30">
              Next Generation Ticketing
            </span>
          </motion.div>

          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-br from-pink-500 via-purple-500 to-violet-500"
            initial={{ opacity: 0, y: 50 }}
            animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Discover Events, <br />
            <span className="text-white relative">
              Live Extraordinary
              <motion.span
                className="absolute -bottom-3 left-0 right-0 h-1 bg-gradient-to-r from-pink-500 to-violet-500 rounded-full mx-auto"
                initial={{ width: "0%" }}
                animate={heroInView ? { width: "40%" } : { width: "0%" }}
                transition={{ duration: 1, delay: 0.8 }}
                style={{ maxWidth: "280px" }}
              />
            </span>
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            SnapTix connects you with amazing events across India. Find, book,
            and experience the best concerts, sports, and cultural events with
            NFT-secured tickets.
          </motion.p>

          {/* Features highlight */}
          <motion.div
            className="flex flex-wrap justify-center gap-8 mb-10"
            initial={{ opacity: 0 }}
            animate={heroInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
          >
            {[
              { icon: "🎵", text: "Live Concerts" },
              { icon: "🏆", text: "Sports Events" },
              { icon: "🎭", text: "Theatre & Arts" },
              { icon: "🌐", text: "NFT Secured" },
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ y: 20, opacity: 0 }}
                animate={
                  heroInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }
                }
                transition={{ duration: 0.5, delay: 0.7 + i * 0.1 }}
                className="flex items-center gap-2"
              >
                <span className="text-2xl">{feature.icon}</span>
                <span className="text-gray-300">{feature.text}</span>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.7, delay: 0.9 }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/events"
                className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-8 py-3 rounded-lg text-lg font-medium transition shadow-lg hover:shadow-pink-500/30 flex items-center justify-center gap-2"
              >
                Explore Events
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/ai-assistant"
                className="bg-gray-800 hover:bg-gray-700 text-white px-8 py-3 rounded-lg text-lg font-medium transition border border-gray-700 hover:border-pink-500 flex items-center justify-center gap-2"
              >
                <span>AI Assistant</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
                  <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
                </svg>
              </Link>
            </motion.div>
          </motion.div>

          {/* Stats counter */}
          {/* Stats counter */}
          <motion.div
            className="grid grid-cols-3 gap-4 mt-14 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 40 }}
            animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.7, delay: 1 }}
          >
            {[
              { value: "100+", label: "Events" },
              // { value: "50K+", label: "Tickets Sold" },
              { value: "20+", label: "Cities" },
              { value: "99%", label: "Happy Customers" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={
                  heroInView
                    ? { scale: 1, opacity: 1 }
                    : { scale: 0.9, opacity: 0 }
                }
                transition={{ duration: 0.5, delay: 1.1 + i * 0.1 }}
                className="bg-white/5 backdrop-blur-lg p-4 rounded-xl border border-white/10"
              >
                <p className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-400">
                  {stat.value}
                </p>
                <p className="text-gray-400 text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
          {/* <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-14 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 40 }}
            animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.7, delay: 1 }}
          >
            {[
              { value: "100+", label: "Events" },
              // { value: "50K+", label: "Tickets Sold" },
              { value: "20+", label: "Cities" },
              { value: "99%", label: "Happy Customers" }
            ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={heroInView ? { scale: 1, opacity: 1 } : { scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.5, delay: 1.1 + (i * 0.1) }}
                className="bg-white/5 backdrop-blur-lg p-4 rounded-xl border border-white/10"
              >
                <p className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-400">{stat.value}</p>
                <p className="text-gray-400 text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div> */}
        </div>
      </div>

      {/* Bottom scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: -10 }}
        animate={
          heroInView
            ? {
                opacity: [0, 1, 0],
                y: [0, 10, 20],
              }
            : { opacity: 0 }
        }
        transition={{
          duration: 1.5,
          repeat: Infinity,
          repeatDelay: 0.5,
        }}
      >
        <svg
          className="w-6 h-6 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </motion.div>
    </section>
  );
}
