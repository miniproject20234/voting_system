import React, { useState } from 'react';
import RegisterImage from '../assets/register.png';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNo: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = {};

    if (!formData.username.trim()) {
      validationErrors.username = "Username is required";
    }

    if (!formData.email.trim()) {
      validationErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      validationErrors.email = "Email is not valid";
    }

    if (!formData.password.trim()) {
      validationErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      validationErrors.password = "Password should be at least 6 characters";
    }

    if (formData.confirmPassword !== formData.password) {
      validationErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      alert("Form submitted successfully");
    }
  };

  return (
    <>
               
    <section className="bg-grey-500 login-bg min-h-screen flex items-center justify-center">
      
      <div className="bg-[#fffcfd80] flex rounded-2xl shadow-lg max-w-3xl p-4">
        <div className="sm:w-1/2 px-16">
          <h2 className="font-bold text-2xl text-blue-500 text-center">Register</h2>
          <div className="font-bold">
          <p className="text-sm mt-7 text-black text-opacity-70 text-center">If you are already a member, easily log in</p>
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <div>
              <input
                className="p-1 mt-2 rounded-xl border focus:outline-none"
                type="text"
                name="username"
                placeholder="Your Name"
                autoComplete='off'
                onChange={handleChange}
              />
              {errors.username && <span className="text-red-600 text-bold-500">{errors.username}</span>}
            </div>

            <div>
              <input
                className="p-1 rounded-xl border w-full focus:outline-none"
                type="email"
                name="email"
                placeholder=" Your Email"
                onChange={handleChange}
              />
              {errors.email && <span className="text-red-600 text-bold-500">{errors.email}</span>}
            </div>

            <div>
              <input
                className="p-1 rounded-xl border w-full focus:outline-none"
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
              />
              {errors.password && <span className="text-red-600 text-bold-500">{errors.password}</span>}
            </div>

            <div>
              <input
                className="p-1 rounded-xl border w-full focus:outline-none"
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                onChange={handleChange}
              />
              {errors.confirmPassword && <span className="text-red-600 text-bold-500">{errors.confirmPassword}</span>}
            </div>

            <div>
              <input
                className="p-1 rounded-xl border w-full focus:outline-none"
                type="text"
                name="phoneNo"
                placeholder="Phone No"
                onChange={handleChange}
              />
              {errors.phoneNo && <span className="text-red-600 text-bold-500">{errors.phoneNo}</span>}
            </div>

            <button className="py-2 px-4 text-white Login-button rounded-xl">Register</button>         
             </form>

          <div className="mt-3 text-xs flex justify-between items-center">

           <button className="py-2 px-4 text-white Login-button rounded-xl">Login</button>
           </div>
        </div>

        <div className="md:w-1/2 border flex img_hid items-center justify-">
          <img className="rounded-xl" src={RegisterImage} alt="REGISTER IMAGE" width={400} height={700} />
        </div>
      </div>
    </section>
    </>
  );
};

export default Register;
