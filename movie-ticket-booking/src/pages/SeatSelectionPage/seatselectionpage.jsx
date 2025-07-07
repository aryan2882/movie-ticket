import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function BookTicketsPage() {
  const location = useLocation();
  const { movieTitle, selectedDate } = location.state || {};

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [seats, setSeats] = useState(Array(80).fill('available'));
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [paymentPhase, setPaymentPhase] = useState(false);
  const [temporarySelectedSeats, setTemporarySelectedSeats] = useState([]);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingError, setBookingError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/movies');
        if (!response.ok) throw new Error('Network error');

        const data = await response.json();
        const selectedMovie = data.find(movie => movie.title === movieTitle);
        if (selectedMovie) setMovie(selectedMovie);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [movieTitle]);

  const handleSeatClick = (index) => {
    if (seats[index] === 'occupied') return;

    const updatedSeats = [...seats];
    updatedSeats[index] = updatedSeats[index] === 'selected' ? 'available' : 'selected';
    setSeats(updatedSeats);

    const updatedTempSeats =
      updatedSeats[index] === 'selected'
        ? [...temporarySelectedSeats, index]
        : temporarySelectedSeats.filter(i => i !== index);

    setTemporarySelectedSeats(updatedTempSeats);

    const updatedSelectedSeats = updatedSeats
      .map((status, i) => (status === 'selected' ? i : null))
      .filter(i => i !== null);

    setSelectedSeats(updatedSelectedSeats);
  };

  const handleConfirmSeats = () => {
    const updatedSeats = seats.map(status => (status === 'selected' ? 'occupied' : status));
    setSeats(updatedSeats);
    setPaymentPhase(true);
  };

  const handlePayment = async () => {
    setBookingError(null);

    const userId = localStorage.getItem('userId');
    if (!userId) {
      setBookingError('User not logged in.');
      return;
    }

    if (!movie || !movie.title || !selectedDate || temporarySelectedSeats.length === 0) {
      setBookingError('Missing booking information.');
      return;
    }

    const bookingData = {
      userId,
      movieTitle: movie.title,
      selectedDate,
      seats: temporarySelectedSeats,
    };

    try {
      const res = await fetch('http://localhost:5000/api/bookings/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData),
      });

      const result = await res.json();
      if (res.ok) {
        setBookingSuccess(true);
        setPaymentPhase(false);
        setBookingError(null);
      } else {
        throw new Error(result.message || 'Booking failed');
      }
    } catch (err) {
      setBookingError(err.message);
    }
  };

  if (loading) return <p className="text-white text-center">Loading...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;
  if (!movie) return <p className="text-white text-center">Movie not found</p>;

  return (
    <div className="min-h-screen bg-[#1f1f2d] text-white p-8 flex flex-col md:flex-row space-y-8 md:space-y-0 md:space-x-8">
      <div className="md:w-1/3 bg-gray-800 rounded-lg shadow-lg p-6">
        <img src={movie.posterURL} alt={movie.title} className="w-144 h-256 object-cover rounded-lg mb-4" />
      </div>

      <div className="md:w-1/3 bg-gray-800 rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold mb-2">{movie.title}</h1>
        <p className="text-gray-400 mb-1">{movie.duration}</p>
        <p className="text-gray-400 mb-8">{movie.genre}</p>
        <p className="text-white">{movie.description}</p>
      </div>

      <div className="md:w-1/3 bg-gray-800 rounded-lg shadow-lg p-6">
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold">Date</h2>
          <p className="text-lg">{selectedDate}</p>
        </div>

        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-4">Select Seats</h2>
          <div className="grid grid-cols-8 gap-1">
            {seats.map((status, index) => (
              <div
                key={index}
                onClick={status === 'available' ? () => handleSeatClick(index) : null}
                className={`w-10 h-10 flex items-center justify-center rounded-md cursor-pointer text-sm ${
                  status === 'selected'
                    ? 'bg-blue-500'
                    : status === 'occupied'
                    ? 'bg-red-600 cursor-not-allowed'
                    : 'bg-gray-600 hover:bg-gray-500'
                }`}
              >
                {index + 1}
              </div>
            ))}
          </div>
        </div>

        {bookingError && (
          <div className="bg-red-700 p-4 rounded-md text-center mb-4">
            <p className="text-white">{bookingError}</p>
          </div>
        )}

        {!bookingSuccess ? (
          <>
            <button
              onClick={handleConfirmSeats}
              disabled={selectedSeats.length === 0}
              className={`w-full py-2 px-4 text-white font-bold rounded-md mb-4 ${
                selectedSeats.length > 0
                  ? 'bg-blue-700 hover:bg-blue-900'
                  : 'bg-gray-400 cursor-not-allowed'
              }`}
            >
              Confirm Selection
            </button>

            {paymentPhase && (
              <button
                onClick={handlePayment}
                className="w-full py-2 px-4 mt-2 text-white font-bold rounded-md bg-green-600 hover:bg-green-800"
              >
                Pay
              </button>
            )}
          </>
        ) : (
          <div className="bg-green-700 p-4 rounded-md text-center">
            <h2 className="text-xl font-bold">🎉 Booking Confirmed!</h2>
            <p>{movie.title}</p>
            <p>{selectedDate}</p>
            <p>Seats: {temporarySelectedSeats.map(s => s + 1).join(', ')}</p>
            <button
              onClick={() => navigate('/bookings')}
              className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-800 rounded-md"
            >
              View My Bookings
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default BookTicketsPage;
