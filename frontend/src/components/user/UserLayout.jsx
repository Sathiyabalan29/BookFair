import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faUser,
    faCalendarAlt,
    faCreditCard,
    faUndo,
    faSignOutAlt,
    faListAlt
} from '@fortawesome/free-solid-svg-icons';
import authService from '../../services/authService';

const UserLayout = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        authService.logout();
        navigate('/login');
    };

    const navItems = [
        { path: '/profile', end: true, label: 'My Profile', icon: faUser },
        { path: '/profile/bookings', label: 'My Bookings', icon: faCalendarAlt },
        { path: '/profile/payments', label: 'Payment History', icon: faCreditCard },
        { path: '/profile/refunds', label: 'Refund History', icon: faUndo },
    ];

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
            {/* Sidebar */}
            <aside className="w-full md:w-64 bg-white shadow-lg z-10">
                <div className="p-6 border-b border-gray-100">
                    <h2 className="text-xl font-bold text-[#1e3a5f]">My Account</h2>
                </div>

                <nav className="p-4 space-y-1">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            end={item.end}
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive
                                    ? 'bg-blue-50 text-blue-600 font-semibold'
                                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                }`
                            }
                        >
                            <FontAwesomeIcon icon={item.icon} className="w-5" />
                            {item.label}
                        </NavLink>
                    ))}

                    <div className="pt-4 mt-4 border-t border-gray-100">
                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
                        >
                            <FontAwesomeIcon icon={faSignOutAlt} className="w-5" />
                            Logout
                        </button>
                    </div>
                </nav>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 p-4 md:p-8 overflow-y-auto">
                <div className="max-w-6xl mx-auto">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default UserLayout;
