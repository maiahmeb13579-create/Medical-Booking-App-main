import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <Container sx={{ textAlign: 'center', mt: 10 }}>
      <Typography variant="h1" sx={{ fontWeight: 'bold', color: '#1976d2' }}>404</Typography>
      <Typography variant="h5" sx={{ mb: 4 }}>Oops! Page not found.</Typography>
      <Button variant="contained" onClick={() => navigate('/')}>Back to Login</Button>
    </Container>
  );
}