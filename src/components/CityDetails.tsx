import React, { FC } from 'react';
import { useParams } from 'react-router-dom';

const CityDetails: FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div>
      <p>City ID: {id}</p>
      <h1>City Details</h1>
    </div>
  );
};

export default CityDetails;
