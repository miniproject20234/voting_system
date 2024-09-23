import React, { useEffect, useState } from 'react';
import SignUpForm from './SignUpForm.js';
import SignInForm from './SignInForm.js';
import {useNavigate} from 'react-router-dom'


const AuthForm = () => {
const navigate=useNavigate();
    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
        
          navigate("*");
        }
      }, [navigate]);
    const [isSignUp, setIsSignUp] = useState(false);
    return (
        <div className="text-center  relative  items-center mt-10">
            <div className={`flex md:pl-60 md:pr-60 mr-10  ml-10   ${
                        isSignUp ? ' ' : ''
                    }  ` }   >
                <button
                    onClick={() => setIsSignUp(false)}
                    className={`p-2 w-full border-b-4 py-2  px-4 ${
                        !isSignUp ? ' border-blue-500' : 'hover:text-sky-500 border-transparent'
                    }`}
                >
                    <b className='auth-button '>Sign In</b>
                </button>
                <button
                    onClick={() => setIsSignUp(true)}
                    className={`p-2 w-full border-b-4 py-2 px-2 ${
                        isSignUp ? ' border-blue-500 ' : 'hover:text-sky-500 border-transparent'
                    }`}
                >
                    <b className='auth-button '> Sign Up</b>
                </button>
            </div>
              {/* Sliding form animations */}
            <div className="relative sm:h-[750px] h-[1200px]   overflow-hidden  mt-5">
                <div
                    className={`absolute w-full  transition-transform duration-500 ${
                        isSignUp
                            ? 'translate-x-full opacity-0'
                            : 'translate-x-0 opacity-100'
                    }`}
                >
                    <SignInForm />
                </div>

               <div className=''>
               <div
                    className={`absolute w-full transition-transform duration-500 ${
                        isSignUp
                            ? 'translate-x-0 opacity-100'
                            : '-translate-x-full opacity-0'
                    }`}
                >
                    <SignUpForm />
                </div>
               </div>
            </div>
        </div>
    );
};

export default AuthForm;