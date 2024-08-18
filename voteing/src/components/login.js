
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faUnlock } from '@fortawesome/free-solid-svg-icons';
import login_img from '../assets/girl.png';
import { Link } from 'react-router-dom';

const PasswordInput = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <div className="relative">
      <FontAwesomeIcon
        icon={isPasswordVisible ? faUnlock : faLock}
        className="absolute right-3 top-2/4 transform -translate-y-1/2 text-blue-400 cursor-pointer"
        onClick={togglePasswordVisibility}
      />
      <input
        className="p-2 pl-10 mt-1 rounded-xl border focus:outline-none w-full"
        type={isPasswordVisible ? "text" : "password"}
        name="password"
        placeholder="Your password"
      />
    </div>
  );
};

const Login = () => {
  return (
    <section className="bg-grey-500 login-bg min-h-screen flex items-center justify-center">
      <div className="bg-[#fffcfd80] flex rounded-2xl shadow-lg max-w-3xl p-4">
        <div className="sm:w-1/2 px-16">
          <h2 className="font-bold text-2xl text-blue-500 text-center">Login</h2>
          <p className="text-sm mt-7 text-black text-opacity-70 text-center">
            If you already a member, easily log in
          </p>
          <form className="flex flex-col gap-4" action="">
            <div className="relative">
              <FontAwesomeIcon icon={faEnvelope} className="absolute right-3 top-3/4 transform -translate-y-1/2 text-blue-400" />
              <input
                className="p-2 pl-10 mt-8 rounded-xl border focus:outline-none w-full"
                type="text"
                name="email"
                placeholder="Your email"
              />
            </div>
            <PasswordInput />
            <button className="Login-button rounded-xl text-white py-2">Login</button>
          </form>
          <div className="mt-3 text-xs flex justify-between items-center">
            <p>
              
                Forgot Password?
              
            </p>
            <Link to="/" className="py-2 px-5 text-white Login-button rounded-xl">Register</Link>
          </div>
        </div>
        
        <div className="md:w-1/2 flex img_hid items-center justify-center">
          <img className="w-full rounded-xl" src={login_img} alt='loginimage' />
        </div>
      </div>
    </section>
  );
};

export default Login