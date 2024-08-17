import { ReactNode } from 'react';
import Cookies from 'js-cookie';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const isAuthenticated = !!Cookies.get('jwt');

  if (!isAuthenticated) {
    return <Navigate to={'/login'} />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
