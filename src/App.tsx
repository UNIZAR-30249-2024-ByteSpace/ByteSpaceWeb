import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './ui/pages/HomePage';
import AboutPage from './ui/pages/AboutPage';
import SearchPage from './ui/pages/SearchPage';
//import LoginPage from './ui/pages/LoginPage copy';
import HelloWorldPage from './ui/pages/LoginPage';
import MyReservationPage from './ui/pages/MyReservationPage';
import SpacePage from './ui/pages/SpacePage';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HelloWorldPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/myReserves" element={<MyReservationPage />} />
        <Route path="/space/:spaceId" element={<SpacePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/search" element={<SearchPage />} />
      </Routes>
    </Router>
  );
};

export default App;
