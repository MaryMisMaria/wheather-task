import React, { FC, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { fetchWeather } from '../redux/weatherSlice';
import CityCard from '../components/CityCard';
import {
  Button,
  CircularProgress,
  Container,
  Grid,
  TextField,
  Typography,
} from '@mui/material';

const HomePage: FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { cities, loading, error } = useSelector(
    (state: RootState) => state.weather,
  );
  const [cityName, setCityName] = useState<string>('');

  const handleAddCity = () => {
    if (cityName.trim()) {
      dispatch(fetchWeather(cityName));
      setCityName('');
    }
  };

  return (
    <Container maxWidth="md" style={{ marginTop: '2rem' }}>
      <Typography variant="h4" gutterBottom>
        Weather App
      </Typography>
      <Grid
        container
        spacing={2}
        alignItems="center"
        style={{ marginBottom: '1.5rem' }}
      >
        <TextField
          sx={{ margin: '50px 0px' }}
          fullWidth
          label="Enter city name"
          variant="outlined"
          value={cityName}
          onChange={(e) => setCityName(e.target.value)}
        />
        <Button
          fullWidth
          disabled={loading}
          variant="contained"
          onClick={handleAddCity}
          style={{
            color: 'white',
            fontWeight: 'bold',
            borderRadius: '20px',
            padding: '10px 20px',
            textTransform: 'uppercase',
            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
            background: 'linear-gradient(45deg, #2196F3, #FF9800)',
          }}
        >
          {loading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            'Add City'
          )}
        </Button>
      </Grid>
      {error && (
        <Typography color="error" style={{ marginBottom: '1rem' }}>
          {error}
        </Typography>
      )}
      <Grid container spacing={2}>
        {cities.map((city) => (
          <Grid item xs={12} sm={6} md={4} key={city.id}>
            <CityCard {...city} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default HomePage;
