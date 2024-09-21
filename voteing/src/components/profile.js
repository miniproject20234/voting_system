import React, { useState, useEffect } from "react";
import { FaCamera } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faPhone,
  faEnvelope,
  faLock,
  faUnlock,
} from "@fortawesome/free-solid-svg-icons";
import Unknow from "../assets/Unknown.png";
import { useNavigate } from "react-router-dom";
import {  toast } from "react-toastify";
import axios from "axios";
import * as Dialog from "@radix-ui/react-dialog";
import {
  validateName,
  isValidEmail,
  isValidPhoneNumber,
} from "./toolsforcom/validationUtils";

const Profile = () => {
  const [userDetails, setUserDetails] = useState({});
  const [image, setImage] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phonenumber, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [isEditable, setIsEditable] = useState(false);
  const emailId = localStorage.getItem("email");
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (!storedToken) {
      navigate("*");
    }
  }, [navigate]);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get("http://localhost:5000/user", {
          params: { email: emailId },
        });
        if (response.data.user) {
          setUserDetails(response.data.user);
        } else {
          toast.error(response.data.message || "Error fetching user details");
        }
      } catch (err) {
        toast.error(
          err.response?.data?.message || "Network problem or Server issue"
        );
      }
    };
    fetchUserDetails();
  }, [emailId]);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const allowedTypes = ['image/png', 'image/jpg', 'image/jpeg'];
      if (!allowedTypes.includes(file.type)) {
        toast.error('Only .png, .jpg, and .jpeg formats are allowed.');
        setImage(null);
        return;
      }
      setImage(file);
      // Create FormData and append the selected file
      const formData = new FormData();
      formData.append('photo', file); 
      setLoading(true);
      try {
       await axios.post(`http://localhost:5000/upload-image?email=${emailId}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        toast.success('Photo uploaded successfully!');
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } catch (err) {
        const errMsg = err.response ? err.response.data.error : err.message;
        toast.error('Error uploading photo: ' + errMsg);
        console.error('Error:', errMsg);
      } finally {
        setLoading(false);
      }
    } else {
      toast.error('Please select an image to upload.');
    }
  };


  

  const validate = () => {
    let validationErrors = {};

    if (!username) {
      validationErrors.username = "Please enter your Name";
    } else if (!validateName(username)) {
      validationErrors.username =
        "Please enter a valid Name (characters only A to Z)";
    }

    if (!email) {
      validationErrors.email = "Please enter your Email";
    } else if (!isValidEmail(email)) {
      validationErrors.email = "Please enter a valid email address";
    }

    if (!phonenumber) {
      validationErrors.phonenumber = "Please enter your Phone Number";
    } else if (!isValidPhoneNumber(phonenumber)) {
      validationErrors.phonenumber = "Please enter a valid phone number";
    }
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleEditClick = () => {
    setIsEditable(!isEditable);
  };
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phonenumber: ''
  });
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!validate()) {
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/update-profile",
        formData,
        {
          headers: { "Content-Type": "application/json" } 
        }
      );
      setFormData(response.data); 
      toast.success("Profile updated successfully!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <>
      <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg pb-5 overflow-hidden mt-5">
        <div className="bg-gradient-to-b from-[#1a45d7] to-[#79fcfa] text-center p-16 rounded-lg">
          <h1 className="text-4xl font-extrabold text-blue-100 mb-2 tracking-wider drop-shadow-white">
            Profile
          </h1>

          <button className="mt-2 px-4 py-2 bg-sky-900 cursor-text bg-opacity-30 rounded-full">
            <span className="text-white">Update Status</span>
          </button>
        </div>

        {/* Profile Picture */}
        <div className="text-center -mt-12">
          <div className="relative inline-block">
            {userDetails.photo ?(<img
              className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md"
              src={`http://localhost:5000/images/${userDetails.photo}`}
              alt="profile"
            />) : (<img
              className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md"
              src={image ? URL.createObjectURL(image) : Unknow}
              alt="profile"
            />)
            }
            <label
              htmlFor="upload-photo"
              className="absolute bottom-0 right-0 bg-white p-1 rounded-full shadow-lg cursor-pointer"
            >
              <FaCamera className="text-blue-500" />
            </label>
            <input
              type="file"
              id="upload-photo"
              className="hidden"
              onChange={handleImageChange}
            />
          </div>
          <h1 className="text-xl font-semibold mt-4">{userDetails.username}</h1>
          <p className="text-gray-500">{userDetails.email}</p>
        </div>

        {/* Profile Form */}
        <div className="mt-6 space-y-4 px-6">
          {/* Username */}
          <div>
            <div className="relative ">
              <FontAwesomeIcon
                icon={faUser}
                className="absolute left-3 bottom-1 transform -translate-y-1/2 text-blue-500"
              />
              <div className="flex flex-col mb-4">
                <label className="font-semibold mb-1">Username</label>
                <div className="flex items-center">
                  {!isEditable ? (
                    <input
                      type="text"
                      value={userDetails.username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="p-2 pr-8 pl-10 border-b border-gray-300 focus:outline-none focus:border-blue-500 flex-grow"
                      placeholder="Enter your username"
                      disabled={!isEditable}
                    />
                  ) : (
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="p-2 pr-8 pl-10 border-b border-gray-300 focus:outline-none focus:border-blue-500 flex-grow"
                      placeholder="Enter your username"
                      disabled={!isEditable}
                      onBlur={() => {
                        if (!username) {
                          setErrors((prevErrors) => ({
                            ...prevErrors,
                            username: "Please enter your Name",
                          }));
                        } else if (!validateName(username)) {
                          setErrors((prevErrors) => ({
                            ...prevErrors,
                            username: "Please enter a valid Name (characters only A to Z)",
                          }));
                        } else {
                          setErrors((prevErrors) => ({ ...prevErrors, username: "" }));
                        }
                      }}
                    />
                  )}
                  <button
                    className="text-blue-500 absolute right-1 hover:bg-blue-100 hover:bg-opacity-30 focus:bg-blue-100 focus:bg-opacity-30"
                    onClick={handleEditClick}
                  >
                    <MdEdit className="text-blue-500 text-2xl p-1" />
                  </button>
                </div>
              </div>
            </div>
            {errors.username && (
              <div className="text-red-500 text-center text-sm">
                {!isEditable ? <span></span> : <span>{errors.username}</span>}
              </div>
            )}
          </div>

          {/* Email Field */}
          <div>
            <div className="relative ">
              <FontAwesomeIcon
                icon={faEnvelope}
                className="absolute left-3 bottom-1 transform -translate-y-1/2 text-blue-500"
              />
              <div className="flex flex-col mb-4">
                <label className="font-semibold mb-1">Email Address</label>
                <div className="flex items-center">
                  {!isEditable ? (
                    <input
                      type="email"
                      value={userDetails.email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="p-2 pr-8 pl-10 border-b border-gray-300 focus:outline-none focus:border-blue-500 flex-grow"
                      placeholder="Enter your email"
                      disabled={!isEditable}
                    />
                  ) : (
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="p-2 pr-8 pl-10 border-b border-gray-300 focus:outline-none focus:border-blue-500 flex-grow"
                      placeholder="Enter your email"
                      disabled={!isEditable}
                      onBlur={() => {
                        if (!email) {
                          setErrors((prevErrors) => ({
                            ...prevErrors,
                            email: "Please enter your Email",
                          }));
                        } else if (!isValidEmail(email)) {
                          setErrors((prevErrors) => ({
                            ...prevErrors,
                            email: "Please enter a valid email address",
                          }));
                        } else {
                          setErrors((prevErrors) => ({ ...prevErrors, email: "" }));
                        }
                      }}
                    />
                  )}
                </div>
              </div>
            </div>
            {errors.email && (
              <div className="text-red-500 text-center text-sm">
                {!isEditable ? <span></span> : <span>{errors.email}</span>}
              </div>
            )}
          </div>

          {/* Phone Field */}
          <div>
            <div className="relative">
              <FontAwesomeIcon
                icon={faPhone}
                className="absolute left-3 bottom-1 transform -translate-y-1/2 text-blue-500"
              />
              <div className="flex flex-col mb-4">
                <label className="font-semibold mb-1">Phone Number</label>
                <div className="flex items-center">
                  {!isEditable ? (
                    <input
                      type="text"
                      value={userDetails.phonenumber}
                      onChange={(e) => setPhone(e.target.value)}
                      className="p-2 pr-8 pl-10 border-b border-gray-300 focus:outline-none focus:border-blue-500 flex-grow"
                      placeholder="Enter your phone number"
                      disabled={!isEditable}
                    />
                  ) : (
                    <input
                      type="text"
                      value={phonenumber}
                      onChange={(e) => setPhone(e.target.value)}
                      className="p-2 pr-8 pl-10 border-b border-gray-300 focus:outline-none focus:border-blue-500 flex-grow"
                      placeholder="Enter your phone number"
                      disabled={!isEditable}
                      onBlur={() => {
                        if (!phonenumber) {
                          setErrors((prevErrors) => ({
                            ...prevErrors,
                            phonenumber: "Please enter your Phone Number",
                          }));
                        } else if (!isValidPhoneNumber(phonenumber)) {
                          setErrors((prevErrors) => ({
                            ...prevErrors,
                            phonenumber: "Please enter a valid phone number",
                          }));
                        } else {
                          setErrors((prevErrors) => ({ ...prevErrors, phonenumber: "" }));
                        }
                      }}
                    />
                  )}
                </div>
              </div>
            </div>

            {errors.phonenumber && (
              <div className="text-red-500 text-center text-sm">
                {!isEditable ? (
                  <span></span>
                ) : (
                  <span>{errors.phonenumber}</span>
                )}
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex justify-center mt-4">
            <button
              type="button"
              onClick={handleSubmit}
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={loading}
            >
              {loading ? "Updating..." : "Update Profile"}
            </button>
          </div>
        </div>
      </div>

     
   
    </>
  );
};

export default Profile;