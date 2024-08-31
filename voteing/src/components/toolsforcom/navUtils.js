import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import * as AlertDialog from '@radix-ui/react-alert-dialog';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

const Nav = () => {
    const navigate = useNavigate();
    const [userDetails, setUserDetails] = useState(null);
    const [loading, setLoading] = useState(true);

    const emailId = localStorage.getItem('email') || 'User Not logged';

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                if (emailId !== 'User Not logged') {
                    // Fetch user details from the backend
                    const response = await axios.get('http://localhost:5000/user', {
                        params: { email: emailId },
                    });

                    if (response.data.user) {
                        setUserDetails(response.data.user);
                    } else {
                        toast.error(response.data.message || 'Error fetching user details');
                    }
                }
            } catch (err) {
                toast.error(err.response?.data?.message || 'Error fetching user details');
            } finally {
                setLoading(false);
            }
        };

        fetchUserDetails();
    }, [emailId]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("email");
        navigate('/'); 
    };

    if (loading) {
        return <div class="flex items-center justify-center w-full h-[100vh] text-gray-900 dark:text-gray-100 dark:bg-gray-950">
        <div>
          <h1 class="text-xl md:text-7xl font-bold flex items-center">L<svg stroke="currentColor" fill="currentColor" stroke-width="0"
              viewBox="0 0 24 24" class="animate-spin" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2ZM13.6695 15.9999H10.3295L8.95053 17.8969L9.5044 19.6031C10.2897 19.8607 11.1286 20 12 20C12.8714 20 13.7103 19.8607 14.4956 19.6031L15.0485 17.8969L13.6695 15.9999ZM5.29354 10.8719L4.00222 11.8095L4 12C4 13.7297 4.54894 15.3312 5.4821 16.6397L7.39254 16.6399L8.71453 14.8199L7.68654 11.6499L5.29354 10.8719ZM18.7055 10.8719L16.3125 11.6499L15.2845 14.8199L16.6065 16.6399L18.5179 16.6397C19.4511 15.3312 20 13.7297 20 12L19.997 11.81L18.7055 10.8719ZM12 9.536L9.656 11.238L10.552 14H13.447L14.343 11.238L12 9.536ZM14.2914 4.33299L12.9995 5.27293V7.78993L15.6935 9.74693L17.9325 9.01993L18.4867 7.3168C17.467 5.90685 15.9988 4.84254 14.2914 4.33299ZM9.70757 4.33329C8.00021 4.84307 6.53216 5.90762 5.51261 7.31778L6.06653 9.01993L8.30554 9.74693L10.9995 7.78993V5.27293L9.70757 4.33329Z">
              </path>
            </svg> ading . . .</h1>
        </div>
      </div>
    }

    return (
        <div>
            <div className="flex justify-between items-center p-4 bg-gray-800 text-white">
          
            {userDetails ? (
                    <div className='text-green-500'>
                       <p>Username: {userDetails.username}</p>
                        <p>UserEmail: {emailId}</p>
                       
                        {/* <p>Phone Number: {userDetails.phonenumber}</p> */}
                    </div>
                ) : (
                    <div>
                        User: {emailId}
                    </div>
                )}
                <AlertDialog.Root>
                    <AlertDialog.Trigger asChild>
                      {userDetails && 
                        <button
                            className={` text-red-500  hover:border-l hover:border-b text-lg  font-bold py-1 px-2 rounded ${emailId === 'User Not logged' ? 'opacity-50 cursor-not-allowed' : ''}`}
                            onClick={emailId === 'User Not logged' ? handleLogout : undefined}
                            disabled={emailId === 'User Not logged'}
                        >
                             <FontAwesomeIcon icon={faSignOutAlt} /> 
                        </button>
                       }
                    </AlertDialog.Trigger>
                    <AlertDialog.Portal>
                        <AlertDialog.Overlay className="fixed inset-0 bg-black opacity-30" />
                        <AlertDialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg">
                            <AlertDialog.Title className="text-lg font-bold">Are you absolutely sure?</AlertDialog.Title>
                            <AlertDialog.Description className="mt-2 text-gray-600">
                                This action cannot be undone. This will remove your data.
                            </AlertDialog.Description>
                            <div className="mt-4 flex justify-end space-x-4">
                                <AlertDialog.Cancel asChild>
                                    <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
                                        Cancel
                                    </button>
                                </AlertDialog.Cancel>
                                <AlertDialog.Action asChild>
                                    <button
                                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                        onClick={handleLogout}
                                    >
                                        LogOut
                                    </button>
                                </AlertDialog.Action>
                            </div>
                        </AlertDialog.Content>
                    </AlertDialog.Portal>
                </AlertDialog.Root>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Nav;
