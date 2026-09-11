"use client";
import { useState, useEffect, useRef } from "react";
import { askAI } from "../services/chatApi";
import { useRouter } from "next/navigation";
import ReactMarkdown from "react-markdown";

const STORAGE_KEY = "snaptix_conversations";
const CHUNK_SIZE = 10;
const TICK_MS = 12;

const WELCOME_MSG = {
  role: "system",
  content: "Hi! I am your **SnapTix AI Assistant** 🎟️\nI can help you discover events, find tickets, and answer any questions about what is on. What are you looking for today?",
  typed: true,
};

function newConversation() {
  return { id: Date.now().toString(), title: "New Chat", createdAt: Date.now(), messages: [WELCOME_MSG] };
}
function loadConversations() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) { const parsed = JSON.parse(raw); if (Array.isArray(parsed) && parsed.length > 0) return parsed; }
  } catch (_) {}
  return null;
}
function saveConversations(convos) { try { localStorage.setItem(STORAGE_KEY, JSON.stringify(convos)); } catch (_) {} }

const TYPE_COLORS = {
  concert:  { bg: "rgba(236,72,153,0.15)",  border: "#ec4899", text: "#f9a8d4" },
  festival: { bg: "rgba(168,85,247,0.15)",  border: "#a855f7", text: "#d8b4fe" },
  sports:   { bg: "rgba(59,130,246,0.15)",   border: "#3b82f6", text: "#93c5fd" },
  movie:    { bg: "rgba(16,185,129,0.15)",   border: "#10b981", text: "#6ee7b7" },
  comedy:   { bg: "rgba(245,158,11,0.15)",   border: "#f59e0b", text: "#fcd34d" },
  default:  { bg: "rgba(99,102,241,0.15)",   border: "#6366f1", text: "#a5b4fc" },
};
function getTypeColor(type = "") { return TYPE_COLORS[type.toLowerCase()] || TYPE_COLORS.default; }

function EventCard({ event, onClick }) {
  const color = getTypeColor(event.type);
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.04)",
        border: `1px solid ${hovered ? color.border : color.border + "44"}`,
        borderRadius: "14px", padding: "14px 16px", cursor: "pointer",
        transition: "all 0.2s ease", position: "relative", overflow: "hidden",
        transform: hovered ? "translateY(-2px)" : "translateY(0)",
      }}
    >
      <div style={{ position: "absolute", top: 0, right: 0, width: "80px", height: "80px",
        background: `radial-gradient(circle, ${color.border}22 0%, transparent 70%)`, pointerEvents: "none" }} />
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "8px" }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          {event.type && (
            <span style={{ display: "inline-block", fontSize: "10px", fontWeight: 700, textTransform: "uppercase",
              letterSpacing: "0.08em", padding: "2px 8px", borderRadius: "20px", background: color.bg,
              color: color.text, border: `1px solid ${color.border}55`, marginBottom: "6px" }}>
              {event.type}
            </span>
          )}
          <p style={{ fontWeight: 700, fontSize: "14px", margin: 0, color: "#f1f5f9", lineHeight: 1.3,
            overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {event.title}
          </p>
          {event.artist && event.artist !== event.title && (
            <p style={{ margin: "2px 0 0", fontSize: "12px", color: "#94a3b8" }}>🎤 {event.artist}</p>
          )}
        </div>
        {event.price && (
          <div style={{ flexShrink: 0, background: "linear-gradient(135deg, #ec4899, #8b5cf6)",
            borderRadius: "20px", padding: "3px 10px", fontSize: "12px", fontWeight: 700, color: "#fff", whiteSpace: "nowrap" }}>
            {String(event.price).startsWith("₹") ? event.price : "₹" + event.price}
          </div>
        )}
      </div>
      <div style={{ display: "flex", gap: "12px", marginTop: "10px", flexWrap: "wrap" }}>
        {event.date && <span style={{ fontSize: "12px", color: "#94a3b8" }}>📅 {event.date}{event.time ? " · " + event.time : ""}</span>}
        {event.location && <span style={{ fontSize: "12px", color: "#94a3b8" }}>📍 {event.location}</span>}
      </div>
      <div style={{ marginTop: "10px", display: "flex", justifyContent: "flex-end" }}>
        <span style={{ fontSize: "12px", color: color.text, fontWeight: 600 }}>View event →</span>
      </div>
    </div>
  );
}

