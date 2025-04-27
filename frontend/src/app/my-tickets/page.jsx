"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { fetchAllEvents } from "../services/chatApi"; // Import the API function

export default function MyTicketsPage() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("upcoming");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("date");
  const [isAscending, setIsAscending] = useState(true); // Add this line
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    // Mock current user for now - in a real app this would come from auth
    setUser({
      id: "user-123",
      name: "Demo User",
    });
  }, []);
  
  useEffect(() => {
    // Function to create tickets using actual event data
    const createTicketsFromEvents = async () => {
      try {
        // Fetch event data from the API
        const result = await fetchAllEvents();
        if (result.success) {
          const events = result.data;
          
          // Select 6 random events to use as tickets
          const selectedEvents = getRandomEvents(events, 6);
          
          // Create mock tickets using the real event data
          const mockTickets = selectedEvents.map((event, index) => {
            const ticketId = `ticket-${index + 1}`;
            const now = new Date();
            
            // Calculate a mock ticket purchase date (between 1-30 days ago)
            const purchaseDate = new Date();
            purchaseDate.setDate(now.getDate() - Math.floor(Math.random() * 30) - 1);
            
            // Randomly assign upcoming or past events (3 of each)
            const eventDate = new Date(event.date);
            if (index < 3) {
              // Make sure first 3 tickets are for upcoming events
              // If event date from API is in the past, set it to a future date
              if (eventDate < now) {
                // Set to a random date 1-30 days in the future
                eventDate.setDate(now.getDate() + Math.floor(Math.random() * 30) + 1);
              }
            } else {
              // Make sure last 3 tickets are for past events
              // If event date from API is in the future, set it to a past date
              if (eventDate > now) {
                // Set to a random date 1-30 days in the past
                eventDate.setDate(now.getDate() - Math.floor(Math.random() * 30) - 1);
              }
            }
            
            // Format date string in ISO format
            const formattedDate = eventDate.toISOString();
            
            // Determine ticket status based on event date
            const status = eventDate > now ? "active" : "used";
            
            // Generate seat info
            const sections = ["A", "B", "C", "VIP"];
            const section = sections[Math.floor(Math.random() * sections.length)];
            const seatNumber = Math.floor(Math.random() * 100) + 1;
            const seatInfo = `Section ${section}, Seat ${seatNumber}`;
            
            return {
              id: ticketId,
              eventId: event.id,
              eventName: event.title,
              eventType: event.type || "Event",
              venue: event.location || "Venue",
              date: formattedDate,
              seatInfo: seatInfo,
              price: event.price || "₹1,000",
              status: status,
              purchaseDate: purchaseDate.toISOString(),
              qrCode: `https://chart.googleapis.com/chart?cht=qr&chl=${ticketId}&chs=200x200`,
              image: event.image || `https://source.unsplash.com/random/800x600/?${event.type || 'event'}`
            };
          });
          
          setTickets(mockTickets);
        } else {
          // Fallback to completely mock data if API fails
          createFallbackMockTickets();
        }
      } catch (error) {
        console.error("Error creating tickets from events:", error);
        createFallbackMockTickets();
      } finally {
        setLoading(false);
      }
    };
    
    // Function to select random events from the array
    const getRandomEvents = (events, count) => {
      const shuffled = [...events].sort(() => 0.5 - Math.random());
      return shuffled.slice(0, count);
    };
    
    // Fallback function if API fails
    const createFallbackMockTickets = () => {
      console.log("Using fallback mock tickets data");
      const mockTickets = [
        {
          id: "ticket-1",
          eventId: "event-1",
          eventName: "Arijit Singh Live Concert",
          eventType: "Concert",
          venue: "Jawaharlal Nehru Stadium, Delhi",
          date: "2025-05-15T18:00:00",
          seatInfo: "Section A, Row 5, Seat 12",
          price: "₹3,500",
          status: "confirmed",
          qrCode: "https://chart.googleapis.com/chart?cht=qr&chl=ticket-1&chs=200x200",
          image: "https://source.unsplash.com/random/800x600/?concert"
        },
        {
          id: "ticket-2",
          eventId: "event-2",
          eventName: "IPL Finals 2025",
          eventType: "Sports",
          venue: "Wankhede Stadium, Mumbai",
          date: "2025-05-30T19:30:00",
          seatInfo: "West Stand, Block C, Seat 45",
          price: "₹4,000",
          status: "confirmed",
          qrCode: "https://chart.googleapis.com/chart?cht=qr&chl=ticket-2&chs=200x200",
          image: "https://source.unsplash.com/random/800x600/?cricket"
        },
        {
          id: "ticket-3",
          eventId: "event-3",
          eventName: "Coldplay World Tour",
          eventType: "Concert",
          venue: "DY Patil Stadium, Mumbai",
          date: "2025-06-10T20:00:00",
          seatInfo: "Golden Circle, Area 1",
          price: "₹6,500",
          status: "confirmed",
          qrCode: "https://chart.googleapis.com/chart?cht=qr&chl=ticket-3&chs=200x200",
          image: "https://source.unsplash.com/random/800x600/?rock-concert"
        },
        {
          id: "ticket-4",
          eventId: "event-4",
          eventName: "Tech Conference 2025",
          eventType: "Conference",
          venue: "Bangalore International Exhibition Centre",
          date: "2025-07-05T09:00:00",
          seatInfo: "Premium Pass",
          price: "₹12,000",
          status: "confirmed",
          qrCode: "https://chart.googleapis.com/chart?cht=qr&chl=ticket-4&chs=200x200",
          image: "https://source.unsplash.com/random/800x600/?tech-conference"
        },
        {
          id: "ticket-5",
          eventId: "event-5",
          eventName: "Diwali Cultural Festival",
          eventType: "Festival",
          venue: "Rajpath, Delhi",
          date: "2024-11-10T17:00:00", // Past event
          seatInfo: "General Entry",
          price: "₹1,200",
          status: "used",
          qrCode: "https://chart.googleapis.com/chart?cht=qr&chl=ticket-5&chs=200x200",
          image: "https://source.unsplash.com/random/800x600/?diwali-festival"
        },
        {
          id: "ticket-6",
          eventId: "event-6",
          eventName: "AR Rahman Live",
          eventType: "Concert",
          venue: "Indira Gandhi Arena, Delhi",
          date: "2024-12-18T19:00:00", // Past event
          seatInfo: "VIP Box 3, Seat 7",
          price: "₹5,000",
          status: "used",
          qrCode: "https://chart.googleapis.com/chart?cht=qr&chl=ticket-6&chs=200x200",
          image: "https://source.unsplash.com/random/800x600/?indian-concert"
        }
      ];
      
      setTickets(mockTickets);
    };
    
    // Create tickets with real event data
    createTicketsFromEvents();
  }, [user]);

  // Filter tickets based on active tab and search query
  const filteredTickets = tickets.filter(ticket => {
    const eventDate = new Date(ticket.date);
    const now = new Date();
    const isUpcoming = eventDate > now;
    
    // Tab filter
    if (activeTab === "upcoming" && !isUpcoming) return false;
    if (activeTab === "past" && isUpcoming) return false;
    
    // Search query filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        ticket.eventName.toLowerCase().includes(query) ||
        ticket.eventType.toLowerCase().includes(query) ||
        ticket.venue.toLowerCase().includes(query)
      );
    }
    
    return true;
  });
  
  // Sort tickets
  const sortedTickets = [...filteredTickets].sort((a, b) => {
    let comparison = 0;
    
    if (sortBy === "date") {
      comparison = new Date(a.date) - new Date(b.date);
    } else if (sortBy === "name") {
      comparison = a.eventName.localeCompare(b.eventName);
    } else if (sortBy === "price") {
      const priceA = parseInt(a.price.replace(/[^\d]/g, ""));
      const priceB = parseInt(b.price.replace(/[^\d]/g, ""));
      comparison = priceA - priceB;
    }
    
    // Reverse the order if not ascending
    return isAscending ? comparison : -comparison;
  });

  // Handle ticket transfer (demo functionality)
  const handleTransferTicket = (ticketId) => {
    alert(`Transfer functionality for ticket ${ticketId} would open here`);
  };

  // Format date nicely
  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString('en-IN', options);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1
      }
    }
  };
  
  const ticketVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.4 } }
  };

  return (
    <main className="min-h-screen bg-black text-white py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500 mb-4">
            My Tickets
          </h1>
          <p className="text-xl text-gray-300">
            Manage all your events in one place
          </p>
        </motion.div>

        {!user ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-gray-800/70 backdrop-blur-sm rounded-xl p-8 text-center"
          >
            <h2 className="text-2xl font-semibold mb-4">Sign in to view your tickets</h2>
            <p className="text-gray-300 mb-6">
              You need to be logged in to view and manage your tickets.
            </p>
            <Link 
              href="/login" 
              className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-8 py-3 rounded-lg text-lg font-medium transition shadow-lg hover:shadow-pink-500/30"
            >
              Sign In
            </Link>
          </motion.div>
        ) : loading ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-center items-center h-64"
          >
            <div className="relative w-20 h-20">
              <div className="w-20 h-20 border-4 border-gray-700 border-t-pink-500 rounded-full animate-spin"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 border-4 border-t-4 border-gray-700 border-t-purple-500 rounded-full animate-spin-slow"></div>
            </div>
            <style jsx>{`
              @keyframes spin-slow {
                to {
                  transform: translate(-50%, -50%) rotate(360deg);
                }
              }
              .animate-spin-slow {
                animation: spin-slow 1.5s linear infinite;
              }
            `}</style>
          </motion.div>
        ) : (
          <>
            {/* Filters and Search Bar */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8 flex flex-col md:flex-row gap-4 justify-between"
            >
              <div className="flex space-x-2">
                <button
                  onClick={() => setActiveTab("upcoming")}
                  className={`px-5 py-2 rounded-lg transition ${
                    activeTab === "upcoming"
                      ? "bg-pink-600 text-white"
                      : "bg-gray-800 hover:bg-gray-700 text-gray-300"
                  }`}
                >
                  Upcoming
                </button>
                <button
                  onClick={() => setActiveTab("past")}
                  className={`px-5 py-2 rounded-lg transition ${
                    activeTab === "past"
                      ? "bg-pink-600 text-white"
                      : "bg-gray-800 hover:bg-gray-700 text-gray-300"
                  }`}
                >
                  Past Events
                </button>
              </div>
              
              <div className="flex flex-col md:flex-row gap-2">
                <input
                  type="text"
                  placeholder="Search tickets..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
                
                <div className="flex items-center bg-gray-800 border border-gray-700 rounded-lg px-3">
                  <span className="text-gray-400 text-sm mr-2">Sort by:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="bg-gray-800 text-white focus:outline-none"
                  >
                    <option value="date">Date</option>
                    <option value="name">Name</option>
                    <option value="price">Price</option>
                  </select>
                  <button
                    onClick={() => setIsAscending(!isAscending)}
                    className="ml-2 text-gray-400 hover:text-white"
                  >
                    {isAscending ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
            
            {/* Tickets List */}
            {sortedTickets.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gray-800/50 rounded-xl p-12 text-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                </svg>
                <h3 className="text-xl font-medium mb-2">No tickets found</h3>
                <p className="text-gray-400 mb-6">
                  {activeTab === "upcoming" 
                    ? "You don't have any upcoming events. Browse events to find something exciting!" 
                    : "You haven't attended any events yet."}
                </p>
                <Link 
                  href="/events" 
                  className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-6 py-2 rounded-lg font-medium transition shadow-lg hover:shadow-pink-500/30"
                >
                  Browse Events
                </Link>
              </motion.div>
            ) : (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                <AnimatePresence>
                  {sortedTickets.map((ticket) => (
                    <motion.div
                      key={ticket.id}
                      variants={ticketVariants}
                      className="bg-gray-800/70 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700 hover:border-pink-500/50 transition-all duration-300 group"
                      whileHover={{ y: -5, transition: { duration: 0.2 } }}
                      layout
                    >
                      <div className="relative h-40 bg-gray-700">
                        <img 
                          src={ticket.image} 
                          alt={ticket.eventName}
                          className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-300" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent flex items-end">
                          <div className="p-4">
                            <span className="inline-block bg-pink-500 text-white text-xs font-semibold px-2 py-1 rounded mb-2">
                              {ticket.eventType}
                            </span>
                            <h3 className="text-xl font-bold text-white">{ticket.eventName}</h3>
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-6">
                        <div className="mb-4 flex justify-between items-start">
                          <div>
                            <div className="flex items-center text-gray-300 mb-1">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                              </svg>
                              {ticket.venue}
                            </div>
                            <div className="flex items-center text-gray-300">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                              {formatDate(ticket.date)}
                            </div>
                          </div>
                          <span className="font-bold text-lg">{ticket.price}</span>
                        </div>
                        
                        <div className="border-t border-gray-700 pt-4 mt-4">
                          <div className="flex items-center mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                            </svg>
                            <span className="font-medium">{ticket.seatInfo}</span>
                          </div>
                          
                          <div className="flex flex-col sm:flex-row gap-3">
                            <Link 
                              href={`/ticket/${ticket.id}`}
                              className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-lg text-center font-medium transition-colors"
                            >
                              View Ticket
                            </Link>
                            
                            {activeTab === "upcoming" && (
                              <button
                                onClick={() => handleTransferTicket(ticket.id)}
                                className="flex-1 border border-pink-500 text-pink-500 hover:bg-pink-500/10 py-2 rounded-lg text-center font-medium transition-colors"
                              >
                                Transfer
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            )}
          </>
        )}
      </div>
    </main>
  );
}
