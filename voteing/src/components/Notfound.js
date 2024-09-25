import React from 'react';
import NotFound_img from "../assets/pagenot 1.png"; // 404 image
import NotFoud_img from "../assets/pagenot.png";
import { NavLink } from 'react-router-dom';
import '../css/notfound.css';

const NotFound = () => {
  return (
    <>
      <div className="relative bg-white h-screen flex flex-col justify-center items-center">

        {/* Error Image and Text */}
        <div className="relative text-center py-8 shadow-blue-600/50 bg-white w-full flex flex-col justify-center items-center">
          
          {/* Image Container */}
          <div className="relative w-[500px] h-[500px]"> {/* Set a fixed width/height to the image container */}
            {/* First image (bottom) */}
            <img className="absolute inset-0 mx-auto w-full h-full object-contain" src={NotFound_img} alt="404 Not found" />
            
            {/* Second image (top, overlapping) */}
            <img className="absolute inset-0 mx-auto w-full h-full object-contain" src={NotFoud_img} alt="404 Not found overlay" />
          </div>
          
          {/* Text */}
          <div className='mt-4'>
            <h2 className="text-lg font-bold">Something went wrong.</h2>
            <p className="text-sm text-slate-700">Sorry, we can't find the page you're looking for.</p>
          </div>

          {/* Go Back Button */}
          <div className="mt-6 flex justify-center">
            <NavLink to='/'>
              <button className="px-4 py-2 bg-blue-500 shadow-lg hover:bg-blue-700 text-white rounded-lg">
                Go Back
              </button>
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
}

export default NotFound;
