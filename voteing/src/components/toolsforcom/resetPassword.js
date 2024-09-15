import React, { useState,useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import * as Dialog from "@radix-ui/react-dialog";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faUnlock } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [confirmErrorMessage, setConfirmErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);

  const navigate = useNavigate();
  const { id, token } = useParams();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      // Redirect to login or other appropriate page if token is not found
      navigate("*");
    }
  }, [navigate]);
  const handleSubmit = (e) => {
    e.preventDefault();

    if (confirmPassword === "") {
      setConfirmErrorMessage("Confirm password is required");
    } else if (password !== confirmPassword) {
      setConfirmErrorMessage("Passwords do not match");
    } else {
      setConfirmErrorMessage("");
    }

    if (!password) {
      setErrorMessage("New password is required");
    } else if (password.length < 6) {
      setErrorMessage("Password must be at least 6 characters long");
    } else {
      setErrorMessage("");
    }

    if (errorMessage || confirmErrorMessage) return; // Prevent submission if there are validation errors

    setLoading(true);

    axios
      .post(`http://localhost:5000/reset-password/${id}/${token}`, { password })
      .then((res) => {
        setLoading(false);
        if (res.data.Status === "Success") {
          toast.success("Your password has been changed successfully");
          setTimeout(() => {
            navigate("/auth");
          }, 3000);
        } else {
          toast.error("Error resetting password");
        }
      })
      .catch((err) => {
        setLoading(false);
        toast.error("Error occurred, please try again later");
      });
  };

  const handleBlur = () => {
    if (password.length < 6) {
      setErrorMessage("Password must be at least 6 characters long");
    } else {
      setErrorMessage("");
    }
    if (password !== confirmPassword) {
      setConfirmErrorMessage("Passwords do not match");
    } else {
      setConfirmErrorMessage("");
    }
  };

  const togglePasswordVisibility = () =>
    setIsPasswordVisible(!isPasswordVisible);

  const toggleConfirmPasswordVisibility = () =>
    setIsConfirmPasswordVisible(!isConfirmPasswordVisible);

  return (
    <Dialog.Root open>
      <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-70" />
      <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-md w-full p-3">
        <div className="bg-white p-5 shadow-lg rounded-md">
          <Dialog.Title className="text-2xl font-bold mb-4">
            Create New Password
          </Dialog.Title>
          <Dialog.Description className="text-sm text-gray-500 mb-6">
            Enter a new password to reset your password!
          </Dialog.Description>
          <form onSubmit={handleSubmit}>
            <div>
              <label>
                <div className="text-gray-700 text-xl text-left mb-2">
                  <b>New password</b>
                </div>
                <div className="relative">
                  <FontAwesomeIcon
                    icon={isPasswordVisible ? faUnlock : faLock}
                    className="absolute right-2 top-5 transform -translate-y-1/2 text-blue-400 cursor-pointer"
                    onClick={togglePasswordVisibility}
                  />
                  <input
                    type={isPasswordVisible ? "text" : "password"}
                    placeholder="Enter new Password"
                    className="mt-1 block w-full px-3 py-2 focus:outline-none focus:border-2 focus:border-blue-500 bg-gray-100 border border-gray-300 rounded-md"
                    onChange={(e) => setPassword(e.target.value)}
                    onBlur={handleBlur}
                  />
                  {errorMessage && (
                    <span className="text-red-500">{errorMessage}</span>
                  )}
                </div>
              </label>
              <label>
                <div className="text-gray-700 text-xl text-left mb-2">
                  <b>Confirm password</b>
                </div>
                <div className="relative">
                  <FontAwesomeIcon
                    icon={isConfirmPasswordVisible ? faUnlock : faLock}
                    className="absolute right-2 top-5 transform -translate-y-1/2 text-blue-400 cursor-pointer"
                    onClick={toggleConfirmPasswordVisibility}
                  />
                  <input
                    type={isConfirmPasswordVisible ? "text" : "password"}
                    placeholder="Enter Confirm Password"
                    className="mt-1 block w-full px-3 py-2 focus:outline-none focus:border-2 focus:border-blue-500 bg-gray-100 border border-gray-300 rounded-md"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    onBlur={handleBlur}
                  />
                  {confirmErrorMessage && (
                    <span className="text-red-500">{confirmErrorMessage}</span>
                  )}
                </div>
              </label>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button
                type="button"
                className="bg-gray-500 text-white py-2 px-4 rounded"
                onClick={() => navigate("/auth")}
              >
                Cancel
              </button>
              <button
                type="submit"
                className={`bg-blue-500 text-white py-2 px-4 rounded flex items-center ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
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
      <ToastContainer autoClose={3000} />
    </Dialog.Root>
  );
}

export default ResetPassword;
