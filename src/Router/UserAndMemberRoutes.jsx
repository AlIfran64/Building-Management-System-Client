import { Navigate, useLocation } from 'react-router';
import useAuth from '../Hooks/useAuth';

import Loading from '../Components/Loading/Loading';
import useUserRole from '../Hooks/useUserRole';


const UserAndMemberRoutes = ({ children }) => {
  const { user, loading } = useAuth();
  const { role, roleLoading } = useUserRole();
  const location = useLocation();

  if (loading || roleLoading) return <Loading />;

  // Block if not logged in
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Allow only if NOT admin
  if (role !== 'admin') {
    return children;
  }

  // Block admin
  return <Navigate to="/forbidden" replace />;
};

export default UserAndMemberRoutes;
