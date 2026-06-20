import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Clear state
    navigate('/'); // Redirect to login
  };

  // If no user is logged in, don't show the navbar
  if (!user) return null;

  return (
    <AppBar position="static" sx={{ backgroundColor: '#1976d2' }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
          Medical Care Portal
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography variant="body1" sx={{ fontStyle: 'italic' }}>
            Hello, {user.name} ({user.role})
          </Typography>
          <Button color="inherit" variant="outlined" onClick={handleLogout} sx={{ borderColor: '#fff' }}>
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}