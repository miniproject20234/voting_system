
import "./css/Auth.css";
import "./css/SignUpForm.css";
import "./css/SignInForm.css";
import "./css/profile.css";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import React from "react";
import { Routes, Route } from "react-router-dom";
import Auth from "./pages/Auth";
import Votepage from "./pages/Votepage";
import Homepage from "./pages/HomePage";
import NotFound from "./pages/NotFound";
import About from "./pages/Aboutpage";
import Profile from "./pages/Profilepage";
import ResetPassword from "./pages/Resetpassword";
import ProtectedRoute from "./components/protectedroutes/ProtectedRoute";
function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/dashboard" element={<ProtectedRoute element={Votepage} />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/about" element={<About />} />
      <Route path="*" element={<NotFound />} />
      <Route path="/reset_password/:id/:token" element={<ResetPassword />}></Route>
    </Routes>
    <ToastContainer autoClose={2000} />
    </>
  );
}

export default App;
