import React, { useEffect, useState } from 'react';
import reservationService from '../../services/reservationService';
import authService from '../../services/authService';
import { fetchStalls } from '../../services/mapService';

const BookingHistory = () => {
    const [reservations, setReservations] = useState([]);
    const [stalls, setStalls] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadData = async () => {
            try {
                const user = authService.getCurrentUser();
                if (user && user.id) {
                    const [resData, stallsData] = await Promise.all([
                        reservationService.getUserReservations(user.id),
                        fetchStalls()
                    ]);
                    setReservations(resData);
                    setStalls(stallsData);
                }
            } catch (err) {
                console.error("Failed to load bookings", err);
                setError("Failed to load booking history.");
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []);

    const handleCancel = async (id) => {
        if (window.confirm("Are you sure you want to cancel this reservation?")) {
            try {
                await reservationService.cancelReservation(id);
                // Refresh list
                const user = authService.getCurrentUser();
                const data = await reservationService.getUserReservations(user.id);
                setReservations(data);
            } catch (err) {
                alert("Failed to cancel reservation.");
            }
        }
    };

    // Helper to recalculate total based on stall names and dimensions
    const calculateRealTotal = (stallNames) => {
        if (!stallNames || !stalls.length) return 0;

        return stallNames.reduce((total, name) => {
            const stall = stalls.find(s => s.stallName === name);
            if (!stall) return total; // or handle missing stall
            // Pricing logic matching BookingPage/VenueMap
            const price = stall.width > 40 ? 100000 : 50000;
            return total + price;
        }, 0);
    };

    if (loading) return <div className="p-8 text-center text-gray-500">Loading bookings...</div>;
    if (error) return <div className="p-8 text-center text-red-500">{error}</div>;

    return (
        <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100">
                <h2 className="text-lg font-semibold text-gray-800">My Bookings</h2>
            </div>

            {reservations.length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                    You have no bookings yet.
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stalls</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {reservations.map((res) => (
                                <tr key={res.reservationId}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        #{res.reservationId}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {new Date(res.reservationDate).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {res.stallNames?.join(", ") || "N/A"}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-semibold">
                                        Rs. {calculateRealTotal(res.stallNames).toLocaleString()}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                            ${res.status === 'CONFIRMED' ? 'bg-green-100 text-green-800' :
                                                res.status === 'PENDING_PAYMENT' ? 'bg-yellow-100 text-yellow-800' :
                                                    'bg-red-100 text-red-800'}`}>
                                            {res.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        {res.status === 'PENDING_PAYMENT' && (
                                            <button
                                                onClick={() => handleCancel(res.reservationId)}
                                                className="text-red-600 hover:text-red-900"
                                            >
                                                Cancel
                                            </button>
                                        )}
                                        {/* Add 'Pay Now' button here in future if needed */}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default BookingHistory;
