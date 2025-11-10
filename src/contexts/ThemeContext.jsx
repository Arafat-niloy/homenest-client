import React, { createContext, useContext, useState, useEffect } from 'react';

// Context তৈরি
export const ThemeContext = createContext(null);

// কাস্টম হুক
export const useTheme = () => {
    return useContext(ThemeContext);
}

export const ThemeProvider = ({ children }) => {
    // ১. প্রথমে localStorage থেকে সেভ করা থিম খোঁজা, না পেলে 'light' ডিফল্ট
    const [theme, setTheme] = useState(() => {
        return localStorage.getItem('theme') || 'light';
    });

    // ২. যখনই থিম পরিবর্তন হবে, এই ইফেক্টটি চলবে
    useEffect(() => {
        // html ট্যাগ-এ 'data-theme' অ্যাট্রিবিউট সেট করা
        document.documentElement.setAttribute('data-theme', theme);
        // পরিবর্তনটি localStorage-এ সেভ করা
        localStorage.setItem('theme', theme);
    }, [theme]); // 'theme' পরিবর্তন হলেই চলবে

    // ৩. থিম টগল (toggle) করার ফাংশন
    const toggleTheme = () => {
        setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    const value = {
        theme,
        toggleTheme
    };

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
};