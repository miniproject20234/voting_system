import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { GoogleLogin } from "@react-oauth/google";
// import { jwtDecode } from "jwt-decode";
// import OTPInput, { ResendOTP } from "otp-input-react";
// import { CgSpinner } from "react-icons/cg";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faLock,
  faUnlock,
  faUser,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";

import {
  validateName,
  isValidEmail,
  isValidPhoneNumber,
  isValidPassword,
  handleBlur,
} from "./toolsforcom/validationUtils";

const PasswordInput = ({ value, onChange, error, onBlur }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <div className="relative">
      <FontAwesomeIcon
        icon={isPasswordVisible ? faUnlock : faLock}
        className="absolute right-0 pr-2  top-6 transform -translate-y-1/2 text-blue-400 cursor-pointer"
        onClick={togglePasswordVisibility}
      />
      <input
        className={`p-2 pl-1 mt-1 border-b-2  pr-8  hover:shadow-lg placeholder-small border-gray-300 focus:outline-none focus:shadow-lg w-full ${
          error ? "border-red-500" : ""
        }`}
        type={isPasswordVisible ? "text" : "password"}
        name="password"
        placeholder="Enter password"
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        autoComplete="new-password"
      />
      {error && <span className="text-red-500 text-sm">{error}</span>}
    </div>
  );
};

