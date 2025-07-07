/*const asyncHandler = require('express-async-handler')
const User = require('../models/Movie')

const SendMovieSeatsSelection = asyncHandler(async(req,res)=>{
    const { movieTitle } = req.params;
  const { date, showtime, seats } = req.body;

  console.log("Request data:", { movieTitle, date, showtime, seats }); // Debugging logs

  // Validate input
  if (!date || !showtime || !Array.isArray(seats)) {
    res.status(400);
    throw new Error("Invalid input data");
  }

  try {
    // Find the movie by title
    const movie = await Movie.findOne({
      title: { $regex: new RegExp(`^${movieTitle}$`, 'i') }, // Case-insensitive search
    });

    if (!movie) {
      res.status(404);
      throw new Error(`Movie "${movieTitle}" not found`);
    }

    // Check if the schedule for the given date and showtime exists
    let schedule = movie.schedule.find(
      (sch) => sch.date === date && sch.showtime === showtime
    );

    if (schedule) {
      // Merge seats, removing duplicates
      schedule.seats = Array.from(new Set([...schedule.seats, ...seats]));
    } else {
      // Add a new schedule entry
      movie.schedule.push({ date, showtime, seats });
    }

    // Save the updated movie document
    await movie.save();

    res.status(200).json({
      message: "Seat selection updated successfully",
      schedule: movie.schedule,
    });
  } catch (error) {
    console.error("Error updating schedule:", error);
    res.status(500);
    throw new Error("Server error");
  }

})

module.exports={
    SendMovieSeatsSelection,
}*/

