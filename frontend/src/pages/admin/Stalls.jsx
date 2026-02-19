import React, { useEffect, useState } from 'react';
import adminService from '../../services/adminService';
import DataTable from '../../components/common/DataTable';

const Stalls = () => {
    const [stalls, setStalls] = useState([]);
    const [mapStalls, setMapStalls] = useState([]);
    const [loading, setLoading] = useState(true);
    const [viewMode, setViewMode] = useState('list'); // 'list' or 'map'
    const [filter, setFilter] = useState('ALL'); // ALL, AVAILABLE, BOOKED

    useEffect(() => {
        fetchStalls();
    }, [filter]);

    useEffect(() => {
        if (viewMode === 'map' && mapStalls.length === 0) {
            fetchMap();
        }
    }, [viewMode]);

    const fetchStalls = async () => {
        setLoading(true);
        try {
            let data;
            if (filter === 'AVAILABLE') data = await adminService.getAvailableStalls();
            else if (filter === 'BOOKED') data = await adminService.getReservedStalls(); // 'reserved' endpoint
            else data = await adminService.getAllStalls();
            setStalls(data);
        } catch (error) {
            console.error("Error fetching stalls", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchMap = async () => {
        try {
            const data = await adminService.getStallMap();
            setMapStalls(data);
        } catch (error) {
            console.error("Error fetching map", error);
        }
    };

    const columns = [
        { label: 'Stall Name', key: 'stallName' },
        {
            label: 'Status', key: 'status', render: (row) => (
                <span className={`px-2 py-1 rounded text-xs font-bold ${row.status === 'AVAILABLE' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {row.status}
                </span>
            )
        },
        { label: 'Held By', key: 'heldBy', render: (row) => row.heldBy || '-' },
        { label: 'Price', key: 'price', render: (row) => row.price ? `$${row.price}` : '-' },
    ];

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-[#1e3a5f]">Stall Management</h1>
                <div className="flex bg-gray-200 rounded p-1">
                    <button
                        onClick={() => setViewMode('list')}
                        className={`px-4 py-2 rounded text-sm font-medium transition-colors ${viewMode === 'list' ? 'bg-white text-[#1e3a5f] shadow' : 'text-gray-600'}`}
                    >
                        List View
                    </button>
                    <button
                        onClick={() => setViewMode('map')}
                        className={`px-4 py-2 rounded text-sm font-medium transition-colors ${viewMode === 'map' ? 'bg-white text-[#1e3a5f] shadow' : 'text-gray-600'}`}
                    >
                        Map View
                    </button>
                </div>
            </div>

            {viewMode === 'list' && (
                <div className="mb-4 flex space-x-2">
                    {['ALL', 'AVAILABLE', 'BOOKED'].map(f => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`px-3 py-1 rounded text-sm font-medium transition-colors ${filter === f ? 'bg-[#c9a227] text-white' : 'bg-white text-gray-600 border hover:bg-gray-50'}`}
                        >
                            {f}
                        </button>
                    ))}
                </div>
            )}

            {viewMode === 'list' ? (
                <DataTable columns={columns} data={stalls} isLoading={loading} />
            ) : (
                <div className="bg-white p-4 rounded shadow overflow-auto h-[600px] relative border border-gray-200">
                    {/* Map Container */}
                    <div className="relative min-w-[800px] min-h-[600px] bg-gray-50">
                        {mapStalls.map((stall) => (
                            <div
                                key={stall.stallName}
                                style={{
                                    left: `${stall.x}px`,
                                    top: `${stall.y}px`,
                                    width: `${stall.width}px`,
                                    height: `${stall.height}px`,
                                    position: 'absolute'
                                }}
                                className={`flex items-center justify-center border text-xs font-bold cursor-pointer transition-all hover:brightness-95 hover:z-10 hover:shadow-lg rounded-sm ${stall.status === 'AVAILABLE' ? 'bg-green-100 border-green-400 text-green-800' :
                                        'bg-red-100 border-red-400 text-red-800'
                                    }`}
                                title={`${stall.stallName} - ${stall.status}`}
                            >
                                {stall.stallName}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Stalls;
