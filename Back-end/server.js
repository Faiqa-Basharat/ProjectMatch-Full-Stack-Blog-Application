require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Allowed website addresses (comma-separated). If FRONTEND_URL is not set, any site may call the API.
const allowed = (process.env.FRONTEND_URL || '').split(',').map(s => s.trim()).filter(Boolean);
app.use(cors({ origin: allowed.length ? allowed : true }));
app.use(express.json());

// Connect once and reuse the connection (needed on Vercel, harmless locally)
let connection = null;
function connectDB() {
  if (!connection) connection = mongoose.connect(process.env.MONGO_URI);
  return connection;
}
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    connection = null;
    console.error('DB connection failed:', err.message);
    res.status(500).json({ message: 'Database connection failed.' });
  }
});

app.get('/', (req, res) => res.send('ProjectMatch API is running'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/blogs', require('./routes/blogs'));

// Running on your computer: start the server. On Vercel the exported app is used instead.
if (require.main === module) {
  const port = process.env.PORT || 5000;
  connectDB()
    .then(() => {
      console.log('MongoDB connected');
      app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
    })
    .catch(err => console.error('DB connection failed:', err.message));
}

module.exports = app;
