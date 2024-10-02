import React from 'react';
import NotFound_img from "../assets/pagenot 1.png"; // 404 image
import NotFoud_img from "../assets/pagefound.png";
import { NavLink } from 'react-router-dom';
import '../css/notfound.css';

const NotFound = () => {
  return (
    <>
      <div className=" border-4 p-5 h-screen ">
          <div className=" flex justify-center">   
            <img className=" " src={NotFoud_img} alt="404 Not found overlay" />
          </div>

          {/* Text */}
          <div className="mt-4 flex flex-col  ">
            <h2 className="text-lg flex justify-center    font-bold ">Something went wrong.</h2>
            <p className="text-sm flex justify-center  text-slate-700">Sorry, we can't find the page you're looking for.</p>
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
    </>
  );
}

export default NotFound;
