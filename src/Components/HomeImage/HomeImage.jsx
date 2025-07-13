import React from 'react';
import home from '../../../src/assets/images/homeImage.webp';
import { motion } from 'framer-motion';
import { FaHome } from 'react-icons/fa';
import { Link } from 'react-router';

const HomeImage = () => {
  return (
    <div className="relative w-full">
      {/* Background Image */}
      <img
        src={home}
        alt="Elegant apartment"
        className="w-full h-[300px] sm:h-[400px] object-cover transition duration-500 ease-in-out dark:brightness-[0.8]"
      />
    </div>
  );
};

export default HomeImage;
