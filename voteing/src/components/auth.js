import React from 'react';

const Auth = () => {
  const [signIn, toggle] = React.useState(true);

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden w-full max-w-4xl min-h-[400px] relative">
      {/* Sign Up Container */}
      <div
        className={`absolute top-0 left-0 h-full w-1/2 transition-all duration-600 ${
          signIn ? 'opacity-0 z-10' : 'opacity-100 z-20 transform translate-x-full'
        }`}
      >
        <form className="bg-white flex flex-col items-center justify-center h-full p-12 text-center">
          <h1 className="font-bold">Create Account</h1>
          <input
            type="text"
            placeholder="Name"
            className="bg-gray-200 border-none p-3 my-2 w-full"
          />
          <input
            type="email"
            placeholder="Email"
            className="bg-gray-200 border-none p-3 my-2 w-full"
          />
          <input
            type="password"
            placeholder="Password"
            className="bg-gray-200 border-none p-3 my-2 w-full"
          />
          <button className="rounded-full border border-red-500 bg-red-500 text-white font-bold py-3 px-8 uppercase mt-4 transition-transform duration-100 active:scale-95 focus:outline-none">
            Sign Up
          </button>
        </form>
      </div>

      {/* Sign In Container */}
      <div
        className={`absolute top-0 left-0 h-full w-1/2 transition-all duration-600 z-20 ${
          signIn ? '' : 'transform translate-x-full'
        }`}
      >
        <form className="bg-white flex flex-col items-center justify-center h-full p-12 text-center">
          <h1 className="font-bold">Sign in</h1>
          <input
            type="email"
            placeholder="Email"
            className="bg-gray-200 border-none p-3 my-2 w-full"
          />
          <input
            type="password"
            placeholder="Password"
            className="bg-gray-200 border-none p-3 my-2 w-full"
          />
          <a href="#" className="text-gray-700 text-sm my-4">
            Forgot your password?
          </a>
          <button className="rounded-full border border-red-500 bg-red-500 text-white font-bold py-3 px-8 uppercase mt-4 transition-transform duration-100 active:scale-95 focus:outline-none">
            Sign In
          </button>
        </form>
      </div>

      {/* Overlay Container */}
      <div
        className={`absolute top-0 left-1/2 h-full w-1/2 overflow-hidden transition-transform duration-600 z-30 ${
          signIn ? '' : 'transform -translate-x-full'
        }`}
      >
        <div className="bg-gradient-to-r from-red-500 to-pink-500 bg-cover bg-center text-white h-full w-[200%] transform transition-transform duration-600">
          <div
            className={`absolute top-0 left-0 h-full w-1/2 flex flex-col items-center justify-center text-center p-10 transition-transform duration-600 ${
              signIn ? '' : 'transform -translate-x-20'
            }`}
          >
            <h1 className="font-bold">Welcome Back!</h1>
            <p className="text-sm font-light leading-5 tracking-wide mt-4 mb-8">
              To keep connected with us please login with your personal info
            </p>
            <button
              onClick={() => toggle(true)}
              className="rounded-full border border-white bg-transparent text-white font-bold py-3 px-8 uppercase transition-transform duration-100 active:scale-95 focus:outline-none"
            >
              Sign In
            </button>
          </div>
          <div
            className={`absolute top-0 right-0 h-full w-1/2 flex flex-col items-center justify-center text-center p-10 transition-transform duration-600 ${
              signIn ? 'transform translate-x-20' : ''
            }`}
          >
            <h1 className="font-bold">Hello, Friend!</h1>
            <p className="text-sm font-light leading-5 tracking-wide mt-4 mb-8">
              Enter your personal details and start your journey with us
            </p>
            <button
              onClick={() => toggle(false)}
              className="rounded-full border border-white bg-transparent text-white font-bold py-3 px-8 uppercase transition-transform duration-100 active:scale-95 focus:outline-none"
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
