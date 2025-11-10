

import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthProvider';
import LoadingSpinner from '../components/LoadingSpinner';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    // spinner while loading
    if (loading) {
        return <LoadingSpinner />;
    }

    // If user is logged in, allow access
    if (user) {
        return children;
    }

    // If not logged in, redirect to login
    return <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivateRoute;
