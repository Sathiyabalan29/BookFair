import React from 'react';

const PolicyModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 transition-opacity duration-300">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-lg transform transition-all scale-100 p-6 relative max-h-[90vh] overflow-y-auto">

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
                <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b pb-2">Reservation & Cancellation Policy</h2>

                {/* Content */}
                <div className="space-y-4 text-gray-700 text-sm leading-relaxed">

                    <div className="bg-blue-50 p-3 rounded-md border border-blue-100">
                        <h3 className="font-semibold text-blue-800 mb-1">Reservation Confirmation</h3>
                        <p>Your reservation is <strong>confirmed only after successful payment</strong> of the required deposit.</p>
                    </div>

                    <ul className="list-disc pl-5 space-y-2">
                        <li>
                            <span className="font-medium text-gray-900">Stall Limit:</span> A maximum of <strong>3 stalls</strong> can be reserved per business entity.
                        </li>
                        <li>
                            <span className="font-medium text-gray-900">Entry Requirement:</span> A valid <strong>QR Code</strong> (generated after payment) is mandatory for entry into the venue.
                        </li>
                    </ul>

                    <div className="bg-red-50 p-3 rounded-md border border-red-100">
                        <h3 className="font-semibold text-red-800 mb-1">Cancellation & Refunds</h3>
                        <ul className="list-disc pl-5 space-y-1">
                            <li>Cancellation within <strong>14 days</strong> of booking: <span className="font-medium">30% Refund</span>.</li>
                            <li>Cancellation after <strong>14 days</strong>: <span className="font-bold text-red-600">No Refund</span>.</li>
                        </ul>
                    </div>

                    <ul className="list-disc pl-5 space-y-2">
                        <li>
                            <span className="font-medium text-gray-900">Organizer Rights:</span> The event organizer reserves the right to reassign any cancelled stalls to other exhibitors immediately.
                        </li>
                        <li>
                            <span className="font-medium text-gray-900">QR Validity:</span> The generated QR code is valid for the entire duration of the event and is non-transferable.
                        </li>
                    </ul>
                </div>

                {/* Footer Action */}
                <div className="mt-6 flex justify-end">
                    <button
                        onClick={onClose}
                        className="px-6 py-2 bg-gray-800 text-white rounded-lg font-semibold hover:bg-gray-900 transition-colors"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PolicyModal;