const Register = ({ setIsSignUp }) => {
  // const [ loading, setLoading] =useState(false);
  // const [OTP, setOTP] = useState("");

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
        await axios.post("http://localhost:5000/register", {
          username: userName,
          email: email,
          password: password,
          confirmPassword: confirmPassword,
          phonenumber: phoneNumber,
          headers: {
            "Content-Type": "application/json",
          },
        });
        toast.success(" Registered successfully! 👍");
        setTimeout(() => {
          window.location.reload(); // This will refresh the page
        }, 2000);
      } catch (error) {
        // Handle validation or server errors
        if (error.response) {
          console.error("Server responded with an error:", error.response.data); // Full error response
          setErrors(error.response.data.errors); // Server validation errors
        } else if (error.request) {
          console.error("Request was made but no response received:", error.request);
        } else {
          console.error("Error setting up the request:", error.message);
        }
      }
      
    } else {
      toast.error(" Please enter the valid details before submitting👎");
    }
  };

  return (
    <>
      <div className="flex   sm:h-[100vh] items-center justify-center overflow-hidden ">
        <div className="bg-grey-500  p-5 rounded-xl shadow-xl flex items-center justify-center">
          <div className="bg-[#fffcfd2d] sm:flex  rounded-2xl max-w-md sm:max-w-3xl">
            <div className="w-6/6 sm2:h-[400px] relative h-[360px] sm:h-auto mb-6  flex rounded-xl bg-[url('../assets/signup.jpg')] bg-center bg-cover  sm:flex  p-5">
              <div className="justify-center sm:mt-5 ">
                <h1 className="text-black font-semibold text-2xl  ">
                  Welcome Back!
                </h1>
                <p className="text-white mt-5  sm:px-6 px-6 sm3:px-12 sm3:mb-5 mb-2 sm2:px-10  text-left  ">
                Stay connected with us! Enter your details and join us.
                 
                </p>
                <button
                  onClick={() => setIsSignUp(false)}
                  className="group sm2:mt-2  sm:p-1 flex justify-center transform blink  outline-double outline-1 outline-offset-1 bg-white hover:bg-blue-300  hover:outline-none font-semibold py-1 m-auto  p-2 sm:w-3/6 sm715:w-2/6 rounded-md shadow-white hover:shadow-lg duration-300 ease-in-out"
                >
                  <svg
                    className="blinks  text-sky-600 group-hover:text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    fill="none"
                  >
                    <path
                      d="M13.485 10.7553L16.4892 10.7553M16.4892 10.7553H19.9954C20.8264 10.7553 21.5 10.083 21.5 9.25355C21.5 8.42415 20.8264 7.75178 19.9954 7.75178L14.531 7.75178M16.4892 10.7553L16.4624 11.8097C16.4443 12.5207 16.056 13.1373 15.4844 13.4776M14.531 7.75178L9.96807 7.75178M14.531 7.75178L11.7712 5.15834C9.90362 3.58588 8.54219 4.4122 7.78577 4.99245L5.34841 6.60732C3.28085 7.83214 2.5 9.2495 2.5 10.4418V15.3225C2.5 17.5886 4.88227 19.7016 7.06579 19.7016L12.2657 19.7497C13.2759 19.759 14.135 19.0163 14.27 18.017L14.4593 16.4766M13.4552 13.7589H14.4593C14.8335 13.7589 15.1842 13.6563 15.4844 13.4776M15.4844 13.4776L15.4297 14.8132C15.4021 15.8977 14.5134 16.7624 13.4266 16.7624H12.4226"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="pl-1 font-bold  text-sky-600   group-hover:text-white">
                  Sign in
                  </span>
                </button>
              </div>
            </div>
            <div className="px-6 sm:px-10   w-5/  items-center">
              <h2 className="font-bold text-2xl mt-5 text-blue-500 text-center">
                Create Account
              </h2>
              <p className="text-sm mt-7 text-black text-opacity-70 text-center">
                Don’t have an account? Sign up and unlock your potential!
              </p>

              <form
                className="flex flex-col  mt-2 gap-4"
                onSubmit={handleSubmit}
              >
                <div className="relative">
                  <FontAwesomeIcon
                    icon={faUser}
                    className="absolute right-0 pr-2  top-10 transform -translate-y-1/2 text-blue-400"
                  />
                  <input
                    className={`p-2 pl-1 mt-5 placeholder-small focus:shadow-lg border-b-2  pr-8 border-gray-300 hover:shadow-lg focus:outline-none w-full ${
                      errors.userName ? "border-red-500" : ""
                    }`}
                    type="text"
                    name="userName"
                    placeholder="Enter Name"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    onBlur={(e) =>
                      handleBlur(
                        e.target.name,
                        e.target.value,
                        errors,
                        setErrors,
                        password
                      )
                    }
                    autoComplete="name"
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
                    className="absolute right-0 pr-2  top-6 transform -translate-y-1/2 text-blue-400"
                  />
                  <input
                    className={`p-2 pl-1 placeholder-small focus:shadow-lg border-b-2  pr-8 border-gray-300 hover:shadow-lg focus:outline-none w-full ${
                      errors.email ? "border-red-500" : ""
                    }`}
                    type="email"
                    name="email"
                    placeholder="Enter Email"
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
                    <div className="text-red-500 text-sm">{errors.email}</div>
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
                <div className="relative">
                  <FontAwesomeIcon
                    icon={faLock}
                    className="absolute right-0 pr-2  top-6 transform -translate-y-1/2 text-blue-400"
                  />
                  <input
                    className={`p-2 pl-1 placeholder-small focus:shadow-lg border-b-2  pr-8 border-gray-300 hover:shadow-lg focus:outline-none w-full ${
                      errors.confirmPassword ? "border-red-500" : ""
                    }`}
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    onBlur={(e) =>
                      handleBlur(
                        e.target.name,
                        e.target.value,
                        errors,
                        setErrors,
                        password
                      )
                    }
                    autoComplete="new-password"
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
                    className="absolute right-0 pr-2  top-6 transform -translate-y-1/2 text-blue-400"
                  />
                  <input
                    className={`p-2 pl-1 placeholder-small focus:shadow-lg border-b-2  pr-8 border-gray-300 hover:shadow-lg focus:outline-none w-full ${
                      errors.phoneNumber ? "border-red-500" : ""
                    }`}
                    type="number"
                    name="phoneNumber"
                    placeholder="Phone Number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    onBlur={(e) =>
                      handleBlur(
                        e.target.name,
                        e.target.value,
                        errors,
                        setErrors,
                        password
                      )
                    }
                    autoComplete="tel"
                  />
                  {errors.phoneNumber && (
                    <div className="text-red-500 text-sm">
                      {errors.phoneNumber}
                    </div>
                  )}
                </div>
                {/* <label
                htmlFor="otp"
                className=" text-md text-black text-center"
              >
                Enter the verification c  ode
              </label>
              <div className="">
              <OTPInput value={OTP} onChange={setOTP} autoFocus  OTPLength={6} otpType="number" disabled={false} secure className=" flex justify-between  border-black rounded-md  text-xl" separator={<span className="">-</span>}  placeholder="______  "  errorStyle="error"
                    successStyle="success"  />
              <ResendOTP onResendClick={() => console.log("Resend clicked")} />
             </div> 
             <button
               
                className="bg-blue-600 w-full flex gap-1 items-center justify-center p-2 text-white rounded"
              >
                {loading && (
                  <CgSpinner size={20} className="mt-1 animate-spin" />
                )}
                <span>Verify OTP</span>
              </button> */}

                <button
                  type="submit"
                  className="p-2 Login-button rounded-full bg-blue-500 text-white hover:shadow-lg"
                >
                  Register
                </button>
                <button className=" pl-20">
                  {/* <GoogleLogin 
                onSuccess={(credentialResponse) => {
                  const credentialResponseDecoded = jwtDecode(
                    credentialResponse.credential
                  );
                  console.log(credentialResponseDecoded);
                }}
                onError={() => {
                  toast.error("Error signing up with Google");
                  console.log("Login Failed");
                }}
               
              /> */}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
