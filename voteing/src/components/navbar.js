import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";

import React, { useEffect, useState,useCallback } from "react";
import { useLocation, useNavigate, NavLink } from "react-router-dom";
import axios from "axios";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import {  toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const colors = [
  "#9370db", // medium Indigo
  "#D81B60", // Dark Pink
  "#F9A825", // Dark Yellow
  "#03A9F4", // Light Blue
  "#8BC34A", // Light Green
];

// Function to generate a color based on the first letter of the username
const getColorFromLetter = (letter) => {
  const index = letter.charCodeAt(0) % colors.length;
  return colors[index];
};

const Navvbars = ({ email }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [userDetails, setUserDetails] = useState("");
  const [loading, setLoading] = useState(true);

  const emailId = localStorage.getItem("email");

 
    const fetchUserDetails = useCallback(async () => {
      try {
        if (emailId) {
          const response = await axios.get("http://localhost:5000/user", {
            params: { email: emailId },
          });

          if (response.data.user) {
            setLoading(false);
            setUserDetails(response.data.user);
            
            fetchUserDetails();
          } else {
            toast.error(response.data.message || "Error fetching user details");
          }
        }
      } catch (err) {
        toast.error(
          err.response?.data?.message || "Network problem or Server issue"
        );
      } finally {
        setLoading(false);
      }
    },[emailId]);

  useEffect(() => {
    fetchUserDetails(); 
  }, [fetchUserDetails]);

  //profile
  const username = userDetails.username;
  const placeholderLetter = username ? username.charAt(0).toUpperCase() : "";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    navigate("/auth");
  };
  //for sticky top-0
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  //profile

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-85 z-50">
        <div>
          <h1 className="text-xl md:text-7xl font-bold text-white flex items-center">
            L
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 24 24"
              className="animate-spin"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2ZM13.6695 15.9999H10.3295L8.95053 17.8969L9.5044 19.6031C10.2897 19.8607 11.1286 20 12 20C12.8714 20 13.7103 19.8607 14.4956 19.6031L15.0485 17.8969L13.6695 15.9999ZM5.29354 10.8719L4.00222 11.8095L4 12C4 13.7297 4.54894 15.3312 5.4821 16.6397L7.39254 16.6399L8.71453 14.8199L7.68654 11.6499L5.29354 10.8719ZM18.7055 10.8719L16.3125 11.6499L15.2845 14.8199L16.6065 16.6399L18.5179 16.6397C19.4511 15.3312 20 13.7297 20 12L19.997 11.81L18.7055 10.8719ZM12 9.536L9.656 11.238L10.552 14H13.447L14.343 11.238L12 9.536ZM14.2914 4.33299L12.9995 5.27293V7.78993L15.6935 9.74693L17.9325 9.01993L18.4867 7.3168C17.467 5.90685 15.9988 4.84254 14.2914 4.33299ZM9.70757 4.33329C8.00021 4.84307 6.53216 5.90762 5.51261 7.31778L6.06653 9.01993L8.30554 9.74693L10.9995 7.78993V5.27293L9.70757 4.33329Z"></path>
            </svg>
            ading . . .
          </h1>
        </div>
      </div>
    );
  }

  return (
    <Disclosure
      as="nav"
      className={`bg-white mb-5 ${isMenuOpen ? "" : "z-40 sticky top-0"}`}
    >
      {({ open }) => (
        <div>
          <div
            className={`max-w-full mx-auto px-4 sm:px-6 lg:px-8  ${
              open ? "fixed inset-0 bg-gray-900 bg-opacity-85 z-40" : ""
            }`}
          >
            <div className="bg-white p-1">
              <div className="flex   justify-between h-16">
                <div className="flex">
                  <div className="-ml-2  mr-2 flex items-center sm:hidden">
                    <Disclosure.Button
                      className="inline-flex ml-2 border-n items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
                      onClick={handleMenuClick}
                    >
                      {isMenuOpen ? (
                        <XIcon
                          className="block h-6 w-6 text-gray-700"
                          aria-hidden="true"
                        />
                      ) : (
                        <MenuIcon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      )}
                    </Disclosure.Button>
                  </div>
                  <div className="flex-shrink-0 flex items-center">
                    <img
                      src='/assets/blueLogo.jpeg'
                      alt="Logo"
                      className="w-14 mt-1 h-14 rounded-full"
                    />
                  </div>
                  <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                    {/* Navigation Links */}
                    <NavLink
                      to="/"
                      className={({ isActive }) =>
                        ` inline-flex items-center px-1 pt-1 border-b-2 text-md font-medium ${
                          isActive
                            ? "border-blue-600 text-gray-900"
                            : "border-transparent text-gray-500 nav-link  hover:text-blue-600"
                        }`
                      }
                    >
                      Home
                    </NavLink>
                  
                    <NavLink
                      to="/dashboard"
                      className={({ isActive }) =>
                        ` inline-flex items-center px-1 pt-1 border-b-2 text-md font-medium ${
                          isActive
                            ? "border-blue-600 text-gray-900"
                            : "border-transparent text-gray-500 nav-link hover:text-blue-600"
                        }`
                      }
                    >
                      Dashboard
                    </NavLink>
                    <NavLink
                      to="/about"
                      className={({ isActive }) =>
                        `  inline-flex items-center px-1 pt-1 border-b-2 text-md font-medium ${
                          isActive
                            ? "border-blue-600  text-gray-900"
                            : "border-transparent text-gray-500 nav-link hover:text-blue-600"
                        }`
                      }
                    >
                      About
                    </NavLink>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="ml-4 flex-shrink-0 flex items-center ">
                    {userDetails ? (
                      <div className="text-blue-600">
                        <b>
                          <i>{userDetails.username}</i>
                        </b>
                      </div>
                    ) : (
                      <div>
                        <NavLink exact to="/auth">
                          <button
                            className={`inline-flex items-center px-4 py-2 border text-sm font-medium rounded-md text-white shadow-sm 
                                ${
                                  location.pathname === "/auth"
                                    ? "hidden"
                                    : "bg-blue-600 hover:bg-blue-700"
                                }`}
                          >
                            <b> Log in now!</b>
                            <span className="relative fle h-2 w-2">
                              <span className="animate-ping absolute left-4 bottom-4 h-full w-full rounded-full bg-red-800 opacity-75"></span>
                              <span className="relative inline-flex bottom-6 left-4 rounded-full h-2 w-2 bg-red-400"></span>
                            </span>
                          </button>
                        </NavLink>
                      </div>
                    )}
                    {/* Profile dropdown */}
                    <Menu as="div" className="ml-3 relative">
                      <div>
                        <Menu.Button className="bg-white rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                          <span className="sr-only">Open user menu</span>
                          {userDetails&& userDetails.photo ? (
                    <img
                      className="h-10 w-10 rounded-full"
                      src={`http://localhost:5000/images/${userDetails.photo}`}
                      alt="Profile"
                    />
                  ) : (
                    <div className="flex-shrink-0">
                      {placeholderLetter ? (
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            height: "45px",
                            width: "45px",
                            borderRadius: "50%",
                            fontSize: "2.25rem",
                            fontWeight: "bold",
                            backgroundColor:
                              getColorFromLetter(placeholderLetter),
                          }}
                        >
                          {placeholderLetter}
                        </div>
                      ) : (
                        <img
                          className="h-10 w-10 rounded-full"
                          src='/assets/Unknown.png'
                          alt="Default"
                        />
                      )}
                    </div>
                  )}
                        </Menu.Button>
                      </div>
                      {userDetails && (
                        <Transition
                          as={Fragment}
                          leave="transition ease-in duration-100"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <NavLink
                              to="/profile"
                              className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100"
                            >
                              Your Profile
                            </NavLink>

                            <Menu.Item>
                              {({ active }) => (
                                <AlertDialog.Root>
                                  <AlertDialog.Trigger asChild>
                                    <button
                                      className={`block w-full hover:bg-gray-100 text-left px-4 py-2 text-sm text-gray-700 ${
                                        active ? "bg-gray-100" : ""
                                      }`}
                                      type="button"
                                    >
                                      Sign Out
                                    </button>
                                  </AlertDialog.Trigger>
                                  <AlertDialog.Portal>
                                    <AlertDialog.Overlay className="bg-black bg-opacity-50 fixed inset-0" />
                                    <AlertDialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg max-w-md w-full z-50">
                                      <AlertDialog.Title className="text-xl font-bold text-gray-900">
                                        Confirm Sign Out
                                      </AlertDialog.Title>
                                      <AlertDialog.Description className="mt-2 text-gray-600">
                                        Are you sure you want to sign out? You
                                        will need to log in again to access your
                                        account.
                                      </AlertDialog.Description>
                                      <div className="mt-4 flex justify-end space-x-4">
                                        <AlertDialog.Cancel asChild>
                                          <button
                                            type="button"
                                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                                          >
                                            Cancel
                                          </button>
                                        </AlertDialog.Cancel>
                                        <AlertDialog.Action asChild>
                                          <button
                                            onClick={handleLogout}
                                            className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
                                          >
                                            Log Out
                                          </button>
                                        </AlertDialog.Action>
                                      </div>
                                    </AlertDialog.Content>
                                  </AlertDialog.Portal>
                                </AlertDialog.Root>
                              )}
                            </Menu.Item>
                          </Menu.Items>
                        </Transition>
                      )}
                    </Menu>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Disclosure.Panel className="">
            <div className="fixed  z-40  p-4 inset-x-0  top-20">
              <div className="pt-2  pb-3 rounded-sm bg-white space-y-1">
                <NavLink
                  as="NavLink"
                  to="/"
                  className={({ isActive }) =>
                    `border-transparent text-gray-500 hover:bg-gray-200 hover:border-gray-500 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium sm:pl-5 sm:pr-6 ${
                      isActive
                        ? "bg-blue-200 border-l-4 border-blue-500 text-blue-700  "
                        : ""
                    }`
                  }
                >
                  Home
                </NavLink>

                <NavLink
                  to="/dashboard"
                  className={({ isActive }) =>
                    `border-transparent text-gray-500 hover:bg-gray-200 hover:border-gray-500 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium sm:pl-5 sm:pr-6 ${
                      isActive
                        ? "bg-blue-200 border-l-4 border-blue-500 text-blue-700  "
                        : ""
                    }`
                  }
                >
                  Dashboard
                </NavLink>
                <NavLink
                  to="/about"
                  className={({ isActive }) =>
                    `border-transparent text-gray-500 hover:bg-gray-200 hover:border-gray-500 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium sm:pl-5 sm:pr-6 ${
                      isActive
                        ? "bg-blue-200 border-l-4 border-blue-500 text-blue-700  "
                        : ""
                    }`
                  }
                >
                  About
                </NavLink>
              </div>
              <div className="pt-4 pb-3 border-t bg-white border-gray-200 ">
                <div className="flex items-center px-4 sm:px-6">
                  {userDetails&& userDetails.photo ? (
                    <img
                      className="h-10 w-10 rounded-full"
                      src={`http://localhost:5000/images/${userDetails.photo}`}
                      alt="Profile"
                    />
                  ) : (
                    <div className="flex-shrink-0">
                      {placeholderLetter ? (
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            height: "45px",
                            width: "45px",
                            borderRadius: "50%",
                            fontSize: "2.25rem",
                            fontWeight: "bold",
                            backgroundColor:
                              getColorFromLetter(placeholderLetter),
                          }}
                        >
                          {placeholderLetter}
                        </div>
                      ) : (
                        <img
                          className="h-10 w-10 rounded-full"
                          src='/assets/Unknown.png'
                          alt="Default"
                        />
                      )}
                    </div>
                  )}

                  <div className="ml-3">
                    {userDetails && (
                      <div className="text-base font-medium text-gray-800">
                        {" "}
                        <i>{userDetails.username}</i>
                      </div>
                    )}
                    <div className="text-base font-medium text-gray-800">
                      <i>{email}</i>
                    </div>
                  </div>

                  {userDetails && (
                    <div className="ml-auto flex-shrink-0">
                      <AlertDialog.Root>
                        <AlertDialog.Trigger asChild>
                          <button
                            className=" bg-blue-500 text-white font-semibold py-1 px-4 rounded-md hover:bg-blue-600"
                            type="button"
                          >
                            Sign Out
                          </button>
                        </AlertDialog.Trigger>
                        <AlertDialog.Portal>
                          <AlertDialog.Overlay className="bg-black bg-opacity-50 fixed inset-0" />
                          <AlertDialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg max-w-md w-full z-50">
                            <AlertDialog.Title className="text-xl font-bold text-gray-900">
                              Confirm Sign Out
                            </AlertDialog.Title>
                            <AlertDialog.Description className="mt-2 text-gray-600">
                              Are you sure you want to sign out? You will need
                              to log in again to access your account.
                            </AlertDialog.Description>
                            <div className="mt-4 flex justify-end space-x-4">
                              <AlertDialog.Cancel asChild>
                                <button
                                  type="button"
                                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                                >
                                  Cancel
                                </button>
                              </AlertDialog.Cancel>
                              <AlertDialog.Action asChild>
                                <button
                                  onClick={handleLogout}
                                  className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
                                >
                                  Log Out
                                </button>
                              </AlertDialog.Action>
                            </div>
                          </AlertDialog.Content>
                        </AlertDialog.Portal>
                      </AlertDialog.Root>
                    </div>
                  )}
                </div>
                {userDetails && (
                  <div>
                    <NavLink
                      to="/profile"
                      className={({ isActive }) =>
                        `border-transparent text-gray-500 mt-2 hover:bg-gray-200 hover:border-gray-500 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium sm:pl-5 sm:pr-6 ${
                          isActive
                            ? "bg-blue-200 border border-l-4 border-blue-500 text-blue-700  "
                            : ""
                        }`
                      }
                    >
                      Your Profile
                    </NavLink>
                  </div>
                )}
              </div>
            </div>
          </Disclosure.Panel>
    
        </div>
      )}
    </Disclosure>
  );
};

export default Navvbars;
