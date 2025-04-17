"use client";
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

export default function EventDetailsPage() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [suggestedEvents, setSuggestedEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/events/${id}`);
        const result = await response.json();
        
        if (result.success) {
          setEvent(result.data);
          
          // After getting event, fetch suggested events
          fetchSuggestedEvents(result.data);
        }
      } catch (error) {
        console.error('Error fetching event details:', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchSuggestedEvents = async (currentEvent) => {
      try {
        const response = await fetch(`http://localhost:5000/api/events/search?type=${currentEvent.type}`);
        const result = await response.json();
        
        if (result.success) {
          // Filter out the current event and limit to 4 suggestions
          const filtered = result.data
            .filter(e => e.id !== currentEvent.id)
            .slice(0, 4);
          
          setSuggestedEvents(filtered);
        }
      } catch (error) {
        console.error('Error fetching suggested events:', error);
      }
    };

    if (id) {
      fetchEventDetails();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"></div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Event not found</h2>
          <Link href="/events" className="text-pink-500 hover:text-pink-400">
            Browse all events
          </Link>
        </div>
      </div>
    );
  }

  const handleBuyTicket = () => {
    alert("Ticket purchasing will be implemented in a future version!");
  };

  return (
    <main className="min-h-screen bg-gray-900 text-white">
      <header className="bg-black/30 backdrop-blur-sm py-6 px-4 md:px-8">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/" className="text-3xl font-bold text-pink-500">SnapTix</Link>
          <nav className="space-x-6">
            <Link href="/events" className="text-white hover:text-pink-400 transition">Events</Link>
            <Link href="/discover" className="text-white hover:text-pink-400 transition">Discover</Link>
            <Link href="/ai-assistant" className="bg-pink-600 hover:bg-pink-700 px-4 py-2 rounded-lg transition">
              AI Assistant
            </Link>
          </nav>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Event Details Card */}
        <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg mb-8">
          <div className="md:flex">
            {/* Event Image */}
            <div className="md:w-1/3 h-64 md:h-auto relative">
              {event.image ? (
                <img 
                  src={event.image} 
                  alt={event.title} 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    console.log("Image failed to load:", event.image);
                    e.target.src = "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&w=800&q=80";
                  }}
                />
              ) : (
                <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                  <span className="text-4xl font-bold text-gray-600">{event.type?.charAt(0).toUpperCase() || 'E'}</span>
                </div>
              )}
            </div>
            
            {/* Event Details */}
            <div className="p-6 md:w-2/3">
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="bg-pink-600 text-xs font-bold uppercase px-2 py-1 rounded-md">
                  {event.type || 'Event'}
                </span>
                {event.genre && (
                  <span className="bg-gray-700 text-xs font-bold uppercase px-2 py-1 rounded-md">
                    {event.genre}
                  </span>
                )}
              </div>
              
              <h1 className="text-3xl font-bold mb-2">{event.title}</h1>
              
              {event.artist && (
                <p className="text-xl text-gray-300 mb-4">By {event.artist}</p>
              )}
              
              <div className="space-y-3 mb-6 text-gray-300">
                <div className="flex items-center">
                  <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                  </svg>
                  <span>{event.date} {event.time && `at ${event.time}`}</span>
                </div>
                
                <div className="flex items-center">
                  <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  <span>{event.location}</span>
                </div>
                
                {event.price && (
                  <div className="flex items-center">
                    <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.736 6.979C9.208 6.193 9.696 6 10 6c.304 0 .792.193 1.264.979a1 1 0 001.715-1.029C12.279 4.784 11.232 4 10 4s-2.279.784-2.979 1.95c-.285.475-.507 1-.67 1.55H6a1 1 0 000 2h.013a9.358 9.358 0 000 1H6a1 1 0 100 2h.351c.163.55.385 1.075.67 1.55C7.721 15.216 8.768 16 10 16s2.279-.784 2.979-1.95a1 1 0 10-1.715-1.029c-.472.786-.96.979-1.264.979-.304 0-.792-.193-1.264-.979a4.265 4.265 0 01-.264-.521H10a1 1 0 100-2H8.017a7.36 7.36 0 010-1H10a1 1 0 100-2H8.472c.08-.185.167-.36.264-.521z" clipRule="evenodd" />
                    </svg>
                    <span className="text-pink-500 font-semibold">{event.price}</span>
                  </div>
                )}
              </div>
              
              {event.description && (
                <div className="mb-6">
                  <h2 className="text-xl font-semibold mb-2">About This Event</h2>
                  <p className="text-gray-300">{event.description}</p>
                </div>
              )}
              
              {/* Buy Button */}
              <button 
                onClick={handleBuyTicket} 
                className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-lg text-lg font-medium transition"
              >
                Buy Tickets
              </button>
            </div>
          </div>
        </div>
        
        {/* Suggested Events */}
        {suggestedEvents.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">You Might Also Like</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {suggestedEvents.map((suggestedEvent) => (
                <Link href={`/events/${suggestedEvent.id}`} key={suggestedEvent.id}>
                  <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-pink-500/20 transition">
                    <div className="h-48 bg-gray-700 relative">
                      {suggestedEvent.image ? (
                        <img 
                          src={suggestedEvent.image} 
                          alt={suggestedEvent.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.src = "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&w=800&q=80";
                          }}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="text-3xl font-bold text-gray-600">{suggestedEvent.type?.charAt(0).toUpperCase() || 'E'}</span>
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold">{suggestedEvent.title}</h3>
                      <div className="mt-2 text-sm text-gray-400">
                        <p>{suggestedEvent.date}</p>
                        <p>{suggestedEvent.location}</p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}