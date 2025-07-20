import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../Hooks/useAuth';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import {
  PieChart, Pie, Cell, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend
} from 'recharts';
import Loading from '../../Components/Loading/Loading';

const COLORS = ['#00C49F', '#FF8042'];

const AdminProfile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: roomStats = {}, isLoading: loadingRooms } = useQuery({
    queryKey: ['roomStats'],
    queryFn: async () => {
      const res = await axiosSecure.get('/apartments/stats');
      return res.data;
    }
  });

  const { data: userStats = {}, isLoading: loadingUsers } = useQuery({
    queryKey: ['userStats'],
    queryFn: async () => {
      const res = await axiosSecure.get('/users/stats');
      return res.data;
    }
  });

  if (loadingRooms || loadingUsers) return <Loading></Loading>

  const roomPieData = [
    { name: 'Available (%)', value: Number(roomStats.availablePercentage) || 0 },
    { name: 'Unavailable (%)', value: Number(roomStats.unavailablePercentage) || 0 },
  ];

  const userBarData = [
    {
      name: 'Users',
      Total: userStats.totalUsers || 0,
      Members: userStats.totalMembers || 0,
    },
  ];

  return (
    <div className="px-4 md:px-10 py-8 bg-gray-50 dark:bg-[#121212] min-h-screen text-gray-800 dark:text-gray-200">
      <h1 className="text-4xl font-bold mb-3">Admin Profile</h1>
      <p className="mb-8 text-gray-600 dark:text-gray-400">Manage your admin details and visualize system statistics.</p>

      {/* Admin Card */}
      <div className="bg-white dark:bg-[#1e1e1e] shadow-md rounded-xl p-6 mb-5 flex flex-col md:flex-row items-center gap-6">
        <img
          src={user?.photoURL || 'https://via.placeholder.com/120'}
          alt="Admin"
          className="w-24 h-24 rounded-full object-cover border-3 border-primary-600 shadow-lg"
        />
        <div>
          <p className="text-lg"><span className="font-semibold">Name:</span> {user?.displayName || 'N/A'}</p>
          <p className="text-lg"><span className="font-semibold">Email:</span> {user?.email || 'N/A'}</p>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid md:grid-cols-2 gap-5 mb-12">
        {/* Room Stats */}
        <div className="bg-white dark:bg-[#1e1e1e] shadow-md rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4">Room Stats</h2>
          <p><span className="font-medium">Total Rooms:</span> {roomStats.total || 0}</p>
          <div className="h-64 my-5">
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={roomPieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                >
                  {roomPieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Legend />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* User Stats */}
        <div className="bg-white dark:bg-[#1e1e1e] shadow-md rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4">User Stats</h2>
          <p><span className="font-medium">Total Users:</span> {userStats.totalUsers}</p>
          <p><span className="font-medium">Total Members:</span> {userStats.totalMembers}</p>
          <div className="h-64 mt-4">
            <ResponsiveContainer>
              <BarChart data={userBarData}>
                <XAxis dataKey="name" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Legend />
                <Bar dataKey="Total" fill="#8884d8" radius={[10, 10, 0, 0]} />
                <Bar dataKey="Members" fill="#82ca9d" radius={[10, 10, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
