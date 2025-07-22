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
    <section className="bg-black/85 py-20 px-5 md:px-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="space-y-5"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Apartment <span className='text-[#F5951D]'>Location</span>
          </h2>
          <p className="text-base text-gray-300">
            BrickBase Apartment is ideally located in Uttara, Dhaka. With nearby shops, top-tier road connectivity, schools, hospitals, and public transport hubs, it's the perfect urban escape with suburban peace.
          </p>

          <div className="flex items-center gap-3 text-white text-lg font-medium">
            <FaMapMarkerAlt size={20} className="text-[#F5951D]" />
            <span>Sector: 7, Uttara, Dhaka</span>
          </div>

        </motion.div>

        {/* Right Side Map */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="rounded overflow-hidden ring-1 ring-black/10 dark:ring-white/10 h-[400px] w-full border border-white/20 shadow-2xl p-3">
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
                    <div>
                      <FaHome className="text-[#F5951D] mb-1" />
                      <strong>BrickBase Apartment</strong>
                    </div>
                    <div> Sector 7, Uttara, Dhaka</div>
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
