import React from 'react';

const ConfirmationModal = ({ isOpen, onClose, onConfirm, stalls, totalPrice }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 transition-opacity duration-300">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md transform transition-all scale-100 p-6 relative">

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                {/* Title */}
                <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">Confirm Reservation</h2>

                {/* Content */}
                <div className="space-y-4 mb-6">
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Selected Stalls</h3>
                        <ul className="space-y-3">
                            {stalls.map((stall, index) => (
                                <li key={index} className="flex justify-between items-center text-gray-800">
                                    <span className="font-medium bg-white px-2 py-1 rounded border border-gray-200 shadow-sm">{stall.stallName}</span>
                                    <div className="text-right">
                                        <div className="text-sm text-gray-500">{stall.stallSize}</div>
                                        <div className="font-semibold">{stall.price ? `Rs. ${stall.price.toLocaleString()}` : "N/A"}</div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="flex justify-between items-center py-3 border-t border-gray-100">
                        <div className="text-lg font-bold text-gray-800">Total Price</div>
                        <div className="text-xl font-bold text-blue-600">Rs. {totalPrice.toLocaleString()}</div>
                    </div>

                    <div className="bg-yellow-50 border border-yellow-200 p-3 rounded-lg flex items-start">
                        <svg className="w-5 h-5 text-yellow-600 mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p className="text-sm text-yellow-800">
                            <strong>Note:</strong> 50% prepayment required to confirm reservation. You will be redirected to payment page.
                        </p>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                    <button
                        onClick={onClose}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-semibold hover:bg-gray-50 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
                    >
                        Confirm & Pay
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;
