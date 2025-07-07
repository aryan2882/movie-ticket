const express = require('express');
const Movie = require('../models/Movie');
const router = express.Router();
//const {SendMovieSeatsSelection} = require("../controllers/MovieController");

//router.post(`/movie/${movieTitle}/seatselection`, SendMovieSeatsSelection);
router.post('/', async (req, res) => {
  console.log("Incoming POST body:", req.body); // 🐞 Log it!

  try {
    const newMovie = new Movie(req.body);
    await newMovie.save();
    res.status(201).json({ message: '✅ Movie added successfully', movie: newMovie });
  } catch (error) {
    console.error('Error adding movie:', error);
    res.status(500).json({ message: '❌ Error adding movie', error: error.message });
  }
});
// DELETE /api/movies/cleanup/inception
router.delete('/cleanup/inception', async (req, res) => {
  try {
    const result = await Movie.deleteMany({ title: "Inception" });
    res.json({ message: `🧹 Deleted ${result.deletedCount} duplicates of "Inception"` });
  } catch (error) {
    console.error("Error during cleanup:", error);
    res.status(500).json({ message: "❌ Cleanup failed", error: error.message });
  }
});


router.get('/', async (req, res) => {
    try {
      const movies = await Movie.find(); 
      res.json(movies); 
    } catch (error) {
      console.error(error); 
      res.status(500).json({ message: 'Server error', error: error.message });
    }
});

router.get('/movie/:movieTitle', async (req, res) => {
  const movieTitle = req.params.movieTitle;
  try {
    const movie = await Movie.findOne({ title: { $regex: new RegExp(`^${movieTitle}$`, 'i') } });
    
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }
    
    res.json(movie);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get('/movie/:movieTitle/seatselection', async (req, res) => {
  const movieTitle = req.params.movieTitle;
  try {
    const movie = await Movie.findOne({ title: { $regex: new RegExp(`^${movieTitle}$`, 'i') } });
    
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }
    
    res.json(movie);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});




module.exports = router;