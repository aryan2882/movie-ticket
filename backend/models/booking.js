const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  movieTitle: { type: String, required: true },
  selectedDate: { type: String, required: true },
  seats: [Number],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Booking', BookingSchema);
