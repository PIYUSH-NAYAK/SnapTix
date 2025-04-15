require('dotenv').config();
const express = require('express');
const cors = require('cors');
const groqRoutes = require('./Routes/groqRoutes');
const eventRoutes = require('./Routes/eventRoutes');
const startFluvioConsumer = require('./Service/consumeEvents');

// Create Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// API Routes
app.use('/api', groqRoutes);
app.use('/api', eventRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok',
    service: 'SnapTix API',
    timestamp: new Date().toISOString()
  });
});

// Start Fluvio consumer and server
async function startServer() {
  try {
    // Start the Fluvio consumer
    await startFluvioConsumer();
    
    // Start the server
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log('Available endpoints:');
      console.log('  - POST /api/groq (AI event query)');
      console.log('  - GET /api/events (all events)');
      console.log('  - GET /api/events/search (filtered events)');
      console.log('  - GET /api/events/:id (single event)');
    });
  } catch (error) {
    console.error("Failed to start server:", error);
  }
}

startServer();