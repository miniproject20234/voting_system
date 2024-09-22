import React from 'react';
import NotFound_img from "../assets/errors.png";
import { NavLink } from 'react-router-dom';

const Notfund = () => {
  return (
    <div className="relative h-screen flex flex-col justify-center items-center bg-white">
      {/* Image with error text */}
      <div className="z-6 text-center relative">
        <img className="mx-auto mb-4" src={NotFound_img} alt="not found" />

        {/* Absolutely positioned "Go Back" button */}
        <div className="absolute" style={{ top: '84%', left: '50%', transform: 'translate(-50%, 0)' }}>
          <NavLink to='/'>
            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-900 text-white rounded-lg">
              Go Back
            </button>
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default Notfund;