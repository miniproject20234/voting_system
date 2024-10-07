import React from "react";
import NotFoud_img from "../assets/pagefound.png";
import Error1 from "../assets/errors2.png";
import { NavLink } from "react-router-dom";
import "../css/notfound.css";

const NotFound = () => {
  return (
    <>
      <div className=" relative sm:px-16  sm:h-full    ">
        <div className="shadow-xl p-5">
          <div className="absolute top-10 left-14">
          <span class="relative flex h-3 w-3">
  <span class="animate-ping absolute  h-6 w-full top-8 rounded-full bg-blue-500 opacity-75"></span>

</span>
            <img src={Error1} className="w-2/6 h-/6 " alt="" />
          </div>
          <div className=" flex justify-center mt-10   ">
            <img
              className=" w-full h-[50vh] sm:h-full  xl:w-1/2"
              src={NotFoud_img}
              alt="404 Not found overlay"
            />
          </div>

          {/* Text */}
          <div className="txt_height p-2 ">
            <div className="mt-4 flex flex-col ">
              <h2 className="text-lg flex justify-center  sm:text-xl   font-bold ">
                Something went wrong.
              </h2>
              <p className="text-sm flex justify-center sm:text-lg  text-slate-700">
                Sorry, we can't find the page you're looking for.
              </p>
            </div>

            {/* Go Back Button */}
            <div className="mt-6 flex justify-center ">
              <NavLink to="/">
                <button className="px-4 py-2 bg-blue-500 shadow-lg hover:bg-blue-700 text-white rounded-lg">
                  Go Back
                </button>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;
