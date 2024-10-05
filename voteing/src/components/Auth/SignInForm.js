import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ForgotPassword from "./forgotPassword";

import {
  faEnvelope,
  faLock,
  faUnlock,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { isValidEmail, isValidPassword, handleBlur } from "./validationUtils";
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
            navigate("/");
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
      <div className="p-5  flex sm:h-[95vh]   items-center justify-center">
        <div className="bg-grey-500  p-5 shadow-xl h-5/6 rounded-lg flex items-center justify-center">
          <div className="bg-[#fffcfd2d]    sm:flex rounded-2xl sm:max-w-3xl">
            <div className="w-6/6 sm2:h-[400px] h-[380px]   flex rounded-xl bg-[url('/public/assets/girl.png')] bg-center bg-cover  sm:hidden py-2 sm3:px-5">
              <div className=" ">
                <h1 className="text-black font-semibold text-2xl sm2:mt-2 ">
                  Create Account
                </h1>
                <p className="text-white mt-1  px-1 sm3:px-6 sm2:mt-4 ">
                  Enter the Details & Start journey with us
                </p>
                <button
                  onClick={() => setIsSignUp(true)}
                  className="group sm2:mt-2  sm:p-1 flex justify-center transform blink mt-1 outline-double outline-1 outline-offset-1 bg-white hover:bg-blue-300 hover:outline-none font-semibold py-1 m-auto  p-2 sm:w-3/6 sm715:w-2/6 rounded-md shadow-white hover:shadow-lg duration-300 ease-in-out"
                >
                  <svg
                    className="blinks text-sky-600 group-hover:text-white "
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
                  <span className="pl-1 font-bold text-sky-600    group-hover:text-white">
                    Sign Up
                  </span>
                </button>
              </div>
            </div>

            <div className=" px-4   py-10 justify-center">
              <h2 className="font-bold  text-2xl text-blue-500 text-center">
                Login
              </h2>
              <p className="text-sm mt-8 text-black text-opacity-70 text-center">
                Already a member? Let's get you logged in!
              </p>

              <form
                className="flex flex-col  mt-4 gap-4"
                onSubmit={handleSubmit}
              >
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
            <div className="w-4/6 rounded-xl px-9 hidden sm:flex justify-center bg-[url('/public/assets/girl.png')] bg-center bg-cover">
              <div className="mt-3">
                <div className="flex flex-col items-center">
                  <h1 className="text-black font-semibold sm:text-2xl">
                    Create Account
                  </h1>
                  <p className="text-white mt-3 sm750:px-3 text-center">
                    Enter the Details & Start your journey with us
                  </p>
                  <button
                    onClick={() => setIsSignUp(true)}
                    className="group justify-center flex transform blink mt-3 outline-double outline-1 outline-offset-1 bg-white hover:bg-blue-300 hover:outline-none font-semibold py-1 p-1 w-3/6 sm715:w-2/6 rounded-md shadow-white hover:shadow-lg duration-300 ease-in-out"
                  >
                    <svg
                      className="blinks   text-sky-600 group-hover:text-white"
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
                    <span className="pl-1 font-bold text-sky-600   group-hover:text-white">
                      Sign Up
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
