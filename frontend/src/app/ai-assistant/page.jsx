"use client";
import { useState } from 'react';
import Link from 'next/link';
import { askAI } from '../services/chatApi';
import { useRouter } from 'next/navigation';

export default function AIAssistant() {
  const router = useRouter();
  const [messages, setMessages] = useState([
    { role: 'system', content: "Hi! I'm your SnapTix AI Assistant. I can help you find events, answer questions, and provide recommendations. How can I help you today?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    
    try {
      const result = await askAI(input);
      
      if (result.success) {
        // Add the AI response
        setMessages(prev => [...prev, { 
          role: 'system', 
          content: result.reply,
          events: result.events 
        }]);
      } else {
        setMessages(prev => [...prev, { 
          role: 'system', 
          content: "I'm sorry, I encountered an error processing your request." 
        }]);
      }
    } catch (error) {
      console.error("Error with AI request:", error);
      setMessages(prev => [...prev, { 
        role: 'system', 
        content: "I'm sorry, I encountered an error processing your request." 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const navigateToEvent = (eventId) => {
    router.push(`/events/${eventId}`);
  };

  // This helper function determines if we should show event recommendations
  const shouldShowEvents = (message) => {
    // Don't show events if this is a "confusion" message
    return message.events && 
           message.events.length > 0 && 
           !message.content.includes("I think there might be some confusion!");
  };

  return (
    <main className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 to-black text-white">
      <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full p-4 md:p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
            AI Event Assistant
          </h1>
          <p className="text-gray-400">
            Ask me anything about events, concerts, or shows. I can help you find what you're looking for!
          </p>
        </div>
        
        <div className="flex-1 bg-gray-800/50 rounded-xl p-4 md:p-6 backdrop-blur-sm overflow-hidden flex flex-col">
          <div className="flex-1 overflow-y-auto mb-4 space-y-4">
            {messages.map((message, index) => (
              <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                  message.role === 'user' 
                    ? 'bg-pink-600 text-white' 
                    : 'bg-gray-700 text-white'
                }`}>
                  <p>{message.content}</p>
                  
                  {shouldShowEvents(message) && (
                    <div className="mt-4 border-t border-gray-600 pt-3">
                      <p className="font-medium mb-2">Recommended Events:</p>
                      <div className="space-y-2">
                        {message.events.slice(0, 3).map((event, idx) => (
                          <div
                            key={idx}
                            className="bg-gray-800 p-3 rounded-lg cursor-pointer hover:bg-gray-700 transition"
                            onClick={() => navigateToEvent(event.id)}
                          >
                            <p className="font-medium">{event.title}</p>
                            <div className="flex justify-between text-sm text-gray-400 mt-1">
                              <span>{event.date}</span>
                              <span>{event.location}</span>
                            </div>
                          </div>
                        ))}
                        
                        {message.events.length > 3 && (
                          <button 
                            onClick={() => router.push('/events')}
                            className="text-pink-400 hover:text-pink-300 text-sm mt-1"
                          >
                            View {message.events.length - 3} more events →
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-700 text-white rounded-2xl px-4 py-3 flex items-center">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <div className="flex gap-2">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask something like: 'Show me concerts in Mumbai next month' or 'I want to see cricket matches in Delhi'"
              className="flex-1 bg-gray-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500 resize-none"
              rows={2}
            />
            <button
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className={`bg-pink-600 hover:bg-pink-700 disabled:bg-gray-600 text-white rounded-xl px-6 self-end h-[46px] flex items-center justify-center transition`}
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}