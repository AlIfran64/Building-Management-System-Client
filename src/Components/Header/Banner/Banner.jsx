import React from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Link } from 'react-router';
import slider1 from '../../../../src/assets/images/slider1.webp';
import slider2 from '../../../../src/assets/images/slider2.webp';
import slider3 from '../../../../src/assets/images/slider3.webp';


// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import './styles.css';

// import required modules
import { Pagination, Autoplay } from 'swiper/modules';

const Banner = () => {
  return (
    <Swiper
      pagination={{ dynamicBullets: true }}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      modules={[Pagination, Autoplay]}
      className="mySwiper w-full h-[280px] lg:h-[600px]"
    >

      {/* Slider-1 */}
      <SwiperSlide>
        <div className="relative w-full h-full">
          <img
            src={slider1}
            alt="slider-1 image"
            className="w-full h-full object-cover"
          />

          {/* Left-to-right black gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent flex flex-col justify-center items-start text-white px-4 sm:px-8 md:px-12 lg:px-20">
            <h2 className="text-base sm:text-xl md:text-2xl lg:text-5xl font-bold mb-2 md:mb-4 text-start">
              Smart Living Starts with BrickBase
            </h2>
            <p className="mb-2 md:mb-10 text-xs sm:text-sm lg:text-lg text-start text-white/90">
              Experience seamless apartment living with our secure, efficient, and <br /> intuitive management system — all in one place.
            </p>

            <Link to={'/availableFoods'}>
              <button className="bg-[#F5951D] text-white font-medium rounded hover:bg-[#404042]  px-4 py-2 sm:px-6 sm:py-3 text-xs sm:text-sm lg:text-lg">
                Explore Apartments
              </button>
            </Link>
          </div>
        </div>
      </SwiperSlide>

      {/* Slider-2 */}
      <SwiperSlide>
        <div className="relative w-full h-full">
          <img
            src={slider2}
            alt="slider-2 image"
            className="w-full h-full object-cover"
          />

          {/* Left-to-right black gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent flex flex-col justify-center items-start text-white px-4 sm:px-8 md:px-12 lg:px-20">
            <h2 className="text-base sm:text-xl md:text-2xl lg:text-5xl font-bold mb-2 md:mb-4 text-start">
              Manage Everything from Dashboard
            </h2>
            <p className="mb-2 md:mb-10 text-xs sm:text-sm lg:text-lg text-start text-white/90">
              From tenant requests to maintenance scheduling — control every <br /> building task with ease, from anywhere.
            </p>
            <Link to={'/addFood'}>
              <button className="bg-[#F5951D] text-white font-medium rounded hover:bg-[#404042] px-4 py-2 sm:px-6 sm:py-3 text-xs sm:text-sm lg:text-lg">
                Go to Dashboard
              </button>
            </Link>
          </div>
        </div>
      </SwiperSlide>

      {/* Slider-3 */}
      <SwiperSlide>
        <div className="relative w-full h-full">
          <img
            src={slider3}
            alt="slider-3 image"
            className="w-full h-full object-cover"
          />

          {/* Left-to-right black gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent flex flex-col justify-center items-start text-white px-4 sm:px-8 md:px-12 lg:px-20">
            <h2 className="text-base sm:text-xl md:text-2xl lg:text-5xl font-bold mb-2 md:mb-4 text-start">
              Connect. Communicate. Live Better.
            </h2>
            <p className="mb-2 md:mb-10 text-xs sm:text-sm lg:text-lg text-start text-white/90">
              Stay informed, pay rent, submit issues — your residents have <br /> everything they need, right in their pocket.
            </p>

            <Link to={'/myFoodRequest'}>
              <button className="bg-[#F5951D] text-white font-medium rounded hover:bg-[#404042] px-4 py-2 sm:px-6 sm:py-3 text-xs sm:text-sm lg:text-lg">
                Let's Connect
              </button>
            </Link>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  );
};

export default Banner;