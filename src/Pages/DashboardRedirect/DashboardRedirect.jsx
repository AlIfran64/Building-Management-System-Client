import React from 'react';
import { Navigate } from 'react-router';
import useUserRole from '../../Hooks/useUserRole';


const DashboardRedirect = () => {
  const { role, roleLoading } = useUserRole();

  if (roleLoading) {
    return <div>Loading...</div>; // or your custom loader
  }

  if (role === 'admin') {
    return <Navigate to="/dashboard/adminProfile" replace />;
  } else {
    return <Navigate to="/dashboard/myProfile" replace />;
  }
};

export default DashboardRedirect;
