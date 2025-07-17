import React, { useState } from 'react';
import { Link, NavLink, Outlet } from 'react-router';
import { Menu, X, User, Megaphone } from 'lucide-react';
import logo from '../../../src/assets/images/logo1.png';

const DashboardLayout = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <div className="min-h-screen flex bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white relative">
      {/* Sidebar - Large Screen */}
      <aside className="hidden lg:flex w-64 bg-[#1e1e1f] text-white flex-col p-5 min-h-screen">
        <Link to="/" className="mb-10 flex items-center gap-2">
          <img src={logo} alt="logo" className="w-10" />
          <h1 className="text-2xl font-bold">
            <span className="text-white">Brick</span>
            <span className="text-[#F5951D]">Base</span>
          </h1>
        </Link>

        <nav className="flex flex-col gap-2">
          <NavLink
            to="/dashboard/myProfile"
            className={({ isActive }) =>
              `flex items-center gap-2 px-4 py-2 rounded transition duration-200 ${isActive
                ? 'bg-[#F5951D] text-white'
                : 'hover:bg-[#808185] text-white'
              }`
            }
          >
            <User size={18} /> My Profile
          </NavLink>
          <NavLink
            to="/dashboard/announcement"
            className={({ isActive }) =>
              `flex items-center gap-2 px-4 py-2 rounded transition duration-200 ${isActive
                ? 'bg-[#F5951D] text-white'
                : 'hover:bg-[#808185] text-white'
              }`
            }
          >
            <Megaphone size={18} /> Announcement
          </NavLink>
        </nav>
      </aside>

      {/* Drawer - Small Screen */}
      <div className="lg:hidden fixed top-0 left-0 w-full bg-[#1e1e1f] flex items-center justify-between px-5 py-4 z-40">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="logo" className="w-8" />
          <h1 className="text-xl font-bold text-white">
            Brick<span className="text-[#F5951D]">Base</span>
          </h1>
        </Link>
        <button onClick={toggleDrawer} className="text-white">
          {isDrawerOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-[#1e1e1f] text-white z-30 transform transition-transform duration-300 ${isDrawerOpen ? 'translate-x-0' : '-translate-x-full'
          } lg:hidden`}
      >
        <div className="p-5">
          <nav className="flex flex-col gap-4 mt-12">
            <NavLink
              to="/dashboard/myProfile"
              className={({ isActive }) =>
                `flex items-center gap-2 px-4 py-2 rounded transition duration-200 ${isActive
                  ? 'bg-[#F5951D] text-white'
                  : 'hover:bg-[#808185] text-white'
                }`
              }
              onClick={() => setIsDrawerOpen(false)}
            >
              <User size={18} /> My Profile
            </NavLink>
            <NavLink
              to="/dashboard/announcement"
              className={({ isActive }) =>
                `flex items-center gap-2 px-4 py-2 rounded transition duration-200 ${isActive
                  ? 'bg-[#F5951D] text-white'
                  : 'hover:bg-[#808185] text-white'
                }`
              }
              onClick={() => setIsDrawerOpen(false)}
            >
              <Megaphone size={18} /> Announcement
            </NavLink>
          </nav>
        </div>
      </div>

      {/* Main Outlet */}
      <main className="flex-1 p-5 pt-20 lg:pt-5 bg-white dark:bg-[#121212] overflow-y-auto w-full">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
