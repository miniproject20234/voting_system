// HomePage.js
import React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const HomePage = () => {
  const [userDetails, setUserDetails] = useState("");
 

  const emailId = localStorage.getItem("email");

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        if (emailId) {
          const response = await axios.get("https://vote-backend-e92j.onrender.com/user", {
            params: { email: emailId },
          });

          if (response.data.user) {
            setUserDetails(response.data.user);
          } else {
            toast.error(response.data.message || "Error fetching user details");
          }
        }
      } catch (err) {
        toast.error(
          err.response?.data?.message || "Network problem or Server issue"
        );
      } finally {
      
      }
    };

    fetchUserDetails();
  }, [emailId]);

  const username = userDetails.username;
  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <div className="text-center bg-white p-10 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Welcome to Our Voting Platform
        </h1>
        <p className="text-gray-600 mb-6">
          Participate in elections and make your vote count!
        </p>
        <div className="flex justify-center space-x-4">
          {userDetails ? (<div>
           <p> Welcome! {username}</p><br />
            <Link to="/dashboard">
              <button className="bg-green-500 text-white px-6 py-2 rounded-full">
                vote
              </button>
            </Link>
            </div>
          ) : (
            <Link to="/auth">

              <button className="bg-indigo-600 text-white px-6 py-2 rounded-full">
                Log In to continue
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
