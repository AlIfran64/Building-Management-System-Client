import React from 'react';
import { Outlet } from 'react-router';
import slider1 from '../../../src/assets/images/slider1.webp';

const AuthLayout = () => {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row">

      {/* Left Side: Form Outlet */}
      <div className="w-full lg:w-1/2">
        <Outlet />
      </div>

      {/* Right Side: Image */}
      <div className="w-full lg:w-1/2 h-64 lg:h-auto">
        <img
          src={slider1}
          alt="Auth"
          className="w-full h-full object-cover"
        />
      </div>

    </div>
  );
};

export default AuthLayout;
