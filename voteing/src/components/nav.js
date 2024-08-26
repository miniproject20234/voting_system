// src/SomeComponent.js
import React  from 'react';
import Nav from './toolsforcom/navUtils'; // Adjust the path if needed

const Navvbars = ({ email }) => {
  

  return (
    <>
       
       <div className=''>
       <Nav email={email} />
      </div>  
      
    </>
  );
};

export default Navvbars;
