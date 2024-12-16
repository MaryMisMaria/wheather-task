import React, { FC, useState } from 'react';
// redux
import { fetchWeather } from '../redux/weatherSlice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
// material
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  Snackbar,
  Typography,
} from '@mui/material';
// components
import CityCard from '../components/CityCard';
import CitySelect from '../components/CitySearch';

const HomePage: FC = () => {
  const dispatch: AppDispatch = useDispatch();

  const { cities, loading } = useSelector((state: RootState) => state.weather);

  const [openSnackbar, setOpenSnackbar] = useState(false);

  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);

  const handleAddCity = () => {
    if (selectedCity) {
      dispatch(fetchWeather(`${selectedCity},${selectedCountry}`));
      setSelectedCity(null);
      setSelectedCountry(null);
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
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
        <CitySelect
          onCitySelect={(city, country) => {
            setSelectedCity(city);
            setSelectedCountry(country);
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
      <Grid sx={{ mt: 2 }} container spacing={2}>
        {cities?.map((city) => (
          <Grid item xs={12} sm={6} md={4} key={city.id}>
            <CityCard {...city} />
          </Grid>
        ))}
      </Grid>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
      >
        <Alert
          severity="success"
          sx={{ width: '100%' }}
          onClose={handleCloseSnackbar}
        >
          City added successfully!
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default HomePage;