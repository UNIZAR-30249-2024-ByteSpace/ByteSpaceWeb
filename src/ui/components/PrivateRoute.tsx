import React from 'react';
import { Navigate, Outlet, RouteProps } from 'react-router-dom';
import { useAuth } from './AuthContext';

const PrivateRoute: React.FC<RouteProps> = ({ element }) => {
  const { user } = useAuth();

  return user ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;
