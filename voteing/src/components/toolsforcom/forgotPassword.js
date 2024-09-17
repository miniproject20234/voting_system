import React, { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [emailError, setEmailError] = useState('');
  const [loading, setLoading] = useState(false);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = () => {
    if (!email) {
      setEmailError('Email is required');
      return;
    }

    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email');
      return;
    }

    setEmailError('');
    setMessage('');
    setLoading(true);

    axios.post('http://localhost:5000/forgot-password', { email })
      .then(res => {
        setLoading(false);
        if (res.data.Status === "Success") {
          toast.success('Check your mail for the reset link');
          setTimeout(() => {
            window.location.reload();
          }, 3000);
        }  else {
          toast.error('Error sending reset link');
        }
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err.response?.data?.Status || 'Error occurred, please try again later');
      });
  };

  const handleBlur = () => {
    if (!email) {
      setEmailError('Email is required');
    } else if (!validateEmail(email)) {
      setEmailError('Please enter a valid email');
    } else {
      setEmailError('');
    }
  };

  return (
    <Dialog.Root open>
      <Dialog.Overlay className="fixed  inset-0 bg-black  bg-opacity-70" />
      <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-md w-full border-none outline-none p-3">
        <div className='bg-white p-5 shadow-lg  rounded-md'>
          <Dialog.Title className="text-2xl font-bold mb-4">Reset Your Password</Dialog.Title>
          <Dialog.Description className="text-sm text-gray-500 mb-6">
            Enter the email to reset your password!
          </Dialog.Description>
          <div>
            <label>
              <div className="text-gray-700 text-xl text-left mb-2"><b>Email</b></div>
              <input
                type="email"
                autoComplete='email'
                placeholder="Enter your email"
                className={`mt-1 block w-full px-3 py-2 focus:outline-none ${emailError ? 'border-red-500' : 'focus:border-blue-500'} bg-gray-100 border border-gray-300 rounded-md`}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={handleBlur}
              />
            </label>
            {emailError && <div className="mt-2 text-red-500">{emailError}</div>}
          </div>
          {message && <div className="mt-4 text-red-500">{message}</div>}
          <div className="flex justify-end space-x-3 mt-6">
            <button className="bg-gray-500 text-white py-2 px-4 rounded" onClick={() => window.location.reload()}>Cancel</button>
            <button
              className={`bg-blue-500 text-white py-2 px-4 rounded flex items-center ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading && (
                <svg className="animate-spin h-5 w-5 mr-3 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
                <path fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" d="M25 5C12.3 5 5 12.3 5 25s7.3 20 20 20">
                  <animateTransform attributeName="transform" type="rotate" from="0 25 25" to="360 25 25" dur="1s" repeatCount="indefinite" />
                </path>
              </svg>
              )}
              {loading ? 'Sending...' : 'Send'}
            </button>
          </div>
        </div>
      </Dialog.Content>
      <ToastContainer autoClose={3000} />
    </Dialog.Root>
  );
}

export default ForgotPassword;
