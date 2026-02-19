import { useEffect, useState } from 'react';
import { useReservation } from '../context/ReservationContext';
import paymentService from '../services/paymentService'; // Ensure path is correct
import reservationService from '../services/reservationService';
import { fetchStalls } from '../services/mapService';

const PaymentHistory = () => {
    const { userId } = useReservation();

    console.log("Current userId:", userId);

    const [payments, setPayments] = useState([]);
    const [reservations, setReservations] = useState([]);
    const [stalls, setStalls] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [refundMessage, setRefundMessage] = useState('');

    useEffect(() => {
        const loadData = async () => {
            try {
                if (userId) {
                    const [paymentData, resData, stallsData] = await Promise.all([
                        paymentService.getPaymentsByUserId(userId),
                        reservationService.getUserReservations(userId),
                        fetchStalls()
                    ]);
                    setPayments(paymentData);
                    setReservations(resData);
                    setStalls(stallsData);
                }
            } catch (err) {
                setError('Failed to load payment history.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        if (userId) {
            loadData();
        }
    }, [userId]);

    const handleRefund = async (paymentId, reservationId) => {
        if (!window.confirm('Are you sure you want to request a refund for this payment?')) {
            return;
        }

        try {
            const refundRequest = { paymentId, reservationId };
            const response = await paymentService.requestRefund(refundRequest);
            setRefundMessage(`Refund Successful! Amount: ${response.refundAmount} (Status: ${response.status})`);

            // Refresh payments or update local state
            // For simplicity, we just reload the page or re-fetch, but let's re-fetch
            const data = await paymentService.getPaymentsByUserId(userId);
            setPayments(data);
        } catch (err) {
            console.error(err);
            // Check for duplicate entry error text from backend
            if (err.response?.data?.message?.includes('Duplicate entry') ||
                err.message?.includes('Duplicate entry')) {
                setRefundMessage('Refund request already submitted for this payment.');
                // Optionally, we could forcefully hide the button for this payment via local state
                // But for now, the message is sufficient feedback.
            } else {
                setRefundMessage(`Refund Failed: ${err.message || 'Unknown error'}`);
            }
        }
    };

    // Helper to calculate REAL paid amount (50% of real total)
   // Helper to calculate REAL paid amount based on stall dimensions (aligned with VenueMap logic)
const calculateRealPaidAmount = (reservationId) => {
    const reservation = reservations.find(r => r.reservationId === reservationId);
    if (!reservation || !reservation.stallNames || !stalls.length) return 0;

    const total = reservation.stallNames.reduce((sum, name) => {
        const stall = stalls.find(s => s.stallName === name);
        if (!stall) return sum;

        let price = 0;

        // Pricing tiers logic aligned with BookingPage / VenueMap
        if (stall.width <= 45 && stall.height <= 25) {
            price = 50000; // Standard
        } else if (stall.width <= 65 || stall.height <= 25) {
            price = 70000; // Medium
        } else {
            price = 100000; // Large
        }

        return sum + price;
    }, 0);

    return total / 2; // Payment is 50% deposit
};


    if (loading) return <div className="text-center py-10">Loading history...</div>;
    if (error) return <div className="text-center py-10 text-red-500">{error}</div>;

    return (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <h2 className="text-2xl font-bold text-[#1e3a5f] mb-6">Payment History</h2>

            {refundMessage && (
                <div className={`mb-4 p-4 rounded-md ${refundMessage.includes('Failed') ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'}`}>
                    {refundMessage}
                </div>
            )}

            <div className="bg-white shadow overflow-hidden rounded-lg">
                {payments.length === 0 ? (
                    <p className="p-6 text-gray-500 text-center">No payment history found.</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Payment ID
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Reservation ID
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Method
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Amount
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {payments.map((payment) => (
                                    <tr key={payment.paymentId}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            #{payment.paymentId}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {payment.reservationId}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {payment.paymentMethod}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-[#1e3a5f]">
                                            LKR {calculateRealPaidAmount(payment.reservationId).toFixed(2)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${payment.status === 'SUCCESS' ? 'bg-green-100 text-green-800' :
                                                payment.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                                                    payment.status === 'FAILED' ? 'bg-red-100 text-red-800' :
                                                        payment.status === 'REFUNDED' ? 'bg-purple-100 text-purple-800' :
                                                            'bg-gray-100 text-gray-800'
                                                }`}>
                                                {payment.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            {payment.status === 'SUCCESS' && (
                                                <button
                                                    onClick={() => handleRefund(payment.paymentId, payment.reservationId)}
                                                    className="text-indigo-600 hover:text-indigo-900 font-semibold"
                                                >
                                                    Request Refund
                                                </button>
                                            )}
                                            {payment.status === 'REFUNDED' && (
                                                <span className="text-gray-400">Refunded</span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PaymentHistory;
