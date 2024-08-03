import React, { useState } from 'react';
import '../css/index.css';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <form className="text-center space-y-4 mb-4 border border-gray-300 rounded bg-gray-800 text-white p-4" onSubmit={handleSubmit}>
      <h1 className="text-2xl mb-4">Register</h1>
      <div className="flex flex-col mb-4">
        <label htmlFor="name" className="mb-1">Name:</label>
        <input
          id="name"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="p-2 border border-gray-400 rounded bg-gray-700"
          required
        />
      </div>
      <div className="flex flex-col mb-4">
        <label htmlFor="email" className="mb-1">Email:</label>
        <input
          id="email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="p-2 border border-gray-400 rounded bg-gray-700"
          required
        />
      </div>
      <div className="flex flex-col mb-4">
        <label htmlFor="phone" className="mb-1">Phone No:</label>
        <input
          id="phone"
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="p-2 border border-gray-400 rounded bg-gray-700"
          required
        />
      </div>
      <div className="flex flex-col mb-4">
        <label htmlFor="password" className="mb-1">Password:</label>
        <input
          id="password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="p-2 border border-gray-400 rounded bg-gray-700"
          required
        />
      </div>
      <div className="flex flex-col mb-4">
        <label htmlFor="confirmPassword" className="mb-1">Confirm Password:</label>
        <input
          id="confirmPassword"
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          className="p-2 border border-gray-400 rounded bg-gray-700"
          required
        />
      </div>
      <button className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded" type="submit">Register</button>
    </form>
  );
};

const Register = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <RegistrationForm />
    </div>
  );
};

export default Register;
