import React from 'react';
import useAuth from '../../Hooks/useAuth';

const MyProfile = () => {
  const { user } = useAuth();

  return (
    <div className="px-4 md:px-8 py-6 bg-white dark:bg-[#121212] min-h-screen text-gray-800 dark:text-gray-200">
      <h1 className="text-3xl font-bold mb-2">My Profile</h1>
      <p className="mb-6 text-gray-600 dark:text-white">Manage your personal information and account details.</p>

      {/* Section 1: User Information */}
      <div className="bg-gray-100 dark:bg-[#1e1e1e] p-6 rounded shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4">User Information</h2>
        <div className="flex flex-col md:flex-row items-center gap-6">
          <img
            src={user?.photoURL || 'https://via.placeholder.com/120'}
            alt="User"
            className="w-20 h-20 rounded-full object-cover border-2 border-primary-500"
          />
          <div className="flex-1 space-y-2 text-center md:text-left">
            <p><span className="font-semibold">Name:</span> {user?.displayName || 'N/A'}</p>
            <p><span className="font-semibold">Email:</span> {user?.email || 'N/A'}</p>
          </div>
        </div>
      </div>

      {/* Section 2: Rented Apartment Info */}
      <div className="bg-gray-100 dark:bg-[#1e1e1e] p-6 rounded shadow-md">
        <h2 className="text-xl font-semibold mb-4">Rented Apartment Information</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left border border-gray-300 dark:border-gray-700">
            <thead className="bg-gray-200 dark:bg-[#121212] text-gray-700 dark:text-gray-300">
              <tr>
                <th className="py-2 px-4 border-b">Agreement Accept Date</th>
                <th className="py-2 px-4 border-b">Floor</th>
                <th className="py-2 px-4 border-b">Block</th>
                <th className="py-2 px-4 border-b">Room No</th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-600">
                <td className="py-2 px-4 border-b">None</td>
                <td className="py-2 px-4 border-b">None</td>
                <td className="py-2 px-4 border-b">None</td>
                <td className="py-2 px-4 border-b">None</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
