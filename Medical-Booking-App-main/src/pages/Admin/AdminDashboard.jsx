import React, { useState, useEffect } from 'react';
import { adminApi } from '../../api/AdminApi.js';
import { 
  Container, Typography, Box, Paper, TextField, Button, List, ListItem, ListItemText, IconButton, Grid, Chip, CircularProgress 
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [specialties, setSpecialties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersData = await adminApi.getUsers();
        const specsData = await adminApi.getSpecialties();
        setUsers(usersData);
        setSpecialties(specsData);
      } catch (error) {
        console.error("Error loading admin data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const toggleBlockUser = async (id, currentStatus) => {
    try {
      if (currentStatus) await adminApi.unblockUser(id);
      else await adminApi.blockUser(id);
      setUsers(users.map(u => u.id === id ? { ...u, isBlocked: !currentStatus } : u));
    } catch (error) {
      console.error("Error toggling block status:", error);
    }
  };

  if (loading) return <Container sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}><CircularProgress /></Container>;

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 4 }}>Admin Control Panel</Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>Manage Specialties</Typography>
            <List>
              {specialties.map((spec) => (
                <ListItem key={spec.id} secondaryAction={<IconButton><DeleteIcon /></IconButton>}>
                  <ListItemText primary={spec.name} />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>User Moderation</Typography>
            {users.map((user) => (
              <Box key={user.id} sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Box>
                  <Typography>{user.name}</Typography>
                  <Chip label={user.role} size="small" />
                </Box>
                <Button onClick={() => toggleBlockUser(user.id, user.isBlocked)} color={user.isBlocked ? "success" : "error"}>
                  {user.isBlocked ? "Unblock" : "Block"}
                </Button>
              </Box>
            ))}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}