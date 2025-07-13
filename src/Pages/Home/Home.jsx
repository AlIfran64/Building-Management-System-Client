import React from 'react';
import Banner from '../../Components/Header/Banner/Banner';
import AboutTheBuilding from '../../Components/AboutTheBuilding/AboutTheBuilding';
import HomeImage from '../../Components/HomeImage/HomeImage';
import Coupons from '../../Components/Coupons/Coupons';
import ApartmentLocation from '../../Components/ApartmentLocation/ApartmentLocation';

const Home = () => {
  return (
    <div>
      <Banner></Banner>

      <AboutTheBuilding></AboutTheBuilding>

      <HomeImage></HomeImage>

      <Coupons></Coupons>

      <ApartmentLocation></ApartmentLocation>
    </div>
  );
};

export default Home;