import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button'; 

const Profile = () => {
  const [image, setImage] = useState("");
  const [name, setName] = useState(""); 
  const [email, setEmail] = useState("");  
  const [username, setUsername] = useState("");
  const [phone_no, setPhone_no] = useState("");  

  // Handle image selection
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.substring(0, 5) === "image") {
      setImage(file);
    } else {
      setImage(null);
    }
  };

  // Handle profile update submission
  const handleSubmit = () => {
    // Submit logic here
    alert("Profile updated!");
  };

  return (
    <div className="flex justify-center mt-10">
      <div className="profile_img text-center p-6 bg-white shadow-lg rounded-lg">
        {/* Profile Image */}
        <div className="flex flex-col justify-center items-center mb-6">
          <img
            style={{
              width: "100px",
              height: "100px",
              borderRadius: "50%",
              objectFit: "cover",
              border: "4px solid black",
            }}
            src={image ? URL.createObjectURL(image) : "default-image.jpg"} 
            alt=""
          />
          <InputText
            type="file"
            accept="image/*"
            className="mt-4"
            onChange={handleImageChange}
          />
        </div>

        {/* Form Inputs for Name, Email,  */}
        <div className="flex flex-col items-start">
          <label className="mb-2">Name</label>
          <InputText 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            className="w-full p-2 mb-4 border-b border-gray-300 focus:outline-none focus:border-blue-500"
            placeholder="Enter your name"
          />

          <label className="mb-2">Username</label>
          <InputText 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            className="w-full p-2 mb-4 border-b border-gray-300 focus:outline-none focus:border-blue-500"
            placeholder="Enter your username"
          />

          <label className="mb-2">Email</label>
          <InputText 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            className="w-full p-2 mb-4 border-b border-gray-300 focus:outline-none focus:border-blue-500"
            placeholder="Enter your email"
          />

          <label className="mb-2">Phone No</label>
          <InputText 
            value={phone_no} 
            onChange={(e) => setPhone_no(e.target.value)} 
            className="w-full p-2 mb-4 border-b border-gray-300 focus:outline-none focus:border-blue-500"
            placeholder="Enter your phone number"
          />
        </div>

        {/* Submit and Cancel Buttons */}
        <div className="flex justify-between mt-4">
          <Button 
            label="Update Profile" 
            className="p-button p-button-primary font-blue-400" 
            onClick={handleSubmit} 
          />
          <Button 
            label="Cancel" 
            className="p-button p-button-secondary ml-2" 
            onClick={() => {
              setImage("");
              setName("");
              setUsername("");
              setEmail("");
              setPhone_no("");
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;
