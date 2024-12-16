import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { ArrowBack } from '@mui/icons-material';
import { fetchHourlyWeatherData } from '../redux/hourlyWeatherSlice';
import { AppDispatch, RootState } from '../redux/store';
import Button from '@mui/material/Button';

const CityDetailPage = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const { cityName } = useParams();

  // Витягування даних з Redux state
  const { hourlyData, loading, error } = useSelector(
    (state: RootState) => state.hourlyWeather,
  );

  useEffect(() => {
    if (cityName) {
      dispatch(fetchHourlyWeatherData(cityName)); // Завантажуємо дані для міста
    }
  }, [dispatch, cityName]);

  const handleGoBack = () => {
    navigate('/'); // Повертає на попередню сторінку
  };

  const customData =
    cityName && hourlyData[cityName]
      ? hourlyData[cityName].map((item: { time: any; temperature: any }) => ({
          time: item.time,
          metric: item.temperature,
        }))
      : [];

  return (
    <div>
      <>Custom Data Chart {cityName}</>
      <Button onClick={handleGoBack}>
        <ArrowBack />
      </Button>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <ResponsiveContainer width="100%" height={400}>
          <LineChart
            data={customData}
            margin={{ top: 50, right: 30, bottom: 20, left: 10 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="metric" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default CityDetailPage;
