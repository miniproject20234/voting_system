import React from 'react';
// import '../css/login.css'; 
import RegisterImage from '../assets/Register.png';

const Register = () => {
  return (
    <section className="bg-grey-500 login-bg min-h-screen flex items-center justify-center">
      <div className="bg-[#fffcfdad] flex rounded-2xl shadow-lg max-w-3xl p-4">
        <div className="sm:w-1/2 px-16">
          <h2 className="font-bold text-2xl text-blue-500 text-center">Register</h2>
          <p className="text-sm mt-7 text-black text-opacity-70 text-center">If you already a member, easily log in</p>
          <form className="flex flex-col gap-4" action="">
            <input className="p-2 mt-8 rounded-xl border focus:outline-none" type="text" name="email" placeholder="Your email" />
            <div className="">
              <input className="p-2 mt-1 rounded-xl border w-full focus:outline-none" type="password" name="password" placeholder="Your password" />
            </div>
            <button className="Login-button rounded-xl text-white py-2">Register</button>
          </form>
          <div className="mt-3 text-xs flex justify-between items-center">
            <p>
              <a href="#" className=''>Forgot Password?</a>
            </p>
            
            <button className="py-2 px-5 text-white Login-button rounded-xl">Register</button>
          </div>
        </div>

        <div className="md:w-1/2 flex img_hid items-center justify-center">
          <img className="w-full rounded-xl" src={RegisterImage} alt="REGISTER IMAGE" />
        </div>
      </div>
    </section>
  );
};

export default Register;
