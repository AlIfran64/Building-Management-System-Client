import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { FaTags } from 'react-icons/fa';
import useAxios from '../../Hooks/useAxios';
import Loading from '../Loading/Loading';

const Coupons = () => {
  const axios = useAxios();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const { data: coupons = [], isLoading, isError } = useQuery({
    queryKey: ['coupons'],
    queryFn: async () => {
      const res = await axios.get('/coupons');
      return res.data;
    },
  });

  if (isLoading) return <Loading />;
  if (isError) return <p className="text-center text-red-500 py-10">Failed to load coupons</p>;

  // Navigation handlers
  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  const handleNext = () => {
    if (currentIndex < coupons.length - 1) setCurrentIndex(currentIndex + 1);
  };

  const handlePaginationClick = (index) => {
    setCurrentIndex(index);
  };

  // Get visible coupons logic
  const visibleCoupons = (() => {
    if (isMobile) return [coupons[currentIndex]];

    const total = coupons.length;

    // We want to show 3 coupons on desktop, with current coupon centered if possible
    let start = currentIndex - 1;
    let end = currentIndex + 2;

    // If start < 0, shift right
    if (start < 0) {
      start = 0;
      end = Math.min(3, total);
    }

    // If end > total, shift left
    if (end > total) {
      end = total;
      start = Math.max(0, end - 3);
    }

    return coupons.slice(start, end);
  })();

  // Calculate which visible coupon index is the current active one
  // On mobile, always 0; on desktop, current coupon is at index 1 normally, else adjust at edges
  let activeVisibleIndex = 0;
  if (!isMobile) {
    // Default active is 1 (middle)
    activeVisibleIndex = 1;

    // If at start edge (currentIndex 0), active is at 0
    if (currentIndex === 0) activeVisibleIndex = 0;

    // If at end edge (currentIndex last), active is last index in visibleCoupons (usually 2 or less)
    if (currentIndex === coupons.length - 1) activeVisibleIndex = visibleCoupons.length - 1;
  }

  return (
    <div className="max-w-7xl mx-auto py-20 px-4">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mt-2">Save with <span className='text-[#F5951D]'>Coupons</span></h1>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mt-4">
          Unlock special discounts with our latest coupon deals—designed to help you save more on every purchase.
        </p>
      </div>

      {/* Coupon Cards */}
      <div className="flex flex-wrap justify-center lg:justify-between gap-6 transition-all duration-500">
        {visibleCoupons.map((coupon, index) => {
          const isCenter = index === activeVisibleIndex;

          return (
            <div
              key={coupon._id}
              className={`flex-1 max-w-sm w-full p-6 rounded shadow-lg transition-all duration-300 ${isCenter
                ? 'border-2 border-[#F5951D] scale-105 z-10 bg-white dark:bg-zinc-800'
                : 'opacity-60 bg-white dark:bg-zinc-800'
                }`}
            >
              <div className="flex items-center gap-2 mb-3 text-[#F5951D]">
                <FaTags size={20} />
                <span className="text-lg font-semibold text-gray-800 dark:text-white">Special Offer</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{coupon.description}</p>

              <div className="text-md font-medium text-gray-900 dark:text-white mb-2">
                <strong>Code:</strong> {coupon.code}
              </div>

              <span className="inline-block px-6 py-2 text-sm font-semibold bg-[#F5951D] text-white rounded">
                {coupon.discount}% OFF
              </span>
            </div>
          );
        })}
      </div>

      {/* Navigation */}
      <div className="flex justify-center items-center gap-4 mt-10">
        {/* Left Arrow */}
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className={`w-10 h-10 flex items-center justify-center rounded-full border transition-colors duration-300 ${currentIndex === 0 ? 'opacity-40 cursor-not-allowed' : 'hover:bg-[#F5951D] hover:text-white'
            } text-[#03373D] dark:text-white border-[#F5951D] bg-white dark:bg-zinc-800`}
        >
          <ChevronLeft size={20} />
        </button>

        {/* Dots */}
        <div className="flex items-center gap-3">
          {coupons.map((_, index) => (
            <button
              key={index}
              onClick={() => handlePaginationClick(index)}
              className={`w-3 h-3 rounded-full transition-all ${index === currentIndex ? 'bg-[#404042]' : 'bg-gray-300 hover:bg-gray-400'
                }`}
            ></button>
          ))}
        </div>

        {/* Right Arrow */}
        <button
          onClick={handleNext}
          disabled={currentIndex === coupons.length - 1}
          className={`w-10 h-10 flex items-center justify-center rounded-full border transition-colors duration-300 ${currentIndex === coupons.length - 1
            ? 'opacity-40 cursor-not-allowed'
            : 'hover:bg-[#F5951D] hover:text-white'
            } text-[#03373D] dark:text-white border-[#F5951D] bg-white dark:bg-zinc-800`}
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default Coupons;
