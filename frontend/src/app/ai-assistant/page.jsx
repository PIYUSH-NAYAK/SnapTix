"use client";
import { useState, useEffect, useRef } from 'react';
import { askAI } from '../services/chatApi';
import { useRouter } from 'next/navigation';
import ReactMarkdown from 'react-markdown';

const STORAGE_KEY = 'snaptix_conversations';
const TYPEWRITER_SPEED = 18;

const WELCOME_MSG = {
  role: 'system',
  content: "Hi! I'm your SnapTix AI Assistant. I can help you find events, answer questions, and provide recommendations. How can I help you today?",
  typed: true,
};

function newConversation() {
  return {
    id: Date.now().toString(),
    title: 'New Chat',
    createdAt: Date.now(),
    messages: [WELCOME_MSG],
  };
}

function loadConversations() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (_) {}
  return null;
}

function saveConversations(convos) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(convos));
  } catch (_) {}
}

export default function AIAssistant() {
  const router = useRouter();

  const [conversations, setConversations] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [typingIndex, setTypingIndex] = useState(null);
  const [displayedText, setDisplayedText] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const scrollContainerRef = useRef(null);
  const userScrolledUp = useRef(false);
  const hasLoaded = useRef(false);

  // On mount: load past conversations, start a fresh chat
  useEffect(() => {
    const saved = loadConversations();
    const fresh = newConversation();
    if (saved) {
      setConversations([fresh, ...saved]);
    } else {
      setConversations([fresh]);
    }
    setActiveId(fresh.id);
    hasLoaded.current = true;
  }, []);

  // Persist whenever conversations change
  useEffect(() => {
    if (!hasLoaded.current || conversations.length === 0) return;
    // Save all except the current empty new chat (only save if it has user messages)
    const toSave = conversations
      .map(c => ({ ...c, messages: c.messages.map(m => ({ ...m, typed: true })) }))
      .filter(c => c.messages.some(m => m.role === 'user'));
    saveConversations(toSave);
  }, [conversations]);

  const activeConvo = conversations.find(c => c.id === activeId);
  const messages = activeConvo?.messages ?? [];

  const updateMessages = (id, updater) => {
    setConversations(prev =>
      prev.map(c => c.id === id ? { ...c, messages: updater(c.messages) } : c)
    );
  };

  const setTitle = (id, title) => {
    setConversations(prev =>
      prev.map(c => c.id === id ? { ...c, title: title.slice(0, 40) } : c)
    );
  };

  // Typewriter effect
  useEffect(() => {
    if (typingIndex === null || !activeConvo) return;
    const msg = messages[typingIndex];
    if (!msg || msg.typed) return;

    const fullText = msg.content;
    const i = displayedText.length;

    if (i >= fullText.length) {
      updateMessages(activeId, prev =>
        prev.map((m, idx) => idx === typingIndex ? { ...m, typed: true } : m)
      );
      setTypingIndex(null);
      return;
    }

    const timeout = setTimeout(() => {
      setDisplayedText(fullText.slice(0, i + 1));
    }, TYPEWRITER_SPEED);

    return () => clearTimeout(timeout);
  }, [typingIndex, displayedText, messages, activeId]);

  // Detect manual scroll
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const onScroll = () => {
      const dist = container.scrollHeight - container.scrollTop - container.clientHeight;
      userScrolledUp.current = dist > 80;
    };
    container.addEventListener('scroll', onScroll);
    return () => container.removeEventListener('scroll', onScroll);
  }, []);

  // Auto-scroll the chat container — never the page
  useEffect(() => {
    if (userScrolledUp.current) return;
    const container = scrollContainerRef.current;
    if (!container) return;
    container.scrollTo({ top: container.scrollHeight, behavior: 'smooth' });
  }, [messages, isLoading]);

  const buildHistory = (msgs) =>
    msgs
      .filter(m => m.typed && m.role !== 'system')
      .map(m => ({ role: 'user', content: m.content }))
      .concat(
        msgs
          .filter(m => m.typed && m.role === 'system' && m.content !== WELCOME_MSG.content)
          .map(m => ({ role: 'assistant', content: m.content }))
      );

  // Better: preserve order
  const buildOrderedHistory = (msgs) =>
    msgs
      .filter(m => m.typed && m.content !== WELCOME_MSG.content)
      .map(m => ({
        role: m.role === 'user' ? 'user' : 'assistant',
        content: m.content,
      }));

  const handleSend = async () => {
    if (!input.trim() || isLoading || typingIndex !== null || !activeId) return;

    const text = input.trim();
    const userMsg = { role: 'user', content: text, typed: true };
    userScrolledUp.current = false;

    // Set title from first user message
    if (!messages.some(m => m.role === 'user')) {
      setTitle(activeId, text);
    }

    updateMessages(activeId, prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const history = buildOrderedHistory(messages);
      const result = await askAI(text, history);

      const replyContent = result.success
        ? result.reply
        : "I'm sorry, I encountered an error processing your request.";

      const aiMsg = {
        role: 'system',
        content: replyContent,
        events: result.success ? result.events : [],
        typed: false,
      };

      updateMessages(activeId, prev => {
        const updated = [...prev, aiMsg];
        setTypingIndex(updated.length - 1);
        setDisplayedText('');
        return updated;
      });
    } catch (err) {
      console.error(err);
      updateMessages(activeId, prev => [...prev, {
        role: 'system',
        content: "I'm sorry, I encountered an error processing your request.",
        typed: true,
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

  const handleNewChat = () => {
    const fresh = newConversation();
    setConversations(prev => [fresh, ...prev]);
    setActiveId(fresh.id);
    setTypingIndex(null);
    setDisplayedText('');
    userScrolledUp.current = false;
  };

  const handleSelectConvo = (id) => {
    setActiveId(id);
    setTypingIndex(null);
    setDisplayedText('');
    userScrolledUp.current = false;
  };

  const handleDeleteConvo = (e, id) => {
    e.stopPropagation();
    setConversations(prev => {
      const filtered = prev.filter(c => c.id !== id);
      if (id === activeId) {
        const next = filtered[0] ?? newConversation();
        if (filtered.length === 0) {
          setActiveId(next.id);
          return [next];
        }
        setActiveId(filtered[0].id);
      }
      return filtered;
    });
  };

  const shouldShowEvents = (msg) =>
    msg.typed && msg.events?.length > 0 && !msg.content.includes('I can only help with SnapTix');

  const getDisplayContent = (msg, idx) =>
    !msg.typed && idx === typingIndex ? displayedText : msg.content;

  const formatDate = (ts) => {
    const d = new Date(ts);
    return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
  };

  return (
    <main className="flex bg-gradient-to-br from-gray-900 to-black text-white" style={{ position: 'fixed', top: '64px', left: 0, right: 0, bottom: 0 }}>

      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-0'} flex-shrink-0 transition-all duration-300 overflow-hidden border-r border-gray-700/50 flex flex-col bg-gray-900/80`}>
        <div className="p-3 flex flex-col h-full">
          <button
            onClick={handleNewChat}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg bg-pink-600 hover:bg-pink-700 transition text-sm font-medium mb-3"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            New Chat
          </button>

          <p className="text-xs text-gray-500 px-1 mb-2 uppercase tracking-wider">History</p>

          <div className="flex-1 overflow-y-auto space-y-1">
            {conversations.map(c => (
              <div
                key={c.id}
                onClick={() => handleSelectConvo(c.id)}
                className={`group flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer transition text-sm ${
                  c.id === activeId
                    ? 'bg-gray-700 text-white'
                    : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                }`}
              >
                <div className="flex-1 min-w-0">
                  <p className="truncate">{c.title}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{formatDate(c.createdAt)}</p>
                </div>
                <button
                  onClick={(e) => handleDeleteConvo(e, c.id)}
                  className="ml-1 opacity-0 group-hover:opacity-100 text-gray-500 hover:text-red-400 transition"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      </aside>

      {/* Main chat */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <div className="flex items-center gap-3 px-4 py-2 border-b border-gray-700/50">
          <button
            onClick={() => setSidebarOpen(o => !o)}
            className="text-gray-400 hover:text-white transition"
            title="Toggle sidebar"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <h1 className="text-sm font-semibold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
            {activeConvo?.title ?? 'AI Event Assistant'}
          </h1>
        </div>

        {/* Messages */}
        <div ref={scrollContainerRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                msg.role === 'user' ? 'bg-pink-600 text-white' : 'bg-gray-700 text-white'
              }`}>
                <div className="prose prose-invert prose-sm max-w-none">
                  <ReactMarkdown
                    components={{
                      p: ({ children }) => <p className="mb-1 last:mb-0">{children}</p>,
                      strong: ({ children }) => <strong className="font-semibold text-white">{children}</strong>,
                      ol: ({ children }) => <ol className="list-decimal list-inside space-y-1 mt-1">{children}</ol>,
                      ul: ({ children }) => <ul className="list-disc list-inside space-y-1 mt-1">{children}</ul>,
                      li: ({ children }) => <li className="leading-snug">{children}</li>,
                    }}
                  >
                    {getDisplayContent(msg, idx)}
                  </ReactMarkdown>
                  {!msg.typed && idx === typingIndex && (
                    <span className="inline-block w-0.5 h-4 bg-pink-400 ml-0.5 animate-pulse align-middle" />
                  )}
                </div>

                {shouldShowEvents(msg) && (
                  <div className="mt-4 border-t border-gray-600 pt-3">
                    <p className="font-medium mb-2 text-sm">Recommended Events:</p>
                    <div className="space-y-2">
                      {msg.events.slice(0, 3).map((event, i) => (
                        <div
                          key={i}
                          onClick={() => router.push(`/events/${event.id}`)}
                          className="bg-gray-800 p-3 rounded-lg cursor-pointer hover:bg-gray-700 transition"
                        >
                          <p className="font-medium text-sm">{event.title}</p>
                          <div className="flex justify-between text-xs text-gray-400 mt-1">
                            <span>{event.date}</span>
                            <span>{event.location}</span>
                          </div>
                        </div>
                      ))}
                      {msg.events.length > 3 && (
                        <button
                          onClick={() => router.push('/events')}
                          className="text-pink-400 hover:text-pink-300 text-xs mt-1"
                        >
                          View {msg.events.length - 3} more events →
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
              <div className="bg-gray-700 rounded-2xl px-4 py-3 flex items-center gap-3">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
                <span className="text-sm text-gray-400">Thinking...</span>
              </div>
            </div>
          )}

        </div>

        {/* Input */}
        <div className="px-4 py-3 border-t border-gray-700/50">
          <div className="flex gap-2 max-w-4xl mx-auto">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about events, concerts, shows..."
              className="flex-1 bg-gray-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500 resize-none text-sm"
              rows={2}
            />
            <button
              onClick={handleSend}
              disabled={isLoading || !input.trim() || typingIndex !== null}
              className="bg-pink-600 hover:bg-pink-700 disabled:bg-gray-600 text-white rounded-xl px-5 self-end h-[46px] flex items-center justify-center transition"
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
