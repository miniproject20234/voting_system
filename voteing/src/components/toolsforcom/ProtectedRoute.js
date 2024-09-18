import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const ProtectedRoute = ({ element: Component, ...rest }) => {
  const [auth, setAuth] = useState(false);
  const navigate = useNavigate();
  const email = localStorage.getItem("email");

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setAuth(false);
        alert("Join the Vote – Log in now!");
        navigate("/auth");
      } else {
        setAuth(true);
      }
    };

    checkAuth();
  }, [navigate]);

  return auth ? <Component email={email} {...rest} /> : null; 
};

export default ProtectedRoute;