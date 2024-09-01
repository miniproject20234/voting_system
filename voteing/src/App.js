import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';


import './css/Auth.css';
import './css/SignUpForm.css';
import './css/SignInForm.css';

import Auth from './pages/Auth';
import Votepage from './pages/Votepage';
import Homepage from './components/homepage';



function ProtectedRoute({ component: Component, ...rest }) {
  const [auth, setAuth] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
     

      if (!token) {
        setAuth(false);
        navigate("/");
      } else {
        setAuth(true);
     
        navigate("/votepage");
      }
    };

    checkAuth();
  }, [navigate]);

  return auth ? <Component email={email} /> : <Auth />;
}
const email = localStorage.getItem("email");

function App() {
  return (
    <>
 

    <Routes>
      
      
   
    <Route path='/homepage' element={<Homepage />} />
      <Route path='/votepage' element={<ProtectedRoute component={Votepage} email={email} />} />
      <Route path='*' element={<h1>Not found</h1>} />
    </Routes>
    </>
  
  );
}

export default App;