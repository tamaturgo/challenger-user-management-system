import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface PrivateRouteProps {
  children: React.ReactNode;
  requiredRole: string; 
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, requiredRole }) => {
  const { isAuthenticated, role } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  if (role !== requiredRole) {
    return <Navigate to="/unauthorized" />; 
  }

  return <>{children}</>;
};

export default PrivateRoute;
