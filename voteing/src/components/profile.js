import React, { useState, useEffect, useCallback  } from "react";
import { FaCamera } from "react-icons/fa";
import { IoMdRemoveCircleOutline } from "react-icons/io";
import { MdEdit } from "react-icons/md";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faPhone,
  faEnvelope,
  faLock,
  faUnlock,
} from "@fortawesome/free-solid-svg-icons";

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import * as Dialog from "@radix-ui/react-dialog";
import {
  validateName,
  isValidEmail,
  isValidPhoneNumber,
} from "./Auth/validationUtils";

const Profile = () => {
  const [userDetails, setUserDetails] = useState({});
  const [image, setImage] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phonenumber, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [isEditable, setIsEditable] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [password, setPassword] = useState("");
  const emailId = localStorage.getItem("email");
  const navigate = useNavigate();

  
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (!storedToken) {
      navigate("*");
    }
  }, [navigate]);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };


  const fetchUserDetails = useCallback(async () => {
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
  }, [emailId]);
   
    useEffect(() => {
      fetchUserDetails(); 
    }, [fetchUserDetails]);


  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const allowedTypes = ["image/png", "image/jpg", "image/jpeg"];
      if (!allowedTypes.includes(file.type)) {
        toast.error("Only .png, .jpg, and .jpeg formats are allowed.");
        setImage(null);
        return;
      }
      setImage(file);
      const formData = new FormData();
      formData.append("photo", file);
      setLoading(true);
      try {
        await axios.post(
          `http://localhost:5000/upload-image?email=${emailId}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        toast.success("Photo uploaded successfully!");
        fetchUserDetails();
      } catch (err) {
        const errMsg = err.response ? err.response.data.error : err.message;
        toast.error("Error uploading photo: " + errMsg);
        console.error("Error:", errMsg);
      } finally {
        setLoading(false);
      }
    } else {
      toast.error("Please select an image to upload.");
    }
  };

  const handleRemoveImage = async () => {
    setLoading(true);
    try {
      await axios.delete(`http://localhost:5000/remove-image?email=${emailId}`);
      toast.success("Photo removed successfully!");
      setImage(null);
      fetchUserDetails();
    } catch (err) {
      const errMsg = err.response ? err.response.data.error : err.message;
      toast.error("Error removing photo: " + errMsg);
      console.error("Error:", errMsg);
    } finally {
      setLoading(false);
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

    if (!password) {
      validationErrors.password = "Please enter your Password";
    } else if (password.length < 6) {
      validationErrors.password = "Password must be at least 6 characters long";
    }

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const userId = userDetails._id;

    const formData = {
      username,
      email,
      phonenumber,
      password,
    };

    // Ensure validation passes before submitting
    if (validate()) {
      try {
        const response = await axios.put(
          `http://localhost:5000/update-profile/${userId}`,
          formData,
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        toast.success("Profile updated successfully!");
        localStorage.setItem("email", email);
        setUserDetails(response.data.updatedUser);
        fetchUserDetails();
        setShowPasswordModal(false);
      } catch (err) {
        const errorMessages = err.response?.data?.errors;
        if (errorMessages) {
          Object.values(errorMessages).forEach((error) => {
            toast.error(error);
          });
        } else if (err.response?.data?.message) {
          toast.error(err.response.data.message);
        } else {
          toast.error("Failed to update profile");
        }
      } finally {
        setLoading(false);
      }
    } else {
      toast.error("Please enter all valid details before updating👎");
      setLoading(false);
    }
  };
  // Validate password on blur
  const handleBlur = () => {
    let validationError = {};
    if (!password) {
      validationError.password = "Please enter your Password";
    } else if (password.length < 6) {
      validationError.password = "Password must be at least 6 characters long";
    } else {
      validationError.password = "";
    }
    setErrors(validationError);
  };

  const handleEditClick = () => {
    setIsEditable(!isEditable);
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
            {userDetails.photo ? (
              <img
                className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md"
                src={`http://localhost:5000/images/${userDetails.photo}`}
                alt="profile"
              />
            ) : (
              <img
                className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md"
                src={image ? URL.createObjectURL(image) : "/assets/Unknown.png"}
                alt="profile"
              />
            )}

            {userDetails.photo ? (
              <label
                onClick={handleRemoveImage}
                htmlFor="remove-photo"
                className="absolute bottom-1 right-0 p-1 bg-white  rounded-full shadow-lg cursor-pointer"
              >
                <IoMdRemoveCircleOutline className="text-blue-600" />
              </label>
            ) : (
              <label
                htmlFor="upload-photo"
                className="absolute bottom-0 right-0 bg-white p-1 rounded-full shadow-lg cursor-pointer"
              >
                <FaCamera className="text-blue-500" />
              </label>
            )}
            <input
              type="file"
              id="upload-photo"
              className="hidden"
              onChange={handleImageChange}
            />
          </div>
          <h1 className="text-xl font-semibold mt-4">{userDetails.username}</h1>
          {/* <p className="text-gray-500 text-sm ">{userDetails._id}</p> */}
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
                      disabled={true}
                    />
                  ) : (
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="p-2 pr-8 pl-10 border-b border-gray-300 focus:outline-none focus:border-blue-500 flex-grow"
                      placeholder="Enter your username"
                      onBlur={() => {
                        if (!username) {
                          setErrors((prevErrors) => ({
                            ...prevErrors,
                            username: "Please enter your Name",
                          }));
                        } else if (!validateName(username)) {
                          setErrors((prevErrors) => ({
                            ...prevErrors,
                            username:
                              "Please enter a valid Name (characters only A to Z)",
                          }));
                        } else {
                          setErrors((prevErrors) => ({
                            ...prevErrors,
                            username: "",
                          }));
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
                      disabled={true}
                    />
                  ) : (
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="p-2 pr-8 pl-10 border-b border-gray-300 focus:outline-none focus:border-blue-500 flex-grow"
                      placeholder="Enter your email"
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
                          setErrors((prevErrors) => ({
                            ...prevErrors,
                            email: "",
                          }));
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
                      disabled={true}
                    />
                  ) : (
                    <input
                      type="text"
                      value={phonenumber}
                      onChange={(e) => setPhone(e.target.value)}
                      className="p-2 pr-8 pl-10 border-b border-gray-300 focus:outline-none focus:border-blue-500 flex-grow"
                      placeholder="Enter your phone number"
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
                          setErrors((prevErrors) => ({
                            ...prevErrors,
                            phonenumber: "",
                          }));
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
          {/* Password Verification Modal */}
          <Dialog.Root
            open={showPasswordModal}
            onOpenChange={setShowPasswordModal}
          >
            <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-70" />
            <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-md w-full p-3">
              <div className="bg-white p-5 shadow-lg rounded-md">
                <Dialog.Title className="text-2xl font-bold mb-4">
                  Profile Verification
                </Dialog.Title>
                <Dialog.Description className="text-center text-sm text-gray-500 mb-6">
                  Enter your password to update your profile.
                </Dialog.Description>
                <form onSubmit={handleSubmit}>
                  <div>
                    <label>
                      <b className="text-gray-700 text-xl mb-2">Password</b>
                      <div className="relative">
                        <FontAwesomeIcon
                          icon={isPasswordVisible ? faUnlock : faLock}
                          className="absolute right-2 top-5 transform -translate-y-1/2 text-blue-400 cursor-pointer"
                          onClick={togglePasswordVisibility}
                        />
                        <input
                          type={isPasswordVisible ? "text" : "password"}
                          className="mt-1 block w-full px-3 py-2 focus:outline-none focus:border-2 focus:border-blue-500 bg-gray-100 border border-gray-300 rounded-md"
                          onChange={(e) => setPassword(e.target.value)}
                          onBlur={handleBlur}
                        />
                      </div>
                    </label>

                    {errors.password && (
                      <div className="text-red-500 text-center text-sm">
                        <span>{errors.password}</span>
                      </div>
                    )}
                  </div>
                  <div className="flex justify-end space-x-3 mt-6">
                    <button
                      type="button"
                      className="bg-gray-500 text-white py-2 px-4 rounded"
                      onClick={() => setShowPasswordModal(false)}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="bg-blue-500 text-white flex  py-2 px-4 rounded"
                      disabled={loading}
                      
                    >
                      {loading && (
                        <svg
                          className="animate-spin h-5 w-5 mr-3 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 50 50"
                        >
                          <path
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="4"
                            strokeLinecap="round"
                            d="M25 5C12.3 5 5 12.3 5 25s7.3 20 20 20"
                          >
                            <animateTransform
                              attributeName="transform"
                              type="rotate"
                              from="0 25 25"
                              to="360 25 25"
                              dur="1s"
                              repeatCount="indefinite"
                            />
                          </path>
                        </svg>
                      )}
                      {loading ? "Updating..." : "Update"}
                    </button>
                  </div>
                </form>
              </div>
            </Dialog.Content>
          </Dialog.Root>

          {/* Submit Button */}
          <div className="flex justify-center mt-4">
            <button
              type="button"
              onClick={() => {
                setShowPasswordModal(true);
                if (!isEditable) {
                  setIsEditable(true);
                }
              }}
              className="bg-blue-500 text-white px-5 flex py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={loading}
            >
              {!showPasswordModal && loading ? (
                <svg
                  className="animate-spin h-5 w-5 mr-3 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 50 50"
                >
                  <path
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeLinecap="round"
                    d="M25 5C12.3 5 5 12.3 5 25s7.3 20 20 20"
                  >
                    <animateTransform
                      attributeName="transform"
                      type="rotate"
                      from="0 25 25"
                      to="360 25 25"
                      dur="1s"
                      repeatCount="indefinite"
                    />
                  </path>
                </svg>
              ) : (
                ""
              )}

              {!showPasswordModal && loading ? "Updating..." : "Update Profile"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
