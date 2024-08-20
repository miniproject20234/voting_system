import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Here you would typically make an API call to send the reset link
    // Assuming the request is successful:
    setMessage('If an account with that email exists, a reset link has been sent to your email.');
  };

  return (
    <section className="bg-grey-500 min-h-screen flex items-center justify-center">
      <div className="bg-[#fffcfd2d] flex rounded-2xl shadow-lg max-w-3xl p-4">
        <div className="sm:w-full px-16">
          <h2 className="font-bold text-2xl text-blue-500 text-center">Forgot Password</h2>
          <p className="text-sm mt-7 text-black text-opacity-70 text-center">
            Enter your email address to receive a password reset link.
          </p>

          <form className="flex flex-col gap-4 mt-5" onSubmit={handleSubmit}>
            <div className="relative">
              <FontAwesomeIcon icon={faEnvelope} className="absolute right-3 top-2/4 transform -translate-y-1/2 text-blue-400" />
              <input
                className="p-2 pl-10 rounded-xl border focus:outline-none w-full"
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>
            <button className="glow-effect rounded-full text-white py-2 px-4" type="submit">
              Send Reset Link
            </button>
          </form>

          {message && (
            <p className="mt-5 text-sm text-green-500 text-center">
              {message}
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default ForgotPassword;
