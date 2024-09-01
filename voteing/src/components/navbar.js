import React from 'react';
import { NavLink } from 'react-router-dom'; // Import necessary components for routing
import logo from '../assets/vote1.png'; // Import the logo image

const Navbar = () => {
  return (
    <>
      {/* Navbar container with gradient background */}
      <div className="bg-gradient-to-r from-blue-300 to-blue-500 shadow-lg">
        <header className="container mx-auto flex justify-between items-center p-4">
          {/* Logo Container */}
          <div className="flex items-center">
            <img src={logo} alt="Logo" className="w-16 h-16 rounded-full" /> {/* Logo */}
            <span className="ml-3 text-xl font-bold text-white">Vote</span> {/* Brand Name */}
          </div>

          {/* Navigation Links */}
          <nav>
            <ul className="flex space-x-6 text-lg">
              {/* Home Link */}
              <li>
                <NavLink 
                  exact
                  to="/" 
                  className="text-white hover:text-yellow-300 transition-colors duration-200 font-bold"
                  activeClassName="text-yellow-300 font-semibold"
                >
                  Home
                </NavLink>
              </li>

              {/* Vote Page Link */}
              <li>
                <NavLink 
                  to="/votepage" 
                  className="text-white hover:text-yellow-300 transition-colors duration-200 font-bold"
                  activeClassName="text-yellow-300 font-semibold"
                >
                  Voting Page
                </NavLink>
              </li>

              {/* Additional Links - if needed */}
              <li>
                <NavLink 
                  to="/about" 
                  className="text-white hover:text-yellow-300 transition-colors duration-200 font-bold"
                  activeClassName="text-yellow-300 font-semibold"
                >
                  About
                </NavLink>
              </li>

              </ul>
          </nav>
        </header>
      </div>
    </>
  );
}

export default Navbar;
