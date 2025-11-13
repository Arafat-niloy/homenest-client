import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../contexts/AuthProvider';
import { toast } from 'react-toastify';
import { useTheme } from '../contexts/ThemeContext';
import { TbBuildingFortress } from "react-icons/tb";
import { LiaToggleOnSolid, LiaToggleOffSolid } from "react-icons/lia";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const handleLogout = () => {
    logOut()
      .then(() => toast.success("Logged out successfully"))
      .catch(err => toast.error(err.message));
  };

  const activeLinkClass =
    "bg-purple-600 text-primary-content rounded-full hover:brightness-90 transition-all duration-300";
  const normalLinkClass =
    "hover:bg-base-300 rounded-full transition-colors duration-300";

  const navLinks = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? activeLinkClass : normalLinkClass
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/all-properties"
          className={({ isActive }) =>
            isActive ? activeLinkClass : normalLinkClass
          }
        >
          All Properties
        </NavLink>
      </li>

      {user && (
        <>
          <li>
            <NavLink
              to="/add-properties"
              className={({ isActive }) =>
                isActive ? activeLinkClass : normalLinkClass
              }
            >
              Add Properties
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/my-properties"
              className={({ isActive }) =>
                isActive ? activeLinkClass : normalLinkClass
              }
            >
              My Properties
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/my-ratings"
              className={({ isActive }) =>
                isActive ? activeLinkClass : normalLinkClass
              }
            >
              My Ratings
            </NavLink>
          </li>
        </>
      )}
    </>
  );

  return (
    <div className="navbar shadow px-4">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>

          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[50] p-2 shadow bg-base-100 rounded-box w-52 space-y-1"
          >
            {navLinks}
          </ul>
        </div>

        <Link
          to="/"
          className="btn btn-ghost text-2xl md:text-3xl font-bold "
        >
          <TbBuildingFortress />
          HomeNest
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <div className="bg-base-200 rounded-full p-1.5">
          <ul className="menu menu-horizontal px-1 space-x-1 md:text-lg md:font-medium">
            {navLinks}
          </ul>
        </div>
      </div>

      <div className="navbar-end">
        <button
          onClick={toggleTheme}
          className="text-3xl text-base-content transition-all duration-300 mr-3"
          title="Toggle Theme"
        >
          {theme === 'dark' ? <LiaToggleOnSolid /> : <LiaToggleOffSolid />}
        </button>

        {user ? (
          <div className="dropdown dropdown-end z-[50]">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
              title={user.displayName}
            >
              <div className="w-10 rounded-full">
                <img
                  alt={user.displayName}
                  src={
                    user.photoURL ||
                    'https://i.ibb.co/T41PS9v/avatar-default.png'
                  }
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
                <button
                  onClick={handleLogout}
                  className="btn btn-sm btn-error text-white"
                >
                  Log out
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <>
            <Link
              to="/login"
              className="btn btn-sm  btn-primary text-white mr-2"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="btn btn-sm btn-primary text-white"
            >
              Signup
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
