import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
// redux
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { fetchHourlyWeatherData } from '../redux/hourlyWeatherSlice';
// material
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
// charts
import {
  Line,
  XAxis,
  YAxis,
  Tooltip,
  LineChart,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';

const CityDetailPage = () => {
  const navigate = useNavigate();
  const { cityName } = useParams();
  const dispatch: AppDispatch = useDispatch();

  const { hourlyData, loading, error } = useSelector(
    (state: RootState) => state.hourlyWeather,
  );

  useEffect(() => {
    if (cityName) {
      dispatch(fetchHourlyWeatherData(cityName));
    }
  }, [dispatch, cityName]);

  const handleGoBack = () => {
    navigate('/');
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
        <Typography>Loading...</Typography>
      ) : error ? (
        <Typography>Error: {error}</Typography>
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
