import React from 'react';
import useAxios from '../../Hooks/useAxios';
import { useQuery } from '@tanstack/react-query';
import { formatDistanceToNow } from 'date-fns';
import { Loader2 } from 'lucide-react';

const Announcement = () => {
  const axios = useAxios();

  const { data: announcements = [], isLoading } = useQuery({
    queryKey: ['announcements'],
    queryFn: async () => {
      const res = await axios.get('/announcements');
      return res.data;
    }
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 bg-white dark:bg-[#121212] min-h-screen">
      <h1 className="text-2xl md:text-3xl font-semibold text-gray-800 dark:text-white">
        Announcements
      </h1>
      <p className=" text-gray-600 dark:text-gray-300 mt-1 mb-6">
        Stay up to date with the latest updates from the admin.
      </p>
      {announcements.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">No announcements available.</p>
      ) : (
        <div className="space-y-6">
          {announcements.map((item) => (
            <div
              key={item._id}
              className="p-6 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm hover:shadow-md transition bg-gray-50 dark:bg-[#1E1E1E]"
            >
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                {item.title}
              </h2>
              <p className="mt-2 text-gray-700 dark:text-gray-300">{item.description}</p>
              <p className="mt-4 text-sm text-gray-500 dark:text-gray-400 italic">
                {item.createdAt && !isNaN(new Date(item.createdAt))
                  ? `Posted ${formatDistanceToNow(new Date(item.createdAt), { addSuffix: true })}`
                  : "Posted on Unknown Date"}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Announcement;
