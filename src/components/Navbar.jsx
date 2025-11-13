import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../contexts/AuthProvider';
import { toast } from 'react-toastify';
import { useTheme } from '../contexts/ThemeContext';
import { TbBuildingFortress } from "react-icons/tb";
import { LiaToggleOnSolid, LiaToggleOffSolid } from "react-icons/lia";
import { FiMenu, FiX } from "react-icons/fi";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logOut()
      .then(() => toast.success("Logged out successfully"))
      .catch(err => toast.error(err.message));
  };

  const activeLinkClass =
    "bg-purple-600 text-primary-content rounded-full hover:brightness-90 transition-all duration-300 px-3 py-1";
  const normalLinkClass =
    "hover:bg-base-300 rounded-full transition-colors duration-300 px-3 py-1";

  const navLinks = (
    <>
      <li>
        <NavLink to="/" className={({ isActive }) => isActive ? activeLinkClass : normalLinkClass}>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/all-properties" className={({ isActive }) => isActive ? activeLinkClass : normalLinkClass}>
          All Properties
        </NavLink>
      </li>

      {user && (
        <>
          <li>
            <NavLink to="/add-properties" className={({ isActive }) => isActive ? activeLinkClass : normalLinkClass}>
              Add Properties
            </NavLink>
          </li>
          <li>
            <NavLink to="/my-properties" className={({ isActive }) => isActive ? activeLinkClass : normalLinkClass}>
              My Properties
            </NavLink>
          </li>
          <li>
            <NavLink to="/my-ratings" className={({ isActive }) => isActive ? activeLinkClass : normalLinkClass}>
              My Ratings
            </NavLink>
          </li>
        </>
      )}
    </>
  );

  return (
    <nav className="navbar shadow px-4 ">
      {/* Left Section */}
      <div className="navbar-start flex items-center">
        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="btn btn-ghost lg:hidden text-2xl mr-2"
          aria-label="Toggle menu"
        >
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>

        {/* Logo */}
        <Link to="/" className="btn btn-ghost text-2xl md:text-3xl font-bold flex items-center gap-1">
          <TbBuildingFortress />
          HomeNest
        </Link>
      </div>

      {/* Desktop Menu */}
      <div className="navbar-center hidden lg:flex">
        <div className="bg-base-200 rounded-full p-1.5">
          <ul className="menu menu-horizontal px-1 space-x-1 md:text-lg md:font-medium">
            {navLinks}
          </ul>
        </div>
      </div>

      {/* Right Section */}
      <div className="navbar-end flex items-center space-x-2">
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="text-3xl text-base-content transition-all duration-300"
          title="Toggle Theme"
        >
          {theme === 'dark' ? <LiaToggleOnSolid /> : <LiaToggleOffSolid />}
        </button>

        {/* User / Auth */}
        {user ? (
          <div className="dropdown dropdown-end z-[50]">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar" title={user.displayName}>
              <div className="w-10 rounded-full">
                <img
                  alt={user.displayName}
                  src={user.photoURL || 'https://i.ibb.co/T41PS9v/avatar-default.png'}
                />
              </div>
            </div>
            <ul className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
              <li className="px-3 py-2">
                <span className="font-semibold">{user.displayName}</span>
                <br />
                <span className="text-xs text-base-content/70">{user.email}</span>
              </li>
              <li className="mt-2">
                <button onClick={handleLogout} className="btn btn-sm btn-error text-white">
                  Log out
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <>
            <Link to="/login" className="btn btn-sm btn-primary text-white">
              Login
            </Link>
            <Link to="/register" className="btn btn-sm btn-primary text-white">
              Signup
            </Link>
          </>
        )}
      </div>

      {/* Mobile Menu (Dropdown) */}
      {menuOpen && (
        <div className="absolute top-[64px] left-0 w-full bg-base-100 shadow-md border-t border-base-300 lg:hidden animate-slideDown">
          <ul className="menu menu-vertical px-4 py-3 space-y-2 text-lg font-medium">
            {navLinks}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
