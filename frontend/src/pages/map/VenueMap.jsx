import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
    fetchStalls,
    fetchHalls,
    holdStalls,
    getUserReservationCount,
} from "../../services/mapService";
import ConfirmationModal from "../../components/ConfirmationModal";

const MAX_SELECTION = 3;

export default function VenueMap() {
    const navigate = useNavigate();
    const userToken = localStorage.getItem("token");

    const [selectedStalls, setSelectedStalls] = useState([]);
    const [stalls, setStalls] = useState([]);
    const [halls, setHalls] = useState([]);
    const [userReservedCount, setUserReservedCount] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Helper to estimate price/size based on dimensions
    const getStallDetails = (stall) => {
        // Mock logic: assuming standard is 3x3, large is 6x3 based on width
        const isLarge = stall.width > 40;
        return {
            stallSize: isLarge ? "6x3 m" : "3x3 m",
            price: isLarge ? 100000 : 50000
        };
    };

    const loadData = async () => {
        try {
            setError(null);
            const stallData = await fetchStalls();
            const hallData = await fetchHalls();
            setStalls(stallData);
            setHalls(hallData);
        } catch (err) {
            console.error(err);
            setError("Failed to load map data. Please try again.");
        }
    };

    const loadUserReservationCount = async () => {
        try {
            const data = await getUserReservationCount();
            setUserReservedCount(data.count);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (stalls.length > 0) {
            const invalidStall = stalls.find(s => s.width === 0 || s.height === 0);
            if (invalidStall) {
                alert(`Warning: Some stalls (e.g., ${invalidStall.stallName}) have 0 width or height and are invisible on the map. Please check your database data.`);
            }
        }
    }, [stalls]);

    useEffect(() => {
        if (!userToken) {
            navigate("/login");
            return;
        }

        loadData();
        loadUserReservationCount();
    }, [userToken, navigate]);

    const getColors = (status) => {
        switch (status) {
            case "AVAILABLE":
                return { fill: "#10b981", stroke: "#047857" };
            case "HOLD":
                return { fill: "#ffe066", stroke: "#dcdc00" };
            case "BOOKED":
                return { fill: "#6c757d", stroke: "#aab2bd" };
            default:
                return { fill: "#dc3545", stroke: "#ff6b7d" };
        }
    };

    const handleClick = async (stall) => {
        await loadUserReservationCount();
        setError(null);

        if (stall.status !== "AVAILABLE") {
            setError(`${stall.stallName} is currently ${stall.status}.`);
            return;
        }

        const alreadySelected = selectedStalls.find(
            (s) => s.stallName === stall.stallName
        );

        if (alreadySelected) {
            setSelectedStalls(
                selectedStalls.filter((s) => s.stallName !== stall.stallName)
            );
            return;
        }

        if (userReservedCount + selectedStalls.length >= MAX_SELECTION) {
            setError(
                `Maximum ${MAX_SELECTION} stalls allowed. You have already reserved/held ${userReservedCount + selectedStalls.length} stalls.`
            );
            return;
        }

        // Add details to stall object for modal
        const details = getStallDetails(stall);
        const stallWithDetails = { ...stall, ...details };

        setSelectedStalls([...selectedStalls, stallWithDetails]);
    };

    const handleProceed = () => {
        setError(null);
        if (selectedStalls.length === 0) {
            setError("Please select at least one stall to proceed.");
            return;
        }
        setIsModalOpen(true);
    };

    const handleConfirmBooking = async () => {
        try {
            setLoading(true);
            setIsModalOpen(false);

            const stallIds = selectedStalls.map((s) =>
                s.stallName.toUpperCase()
            );

            await holdStalls(stallIds);

            await loadUserReservationCount();

            navigate("/booking-summary", {
                state: {
                    stalls: selectedStalls,
                },
            });

            setSelectedStalls([]);
        } catch (error) {
            console.error(error);
            let msg = error.response?.data?.message || error.message || "Failed to hold stalls.";
            if (msg.includes("Network Error") || msg.toLowerCase().includes("localhost")) {
                msg = "Unable to connect to the server. Please check your internet connection.";
            }
            setError(msg);
            setIsModalOpen(false);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col w-full h-full min-h-[calc(100vh-64px)] box-border bg-gray-100 overflow-hidden">
            {/* Header */}
            <div className="p-4 bg-white border-b border-gray-300 flex flex-col items-center text-center gap-1.5">
                <h2 className="text-2xl font-bold m-0">Exhibition Floor Plan</h2>
                <div className="font-semibold text-gray-800">
                    Stalls Selected: {userReservedCount + selectedStalls.length} / {MAX_SELECTION}
                </div>

                {error && (
                    <div className="mt-2 bg-red-50 border-l-4 border-red-400 p-4">
                        <div className="flex">
                            <div className="ml-3">
                                <p className="text-sm text-red-700">{error}</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <div className="flex-1 flex overflow-hidden flex-col md:flex-row">
                {/* Map */}
                <div className="flex-[3] flex justify-center items-center bg-gray-50 overflow-hidden relative">
                    <svg width="95%" height="95%" viewBox="0 0 2000 1400" className="max-h-full max-w-full">
                        {/* Base Polygon */}
                        <polygon
                            points="
                                0,80
                                0,950
                                40,1300
                                600,1300
                                1300,1300
                                1800,700
                                1450,10
                                700,20
                            "
                            fill="white"
                            stroke="black"
                            strokeWidth="2"
                        />

                        {/* Lines */}
                        <line x1="1730" y1="10" x2="2280" y2="1050" stroke="black" strokeWidth="6" />
                        <line x1="1870" y1="830" x2="1500" y2="1300" stroke="black" strokeWidth="2" />
                        <line x1="1870" y1="830" x2="2130" y2="1300" stroke="black" strokeWidth="2" />

                        {/* Circles */}
                        <circle cx="660" cy="550" r="70" fill="none" stroke="black" strokeWidth="2" />
                        <circle cx="660" cy="550" r="55" fill="none" stroke="black" strokeDasharray="5,5" />

                        <circle cx="1000" cy="550" r="130" fill="none" stroke="black" strokeWidth="3" />
                        <circle cx="1000" cy="550" r="110" fill="none" stroke="black" />
                        <circle cx="1000" cy="550" r="100" fill="none" stroke="black" strokeDasharray="8,8" />
                        <rect x="965" y="515" width="70" height="70" fill="none" stroke="black" />

                        {/* Halls */}
                        {halls.map((hall) => (
                            <g key={hall.id}>
                                <rect
                                    x={hall.x} y={hall.y}
                                    width={hall.width} height={hall.height}
                                    fill="#fdfdfd" stroke="#eee" strokeWidth="2"
                                />
                                <text
                                    x={hall.x + hall.width / 2} y={hall.y + 25}
                                    textAnchor="middle" fontSize="16" fontWeight="bold" fill="#aaa"
                                >
                                    {hall.name}
                                </text>
                            </g>
                        ))}

                        {/* Stalls */}
                        {stalls.map((stall) => {
                            const colors = getColors(stall.status);
                            const isSelected = selectedStalls.some(s => s.stallName === stall.stallName);

                            return (
                                <g
                                    key={stall.stallName}
                                    onClick={() => handleClick(stall)}
                                    className="group cursor-pointer"
                                >
                                    <rect
                                        className={`transition-all duration-200 ${isSelected ? 'stroke-[3] stroke-[#007bff]' : 'group-hover:stroke-[3] group-hover:stroke-[#ff6600]'}`}
                                        x={stall.x} y={stall.y}
                                        width={stall.width} height={stall.height}
                                        fill={colors.fill}
                                        stroke={isSelected ? '#007bff' : colors.stroke}
                                        strokeWidth={isSelected ? "3" : "2"}
                                        rx="4"
                                    />
                                    <text
                                        className="pointer-events-none"
                                        x={stall.x + stall.width / 2}
                                        y={stall.y + stall.height / 2}
                                        textAnchor="middle"
                                        dominantBaseline="middle"
                                        fontSize="12"
                                    >
                                        {stall.stallName}
                                    </text>
                                </g>
                            );
                        })}
                    </svg>
                </div>

                {/* Selection Panel */}
                <div className="flex-1 bg-white p-6 border-t md:border-t-0 md:border-l border-gray-200 flex flex-col overflow-y-auto">

                    {/* Title */}
                    <h3 className="text-xl font-bold mb-1">Your Selection</h3>
                    <p className="text-sm text-gray-500 mb-4">
                        Choose up to {MAX_SELECTION} stalls
                    </p>

                    {/* Counter + Progress */}
                    <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-gray-700">
                            Selected Stalls
                        </span>
                        <span className="font-semibold text-gray-800">
                            {selectedStalls.length} / {MAX_SELECTION}
                        </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full h-3 bg-gray-200 rounded-full mb-5">
                        <div
                            className="h-3 bg-blue-600 rounded-full transition-all duration-300"
                            style={{
                                width: `${(selectedStalls.length / MAX_SELECTION) * 100}%`
                            }}
                        />
                    </div>

                    {/* Selected Stall List */}
                    <div className="space-y-3">
                        {selectedStalls.length === 0 && (
                            <p className="text-gray-400 text-sm">
                                No stalls selected yet.
                            </p>
                        )}

                        {selectedStalls.map((stall) => (
                            <div
                                key={stall.stallName}
                                className="flex items-center justify-between border rounded-lg px-4 py-3 bg-gray-50"
                            >
                                <div>
                                    <p className="font-semibold text-gray-800">
                                        {stall.stallName}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        {halls.find(h => h.id === stall.hallId)?.name || "Hall"}
                                    </p>
                                </div>

                                <button
                                    onClick={() =>
                                        setSelectedStalls(
                                            selectedStalls.filter(
                                                (s) => s.stallName !== stall.stallName
                                            )
                                        )
                                    }
                                    className="text-red-500 text-sm font-medium hover:text-red-600"
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* Proceed Button */}
                    <button
                        className="mt-6 p-3 bg-blue-600 text-white rounded-lg font-semibold transition hover:bg-blue-700 disabled:bg-gray-300"
                        onClick={handleProceed}
                        disabled={loading || selectedStalls.length === 0}
                    >
                        {loading ? "Holding Stalls..." : "Confirm & Proceed to Booking"}
                    </button>

                </div>
            </div>

            <ConfirmationModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={handleConfirmBooking}
                stalls={selectedStalls}
                totalPrice={selectedStalls.reduce((sum, s) => sum + (s.price || 0), 0)}
            />
        </div>
    );
}