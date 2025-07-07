import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ Needed for navigation

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const userId = localStorage.getItem('userId');
  const navigate = useNavigate(); // ✅ Hook for navigation

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/bookings/user/${userId}`);
        const data = await res.json();

        if (Array.isArray(data)) {
          setBookings(data);
        } else {
          setError('Unexpected response from server.');
          setBookings([]);
        }
      } catch (err) {
        console.error('Failed to fetch bookings', err);
        setError('Failed to load bookings.');
        setBookings([]);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchBookings();
    } else {
      setError('User not logged in.');
      setLoading(false);
    }
  }, [userId]);

  const cancelBooking = async (bookingId) => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/bookings/${bookingId}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setBookings(prev => prev.filter(b => b._id !== bookingId));
        alert('Booking cancelled!');
      } else {
        alert('Failed to cancel booking.');
      }
    } catch (err) {
      console.error('Error cancelling booking', err);
      alert('An error occurred while cancelling.');
    }
  };

  return (
    <div className="relative text-white p-8 min-h-screen bg-[#1f1f2d]">
      {/* 🔗 Home Icon Button */}
      <button
        onClick={() => navigate('/home')}
        className="absolute top-6 right-6 text-2xl bg-white text-black px-4 py-2 rounded-full shadow-lg hover:bg-gray-200 transition duration-300"
        title="Go to Home"
      >
        🏠
      </button>

      <h1 className="text-2xl font-bold mb-4">My Bookings</h1>

      {loading && <p className="text-blue-400">Loading...</p>}
      {error && <p className="text-red-400">{error}</p>}

      {!loading && bookings.length === 0 && !error && (
        <p>No bookings yet.</p>
      )}

      {Array.isArray(bookings) && bookings.length > 0 && (
        bookings.map((booking) => (
          <div key={booking._id} className="bg-gray-800 p-4 mb-4 rounded-lg shadow-lg">
            <p>🎬 <strong>Movie:</strong> {booking.movieTitle}</p>
            <p>📅 <strong>Date:</strong> {booking.selectedDate}</p>
            <p>🕒 <strong>Time:</strong> {booking.selectedShowtime}</p>
            <p>💺 <strong>Seats:</strong> {booking.seats.map(seat => seat + 1).join(', ')}</p>

            <button
              onClick={() => cancelBooking(booking._id)}
              className="mt-3 px-4 py-2 bg-red-600 rounded hover:bg-red-800"
            >
              Cancel Booking
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default MyBookings;
