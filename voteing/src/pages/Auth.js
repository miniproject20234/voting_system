import React from "react";
import Navbar from "../components/navbar";
import Authcom from "../components/auth";
import Footer from "../components/footer";

const Auth = ({ email }) => {
  return (
    <>
      <Navbar email={email} />

      <Authcom />
      <Footer />
    </>
  );
};

export default Auth;
