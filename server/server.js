const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

// Clear any existing env vars and reload
delete process.env.NAME;
dotenv.config();

console.log('=== Environment Debug ===');
console.log('NAME from env:', process.env.NAME);
console.log('All env vars:', Object.keys(process.env).filter(key => key.includes('NAME')));
console.log('=========================');

const app = express();
app.use(cors());

// Keep track of server stats
let serverStats = {
  startTime: new Date(),
  keepAliveCount: 0,
  lastKeepAlive: null
};

// Existing name endpoint
app.get('/api/name', (req, res) => {
  console.log('API called - NAME:', process.env.NAME);
  res.json({ name: process.env.NAME || 'DefaultName' });
});

// Keep-alive endpoint to prevent Render free tier from sleeping
app.get('/api/keepalive', (req, res) => {
  serverStats.keepAliveCount++;
  serverStats.lastKeepAlive = new Date();
  
  console.log(`Keep-alive ping #${serverStats.keepAliveCount} at ${serverStats.lastKeepAlive.toISOString()}`);
  
  res.json({
    status: 'alive',
    message: 'Server is running',
    timestamp: serverStats.lastKeepAlive,
    uptime: Math.floor((Date.now() - serverStats.startTime) / 1000), // uptime in seconds
    keepAliveCount: serverStats.keepAliveCount
  });
});

// Health check endpoint (optional, useful for monitoring)
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    uptime: Math.floor((Date.now() - serverStats.startTime) / 1000),
    startTime: serverStats.startTime,
    lastKeepAlive: serverStats.lastKeepAlive,
    keepAliveCount: serverStats.keepAliveCount,
    memoryUsage: process.memoryUsage(),
    nodeVersion: process.version
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Server is running',
    endpoints: {
      name: '/api/name',
      keepalive: '/api/keepalive',
      health: '/api/health'
    }
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Keep-alive endpoint available at: /api/keepalive`);
});