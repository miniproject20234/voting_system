
import "./css/Auth.css";
import "./css/SignUpForm.css";
import "./css/SignInForm.css";


import React from "react";
import { Routes, Route } from "react-router-dom";
import Auth from "./pages/Auth";
import Votepage from "./pages/Votepage";
import Homepage from "./pages/HomePage";
import NotFound from "./pages/NotFound";
import About from "./pages/Aboutpage";
import Profile from "./pages/Profilepage";
import ProtectedRoute from "./components/toolsforcom/ProtectedRoute";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/votepage" element={<ProtectedRoute element={Votepage} />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/about" element={<About />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
