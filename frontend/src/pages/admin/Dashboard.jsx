import React, { useEffect, useState } from 'react';
import adminService from '../../services/adminService';
import StatCard from '../../components/common/StatCard';
import DataTable from '../../components/common/DataTable';
import { faUsers, faStore, faCalendarCheck, faMoneyBillWave, faChartLine, faCheckCircle, faClock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Dashboard = () => {
    const [stats, setStats] = useState(null);
    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch stats and reservations in parallel
                const [statsData, reservationsData] = await Promise.all([
                    adminService.getDashboardStats(),
                    adminService.getAllReservations()
                ]);
                setStats(statsData);

                // Get last 5 reservations
                // data might be sorted by date descending from backend, but if not we can sort here
                // assuming backend returns them. 
                // AdminReservationDTO has reservationDate.
                const sorted = [...reservationsData].sort((a, b) => new Date(b.reservationDate) - new Date(a.reservationDate));
                setReservations(sorted.slice(0, 5));
            } catch (error) {
                console.error("Error fetching dashboard data", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const reservationColumns = [
        { label: 'Reservation ID', key: 'id' },
        { label: 'User', key: 'userName' },
        { label: 'Stalls', key: 'stallNames', render: (row) => row.stallNames ? row.stallNames.join(', ') : '' },
        { label: 'Date', key: 'reservationDate', render: (row) => new Date(row.reservationDate).toLocaleDateString() },
        {
            label: 'Status', key: 'status', render: (row) => (
                <span className={`px-2 py-1 rounded text-xs font-bold ${row.status === 'CONFIRMED' ? 'bg-green-100 text-green-800' :
                    row.status === 'PENDING_PAYMENT' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                    }`}>
                    {row.status}
                </span>
            )
        },
        { label: 'Price', key: 'price', render: (row) => `$${row.price}` }
    ];

    if (loading) return (
        <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#1e3a5f]"></div>
        </div>
    );

    return (
        <div>
            <h1 className="text-3xl font-bold text-[#1e3a5f] mb-8">Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
                <StatCard title="Total Users" value={stats?.totalUsers || 0} icon={faUsers} />
                <StatCard title="Total Reservations" value={stats?.totalReservations || 0} icon={faCalendarCheck} />
                <StatCard title="Available Stalls" value={stats?.availableStalls || 0} icon={faCheckCircle} textColor="text-green-600" />
                <StatCard title="Reserved Stalls" value={stats?.reservedStalls || 0} icon={faStore} textColor="text-orange-500" />
                <StatCard title="Total Payments" value={stats?.totalPayments || 0} icon={faMoneyBillWave} />
                <StatCard title="Total Revenue" value={`$${stats?.totalRevenue || 0}`} icon={faChartLine} />
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-[#1e3a5f] flex items-center">
                        <FontAwesomeIcon icon={faClock} className="mr-2" />
                        Recent Reservations
                    </h2>
                </div>
                <DataTable columns={reservationColumns} data={reservations} isLoading={loading} />
            </div>
        </div>
    );
};

export default Dashboard;
