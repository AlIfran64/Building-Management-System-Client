import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import redMarker from 'leaflet-color-markers/img/marker-icon-red.png';
import { FaMapMarkerAlt, FaHome, FaBuilding, FaStreetView } from 'react-icons/fa';
import { motion } from 'framer-motion';

// Red Icon for apartment location
const redIcon = new L.Icon({
  iconUrl: redMarker,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const ApartmentLocation = () => {
  const apartmentPosition = [23.8747, 90.3796]; // Uttara, Dhaka

  return (
    <section className="bg-[#f5f5f5] dark:bg-[#1e1e1f] py-20 px-5 md:px-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="space-y-5"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#404042] dark:text-white">
            Apartment Location
          </h2>
          <p className="text-base text-[#555] dark:text-gray-300">
            BrickBase Apartment is ideally located in Uttara, Dhaka. With top-tier road connectivity,
            nearby shops, schools, hospitals, and public transport hubs, it's the perfect urban escape
            with suburban peace.
          </p>

          <div className="flex items-center gap-3 text-[#404042] dark:text-white text-lg font-medium">
            <FaMapMarkerAlt className="text-[#F5951D]" />
            <span>Address: Sector 7, Uttara, Dhaka</span>
          </div>
          <div className="flex items-center gap-3 text-[#404042] dark:text-white text-lg font-medium">
            <FaBuilding className="text-[#F5951D]" />
            <span>Nearby: Uttara High School, Metro Rail Station</span>
          </div>
          <div className="flex items-center gap-3 text-[#404042] dark:text-white text-lg font-medium">
            <FaStreetView className="text-[#F5951D]" />
            <span>Public Transport: Bus, Uber, Metro Rail</span>
          </div>
        </motion.div>

        {/* Right Side Map */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="rounded overflow-hidden shadow ring-1 ring-black/10 dark:ring-white/10 h-[400px] w-full">
            <MapContainer
              center={apartmentPosition}
              zoom={13}
              scrollWheelZoom={false}
              className="h-full w-full z-10"
            >
              <TileLayer
                attribution='&copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={apartmentPosition} icon={redIcon}>
                <Popup>
                  <div className="flex flex-col gap-1 text-sm">
                    <div className="flex items-center gap-2">
                      <FaHome className="text-[#F5951D]" />
                      <strong>BrickBase Apartment</strong>
                    </div>
                    <div>Sector 7, Uttara, Dhaka</div>
                  </div>
                </Popup>
              </Marker>
            </MapContainer>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ApartmentLocation;
