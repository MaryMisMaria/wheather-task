import React from 'react';

interface WeatherDetailsProps {
  details: any;
}

const WeatherDetails: React.FC<WeatherDetailsProps> = ({ details }) => {
  return (
    <div className="weather-details">
      <h2>{details.name}</h2>
      <p>Temperature: {details.main.temp}°C</p>
      <p>Humidity: {details.main.humidity}%</p>
      <p>Wind Speed: {details.wind.speed} m/s</p>
    </div>
  );
};

export default WeatherDetails;
