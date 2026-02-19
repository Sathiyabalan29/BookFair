import { useState, useEffect } from 'react';
import authService from '../services/authService';
import { useReservation } from '../context/ReservationContext';
import paymentService from '../services/paymentService'; // Ensure this path is correct based on your file structure
import { useNavigate } from 'react-router-dom';

const PaymentForm = () => {
    const { userId, reservationId, amountToPay } = useReservation();
    const [user, setUser] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState('CREDIT_CARD');
    const [status, setStatus] = useState('idle'); // idle, loading, success, error
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const currentUser = authService.getCurrentUser();
        setUser(currentUser);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');
        setMessage('');

        const paymentRequest = {
            userId,
            reservationId,
            paymentMethod,
        };

        try {
            const response = await paymentService.createPayment(paymentRequest);
            setStatus('success');
            setMessage(`Payment successful! Transaction ID: ${response.paymentId}`);
            setTimeout(() => navigate('/payment-history'), 2000); // Redirect after success
        } catch (error) {
            setStatus('error');
            setMessage(error.message || 'Payment failed. Please try again.');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-[#1e3a5f]">
                        Complete Payment
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Reservation ID: <span className="font-semibold">{reservationId}</span>
                    </p>
                    {user && (
                        <div className="mt-4 text-center p-3 bg-gray-50 rounded-md">
                            <p className="text-sm font-medium text-gray-900">Payer: {user.name}</p>
                            <p className="text-xs text-gray-500">{user.email}</p>
                        </div>
                    )}
                </div>

                <div className="bg-blue-50 p-4 rounded-md border border-blue-100">
                    <div className="flex justify-between items-center">
                        <span className="text-blue-800 font-medium">Total Amount:</span>
                        <span className="text-2xl font-bold text-[#c9a227]">LKR {amountToPay.toFixed(2)}</span>
                    </div>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="paymentMethod" className="block text-sm font-medium text-gray-700">
                            Payment Method
                        </label>
                        <select
                            id="paymentMethod"
                            name="paymentMethod"
                            value={paymentMethod}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-[#c9a227] focus:border-[#c9a227] sm:text-sm rounded-md border"
                        >
                            <option value="CREDIT_CARD">Credit Card</option>
                            <option value="DEBIT_CARD">Debit Card</option>
                            <option value="BANK_TRANSFER">Bank Transfer</option>
                        </select>
                    </div>

                    {status === 'error' && (
                        <div className="bg-red-50 border-l-4 border-red-500 p-4">
                            <div className="flex">
                                <div className="ml-3">
                                    <p className="text-sm text-red-700">{message}</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {status === 'success' && (
                        <div className="bg-green-50 border-l-4 border-green-500 p-4">
                            <div className="flex">
                                <div className="ml-3">
                                    <p className="text-sm text-green-700">{message}</p>
                                </div>
                            </div>
                        </div>
                    )}

                    <div>
                        <button
                            type="submit"
                            disabled={status === 'loading'}
                            className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-[#152a47] bg-[#c9a227] hover:bg-[#d4af37] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#c9a227] ${status === 'loading' ? 'opacity-75 cursor-not-allowed' : ''
                                }`}
                        >
                            {status === 'loading' ? 'Processing...' : 'Pay Now'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PaymentForm;
