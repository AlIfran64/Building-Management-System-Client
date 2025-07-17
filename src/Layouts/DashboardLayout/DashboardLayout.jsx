import React from 'react';
import { Link, NavLink, Outlet } from 'react-router';
import logo from '../../../src/assets/images/logo1.png';

const DashboardLayout = () => {
  return (
    <div className="min-h-screen flex bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-[#404042] text-white flex flex-col p-5 min-h-screen">
        {/* Logo */}
        <Link to="/" className="mb-10 flex items-center gap-2">
          <img src={logo} alt="logo" className="w-10" />
          <h1 className="text-2xl font-bold">
            <span className="text-white">Brick</span>
            <span className="text-[#F5951D]">Base</span>
          </h1>
        </Link>

        {/* Navigation Links */}
        <nav className="flex flex-col gap-2">
          <NavLink
            to="/dashboard/myProfile"
            className={({ isActive }) =>
              `px-4 py-2 rounded transition duration-200 ${isActive
                ? 'bg-[#F5951D] text-white'
                : 'hover:bg-[#F5951D]/60 text-white'
              }`
            }
          >
            My Profile
          </NavLink>

          <NavLink
            to="/dashboard/announcement"
            className={({ isActive }) =>
              `px-4 py-2 rounded-md transition duration-200 ${isActive
                ? 'bg-[#F5951D] text-white'
                : 'hover:bg-[#F5951D]/60 text-white'
              }`
            }
          >
            Announcement
          </NavLink>
        </nav>
      </aside>

      {/* Outlet Section */}
      <main className="flex-1 p-5 bg-white dark:bg-gray-800 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
