import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const PaymentMethodSelection = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { amount, bookingId } = location.state || { amount: 0, bookingId: 'UNKNOWN' };

    const handleSelectMethod = (method) => {
        navigate(`/payment/${method}`, { state: { amount, bookingId } });
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl w-full space-y-8">
                <div className="text-center">
                    <h2 className="text-3xl font-extrabold text-gray-900">Choose Payment Method</h2>
                    <p className="mt-2 text-lg text-gray-600">
                        Total Payable: <span className="font-bold text-blue-600">Rs. {amount ? amount.toLocaleString() : '0'}</span>
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                    {/* Credit Card */}
                    <div
                        onClick={() => handleSelectMethod('credit-card')}
                        className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow cursor-pointer border border-transparent hover:border-blue-500 group"
                    >
                        <div className="flex flex-col items-center text-center space-y-4">
                            <div className="p-4 bg-blue-50 rounded-full group-hover:bg-blue-100 transition-colors">
                                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900">Credit Card</h3>
                            <p className="text-sm text-gray-500">Pay securely using your Visa, MasterCard, or Amex.</p>
                        </div>
                    </div>

                    {/* Debit Card */}
                    <div
                        onClick={() => handleSelectMethod('debit-card')}
                        className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow cursor-pointer border border-transparent hover:border-green-500 group"
                    >
                        <div className="flex flex-col items-center text-center space-y-4">
                            <div className="p-4 bg-green-50 rounded-full group-hover:bg-green-100 transition-colors">
                                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900">Debit Card</h3>
                            <p className="text-sm text-gray-500">Instant payment using your bank debit card.</p>
                        </div>
                    </div>

                    {/* Bank Transfer */}
                    <div
                        onClick={() => handleSelectMethod('bank-transfer')}
                        className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow cursor-pointer border border-transparent hover:border-purple-500 group"
                    >
                        <div className="flex flex-col items-center text-center space-y-4">
                            <div className="p-4 bg-purple-50 rounded-full group-hover:bg-purple-100 transition-colors">
                                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900">Bank Transfer</h3>
                            <p className="text-sm text-gray-500">Direct deposit to our bank account. Receipt required.</p>
                        </div>
                    </div>
                </div>

                <div className="mt-8 text-center">
                    <button
                        onClick={() => navigate('/')}
                        className="text-gray-600 hover:text-gray-900 font-medium underline"
                    >
                        Cancel Payment
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PaymentMethodSelection;
