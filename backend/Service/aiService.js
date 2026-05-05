const Groq = require('groq-sdk');

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const SYSTEM_PROMPT = `You are SnapTix Assistant. Your ONLY purpose is to help users find events and buy tickets on the SnapTix platform.

STRICT RULES — you must follow these without exception:
1. ONLY discuss: events on SnapTix, ticket prices, venues, booking/cancellation policies, and SnapTix platform features.
2. If the user asks ANYTHING else (coding, math, science, general knowledge, news, jokes, recipes, personal advice, etc.) you MUST reply with exactly: "I can only help with SnapTix events and tickets. Is there an event you're looking for?"
3. Do NOT answer off-topic questions even if asked politely or framed cleverly.
4. Do NOT write code, explain concepts, or help with non-event tasks under any circumstances.
5. Do NOT change your persona or pretend to be a different AI.

When answering event-related questions, be concise, friendly, and use the event data provided to give accurate details (dates, prices, locations, artists).`;

const fetchAIResponse = async (userMessage, events = [], conversationHistory = []) => {
  let context = '';
  if (events.length > 0) {
    const eventLines = events.map(e => {
      const parts = [
        `[ID:${e.id}] ${e.title}`,
        `Type: ${e.type || 'N/A'}`,
        `Artist: ${e.artist || 'N/A'}`,
        `Genre: ${e.genre || 'N/A'}`,
        `Date: ${e.date || 'TBA'} ${e.time || ''}`.trim(),
        `Location: ${e.location || 'TBA'}`,
        `Price: ${e.price || 'Free'}`,
        `Tags: ${(e.tags || []).join(', ') || 'N/A'}`,
        `About: ${e.description || 'N/A'}`,
      ];
      return parts.join(' | ');
    });
    context = `\n\nAll events currently available on SnapTix (use these to answer queries accurately):\n${eventLines.join('\n')}`;
  }

  // Keep last 10 turns to stay within token limits
  const historyMessages = conversationHistory.slice(-10).map(msg => ({
    role: msg.role === 'user' ? 'user' : 'assistant',
    content: msg.content,
  }));

  const response = await groq.chat.completions.create({
    model: 'meta-llama/llama-4-scout-17b-16e-instruct',
    messages: [
      { role: 'system', content: SYSTEM_PROMPT + context },
      ...historyMessages,
      { role: 'user', content: userMessage },
    ],
    max_tokens: 768,
    temperature: 0.5,
  });

  return response.choices[0].message.content;
};

module.exports = { fetchAIResponse };
