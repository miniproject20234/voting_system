import React from 'react';
import Navbar from '../components/navbar';
import NotFound from '../components/protectedroutes/Notfound';
import Footer from '../components/footer';



const Notfound = () => {
  return (
    <>
       <Navbar/>
       <NotFound/>
       <Footer/>

    </>
  )
}

export default Notfound;