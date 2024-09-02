import React from 'react';
import Navbar from '../components/navbar';
import NotFound from './NotFound';
import Footer from '../components/footer';



const Notfound = ({ email }) => {
  return (
    <>
       <Navbar  email={email} />
       <NotFound/>
       <Footer/>

    </>
  )
}

export default Notfound;