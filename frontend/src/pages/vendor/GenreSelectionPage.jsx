import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import genreService from '../../services/userService';
import authService from '../../services/authService';
import { useReservation } from '../../context/ReservationContext';

const GenreSelectionPage = () => {
    const navigate = useNavigate();
    const { userId: reservationUserId } = useReservation();
    const userId = reservationUserId || authService.getCurrentUser()?.id;

    const [selectedGenres, setSelectedGenres] = useState([]);
    const [availableGenres, setAvailableGenres] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState(null);

    // Fetch all genres and user's existing selections
    useEffect(() => {
        const fetchGenres = async () => {
            if (!userId) {
                setError('User not logged in.');
                setLoading(false);
                return;
            }

            try {
                setLoading(true);

                // Fetch all available genres
                const genres = await genreService.getAllGenres();
                setAvailableGenres(genres);

                // Fetch user's selected genres
                const userGenres = await genreService.getGenresByUserId(userId);
                setSelectedGenres(userGenres.map(g => g.id));

            } catch (err) {
                console.error('Failed to fetch genres', err);
                setError('Failed to load genres.');
            } finally {
                setLoading(false);
            }
        };

        fetchGenres();
    }, [userId]);

    const toggleGenre = (genreId) => {
        setSelectedGenres(prev =>
            prev.includes(genreId)
                ? prev.filter(id => id !== genreId)
                : [...prev, genreId]
        );
    };

    const handleSave = async () => {
        if (!userId) {
            alert("User session not found. Please log in.");
            navigate('/login');
            return;
        }

        if (selectedGenres.length === 0) {
            alert("Please select at least one genre.");
            return;
        }

        setSaving(true);
        try {
            await genreService.updateUserGenres(userId, selectedGenres);
            alert("Genres saved successfully!");
            navigate('/profile');
        } catch (err) {
            console.error("Failed to save genres", err);
            alert("Failed to save genres. Please try again.");
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
            <div className="max-w-4xl w-full bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-8 text-center">
                    <h1 className="text-3xl font-extrabold text-white tracking-tight">Select Literary Genres</h1>
                    <p className="text-blue-100 mt-2 text-lg">Choose the genres that best describe your collection.</p>
                </div>

                <div className="p-10">
                    {loading && (
                        <div className="text-center py-10">
                            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                            <p className="mt-2 text-gray-600">Loading genres...</p>
                        </div>
                    )}

                    {!loading && error && (
                        <div className="text-center text-red-500 py-10">{error}</div>
                    )}

                    {!loading && !error && (
                        <>
                            {availableGenres.length === 0 ? (
                                <div className="text-center py-10">
                                    <p className="text-gray-500">No genres available</p>
                                </div>
                            ) : (
                                <>
                                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                        {availableGenres.map((genre) => {
                                            const isSelected = selectedGenres.includes(genre.id);
                                            return (
                                                <div
                                                    key={genre.id}
                                                    onClick={() => !saving && toggleGenre(genre.id)}
                                                    className={`
                                                        cursor-pointer relative group rounded-xl p-6 flex flex-col items-center justify-center text-center transition-all duration-300 border-2
                                                        ${isSelected
                                                            ? 'border-blue-500 bg-blue-50 shadow-md transform scale-105'
                                                            : 'border-gray-100 bg-white hover:border-blue-300 hover:shadow-lg hover:-translate-y-1'
                                                        }
                                                    `}
                                                >
                                                    <div className={`
                                                        w-12 h-12 mb-4 rounded-full flex items-center justify-center text-xl font-bold transition-colors
                                                        ${isSelected ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-500 group-hover:bg-blue-100 group-hover:text-blue-600'}
                                                    `}>
                                                        {genre.name ? genre.name.charAt(0).toUpperCase() : '?'}
                                                    </div>
                                                    <h3 className={`font-semibold text-lg ${isSelected ? 'text-blue-800' : 'text-gray-700'}`}>
                                                        {genre.name}
                                                    </h3>
                                                    {/* <p className="text-xs text-gray-400 mt-1">ID: {genre.id}</p> */}

                                                    {isSelected && (
                                                        <div className="absolute top-3 right-3 bg-blue-500 text-white rounded-full p-1 shadow-sm">
                                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                                            </svg>
                                                        </div>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>

                                    <div className="mt-12 flex justify-center">
                                        <button
                                            onClick={handleSave}
                                            disabled={saving || selectedGenres.length === 0}
                                            className={`
                                                px-10 py-4 rounded-full text-lg font-bold shadow-lg transform transition-all focus:outline-none focus:ring-4 focus:ring-blue-300
                                                ${saving || selectedGenres.length === 0
                                                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                                    : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 hover:shadow-xl hover:-translate-y-1 active:scale-95'
                                                }
                                            `}
                                        >
                                            {saving ? 'Saving...' : `Save ${selectedGenres.length} Selected Genres`}
                                        </button>
                                    </div>
                                </>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default GenreSelectionPage;