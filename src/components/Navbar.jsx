import React, { useContext } from "react";
import { NavLink } from "react-router";
import { AuthContext } from "../contexts/AuthContext";

const Navbar = () => {
  const { user, signOutUser } = useContext(AuthContext); // make sure signOutUser is provided in AuthContext

  const navLinkClass = ({ isActive }) =>
    `px-3 py-2 rounded-lg transition-all duration-300 ${
      isActive
        ? "bg-primary text-accent font-bold shadow-md"
        : "text-accent hover:text-white hover:font-bold hover:bg-secondary"
    }`;

  const links = (
    <>
      <li>
        <NavLink to="/" className={navLinkClass}>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/services" className={navLinkClass}>
          Services
        </NavLink>
      </li>
      {user && (
        <>
          <li>
            <NavLink to="/myServices" className={navLinkClass}>
              My Services
            </NavLink>
          </li>
          <li>
            <NavLink to="/addService" className={navLinkClass}>
              Add Service
            </NavLink>
          </li>
          <li>
            <NavLink to="/myBookings" className={navLinkClass}>
              My Bookings
            </NavLink>
          </li>
        </>
      )}
    </>
  );

  return (
    <div className="w-11/12 mx-auto navbar text-accent py-2">
      {/* Navbar Start */}
      <div className="navbar-start">
        {/* Mobile Dropdown */}
        <div className="dropdown">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost lg:hidden p-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
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
          <ul className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[51] mt-3 w-52 p-2 shadow-lg">
            {links}
          </ul>
        </div>

        {/* Logo */}
        <NavLink
          to="/"
          className="text-2xl lg:text-3xl font-extrabold flex items-center gap-2 text-accent"
        >
          <img
            src="/logo1.svg"
            alt="HomeHero Logo"
            className="h-10 w-10 lg:h-12 lg:w-12"
          />
          <span className="hidden sm:inline">HomeHero</span>
          <span className="inline sm:hidden">HHero</span>
        </NavLink>
      </div>

      {/* Navbar Center */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 flex gap-2">{links}</ul>
      </div>

      {/* Navbar End */}
      <div className="navbar-end flex items-center gap-2">
        {!user ? (
          <>
            <NavLink
              to="/login"
              className="btn btn-primary btn-sm md:btn-md text-accent transition-all duration-300 hover:scale-105 hover:shadow-md"
            >
              Login
            </NavLink>
            <NavLink
              to="/register"
              className="btn btn-secondary btn-sm md:btn-md text-accent transition-all duration-300 hover:scale-105 hover:shadow-md"
            >
              Register
            </NavLink>
          </>
        ) : (
          <>
            {/* User Info */}
            {user.photoURL && (
              <img
                src={user.photoURL}
                alt={user.displayName || "User"}
                className="h-10 w-10 rounded-full object-cover border-2 border-primary"
              />
            )}
            <span className="font-semibold text-accent">
              {user.displayName || "User"}
            </span>

            {/* Logout Button */}
            <button
              onClick={signOutUser}
              className="btn btn-primary btn-sm md:btn-md text-accent transition-all duration-300 hover:scale-105 hover:shadow-md"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
