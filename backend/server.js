require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./db');
const groqRoutes = require('./Routes/groqRoutes');
const eventRoutes = require('./Routes/eventRoutes');
const authRoutes = require('./Routes/authRoutes');
const startFluvioConsumer = require('./Service/consumeEvents');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/api', groqRoutes);
app.use('/api', eventRoutes);
app.use('/api', authRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'SnapTix API', timestamp: new Date().toISOString() });
});

async function startServer() {
  await connectDB();
  try {
    await startFluvioConsumer();
  } catch (err) {
    console.warn('Fluvio unavailable, using mock data');
  }
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
