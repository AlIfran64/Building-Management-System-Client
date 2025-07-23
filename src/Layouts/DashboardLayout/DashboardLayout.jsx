import React, { useState } from 'react';
import { Link, NavLink, Outlet } from 'react-router';
import {
  Menu,
  X,
  User,
  Megaphone,
  CreditCard,
  History,
  Shield,
  Users,
  MessageCircle,
  FileText,
  Gift
} from 'lucide-react';
import logo from '../../../src/assets/images/logo1.png';
import useUserRole from '../../Hooks/useUserRole';

const DashboardLayout = () => {
  const { role, roleLoading } = useUserRole();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <div className="min-h-screen flex bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white relative">

      {/* Sidebar for Large Screen */}
      <aside className="hidden lg:flex w-64 bg-[#1e1e1f] text-white flex-col p-5 fixed top-0 left-0 h-screen overflow-auto">
        <Link to="/" className="mb-10 flex items-center gap-2">
          <img src={logo} alt="logo" className="w-10" />
          <h1 className="text-2xl font-bold">
            <span className="text-white">Brick</span>
            <span className="text-[#F5951D]">Base</span>
          </h1>
        </Link>

        <ul className="flex flex-col gap-2">

          {/* for user and member */}
          {
            !roleLoading && role !== "admin" &&
            <>
              <li>
                <NavLink to="/dashboard/myProfile" className={({ isActive }) =>
                  `flex items-center gap-2 px-4 py-2 rounded transition duration-200 ${isActive ? 'bg-[#F5951D] text-white' : 'hover:bg-[#808185] text-white'
                  }`
                }>
                  <User size={18} /> My Profile
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/announcement" className={({ isActive }) =>
                  `flex items-center gap-2 px-4 py-2 rounded transition duration-200 ${isActive ? 'bg-[#F5951D] text-white' : 'hover:bg-[#808185] text-white'
                  }`
                }>
                  <Megaphone size={18} /> Announcement
                </NavLink>
              </li>
            </>
          }


          {/* for member */}

          {
            !roleLoading && role === "member" &&
            <>
              <li>
                <NavLink to="/dashboard/makePayment" className={({ isActive }) =>
                  `flex items-center gap-2 px-4 py-2 rounded transition duration-200 ${isActive ? 'bg-[#F5951D] text-white' : 'hover:bg-[#808185] text-white'
                  }`
                }>
                  <CreditCard size={18} /> Make Payment
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/paymentHistory" className={({ isActive }) =>
                  `flex items-center gap-2 px-4 py-2 rounded transition duration-200 ${isActive ? 'bg-[#F5951D] text-white' : 'hover:bg-[#808185] text-white'
                  }`
                }>
                  <History size={18} /> Payment History
                </NavLink>
              </li>
            </>
          }


          {/* for admin */}
          {!roleLoading && role === "admin" &&

            <>
              <li>
                <NavLink to="/dashboard/adminProfile" className={({ isActive }) =>
                  `flex items-center gap-2 px-4 py-2 rounded transition duration-200 ${isActive ? 'bg-[#F5951D] text-white' : 'hover:bg-[#808185] text-white'
                  }`
                }>
                  <Shield size={18} /> Admin Profile
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/manageMembers" className={({ isActive }) =>
                  `flex items-center gap-2 px-4 py-2 rounded transition duration-200 ${isActive ? 'bg-[#F5951D] text-white' : 'hover:bg-[#808185] text-white'
                  }`
                }>
                  <Users size={18} /> Manage Members
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/makeAnnouncement" className={({ isActive }) =>
                  `flex items-center gap-2 px-4 py-2 rounded transition duration-200 ${isActive ? 'bg-[#F5951D] text-white' : 'hover:bg-[#808185] text-white'
                  }`
                }>
                  <MessageCircle size={18} /> Make Announce
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/agreementRequests" className={({ isActive }) =>
                  `flex items-center gap-2 px-4 py-2 rounded transition duration-200 ${isActive ? 'bg-[#F5951D] text-white' : 'hover:bg-[#808185] text-white'
                  }`
                }>
                  <FileText size={18} /> Agreement Requests
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/manageCoupons" className={({ isActive }) =>
                  `flex items-center gap-2 px-4 py-2 rounded transition duration-200 ${isActive ? 'bg-[#F5951D] text-white' : 'hover:bg-[#808185] text-white'
                  }`
                }>
                  <Gift size={18} /> Manage Coupons
                </NavLink>
              </li>
            </>
          }
        </ul>
      </aside>

      {/* Drawer for Mobile */}
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

      {/* Mobile Drawer Menu */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-[#1e1e1f] text-white z-30 transform transition-transform duration-300 ${isDrawerOpen ? 'translate-x-0' : '-translate-x-full'
          } lg:hidden`}
      >
        <div className="p-5">
          <ul className="flex flex-col gap-4 mt-12">

            {/* for user and member */}
            <li>
              <NavLink to="/dashboard/myProfile" onClick={() => setIsDrawerOpen(false)} className={({ isActive }) =>
                `flex items-center gap-2 px-4 py-2 rounded transition duration-200 ${isActive ? 'bg-[#F5951D] text-white' : 'hover:bg-[#808185] text-white'
                }`
              }>
                <User size={18} /> My Profile
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/announcement" onClick={() => setIsDrawerOpen(false)} className={({ isActive }) =>
                `flex items-center gap-2 px-4 py-2 rounded transition duration-200 ${isActive ? 'bg-[#F5951D] text-white' : 'hover:bg-[#808185] text-white'
                }`
              }>
                <Megaphone size={18} /> Announcement
              </NavLink>
            </li>

            {/* for member */}

            {
              !roleLoading && role === "member" &&
              <>
                <li>
                  <NavLink to="/dashboard/makePayment" onClick={() => setIsDrawerOpen(false)} className={({ isActive }) =>
                    `flex items-center gap-2 px-4 py-2 rounded transition duration-200 ${isActive ? 'bg-[#F5951D] text-white' : 'hover:bg-[#808185] text-white'
                    }`
                  }>
                    <CreditCard size={18} /> Make Payment
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/paymentHistory" onClick={() => setIsDrawerOpen(false)} className={({ isActive }) =>
                    `flex items-center gap-2 px-4 py-2 rounded transition duration-200 ${isActive ? 'bg-[#F5951D] text-white' : 'hover:bg-[#808185] text-white'
                    }`
                  }>
                    <History size={18} /> Payment History
                  </NavLink>
                </li>
              </>
            }

            {/* for admin */}
            {
              !roleLoading && role === "admin" &&
              <>
                <li>
                  <NavLink to="/dashboard/adminProfile" onClick={() => setIsDrawerOpen(false)} className={({ isActive }) =>
                    `flex items-center gap-2 px-4 py-2 rounded transition duration-200 ${isActive ? 'bg-[#F5951D] text-white' : 'hover:bg-[#808185] text-white'
                    }`
                  }>
                    <Shield size={18} /> Admin Profile
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/manageMembers" onClick={() => setIsDrawerOpen(false)} className={({ isActive }) =>
                    `flex items-center gap-2 px-4 py-2 rounded transition duration-200 ${isActive ? 'bg-[#F5951D] text-white' : 'hover:bg-[#808185] text-white'
                    }`
                  }>
                    <Users size={18} /> Manage Members
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/makeAnnouncement" onClick={() => setIsDrawerOpen(false)} className={({ isActive }) =>
                    `flex items-center gap-2 px-4 py-2 rounded transition duration-200 ${isActive ? 'bg-[#F5951D] text-white' : 'hover:bg-[#808185] text-white'
                    }`
                  }>
                    <MessageCircle size={18} /> Make Announce
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/agreementRequests" onClick={() => setIsDrawerOpen(false)} className={({ isActive }) =>
                    `flex items-center gap-2 px-4 py-2 rounded transition duration-200 ${isActive ? 'bg-[#F5951D] text-white' : 'hover:bg-[#808185] text-white'
                    }`
                  }>
                    <FileText size={18} /> Agreement Requests
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/manageCoupons" onClick={() => setIsDrawerOpen(false)} className={({ isActive }) =>
                    `flex items-center gap-2 px-4 py-2 rounded transition duration-200 ${isActive ? 'bg-[#F5951D] text-white' : 'hover:bg-[#808185] text-white'
                    }`
                  }>
                    <Gift size={18} /> Manage Coupons
                  </NavLink>
                </li>
              </>
            }


          </ul>
        </div>
      </div>

      {/* Page Content */}
      <main className="flex-1 p-5 pt-20 lg:pt-5 bg-white dark:bg-[#121212] overflow-y-auto w-full lg:ml-64 h-screen">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
