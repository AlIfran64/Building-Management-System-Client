import React from 'react';
import { motion } from 'framer-motion';
import {
  FaWifi,
  FaBuilding,
  FaCogs,
  FaUsers,
  FaShieldAlt,
  FaMobileAlt,
  FaRegChartBar,
} from 'react-icons/fa';

const features = [
  {
    icon: <FaWifi size={28} />,
    title: 'Smart Connectivity',
    description:
      'Every unit is equipped with high-speed internet, digital locks, and IoT infrastructure to support a seamless smart-living experience.',
  },
  {
    icon: <FaBuilding size={28} />,
    title: 'Sustainable Design',
    description:
      'Eco-friendly construction with solar panels, rainwater harvesting, and intelligent energy management for reduced carbon footprint.',
  },
  {
    icon: <FaCogs size={28} />,
    title: 'Centralized Control',
    description:
      'Manage apartment utilities, billing, visitor logs, maintenance, and emergencies — all from a centralized digital dashboard.',
  },
  {
    icon: <FaUsers size={28} />,
    title: 'Community Driven',
    description:
      'Built to foster a connected lifestyle, BrickBase includes lounges, noticeboards, and in-app community features for residents.',
  },
  {
    icon: <FaShieldAlt size={28} />,
    title: 'Top-notch Security',
    description:
      'Integrated 24/7 surveillance, biometric access, and visitor verification system ensure full building safety.',
  },
  {
    icon: <FaRegChartBar size={28} />,
    title: 'Real-time Insights',
    description:
      'Gain full visibility into energy usage, security logs, and resident activity through advanced analytics — anytime, anywhere.',
  }

];

const AboutTheBuilding = () => {
  return (
    <section className="bg-white dark:bg-[#121212] py-20 px-5 sm:px-10 md:px-16 lg:px-24">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#404042] dark:text-white">
            About the <span className="text-[#F5951D]">Building</span>
          </h2>
          <p className="mt-4 max-w-3xl mx-auto text-base sm:text-lg text-[#606060] dark:text-gray-300">
            Designed for a modern lifestyle — combining security, sustainability, and comfort. BrickBase is not just a building; it's an ecosystem.
          </p>
        </motion.div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-[#1e1e1f] border border-gray-200 dark:border-white/10 rounded-xl shadow-sm p-6 hover:shadow-lg transition-all duration-300"
            >
              <div className="text-[#F5951D] mb-4 flex justify-center">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold text-[#404042] dark:text-white mb-2 text-center">
                {feature.title}
              </h3>
              <p className="text-sm text-[#606060] dark:text-gray-300 leading-relaxed text-center">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default AboutTheBuilding;
