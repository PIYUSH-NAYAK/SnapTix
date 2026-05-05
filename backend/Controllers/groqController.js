const { fetchAIResponse } = require('../Service/aiService');
const { eventCache } = require('../Service/eventCache');

// Controller function to handle user input and Groq API interaction
const getEventDetails = async (req, res) => {
  const userQuery = req.body.query;
  const conversationHistory = req.body.history || [];

  if (!userQuery) {
    return res.status(400).json({
      success: false,
      message: 'No query provided'
    });
  }

  try {
    // Get AI response from Groq
    const groqResponse = await fetchAIResponse(userQuery, eventCache, conversationHistory);

    // If the AI refused the query as off-topic, return no events
    const isOffTopic = groqResponse.includes('I can only help with SnapTix events and tickets');
    if (isOffTopic) {
      return res.json({ success: true, reply: groqResponse, parsed: {}, events: [] });
    }

    // Extract structured data from the response
    const parsedData = parseGroqResponse(groqResponse);

    // Filter events based on the parsed data
    const matchedEvents = filterEvents(parsedData);

    res.json({
      success: true,
      reply: groqResponse,
      parsed: parsedData,
      events: matchedEvents
    });
  } catch (error) {
    console.error('Error processing query:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error processing your request',
      error: error.message
    });
  }
};

// Helper function to parse Groq response
function parseGroqResponse(response) {
  // Try to extract JSON from the response
  try {
    const jsonMatch = response.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
  } catch (err) {
    console.error('Error parsing intent JSON:', err);
  }
  
  // If no JSON found or parsing failed, extract what we can
  return {
    eventType: extractAttribute(response, 'type', ['concert', 'festival', 'sports', 'movie']),
    artist: extractAttribute(response, 'artist'),
    location: extractAttribute(response, 'location', ['Delhi', 'Mumbai', 'Bengaluru', 'Ahmedabad']),
    date: extractAttribute(response, 'date'),
    genre: extractAttribute(response, 'genre')
  };
}

// Helper function to extract attributes
function extractAttribute(text, attr, possibleValues = []) {
  const regex = new RegExp(`${attr}[:\\s]+([^,\n"{}]+)`, 'i');
  const match = text.match(regex);
  
  if (match && match[1]) return match[1];
  
  // If we have possible values, check if any appear in the text
  if (possibleValues.length > 0) {
    for (const value of possibleValues) {
      if (text.toLowerCase().includes(value.toLowerCase())) {
        return value;
      }
    }
  }
  
  return '';
}

// Helper function to filter events
function filterEvents(criteria) {
  const hasCriteria = criteria.eventType || criteria.location || criteria.artist || criteria.genre || criteria.date;

  // No meaningful criteria extracted — don't dump all events
  if (!hasCriteria) return [];

  let filteredEvents = [...eventCache];

  if (criteria.eventType) {
    filteredEvents = filteredEvents.filter(event =>
      event.type?.toLowerCase().includes(criteria.eventType.toLowerCase())
    );
  }

  if (criteria.location) {
    filteredEvents = filteredEvents.filter(event =>
      event.location?.toLowerCase().includes(criteria.location.toLowerCase())
    );
  }

  if (criteria.artist) {
    filteredEvents = filteredEvents.filter(event =>
      event.artist?.toLowerCase().includes(criteria.artist.toLowerCase())
    );
  }

  if (criteria.genre) {
    filteredEvents = filteredEvents.filter(event =>
      event.genre?.toLowerCase().includes(criteria.genre.toLowerCase())
    );
  }

  if (criteria.date) {
    filteredEvents = filteredEvents.filter(event =>
      event.date?.includes(criteria.date)
    );
  }

  return filteredEvents;
}

module.exports = { getEventDetails };