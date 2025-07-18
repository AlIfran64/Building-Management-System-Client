import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import Loading from '../../Components/Loading/Loading'
import Swal from 'sweetalert2';

const AgreementRequests = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // Fetch agreement requests
  const { data: requests = [], isLoading, error } = useQuery({
    queryKey: ['agreementRequests'],
    queryFn: async () => {
      const res = await axiosSecure.get('/agreements');
      return res.data.filter((req) => req.status === 'pending');
    },
  });

  // Accept or reject mutation
  const mutation = useMutation({
    mutationFn: async ({ id, action }) => {
      const statusUpdate = {
        status: 'checked',
        ...(action === 'accept' && { role: 'member' }),
      };
      return await axiosSecure.patch(`/agreements/${id}`, statusUpdate);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['agreementRequests']); // refetch
    },
    onError: (error) => {
      Swal.fire({
        icon: 'error',
        title: 'Failed!',
        text: error.response?.data?.message || error.message || 'Something went wrong.',
        confirmButtonColor: '#F5951D',
      });
    }
  });

  // const handleAction = (id, action) => {
  //   mutation.mutate({ id, action });
  // };

  const handleAction = (id, action) => {
    if (action === 'reject') {
      Swal.fire({
        title: 'Are you sure?',
        text: "You are about to reject this agreement request.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, reject it!',
      }).then((result) => {
        if (result.isConfirmed) {
          mutation.mutate({ id, action });
        }
      });
    } else {
      mutation.mutate({ id, action });
    }
  };


  if (mutation.isLoading) return <Loading></Loading>;

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

      {!isLoading && requests.length > 0 && (
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm border dark:border-gray-700">
            <thead className="bg-gray-200 dark:bg-gray-800 text-left">
              <tr>
                <th className="px-4 py-2">User Name</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Floor</th>
                <th className="px-4 py-2">Block</th>
                <th className="px-4 py-2">Room</th>
                <th className="px-4 py-2">Rent (TK)</th>
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((req) => (
                <tr key={req._id} className="border-t dark:border-gray-700">
                  <td className="px-4 py-2">{req.userName}</td>
                  <td className="px-4 py-2">{req.email}</td>
                  <td className="px-4 py-2">{req.floorNo}</td>
                  <td className="px-4 py-2">{req.blockName}</td>
                  <td className="px-4 py-2">{req.apartmentNo}</td>
                  <td className="px-4 py-2">{req.rent}</td>
                  <td className="px-4 py-2">{new Date(req.requestDate).toLocaleDateString()}</td>
                  <td className="px-4 py-2 space-x-2">
                    <button
                      onClick={() => handleAction(req._id, 'accept')}
                      className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleAction(req._id, 'reject')}
                      className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AgreementRequests;
