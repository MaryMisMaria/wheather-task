import React, { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
// components
import CityDetailsPage from './components/CityDetails';
// pages
import HomePage from './pages/Home';

const App: FC = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/details" element={<CityDetailsPage />} />
      </Routes>
    </>
  );
};

export default App;
