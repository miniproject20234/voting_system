import React, { useState } from "react";
import axios from 'axios';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faLock,
  faUnlock,
  faUser,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import RegisterImage from "../assets/key-removebg.png";
import {
  validateName,
  isValidEmail,
  isValidPhoneNumber,
  isValidPassword,
  handleBlur,
} from "./validationUtils";

const PasswordInput = ({ value, onChange, error, onBlur }) => {
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

const Register = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [errors, setErrors] = useState({});

  const validate = () => {
    let validationErrors = {};

    if (!userName) {
      validationErrors.userName = "Please enter your Name";
    } else if (!validateName(userName)) {
      validationErrors.userName =
        "Please enter a valid Name (characters only A to Z)";
    }

    if (!email) {
      validationErrors.email = "Please enter your Email";
    } else if (!isValidEmail(email)) {
      validationErrors.email = "Please enter a valid email address";
    }

    if (!phoneNumber) {
      validationErrors.phoneNumber = "Please enter your Phone Number";
    } else if (!isValidPhoneNumber(phoneNumber)) {
      validationErrors.phoneNumber = "Please enter a valid phone number";
    }

    if (!password) {
      validationErrors.password = "Please enter your Password";
    } else if (!isValidPassword(password)) {
      validationErrors.password = "Password must be at least 6 characters long";
    }

    if (!confirmPassword) {
      validationErrors.confirmPassword = "Please confirm your Password";
    } else if (confirmPassword !== password) {
      validationErrors.confirmPassword = "Passwords not matching";
    }

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (validate()) {
        try {
            const response = await axios.post('http://localhost:5000/register', {
                username: userName,
                email: email,
                password: password,
                confirmPassword: confirmPassword,
                phonenumber: phoneNumber,
                headers: {
                  'Content-Type': 'application/json'
                }
            });

            // Handle successful registration
            alert('Registered successfully!');
            window.location.reload(); // This will refresh the page
            console.log(response.data);
        } catch (error) {
            // Handle validation or server errors
            if (error.response && error.response.data.errors) {
                setErrors(error.response.data.errors);
               
            } else {
                console.error('Something went wrong', error);
            }
        }
    } else {
        alert('Please enter the valid details before submitting.');
    }
};

  return (
    <div className="flex h-screen items-center justify-center custom-padding">
      <div className="bg-grey-500 p-5 shadow-lg flex items-center justify-center">
        <div className="bg-[#fffcfd2d] flex rounded-2xl max-w-3xl">
          <div className="px-16">
            <h2 className="font-bold text-2xl text-blue-500 text-center">
              Create Account
            </h2>
            <p className="text-sm mt-7 text-black text-opacity-70 text-center">
              Don’t have an account? Sign up and unlock your potential!
            </p>

            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <div className="relative">
                <FontAwesomeIcon
                  icon={faUser}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-400"
                />
                <input
                  className={`p-2 pl-1 mt-5 placeholder-small focus:shadow-lg border-b-2 border-gray-300 hover:shadow-lg focus:outline-none w-full ${
                    errors.userName ? "border-red-500" : ""
                  }`}
                  type="text"
                  name="userName"
                  placeholder="Enter Name"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  onBlur={(e) => handleBlur(e.target.name, e.target.value, errors, setErrors, password)}
                />
                {errors.userName && (
                  <div className="text-red-500 text-sm">
                    {errors.userName}
                  </div>
                )}
              </div>
              <div className="relative">
                <FontAwesomeIcon
                  icon={faEnvelope}
                  className="absolute right-3 top-1/3 transform -translate-y-1/2 text-blue-400"
                />
                <input
                  className={`p-2 pl-1 placeholder-small focus:shadow-lg border-b-2 border-gray-300 hover:shadow-lg focus:outline-none w-full ${
                    errors.email ? "border-red-500" : ""
                  }`}
                  type="email"
                  name="email"
                  placeholder="Enter Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={(e) => handleBlur(e.target.name, e.target.value, errors, setErrors, password)}
                />
                {errors.email && (
                  <div className="text-red-500 text-sm">{errors.email}</div>
                )}
              </div>
              <PasswordInput
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={errors.password}
                onBlur={(e) => handleBlur(e.target.name, e.target.value, errors, setErrors, password)}
              />
              <div className="relative">
                <FontAwesomeIcon
                  icon={faLock}
                  className="absolute right-3 top-1/3 transform -translate-y-1/2 text-blue-400"
                />
                <input
                  className={`p-2 pl-1 placeholder-small focus:shadow-lg border-b-2 border-gray-300 hover:shadow-lg focus:outline-none w-full ${
                    errors.confirmPassword ? "border-red-500" : ""
                  }`}
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  onBlur={(e) => handleBlur(e.target.name, e.target.value, errors, setErrors, password)}
                />
                {errors.confirmPassword && (
                  <div className="text-red-500 text-sm">
                    {errors.confirmPassword}
                  </div>
                )}
              </div>
              <div className="relative">
                <FontAwesomeIcon
                  icon={faPhone}
                  className="absolute right-3 top-1/3 transform -translate-y-1/2 text-blue-400"
                />
                <input
                  className={`p-2 pl-1 placeholder-small focus:shadow-lg border-b-2 border-gray-300 hover:shadow-lg focus:outline-none w-full ${
                    errors.phoneNumber ? "border-red-500" : ""
                  }`}
                  type="number"
                  name="phoneNumber"
                  placeholder="Phone Number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  onBlur={(e) => handleBlur(e.target.name, e.target.value, errors, setErrors, password)}
                />
                {errors.phoneNumber && (
                  <div className="text-red-500 text-sm">
                    {errors.phoneNumber}
                  </div>
                )}
              </div>
              <button
                type="submit"
                className="p-2 Login-button rounded-full bg-blue-500 text-white"
              >
                Register
              </button>
            </form>
          </div>
          <div className="w-1/2 flex items-center img_hid justify-center">
            <img className="rounded-xl" src={RegisterImage} alt="Register" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
