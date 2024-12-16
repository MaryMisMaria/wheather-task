import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
// hooks
import { useAppDispatch } from '../hooks';
import useCardColor from '../hooks/useCardColor';
// redux
import { fetchWeather, removeCity } from '../redux/weatherSlice';
// helpers
import * as H from '../helpers';
// material
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from '@mui/material';
// mui icons
import CloudIcon from '@mui/icons-material/Cloud';
import BlurOnIcon from '@mui/icons-material/BlurOn';
import { Delete, Edit, WbSunny } from '@mui/icons-material';
import AcUnitOutlinedIcon from '@mui/icons-material/AcUnitOutlined';
import WaterDropOutlinedIcon from '@mui/icons-material/WaterDropOutlined';
// types
import { CityCardProps } from '../types';

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
  if (description.includes('clouds') || description.includes('overcast')) {
    return <CloudIcon style={{ fontSize: '24px', color: '#2196f3' }} />;
  }
  if (description.includes('mist')) {
    return <BlurOnIcon style={{ fontSize: '24px', color: '#2196f3' }} />;
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
    navigate(`/city/${name}`);
  };

  return (
    <Card style={{ ...cardStyle, margin: '1rem 0' }}>
      <CardContent>
        <Typography variant="h6">{H.capitalizeFirstLetter(name)}</Typography>
        <Typography variant="body2" color="textSecondary">
          {H.capitalizeFirstLetter(description)}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {temp}°C
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
          <Edit sx={{ fontSize: 18, margin: '5px' }} />
          Update
        </Button>
        <Button
          size="small"
          color="secondary"
          variant="contained"
          onClick={handleRemove}
        >
          <Delete sx={{ fontSize: 15 }} />
          Remove
        </Button>
      </CardActions>
      <Button onClick={handleViewDetails}>View Details</Button>
    </Card>
  );
};

export default CityCard;
