import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Container, Typography, Box, Paper, TextField, Button } from '@mui/material';

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    if (!name || !email || !password) return;

    // Simulate saving the new user details in localStorage
    const newUser = { name, email, password, role: "Patient" };
    localStorage.setItem(email, JSON.stringify(newUser));

    alert("Registration Successful as a Patient! Please Login.");
    navigate('/');
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 8 }}>
      <Paper sx={{ p: 4, borderRadius: 3, boxShadow: 3 }}>
        <Typography variant="h5" align="center" gutterBottom sx={{ fontWeight: 'bold', color: '#1976d2', mb: 3 }}>
          Create Account
        </Typography>

        <Box component="form" onSubmit={handleRegister} sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
          <TextField
            label="Full Name"
            type="text"
            fullWidth
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            label="Email Address"
            type="email"
            fullWidth
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button type="submit" variant="contained" color="primary" fullWidth size="large" sx={{ mt: 1 }}>
            Sign Up
          </Button>

          <Typography variant="body2" align="center" sx={{ mt: 1 }}>
            Already have an account? <Link to="/" style={{ color: '#1976d2', textDecoration: 'none', fontWeight: 'bold' }}>Sign In</Link>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}