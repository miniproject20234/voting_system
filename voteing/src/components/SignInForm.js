import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faLock,
  faUnlock,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import login_img from "../assets/girl.png";

import {
  isValidEmail,
  isValidPassword,
  handleBlur,
} from "./validationUtils";
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
        className="absolute right-3 top-1/3 transform -translate-y-1/2 text-blue-400 cursor-pointer"
        onClick={togglePasswordVisibility}
      />
      <input
        className={`p-2 pl-1 mt-1 border-b-2 hover:shadow-lg placeholder-small border-gray-300 focus:outline-none focus:shadow-lg w-full ${
          error ? "border-red-500" : ""
        }`}
        type={isPasswordVisible ? "text" : "password"}
        name="password"
        placeholder="Enter password"
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
      {error && <span className="text-red-500 text-sm">{error}</span>}
    </div>
  );
};

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

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
          alert("Login successful!");
          navigate('/votepage');
          
        }
      } catch (error) {
        if (error.response && error.response.data.errors) {
          setErrors(error.response.data.errors );
          
        }
        else {
          alert("An error occurred. Please try again.");
        }
      }
    } else {
      alert("Please enter the valid details before submitting.");
    }
  };
  

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

            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <div className="relative">
                <FontAwesomeIcon
                  icon={faEnvelope}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-400"
                />
                <input
                  className={`p-2 pl-1 mt-5 placeholder-small focus:shadow-lg border-b-2 border-gray-300 hover:shadow-lg focus:outline-none w-full ${
                    errors.email ? "border-red-500" : ""
                  }`}
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={(e) => handleBlur(e.target.name, e.target.value, errors, setErrors, password)}
                />
                {errors.email && (
                  <span className="text-red-500 text-sm">{errors.email}</span>
                )}
              </div>
              <PasswordInput
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={errors.password}
                onBlur={(e) => handleBlur(e.target.name, e.target.value, errors, setErrors, password)}
              />
              <button
                type="submit"
                className="Login-button p-2 rounded-full bg-blue-500 text-white"
              >
                Login
              </button>
            </form>

            <div className="mt-5 text-xs flex justify-between items-center">
              <p>Forgot Password?</p>
            </div>
          </div>
          <div className="w-1/2 flex items-center img_hid justify-center">
            <img className="rounded-xl" src={login_img} alt="Login" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
