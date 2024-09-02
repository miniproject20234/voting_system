import React from 'react';
import Navbar from './navbar';
// import Homepage from "../assets/vote2.png"; 
//import home_img from "../assets/home.png";

const Homepage = () => {
  return (
    <>
      <Navbar />

      {/* Main Content Area */}
      <div className="min-h-screen bg-gradient-to-r from-white to-gray-100">
        <main className="flex flex-col justify-center  mt-16 bg-gray-200 py-16">
          {/* Main Image */}
          
          {/* Main Heading */}
              </main>

        {/* SVG Wave Divider */}
        <div className="relative">
          <svg
            viewBox="0 0 500 150"
            preserveAspectRatio="none"
            className="absolute bottom-0 left-0 right-0 w-full h-20"
          >
            <path
              d="M0.00,49.98 C149.99,150.00 349.99,0.00 500.00,49.98 L500.00,150.00 L0.00,150.00 Z"
              style={{ fill: '#f8fafc' }}
            />
          </svg>
        </div>
        <p className="text-4xl font-bold text-center text-blue-400 mt-4">VOTE FOR THE FUTURE!</p>
    
      </div>
    </>
  );
}

export default Homepage;
