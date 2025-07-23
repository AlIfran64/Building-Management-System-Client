import React from 'react';
import useAuth from '../Hooks/useAuth';
import Loading from '../Components/Loading/Loading';
import useUserRole from '../Hooks/useUserRole';
import { Navigate, useLocation } from 'react-router';

const AdminRoutes = ({ children }) => {
  const { user, loading } = useAuth();
  const { role, roleLoading } = useUserRole();
  const location = useLocation();

  if (loading || roleLoading) {
    return <Loading />;
  }

  if (!user || role !== 'admin') {
    return (
      <Navigate
        to="/forbidden"
        state={{ from: location }}
        replace
      />
    );
  }

  return children;
};

export default AdminRoutes;