export default function AIAssistant() {
  const router = useRouter();
  const [conversations, setConversations] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [typingIndex, setTypingIndex] = useState(null);
  const [displayedText, setDisplayedText] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const scrollContainerRef = useRef(null);
  const userScrolledUp = useRef(false);
  const hasLoaded = useRef(false);

  useEffect(() => {
    const saved = loadConversations();
    const fresh = newConversation();
    setConversations(saved ? [fresh, ...saved] : [fresh]);
    setActiveId(fresh.id);
    hasLoaded.current = true;
  }, []);

  useEffect(() => {
    if (!hasLoaded.current || conversations.length === 0) return;
    const toSave = conversations
      .map(c => ({ ...c, messages: c.messages.map(m => ({ ...m, typed: true })) }))
      .filter(c => c.messages.some(m => m.role === "user"));
    saveConversations(toSave);
  }, [conversations]);

  const activeConvo = conversations.find(c => c.id === activeId);
  const messages = activeConvo?.messages ?? [];

  const updateMessages = (id, updater) =>
    setConversations(prev => prev.map(c => c.id === id ? { ...c, messages: updater(c.messages) } : c));

  const setTitle = (id, title) =>
    setConversations(prev => prev.map(c => c.id === id ? { ...c, title: title.slice(0, 40) } : c));

  useEffect(() => {
    if (typingIndex === null || !activeConvo) return;
    const msg = messages[typingIndex];
    if (!msg || msg.typed) return;
    const fullText = msg.content;
    const i = displayedText.length;
    if (i >= fullText.length) {
      updateMessages(activeId, prev => prev.map((m, idx) => idx === typingIndex ? { ...m, typed: true } : m));
      setTypingIndex(null);
      return;
    }
    const timeout = setTimeout(() => setDisplayedText(fullText.slice(0, i + CHUNK_SIZE)), TICK_MS);
    return () => clearTimeout(timeout);
  }, [typingIndex, displayedText, messages, activeId]);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const onScroll = () => { userScrolledUp.current = (container.scrollHeight - container.scrollTop - container.clientHeight) > 80; };
    container.addEventListener("scroll", onScroll);
    return () => container.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (userScrolledUp.current) return;
    scrollContainerRef.current?.scrollTo({ top: scrollContainerRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isLoading]);

  const buildOrderedHistory = (msgs) =>
    msgs.filter(m => m.typed && m.content !== WELCOME_MSG.content)
      .map(m => ({ role: m.role === "user" ? "user" : "assistant", content: m.content }));

  const handleSend = async () => {
    if (!input.trim() || isLoading || typingIndex !== null || !activeId) return;
    const text = input.trim();
    userScrolledUp.current = false;
    if (!messages.some(m => m.role === "user")) setTitle(activeId, text);
    updateMessages(activeId, prev => [...prev, { role: "user", content: text, typed: true }]);
    setInput("");
    setIsLoading(true);
    try {
      const result = await askAI(text, buildOrderedHistory(messages));
      const replyContent = result.success ? result.reply : "I am sorry, I encountered an error processing your request.";
      const aiMsg = { role: "system", content: replyContent, events: result.success ? (result.events || []) : [], typed: false };
      updateMessages(activeId, prev => {
        const updated = [...prev, aiMsg];
        setTypingIndex(updated.length - 1);
        setDisplayedText("");
        return updated;
      });
    } catch (err) {
      console.error(err);
      updateMessages(activeId, prev => [...prev, { role: "system", content: "I am sorry, I encountered an error.", typed: true }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); } };

  const handleNewChat = () => {
    const fresh = newConversation();
    setConversations(prev => [fresh, ...prev]);
    setActiveId(fresh.id); setTypingIndex(null); setDisplayedText(""); userScrolledUp.current = false;
  };
  const handleSelectConvo = (id) => { setActiveId(id); setTypingIndex(null); setDisplayedText(""); userScrolledUp.current = false; };
  const handleDeleteConvo = (e, id) => {
    e.stopPropagation();
    setConversations(prev => {
      const filtered = prev.filter(c => c.id !== id);
      if (id === activeId) {
        if (filtered.length === 0) { const n = newConversation(); setActiveId(n.id); return [n]; }
        setActiveId(filtered[0].id);
      }
      return filtered;
    });
  };

  const shouldShowEvents = (msg) => msg.typed && msg.events?.length > 0 && !msg.content.includes("I can only help with SnapTix");
  const getDisplayContent = (msg, idx) => (!msg.typed && idx === typingIndex) ? displayedText : msg.content;
  const formatDate = (ts) => new Date(ts).toLocaleDateString("en-IN", { day: "numeric", month: "short" });

  return (
    <main style={{ display: "flex", position: "fixed", top: "64px", left: 0, right: 0, bottom: 0,
      background: "linear-gradient(135deg, #0f0f1a 0%, #0d0d0d 100%)", color: "#f1f5f9", fontFamily: "'Inter', sans-serif" }}>

      {/* Sidebar */}
      <aside style={{ width: sidebarOpen ? "260px" : "0", flexShrink: 0, transition: "width 0.3s ease",
        overflow: "hidden", borderRight: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.02)" }}>
        <div style={{ padding: "16px 12px", display: "flex", flexDirection: "column", height: "100%", minWidth: "236px" }}>
          <button onClick={handleNewChat} style={{ width: "100%", display: "flex", alignItems: "center", gap: "8px",
            padding: "10px 14px", borderRadius: "10px", background: "linear-gradient(135deg, #ec4899, #8b5cf6)",
            border: "none", color: "#fff", fontWeight: 600, fontSize: "13px", cursor: "pointer", marginBottom: "16px" }}>
            <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            New Chat
          </button>
          <p style={{ fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.1em", color: "#475569", padding: "0 4px", marginBottom: "8px" }}>History</p>
          <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: "2px" }}>
            {conversations.map(c => (
              <div key={c.id} onClick={() => handleSelectConvo(c.id)}
                style={{ display: "flex", alignItems: "center", justifyContent: "space-between",
                  padding: "8px 10px", borderRadius: "8px", cursor: "pointer",
                  background: c.id === activeId ? "rgba(255,255,255,0.08)" : "transparent", transition: "background 0.15s" }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ margin: 0, fontSize: "13px", color: c.id === activeId ? "#f1f5f9" : "#94a3b8",
                    overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{c.title}</p>
                  <p style={{ margin: "2px 0 0", fontSize: "11px", color: "#475569" }}>{formatDate(c.createdAt)}</p>
                </div>
                <button onClick={(e) => handleDeleteConvo(e, c.id)}
                  style={{ background: "none", border: "none", color: "#475569", cursor: "pointer", padding: "2px", marginLeft: "4px" }}>
                  <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      </aside>

      {/* Main chat */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        {/* Top bar */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "10px 16px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <button onClick={() => setSidebarOpen(o => !o)} style={{ background: "none", border: "none", color: "#94a3b8", cursor: "pointer", padding: "4px" }}>
            <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div style={{ width: "28px", height: "28px", borderRadius: "50%", background: "linear-gradient(135deg, #ec4899, #8b5cf6)",
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px" }}>🎟️</div>
            <div>
              <p style={{ margin: 0, fontSize: "13px", fontWeight: 600, background: "linear-gradient(90deg, #ec4899, #8b5cf6)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>SnapTix AI Assistant</p>
              <p style={{ margin: 0, fontSize: "10px", color: "#22c55e", display: "flex", alignItems: "center", gap: "4px" }}>
                <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#22c55e", display: "inline-block" }} /> Online
              </p>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div ref={scrollContainerRef} style={{ flex: 1, overflowY: "auto", padding: "20px 16px", display: "flex", flexDirection: "column", gap: "16px" }}>
          {messages.map((msg, idx) => (
            <div key={idx} style={{ display: "flex", justifyContent: msg.role === "user" ? "flex-end" : "flex-start" }}>
              {msg.role !== "user" && (
                <div style={{ width: "30px", height: "30px", borderRadius: "50%", flexShrink: 0,
                  background: "linear-gradient(135deg, #ec4899, #8b5cf6)", display: "flex", alignItems: "center",
                  justifyContent: "center", fontSize: "14px", marginRight: "10px", alignSelf: "flex-end" }}>🎟️</div>
              )}
              <div style={{ maxWidth: "75%", display: "flex", flexDirection: "column", gap: "10px" }}>
                {/* Chat bubble */}
                <div style={{
                  padding: "12px 16px",
                  borderRadius: msg.role === "user" ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
                  background: msg.role === "user" ? "linear-gradient(135deg, #ec4899, #8b5cf6)" : "rgba(255,255,255,0.06)",
                  border: msg.role === "user" ? "none" : "1px solid rgba(255,255,255,0.08)",
                  color: "#f1f5f9", fontSize: "14px", lineHeight: "1.6",
                }}>
                  <ReactMarkdown components={{
                    p: ({ children }) => <p style={{ margin: "0 0 4px", lineHeight: 1.6 }}>{children}</p>,
                    strong: ({ children }) => <strong style={{ fontWeight: 700, color: "#fff" }}>{children}</strong>,
                    ol: ({ children }) => <ol style={{ paddingLeft: "16px", margin: "4px 0" }}>{children}</ol>,
                    ul: ({ children }) => <ul style={{ paddingLeft: "16px", margin: "4px 0" }}>{children}</ul>,
                    li: ({ children }) => <li style={{ marginBottom: "2px" }}>{children}</li>,
                  }}>
                    {getDisplayContent(msg, idx)}
                  </ReactMarkdown>
                  {!msg.typed && idx === typingIndex && (
                    <span style={{ display: "inline-block", width: "2px", height: "14px", background: "#ec4899",
                      marginLeft: "2px", verticalAlign: "middle", animation: "cursorPulse 1s infinite" }} />
                  )}
                </div>

                {/* Event cards */}
                {shouldShowEvents(msg) && (
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    <p style={{ margin: 0, fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.08em", color: "#64748b", paddingLeft: "2px" }}>
                      🎫 Matching Events
                    </p>
                    {msg.events.slice(0, 5).map((event, i) => (
                      <EventCard key={i} event={event} onClick={() => router.push("/events/" + event.id)} />
                    ))}
                    {msg.events.length > 5 && (
                      <button onClick={() => router.push("/events")} style={{
                        background: "rgba(236,72,153,0.1)", border: "1px solid rgba(236,72,153,0.3)",
                        borderRadius: "10px", padding: "10px 16px", color: "#f9a8d4",
                        fontSize: "13px", fontWeight: 600, cursor: "pointer", textAlign: "center" }}>
                        Browse {msg.events.length - 5} more events →
                      </button>
                    )}
                  </div>
                )}

                {/* Fallback CTA when no events matched */}
                {msg.typed && msg.role === "system" && msg.events !== undefined && msg.events.length === 0
                  && !msg.content.includes("I can only help with SnapTix") && !msg.content.includes("error") && (
                  <button onClick={() => router.push("/events")} style={{
                    background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.3)",
                    borderRadius: "10px", padding: "10px 16px", color: "#a5b4fc",
                    fontSize: "13px", fontWeight: 600, cursor: "pointer", textAlign: "center" }}>
                    🔍 Browse all events →
                  </button>
                )}
              </div>
            </div>
          ))}

          {isLoading && (
            <div style={{ display: "flex", justifyContent: "flex-start", alignItems: "flex-end", gap: "10px" }}>
              <div style={{ width: "30px", height: "30px", borderRadius: "50%", background: "linear-gradient(135deg, #ec4899, #8b5cf6)",
                display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px" }}>🎟️</div>
              <div style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "18px 18px 18px 4px", padding: "14px 18px", display: "flex", gap: "6px", alignItems: "center" }}>
                {[0, 150, 300].map(delay => (
                  <div key={delay} style={{ width: "7px", height: "7px", borderRadius: "50%",
                    background: "linear-gradient(135deg, #ec4899, #8b5cf6)",
                    animation: "dotBounce 1.2s infinite ease-in-out", animationDelay: delay + "ms" }} />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div style={{ padding: "12px 16px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <div style={{ display: "flex", gap: "10px", maxWidth: "900px", margin: "0 auto" }}>
            <textarea value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={handleKeyDown}
              placeholder="Ask about events, concerts, sports, festivals..." rows={2}
              style={{ flex: 1, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "14px", padding: "12px 16px", color: "#f1f5f9", fontSize: "14px", resize: "none",
                outline: "none", fontFamily: "inherit" }} />
            <button onClick={handleSend} disabled={isLoading || !input.trim() || typingIndex !== null}
              style={{ background: (isLoading || !input.trim() || typingIndex !== null) ? "rgba(255,255,255,0.06)" : "linear-gradient(135deg, #ec4899, #8b5cf6)",
                border: "none", borderRadius: "14px", width: "50px", alignSelf: "flex-end", height: "50px",
                cursor: (isLoading || !input.trim() || typingIndex !== null) ? "not-allowed" : "pointer",
                display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <svg width="18" height="18" fill="currentColor" viewBox="0 0 20 20" style={{ color: "#fff" }}>
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
          <p style={{ textAlign: "center", fontSize: "11px", color: "#334155", marginTop: "8px" }}>SnapTix AI · Powered by Groq</p>
        </div>
      </div>

      <style>{`
        @keyframes dotBounce { 0%, 80%, 100% { transform: translateY(0); } 40% { transform: translateY(-8px); } }
        @keyframes cursorPulse { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 4px; }
      `}</style>
    </main>
  );
}
