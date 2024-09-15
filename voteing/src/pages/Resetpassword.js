import React from "react";
import Navbar from "../components/navbar";
import ResetPassword from "../components/toolsforcom/resetPassword";
import Footer from "../components/footer";
const Resetpassword = () => {
  return (
    <div>
      <Navbar />

      <ResetPassword />
      <div className="h-[82vh] flex flex-col">
        <div className="flex-grow"></div>
        <Footer />
      </div>
    </div>
  );
};

export default Resetpassword;
