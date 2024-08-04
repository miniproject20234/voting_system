// src/Login.js
import React from 'react';
import '../css/App.css'; 


const Login = () => {
  return (
    
    <section className="bg-black-50 min-h-screen flex items-center justify-center">
      <div className="bg-[#f1e9e9dd] flex rounded-2xl shadow-lg max-w-3xl p-4">
        <div className="sm:w-1/2 px-16">
          <h2 className="font-bold text-2xl text-[#4527a5] text-center">Login</h2>
          <p class="text-sm mt-7 text-[#6c57b1] text-opacity-70 text-center">If you already a member, easily log in</p>
          <form className="flex flex-col gap-4" action="">
            <input className="p-2 mt-8 rounded-xl border" type="text" name="email" placeholder="Your email" />
            <div className="relative">
              <input className="p-2 mt-8 rounded-xl border w-full" type="password" name="password" placeholder="Your password" />
            </div>
            <button className="Login-button rounded-xl text-white py-2">Login</button>
          </form>
          <div className="mt-3 text-xs flex justify-between items-center">
            <p>
              <a href="#">Forgot Password?</a>
            </p>
            
            <button className="py-2 px-5 bg-white border rounded-xl">Register</button>
          </div>
        </div>

        <img src={Login} alt=" "/>
        <img src={require('../assets/lock.jpeg')}alt=" "  width="350"
              height="350"/>
      
      </div>
    </section>
  );
};

export default Login;
