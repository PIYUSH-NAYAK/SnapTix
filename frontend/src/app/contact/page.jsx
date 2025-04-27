"use client";
import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    
    try {
      // Simulate API call with timeout
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a production environment, you would send the data to your API
      // await fetch('/api/contact', {
      //   method: 'POST',
      //   body: JSON.stringify(formData),
      //   headers: { 'Content-Type': 'application/json' }
      // });
      
      setSubmitted(true);
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: ""
      });
    } catch (err) {
      console.error("Error submitting form:", err);
      setError("Failed to submit your message. Please try again later.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">Contact Us</h1>
        <p className="text-gray-400 mb-8">We're here to help with any questions you might have.</p>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4 text-pink-400">Contact Information</h2>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <svg className="w-5 h-5 mr-3 mt-0.5 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                  <span className="text-gray-300">IIIT Lucknow, India</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 mr-3 mt-0.5 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                  <span className="text-gray-300">support@snaptix.com</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 mr-3 mt-0.5 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                  </svg>
                  <span className="text-gray-300">+91 98765 43210</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-4 text-pink-400">Business Hours</h2>
              <ul className="space-y-2 text-gray-300">
                <li className="flex justify-between">
                  <span>Monday - Friday:</span>
                  <span>9:00 AM - 6:00 PM</span>
                </li>
                <li className="flex justify-between">
                  <span>Saturday:</span>
                  <span>10:00 AM - 4:00 PM</span>
                </li>
                <li className="flex justify-between">
                  <span>Sunday:</span>
                  <span>Closed</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="md:col-span-2">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6">
              {submitted ? (
                <div className="text-center py-8">
                  <svg className="w-16 h-16 text-green-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <h2 className="text-2xl font-semibold mb-2">Thank You!</h2>
                  <p className="text-gray-300">Your message has been sent successfully. We'll get back to you soon.</p>
                  <button 
                    onClick={() => setSubmitted(false)} 
                    className="mt-6 bg-pink-600 hover:bg-pink-700 text-white px-6 py-2 rounded-lg font-medium transition"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <>
                  <h2 className="text-xl font-semibold mb-4 text-pink-400">Send Us a Message</h2>
                  
                  {error && (
                    <div className="bg-red-500/20 border border-red-500 text-white p-3 rounded-lg mb-4">
                      {error}
                    </div>
                  )}
                  
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block mb-1 text-sm" htmlFor="name">
                          Your Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-pink-500 text-white"
                          required
                        />
                      </div>
                      <div>
                        <label className="block mb-1 text-sm" htmlFor="email">
                          Email Address
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-pink-500 text-white"
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block mb-1 text-sm" htmlFor="subject">
                        Subject
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-pink-500 text-white"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block mb-1 text-sm" htmlFor="message">
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows="5"
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-pink-500 text-white resize-none"
                        required
                      ></textarea>
                    </div>
                    
                    <button
                      type="submit"
                      disabled={submitting}
                      className={`w-full py-3 px-4 ${
                        submitting
                          ? "bg-gray-600 cursor-not-allowed"
                          : "bg-pink-600 hover:bg-pink-700"
                      } text-white rounded-lg transition`}
                    >
                      {submitting ? "Sending..." : "Send Message"}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}