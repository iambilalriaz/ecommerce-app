import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <div className='w-full min-h-[.75rem] bg-black p-4 sticky top-0 z-20 flex justify-between items-center cursor-pointer'>
      <img
        src={require('../../assets/daraz_logo.png')}
        alt='logo'
        width={80}
        className='ml-4'
        onClick={() => navigate('/')}
      />
      <div
        className='text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center cursor-pointer'
        onClick={() => navigate('/products/add')}
      >
        Add Product
      </div>
    </div>
  );
};

export default Navbar;
