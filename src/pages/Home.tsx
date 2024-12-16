import React, { FC, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { fetchWeather } from '../redux/weatherSlice';
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  Typography,
} from '@mui/material';
import CityCard from '../components/CityCard';
import CitySelect from '../components/CitySearch';

const HomePage: FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { cities, loading, error } = useSelector(
    (state: RootState) => state.weather,
  );
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null); // Додано для зберігання країни

  const handleAddCity = () => {
    if (selectedCity && selectedCountry) {
      // Додаємо місто і країну
      dispatch(fetchWeather(`${selectedCity},${selectedCountry}`));
      setSelectedCity(null); // Очищаємо після додавання
      setSelectedCountry(null); // Очищаємо країну після додавання
    }
  };

  return (
    <Container maxWidth="md" style={{ marginTop: '2rem' }}>
      <Typography variant="h4" gutterBottom align="center">
        Weather App
      </Typography>
      <Box
        sx={{
          minHeight: '100px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        {/* Оновлення, щоб передавати місто і країну */}
        <CitySelect
          onCitySelect={(city, country) => {
            setSelectedCity(city);
            setSelectedCountry(country); // Зберігаємо і країну
          }}
        />
        <Button
          fullWidth
          disabled={loading || !selectedCity || !selectedCountry}
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
      </Box>
      {error && (
        <Typography color="error" style={{ marginBottom: '1rem' }}>
          {error}
        </Typography>
      )}
      <Grid sx={{ mt: 2 }} container spacing={2}>
        {cities?.map((city) => (
          <Grid item xs={12} sm={6} md={4} key={city.id}>
            <CityCard {...city} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default HomePage;
