import React from 'react';
import Navbar from '../components/navbar';
import Vote from '../components/votepage';
import Footer from '../components/footer';



const Votepage = ({ email }) => {
  return (
    <>
       <Navbar  email={email} />
       <Vote/>
       <Footer/>

    </>
  )
}

export default Votepage;