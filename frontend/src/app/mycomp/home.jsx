"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { fetchAllEvents } from "../services/chatApi";
import { useAuth } from "../../context/AuthContext";

export default function Home() {
  const [featuredEvents, setFeaturedEvents] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [testimonials, setTestimonials] = useState([]);
  const [displayedTestimonials, setDisplayedTestimonials] = useState([]);
  const { user } = useAuth();

  // Function to shuffle array using Fisher-Yates algorithm
  const shuffleArray = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  useEffect(() => {
    const loadEvents = async () => {
      const result = await fetchAllEvents();
      if (result.success) {
        // Get 4 random events to feature
        const randomEvents = result.data
          .sort(() => 0.5 - Math.random())
          .slice(0, 4);
        setFeaturedEvents(randomEvents);
        
        // Extract unique categories
        const uniqueCategories = [...new Set(result.data.map(event => event.type))];
        setCategories(uniqueCategories.slice(0, 6)); // Take up to 6 categories
      }
      setLoading(false);
    };

    // Indian user testimonials
    const allTestimonials = [
      {
        id: 1,
        name: "Priya Sharma",
        role: "Classical Music Enthusiast",
        location: "Delhi",
        image: "https://randomuser.me/api/portraits/women/33.jpg",
        comment: "SnapTix helped me discover amazing classical music concerts in Delhi that I would have missed otherwise. The blockchain verification gives me confidence my tickets are authentic!",
      },
      {
        id: 2,
        name: "Arjun Patel",
        role: "Cricket Fan",
        location: "Mumbai",
        image: "https://randomuser.me/api/portraits/men/44.jpg",
        comment: "I've attended multiple IPL matches using SnapTix. The seat selection and instant ticket delivery makes the whole process stress-free.",
      },
      {
        id: 3,
        name: "Divya Reddy",
        role: "Theater Artist",
        location: "Bangalore",
        image: "https://randomuser.me/api/portraits/women/17.jpg",
        comment: "As both a performer and audience member, I love how SnapTix is supporting the local arts scene in Bangalore. Their AI recommendations introduced me to experimental theater!",
      },
      {
        id: 4,
        name: "Vikram Singh",
        role: "Tech Conference Organizer",
        location: "Hyderabad",
        image: "https://randomuser.me/api/portraits/men/32.jpg",
        comment: "We used SnapTix for our annual developer conference and ticket distribution was seamless. The analytics helped us understand our audience better.",
      },
      {
        id: 5,
        name: "Ananya Krishnan",
        role: "Film Festival Coordinator",
        location: "Chennai",
        image: "https://randomuser.me/api/portraits/women/66.jpg",
        comment: "SnapTix revolutionized our independent film festival ticketing process. The secure blockchain verification eliminated counterfeit tickets completely!",
      },
      {
        id: 6,
        name: "Rajiv Malhotra",
        role: "Music Producer",
        location: "Kolkata",
        image: "https://randomuser.me/api/portraits/men/73.jpg",
        comment: "From small indie shows to major concerts, SnapTix helps us manage tickets for all our events. Their platform has made reaching new audiences so much easier.",
      },
      {
        id: 7,
        name: "Meera Joshi",
        role: "Food Festival Enthusiast",
        location: "Pune",
        image: "https://randomuser.me/api/portraits/women/51.jpg",
        comment: "I discovered the amazing street food festival through SnapTix recommendations. The AI really understands my taste in culinary events!",
      },
      {
        id: 8,
        name: "Karthik Nair",
        role: "EDM Concert Goer",
        location: "Goa",
        image: "https://randomuser.me/api/portraits/men/62.jpg",
        comment: "Booking tickets for Sunburn Festival through SnapTix was a breeze. The mobile-friendly website works perfectly even with spotty beach WiFi!",
      }
    ];
    
    setTestimonials(allTestimonials);
    
    // Randomly select 3 testimonials to display
    const shuffled = shuffleArray(allTestimonials);
    setDisplayedTestimonials(shuffled.slice(0, 3));

    loadEvents();
  }, []);

  // Function to refresh testimonials
  const refreshTestimonials = () => {
    const shuffled = shuffleArray(testimonials);
    setDisplayedTestimonials(shuffled.slice(0, 3));
  };

  return (
    <main className=" min-h-screen bg-gradient-to-b from-gray-900 to-black text-white flex flex-col">
      {/* Hero Section */}
      <section className="min-h-[80vh] flex flex-col justify-center items-center text-center px-4 bg-gradient-to-br from-gray-900 via-pink-900/20 to-gray-900 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-pink-500/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/4 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative z-10">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500 leading-tight">
            Experience Events <br className="hidden md:block" /> Like Never Before
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto">
            Discover and secure tickets for concerts, festivals, sports, and more with 
            our AI-powered event platform backed by blockchain technology.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/events"
              className="bg-pink-600 hover:bg-pink-700 text-white px-8 py-3 rounded-xl text-lg font-medium transition"
            >
              Explore Events
            </Link>
            {!user ? (
              <Link
                href="/signup"
                className="bg-transparent border-2 border-pink-500 hover:bg-pink-500/20 text-white px-8 py-3 rounded-xl text-lg font-medium transition"
              >
                Sign Up Free
              </Link>
            ) : (
              <Link
                href="/ai-assistant"
                className="bg-transparent border-2 border-pink-500 hover:bg-pink-500/20 text-white px-8 py-3 rounded-xl text-lg font-medium transition"
              >
                Ask AI Assistant
              </Link>
            )}
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-gray-900 to-transparent"></div>
      </section>

      {/* Featured Events Section */}
      <section className="py-20 px-4 max-w-6xl mx-auto w-full">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-3xl font-bold">
            <span className="text-pink-500">Featured</span> Events
          </h2>
          <Link
            href="/events"
            className="text-pink-400 hover:text-pink-300 flex items-center"
          >
            View all
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 ml-1"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredEvents.map((event) => (
              <Link
                href={`/events/${event.id}`}
                key={event.id}
                className="group"
              >
                <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-pink-500/20 transition">
                  <div className="h-48 bg-gray-700 relative">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-4">
                      <span className="text-white font-medium">
                        View Details
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="text-xs font-medium text-pink-400">
                      {event.type}
                    </p>
                    <h4 className="text-lg font-semibold mt-1 group-hover:text-pink-400 transition">
                      {event.title}
                    </h4>
                    <div className="flex items-center mt-2 text-gray-400 text-sm">
                      <span className="mr-3">{event.date}</span>
                      <span>{event.location}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Categories Section */}
      <section className="py-16 px-4 bg-gray-900/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Explore by <span className="text-pink-500">Category</span>
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category, index) => (
              <Link 
                key={index} 
                href={`/events?category=${category}`}
                className="bg-gray-800 hover:bg-gray-700 rounded-lg p-6 text-center transition group"
              >
                <div className="w-12 h-12 bg-pink-500/20 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-pink-500/30 transition">
                  <CategoryIcon category={category} />
                </div>
                <h3 className="font-medium">{category}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 px-4 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-16">
          Why <span className="text-pink-500">Choose</span> SnapTix
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-gray-800/50 rounded-xl p-6 backdrop-blur-sm">
            <div className="w-14 h-14 bg-pink-500/20 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-pink-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3">AI-Powered Recommendations</h3>
            <p className="text-gray-400">Discover events tailored to your preferences with our intelligent AI system that learns what you love.</p>
          </div>
          
          <div className="bg-gray-800/50 rounded-xl p-6 backdrop-blur-sm">
            <div className="w-14 h-14 bg-pink-500/20 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-pink-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3">Blockchain Security</h3>
            <p className="text-gray-400">Every ticket is secured and verified using blockchain technology, eliminating fraud and counterfeiting.</p>
          </div>
          
          <div className="bg-gray-800/50 rounded-xl p-6 backdrop-blur-sm">
            <div className="w-14 h-14 bg-pink-500/20 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-pink-500" viewBox="0 0 20 20" fill="currentColor">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3">Social Experience</h3>
            <p className="text-gray-400">Connect with friends, share events, and discover who's going to make your event experience even better.</p>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-pink-900/20 to-gray-900">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-16">
            <h2 className="text-3xl font-bold">
              What Our <span className="text-pink-500">Users</span> Say
            </h2>
            <button 
              onClick={refreshTestimonials}
              className="text-pink-400 hover:text-pink-300 flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
              </svg>
              Refresh Reviews
            </button>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {displayedTestimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-gray-800/50 rounded-xl p-6 backdrop-blur-sm">
                <div className="flex items-center mb-4">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-sm text-pink-400">{testimonial.role}</p>
                    <p className="text-xs text-gray-400">{testimonial.location}</p>
                  </div>
                </div>
                <p className="text-gray-400 italic">"{testimonial.comment}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Newsletter Section */}
      <section className="py-16 px-4 bg-gray-800/50">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-6">Stay Updated With SnapTix</h2>
          <p className="text-gray-400 mb-8">Subscribe to our newsletter to get the latest event announcements and exclusive offers.</p>
          <form className="flex flex-col sm:flex-row gap-2">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="flex-1 px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-pink-500 text-white"
              required
            />
            <button 
              type="submit" 
              className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-lg font-medium transition"
            >
              Subscribe
            </button>
          </form>
          <p className="text-xs text-gray-500 mt-4">By subscribing, you agree to our Privacy Policy and consent to receive updates from SnapTix.</p>
        </div>
      </section>

      <footer className="mt-auto py-12 px-4 bg-gray-900 border-t border-gray-800">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold text-pink-500 mb-4">SnapTix</h3>
            <p className="text-gray-400 mb-4">Discover amazing events and secure your tickets with blockchain-backed security.</p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                </svg>
              </a>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/events" className="text-gray-400 hover:text-white transition">Events</Link></li>
              <li><Link href="/discover" className="text-gray-400 hover:text-white transition">Discover</Link></li>
              <li><Link href="/ai-assistant" className="text-gray-400 hover:text-white transition">AI Assistant</Link></li>
              <li><Link href="/my-tickets" className="text-gray-400 hover:text-white transition">My Tickets</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              <li><Link href="/help" className="text-gray-400 hover:text-white transition">Help Center</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-white transition">Contact Us</Link></li>
              <li><Link href="/faq" className="text-gray-400 hover:text-white transition">FAQs</Link></li>
              <li><Link href="/privacy" className="text-gray-400 hover:text-white transition">Privacy Policy</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-gray-400">
              <li className="flex items-start">
                <svg className="w-5 h-5 mr-2 mt-0.5 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
                IIIT Lucknow,226002
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 mr-2 mt-0.5 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
                support@snaptix.com
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 mr-2 mt-0.5 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                </svg>
                +91 98765 43210
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-800 text-center">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} SnapTix. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}

// Helper component to display icons based on category
function CategoryIcon({ category }) {
  switch(category?.toLowerCase()) {
    case 'concert':
    case 'music':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
        </svg>
      );
    case 'sports':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      );
    case 'theater':
    case 'performing arts':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      );
    case 'conference':
    case 'business':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      );
    case 'festival':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      );
    default:
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      );
  }
}
