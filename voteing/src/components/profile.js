import React, { useState, useRef } from 'react';
import { FaCamera } from 'react-icons/fa'; // Camera icon from react-icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faUser,
  faPhone,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";

function Profile() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [image, setImage] = useState(null);

  const fileInputRef = useRef(null); // Ref for file input

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.substring(0, 5) === "image") {
      setImage(file);
    } else {
      setImage(null);
    }
  };

  const handleClick = () => {
    fileInputRef.current.click(); // Trigger file input on camera icon click
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">

        {/* Profile Image with Camera Icon */}
        <div className="relative flex flex-col items-center mb-6">
          <img
            className="h-32 w-32 object-cover rounded-full border-4 border-gray-300"
            src={image ? URL.createObjectURL(image) : "default-image.jpg"}
            alt=""
          />
          
          {/* Hidden File Input */}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            ref={fileInputRef}
            className="hidden"
          />

          {/* Camera Icon - Positioned in bottom-right */}
          <button
            className="absolute bottom-2 right-2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 focus:outline-none"
            onClick={handleClick}
          >
            <FaCamera className="text-gray-600" size={20} />
          </button>
        </div>
        
        {/* Form Inputs */}
        <div className="flex flex-col mb-4">
          <label className="font-semibold mb-1">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-2 border-b border-gray-300 focus:outline-none focus:border-blue-500"
            placeholder="Enter your name"
          />
        
        </div>
        <div className="relative">
                <FontAwesomeIcon
                  icon={faUser}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-400"
                />
        <div className="flex flex-col mb-4">
          <label className="font-semibold mb-1">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="p-2 border-b border-gray-300 focus:outline-none focus:border-blue-500"
            placeholder="Enter your username"
          />
        </div>
          </div>
          <div className="relative">
          <FontAwesomeIcon
                  icon={faEnvelope}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-400"
                />
        <div className="flex flex-col mb-4">
          <label className="font-semibold mb-1">Email Address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-2 border-b border-gray-300 focus:outline-none focus:border-blue-500"
            placeholder="Enter your email"
          />
        </div>
        </div>
        <div className="relative">
                <FontAwesomeIcon
                  icon={faPhone}
                  className="absolute right-3 top-1/3 transform -translate-y-1/2 text-blue-400"
                />

        <div className="flex flex-col mb-4">
          <label className="font-semibold mb-1">Phone Number</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="p-2 border-b border-gray-300 focus:outline-none focus:border-blue-500"
            placeholder="Enter your phone number"
          />
        </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-between mt-6">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2 sm:mb-0"
          >
            Update Profile
          </button>
          
          <button
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg shadow hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
