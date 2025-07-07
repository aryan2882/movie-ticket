const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require("cookie-parser");

// Import all routes at the top for better organization
const movieRoutes = require('./routes/movieRoutes');
const authRoutes = require('./routes/authRoutes');
const bookingRoutes = require('./routes/bookings');

require('dotenv').config();
const app = express();

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());

// Database connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log(" MongoDB Atlas connected"))
  .catch(err => console.error("MongoDB connection error:", err));

// Health check route - Essential for deployment platforms
app.get('/', (req, res) => {
  res.json({ 
    message: 'Movie Ticket Booking API is running!',
    status: 'healthy',
    timestamp: new Date().toISOString()
  });
});

// API routes
app.use('/api/movies', movieRoutes);
app.use('/api/user', authRoutes);
app.use('/api/bookings', bookingRoutes);

// Server configuration - CRITICAL CHANGE: Added '0.0.0.0' for Render deployment
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`Server bound to 0.0.0.0:${PORT}`);
});

// Graceful shutdown handling
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  mongoose.connection.close(() => {
    console.log('MongoDB connection closed');
    process.exit(0);
  });
});
