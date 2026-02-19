import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import paymentService from '../../services/paymentService';
import reservationService from '../../services/reservationService';
import { useReservation } from '../../context/ReservationContext';
import axios from 'axios';

const CreditCardPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { userId } = useReservation();
    const locationState = location.state || {};
    const bookingId = locationState.bookingId;

    // Initialize amount from location state
    const [amount, setAmount] = useState(Number(locationState.amount) || 0);
    const [cardData, setCardData] = useState({ name: '', number: '', expiry: '', cvv: '' });
    const [saveCard, setSaveCard] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);

    useEffect(() => {
        if (!bookingId || amount <= 0) {
            alert("Invalid Reservation or Amount. Please try booking again.");
            navigate('/venue-map');
        }
    }, [bookingId, amount, navigate]);

    // Card input change handler
    const handleChange = (e) => {
        const { name, value } = e.target;
        setCardData(prev => ({ ...prev, [name]: value }));
    };

    // Card icon based on number
    const getCardIcon = () => {
        const num = cardData.number;
        if (num.startsWith('4')) return 'Visa';
        if (num.startsWith('5')) return 'MasterCard';
        return 'Card';
    };

    // Form submit handler
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsProcessing(true);

        try {
            const storedUser = JSON.parse(localStorage.getItem('user'));
            const finalUserId = userId || (storedUser ? storedUser.id : null);

            if (!bookingId || !finalUserId) {
                alert("Invalid booking or user ID.");
                navigate('/venue-map');
                return;
            }

            const paymentRequest = {
                userId: finalUserId,
                reservationId: Number(bookingId),
                paymentMethod: 'CREDIT_CARD',
                amount: Number(amount)
            };

            await paymentService.createPayment(paymentRequest);
            alert('Payment Successful!');
            navigate('/select-genres');
        } catch (error) {
            console.error("Payment Error:", error);
            alert('Payment failed: ' + (error.response?.data?.message || error.message || "Unknown error"));
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">

                {/* Header */}
                <div className="mb-6">
                    <button onClick={() => navigate('/')} className="text-sm text-gray-500 hover:text-gray-700 flex items-center mb-4">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                        </svg>
                        Cancel
                    </button>
                    <h2 className="text-2xl font-bold text-gray-900">Credit Card Payment</h2>
                    <p className="text-sm text-gray-500 mt-1">Enter your card details securely.</p>
                </div>

                {/* Amount Display */}
                <div className="bg-blue-50 p-4 rounded-lg mb-6 flex justify-between items-center border border-blue-100">
                    <span className="text-blue-800 font-medium">Total to Pay</span>
                    <span className="text-xl font-bold text-blue-900">
                        Rs. {amount.toLocaleString()}
                    </span>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-5">

                    {/* Cardholder Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Cardholder Name</label>
                        <input
                            type="text"
                            name="name"
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            placeholder="John Doe"
                            value={cardData.name}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Card Number */}
                    <div className="relative">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                        <input
                            type="text"
                            name="number"
                            required
                            maxLength="19"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 pl-10"
                            placeholder="0000 0000 0000 0000"
                            value={cardData.number}
                            onChange={handleChange}
                        />
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none top-6 text-gray-400 text-xs font-bold w-10">
                            {getCardIcon()}
                        </div>
                    </div>

                    {/* Expiry & CVV */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                            <input
                                type="text"
                                name="expiry"
                                required
                                placeholder="MM/YY"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                value={cardData.expiry}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                            <input
                                type="password"
                                name="cvv"
                                required
                                maxLength="3"
                                placeholder="123"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                value={cardData.cvv}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    {/* Checkbox */}
                    <div className="flex items-center">
                        <input
                            id="save-card"
                            type="checkbox"
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            checked={saveCard}
                            onChange={(e) => setSaveCard(e.target.checked)}
                        />
                        <label htmlFor="save-card" className="ml-2 block text-sm text-gray-900">
                            Save card for future payments
                        </label>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isProcessing || amount <= 0}
                        className={`w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-white font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${isProcessing ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                            }`}
                    >
                        {isProcessing ? 'Processing...' : `Pay Rs. ${amount.toLocaleString()}`}
                    </button>

                </form>
            </div>
        </div>
    );
};

export default CreditCardPage;
