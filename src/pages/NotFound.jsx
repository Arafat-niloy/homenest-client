// src/pages/NotFound/NotFound.jsx

import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-base-200">
            <h1 className="text-9xl font-bold text-primary">404</h1>
            <h2 className="text-4xl font-semibold mt-4 mb-2">Page Not Found</h2>
            <p className="text-lg text-gray-600 mb-8">
                Sorry, the page you are looking for does not exist.
            </p>
            <Link to="/" className="btn btn-primary text-white">
                Go Back to Home
            </Link>
        </div>
    );
};

export default NotFound;