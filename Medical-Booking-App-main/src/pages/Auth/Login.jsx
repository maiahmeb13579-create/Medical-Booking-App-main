import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Box, Paper, TextField, Button, MenuItem } from '@mui/material';

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Patient");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (role === "Admin") {
      navigate('/admin');
    } else if (role === "Doctor") {
      navigate('/doctor');
    } else if (role === "Patient") {
      navigate('/patient');
    }
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 8 }}>
      <Paper sx={{ p: 4, borderRadius: 3, boxShadow: 3 }}>
        <Typography variant="h5" align="center" gutterBottom sx={{ fontWeight: 'bold', color: '#1976d2', mb: 3 }}>
          Medical App Login
        </Typography>
        <Box component="form" onSubmit={handleLogin} sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
          <TextField label="Email Address" type="email" fullWidth required value={email} onChange={(e) => setEmail(e.target.value)} />
          <TextField label="Password" type="password" fullWidth required value={password} onChange={(e) => setPassword(e.target.value)} />
          <TextField select label="Select Role" fullWidth value={role} onChange={(e) => setRole(e.target.value)}>
            <MenuItem value="Patient">Patient</MenuItem>
            <MenuItem value="Doctor">Doctor</MenuItem>
            <MenuItem value="Admin">Admin</MenuItem>
          </TextField>
          <Button type="submit" variant="contained" color="primary" fullWidth size="large" sx={{ mt: 1 }}>
            Sign In
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}