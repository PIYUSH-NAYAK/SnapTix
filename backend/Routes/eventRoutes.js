const express = require('express');
const router = express.Router();
const { eventCache } = require('../Service/eventCache');

// Get all events
router.get('/events', (req, res) => {
  res.json({
    success: true,
    count: eventCache.length,
    data: eventCache
  });
});

// Search events by criteria
router.get('/events/search', (req, res) => {
  try {
    const { type, location, artist, genre, date } = req.query;
    let filteredEvents = [...eventCache];
    
    // Apply filters
    if (type) filteredEvents = filteredEvents.filter(event => 
      event.type?.toLowerCase().includes(type.toLowerCase())
    );
    if (location) filteredEvents = filteredEvents.filter(event => 
      event.location?.toLowerCase().includes(location.toLowerCase())
    );
    if (artist) filteredEvents = filteredEvents.filter(event => 
      event.artist?.toLowerCase().includes(artist.toLowerCase())
    );
    if (genre) filteredEvents = filteredEvents.filter(event => 
      event.genre?.toLowerCase().includes(genre.toLowerCase())
    );
    if (date) filteredEvents = filteredEvents.filter(event => 
      event.date?.includes(date)
    );
    
    res.json({
      success: true,
      count: filteredEvents.length,
      data: filteredEvents
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});
// Add this new route for suggested events

// Get suggested events based on an event ID
router.get('/events/suggested', (req, res) => {
  try {
    const { id } = req.query;
    
    if (!id) {
      return res.status(400).json({
        success: false,
        message: 'Event ID is required'
      });
    }
    
    const currentEvent = eventCache.find(event => event.id === id);
    
    if (!currentEvent) {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }
    
    // Find events with the same genre or similar tags
    let suggestedEvents = eventCache.filter(event => 
      event.id !== id && 
      (event.genre === currentEvent.genre || 
       (event.tags && currentEvent.tags && 
        event.tags.some(tag => currentEvent.tags.includes(tag))))
    );
    
    // Limit to 3 suggestions
    suggestedEvents = suggestedEvents.slice(0, 3);
    
    res.json({
      success: true,
      data: suggestedEvents
    });
    
  } catch (error) {
    console.error('Error getting suggested events:', error);
    res.status(500).json({
      success: false,
      message: 'Error getting suggested events',
      error: error.message
    });
  }
});

// Get event by ID
// This should be in your backend/Routes/eventRoutes.js
router.get('/events/:id', (req, res) => {
  const { id } = req.params;
  const event = eventCache.find(e => e.id === id);

  if (!event) {
    return res.status(404).json({
      success: false,
      message: 'Event not found'
    });
  }

  res.json({
    success: true,
    data: event
  });
});

module.exports = router;