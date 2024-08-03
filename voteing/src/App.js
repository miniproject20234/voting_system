
import React from 'react';
<<<<<<< HEAD
import { BrowserRouter, Routes, Route } from 'react-router-dom';
=======
import {BrowserRouter,Routes,Route}from 'react-router-dom';

import './css/App.css';
>>>>>>> 41dd30a864337ae935073770ff15ee2e9ff6170e
import './css/index.css';

import Register from './pages/Register';
import Login from './pages/Login';
import Votepage from './pages/Votepage'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>

<<<<<<< HEAD
        <Route path='/' element={<Register />} exact />
        <Route path='/login' element={<Login />} />
        <Route path='/votepage' element={<Votepage />} />


         
        </Routes>
      </BrowserRouter>
=======
      <Route path='/' element={<Register/>} exact/>
>>>>>>> 41dd30a864337ae935073770ff15ee2e9ff6170e

    </>

  )
}

export default App