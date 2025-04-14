'use client';

import { useState, useEffect } from 'react';

export default function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const botMessage = {
        role: 'bot',
        content: `🎉 Looking for events in "${userMessage.content}"... stay tuned!`,
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1200); // Simulate typing delay
  };

  return (
    <main
      className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4 bg-cover bg-center relative overflow-hidden"
      style={{
        backgroundImage:
          'url(https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExMWI5azRhZWZ6MHZ2bDJvcGljdDZlN2JqZm5za2lldGZvMWZ5Z2F4eSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/1pAht1Y4VovRFvvjXi/giphy.gif)',
      }}
    >
      {/* Overlay Blur */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-lg z-0" />

      <div className="relative z-10 w-full max-w-4xl rounded-3xl p-6 md:p-10">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-2 text-pink-400 neon-glow text-center">
          🎟️ SnapTix AI Assist
        </h1>
        <p className="text-gray-300 mb-6 text-center text-sm md:text-base">
          Discover concerts, fests, movies & more — Just ask!
        </p>

        <div className="rounded-xl p-4 h-96 overflow-y-auto bg-gray-900/60 shadow-inner mb-6 text-sm md:text-base">
          {messages.map((msg, i) => (
            <div key={i} className={`mb-3 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
              <div
                className={`inline-block px-4 py-2 rounded-2xl max-w-[85%] ${
                  msg.role === 'user'
                    ? 'bg-gradient-to-br from-blue-500 to-purple-600'
                    : 'bg-gradient-to-br from-pink-500 to-red-500'
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="text-left">
              <div className="inline-block px-4 py-2 rounded-2xl bg-gradient-to-br from-pink-500 to-red-500 animate-pulse">
                Typing...
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me about events in Mumbai,Delhi,Bengaluru..."
            className="flex-grow px-4 py-3 rounded-xl bg-gray-800/80 text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
          <button
            onClick={handleSend}
            className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-xl font-semibold transition"
          >
            Send
          </button>
        </div>
      </div>
    </main>
  );
}
