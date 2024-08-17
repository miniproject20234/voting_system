import React, { useState } from "react";

const AuthForm = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div
        className={`relative bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-4xl transition-transform transform ${
          isSignUp ? "translate-x-0" : "translate-x-1/2"
        }`}
      >
        {/* Sign Up Form */}
        <div
          className={`absolute inset-y-0 left-0 w-1/2 p-8 transition-opacity duration-500 ${
            isSignUp ? "opacity-100" : "opacity-0"
          }`}
        >
          <form>
            <h1 className="text-2xl font-bold mb-4">Create Account</h1>
            <div className="flex justify-center space-x-3 mb-4">
              <a href="#" className="p-2 border rounded-full">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="p-2 border rounded-full">
                <i className="fab fa-google-plus-g"></i>
              </a>
              <a href="#" className="p-2 border rounded-full">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
            <span className="text-sm">or use your email for registration</span>
            <input
              type="text"
              placeholder="Name"
              className="w-full p-3 mt-3 bg-gray-200 rounded"
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 mt-3 bg-gray-200 rounded"
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 mt-3 bg-gray-200 rounded"
            />
            <button className="w-full mt-6 py-3 bg-red-500 text-white font-bold rounded">
              Sign Up
            </button>
          </form>
        </div>

        {/* Sign In Form */}
        <div
          className={`absolute inset-y-0 right-0 w-1/2 p-8 transition-opacity duration-500 ${
            isSignUp ? "opacity-0" : "opacity-100"
          }`}
        >
          <form>
            <h1 className="text-2xl font-bold mb-4">Sign In</h1>
            <div className="flex justify-center space-x-3 mb-4">
              <a href="#" className="p-2 border rounded-full">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="p-2 border rounded-full">
                <i className="fab fa-google-plus-g"></i>
              </a>
              <a href="#" className="p-2 border rounded-full">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div> 
            <span className="text-sm">or use your account</span>
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 mt-3 bg-gray-200 rounded"
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 mt-3 bg-gray-200 rounded"
            />
            <a href="#" className="text-sm text-blue-500 mt-3 block">
              Forgot your password?
            </a>
            <button className="w-full mt-6 py-3 bg-red-500 text-white font-bold rounded">
              Sign In
            </button>
          </form>
        </div>

        {/* Overlay Panels */}
        <div className="absolute inset-y-0 w-1/2 left-0 transform translate-x-full bg-gradient-to-r from-red-400 to-pink-400 text-white flex flex-col justify-center items-center p-8 transition-transform duration-500">
          <div className="text-center">
            <h1 className="text-3xl font-bold">Hello, Friend!</h1>
            <p className="mt-4">
              Enter your personal details and start your journey with us
            </p>
            <button
              className="mt-8 px-6 py-2 bg-transparent border border-white text-white font-bold rounded"
              onClick={() => setIsSignUp(true)}
            >
              Sign Up
            </button>
          </div>
        </div>

        <div className="absolute inset-y-0 w-1/2 right-0 bg-gradient-to-r from-red-400 to-pink-400 text-white flex flex-col justify-center items-center p-8 transition-transform duration-500">
          <div className="text-center">
            <h1 className="text-3xl font-bold">Welcome Back!</h1>
            <p className="mt-4">
              To keep connected with us please login with your personal info
            </p>
            <button
              className="mt-8 px-6 py-2 bg-transparent border border-white text-white font-bold rounded"
              onClick={() => setIsSignUp(false)}
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
