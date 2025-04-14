const Groq = require("groq-sdk");
const dotenv = require("dotenv");

dotenv.config();

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const fetchEventData = async (userInput) => {
    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are an event assistant. Respond in a clear format, using bullet points or simple lines for each event, with the name, date, and venue clearly mentioned.",
        },
        {
          role: "user",
          content: `${userInput}\n\nPlease list the events as bullet points, with the name, date, and venue clearly separated.`,
        // content : `${userInput}`
        },
      ],
      model: "llama3-70b-8192",
      temperature: 0.7,
      max_tokens: 1024,
    });
  
    const response = completion.choices[0]?.message?.content?.trim();
    if (!response) {
      return [];
    }
  
    const events = parseEventResponse(response);
    return events;
};

const parseEventResponse = (response) => {
    const eventSections = response.split("\n\n");
  
    const events = eventSections.map(event => {
      const lines = event.split("\n").map(line => line.trim()).filter(line => line.length > 0);
  
      if (lines.length < 2) {
        return null;
      }
  
      const nameLine = lines[0];
      const dateLine = lines[1];
      const venueLine = lines[2] || '';

      const name = nameLine.replace(/^•\s*/, "").trim();
      const date = dateLine.replace(/^Date:\s*/, "").trim();
      const venue = venueLine.replace(/^Venue:\s*/, "").trim();
  
      const eventObj = { name, date, venue: venue || "Venue information not available" };
  
      return eventObj;
    }).filter(event => event !== null);
  
    return events;
};

module.exports = { fetchEventData };

