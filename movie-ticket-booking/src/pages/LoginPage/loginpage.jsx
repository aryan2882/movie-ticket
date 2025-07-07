import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  // State for email, password, and error message
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  // Initialize navigate for redirecting
  const navigate = useNavigate();
  
  // Handle form submission
  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent page reload
    
    try {
      const response = await axios.post('http://localhost:5000/api/user/login', {
        email,
        password,
      });

      // On successful login, store token in localStorage
      const {token,_id} = response.data;
      console.log('🧪 Login response:', response.data);

      localStorage.setItem('token', token);
      localStorage.setItem('userId', _id); 

      // Redirect to home page after successful login
      navigate('/home');
    } catch (error) {
      
      setError('Invalid email or password');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1f1f2d]">
      <div className="flex justify-center">
        <img src="./login01.png" alt="login" className="w-256 h-128 mx-auto" />
      </div>
      

      <div className="bg-white shadow-lg rounded-lg p-8 w-96">
      <h2 className="text-4xl font-bold text-center mb-8 text-gray-800">Galaxy Cinema</h2>
        <h2 className="text-2xl font-bold text-center mb-4 text-gray-800">Login</h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              className="w-full px-3 py-2 text-black  border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              className="w-full px-3 py-2 text-black border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
          >
            Login
          </button>
        </form>

        <p className="text-sm text-center mt-4 text-gray-600">
          Don't have an account?{' '}
          <a href="/signup" className="text-blue-500 hover:underline">
            Sign up
          </a>
        </p>
      </div>
      <div className="flex justify-center">
        <img src="./login02.png" alt="login" className="w-256 h-128 mx-auto" />
      </div>
    </div>
  );
};

export default LoginPage;


