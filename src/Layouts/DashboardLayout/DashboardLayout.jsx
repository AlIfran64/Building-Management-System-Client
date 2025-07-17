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

const DashboardLayout = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const navItems = [
    { to: "/dashboard/myProfile", label: "My Profile", Icon: User },
    { to: "/dashboard/announcement", label: "Announcement", Icon: Megaphone },
    { to: "/dashboard/makePayment", label: "Make Payment", Icon: CreditCard },
    { to: "/dashboard/paymentHistory", label: "Payment History", Icon: History },
    { to: "/dashboard/adminProfile", label: "Admin Profile", Icon: Shield },
    { to: "/dashboard/manageMembers", label: "Manage Members", Icon: Users },
    { to: "/dashboard/makeAnnouncement", label: "Make Announce", Icon: MessageCircle },
    { to: "/dashboard/agreementRequests", label: "Agreement Requests", Icon: FileText },
    { to: "/dashboard/manageCoupons", label: "Manage Coupons", Icon: Gift }
  ];

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
          {navItems.map(({ to, label, Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-2 px-4 py-2 rounded transition duration-200 ${isActive ? 'bg-[#F5951D] text-white' : 'hover:bg-[#808185] text-white'
                }`
              }
            >
              <Icon size={18} /> {label}
            </NavLink>
          ))}
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
            {navItems.map(({ to, label, Icon }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-4 py-2 rounded transition duration-200 ${isActive ? 'bg-[#F5951D] text-white' : 'hover:bg-[#808185] text-white'
                  }`
                }
                onClick={() => setIsDrawerOpen(false)}
              >
                <Icon size={18} /> {label}
              </NavLink>
            ))}
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
