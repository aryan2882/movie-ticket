const mongoose = require('mongoose');

// Seat Schema
const seatSchema = new mongoose.Schema({
  row: { type: String, required: true },
  number: { type: Number, required: true },
  status: { type: String, enum: ['available', 'taken'], default: 'available' },
  type: { type: String, enum: ['Regular', 'Comfort', 'VIP'], required: true }
});



// Movie Schema
const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  duration: { type: String, required: true },
  genre: { type: String, required: true },
  premiereDate: { type: Date, required: true },
  posterURL: { type: String, required: true },
  description: { type: String, required: true },
  trailerURL : { type: String, required: true },
  schedule : {
    date: { type: String, required: true },
      showtime: { type: String, required: true },
      seats: [{ type: Number }]
  }           
});

module.exports = mongoose.model('Movie', movieSchema);