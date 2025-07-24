import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAxios from '../../Hooks/useAxios';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const ManageCoupons = () => {
  const axios = useAxios();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    code: '',
    discount: '',
    description: ''
  });

  // Fetch coupons
  const { data: coupons = [], isLoading } = useQuery({
    queryKey: ['coupons'],
    queryFn: async () => {
      const res = await axios.get('/coupons');
      return res.data;
    }
  });

  // Add coupon mutation
  const mutation = useMutation({
    mutationFn: async (newCoupon) => {
      return await axiosSecure.post('/coupons', { ...newCoupon, status: 'available' });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['coupons']);
      Swal.fire('Success!', 'Coupon added successfully!', 'success');
      setFormData({ code: '', discount: '', description: '' });
      setShowModal(false);
    },
    onError: () => {
      Swal.fire('Error!', 'Failed to add coupon.', 'error');
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const { code, discount, description } = formData;
    if (!code || !discount || !description) {
      Swal.fire('Warning', 'All fields are required!', 'warning');
      return;
    }
    mutation.mutate(formData);
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleStatusChange = async (coupon) => {
    const newStatus = coupon.status === 'available' ? 'unavailable' : 'available';
    const confirm = await Swal.fire({
      title: 'Change Status?',
      text: `Change coupon status to "${newStatus}"?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#F5951D',
      cancelButtonColor: '#d33'
    });

    if (confirm.isConfirmed) {
      try {
        await axiosSecure.patch(`/coupons/${coupon._id}/status`, { status: newStatus });
        queryClient.invalidateQueries(['coupons']);
        Swal.fire('Updated!', 'Coupon status updated.', 'success');
      } catch (error) {
        Swal.fire('Error!', 'Failed to update status.', error);
      }
    }
  };

  return (
    <div className="px-4 md:px-8 py-6 bg-white dark:bg-[#121212] min-h-screen text-gray-800 dark:text-gray-200">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Manage Coupons</h1>
          <p className="text-gray-600 dark:text-white">
            Create and manage discount coupons for your apartment tenants.
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="bg-[#F5951D] hover:bg-[#f5941dcf] text-white px-4 py-2 rounded"
        >
          Add Coupon
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white dark:bg-[#1e1e1e] p-6 rounded shadow-xl">
        {isLoading ? (
          <p>Loading coupons...</p>
        ) : coupons.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400">No coupons available.</p>
        ) : (
          <table className="min-w-full text-center border border-gray-300 dark:border-gray-700">
            <thead className="bg-gray-200 dark:bg-[#121212] text-gray-700 dark:text-gray-300">
              <tr>
                <th className="py-2 px-4 border-b">#</th>
                <th className="py-2 px-4 border-b">Coupon Code</th>
                <th className="py-2 px-4 border-b">Discount (%)</th>
                <th className="py-2 px-4 border-b">Description</th>
                <th className="py-2 px-4 border-b">Status</th>
                <th className="py-2 px-4 border-b">Action</th>
              </tr>
            </thead>
            <tbody>
              {coupons.map((coupon, index) => (
                <tr key={coupon._id} className="border-b text-center">
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">{coupon.code}</td>
                  <td className="px-4 py-2">{coupon.discount}</td>
                  <td className="px-4 py-2">{coupon.description}</td>
                  <td className="px-4 py-2 capitalize">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${coupon.status === 'available'
                      ? 'bg-green-100 text-green-600'
                      : 'bg-red-100 text-red-600'
                      }`}>
                      {coupon.status}
                    </span>
                  </td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => handleStatusChange(coupon)}
                      className="bg-[#F5951D] hover:bg-[#f5941dba] text-white px-3 py-1 rounded text-sm"
                    >
                      Change Status
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white dark:bg-[#1e1e1e] text-gray-800 dark:text-gray-200 p-6 rounded-lg w-[90%] max-w-md shadow-xl">
            <h2 className="text-xl font-semibold mb-4">Add New Coupon</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block mb-1 font-medium">Coupon Code</label>
                <input
                  type="text"
                  name="code"
                  value={formData.code}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded bg-gray-50 dark:bg-[#121212]"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Discount (%)</label>
                <input
                  type="number"
                  name="discount"
                  value={formData.discount}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded bg-gray-50 dark:bg-[#121212]"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded bg-gray-50 dark:bg-[#121212]"
                />
              </div>
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-300 dark:bg-gray-600 rounded hover:bg-gray-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#F5951D] text-white rounded hover:bg-[#f5941dc0]"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageCoupons;
