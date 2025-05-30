// src/components/NavBar.jsx
import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';

const NavBar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-gray-900 text-white shadow-lg sticky top-0 z-50 backdrop-blur-md bg-opacity-80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
  <Link to="/" className="text-2xl font-bold">
    <span className="text-blue-400">Discount</span>
    <span className="text-white-500">mithrA</span>
  </Link>
</div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 items-center">
            <NavLink
              to="/home"
              className={({ isActive }) =>
                isActive
                  ? 'text-blue-400 font-semibold'
                  : 'hover:text-blue-300 transition duration-200'
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/locations"
              className={({ isActive }) =>
                isActive
                  ? 'text-blue-400 font-semibold'
                  : 'hover:text-blue-300 transition duration-200'
              }
            >
              Services
            </NavLink>
            <NavLink
              to="/download"
              className={({ isActive }) =>
                isActive
                  ? 'text-blue-400 font-semibold'
                  : 'hover:text-blue-300 transition duration-200'
              }
            >
              Download
            </NavLink>
            <NavLink
              to="/signup"
              className={({ isActive }) =>
                isActive
                  ? 'text-blue-400 font-semibold'
                  : 'hover:text-blue-300 transition duration-200'
              }
            >
              Sign Up
            </NavLink>
           
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-gray-800 bg-opacity-90 pb-4">
          <div className="flex flex-col space-y-3 px-4">
            <NavLink
              to="/home"
              className={({ isActive }) =>
                isActive
                  ? 'text-blue-400 font-semibold'
                  : 'text-gray-300 hover:text-blue-400 transition duration-200'
              }
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </NavLink>
            <NavLink
              to="/locations"
              className={({ isActive }) =>
                isActive
                  ? 'text-blue-400 font-semibold'
                  : 'text-gray-300 hover:text-blue-400 transition duration-200'
              }
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Services
            </NavLink>
            <NavLink
              to="/download"
              className={({ isActive }) =>
                isActive
                  ? 'text-blue-400 font-semibold'
                  : 'text-gray-300 hover:text-blue-400 transition duration-200'
              }
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Download
            </NavLink>
            <NavLink
              to="/signup"
              className={({ isActive }) =>
                isActive
                  ? 'text-blue-400 font-semibold'
                  : 'text-gray-300 hover:text-blue-400 transition duration-200'
              }
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Sign Up
            </NavLink>
            
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;