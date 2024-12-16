import React, { FC } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Button, Container, Paper, Typography } from '@mui/material';

const CityDetailsPage: FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const handleBackClick = () => {
    navigate('/');
  };

  const handleUpdateWeather = () => {
    // Тут буде логіка для оновлення погоди міста
    console.log(`Оновлюємо погоду для міста з ID: ${id}`);
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Detail information about city
        </Typography>

        <Typography variant="h6" sx={{ mb: 2 }}>
          City
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 3 }}>
          <Button variant="contained" color="primary" onClick={handleBackClick}>
            Back
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleUpdateWeather}
          >
            Update
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default CityDetailsPage;
