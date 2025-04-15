import express from 'express';
import cors from 'cors';

// Export the cache so it can be accessed by consumeEvents.js
export const eventCache = [];

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(express.json());
app.use(cors());

// API endpoint to return all events
app.get('/api/events', (req, res) => {
  res.json({
    success: true,
    count: eventCache.length,
    data: eventCache
  });
});

// API endpoint to return events filtered by query parameters
app.get('/api/events/search', (req, res) => {
  try {
    const { type, location, artist, genre, date } = req.query;
    let filteredEvents = [...eventCache];
    
    // Apply filters if parameters are provided
    if (type) {
      filteredEvents = filteredEvents.filter(event => 
        event.type?.toLowerCase().includes(type.toLowerCase())
      );
    }
    
    if (location) {
      filteredEvents = filteredEvents.filter(event => 
        event.location?.toLowerCase().includes(location.toLowerCase())
      );
    }
    
    if (artist) {
      filteredEvents = filteredEvents.filter(event => 
        event.artist?.toLowerCase().includes(artist.toLowerCase())
      );
    }
    
    if (genre) {
      filteredEvents = filteredEvents.filter(event => 
        event.genre?.toLowerCase().includes(genre.toLowerCase())
      );
    }
    
    if (date) {
      filteredEvents = filteredEvents.filter(event => 
        event.date?.includes(date)
      );
    }
    
    res.json({
      success: true,
      count: filteredEvents.length,
      data: filteredEvents
    });
  } catch (error) {
    console.error("Error searching events:", error);
    res.status(500).json({
      success: false,
      message: "Error searching events",
      error: error.message
    });
  }
});

// API endpoint to return a single event by ID
app.get('/api/events/:id', (req, res) => {
  const event = eventCache.find(e => e.id === req.params.id);
  
  if (!event) {
    return res.status(404).json({
      success: false,
      message: "Event not found"
    });
  }
  
  res.json({
    success: true,
    data: event
  });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    eventsLoaded: eventCache.length
  });
});

// Export the app so it can be started by server.js
export default app;