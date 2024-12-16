import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { fetchWeather } from '../redux/weatherSlice';
import CityCard from '../components/CityCard';

const HomePage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { cities, loading, error } = useSelector(
    (state: RootState) => state.weather,
  );

  const handleAddCity = () => {
    const cityName = prompt('Enter city name:');
    if (cityName) {
      dispatch(fetchWeather(cityName));
    }
  };

  return (
    <div>
      <h1>Weather App</h1>
      <button onClick={handleAddCity}>Add City</button>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <div className="city-list">
        {cities.map((city, index: number) => (
          <CityCard key={index} {...city} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
