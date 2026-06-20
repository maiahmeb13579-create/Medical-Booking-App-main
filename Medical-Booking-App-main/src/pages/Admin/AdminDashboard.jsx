import React, { useState } from 'react';
import { 
  Container, Typography, Box, Paper, Table, TableBody, TableCell, 
  TableContainer, TableHead, TableRow, Button, Chip, Avatar, Divider, TextField
} from '@mui/material';

export default function AdminDashboard() {
  // 1. Mock Data for Platform Users
  const [users, setUsers] = useState([
    { id: 1, name: "Dr. Mostafa Mahmoud", email: "mostafa@example.com", role: "Doctor", status: "Pending" },
    { id: 2, name: "Dr. Mona Ali", email: "mona@example.com", role: "Doctor", status: "Approved" },
    { id: 3, name: "Kareem Hassan", email: "kareem@example.com", role: "Patient", status: "Approved" },
    { id: 4, name: "Dr. Rania Ahmed", email: "rania@example.com", role: "Doctor", status: "Blocked" },
  ]);

  // 2. Mock Data for Medical Specialties (New Section)
  const [specialties, setSpecialties] = useState([
    { id: 1, name: "Cardiology" },
    { id: 2, name: "Pediatrics" },
    { id: 3, name: "Dermatology" },
  ]);
  const [newSpecialty, setNewSpecialty] = useState("");

  // Handle User Status Actions (Approve / Block)
  const handleStatusChange = (id, newStatus) => {
    setUsers(prevUsers => 
      prevUsers.map(user => user.id === id ? { ...user, status: newStatus } : user)
    );
  };

  // Add New Medical Specialty
  const handleAddSpecialty = (e) => {
    e.preventDefault();
    if (!newSpecialty.trim()) return;
    
    const newId = specialties.length > 0 ? specialties[specialties.length - 1].id + 1 : 1;
    setSpecialties([...specialties, { id: newId, name: newSpecialty }]);
    setNewSpecialty("");
  };

  // Delete Medical Specialty
  const handleDeleteSpecialty = (id) => {
    setSpecialties(specialties.filter(item => item.id !== id));
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#c2185b', mb: 3 }}>
        Admin System Management
      </Typography>

      {/* Users Moderation Section */}
      <Paper sx={{ p: 3, mb: 4, borderRadius: 2 }}>
        <Typography variant="h6" gutterBottom sx={{ mb: 2, fontWeight: 'medium' }}>
          User Moderation (Doctors & Patients)
        </Typography>
        <TableContainer>
          <Table>
            <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
              <TableRow>
                <TableCell>User</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar sx={{ bgcolor: user.role === 'Doctor' ? '#1976d2' : '#388e3c' }}>
                      {user.name[0]}
                    </Avatar>
                    <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                      {user.name}
                    </Typography>
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Chip 
                      label={user.role} 
                      variant="outlined"
                      color={user.role === 'Doctor' ? 'primary' : 'success'} 
                      size="small" 
                    />
                  </TableCell>
                  <TableCell>
                    <Chip 
                      label={user.status} 
                      color={user.status === 'Approved' ? 'success' : user.status === 'Blocked' ? 'error' : 'warning'} 
                      size="small" 
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                      {user.status !== 'Approved' && (
                        <Button variant="contained" color="success" size="small" onClick={() => handleStatusChange(user.id, 'Approved')}>Approve</Button>
                      )}
                      {user.status !== 'Blocked' && (
                        <Button variant="outlined" color="error" size="small" onClick={() => handleStatusChange(user.id, 'Blocked')}>Block</Button>
                      )}
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Divider sx={{ mb: 4 }} />

      {/* Medical Specialties Management (CRUD Section) */}
      <Paper sx={{ p: 3, borderRadius: 2 }}>
        <Typography variant="h6" gutterBottom sx={{ mb: 2, fontWeight: 'medium' }}>
          Manage Medical Specialties
        </Typography>

        {/* Add Specialty Form */}
        <Box component="form" onSubmit={handleAddSpecialty} sx={{ display: 'flex', gap: 2, mb: 3, alignItems: 'center' }}>
          <TextField
            label="New Specialty Name"
            variant="outlined"
            size="small"
            value={newSpecialty}
            onChange={(e) => setNewSpecialty(e.target.value)}
            sx={{ minWidth: 250 }}
          />
          <Button type="submit" variant="contained" color="primary">
            Add Specialty
          </Button>
        </Box>

        {/* Specialties List Table */}
        <TableContainer sx={{ maxWidth: 600 }}>
          <Table size="small">
            <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Specialty Name</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {specialties.map((spec) => (
                <TableRow key={spec.id}>
                  <TableCell>{spec.id}</TableCell>
                  <TableCell sx={{ fontWeight: 'medium' }}>{spec.name}</TableCell>
                  <TableCell align="center">
                    <Button 
                      variant="outlined" 
                      color="error" 
                      size="small" 
                      onClick={() => handleDeleteSpecialty(spec.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Container>
  );
}