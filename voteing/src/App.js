import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './css/Auth.css';
import './css/SignUpForm.css';
import './css/SignInForm.css';


import Auth from './pages/Auth';
// import Login from './pages/Login';
import Votepage from './pages/Votepage'


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
        <Route path='/' element={<Auth />} exact />
        
        <Route path='/votepage' element={<Votepage />}  />
        <Route path='*' element={<h1>Not found</h1>}  />
        
        
        
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App;