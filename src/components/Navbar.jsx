import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../contexts/AuthProvider';
import { toast } from 'react-toastify';
import { useTheme } from '../contexts/ThemeContext';
import { TbBuildingFortress } from "react-icons/tb";

const Navbar = () => {
    const { user, logOut } = useAuth();
    const { theme, toggleTheme } = useTheme();

    const handleLogout = () => {
        logOut()
            .then(() => {
                toast.success("Logged out successfully");
            })
            .catch(err => toast.error(err.message));
    };

    // NavLink-এর স্টাইল (hover ফিক্স সহ)
    const activeLinkClass = "bg-purple-600 text-primary-content rounded-full hover:brightness-90 transition-all duration-300";
    const normalLinkClass = "hover:bg-base-300 rounded-full transition-colors duration-300";

    const navLinks = (
        <>
            <li><NavLink to="/" className={({ isActive }) => isActive ? activeLinkClass : normalLinkClass}>Home</NavLink></li>
            <li><NavLink to="/all-properties" className={({ isActive }) => isActive ? activeLinkClass : normalLinkClass}>All Properties</NavLink></li>
            
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
        <div className="navbar shadow px-4">
            
            {/* Navbar Start (Logo) */}
            <div className="navbar-start">
                <div className="dropdown ">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </div>
                    {/* মোবাইল মেন্যুর জন্য পিল স্টাইল */}
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[50] p-2 shadow bg-base-100 rounded-box w-52 space-y-1">
                        {navLinks}
                    </ul>
                </div>
                {/* লোগোর সাথে আইকন */}
                <Link to="/" className="btn btn-ghost text-purple-600 text-2xl font-bold text-primary">
                    <TbBuildingFortress />
                    HomeNest
                </Link>
            </div>

            {/* Navbar Center (পিল-বক্স কন্টেইনার) */}
            <div className="navbar-center hidden lg:flex">
                <div className="bg-base-200 rounded-full p-1.5">
                    {/* আপনি আগের উত্তরে এখানে md:text-lg md:font-medium যোগ করেছিলেন, সেটি এখানে নেই। লাগলে যোগ করে নিন। */}
                    <ul className="menu menu-horizontal px-1 space-x-1 md:text-lg md:font-medium"> 
                        {navLinks}
                    </ul>
                </div>
            </div>

            {/* Navbar End (User Profile) */}
            <div className="navbar-end">
            
                {/* থিম টগল বাটন */}
                <label className="swap swap-rotate mr-2">
                    <input 
                        type="checkbox" 
                        onChange={toggleTheme}
                        checked={theme === 'dark'}
                    />
                    <svg className="swap-on fill-current w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.69Z"/></svg>
                    <svg className="swap-off fill-current w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-1.41,1.41L5.64,17z M12,18c-3.31,0-6-2.69-6-6s2.69-6,6-6s6,2.69,6,6S15.31,18,12,18z M12,4c-4.41,0-8,3.59-8,8s3.59,8,8,8s8-3.59,8-8S16.41,4,12,4z M18.36,17l-1.41-1.41L18.36,17z M12,8c-2.21,0-4,1.79-4,4s1.79,4,4,4s4-1.79,4-4S14.21,8,12,8z M7.05,7.05L5.64,5.64L7.05,7.05z M16.95,7.05L18.36,5.64L16.95,7.05z"/></svg>
                </label>
                
                {/* ইউজার ড্রপডাউন */}
                {user ? (
                    <div className="dropdown dropdown-end z-[50]">
                       <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar" title={user.displayName}>
                            <div className="w-10 rounded-full">
                                <img alt={user.displayName} src={user.photoURL || 'https://i.ibb.co/T41PS9v/avatar-default.png'} />
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
                    // === শুধু লগইন বাটন ===
                    <>
                        <Link to="/login" className="btn btn-sm btn-outline btn-primary mr-2">Login</Link>
                    </>
                )}
            </div>
        </div>
    );
};

export default Navbar;