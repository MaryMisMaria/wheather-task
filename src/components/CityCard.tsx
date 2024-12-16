import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
// hooks
import { useAppDispatch } from '../hooks';
// redux
import { fetchWeather, removeCity } from '../redux/weatherSlice';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from '@mui/material';
// mui icons
import { WbSunny } from '@mui/icons-material';
import useCardColor from '../hooks/useCardColor';
import AcUnitOutlinedIcon from '@mui/icons-material/AcUnitOutlined';
import WaterDropOutlinedIcon from '@mui/icons-material/WaterDropOutlined';

interface CityCardProps {
  id: string;
  name: string;
  temp: number;
  description: string;
}

const getWeatherIcon = (description: string) => {
  if (description.includes('rain')) {
    return (
      <WaterDropOutlinedIcon style={{ fontSize: '24px', color: '#2196f3' }} />
    );
  }
  if (description.includes('snow')) {
    return (
      <AcUnitOutlinedIcon style={{ fontSize: '24px', color: '#2196f3' }} />
    );
  }
  if (description.includes('clear') || description.includes('sun')) {
    return <WbSunny style={{ fontSize: '24px', color: '#fbc02d' }} />;
  }
  return null;
};

const CityCard: FC<CityCardProps> = ({ id, name, temp, description }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const cardStyle = useCardColor(description);

  const handleUpdate = () => {
    dispatch(fetchWeather(name));
  };

  const handleRemove = () => {
    dispatch(removeCity(id));
  };

  const handleViewDetails = () => {
    navigate(`/city`);
  };

  const capitalizeFirstLetter = (str: string) =>
    str.charAt(0).toUpperCase() + str.slice(1);

  return (
    <Card style={{ ...cardStyle, marginBottom: '1rem' }}>
      <CardContent>
        <Typography variant="h6">{capitalizeFirstLetter(name)}</Typography>
        <Typography variant="body2" color="textSecondary">
          {capitalizeFirstLetter(description)}
        </Typography>

        <div>{getWeatherIcon(description)}</div>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          color="primary"
          variant="contained"
          onClick={handleUpdate}
        >
          Update
        </Button>
        <Button
          size="small"
          color="secondary"
          variant="contained"
          onClick={handleRemove}
        >
          Remove
        </Button>
      </CardActions>
      <Button onClick={handleViewDetails}>View Details</Button>
    </Card>
  );
};

export default CityCard;
