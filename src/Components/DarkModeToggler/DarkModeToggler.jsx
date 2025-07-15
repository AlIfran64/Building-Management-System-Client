import React from 'react';
import { CiDark, CiLight } from "react-icons/ci";
import { useDarkMode } from '../../Context/Theme/ThemeProvider';

const DarkModeToggler = () => {
  const { darkMode, setDarkMode } = useDarkMode();

  return (
    <div className="w-full">
      {/* Small screens: dropdown */}
      <div className="block lg:hidden">
        <select
          className="w-full p-2 rounded border border-gray-300 dark:border-white bg-white dark:bg-[#1e1e1f] text-[#404042] dark:text-white"
          value={darkMode ? "dark" : "light"}
          onChange={(e) => setDarkMode(e.target.value === "dark")}
        >
          <option value="light">Light Mode</option>
          <option value="dark">Dark Mode</option>
        </select>
      </div>

      {/* Large screens: icon toggle */}
      <div className="hidden lg:block">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="transition-all cursor-pointer text-[#404042] dark:text-white rounded-full px-2 py-2 bg-gray-100 dark:bg-white/10"
        >
          {darkMode ? <CiLight size={28} /> : <CiDark size={28} />}
        </button>
      </div>
    </div>
  );
};

export default DarkModeToggler;
