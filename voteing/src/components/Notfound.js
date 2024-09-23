import React from 'react';
import NotFund_img from "../assets/errors2.png"; // Circle image
import NotFound_img from "../assets/errors.png"; // 404 image
import NotFond_img from "../assets/errors3.png";
import { NavLink } from 'react-router-dom';
import '../css/Auth.css';

const Notfund = () => {
  return (
    <>
      <div className="relative bg-white h-screen flex flex-col justify-center items-center">

        {/* Top-left Circle Image */}
        <div className="">
          <img className="" src={NotFund_img} alt="Top left circle" />
        </div>

        {/* Error Image and Text */}
        <div className="relative z-10 text-center p-5 px-16 shadow-2xl shadow-blue-600/50 bg-white">
          <div className='sm:flex sm:justify-center mt-5'>
            <img className="sm:w-4/6 h-[50vh] sm:h-auto w-full" src={NotFound_img} alt="Not found" />
          </div>
          
          <div className='mt-2'>
            <h2>Something went wrong.</h2>
            <p className='text-sm text-slate-700'>Sorry, we can't find the page you're looking for.</p>
          </div>

          {/* Go Back Button */}
          <div className="mt-1 mb-2">
            <NavLink to='/'>
              <button className="px-4 py-1 bg-blue-500 shadow-lg shadow-blue-600/50 hover:bg-blue-700 text-white rounded-lg">
                Go Back
              </button>
            </NavLink>
          </div>
        </div>

        {/* Bottom-right Circle Image */}
        <div className="">
          <img className="" src={NotFond_img} alt="Bottom right circle" />
        </div>
      </div>
    </>
  );
}

export default Notfund;
