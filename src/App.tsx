import React, { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
// pages
import HomePage from './pages/Home';
import DetailsPage from './pages/DetailPage';

const App: FC = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/city/:cityName" element={<DetailsPage />} />
      </Routes>
    </>
  );
};

export default App;
