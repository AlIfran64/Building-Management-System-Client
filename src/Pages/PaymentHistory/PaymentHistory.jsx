import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../Hooks/useAuth';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import Loading from '../../Components/Loading/Loading';

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: payments = [], isPending } = useQuery({
    queryKey: ['payments', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments?email=${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  if (isPending) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="px-4 md:px-8 py-6 bg-white dark:bg-[#121212] min-h-screen text-gray-800 dark:text-gray-200">
      <h1 className="text-3xl font-bold mb-2">Payment History</h1>
      <p className="mb-6 text-gray-600 dark:text-white">
        View your rent payment records and transaction details.
      </p>

      <div className="bg-white dark:bg-[#1e1e1e] p-6 rounded shadow-xl">
        <h2 className="text-xl font-semibold mb-4">Your Payments</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left border border-gray-300 dark:border-gray-700">
            <thead className="bg-gray-200 dark:bg-[#121212] text-gray-700 dark:text-gray-300">
              <tr>
                <th className="py-2 px-4 border-b">#</th>
                <th className="py-2 px-4 border-b">Month</th>
                <th className="py-2 px-4 border-b">Apartment</th>
                <th className="py-2 px-4 border-b">Rent</th>
                <th className="py-2 px-4 border-b">Discount</th>
                <th className="py-2 px-4 border-b">Paid</th>
                <th className="py-2 px-4 border-b">Coupon</th>
                <th className="py-2 px-4 border-b">Transaction ID</th>
                <th className="py-2 px-4 border-b">Date</th>
              </tr>
            </thead>
            <tbody>
              {payments.length > 0 ? (
                payments.map((payment, index) => (
                  <tr
                    key={payment._id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-600 transition"
                  >
                    <td className="py-2 px-4 border-b">{index + 1}</td>
                    <td className="py-2 px-4 border-b">{payment.month}</td>
                    <td className="py-2 px-4 border-b">
                      {payment.apartmentNo} ({payment.blockName}, Floor {payment.floorNo})
                    </td>
                    <td className="py-2 px-4 border-b">${payment.rent}</td>
                    <td className="py-2 px-4 border-b">
                      ${payment.discountAmount || 0}
                    </td>
                    <td className="py-2 px-4 border-b font-semibold">
                      ${payment.finalPaid}
                    </td>
                    <td className="py-2 px-4 border-b">
                      {payment.couponUsed || '—'}
                    </td>
                    <td className="py-2 px-4 border-b break-words max-w-[150px]">
                      {payment.transactionId}
                    </td>
                    <td className="py-2 px-4 border-b">
                      {new Date(payment.paymentDate).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" className="text-center py-6 text-gray-500">
                    No payment records found.
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

export default PaymentHistory;
