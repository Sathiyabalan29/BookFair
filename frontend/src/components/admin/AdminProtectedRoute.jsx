import React from 'react';
import { Navigate } from 'react-router-dom';
import authService from '../../services/authService';

const AdminProtectedRoute = ({ children }) => {
    const isAuthenticated = authService.isAuthenticated();
    const role = authService.getRole();

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    if (role !== 'ADMIN') {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default AdminProtectedRoute;
