import React, { FC } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const CityDetailsPage: FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const handleBackClick = () => {
    navigate('/');
  };

  return (
    <div>
      <button onClick={handleBackClick}>Back to Home</button>
      <h1>City Details</h1>
      <p>City ID: {id}</p>
    </div>
  );
};

export default CityDetailsPage;
