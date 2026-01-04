import React from 'react';
import { NavLink, Outlet, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthProvider';
import { LayoutDashboard, Home, PlusCircle, UserCircle, Star, Building2, LogOut } from 'lucide-react';

const DashboardLayout = () => {
    const { user, logOut } = useAuth();

    const links = (
        <>
            <li><NavLink to="/dashboard" end><LayoutDashboard size={18}/> Overview</NavLink></li>
            <li><NavLink to="/dashboard/profile"><UserCircle size={18}/> Profile</NavLink></li>
            <li><NavLink to="/dashboard/add-property"><PlusCircle size={18}/> Add Property</NavLink></li>
            <li><NavLink to="/dashboard/my-properties"><Building2 size={18}/> My Properties</NavLink></li>
            <li><NavLink to="/dashboard/my-ratings"><Star size={18}/> My Reviews</NavLink></li>
            <div className="divider"></div>
            <li><Link to="/"><Home size={18}/> Back to Home</Link></li>
        </>
    );

    return (
        <div className="drawer lg:drawer-open">
            <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col bg-base-200">
                {/* Dashboard Top Navbar */}
                <div className="navbar bg-base-100 shadow-sm px-4 lg:hidden">
                    <label htmlFor="dashboard-drawer" className="btn btn-ghost drawer-button lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="Wait for it 4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <span className="text-xl font-bold text-primary">HomeNest Dashboard</span>
                </div>
                <div className="p-6 lg:p-10"><Outlet /></div>
            </div> 
            {/* Sidebar */}
            <div className="drawer-side">
                <label htmlFor="dashboard-drawer" className="drawer-overlay"></label> 
                <ul className="menu p-4 w-64 min-h-full bg-base-100 text-base-content space-y-2">
                    <div className="mb-10 px-4"><h2 className="text-2xl font-bold text-primary italic">HomeNest</h2></div>
                    {links}
                    <li className="mt-auto"><button onClick={logOut} className="text-red-500"><LogOut size={18}/> Logout</button></li>
                </ul>
            </div>
        </div>
    );
};
export default DashboardLayout;