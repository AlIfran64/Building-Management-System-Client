import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router';
import logo from '../../../src/assets/images/logo1.png';
import useAuth from '../../Hooks/useAuth';
import Swal from 'sweetalert2';

const Register = () => {

  const { signup } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location?.state?.from || '/';

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm();

  const onSubmit = (data) => {

    // Destructure
    const { email, password } = data;

    // Register
    signup(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        Swal.fire({
          title: 'Success!',
          text: 'You have registered successfully.',
          icon: 'success',
          confirmButtonColor: '#F5951D',
        });
        navigate(from);
      })
      .catch((error) => {
        const errorMessage = error.message;
        Swal.fire({
          title: 'Error!',
          text: `${errorMessage}`,
          icon: 'error',
          confirmButtonColor: '#F5951D',
        });
      });
  };

  const password = watch('password');
  console.log(password);


  return (
    <div className="min-h-screen bg-[#f9f9f9] dark:bg-[#1e1e1f] ">

      <div className='p-5'>
        {/* Logo */}
        <Link to={'/'}>
          <div className="flex items-center gap-2 cursor-pointer">
            <img src={logo} alt="logo" className="w-10" />
            <p className="text-2xl font-bold">
              <span className="text-[#404042] dark:text-white">Brick</span>
              <span className="text-[#F5951D]">Base</span>
            </p>
          </div>
        </Link>
      </div>

      <div className='flex flex-col items-center justify-center md:py-5'>
        {/* Register Card */}
        <div className="bg-white dark:bg-[#2c2c2f] shadow-xl rounded p-10 w-full max-w-md">
          <h3 className="text-2xl font-bold text-center text-[#404042] dark:text-white">Create Your Account</h3>
          <p className="text-sm text-center text-gray-500 dark:text-gray-400 mt-1 mb-6">
            Join BrickBase to manage your apartment securely.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">

            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-[#404042] dark:text-gray-200 mb-1">Full Name</label>
              <input
                type="text"
                {...register('name', { required: true })}
                placeholder="Enter full name"
                className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#2c2c2f] text-[#404042] dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#F5951D] hover:border-black transition"
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">Name is required</p>}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-[#404042] dark:text-gray-200 mb-1">Email</label>
              <input
                type="email"
                {...register('email', { required: true })}
                placeholder="Enter email"
                className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#2c2c2f] text-[#404042] dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#F5951D] hover:border-black transition"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">Email is required</p>}
            </div>

            {/* Photo Upload */}
            <div>
              <label className="block text-sm font-medium text-[#404042] dark:text-gray-200 mb-1">Upload Photo</label>
              <input
                type="file"
                accept="image/*"
                {...register('photo', { required: true })}
                className="w-full px-3 py-[0.4rem] rounded border border-gray-300 dark:border-gray-600 text-[#404042] dark:text-white bg-white dark:bg-[#2c2c2f] focus:outline-none focus:ring-2 focus:ring-[#F5951D]"
              />
              {errors.photo && <p className="text-red-500 text-sm mt-1">Photo is required</p>}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-[#404042] dark:text-gray-200 mb-1">Password</label>
              <input
                type="password"
                {...register('password', {
                  required: true,
                  minLength: 6,
                  validate: {
                    hasUpperCase: (v) => /[A-Z]/.test(v) || 'Must include an uppercase letter',
                    hasLowerCase: (v) => /[a-z]/.test(v) || 'Must include a lowercase letter'
                  }
                })}
                placeholder="Enter password"
                className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#2c2c2f] text-[#404042] dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#F5951D] hover:border-black transition"
              />
              {errors.password?.type === 'required' && <p className="text-red-500 text-sm mt-1">Password is required</p>}
              {errors.password?.type === 'minLength' && <p className="text-red-500 text-sm mt-1">At least 6 characters</p>}
              {errors.password?.type === 'hasUpperCase' && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
              {errors.password?.type === 'hasLowerCase' && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
            </div>

            {/* Register Button */}
            <button
              type="submit"
              className="w-full bg-[#F5951D] text-white font-semibold py-2 rounded hover:bg-[#d67e0e] transition"
            >
              Register
            </button>
          </form>

          {/* Login Link */}
          <p className="text-sm text-center text-[#404042] dark:text-gray-300 mt-2">
            Already have an account?{' '}
            <Link to="/login" className="text-[#F5951D] font-semibold hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
