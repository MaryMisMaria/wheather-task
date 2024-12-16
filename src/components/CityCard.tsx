import React from 'react';
import { useAppDispatch } from '../hooks';
import { fetchWeather, removeCity } from '../redux/weatherSlice';

interface CityCardProps {
  id: string;
  name: string;
  temp: number;
  description: string;
}

const CityCard: React.FC<CityCardProps> = ({ id, name, temp, description }) => {
  const dispatch = useAppDispatch();

  const handleUpdate = () => {
    dispatch(fetchWeather(name));
  };

  const handleRemove = () => {
    dispatch(removeCity(id));
  };

  return (
    <div className="city-card">
      <h3>{name}</h3>
      <p>{temp}°C</p>
      <p>{description}</p>
      <button onClick={handleUpdate}>Update</button>
      <button onClick={handleRemove}>Remove</button>
    </div>
  );
};

export default CityCard;
