import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <header className="bg-[#1f1f2d] p-4">
      <nav className="flex items-center justify-between">
        
        <div className="flex items-center">
          <h1 className="ml-2 text-white text-2xl font-semibold">Galaxy Cinema</h1>
        </div>
        
        <ul className="flex space-x-6 items-center">
          <li>
            <Link to="/home" className="text-white font-bold hover:text-gray-400">Home</Link>
          </li>
          <li>
            <Link to="/#movies" className="text-white font-bold hover:text-gray-400">Movies</Link>
          </li>
          <li>
            <Link to="/my-bookings" className="text-white font-bold hover:text-gray-400">My Bookings</Link>
          </li>
          <li>
            <Link to="/#about" className="text-white font-bold hover:text-gray-400">About Us</Link>
          </li>
          <li>
            <Link to="/#contact" className="text-white font-bold hover:text-gray-400">Contact</Link>
          </li>
          <li>
            <button
              onClick={handleLogout}
              className="text-white font-bold hover:text-red-400"
            >
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
