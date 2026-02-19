import React, { useEffect, useState } from 'react';
import refundService from '../../services/refundService'; // Ensure correct path
import { useReservation } from '../../context/ReservationContext';

const RefundHistory = () => {
  const { userId } = useReservation();
  const [refunds, setRefunds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRefunds = async () => {
      if (!userId) return;

      try {
        const data = await refundService.getRefundsByUserId(userId);
        setRefunds(data || []);
      } catch (err) {
        console.error('Failed to load refunds', err);
        setError('Failed to load refund history.');
      } finally {
        setLoading(false);
      }
    };

    fetchRefunds();
  }, [userId]);

  if (loading)
    return <div className="p-8 text-center text-gray-500">Loading refunds...</div>;

  if (error)
    return <div className="p-8 text-center text-red-500">{error}</div>;

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-100">
        <h2 className="text-lg font-semibold text-gray-800">Refund History</h2>
      </div>

      {refunds.length === 0 ? (
        <div className="p-8 text-center text-gray-500">
          No refund history found.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Refund ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Reservation
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {refunds.map((r) => (
                <tr key={r.refundId}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    #{r.refundId}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {r.message || 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                    Rs. {r.refundAmount?.toLocaleString() || '0'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        r.status === 'PENDING'
                          ? 'bg-yellow-100 text-yellow-800'
                          : r.status === 'APPROVED'
                          ? 'bg-green-100 text-green-800'
                          : r.status === 'REJECTED'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {r.status}
                    </span>
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

export default RefundHistory;
