import React from 'react';
import NotFound_img from "../assets/notFound.png";
import { useNavigate } from 'react-router-dom';

const Notfund = () => {
  const navigate = useNavigate();

  const Home = () => {
    navigate('/');
  };
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-center">
        <img onClick={Home} className="mx-auto -mt-7" src={NotFound_img} alt="not found" />
        <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Back to Home
        </button>
      </div>
    </div>
  );
}

export default Notfund;
