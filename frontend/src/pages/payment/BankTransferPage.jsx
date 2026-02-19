import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import paymentService from '../../services/paymentService';
import { useReservation } from '../../context/ReservationContext';

const BankTransferPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { userId } = useReservation();
    const { amount, bookingId } = location.state || { amount: 0, bookingId: 'UNKNOWN' };

    const [receipt, setReceipt] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [copied, setCopied] = useState(false);

    const bankDetails = {
        accountName: "BookFair Organizing Committee",
        bankName: "National Bank of Sri Lanka",
        accountNumber: "1234-5678-9012-3456",
        branch: "Colombo Main Branch",
        swift: "NBSLLKCX"
    };

    const handleCopy = () => {
        const text = `Bank: ${bankDetails.bankName}\nAccount: ${bankDetails.accountNumber}\nName: ${bankDetails.accountName}\nSwift: ${bankDetails.swift}`;
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleFileChange = (e) => {
        setReceipt(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission
        const handleConfirm = async () => {
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
                    paymentMethod: 'BANK_TRANSFER'
                    // amount is calculated by backend
                };

                await paymentService.createPayment(paymentRequest);
                alert('Bank Transfer Recorded! Please upload receipt in profile if required.');
                navigate('/select-genres');
            } catch (error) {
                console.error(error);
                alert('Payment failed: ' + (error.message || "Unknown error"));
            } finally {
                setIsProcessing(false);
            }
        };
        // Call the new handleConfirm function
        await handleConfirm();
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
                    <h2 className="text-2xl font-bold text-gray-900">Bank Transfer</h2>
                    <p className="text-sm text-gray-500 mt-1">Manual transfer to our bank account.</p>
                </div>

                {/* Amount Display */}
                <div className="bg-purple-50 p-4 rounded-lg mb-6 flex justify-between items-center border border-purple-100">
                    <span className="text-purple-800 font-medium">Total to Pay</span>
                    <span className="text-xl font-bold text-purple-900">Rs. {amount.toLocaleString()}</span>
                </div>

                {/* Bank Details Card */}
                <div className="bg-gray-50 p-5 rounded-lg border border-gray-200 mb-6 relative">
                    <button
                        onClick={handleCopy}
                        className="absolute top-4 right-4 text-gray-400 hover:text-purple-600 transition-colors"
                        title="Copy Details"
                    >
                        {copied ? (
                            <span className="text-xs text-green-600 font-semibold">Copied!</span>
                        ) : (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                        )}
                    </button>

                    <dl className="space-y-2 text-sm">
                        <div className="flex justify-between">
                            <dt className="text-gray-500">Bank Name:</dt>
                            <dd className="font-medium text-gray-900">{bankDetails.bankName}</dd>
                        </div>
                        <div className="flex justify-between">
                            <dt className="text-gray-500">Account No:</dt>
                            <dd className="font-mono font-bold text-gray-900">{bankDetails.accountNumber}</dd>
                        </div>
                        <div className="flex justify-between">
                            <dt className="text-gray-500">Beneficiary:</dt>
                            <dd className="font-medium text-gray-900 text-right">{bankDetails.accountName}</dd>
                        </div>
                        <div className="flex justify-between">
                            <dt className="text-gray-500">Warning:</dt>
                            <dd className="font-medium text-red-500 text-right">Please input the reference number (Booking ID: {bookingId}) in remarks.</dd>
                        </div>
                    </dl>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">

                    {/* Instructions */}
                    <div className="text-sm text-gray-600 bg-yellow-50 p-3 rounded border border-yellow-100">
                        <p><strong>Step 1:</strong> Transfer <strong>Rs. {amount.toLocaleString()}</strong> to the above account.</p>
                        <p className="mt-1"><strong>Step 2:</strong> Upload the transaction receipt below.</p>
                    </div>

                    {/* File Upload */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Upload Receipt (JPG, PNG, PDF)</label>
                        <input
                            type="file"
                            accept=".jpg,.jpeg,.png,.pdf"
                            required
                            onChange={handleFileChange}
                            className="block w-full text-sm text-gray-500
                                file:mr-4 file:py-2 file:px-4
                                file:rounded-full file:border-0
                                file:text-sm file:font-semibold
                                file:bg-purple-50 file:text-purple-700
                                hover:file:bg-purple-100
                            "
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={!receipt || isProcessing}
                        className={`w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-white font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 ${!receipt || isProcessing ? 'bg-purple-300 cursor-not-allowed' : 'bg-purple-600 hover:bg-purple-700'
                            }`}
                    >
                        {isProcessing ? 'Verifying...' : 'Confirm Payment'}
                    </button>

                </form>
            </div>
        </div>
    );
};

export default BankTransferPage;
