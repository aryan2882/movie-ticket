import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function BookTicketsPage() {
  const { movieTitle } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedShowtime, setSelectedShowtime] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/movies`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();

        const selectedMovie = data.find((movie) => movie.title === movieTitle);

        if (selectedMovie) {
          setMovie(selectedMovie);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [movieTitle]);

  const seatselect = () => {
    navigate(`/movie/${movieTitle}/seatselection`, {
      state: {
        movieTitle: movie.title,
        selectedShowtime,
        selectedDate,
      },
    });
  };

  if (loading) {
    return <p className="text-center text-white">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">Error: {error}</p>;
  }

  if (!movie) {
    return <p className="text-center text-gray-300">Movie not found</p>;
  }

  return (
    <div className="min-h-screen bg-[#1f1f2d] text-white p-8 flex flex-col md:flex-row space-y-8 md:space-y-0 md:space-x-8">
      {/* Poster */}
      <div className="md:w-1/3 bg-gray-800 rounded-lg shadow-lg p-6">
        <img
          src={movie.posterURL}
          alt={movie.title}
          className="w-144 h-256 object-cover rounded-lg mb-4"
        />
      </div>

      {/* Movie Info */}
      <div className="md:w-1/3 bg-gray-800 rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold mb-2">{movie.title}</h1>
        <p className="text-gray-400 mb-1">{movie.duration}</p>
        <p className="text-gray-400 mb-8">{movie.genre}</p>
        <p className="text-white-400">{movie.description}</p>
      </div>

      {/* Booking Panel */}
      <div className="md:w-1/3 bg-gray-800 rounded-lg shadow-lg p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2">Select Show Time</h2>
          <div className="mt-2 flex space-x-2 cursor-pointer mb-6">
            <span
              onClick={() => setSelectedShowtime(movie.schedule?.showtime)}
              className={`text-base font-semibold px-2 py-1 rounded-lg ${
                selectedShowtime === movie.schedule?.showtime
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-800'
              }`}
            >
              {movie.schedule?.showtime || 'No Showtime'}
            </span>
          </div>

          <h2 className="text-2xl font-bold mb-2">Select a Date</h2>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-full px-4 py-2 border rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          onClick={seatselect}
          className="w-full py-2 px-4 mt-4 text-white font-bold rounded-md bg-green-600 hover:bg-green-800"
        >
          Go for Seat Selection
        </button>
      </div>
    </div>
  );
}

export default BookTicketsPage;
