import React from 'react';
import { Outlet } from 'react-router';
import slider1 from '../../../src/assets/images/slider1.webp';

const AuthLayout = () => {
  return (
    <div className='min-h-screen flex items-stretch'>
      <div className='w-1/2'>
        <Outlet></Outlet>
      </div>
      <div className='w-1/2'>
        <img className='object-cover w-full h-full' src={slider1} alt="image" />
      </div>
    </div>
  );
};

export default AuthLayout;