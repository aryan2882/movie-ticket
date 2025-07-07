const express = require('express');
const Booking = require('../models/Booking');
const router = express.Router();
const mongoose = require('mongoose');

function createObjectId(id) {
  try {
    return new mongoose.Types.ObjectId(id);
  } catch {
    return id;
  }
}

// 📌 Create Booking
router.post('/', async (req, res) => {
  try {
    const { userId, movieTitle, selectedDate, seats } = req.body;

    // Basic validations
    if (!userId || !movieTitle || !selectedDate || !Array.isArray(seats) || seats.length === 0) {
      return res.status(400).json({ 
        message: 'Missing required fields',
        error: 'userId, movieTitle, selectedDate, and seats are required'
      });
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        message: 'Invalid userId format',
        error: 'userId must be a valid ObjectId'
      });
    }

    const booking = new Booking({
      userId: createObjectId(userId),
      movieTitle,
      selectedDate,
      seats,
    });

    await booking.save();
    res.status(201).json({ message: 'Booking successful', booking });

  } catch (err) {
    console.error('Booking Error:', err.message);
    res.status(500).json({ message: 'Booking failed', error: err.message });
  }
});

// 📌 Get bookings by user
router.get('/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        message: 'Invalid userId format'
      });
    }

    const bookings = await Booking.find({ userId: createObjectId(userId) });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: 'Fetch failed', error: err.message });
  }
});

// 📌 Cancel booking
router.delete('/:bookingId', async (req, res) => {
  try {
    const { bookingId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(bookingId)) {
      return res.status(400).json({ message: 'Invalid bookingId' });
    }

    const deleted = await Booking.findByIdAndDelete(bookingId);
    if (!deleted) return res.status(404).json({ message: 'Booking not found' });

    res.json({ message: 'Booking cancelled', booking: deleted });
  } catch (err) {
    res.status(500).json({ message: 'Cancel failed', error: err.message });
  }
});

module.exports = router;
