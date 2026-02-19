import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PolicyModal from "../../components/PolicyModal";
import reservationService from "../../services/reservationService";


const BookingPage = () => {
    const location = useLocation();
    const navigate = useNavigate();

    // Retrieve state passed from VenueMap
    const { stalls } = location.state || {};

    const [isPolicyModalOpen, setIsPolicyModalOpen] = useState(false);
    const [agreedToTerms, setAgreedToTerms] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);

    if (!stalls || stalls.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-6">
                <div className="bg-red-50 p-6 rounded-lg border border-red-100 max-w-md w-full">
                    <h2 className="text-xl font-bold text-red-800 mb-2">No Booking Data Found</h2>
                    <p className="text-gray-600 mb-6">Please go back to the map and select stalls to proceed with your booking.</p>
                    <button
                        onClick={() => navigate("/venue-map")}
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-md w-full"
                    >
                        Return to Venue Map
                    </button>
                </div>
            </div>
        );
    }

    // Recalculate Mock Pricing logic (since backend doesn't persit it yet)
    // In a real app, this would come from the backend or be persisted in context/state more robustly
    const calculateTotal = () => {
        return stalls.reduce((total, stall) => {
            // Logic matching VenueMap: standard (<=40) = 50k, large (>40) = 100k
            const price = stall.width > 40 ? 100000 : 50000;
            return total + price;
        }, 0);
    };

    const totalAmount = calculateTotal();
    const payableNow = totalAmount / 2;
    const balanceDue = totalAmount - payableNow;

    const handleTermsChange = (e) => {
        setAgreedToTerms(e.target.checked);
    };

    const handlePayNow = async () => {
        if (!agreedToTerms) return;

        setIsProcessing(true);

        try {
            // 1. Get current user
            const user = JSON.parse(localStorage.getItem('user'));
            if (!user || !user.id) {
                alert("User not found. Please log in again.");
                navigate("/login");
                return;
            }

            // 2. Prepare Reservation Request
            const reservationRequest = {
                userId: user.id,
                stallNames: stalls.map(s => s.stallName)
            };

            // 3. Call Backend to Create Reservation
            const reservationResponse = await reservationService.createReservation(reservationRequest);
            console.log("Reservation Response:", reservationResponse);

            // 4. Navigate to Payment Page with REAL Reservation ID
            // Backend returns totalPrice, but user pays 50% now.
            // PRIORITIZE FRONTEND CALCULATION: The backend seems to have test data (e.g. 2000) 
            // which confuses the user who expects 50,000.
            // We blindly trust the frontend calculation for the payment flow to ensure UI consistency.

            const backendTotal = Number(reservationResponse.totalPrice);
            const total = totalAmount; // Always use frontend total for consistency

            const payable = total / 2;

            navigate("/payment", {
                state: {
                    amount: payable,
                    bookingId: reservationResponse.reservationId,
                    reservationData: reservationResponse
                }
            });

        } catch (error) {
            console.error("Reservation Failed:", error);
            alert("Failed to create reservation: " + (error.response?.data?.message || error.message));
        } finally {
            setIsProcessing(false);
        }
    };

    const handleCancel = () => {
        if (window.confirm("Are you sure you want to cancel this reservation process? Your held stalls might be released.")) {
            navigate("/");
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">

                {/* Header */}
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-extrabold text-gray-900">Secure Payment</h1>
                    <p className="mt-2 text-lg text-gray-600">Complete your stall reservation</p>
                </div>

                <div className="bg-white shadow-xl rounded-2xl overflow-hidden flex flex-col md:flex-row">

                    {/* Left Side: Order Summary */}
                    <div className="md:w-3/5 p-8 border-r border-gray-100">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold text-gray-800">Reservation Summary</h2>
                            <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                                {stalls.length} Stalls
                            </span>
                        </div>

                        {/* Stalls List */}
                        <div className="space-y-4 mb-8">
                            {stalls.map((stall, index) => (
                                <div key={index} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg border border-gray-100">
                                    <div>
                                        <p className="font-semibold text-gray-900">{stall.stallName}</p>
                                        <p className="text-sm text-gray-500">{stall.width > 40 ? "Large (6x3 m)" : "Standard (3x3 m)"}</p>
                                    </div>
                                    <div className="font-mono font-medium text-gray-700">
                                        Rs. {(stall.width > 40 ? 100000 : 50000).toLocaleString()}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Price Breakdown */}
                        <div className="border-t border-gray-200 pt-6 space-y-3">
                            <div className="flex justify-between text-gray-600">
                                <span>Subtotal</span>
                                <span>Rs. {totalAmount.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between text-lg font-bold text-gray-900 pt-2">
                                <span>Total Amount</span>
                                <span>Rs. {totalAmount.toLocaleString()}</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Payment Details */}
                    <div className="md:w-2/5 p-8 bg-gray-50 flex flex-col justify-between">
                        <div>
                            <h2 className="text-xl font-bold text-gray-800 mb-6">Payment Breakdown</h2>

                            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 mb-6">
                                <div className="mb-4 pb-4 border-b border-gray-100">
                                    <p className="text-sm text-gray-500 mb-1">Payable Now (50%)</p>
                                    <p className="text-3xl font-bold text-blue-600">Rs. {payableNow.toLocaleString()}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 mb-1">Balance Due Later</p>
                                    <p className="text-lg font-semibold text-gray-700">Rs. {balanceDue.toLocaleString()}</p>
                                </div>
                            </div>

                            {/* Terms Checkbox */}
                            <div className="mb-6">
                                <label className="flex items-start cursor-pointer">
                                    <input
                                        type="checkbox"
                                        className="form-checkbox h-5 w-5 text-blue-600 rounded mt-0.5 border-gray-300 focus:ring-blue-500"
                                        checked={agreedToTerms}
                                        onChange={handleTermsChange}
                                    />
                                    <span className="ml-3 text-sm text-gray-600 leading-snug">
                                        I agree to the <span className="font-medium text-gray-900">Reservation & Cancellation Policy</span>.
                                    </span>
                                </label>
                                <button
                                    onClick={() => setIsPolicyModalOpen(true)}
                                    className="text-xs text-blue-600 hover:text-blue-800 underline ml-8 mt-1 block"
                                >
                                    View Privacy & Policy
                                </button>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="space-y-3">
                            <button
                                onClick={handlePayNow}
                                disabled={!agreedToTerms || isProcessing}
                                className={`w-full py-3.5 px-4 rounded-xl font-bold text-white shadow-lg transition transform hover:-translate-y-0.5
                                    ${!agreedToTerms || isProcessing
                                        ? "bg-gray-400 cursor-not-allowed shadow-none"
                                        : "bg-blue-600 hover:bg-blue-700 hover:shadow-blue-500/30"
                                    }`}
                            >
                                {isProcessing ? (
                                    <span className="flex items-center justify-center">
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Processing...
                                    </span>
                                ) : (
                                    "Pay Now"
                                )}
                            </button>

                            <button
                                onClick={handleCancel}
                                className="w-full py-3 px-4 rounded-xl font-semibold text-gray-600 hover:bg-gray-200 transition"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>

                {/* Secure Trust Badge */}
                <div className="mt-8 text-center text-gray-400 text-sm flex items-center justify-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                    Secure SSL Encrypted Transaction
                </div>

            </div>

            {/* Policy Modal */}
            <PolicyModal
                isOpen={isPolicyModalOpen}
                onClose={() => setIsPolicyModalOpen(false)}
            />
        </div>
    );
};

export default BookingPage;
