import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faUsers, faStore, faCalendarCheck, faChartBar, faEnvelope, faList } from '@fortawesome/free-solid-svg-icons';

const AdminSidebar = () => {
    const location = useLocation();

    // Helper to determine if link is active
    const isActive = (path) => location.pathname === path || (path !== '/admin-dashboard' && location.pathname.startsWith(path));

    const navItems = [
        { path: '/admin-dashboard', label: 'Dashboard', icon: faTachometerAlt },
        { path: '/admin-dashboard/users', label: 'User Management', icon: faUsers },
        { path: '/admin-dashboard/stalls', label: 'Stall Management', icon: faStore },
        { path: '/admin-dashboard/reservations', label: 'Reservations', icon: faCalendarCheck },
        { path: '/admin-dashboard/reports', label: 'Reports', icon: faChartBar },
        { path: '/admin-dashboard/genres', label: 'Genre Reports', icon: faList },
    ];

    return (
        <div className="w-64 bg-[#1e3a5f] text-white h-screen fixed left-0 top-0 overflow-y-auto z-20 hidden md:block border-r border-[#ffffff26]">
            <div className="p-6 border-b border-[#ffffff1a]">
                <h2 className="text-2xl font-bold text-[#c9a227]">BookFair Admin</h2>
            </div>
            <nav className="mt-6">
                <ul>
                    {navItems.map((item) => (
                        <li key={item.path}>
                            <Link
                                to={item.path}
                                className={`flex items-center px-6 py-4 transition-colors hover:bg-[#152a47] hover:text-[#c9a227] ${isActive(item.path) ? 'bg-[#152a47] text-[#c9a227] border-r-4 border-[#c9a227]' : 'text-gray-300'}`}
                            >
                                <FontAwesomeIcon icon={item.icon} className="mr-3 w-5" />
                                <span className="font-medium">{item.label}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
};

export default AdminSidebar;
