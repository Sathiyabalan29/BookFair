import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import paymentService from '../../services/paymentService';
import { useReservation } from '../../context/ReservationContext';

const DebitCardPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { userId } = useReservation();
    const { amount, bookingId } = location.state || { amount: 0, bookingId: 'UNKNOWN' };

    const [cardData, setCardData] = useState({
        name: '',
        number: '',
        expiry: '',
        pin: ''
    });
    const [saveCard, setSaveCard] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCardData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsProcessing(true);

        try {
            // Fallback to localStorage if context is empty
            const storedUser = JSON.parse(localStorage.getItem('user'));
            const finalUserId = userId || (storedUser ? storedUser.id : null);

            if (!finalUserId) {
                alert("User not identified. Please log in again.");
                navigate('/login');
                return;
            }

            const paymentRequest = {
                userId: finalUserId,
                reservationId: Number(bookingId),
                paymentMethod: 'DEBIT_CARD'
                // amount is calculated by backend (50% of total)
            };

            await paymentService.createPayment(paymentRequest);
            alert('Payment Successful!');
            navigate('/select-genres');
        } catch (error) {
            console.error(error);
            alert('Payment failed: ' + (error.message || "Unknown error"));
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
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
                        Cancel
                    </button>
                    <h2 className="text-2xl font-bold text-gray-900">Debit Card Payment</h2>
                    <p className="text-sm text-gray-500 mt-1">Safe & Secure bank transaction.</p>
                </div>

                {/* Amount Display */}
                <div className="bg-green-50 p-4 rounded-lg mb-6 flex justify-between items-center border border-green-100">
                    <span className="text-green-800 font-medium">Total to Pay</span>
                    <span className="text-xl font-bold text-green-900">Rs. {amount.toLocaleString()}</span>
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
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                            placeholder="Jane Doe"
                            value={cardData.name}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Card Number */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Debit Card Number</label>
                        <div className="relative">
                            <input
                                type="text"
                                name="number"
                                required
                                maxLength="19"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 pl-10"
                                placeholder="0000 0000 0000 0000"
                                value={cardData.number}
                                onChange={handleChange}
                            />
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Expiry & PIN */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                            <input
                                type="text"
                                name="expiry"
                                required
                                placeholder="MM/YY"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                                value={cardData.expiry}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                                PIN
                                <svg className="w-3 h-3 ml-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                            </label>
                            <input
                                type="password"
                                name="pin"
                                required
                                maxLength="4"
                                placeholder="****"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                                value={cardData.pin}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    {/* Checkbox */}
                    <div className="flex items-center">
                        <input
                            id="save-card"
                            type="checkbox"
                            className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                            checked={saveCard}
                            onChange={(e) => setSaveCard(e.target.checked)}
                        />
                        <label htmlFor="save-card" className="ml-2 block text-sm text-gray-900">
                            Save debit card securely
                        </label>
                    </div>

                    {/* Secure Icon Text */}
                    <div className="flex items-center justify-center text-xs text-gray-500 space-x-1">
                        <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        <span>Verified by Visa / MasterCard SecureCode</span>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isProcessing}
                        className={`w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-white font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 ${isProcessing ? 'bg-green-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
                            }`}
                    >
                        {isProcessing ? 'Processing...' : `Pay Rs. ${amount.toLocaleString()}`}
                    </button>

                </form>
            </div>
        </div>
    );
};

export default DebitCardPage;
