import React from 'react';
import { Link } from 'react-router';
import { FaFacebookF, FaTwitter, FaLinkedinIn } from 'react-icons/fa';
import logo from "../../../src/assets/images/logo1.png";

const Footer = () => {
  return (
    <footer className="bg-[#1e1e1f] text-white py-10 px-10 mt-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 md:place-items-center">
        {/* Company Info */}
        <div>
          <div className='flex items-center gap-2 mb-3'>
            <div>
              <img className='w-10' src={logo} alt="logo" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">
                <span className="text-white">Brick</span>
                <span className="text-[#F5951D]">Base</span>
              </h2>
            </div>
          </div>
          <p className="text-sm leading-relaxed">
            Smart & secure building management made effortless. Manage apartments, residents, and services — all in one platform.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} to="/" className="hover:text-[#F5951D] transition-all">Home</Link></li>

            <li><Link onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} to="/dashboard" className="hover:text-[#F5951D] transition-all">Dashboard</Link></li>

            <li><Link onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} to="/apartment" className="hover:text-[#F5951D] transition-all">Apartment</Link></li>

            <li><Link onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} to="/login" className="hover:text-[#F5951D] transition-all">Log In</Link></li>

            <li><Link onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} to="/register" className="hover:text-[#F5951D] transition-all">Register</Link></li>
          </ul>
        </div>

        {/* Social & Contact */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
          <div className="flex gap-4 text-xl">
            <a href="#" className="hover:text-[#F5951D]" aria-label="Facebook"><FaFacebookF /></a>
            <a href="#" className="hover:text-[#F5951D]" aria-label="Twitter"><FaTwitter /></a>
            <a href="#" className="hover:text-[#F5951D]" aria-label="LinkedIn"><FaLinkedinIn /></a>
          </div>
          <p className="text-sm mt-4">Email: support@brickbase.com</p>
          <p className="text-sm">Phone: +880-1234-567890</p>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="text-center text-sm mt-10 border-t pt-4 border-white/20">
        &copy;{new Date().getFullYear()} BrickBase. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
