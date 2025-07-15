import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import logo from '../../../src/assets/images/logo1.png';
import { useForm } from 'react-hook-form';
import { FcGoogle } from 'react-icons/fc';
import useAuth from '../../Hooks/useAuth';
import Swal from 'sweetalert2';

const Login = () => {

  const { login } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location?.state?.from || '/';

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmit = (data) => {

    // Destructure
    const { email, password } = data;

    // Login
    login(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        Swal.fire({
          title: 'Success!',
          text: 'You have logged in successfully.',
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

  const handleGoogleLogin = () => {
    console.log('Google login clicked');
    // TODO: google login logic
  };

  return (
    <div className="min-h-screen bg-[#f9f9f9] dark:bg-[#1e1e1f]">

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

      <div className='flex items-center justify-center md:py-10'>
        {/* Card */}
        <div className="bg-white dark:bg-[#2c2c2f] shadow-xl rounded p-10 w-full max-w-md">
          <h3 className="text-2xl font-bold text-center text-[#404042] dark:text-white">Login to Your Account</h3>
          <p className="text-sm text-center text-gray-500 dark:text-gray-400 mt-1 mb-6">
            Access and manage your apartment securely.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-[#404042] dark:text-gray-200 mb-1">Email</label>
              <input
                type="email"
                placeholder="Enter email"
                autoComplete="off"
                {...register('email', { required: true })}
                className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#2c2c2f] text-[#404042] dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#F5951D] hover:border-black transition"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">Email is required</p>}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-[#404042] dark:text-gray-200 mb-1">Password</label>
              <input
                type="password"
                placeholder="Enter password"
                autoComplete="off"
                {...register('password', { required: true })}
                className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#2c2c2f] text-[#404042] dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#F5951D] hover:border-black transition"
              />
              {errors.password && <p className="text-red-500 text-sm mt-1">Password is required</p>}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#F5951D] text-white font-semibold py-2 rounded hover:bg-[#d67e0e] transition"
            >
              Log In
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-4">
            <div className="flex-grow h-px bg-gray-300 dark:bg-gray-600" />
            <span className="text-sm text-gray-400 dark:text-gray-500">or</span>
            <div className="flex-grow h-px bg-gray-300 dark:bg-gray-600" />
          </div>

          {/* Google Login */}
          <button
            onClick={handleGoogleLogin}
            className="w-full border border-gray-300 dark:border-gray-600 py-2 rounded flex items-center justify-center gap-2 hover:bg-gray-100 dark:hover:bg-white/10 transition"
          >
            <FcGoogle className="text-xl" />
            <span className="text-sm font-medium text-[#404042] dark:text-white">Continue with Google</span>
          </button>

          {/* Register link */}
          <p className="text-sm text-center text-[#404042] dark:text-gray-300 mt-2">
            Don't have an account?{' '}
            <Link to="/register" className="text-[#F5951D] font-semibold hover:underline">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
