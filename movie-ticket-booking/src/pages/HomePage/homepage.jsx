import React, { useState, useEffect } from 'react';
import '../../tailwind.css';
import { useNavigate } from 'react-router-dom'; 
import Navbar from '../../components/NavBar/navbar';

const Homepage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTrailer, setSelectedTrailer] = useState('');

  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/movies');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setMovies(data || []);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading) return <div className="text-center text-lg text-blue-500">Loading...</div>;
  if (error) return <div className="text-center text-lg text-red-500">Error: {error}</div>;

  const handleBookTickets = (movieTitle) => {
    navigate(`/movie/${movieTitle}`); 
  };

  return (
    <div className="min-h-screen bg-[#1f1f2d] p-5">
      <Navbar />
      <h1 className="text-5xl font-bold text-center text-white mb-8 font-sans tracking-wide uppercase">
        Welcome to Galaxy Cinema
      </h1>
      <div className="flex justify-center">
        <img src="./carousel3.png" alt="carousel" className="w-256 h-128 mx-auto" />
      </div>

      <div className="container mx-auto">
        <h2 className="text-3xl font-semibold text-white mb-4 font-mono">NOW SHOWING</h2>
        <ul className="space-y-4">
          {movies.map((movie) => (
            <li
              key={movie._id}
              className="flex items-center bg-white bg-opacity-60 shadow-lg rounded-lg overflow-hidden p-4"
            >
              <img
                src={movie.posterURL}
                alt={movie.title}
                className="w-36 h-50 object-cover rounded-lg mr-4"
              />

              <div className="flex-grow">
                <h2 className="text-2xl font-bold text-gray-800">{movie.title}</h2>
                <p className="text-xl text-gray-700">Duration: {movie.duration}</p>
                <p className="text-lg text-gray-700">{movie.genre}</p>
                
                <div className="mt-2 flex space-x-2">
                  {Array.isArray(movie.showtimes) &&
                    movie.showtimes.map((time, index) => (
                      <span
                        key={index}
                        className="text-base font-semibold bg-gray-200 text-gray-800 px-2 py-1 rounded-lg"
                      >
                        {time}
                      </span>
                    ))}
                </div>
              </div>

              <button
                className="ml-4 bg-gray-800 text-white text-base font-semibold py-2 px-4 rounded-lg hover:bg-gray-600"
                onClick={() => handleBookTickets(movie.title)}
              >
                BOOK TICKETS
              </button>

              <button
                className="ml-4 bg-gray-800 text-white text-base font-semibold py-2 px-4 rounded-lg hover:bg-gray-600"
                onClick={() => setSelectedTrailer(movie.trailerURL)}
              >
                PLAY TRAILER
              </button>

              {selectedTrailer && (
                <div className="modal bg-gray-700 bg-opacity-30 fixed inset-0 flex items-center justify-center z-50">
                  <iframe
                    width="800"
                    height="450"
                    src={`https://www.youtube.com/embed/${selectedTrailer}?rel=0`}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  ></iframe>
                  <button
                    className="absolute top-5 right-5 text-black font-sans font-bold bg-white px-4 py-2 rounded-lg hover:bg-gray-300"
                    onClick={() => setSelectedTrailer(null)}
                  >
                    Close
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Homepage;
