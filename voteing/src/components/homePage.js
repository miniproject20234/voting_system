import React from 'react';
import Navbar from './navbar';
//import Homepage from "../assets/vote2.png"; 

const Homepage = () => {
  return (
    <>
      
      

      {/* Main Content Area */}
      <div className="min-h-screen bg-gradient-to-r from-blue-300 to-blue-500">
        <main className="flex flex-col items-center justify-center mt-16">
          {/* Main Heading */}
          <h1 className="text-4xl font-bold text-white mb-8">VOTE FOR THE FUTURE!</h1>

                  </main>

        {/* Voting Icons Section */}
        <section className="mt-16 flex justify-center">
          <div className="grid grid-cols-5 gap-6">
            {/* Icon 1 */}
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                {/* Add icon/image here */}
              </div>
              <p className="mt-4 text-white">Vote 1</p>
            </div>

            {/* Icon 2 */}
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                {/* Add icon/image here */}
              </div>
              <p className="mt-4 text-white">Voter 2</p>
            </div>

            {/* Icon 3 */}
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                {/* Add icon/image here */}
              </div>
              <p className="mt-4 text-white">Voter 3</p>
            </div>

            {/* Icon 4 */}
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                {/* Add icon/image here */}
              </div>
              <p className="mt-4 text-white">Voter 4</p>
            </div>

            {/* Icon 5 */}
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                {/* Add icon/image here */}
              </div>
              <p className="mt-4 text-white">Voter 5</p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default Homepage;
