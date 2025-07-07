import React from 'react';
import { useLocation } from 'react-router-dom';
//import { useNavigate } from 'react-router-dom'; 

function PaymentPage() {
  const location = useLocation();
  const { movieTitle, selectedShowtime, selectedDate, temporarySelectedSeats } = location.state || {};
  console.log("PaymentPage received state:", location.state);


  const payValue = temporarySelectedSeats.length * 500;

  //const navigate = useNavigate();

  // Ensure data is passed properly
  if (!movieTitle || !selectedDate || !temporarySelectedSeats || selectedShowtime===undefined) {
    return <p className="text-center text-red-500">Error: Missing booking details.</p>;
  }

  {/*const goPaymentPage=()=>{
    navigate(`/pay`,{state:payValue})
  }*/}

  return (
    <div className="min-h-screen text-center bg-[#1f1f2d] text-white p-8 flex flex-col space-y-8">
      <div className="bg-gray-800 rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold mb-2">Confirm Your Booking</h1>
        <p className="text-gray-400 mb-4">Please review your selection before proceeding with payment.</p>

        {/* Movie Title */}
        <div className="mb-4">
          <h2 className="text-2xl font-semibold">Movie: {movieTitle}</h2>
        </div>

        {/* Date */}
        <div className="mb-4">
          <h3 className="text-xl font-semibold">Date: {selectedDate}</h3>
        </div>

        {/* Showtime */}
        <div className="mb-4">
          <h3 className="text-xl font-semibold">Showtime: {selectedShowtime}</h3>
        </div>


        {/* Temporary Selected Seats */}
        <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2 text-center">Selected Seats:</h3>
        <div className="flex justify-center space-x-2">
            {temporarySelectedSeats.map((seat, index) => (
            <div
                key={index}
                className="text-center py-2 px-4 bg-blue-600 text-white rounded-md"
                style={{ width: '60px', height: '40px' }} // Fixed size for square shape
            >
                {seat + 1}
            </div>
            ))}
        </div>
        </div>

        <p className="text-xl font-semibold mb-6">Payment: Rs. {payValue}</p>



        {/* Payment Button */}
        {/*<button
         onClick={goPaymentPage}
         className="w-200px py-2 px-4 mt-4 text-white font-bold rounded-md bg-green-600 hover:bg-green-800">
          Proceed to Payment
        </button>*/}

        <a 
          href="https://buy.stripe.com/test_6oEdRjeSU4tucUM001"
          className="w-200px py-2 px-4 mt-4 text-white font-bold rounded-md bg-green-600 hover:bg-green-800">
          Proceed to Payment
        </a>
      </div>
    </div>
  );
}

export default PaymentPage;

