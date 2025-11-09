// src/routes/PrivateRoute.jsx

import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthProvider';
import LoadingSpinner from '../components/LoadingSpinner';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    // ১. যদি লোডিং অবস্থায় থাকে, স্পিনার দেখাও
    if (loading) {
        return <LoadingSpinner />;
    }

    // ২. যদি ইউজার লগইন করা থাকে, তাকে যেতে দাও
    if (user) {
        return children;
    }

    // ৩. যদি লগইন করা না থাকে, লগইন পেজে পাঠিয়ে দাও
    return <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivateRoute;