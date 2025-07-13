import React, { useState } from 'react';
import { Link, NavLink } from 'react-router';
import logo from "../../../../src/assets/images/logo1.jpg"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const links =
    <>
      <NavLink to='/' className={({ isActive }) =>
        isActive
          ? "text-[#F5951D] font-semibold"
          : "transition-all duration-300 hover:font-semibold hover:tracking-wide hover:scale-[1.01]"
      }>
        Home
      </NavLink>

      <NavLink to='/dashboard' className={({ isActive }) =>
        isActive
          ? "text-[#F5951D] font-semibold"
          : "transition-all duration-300 hover:font-semibold hover:tracking-wide hover:scale-[1.01]"
      }>
        Dashboard
      </NavLink>

      <NavLink to='/apartment' className={({ isActive }) =>
        isActive
          ? "text-[#F5951D] font-semibold"
          : "transition-all duration-300 hover:font-semibold hover:tracking-wide hover:scale-[1.01]"
      }>
        Apartment
      </NavLink>
    </>

  return (
    <nav className="bg-white shadow-sm w-full z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className='flex items-center gap-2'>
            <img src={logo} alt="logo" className="w-10" />
            <p className="text-2xl font-bold">
              <span className='text-[#404042]'>Brick</span>
              <span className='text-[#F5951D]'>Base</span>
            </p>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden lg:flex gap-6 items-center">
          {links}
        </div>

        {/* Auth Buttons */}
        <div className="hidden lg:flex items-center gap-3">
          <Link to="/login">
            <button className="border-2 border-[#404042] hover:border-[#F5951D] px-4 py-2 rounded text-[#404042] hover:text-[#F5951D] font-semibold transition-all cursor-pointer">Log In</button>
          </Link>
          <Link to="/register">
            <button className="bg-[#F5951D] text-white px-4 py-2 rounded border-2 border-[#F5951D] font-semibold hover:bg-[#404042] hover:border-[#404042] transition-all cursor-pointer">Register</button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none">
            <svg className="w-6 h-6 text-[#404042]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Nav Dropdown */}
      {isOpen && (
        <div className="lg:hidden px-4 pb-4 space-y-3">
          <div className="flex flex-col space-y-2">{links}</div>
          <div className="flex flex-col space-y-2">
            <Link to="/login">
              <button className="w-full border-2 border-[#404042] hover:border-[#F5951D] px-4 py-2 rounded text-[#404042] hover:text-[#F5951D] font-semibold transition-all">Log In</button>
            </Link>
            <Link to="/register">
              <button className="w-full bg-[#F5951D] text-white px-4 py-2 rounded border-2 border-[#F5951D] font-semibold hover:bg-[#404042] hover:border-[#404042] transition-all">Register</button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
