"use client";

import { useState } from "react";
import axios from "axios";

export default function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    try {
      const response = await axios.post("http://localhost:5000/api/groq", {
        query: input,
      });

      const eventData = response?.data?.response;

      const botMessage = {
        role: "bot",
        content:
          Array.isArray(eventData) && eventData.length > 0
            ? eventData // Pass the array directly
            : "Sorry, I couldn't find any events for you!",
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error fetching event data:", error);
      const botMessage = {
        role: "bot",
        content: "⚠ Oops! Something went wrong. Please try again.",
      };
      setMessages((prev) => [...prev, botMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <main
      className="pt-[calc(3rem+1px)] min-h-screen bg-black text-white flex flex-col items-center justify-center p-4 bg-cover bg-center relative overflow-hidden"
      style={{
        backgroundImage:
          "url(https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExMWI5azRhZWZ6MHZ2bDJvcGljdDZlN2JqZm5za2lldGZvMWZ5Z2F4eSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/1pAht1Y4VovRFvvjXi/giphy.gif)",
      }}
    >
      {/* Overlay Blur */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-lg z-0" />

      <div className="relative z-10 w-full max-w-4xl rounded-3xl p-6 md:p-10">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-2 text-pink-400 neon-glow text-center">
          🎟 SnapTix AI Assist
        </h1>
        <p className="text-gray-300 mb-6 text-center text-sm md:text-base">
          Discover concerts, fests, movies & more — Just ask!
        </p>

        <div className="rounded-xl p-4 h-96 overflow-y-auto bg-gray-900/60 shadow-inner mb-6 text-sm md:text-base">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`mb-3 ${
                msg.role === "user" ? "text-right" : "text-left"
              }`}
            >
              <div
                className={`inline-block px-4 py-2 rounded-2xl max-w-[85%] ${
                  msg.role === "user"
                    ? "bg-gradient-to-br from-blue-500 to-purple-600"
                    : "bg-gradient-to-br from-pink-500 to-red-500"
                }`}
              >
                {typeof msg.content === "string" ? (
                  msg.content
                ) : (
                  <table className="table-auto text-left text-white w-full text-sm">
                    <thead>
                      <tr className="text-pink-200 border-b border-white/20">
                        <th className="px-2 py-1">🎉 Event</th>
                        <th className="px-2 py-1">📅 Date</th>
                        <th className="px-2 py-1">📍 Venue</th>
                      </tr>
                    </thead>
                    <tbody>
                      {msg.content.map((event, idx) => (
                        <tr key={idx} className="border-b border-white/10">
                          <td className="px-2 py-1">{event.name}</td>
                          <td className="px-2 py-1">{event.date}</td>
                          <td className="px-2 py-1">{event.venue}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
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
            placeholder="Ask me about events in Mumbai, Delhi, Bengaluru..."
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