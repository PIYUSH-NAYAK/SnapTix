const Groq = require("groq-sdk");
require('dotenv').config();

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const fetchGroqResponse = async (userInput) => {
  try {
    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `You are an AI assistant for SnapTix, an event discovery service.
          Parse user queries about events and extract structured data.
          You should extract the following attributes if mentioned (leave empty if not specified):
          - eventType: What kind of event (concert, festival, movie, sports, etc.)
          - artist: Performer name if mentioned
          - genre: Music/performance genre if mentioned
          - location: Where the event takes place
          - date: When the event takes place (can be specific date or timeframe)
          
          First provide a helpful response about events matching their criteria.
          Then output a JSON object with the extracted parameters in this format:
          { "eventType": "", "artist": "", "genre": "", "location": "", "date": "" }`
        },
        {
          role: "user",
          content: userInput
        },
      ],
      model: "llama3-70b-8192",
      temperature: 0.5,
      max_tokens: 800,
    });
  
    return completion.choices[0]?.message?.content?.trim() || '';
  } catch (error) {
    console.error("Error calling Groq API:", error);
    throw new Error(`Groq API error: ${error.message}`);
  }
};

module.exports = { fetchGroqResponse };