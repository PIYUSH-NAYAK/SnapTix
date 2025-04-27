"use client";
import { motion } from "framer-motion";
import { useState } from "react";

export default function NewsletterSection({ newsletterInView }) {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    
    // Simulating API call
    setTimeout(() => {
      if (email && email.includes("@")) {
        setIsSuccess(true);
        setEmail("");
      } else {
        setError("Please enter a valid email address");
      }
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <section className="py-20 px-4 relative">
      <motion.div 
        className="max-w-4xl mx-auto bg-gradient-to-r from-pink-500/10 to-purple-600/10 backdrop-blur-lg rounded-3xl p-10 border border-white/10 relative overflow-hidden"
        initial={{ opacity: 0, y: 30 }}
        animate={newsletterInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.7 }}
      >
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-pink-500 to-purple-600 opacity-70"></div>
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-pink-500/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-purple-600/20 rounded-full blur-3xl"></div>
        
        {/* Content */}
        <div className="relative z-10">
          <motion.div 
            className="text-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={newsletterInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-3xl font-bold mb-4 text-white">
              Stay Updated on Events
            </h2>
            <p className="text-gray-300 max-w-lg mx-auto">
              Subscribe to our newsletter and be the first to know about upcoming events, exclusive offers, and early access tickets.
            </p>
          </motion.div>
          
          {!isSuccess ? (
            <motion.form 
              onSubmit={handleSubmit}
              className="max-w-md mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={newsletterInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="flex-1 bg-white/10 border border-white/20 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent text-white"
                  required
                />
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className={`px-6 py-3 bg-pink-600 hover:bg-pink-700 text-white font-medium rounded-lg transition-colors shadow-lg ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                  whileHover={!isSubmitting ? { scale: 1.03 } : {}}
                  whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                >
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Subscribing...
                    </span>
                  ) : "Subscribe"}
                </motion.button>
              </div>
              
              {error && (
                <motion.p 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-400 text-sm mt-2"
                >
                  {error}
                </motion.p>
              )}
            </motion.form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-green-500/20 border border-green-500/30 rounded-lg p-4 max-w-md mx-auto text-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-green-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h4 className="text-xl font-medium text-white mb-1">Thank you for subscribing!</h4>
              <p className="text-gray-300">We'll keep you updated with the latest events and offers.</p>
            </motion.div>
          )}
          
          <motion.p 
            className="text-gray-400 text-xs text-center mt-6"
            initial={{ opacity: 0 }}
            animate={newsletterInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            By subscribing, you agree to our <a href="/privacy" className="text-pink-400 hover:text-pink-300 underline">Privacy Policy</a>. 
            We respect your privacy and will never share your information.
          </motion.p>
        </div>
      </motion.div>
    </section>
  );
}