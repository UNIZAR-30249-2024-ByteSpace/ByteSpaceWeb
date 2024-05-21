/*  Laboratorio de Ingeniería del Software - Béjar Herández, Rubén
* Proyecto:             ByteSpace
* Fichero:              PrivateRoute.tsx
* Desarrolladores:             
*                       Ruiz Borao, Juan José - 756640            
*                       Clariana Pascual, Rael - 760617
*                       Pellicer Barco, Juan - 818138.
*/
import React from 'react';
import { Navigate, Outlet, RouteProps } from 'react-router-dom';
import { useAuth } from './AuthContext';

const PrivateRoute: React.FC<RouteProps> = ({ element }) => {
  const { user } = useAuth();

  return user ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;
