import React, { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/Home';
import CityDetailsPage from './components/CityDetails';

const App: FC = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/city" element={<CityDetailsPage />} />
      </Routes>
    </>
  );
};

export default App;
