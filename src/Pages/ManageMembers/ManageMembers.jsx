import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const ManageMembers = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [removingId, setRemovingId] = useState(null);

  // Fetch members
  const { data: members = [], isLoading } = useQuery({
    queryKey: ['members'],
    queryFn: async () => {
      const res = await axiosSecure.get('/users?role=member');
      return res.data;
    },
  });

  // Mutation to update role to 'user'
  const { mutate: removeMember } = useMutation({
    mutationFn: async (id) => {
      await axiosSecure.patch(`/users/${id}`, { role: 'user' });
    },
    onMutate: (id) => setRemovingId(id),
    onSettled: () => setRemovingId(null),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['members'] });
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="px-4 md:px-8 py-6 bg-white dark:bg-[#121212] min-h-screen text-gray-800 dark:text-gray-200">
      <h1 className="text-3xl font-bold mb-2">Manage Members</h1>
      <p className="mb-6 text-gray-600 dark:text-white">
        View all current members and manage their access.
      </p>

      <div className="bg-white dark:bg-[#1e1e1e] p-6 rounded shadow-xl">
        <h2 className="text-xl font-semibold mb-4">Members List</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left border border-gray-300 dark:border-gray-700">
            <thead className="bg-gray-200 dark:bg-[#121212] text-gray-700 dark:text-gray-300">
              <tr>
                <th className="py-2 px-4 border-b">Name</th>
                <th className="py-2 px-4 border-b">Email</th>
                <th className="py-2 px-4 border-b text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {members.length > 0 ? (
                members.map((member) => (
                  <tr
                    key={member._id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-600 transition"
                  >
                    <td className="py-2 px-4 border-b">{member.name}</td>
                    <td className="py-2 px-4 border-b">{member.email}</td>
                    <td className="py-2 px-4 border-b text-center">

                      <button
                        disabled={removingId === member._id}
                        onClick={() => {
                          Swal.fire({
                            title: 'Are you sure?',
                            text: 'This user will be demoted to a regular user.',
                            icon: 'warning',
                            showCancelButton: true,
                            confirmButtonColor: '#d33',
                            cancelButtonColor: '#3085d6',
                            confirmButtonText: 'Yes, remove',
                          }).then((result) => {
                            if (result.isConfirmed) {
                              removeMember(member._id);
                              Swal.fire('Removed!', 'The member has been removed.', 'success');
                            }
                          });
                        }}
                        className={`px-4 py-1 rounded text-white transition ${removingId === member._id
                          ? 'bg-red-300 cursor-not-allowed'
                          : 'bg-red-500 hover:bg-red-600'
                          }`}
                      >
                        {removingId === member._id ? 'Removing...' : 'Remove'}
                      </button>

                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center py-6 text-gray-500">
                    No members found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageMembers;
