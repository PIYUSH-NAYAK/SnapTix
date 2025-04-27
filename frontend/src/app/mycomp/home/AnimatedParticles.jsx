"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function AnimatedParticles() {
  const [particles, setParticles] = useState([]);
  
  useEffect(() => {
    // Create particles with random properties only on client side
    const generatedParticles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      size: Math.random() * 4 + 1,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: Math.random() * 20 + 10
    }));
    
    setParticles(generatedParticles);
  }, []);

  if (particles.length === 0) {
    return null;
  }

  return (
    <div className="absolute inset-0 overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-white"
          style={{
            width: particle.size,
            height: particle.size,
            top: `${particle.y}%`,
            left: `${particle.x}%`,
            opacity: particle.size > 3 ? 0.2 : 0.1
          }}
          animate={{
            y: [`${particle.y}%`, `${(particle.y + 30) % 100}%`],
            x: [`${particle.x}%`, `${(particle.x + 20) % 100}%`],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
}