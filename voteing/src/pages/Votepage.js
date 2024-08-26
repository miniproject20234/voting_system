import React from 'react';
import Navbar from '../components/nav';
import Vote from '../components/votepage';
import Footer from '../components/footer';



const Votepage = ({ email }) => {
  return (
    <>
       <Navbar  email={email} />
       <Vote/>

    </>
  )
}

export default Votepage;