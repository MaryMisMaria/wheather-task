import React from 'react';
import { useParams } from 'react-router-dom';

const CityDetailsPage = () => {
  const { cityName } = useParams<{ cityName: string }>();

  return (
    <div>
      <h1>Details for {cityName}</h1>
      <p>C</p>
      <p>Weather: </p>
    </div>
  );
};

export default CityDetailsPage;
