import React, { useState } from 'react';
import useAuth from '../../Hooks/useAuth';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../../src/Components/Loading/Loading';
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';


const MakePayment = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [userSelectedMonth, setUserSelectedMonth] = useState('');
  const navigate = useNavigate();



  // Fetch member's agreement info
  const { data: agreement = {}, isLoading } = useQuery({
    queryKey: ['member-agreement', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/agreements?email=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });


  if (isLoading) {
    return <Loading></Loading>;
  }

  if (!agreement) {
    return (
      <div className="text-center mt-10 text-red-500">
        No active agreement found for your account.
      </div>
    );
  }

  const handlePay = (id) => {

    if (!userSelectedMonth) {
      Swal.fire({
        title: 'Error!',
        text: 'Please select a month',
        icon: 'error',
        confirmButtonText: 'OK',
      });
      return;
    }
    navigate(`/dashboard/paymentProceed/${id}?month=${userSelectedMonth}`);


  }

  return (
    <div className='px-4 md:px-8 py-6 bg-white dark:bg-[#121212] min-h-screen text-gray-800 dark:text-gray-200'>
      <h2 className="text-3xl font-bold mb-2">
        Make Payment
      </h2>
      <p className='mb-6 text-gray-600 dark:text-white'>Ensure Security through payment process</p>
      <div className="max-w-5xl mx-auto p-6 bg-white dark:bg-[#1e1e1e] rounded shadow-xl">

        <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Email */}
          <div>
            <label className="text-sm font-medium text-gray-600 dark:text-gray-300">
              Member Email
            </label>
            <input
              type="email"
              value={agreement.email}
              readOnly
              className="w-full px-4 py-2 mt-1 text-gray-400 bg-gray-100 dark:bg-[#121212] rounded cursor-not-allowed border border-gray-300 dark:border-gray-600"
            />
          </div>

          {/* Floor */}
          <div>
            <label className="text-sm font-medium text-gray-600 dark:text-gray-300">
              Floor
            </label>
            <input
              type="text"
              value={agreement.floorNo || ''}
              readOnly
              className="w-full px-4 py-2 mt-1 text-gray-400 bg-gray-100 dark:bg-[#121212] rounded cursor-not-allowed border border-gray-300 dark:border-gray-600"
            />
          </div>

          {/* Block Name */}
          <div>
            <label className="text-sm font-medium text-gray-600 dark:text-gray-300">
              Block
            </label>
            <input
              type="text"
              value={agreement.blockName || ''}
              readOnly
              className="w-full px-4 py-2 mt-1 text-gray-400 bg-gray-100 dark:bg-[#121212] rounded cursor-not-allowed border border-gray-300 dark:border-gray-600"
            />
          </div>

          {/* Apartment No */}
          <div>
            <label className="text-sm font-medium text-gray-600 dark:text-gray-300">
              Apartment/Room No
            </label>
            <input
              type="text"
              value={agreement.apartmentNo || ''}
              readOnly
              className="w-full px-4 py-2 mt-1 text-gray-400 bg-gray-100 dark:bg-[#121212] rounded cursor-not-allowed border border-gray-300 dark:border-gray-600"
            />
          </div>

          {/* Rent */}
          <div>
            <label className="text-sm font-medium text-gray-600 dark:text-gray-300">
              Rent (BDT)
            </label>
            <input
              type="text"
              value={`৳ ${agreement.rent || 0}`}
              readOnly
              className="w-full px-4 py-2 mt-1 text-gray-400 bg-gray-100 dark:bg-[#121212] rounded cursor-not-allowed border border-gray-300 dark:border-gray-600"
            />
          </div>

          {/* Month */}
          <div>
            <label className="text-sm font-medium text-gray-600 dark:text-gray-300">
              Month
            </label>
            <select
              className="w-full px-4 py-2 mt-1 bg-white dark:bg-[#121212] text-black dark:text-gray-200 rounded border border-gray-300 dark:border-gray-600"
              value={userSelectedMonth}
              onChange={(e) => setUserSelectedMonth(e.target.value)}
            >
              <option value="">Select Month</option>
              {[
                'January',
                'February',
                'March',
                'April',
                'May',
                'June',
                'July',
                'August',
                'September',
                'October',
                'November',
                'December',
              ].map((month) => (
                <option key={month} value={month}>
                  {month}
                </option>
              ))}
            </select>
          </div>

          <div className="md:col-span-2 flex justify-end">
            <button
              onClick={() => handlePay(agreement._id)}
              type="button"
              className="px-6 py-2 mt-4 text-white bg-[#F5951D] hover:bg-[#f5941dc3] rounded transition-all duration-200 cursor-pointer"
            >
              Proceed to Pay
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MakePayment;
