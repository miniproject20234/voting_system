import React, { useEffect, useState } from "react";
import SignUpForm from "./SignUpForm.js";
import SignInForm from "./SignInForm.js";
import { useNavigate } from "react-router-dom";

const AuthForm = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      navigate("*");
    }
  }, [navigate]);
  const [isSignUp, setIsSignUp] = useState(false);
  return (
    <div className="text-center  relative  items-center ">
      
      {/* Sliding form animations */}
      <div className="relative sm:h-[750px] h-[1200px]   overflow-hidden  mt-5">
        <div
          className={`absolute w-full  transition-transform duration-500 ${
            isSignUp
              ? "translate-x-full opacity-0"
              : "translate-x-0 opacity-100"
          }`}
        >
          <SignInForm setIsSignUp={setIsSignUp} />
        </div>

        <div className="">
          <div
            className={`absolute w-full transition-transform duration-500 ${
              isSignUp
                ? "translate-x-0 opacity-100"
                : "-translate-x-full opacity-0"
            }`}
          >
            <SignUpForm setIsSignUp={setIsSignUp} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
