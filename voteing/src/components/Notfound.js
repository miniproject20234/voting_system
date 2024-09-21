import React from 'react';
import NotFound_img from "../assets/error6.gif";
import { NavLink } from 'react-router-dom';

const Notfund = () => {
  return (
    <div className="relative h-screen flex flex-col justify-center items-center bg-white">
      {/* Blue circle on the top-left */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-blue-200 rounded-full opacity-70"></div>

      {/* Blue circle on the bottom-right */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-300 rounded-full opacity-70"></div>

      {/* 404 content */}
      <div className="z-10 text-center">
        <NavLink to='/'>
          <img className="mx-auto -mt-7" src={NotFound_img} alt="not found" />
        </NavLink>
        <div className="text-6xl font-bold text-blue-600 mt-4">404</div>
        <p className="text-xl mt-4">Something went wrong.</p>
        <p className="text-gray-500 mt-2">Sorry, we can't find the page you're looking for.</p>
        <NavLink to='/'>
          <button className="mt-6 px-4 py-2 bg-blue-600 hover:bg-blue-900 text-white rounded-lg">
            Go Back
          </button>
        </NavLink>
      </div>
    </div>
  );
}

export default Notfund;
