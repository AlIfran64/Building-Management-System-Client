import React, { useState } from 'react';
import useAxios from '../../Hooks/useAxios';
import Swal from 'sweetalert2';

const MakeAnnouncement = () => {
  const axios = useAxios();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description) {
      return Swal.fire({
        icon: 'warning',
        title: 'All fields are required',
        confirmButtonColor: '#3085d6',
      });
    }

    setLoading(true);

    try {
      const res = await axios.post('/announcements', {
        title,
        description,
        createdAt: new Date()
      });

      if (res.data.insertedId) {
        Swal.fire({
          icon: 'success',
          title: 'Announcement posted successfully!',
          confirmButtonColor: '#F5951D',
        });
        setTitle('');
        setDescription('');
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Failed to post announcement',
        text: error?.message || 'Something went wrong',
        confirmButtonColor: '#d33',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-4 md:px-8 py-6 bg-white dark:bg-[#121212] min-h-screen text-gray-800 dark:text-gray-200">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-semibold text-gray-800 dark:text-white">Make Announcement</h1>
        <p className="text-gray-600 dark:text-gray-300 mt-1">Post a new update for all users and members.</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white dark:bg-[#1e1e1e] p-6 rounded-lg shadow-md space-y-4">
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Title</label>
          <input
            type="text"
            className="w-full px-4 py-2 border rounded-md bg-gray-50 dark:bg-[#121212] dark:border-gray-600 dark:text-white focus:outline-none focus:ring focus:border-blue-400"
            placeholder="Enter announcement title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
          <textarea
            rows="5"
            className="w-full px-4 py-2 border rounded-md bg-gray-50 dark:bg-[#121212] dark:border-gray-600 dark:text-white focus:outline-none focus:ring focus:border-blue-400"
            placeholder="Enter detailed announcement..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="text-right">
          <button
            type="submit"
            disabled={loading}
            className={`px-6 py-2 text-white rounded transition duration-200 ${loading ? 'bg-[#F5951D] cursor-pointer' : 'bg-[#F5951D] hover:bg-[#f5941dcc]'
              }`}
          >
            {loading ? 'Posting...' : 'Post Announcement'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default MakeAnnouncement;
