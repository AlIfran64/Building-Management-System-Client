import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../../Components/Header/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';

const MainLayout = () => {
  return (
    <div>
      <Navbar></Navbar>

      <div className='min-h-screen mt-16'>
        <Outlet></Outlet>
      </div>

      <Footer></Footer>
    </div>
  );
};

export default MainLayout;