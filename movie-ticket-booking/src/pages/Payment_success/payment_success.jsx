import React from 'react';
//import { useLocation, useNavigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


function PaymentSuccessPage() {
  //const location = useLocation();
  const navigate = useNavigate();
  //const payValue = location.state || 0;

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center space-y-6">
      {/* Green Background Section */}
      <div className="bg-green-600 p-6 rounded-lg text-center w-full max-w-5xl">
        <h1 className="text-3xl font-bold mb-8">Payment Successful!</h1>
        {/*<p className="text-xl mb-6">
          Your payment of <span className="font-bold">Rs. {payValue}</span> was processed successfully.
        </p>*/}
        <p className="text-xl mb-6">Your payment was processed successfully.</p>
      </div>

      {/* Home Page Button */}
      <button
        onClick={() => navigate('/home')}
        className="px-6 py-3 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-900"
      >
        Go to Home Page
      </button>
    </div>
  );
}

export default PaymentSuccessPage;
