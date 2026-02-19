import React, { useEffect, useState } from 'react';
import adminService from '../../services/adminService';
import StatCard from '../../components/common/StatCard';
import { faChartPie, faCalendarAlt, faMoneyBill, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Reports = () => {
    const [stats, setStats] = useState(null);
    const [genreData, setGenreData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [statsData, genreReportData] = await Promise.all([
                    adminService.getDashboardStats(),
                    adminService.getGenreReports()
                ]);
                setStats(statsData);
                setGenreData(genreReportData);
            } catch (error) {
                console.error("Error fetching data", error);
                setError("Failed to load reports. Please ensure the backend is running and you are logged in.");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) return (
        <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#1e3a5f]"></div>
        </div>
    );

    if (error) return (
        <div className="p-6 text-center text-red-500">
            {error}
        </div>
    );

    const totalStalls = (stats?.availableStalls || 0) + (stats?.reservedStalls || 0);

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold text-[#1e3a5f] mb-8">Reports & Analytics</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <StatCard title="Revenue Summary" value={`$${stats?.totalRevenue || 0}`} icon={faMoneyBill} color="bg-blue-50" />
                <StatCard title="Total Reservations" value={stats?.totalReservations || 0} icon={faCalendarAlt} color="bg-green-50" />
                <StatCard title="Occupancy Rate" value={`${totalStalls ? Math.round(((stats?.reservedStalls || 0) / totalStalls) * 100) : 0}%`} icon={faChartPie} color="bg-purple-50" />
            </div>

            {/* Genre Distribution Bar Chart */}
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
                <h2 className="text-xl font-bold text-[#1e3a5f] mb-6">Genre Distribution</h2>

                {genreData.length > 0 ? (
                    <div className="space-y-4">
                        {genreData.map((genre) => {
                            const maxCount = Math.max(...genreData.map(g => g.count));
                            const percentage = maxCount > 0 ? (genre.count / maxCount) * 100 : 0;

                            return (
                                <div key={genre.id} className="flex items-center">
                                    <div className="w-32 font-medium text-gray-600 truncate pr-4">{genre.genreName}</div>
                                    <div className="flex-1 bg-gray-100 rounded-full h-4 overflow-hidden">
                                        <div
                                            className="bg-[#1e3a5f] h-full rounded-full transition-all duration-500 ease-out"
                                            style={{ width: `${percentage}%` }}
                                        ></div>
                                    </div>
                                    <div className="w-12 text-right font-bold text-[#1e3a5f] pl-4">{genre.count}</div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="text-center text-gray-500 py-8">No genre data available to display.</div>
                )}
            </div>
        </div>
    );
};

export default Reports;
