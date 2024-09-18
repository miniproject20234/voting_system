import React from 'react';
import NotFound_img from "../assets/notFound.png";
import {  NavLink } from 'react-router-dom';

const Notfund = () => {
  
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-center">
      <NavLink to='/'>  <img  className="mx-auto -mt-7" src={NotFound_img} alt="not found" /></NavLink>
       
        {/* <NavLink to='/' className='cursor-pointer'><button className="mt-4  bg-blue-600 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded">
          Back to Home
        </button></NavLink> */}
        
      </div>
    </div>
  );
}

export default Notfund;
