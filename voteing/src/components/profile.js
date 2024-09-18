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
import { ToastContainer, toast } from "react-toastify";
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
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
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

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
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
        {
          username,
          email,
          phonenumber,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      setUserDetails(response.data.user);
      toast.success("Profile updated successfully!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="max-w-sm md:max-w-lg lg:max-w-2xl mx-auto bg-white shadow-lg rounded-lg pb-5 overflow-hidden mt-5">
        <div className="bg-gradient-to-b from-[#1a45d7] to-[#79fcfa] text-center p-10 md:p-16 rounded-lg">
          <button
            className="rounded-md absolute top-7 right-3 hover:bg-blue-100 hover:bg-opacity-30 focus:bg-blue-100 focus:bg-opacity-30"
            onClick={handleEditClick}
          >
            <MdEdit className="text-blue-900 text-2xl md:text-3xl p-1" />
          </button>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-blue-100 mb-2 tracking-wider drop-shadow-white">
            Profile
          </h1>

          <button className="mt-2 px-4 py-2 bg-sky-900 bg-opacity-30 rounded-full">
            <span className="text-white">Update Status</span>
          </button>
        </div>

        {/* Profile Picture */}
        <div className="text-center -mt-12">
          <div className="relative inline-block">
            <img
              className="w-20 h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 rounded-full object-cover border-4 border-white shadow-md"
              src={image ? URL.createObjectURL(image) : Unknow}
              alt="profile"
            />
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
          <h1 className="text-lg md:text-xl font-semibold mt-4">
            {userDetails.username}
          </h1>
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
                  <input
                    type="text"
                    value={isEditable ? username : userDetails.username}
                    onChange={(e) => setUsername(e.target.value)}
                    className={`p-2 pr-8 pl-10 border-b border-gray-300 focus:outline-none focus:border-blue-500 flex-grow ${
                      !isEditable && "bg-gray-100"
                    }`}
                    placeholder="Enter your username"
                    disabled={!isEditable}
                  />
                </div>
              </div>
            </div>
            {errors.username && (
              <div className="text-red-500 text-center text-sm">
                <span>{errors.username}</span>
              </div>
            )}
          </div>

          {/* Email Field */}
          <div>
            <div className="relative">
              <FontAwesomeIcon
                icon={faEnvelope}
                className="absolute left-3 bottom-1 transform -translate-y-1/2 text-blue-500"
              />
              <div className="flex flex-col mb-4">
                <label className="font-semibold mb-1">Email Address</label>
                <div className="flex items-center">
                  <input
                    type="email"
                    value={isEditable ? email : userDetails.email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`p-2 pr-8 pl-10 border-b border-gray-300 focus:outline-none focus:border-blue-500 flex-grow ${
                      !isEditable && "bg-gray-100"
                    }`}
                    placeholder="Enter your email"
                    disabled={!isEditable}
                  />
                </div>
              </div>
            </div>
            {errors.email && (
              <div className="text-red-500 text-center text-sm">
                <span>{errors.email}</span>
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
                  <input
                    type="text"
                    value={isEditable ? phonenumber : userDetails.phonenumber}
                    onChange={(e) => setPhone(e.target.value)}
                    className={`p-2 pr-8 pl-10 border-b border-gray-300 focus:outline-none focus:border-blue-500 flex-grow ${
                      !isEditable && "bg-gray-100"
                    }`}
                    placeholder="Enter your phone number"
                    disabled={!isEditable}
                  />
                </div>
              </div>
            </div>
            {errors.phonenumber && (
              <div className="text-red-500 text-center text-sm">
                <span>{errors.phonenumber}</span>
              </div>
            )}
          </div>
        </div>

        {/* Submit Button */}
        {isEditable && (
          <div className="text-center mt-8">
            <button
              className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "Updating..." : "Update Profile"}
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Profile;
