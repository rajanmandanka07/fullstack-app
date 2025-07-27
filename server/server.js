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

app.get('/api/name', (req, res) => {
  console.log('API called - NAME:', process.env.NAME);
  res.json({ name: process.env.NAME || 'DefaultName' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});