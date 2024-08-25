import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import axios from 'axios';

import './css/Auth.css';
import './css/SignUpForm.css';
import './css/SignInForm.css';

import Auth from './pages/Auth';
import Votepage from './pages/Votepage';

function ProtectedRoute({ component: Component, ...rest }) {
  const [auth, setAuth] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await axios.get('http://localhost:5000/votepage'); // This should hit your protected route
        setAuth(true);
      } catch (err) {
        console.log('Not authenticated:', err.message);
        setAuth(false);
        alert('login to get the access');
        navigate('/auth'); // Redirect to login page if not authenticated
      }
    };

    checkAuth();
  }, [navigate]);

  return auth ? <Component /> : <Auth />;
}

function App() {
  return (
    <Routes>
      <Route path='/' element={<Auth />} />
      <Route path='/auth' element={<Auth />} />
      <Route path='/votepage' element={<ProtectedRoute component={Votepage} />} />
      <Route path='*' element={<h1>Not found</h1>} />
    </Routes>
  );
}

export default App;
