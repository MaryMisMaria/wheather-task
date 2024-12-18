import React, { FC, useState, useEffect } from 'react';
// redux
import { fetchWeather } from '../redux/weatherSlice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
// material
import {
  Alert,
  Box,
  Grid,
  Button,
  Snackbar,
  Container,
  Typography,
  CircularProgress,
} from '@mui/material';
// components
import CityCard from '../components/CityCard';
import CitySelect from '../components/CitySearch';

const HomePage: FC = () => {
  const dispatch: AppDispatch = useDispatch();

  const { cities, loading, error } = useSelector(
    (state: RootState) => state.weather,
  );

  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>(
    'success',
  );

  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);

  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [isAddingCity, setIsAddingCity] = useState<boolean>(false);

  const handleAddCity = () => {
    if (selectedCity && selectedCountry) {
      setIsAddingCity(true);
      dispatch(fetchWeather(`${selectedCity},${selectedCountry}`));
      setSelectedCity(null);
      setSelectedCountry(null);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  useEffect(() => {
    if (isAddingCity && !loading) {
      if (error) {
        setSnackbarMessage('Failed to add city. Please try again.');
        setSnackbarSeverity('error');
      } else {
        setSnackbarMessage('City added successfully!');
        setSnackbarSeverity('success');
      }
      setSnackbarOpen(true);
      setIsAddingCity(false);
    }
  }, [loading, error, isAddingCity]);

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
        <CitySelect
          onCitySelect={(
            city: React.SetStateAction<string | null>,
            country: React.SetStateAction<string | null>,
          ) => {
            setSelectedCity(city);
            setSelectedCountry(country);
          }}
        />
        <Button
          fullWidth
          variant="contained"
          onClick={handleAddCity}
          disabled={loading || !selectedCity || !selectedCountry}
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
      <Grid sx={{ mt: 2 }} container spacing={2}>
        {cities?.map((city) => (
          <Grid item xs={12} sm={6} md={4} key={city.id}>
            <CityCard {...city} />
          </Grid>
        ))}
      </Grid>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
      >
        <Alert
          sx={{ width: '100%' }}
          severity={snackbarSeverity}
          onClose={handleCloseSnackbar}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default HomePage;
