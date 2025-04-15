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

// Get event by ID
router.get('/events/:id', (req, res) => {
  const event = eventCache.find(e => e.id === req.params.id);
  if (!event) {
    return res.status(404).json({ success: false, message: "Event not found" });
  }
  res.json({ success: true, data: event });
});

module.exports = router;