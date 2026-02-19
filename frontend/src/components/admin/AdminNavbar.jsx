import React from 'react';
import authService from '../../services/authService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const AdminNavbar = () => {
    const user = authService.getCurrentUser();
    const navigate = useNavigate();

    const handleLogout = () => {
        authService.logout();
    };

    return (
        <header className="bg-white shadow-md h-16 fixed top-0 right-0 left-0 md:left-64 z-10 flex items-center justify-between px-6">
            <div className="text-xl font-semibold text-[#1e3a5f] md:block hidden">
                Admin Panel
            </div>
            <div className="md:hidden text-xl font-bold text-[#1e3a5f]">
                BookFair
            </div>
            <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2 text-gray-700">
                    <FontAwesomeIcon icon={faUserCircle} className="text-2xl text-[#1e3a5f]" />
                    <span className="font-medium hidden sm:block">{user ? user.name || user.email : 'Admin'}</span>
                </div>
                <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 text-red-600 hover:text-red-800 transition-colors font-medium border border-red-200 px-4 py-2 rounded-md hover:bg-red-50"
                >
                    <FontAwesomeIcon icon={faSignOutAlt} />
                    <span className="hidden sm:inline">Logout</span>
                </button>
            </div>
        </header>
    );
};

export default AdminNavbar;
