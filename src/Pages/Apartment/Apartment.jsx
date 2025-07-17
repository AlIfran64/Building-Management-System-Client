import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxios from '../../Hooks/useAxios';
import useAuth from '../../Hooks/useAuth';
import Loading from '../../Components/Loading/Loading';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';
import { motion } from 'framer-motion';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const Apartment = () => {
  const axios = useAxios();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const [minRent, setMinRent] = useState('');
  const [maxRent, setMaxRent] = useState('');

  const { data, isLoading, error } = useQuery({
    queryKey: ['apartments'],
    queryFn: async () => {
      const res = await axios.get('/apartments');
      return res.data;
    },
  });

  const handleAgreement = async (apt) => {
    if (!user) return navigate('/login');

    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'You can only select ONE apartment. This cannot be undone!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#F5951D',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, confirm agreement!'
    });

    if (!result.isConfirmed) return;

    const agreementData = {
      userName: user.displayName,
      email: user.email,
      floorNo: apt.floorNo,
      blockName: apt.blockName,
      apartmentNo: apt.apartmentNo,
      rent: apt.rent,
      status: 'pending',
    };

    try {
      const res = await axiosSecure.post('/agreements', agreementData);
      if (res.data.insertedId) {
        Swal.fire({
          icon: 'success',
          title: 'Agreement submitted!',
          text: 'Your rental request is now pending.',
          confirmButtonColor: '#F5951D',
        });
      }
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: err?.response?.data?.message || 'Something went wrong!',
        confirmButtonColor: '#F5951D',
      });
    }
  };

  if (isLoading) return <Loading />;
  if (error) {
    Swal.fire({
      title: 'Error!',
      text: `${error}`,
      icon: 'error',
      confirmButtonColor: '#F5951D',
    });
    return null;
  }

  // 🔍 Filter apartments by rent range
  const filteredApartments = data?.filter((apt) => {
    const rent = apt.rent;
    const min = minRent === '' ? 0 : parseFloat(minRent);
    const max = maxRent === '' ? Infinity : parseFloat(maxRent);
    return rent >= min && rent <= max;
  }) || [];

  // 📄 Pagination logic
  const itemsPerPage = 6;
  const totalPages = Math.ceil(filteredApartments.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = filteredApartments.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="bg-white dark:bg-[#121212] min-h-screen pt-10 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-[#404042] dark:text-white">Apartments</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2 text-base max-w-2xl mx-auto">
            Explore available apartments. Click "Agreement" to start the rental process.
          </p>
        </div>

        {/* Search Rent Range */}
        <div className="flex flex-col sm:flex-row gap-4 mb-5 justify-end items-center">
          <p className='text-lg font-semibold'>Search Apartments By:</p>
          <input
            type="number"
            placeholder="Min Rent"
            value={minRent}
            onChange={(e) => setMinRent(e.target.value)}
            className="px-4 py-2 border rounded-md w-full sm:w-40 text-[#404042] dark:text-white"
          />
          <input
            type="number"
            placeholder="Max Rent"
            value={maxRent}
            onChange={(e) => setMaxRent(e.target.value)}
            className="px-4 py-2 border rounded-md w-full sm:w-40 text-[#404042] dark:text-white"
          />
        </div>

        {/* Apartments Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentData.map((apt, index) => (
            <motion.div
              key={apt._id || index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white dark:bg-[#1f1f23] rounded overflow-hidden shadow-md hover:shadow-xl transition duration-300 flex flex-col"
            >
              <img
                src={apt.image}
                alt={apt.apartmentNo}
                className="w-full h-56 object-cover"
              />

              <div className="p-4 flex flex-col flex-grow">
                <h2 className="text-2xl font-bold mb-1">{apt.apartmentNo}</h2>
                <p className="text-gray-500 dark:text-gray-400 text-sm mb-2">Apartment No</p>
                <ul className="text-sm text-gray-700 dark:text-gray-300 mb-4 space-y-1">
                  <li><strong>Floor No:</strong> {apt.floorNo}</li>
                  <li><strong>Block Name:</strong> {apt.blockName}</li>
                  <li>
                    <strong>Rent:</strong>{' '}
                    <span className="text-xl font-semibold text-[#404042] dark:text-white">
                      ${apt.rent} /month
                    </span>
                  </li>
                </ul>

                <button
                  onClick={() => handleAgreement(apt)}
                  className="mt-auto w-full bg-[#F5951D] hover:bg-[#d67e0e] text-white font-semibold py-2 rounded transition"
                >
                  Agreement
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="mt-12 flex justify-center gap-2 flex-wrap">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-4 py-2 rounded border ${currentPage === i + 1
                ? 'bg-[#404042] text-white'
                : 'bg-white dark:bg-[#1f1f23] text-[#404042] dark:text-white border-gray-400'
                } hover:bg-[#c5c5c6] hover:text-black transition`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Apartment;
