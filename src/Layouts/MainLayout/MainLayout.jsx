import React, { useEffect } from 'react';
import { Outlet } from 'react-router';
import Navbar from '../../Components/Header/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';
import AOS from 'aos';
import 'aos/dist/aos.css';


const MainLayout = () => {
  useEffect(() => {
    AOS.init({ duration: 800, once: true }); // optional settings
  }, []);

  return (
    <div>
      <Navbar></Navbar>

      <div className='min-h-screen pt-14 lg:pt-16 bg-white dark:bg-[#121212]'>
        <Outlet></Outlet>
      </div>

      <Footer></Footer>
    </div>
  );
};

export default MainLayout;