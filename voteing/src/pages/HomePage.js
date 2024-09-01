import React from 'react'
import Navbar from '../components/navbar';
import Home from '../components/homePage';
import Footer from '../components/footer';

const HomePage = ({email}) => {
  return (
    <div>  <Navbar  email={email} />
    <Home/>
    <Footer/></div>
  )
}

export default HomePage