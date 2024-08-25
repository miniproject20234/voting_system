import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function ProtectedRoute({ component: Component }) {
  const [auth, setAuth] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await axios.get('/votepage'); // Hit the protected route
        setAuth(true);
      } catch (err) {
        console.log('Not authenticated:', err.message);
        setAuth(false);
        navigate('/auth'); // Redirect to login page if not authenticated
      }
    };

    checkAuth();
  }, [navigate]);

  return auth ? <Component /> : null; // Render the component if authenticated
}

export default ProtectedRoute;
