import React, { useEffect, useState } from 'react';
import adminService from '../../services/adminService';
import DataTable from '../../components/common/DataTable';

const Reservations = () => {
    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchReservations();
    }, []);

    const fetchReservations = async () => {
        setLoading(true);
        try {
            const data = await adminService.getAllReservations();
            setReservations(data);
        } catch (error) {
            console.error("Error fetching reservations", error);
        } finally {
            setLoading(false);
        }
    };

    const columns = [
        { label: 'ID', key: 'id' },
        { label: 'User', key: 'userName' },
        { label: 'Email', key: 'userEmail' },
        { label: 'Stalls', key: 'stallNames', render: (row) => row.stallNames?.join(', ') },
        { label: 'Date', key: 'reservationDate', render: (row) => new Date(row.reservationDate).toLocaleString() },
        {
            label: 'Status', key: 'status', render: (row) => (
                <span className={`px-2 py-1 rounded text-xs font-bold ${row.status === 'CONFIRMED' ? 'bg-green-100 text-green-800' :
                        row.status === 'PENDING_PAYMENT' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                    }`}>
                    {row.status}
                </span>
            )
        },
        { label: 'Price', key: 'price', render: (row) => `$${row.price}` },
        { label: 'QR', key: 'qrCode', render: (row) => row.qrCode ? <span className="text-xs truncate max-w-[100px] block cursor-help" title={row.qrCode}>Yes</span> : 'No' },
    ];

    return (
        <div>
            <h1 className="text-3xl font-bold text-[#1e3a5f] mb-6">Reservation Management</h1>
            <DataTable columns={columns} data={reservations} isLoading={loading} />
        </div>
    );
};

export default Reservations;
