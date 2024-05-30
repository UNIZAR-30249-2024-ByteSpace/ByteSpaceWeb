/*  Laboratorio de Ingeniería del Software - Béjar Herández, Rubén
* Proyecto:             ByteSpace
* Fichero:              App.tsx
* Desarrolladores:             
*                       Ruiz Borao, Juan José - 756640            
*                       Clariana Pascual, Rael - 760617
*                       Pellicer Barco, Juan - 818138.
*/
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './ui/pages/HomePage';
import AboutPage from './ui/pages/AboutPage';
import SearchPage from './ui/pages/SearchPage';
import LoginPage from './ui/pages/LoginPage';
import MyReservationPage from './ui/pages/MyReservationPage';
import SpacePage from './ui/pages/SpacePage';
import PrivateRoute from './ui/components/PrivateRoute';
import AdminPage from './ui/pages/AdminPage';
import ModifyPage from './ui/pages/ModifyPage';
import { AuthProvider } from './ui/components/AuthContext'; 

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route element={<PrivateRoute />}>
            <Route path="/home" element={<HomePage />} />
            <Route path="/myReserves" element={<MyReservationPage />} />
            <Route path="/space/:spaceId" element={<SpacePage />} />
          </Route>
          <Route path="/about" element={<AboutPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/modify" element={<ModifyPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
