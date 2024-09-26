import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ForgotPassword from "./toolsforcom/forgotPassword";

import {
  faEnvelope,
  faLock,
  faUnlock,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  isValidEmail,
  isValidPassword,
  handleBlur,
} from "./toolsforcom/validationUtils";
import axios from "axios";

const PasswordInput = ({ value, onChange, error, onBlur }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <div className="relative">
      <FontAwesomeIcon
        icon={isPasswordVisible ? faUnlock : faLock}
        className="absolute right-0 top-6 pr-2 transform -translate-y-1/2 text-blue-400 cursor-pointer"
        onClick={togglePasswordVisibility}
      />
      <input
        className={`p-2 pl-1 pr-8 mt-1 border-b-2 hover:shadow-lg placeholder-small border-gray-300 focus:outline-none focus:shadow-lg w-full ${
          error ? "border-red-500" : ""
        }`}
        type={isPasswordVisible ? "text" : "password"}
        name="password"
        placeholder="Enter password"
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        autoComplete="current-password"
      />
      {error && <span className="text-red-500 text-sm">{error}</span>}
    </div>
  );
};

const Login = ({ setIsSignUp }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  //Forgot password on click
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const handleForgotPasswordClick = () => {
    setShowForgotPassword(true);
  };

  const validate = () => {
    let formErrors = {};

    if (!email) {
      formErrors.email = "Please enter your Email";
    } else if (!isValidEmail(email)) {
      formErrors.email = "Please enter a valid email address";
    }

    if (!password) {
      formErrors.password = "Please enter your Password";
    } else if (!isValidPassword(password)) {
      formErrors.password = "Password must be at least 6 characters long";
    }

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validate()) {
      try {
        const response = await axios.post("http://localhost:5000/login", {
          email: email,
          password: password,
        });

        if (response.status === 200) {
          toast.success("Login successfull! 👍");
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("email", email); // Store email

          setTimeout(() => {
            navigate("/votepage");
            window.location.reload();
          }, 2000);
        }
      } catch (error) {
        if (error.response && error.response.data.errors) {
          setErrors(error.response.data.errors);
        } else {
          toast.error("An server error occurred. Please try again later.");
        }
      }
    } else {
      toast.error("Please enter registered details before submitting 👎");
    }
  };

  return (
    <>
      <div className="p-5  flex sm:h-[100vh]   items-center justify-center">
        <div className="bg-grey-500  p-5 shadow-xl  flex items-center justify-center">
          <div className="bg-[#fffcfd2d]    sm:flex rounded-2xl sm:max-w-3xl">
            <div className="w-6/6 sm2:h-[400px] h-[360px] mb-6  flex rounded-xl bg-[url('../assets/girl.png')] bg-center bg-cover  sm:hidden  p-5">
              <div className="mt-4 ">
                <h1 className="text-black font-semibold text-2xl  ">
                  Create Account
                </h1>
                <p className="text-white mt-3  px-1 sm3:px-10 sm2:px-16 ">
                  Enter the Details & Start journey with us   <span
                    onClick={() => setIsSignUp(true)}
                    className="cursor-pointer rounded-lg duration-300 ease-in-out group"
                  >
                    <span className="inline-flex items-center">
                      <span className="hover-effect inline-flex items-center">
                        <span className=" blink-animation hover:text-[#0000ff]">
                          Sign Up!
                        </span>
                      </span>
                    </span>
                  </span>
                </p>
              
              
              </div>
            </div>

            <div className="sm:px-16 px-4">
              <h2 className="font-bold text-2xl text-blue-500 text-center">
                Login
              </h2>
              <p className="text-sm mt-7 text-black text-opacity-70 text-center">
                Already a member? Let's get you logged in!
              </p>

              <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <div className="relative">
                  <FontAwesomeIcon
                    icon={faEnvelope}
                    className="absolute pr-2 right-0 top-10 transform -translate-y-1/2 text-blue-400"
                  />
                  <input
                    className={`p-2 pl-1 pr-8 mt-5 placeholder-small focus:shadow-lg border-b-2 border-gray-300 hover:shadow-lg focus:outline-none w-full ${
                      errors.email ? "border-red-500" : ""
                    }`}
                    type="email"
                    name="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onBlur={(e) =>
                      handleBlur(
                        e.target.name,
                        e.target.value,
                        errors,
                        setErrors,
                        password
                      )
                    }
                    autoComplete="email"
                  />
                  {errors.email && (
                    <span className="text-red-500 text-sm">{errors.email}</span>
                  )}
                </div>
                <PasswordInput
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  error={errors.password}
                  onBlur={(e) =>
                    handleBlur(
                      e.target.name,
                      e.target.value,
                      errors,
                      setErrors,
                      password
                    )
                  }
                />
                <button
                  type="submit"
                  className="Login-button  p-2 rounded-full bg-blue-500 text-white  hover:shadow-lg "
                >
                  Login
                </button>
              </form>

              <div className="mt-4 text-xs flex justify-between items-center">
                <div>
                  {!showForgotPassword ? (
                    <p
                      onClick={handleForgotPasswordClick}
                      className="cursor-pointer text-blue-500 hover:bg-slate-100 p-1 rounded-md   "
                    >
                      Forgot Passwords?
                    </p>
                  ) : (
                    <ForgotPassword />
                  )}
                </div>
              </div>
            </div>
            <div className="w-4/6 rounded-xl px-10 hidden sm:flex justify-center bg-[url('../assets/girl.png')] bg-center bg-cover">
              <div className="mt-2">
                <h1 className="text-black font-semibold sm:text-2xl">
                  Create Account
                </h1>
                <p className="text-white mt-3 sm750:px-6">
                  Enter the Details & Start journey with us{" "} 
                  <span
                    onClick={() => setIsSignUp(true)}
                    className="cursor-pointer rounded-lg duration-300 ease-in-out group"
                  >
                    <span className="inline-flex items-center">
                      <span className="hover-effect inline-flex items-center">
                        <span className=" blink-animation hover:text-[#0000ff]">
                          Sign Up!
                        </span>
                      </span>
                    </span>
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
