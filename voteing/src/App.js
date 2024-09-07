import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';


import './css/Auth.css';
import './css/SignUpForm.css';
import './css/SignInForm.css';





import Auth from './pages/Auth';
import Votepage from './pages/Votepage';
import Homepage from './pages/HomePage';
import NotFound from './pages/NotFound';
import About from './pages/Aboutpage';
import Profile from './pages/Profilepage';


function ProtectedRoute({ component: Component, ...rest }) {
  const [auth, setAuth] = useState(false);
  const navigate = useNavigate();
  const email = localStorage.getItem("email");

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setAuth(false);
        alert("Join the Vote – Log in now!")
        navigate("/auth");
      } else {
        setAuth(true);
        navigate("/votepage");
      }
    };

    checkAuth();
  }, [navigate]);

  return auth ? <Component email={email} {...rest} /> : <Auth />;
}

function App() {
  return (
    <>
       <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/auth' element={<Auth />} />
          <Route path='/votepage' element={<ProtectedRoute component={Votepage} />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/about' element={<About />} />
          <Route path='/*' element={<NotFound/>} />
        </Routes>
      </GoogleOAuthProvider>
     
    </>
  );
}

export default App;