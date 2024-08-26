import React from 'react';
import Navbar from '../components/nav';
import Authcom from '../components/auth';
import Footer from '../components/footer';



const Auth = ({ email }) => {
  return (
    <>
       <Navbar  email={email} />
       <Authcom/>

    </>
  )
}

export default Auth;