import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function PaymentPage() {
  const location = useLocation();
  const payValue = location.state || 0;
  
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState('');
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
  });

  const validateCardDetails = () => {
    const { cardNumber, expiryDate, cvv, cardholderName } = cardDetails;

    // Validate Card Number
    if (!/^\d{16}$/.test(cardNumber)) {
      alert('Card number must be exactly 16 digits.');
      return false;
    }

    // Validate CVV
    if (!/^\d{3}$/.test(cvv)) {
      alert('CVV must be exactly 3 digits.');
      return false;
    }

    // Validate Expiry Date
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiryDate)) {
      alert('Expiry date must be in MM/YY format.');
      return false;
    }

    // Validate Cardholder Name
    if (!/^[a-zA-Z\s]+$/.test(cardholderName.trim())) {
      alert('Cardholder name can only contain letters and spaces.');
      return false;
    }

    // Optional: Check if expiry date is not in the past
    const [month, year] = expiryDate.split('/').map(Number);
    const currentYear = new Date().getFullYear() % 100; // Last two digits of current year
    const currentMonth = new Date().getMonth() + 1;

    if (year < currentYear || (year === currentYear && month < currentMonth)) {
      alert('Expiry date cannot be in the past.');
      return false;
    }

    return true;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Allow only numeric values for card number and CVV
    if (name === 'cardNumber' || name === 'cvv') {
      if (!/^\d*$/.test(value)) return;
    }

    setCardDetails({ ...cardDetails, [name]: value });
  };

  const handlePayment = () => {
    if (paymentMethod === 'creditCard') {
      if (!validateCardDetails()) return;
    }

    // Replace this with actual payment API handling
    navigate(`/payment_success`,{state:payValue})
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 flex flex-col items-center space-y-6">
      {/* Payment Summary */}
      <div className="bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Payment Summary</h2>
        <p className="text-gray-300 mt-4 text-xl">
          Total Payment: <span className="font-bold">Rs. {payValue}</span>
        </p>
      </div>

      {/* Payment Method */}
      <div className="bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Payment Method</h2>
        <div className="space-y-2">
          <label className="block">
            <input
              type="radio"
              name="paymentMethod"
              value="creditCard"
              checked={paymentMethod === 'creditCard'}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="mr-2"
            />
            Credit/Debit Card
          </label>
          <label className="block">
            <input
              type="radio"
              name="paymentMethod"
              value="cash"
              checked={paymentMethod === 'cash'}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="mr-2"
            />
            Pay at the Counter
          </label>
        </div>
      </div>

      {/* Card Details Form */}
      {paymentMethod === 'creditCard' && (
        <div className="bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-md">
          <h2 className="text-2xl font-bold mb-4">Card Details</h2>
          <div className="space-y-4">
            <input
              type="text"
              name="cardNumber"
              placeholder="Card Number (16 digits)"
              maxLength="16"
              value={cardDetails.cardNumber}
              onChange={handleInputChange}
              className="w-full p-2 rounded-md bg-gray-700 text-white"
            />
            <input
              type="text"
              name="expiryDate"
              placeholder="Expiry Date (MM/YY)"
              value={cardDetails.expiryDate}
              onChange={handleInputChange}
              className="w-full p-2 rounded-md bg-gray-700 text-white"
            />
            <input
              type="text"
              name="cvv"
              placeholder="CVV (3 digits)"
              maxLength="3"
              value={cardDetails.cvv}
              onChange={handleInputChange}
              className="w-full p-2 rounded-md bg-gray-700 text-white"
            />
            <input
              type="text"
              name="cardholderName"
              placeholder="Cardholder Name"
              value={cardDetails.cardholderName}
              onChange={handleInputChange}
              className="w-full p-2 rounded-md bg-gray-700 text-white"
            />
          </div>
        </div>
      )}

      {/* Confirm Payment Button */}
      <button
        onClick={handlePayment}
        className="w-full max-w-md py-3 px-4 bg-green-600 rounded-md text-xl font-bold hover:bg-green-800"
      >
        Confirm Payment
      </button>
    </div>
  );
}

export default PaymentPage;
