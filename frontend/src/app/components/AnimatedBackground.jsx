"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function AnimatedBackground({ type = "default" }) {
  const [particles, setParticles] = useState([]);
  
  useEffect(() => {
    // Generate random particles
    const generateParticles = () => {
      const count = window.innerWidth < 768 ? 15 : 25;
      const newParticles = [];
      
      for (let i = 0; i < count; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * 100, // random position across screen width (%)
          y: Math.random() * 100, // random position across screen height (%)
          size: Math.random() * 30 + 15, // random size between 15-45px
          duration: Math.random() * 15 + 20, // animation duration between 20-35s
          delay: Math.random() * 10,
          opacity: Math.random() * 0.07 + 0.03, // opacity between 0.03-0.1
          type: Math.random() > 0.5 ? "circle" : "square",
          color: getRandomColor(type)
        });
      }
      
      setParticles(newParticles);
    };
    
    generateParticles();
    
    // Regenerate on window resize
    const handleResize = () => {
      generateParticles();
    };
    
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [type]);

  // Get color based on page type
  function getRandomColor(type) {
    const colors = {
      default: ["from-pink-500 to-purple-600", "from-blue-500 to-indigo-600", "from-purple-500 to-indigo-500"],
      events: ["from-pink-500 to-red-600", "from-purple-500 to-pink-600", "from-indigo-500 to-purple-500"],
      discover: ["from-green-500 to-teal-600", "from-blue-500 to-teal-500", "from-pink-500 to-purple-600"]
    };

    const colorsArray = colors[type] || colors.default;
    return colorsArray[Math.floor(Math.random() * colorsArray.length)];
  }

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className={`absolute ${particle.type === 'circle' ? 'rounded-full' : 'rounded-xl'} bg-gradient-to-br ${particle.color}`}
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            opacity: particle.opacity,
            filter: "blur(8px)"
          }}
          animate={{
            x: ["0%", `${Math.random() * 20 - 10}%`, "0%"],
            y: ["0%", `${Math.random() * 20 - 10}%`, "0%"],
            opacity: [particle.opacity, particle.opacity * 1.5, particle.opacity],
            scale: [1, Math.random() * 0.3 + 0.9, 1]
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: particle.delay
          }}
        />
      ))}
    </div>
  );
}