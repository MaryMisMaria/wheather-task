import React, { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/Home';
import CityDetail from './components/CityDetails';

const App: FC = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/city/:id" element={<CityDetail />} />
      </Routes>
    </>
  );
};

export default App;
