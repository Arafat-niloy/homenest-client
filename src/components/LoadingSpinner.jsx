// src/components/LoadingSpinner.jsx

import React from 'react';

const LoadingSpinner = () => {
    return (
        <div className="flex justify-center items-center min-h-[calc(100vh-300px)]">
            <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
    );
};

export default LoadingSpinner;