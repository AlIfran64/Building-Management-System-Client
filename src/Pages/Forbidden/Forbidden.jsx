import React from 'react';
import error from '../../../src/assets/images/error.png';
import { Link } from 'react-router';

const Forbidden = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4 bg-white dark:bg-[#1e1e1f] text-[#404042] dark:text-white ">
      {/* Error Image */}
      <img
        src={error}
        alt="Error illustration"
        className="w-60 sm:w-72 md:w-80 lg:w-96 mb-6 dark:invert"
      />

      {/* Error Message */}
      <p className="text-center text-xl sm:text-2xl font-semibold mb-4">
        Ops! Forbidden Access
      </p>

      {/* Home Button */}
      <Link to="/">
        <button className="bg-[#404042] text-white px-6 py-2 rounded font-medium text-sm sm:text-base hover:bg-[#808185] dark:hover:bg-white dark:hover:text-[#1e1e1f] transition-all">
          Go back to Home
        </button>
      </Link>
    </div>
  );
};

export default Forbidden;