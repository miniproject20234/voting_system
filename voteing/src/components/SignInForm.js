import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faLock,
  faUnlock,
} from "@fortawesome/free-solid-svg-icons";
import login_img from "../assets/girl.png";

const PasswordInput = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <div className="relative">
      <FontAwesomeIcon
        icon={isPasswordVisible ? faUnlock : faLock}
        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-400 cursor-pointer"
        onClick={togglePasswordVisibility}
      />
      <input
        className="p-2 pl-1 mt-1 border-b-2 hover:shadow-lg placeholder-small border-gray-300 focus:outline-none focus:shadow-lg w-full"
        type={isPasswordVisible ? "text" : "password"}
        name="password"
        placeholder="Enter password"
      />
    </div>
  );
};

const Login = () => {
  return (
    <div className="p-5 flex h-screen items-center justify-center">
      <div className="bg-grey-500 p-5 shadow-lg flex items-center justify-center">
        <div className="bg-[#fffcfd2d] flex rounded-2xl max-w-3xl">
          <div className="px-16">
            <h2 className="font-bold text-2xl text-blue-500 text-center">
              Login
            </h2>
            <p className="text-sm mt-7 text-black text-opacity-70 text-center">
              Already a member? Let's get you logged in!
            </p>

            <form className="flex flex-col gap-4">
              <div className="relative">
                <FontAwesomeIcon
                  icon={faEnvelope}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-400"
                />
                <input
                  className="p-2 pl-1 mt-5 placeholder-small focus:shadow-lg border-b-2 border-gray-300 hover:shadow-lg focus:outline-none w-full"
                  type="email"
                  name="email"
                  placeholder="Enter email"
                />
              </div>
              <PasswordInput />
              <button className="Login-button p-2 rounded-full bg-blue-500 text-white">
                Login
              </button>
            </form>

            <div className="mt-5 text-xs flex justify-between items-center">
              <p>Forgot Password?</p>
            </div>
          </div>
          <div className="w-1/2 flex items-center justify-center">
            <img className="rounded-xl" src={login_img} alt="Login" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
