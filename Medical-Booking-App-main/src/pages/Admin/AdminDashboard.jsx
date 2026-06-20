import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  Container, Typography, Box, Paper, TextField, Button, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Grid 
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export default function AdminDashboard() {
  const { user } = useAuth(); // Get logged-in admin data from context
  const [specialties, setSpecialties] = useState([
    { id: 1, name: "Cardiology" },
    { id: 2, name: "Pediatrics" },
    { id: 3, name: "Dermatology" }
  ]);
  const [newSpecialty, setNewSpecialty] = useState("");

  const handleAddSpecialty = (e) => {
    e.preventDefault();
    if (!newSpecialty.trim()) return;

    const newCategory = {
      id: specialties.length + 1,
      name: newSpecialty
    };

    setSpecialties([...specialties, newCategory]);
    setNewSpecialty("");
  };

  const handleDeleteSpecialty = (id) => {
    setSpecialties(specialties.filter(item => item.id !== id));
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {/* Dynamic Welcome Message showing the logged-in admin's name */}
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#c62828', mb: 1 }}>
        Admin Control Panel
      </Typography>
      <Typography variant="h6" color="textSecondary" sx={{ mb: 4 }}>
        Welcome back, System Admin: {user ? user.name : 'Administrator'}
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={5}>
          <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 2 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 'medium' }}>Add New Medical Specialty</Typography>
            <Box component="form" onSubmit={handleAddSpecialty} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField 
                label="Specialty Name" 
                variant="outlined" 
                fullWidth 
                size="small"
                value={newSpecialty}
                onChange={(e) => setNewSpecialty(e.target.value)}
                required
              />
              <Button type="submit" variant="contained" color="error" fullWidth>
                Add Specialty
              </Button>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={7}>
          <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 2 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 'medium' }}>Current Specialties List</Typography>
            <List>
              {specialties.map((specialty) => (
                <ListItem key={specialty.id} divider>
                  <ListItemText primary={specialty.name} />
                  <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteSpecialty(specialty.id)}>
                      <DeleteIcon color="error" />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}