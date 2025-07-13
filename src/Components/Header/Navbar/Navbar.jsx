import React, { useState } from 'react';
import { Link, NavLink } from 'react-router';
import logo from "../../../../src/assets/images/logo1.png";
import DarkModeToggler from '../../DarkModeToggler/DarkModeToggler';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinkClass = ({ isActive }) =>
    isActive
      ? "text-[#F5951D] font-semibold"
      : "transition-all duration-300 hover:font-semibold hover:tracking-wide hover:scale-[1.01] text-[#404042] dark:text-white";

  const links = (
    <>
      <NavLink to="/" className={navLinkClass}>Home</NavLink>
      <NavLink to="/dashboard" className={navLinkClass}>Dashboard</NavLink>
      <NavLink to="/apartment" className={navLinkClass}>Apartment</NavLink>
    </>
  );

  return (
    <nav className="bg-white dark:bg-[#1e1e1f] shadow-sm w-full fixed top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="flex items-center gap-2 cursor-pointer">
            <img src={logo} alt="logo" className="w-10" />
            <p className="text-2xl font-bold">
              <span className="text-[#404042] dark:text-white">Brick</span>
              <span className="text-[#F5951D]">Base</span>
            </p>
          </div>
        </Link>



        {/* Auth Buttons & Theme Toggle */}
        <div className="hidden lg:flex items-center gap-3 whitespace-nowrap">
          {/* Desktop Nav Links */}
          <div className="hidden lg:flex gap-6 items-center">
            {links}
          </div>
          <DarkModeToggler />
          <Link to="/login">
            <button className="cursor-pointer border-2 border-[#404042] dark:border-white hover:border-[#F5951D] px-4 py-2 rounded text-[#404042] dark:text-white hover:text-[#F5951D] font-semibold transition-all">
              Log In
            </button>
          </Link>
          <Link to="/register">
            <button className="cursor-pointer bg-[#F5951D] text-white px-4 py-2 rounded border-2 border-[#F5951D] font-semibold hover:bg-[#404042] hover:border-[#404042] dark:hover:bg-white dark:hover:text-[#1e1e1f] transition-all">
              Register
            </button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none">
            <svg className="w-6 h-6 text-[#404042] dark:text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Nav Drawer */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/40 dark:bg-black/60">
          {/* Drawer panel */}
          <div className="fixed top-0 right-0 h-full w-64 bg-white dark:bg-[#1e1e1f] shadow-lg p-6 space-y-5 transition-transform duration-300">
            {/* Close button */}
            <div className="flex justify-end">
              <button onClick={() => setIsOpen(false)} className="text-2xl text-[#404042] dark:text-white">&times;</button>
            </div>

            {/* Links */}
            <div className="flex flex-col space-y-3 text-[#404042] dark:text-white">
              {links}
            </div>

            {/* Theme toggler */}
            <DarkModeToggler />

            {/* Auth Buttons */}
            <div className="flex flex-col space-y-2">
              <Link to="/login" onClick={() => setIsOpen(false)}>
                <button className="w-full cursor-pointer border-2 border-[#404042] dark:border-white hover:border-[#F5951D] px-4 py-2 rounded text-[#404042] dark:text-white hover:text-[#F5951D] font-semibold transition-all">
                  Log In
                </button>
              </Link>
              <Link to="/register" onClick={() => setIsOpen(false)}>
                <button className="w-full cursor-pointer bg-[#F5951D] text-white px-4 py-2 rounded border-2 border-[#F5951D] font-semibold hover:bg-[#404042] hover:border-[#404042] dark:hover:bg-white dark:hover:text-[#1e1e1f] transition-all">
                  Register
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}

    </nav>
  );
};

export default Navbar;
