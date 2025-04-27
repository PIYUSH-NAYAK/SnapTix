"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function TestimonialsSection({ 
  testimonialInView, 
  displayedTestimonials, 
  currentTestimonialIndex,
  setCurrentTestimonialIndex,
  refreshTestimonials 
}) {
  if (!displayedTestimonials || displayedTestimonials.length === 0) {
    return null;
  }

  return (
    <section className="py-20 px-4 relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={testimonialInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16 relative z-10"
        >
          <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
            What Our Users Say
          </h2>
          <motion.div
            initial={{ width: 0 }}
            animate={testimonialInView ? { width: "80px" } : { width: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="h-1 bg-gradient-to-r from-pink-500 to-violet-500 mx-auto rounded-full"
          />
          <p className="text-gray-300 mt-4 max-w-2xl mx-auto">
            Join thousands of satisfied users experiencing events through SnapTix
          </p>
        </motion.div>

        <div className="relative">
          {/* Large quote mark */}
          <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 text-gray-800 text-[180px] opacity-20 pointer-events-none z-0">
            "
          </div>
          
          <div className="relative z-10">
            {/* Testimonial Cards */}
            <div className="relative h-[300px]">
              {displayedTestimonials.map((testimonial, idx) => (
                <motion.div
                  key={testimonial.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ 
                    opacity: currentTestimonialIndex === idx ? 1 : 0,
                    scale: currentTestimonialIndex === idx ? 1 : 0.9,
                    x: currentTestimonialIndex === idx ? 0 : (idx < currentTestimonialIndex ? -100 : 100)
                  }}
                  transition={{ duration: 0.5 }}
                  className="absolute top-0 left-0 w-full bg-gray-800/40 backdrop-blur-md p-8 rounded-2xl border border-gray-700/50 text-center"
                >
                  <div className="flex justify-center mb-6">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name}
                      className="w-20 h-20 rounded-full border-2 border-pink-500 object-cover" 
                    />
                  </div>
                  <p className="text-lg text-gray-300 mb-6 italic">"{testimonial.comment}"</p>
                  <h4 className="font-medium text-white mb-1">{testimonial.name}</h4>
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-pink-400">{testimonial.role}</span>
                    <span className="text-gray-500">•</span>
                    <span className="text-gray-400">{testimonial.location}</span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Navigation dots */}
            <div className="flex justify-center mt-8 gap-2">
              {displayedTestimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentTestimonialIndex(idx)}
                  className={`h-3 rounded-full transition-all ${
                    idx === currentTestimonialIndex 
                      ? "w-8 bg-pink-500" 
                      : "w-3 bg-gray-600 hover:bg-gray-500"
                  }`}
                  aria-label={`View testimonial ${idx + 1}`}
                />
              ))}
            </div>

            {/* Refresh button */}
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={refreshTestimonials}
              className="flex items-center gap-2 text-pink-400 hover:text-pink-300 transition-colors mx-auto mt-8 text-sm"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Show more testimonials
            </motion.button>
          </div>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute top-1/3 right-0 w-64 h-64 bg-pink-600/10 rounded-full blur-[100px]"></div>
      <div className="absolute bottom-1/3 left-0 w-64 h-64 bg-purple-600/10 rounded-full blur-[100px]"></div>
    </section>
  );
}