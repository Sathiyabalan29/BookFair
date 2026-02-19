import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import AdminNavbar from './AdminNavbar';

const AdminLayout = () => {
    return (
        <div className="min-h-screen bg-gray-100 font-sans">
            <AdminSidebar />
            <AdminNavbar />
            <main className="md:ml-64 pt-16 min-h-screen">
                <div className="p-6 md:p-8 max-w-7xl mx-auto">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;
