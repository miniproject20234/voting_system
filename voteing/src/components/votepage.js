import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Votepage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await axios.get('/votepage');
        // If successful, user can stay on the page
      } catch (err) {
        console.log(err.message);
        navigate('/auth'); // Redirect to login page
      }
    };

    checkAuth();
  }, [navigate]);

  return (
    <div>
      <h1>Vote Page</h1>
      {/* Your vote page content goes here */}
    </div>
  );
};

export default Votepage;
