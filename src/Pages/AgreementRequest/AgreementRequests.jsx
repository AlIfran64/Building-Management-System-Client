import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const AgreementRequests = () => {
  const axiosSecure = useAxiosSecure();

  // Fetch only agreements with status 'pending'
  const { data: requests = [], isLoading, error } = useQuery({
    queryKey: ['agreementRequests'],
    queryFn: async () => {
      const res = await axiosSecure.get('/agreements');
      // Filter on client side to only show 'pending' status (if API can't filter)
      return res.data.filter((req) => req.status === 'pending');
    },
  });

  return (
    <div className="px-4 md:px-8 py-6 bg-white dark:bg-[#121212] min-h-screen text-gray-800 dark:text-gray-200">
      <h1 className="text-3xl font-bold mb-2">Agreement Requests</h1>
      <p className="mb-6 text-gray-600 dark:text-white">
        Track and process apartment rental applications efficiently.
      </p>

      {isLoading && <p>Loading requests...</p>}
      {error && <p className="text-red-600">Failed to load data: {error.message}</p>}

      {!isLoading && requests.length === 0 && (
        <p className="text-gray-500 dark:text-gray-400">No pending agreement requests.</p>
      )}

      <div className="space-y-4">
        {requests.map((req) => (
          <div
            key={req._id}
            className="p-4 border border-gray-300 dark:border-gray-700 rounded shadow-sm bg-gray-50 dark:bg-[#1f1f23]"
          >
            <p><strong>User Name:</strong> {req.userName}</p>
            <p><strong>Email:</strong> {req.email}</p>
            <p><strong>Floor No:</strong> {req.floorNo}</p>
            <p><strong>Block Name:</strong> {req.blockName}</p>
            <p><strong>Room No:</strong> {req.apartmentNo}</p>
            <p><strong>Rent:</strong> {req.rent} TK</p>
            <p><strong>Request Date:</strong> {new Date(req.requestDate).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AgreementRequests;
