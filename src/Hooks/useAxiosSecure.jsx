import axios from 'axios';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import useAuth from '../Hooks/useAuth';
const axiosSecure = axios.create({
  baseURL: 'http://localhost:3000'
})
const useAxiosSecure = () => {
  const { user, logout } = useAuth();
  console.log(user);

  const navigate = useNavigate();

  useEffect(() => {
    axiosSecure.interceptors.request.use((config) => {
      if (user) {
        console.log(user);

        config.headers.Authorization = `Bearer ${user.
          accessToken
          }`;
      }

      return config;
    }, (error) => {
      return Promise.reject(error);
    })

    axiosSecure.interceptors.response.use((res) => {
      return res;
    }, (error) => {
      const status = error.response?.status;
      if (status === 403) {
        navigate('/forbidden')
      }
      else if (status === 401) {
        logout()
          .then(() => {
            navigate('/login')
          })
          .catch(() => { })
      }
      return Promise.reject(error);
    })
  }, [user, navigate, logout])

  return axiosSecure;
};

export default useAxiosSecure;