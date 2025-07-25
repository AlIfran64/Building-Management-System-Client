import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router';
import Swal from 'sweetalert2';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import Loading from '../../Components/Loading/Loading';
import useAuth from '../../Hooks/useAuth';
import { BiSolidCoupon } from "react-icons/bi";

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const selectedMonth = queryParams.get('month');
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [finalRent, setFinalRent] = useState(null);
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [isDark, setIsDark] = useState(false);

  // Dark - light theme toggle for payment card
  useEffect(() => {
    const matchDark = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDark(matchDark.matches);

    const handleChange = (e) => setIsDark(e.matches);
    matchDark.addEventListener('change', handleChange);
    return () => matchDark.removeEventListener('change', handleChange);
  }, []);

  const { data: agreementInfo = {}, isPending } = useQuery({
    queryKey: ['agreements', id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/agreements/${id}`);
      return res.data;
    }
  });

  const { data: coupons = [] } = useQuery({
    queryKey: ["coupons"],
    queryFn: async () => {
      const res = await axiosSecure.get("/coupons");
      return res.data;
    },
  });

  const handleApplyCoupon = () => {
    const matched = coupons.find(c => c.code === couponCode.trim() && c.status === 'available');
    if (matched) {
      const discountAmount = (agreementInfo.rent * matched.discount) / 100;
      setDiscount(discountAmount);
      setFinalRent(agreementInfo.rent - discountAmount);
      setAppliedCoupon(matched);
      Swal.fire({
        title: "Success",
        text: `Coupon Applied! Discount: $${discountAmount}`,
        icon: "success",
        confirmButtonColor: "#F5951D"
      });

    } else {
      setDiscount(0);
      setFinalRent(agreementInfo.rent);
      setAppliedCoupon(null);
      Swal.fire({
        title: "Invalid",
        text: "Coupon code is not valid or not available",
        icon: "error",
        confirmButtonColor: "#d33"
      });
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    if (!card) return;

    const rentToCharge = finalRent || agreementInfo.rent;
    const amountInCents = Math.round(rentToCharge * 100); // Stripe uses cents

    try {
      const { data } = await axiosSecure.post('/create-payment-intent', {
        amountInCents,
        id,
        month: selectedMonth
      });

      const clientSecret = data.clientSecret;

      const paymentResult = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card,
          billing_details: {
            name: user.displayName,
            email: user.email
          }
        }
      });

      if (paymentResult.error) {
        Swal.fire("Error", paymentResult.error.message, "error");
      } else if (paymentResult.paymentIntent.status === "succeeded") {
        const paymentData = {
          agreementId: id,
          name: agreementInfo.userName,
          email: agreementInfo.email,
          floorNo: agreementInfo.floorNo,
          blockName: agreementInfo.blockName,
          apartmentNo: agreementInfo.apartmentNo,
          requestDate: agreementInfo.requestDate,
          month: selectedMonth,
          rent: agreementInfo.rent,
          discountAmount: discount,
          finalPaid: rentToCharge,
          couponUsed: appliedCoupon ? appliedCoupon.code : null,
          paymentStatus: "paid",
          transactionId: paymentResult.paymentIntent.id,
          paymentDate: new Date()
        };

        const res = await axiosSecure.post("/payments", paymentData);
        if (res.data.insertedId) {
          Swal.fire("Success", "Payment completed and saved successfully!", "success");
        } else {
          Swal.fire("Warning", "Payment processed but not saved.", "warning");
        }
      }
    } catch (err) {
      Swal.fire("Error", "Payment failed. Try again.", err);
    }
  };

  if (isPending) return <Loading />;

  return (
    <div className='px-4 md:px-8 py-6 bg-white dark:bg-[#121212] min-h-screen text-gray-800 dark:text-gray-300'>
      <h1 className='text-3xl font-bold mb-2'>Payment Form</h1>
      <p className="mb-6 text-gray-600 dark:text-white">Pay your rent for the selected month</p>
      <form onSubmit={handleSubmit} className='space-y-4 rounded shadow-xl bg-white dark:bg-[#1e1e1e] p-6 w-full mx-auto'>
        <CardElement
          className="p-5 border rounded bg-white dark:bg-[#2b2b2b]"
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: isDark ? '#e0e0e0' : '#222',
                '::placeholder': {
                  color: isDark ? '#888' : '#aab7c4',
                },
              },
              invalid: {
                color: '#ff4d4f',
              },
            },
          }}
        />

        <div className="space-y-2 relative">
          <BiSolidCoupon className='absolute top-4 left-5 text-gray-300' size={24} />
          <input
            type="text"
            placeholder="Enter Coupon Code"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            className="border py-4 px-13 rounded w-full bg-white dark:bg-[#2b2b2b] text-black dark:text-white"
          />
          <button type="button" onClick={handleApplyCoupon} className="w-full bg-[#404042] hover:bg-[#404042a9] rounded text-white py-2 cursor-pointer">
            Apply Coupon
          </button>
        </div>

        {finalRent && (
          <div className='text-lg text-center'>
            Final Rent after discount: ${finalRent.toFixed(2)}
          </div>
        )}

        <div className='flex justify-center'>
          <button
            type="submit"
            disabled={!stripe}
            className='w-full bg-[#F5951D] hover:bg-[#f5941dce] text-white p-2 rounded cursor-pointer'
          >
            Pay Rent ${finalRent ? finalRent.toFixed(2) : agreementInfo.rent}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PaymentForm;
