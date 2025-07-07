import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 

import HomePage from './pages/HomePage/homepage';
import Login from './pages/LoginPage/loginpage';
import SignupPage from './pages/SigninPage/signinpage';
import Movieinfo from './pages/MovieInfoPage/movieinfo';
import Payment from './pages/PaymentPage/paymentpage';
import Pay from './pages/Pay/pay';
import PaymentSuccess from './pages/Payment_success/payment_success';
import SeatSelectionPage from './pages/SeatSelectionPage/seatselectionpage';
import MyBookings from './pages/MyBookings'; // ✅ Make sure this path is correct

function App() {
  return (
    <div className="min-h-screen bg-[#1f1f2d] text-white">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/movie/:movieTitle" element={<Movieinfo />} />
          <Route path="/movie/:movieTitle/seatselection" element={<SeatSelectionPage />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/pay" element={<Pay />} />
          <Route path="/payment_success" element={<PaymentSuccess />} />
          <Route path="/my-bookings" element={<MyBookings />} /> {/* ✅ Moved inside <Routes> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
