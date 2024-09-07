import React from "react";
import Navbar from "../components/navbar";
import Profile from "../components/profile";
import Footer from "../components/footer";
const Profilepage = ({ email }) => {
  return (
    <div>
    
      <Navbar email={email} />
      <Profile />
      <Footer />
    </div>
  );
};

export default Profilepage;
