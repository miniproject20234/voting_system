
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './css/Register.css';

import Register from './pages/Register';
import Login from './pages/Login';
import Votepage from './pages/Votepage'
import AuthForm from './components/login';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>

        <Route path='/' element={<Register />} exact />
        <Route path='/login' element={<Login/>} />
        <Route path='/votepage' element={<Votepage />} />
        
        </Routes>
      </BrowserRouter>

    </>

  )
}

export default App