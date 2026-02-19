import React, { useEffect, useState } from 'react';
import adminService from '../../services/adminService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faList, faBuilding, faEnvelope } from '@fortawesome/free-solid-svg-icons';

const GenreReports = () => {
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newGenre, setNewGenre] = useState('');
    const [adding, setAdding] = useState(false);

    const fetchReports = async () => {
        setLoading(true);
        try {
            const data = await adminService.getGenreReports();
            setReports(data || []);
        } catch (error) {
            console.error("Error fetching genre reports", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReports();
    }, []);

    const handleAddGenre = async (e) => {
        e.preventDefault();
        if (!newGenre.trim()) return;

        setAdding(true);
        try {
            await adminService.addGenre(newGenre);
            setNewGenre('');
            alert('Genre added successfully');
            fetchReports();
        } catch (error) {
            console.error("Error adding genre", error);
            alert('Failed to add genre. It might already exist.');
        } finally {
            setAdding(false);
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold text-[#1e3a5f] mb-8">Genre Reports</h1>

            {/* Add Genre Section */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-8 border border-gray-100">
                <h2 className="text-xl font-bold text-[#1e3a5f] mb-4 flex items-center">
                    <FontAwesomeIcon icon={faPlus} className="mr-2" />
                    Add New Genre
                </h2>
                <form onSubmit={handleAddGenre} className="flex gap-4 items-center">
                    <input
                        type="text"
                        placeholder="Enter genre name (e.g., Sci-Fi, Thriller)"
                        className="flex-grow border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-[#c9a227] focus:border-transparent outline-none transition-shadow"
                        value={newGenre}
                        onChange={(e) => setNewGenre(e.target.value)}
                        required
                    />
                    <button
                        type="submit"
                        disabled={adding}
                        className="bg-[#1e3a5f] text-white px-6 py-3 rounded-md hover:bg-[#152a47] transition-colors font-medium disabled:opacity-70 whitespace-nowrap shadow-sm"
                    >
                        {adding ? 'Adding...' : 'Add Genre'}
                    </button>
                </form>
            </div>

            {/* Reports List */}
            {loading ? (
                <div className="text-center py-12 text-gray-500">Loading reports...</div>
            ) : (
                <div className="space-y-6">
                    {reports.length === 0 ? (
                        <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-200 text-gray-500">
                            No genres found. Add a new genre above to get started.
                        </div>
                    ) : (
                        reports.map((genre) => (
                            <div key={genre.id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100">
                                <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                                    <h3 className="text-lg font-bold text-[#1e3a5f] flex items-center">
                                        <FontAwesomeIcon icon={faList} className="mr-2 text-[#c9a227]" />
                                        {genre.genreName}
                                    </h3>
                                    <span className="text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-medium">
                                        {genre.count} {genre.count === 1 ? 'Business' : 'Businesses'}
                                    </span>
                                </div>

                                {genre.businesses && genre.businesses.length > 0 ? (
                                    <div className="divide-y divide-gray-100">
                                        {genre.businesses.map((business, index) => (
                                            <div key={index} className="px-6 py-4 hover:bg-gray-50 transition-colors flex flex-col sm:flex-row sm:justify-between sm:items-center">
                                                <div className="flex items-center mb-2 sm:mb-0">
                                                    <div className="bg-gray-100 p-2 rounded-full mr-3 text-gray-500">
                                                        <FontAwesomeIcon icon={faBuilding} className="w-4 h-4" />
                                                    </div>
                                                    <span className="font-medium text-gray-800">{business.businessName || 'Unknown Business'}</span>
                                                </div>
                                                <div className="flex items-center text-gray-600 text-sm">
                                                    <FontAwesomeIcon icon={faEnvelope} className="text-gray-400 mr-2" />
                                                    {business.email}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="p-6 text-center text-gray-400 italic bg-white">
                                        No businesses have selected this genre yet.
                                    </div>
                                )}
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
};

export default GenreReports;
