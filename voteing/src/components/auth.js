import React, { useState } from 'react';
import SignUpForm from './SignUpForm.js';
import SignInForm from './SignInForm.js';

const AuthForm = () => {
    const [isSignUp, setIsSignUp] = useState(false);
    return (
        <div className="text-center  items-center mt-10">
            <div className={`flex md:pl-60 md:pr-60 mr-10  ml-10   ${
                        isSignUp ? ' ' : ''
                    }  ` }   >
                <button
                    onClick={() => setIsSignUp(false)}
                    className={`p-2 w-full border-b-4 py-2 px-4 ${
                        !isSignUp ? ' border-blue-500' : 'hover:text-sky-500 border-transparent'
                    }`}
                >
                    <b className='auth-button'>Sign In</b>
                </button>
                <button
                    onClick={() => setIsSignUp(true)}
                    className={`p-2 w-full border-b-4 py-2 px-4 ${
                        isSignUp ? ' border-blue-500 ' : 'hover:text-sky-500 border-transparent'
                    }`}
                >
                    <b className='auth-button'> Sign Up</b>
                </button>
            </div>
            {isSignUp ? <SignUpForm /> : <SignInForm />}
        </div>
    );
};

export default AuthForm;