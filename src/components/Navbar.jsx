// src/components/Navbar.jsx

import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../contexts/AuthProvider'; // আমাদের কাস্টম হুক
import { toast } from 'react-toastify';

const Navbar = () => {
    const { user, logOut } = useAuth();

    const handleLogout = () => {
        logOut()
            .then(() => {
                toast.success("Logged out successfully");
            })
            .catch(err => toast.error(err.message));
    };

    // NavLink-এর জন্য অ্যাক্টিভ স্টাইল
    const activeLinkClass = "text-primary font-bold border-b-2 border-primary";
    const normalLinkClass = "hover:text-primary";

    const navLinks = (
        <>
            <li><NavLink to="/" className={({ isActive }) => isActive ? activeLinkClass : normalLinkClass}>Home</NavLink></li>
            <li><NavLink to="/all-properties" className={({ isActive }) => isActive ? activeLinkClass : normalLinkClass}>All Properties</NavLink></li>
            
            {/* শুধুমাত্র লগইন করা ইউজার এই লিংকগুলো দেখবে */}
            {user && (
                <>
                    <li><NavLink to="/add-properties" className={({ isActive }) => isActive ? activeLinkClass : normalLinkClass}>Add Properties</NavLink></li>
                    <li><NavLink to="/my-properties" className={({ isActive }) => isActive ? activeLinkClass : normalLinkClass}>My Properties</NavLink></li>
                    <li><NavLink to="/my-ratings" className={({ isActive }) => isActive ? activeLinkClass : normalLinkClass}>My Ratings</NavLink></li>
                </>
            )}
        </>
    );

    return (
        <div className="navbar bg-base-100 shadow-lg px-4">
            {/* Navbar Start (Logo) */}
            <div className="navbar-start">
                {/* ছোট ডিভাইসের জন্য ড্রপডাউন */}
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[50] p-2 shadow bg-base-100 rounded-box w-52 space-y-2">
                        {navLinks}
                    </ul>
                </div>
                <Link to="/" className="btn btn-ghost text-2xl font-bold text-primary">
                    HomeNest
                </Link>
            </div>

            {/* Navbar Center (বড় ডিভাইসের জন্য) */}
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 space-x-4">
                    {navLinks}
                </ul>
            </div>

            {/* Navbar End (User Profile) */}
            <div className="navbar-end">
                {user ? (
                    // ইউজার লগইন করা থাকলে
                    <div className="dropdown dropdown-end z-[50]">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar" title={user.displayName}>
                            <div className="w-10 rounded-full">
                                <img alt={user.displayName} src={user.photoURL || 'https://i.ibb.co/T41P S9v/avatar-default.png'} />
                            </div>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                            <li className="px-3 py-2">
                                <span className="font-semibold">{user.displayName}</span>
                                <br />
                                <span className="text-xs text-gray-500">{user.email}</span>
                            </li>
                            <li className='mt-2'>
                                <button onClick={handleLogout} className="btn btn-sm btn-error text-white">Log out</button>
                            </li>
                        </ul>
                    </div>
                ) : (
                    // ইউজার লগইন করা না থাকলে
                    <>
                        <Link to="/login" className="btn btn-sm btn-outline btn-primary mr-2">Login</Link>
                        <Link to="/register" className="btn btn-sm btn-primary text-white">Signup</Link>
                    </>
                )}
            </div>
        </div>
    );
};

export default Navbar;