import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRouteWithoutCookie = ({ children }: { children: ReactNode }) => {
  const isAuthenticated = !!localStorage.getItem('jwt');

  if (!isAuthenticated) {
    return <Navigate to={'/login-without-cookie'} />;
  }

  return <>{children}</>;
};

export default ProtectedRouteWithoutCookie;
