import React from 'react';
import Navbar from '../components/navbar';
import NotFound from '../components/Notfound';
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