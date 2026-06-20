import React, { useState } from 'react';
import { 
  Container, Typography, Box, Paper, Table, TableBody, TableCell, 
  TableContainer, TableHead, TableRow, Button, Chip, Avatar
} from '@mui/material';

export default function AdminDashboard() {
  // Mock Data for Platform Users (Doctors and Patients)
  const [users, setUsers] = useState([
    { id: 1, name: "Dr. Mostafa Mahmoud", email: "mostafa@example.com", role: "Doctor", status: "Pending" },
    { id: 2, name: "Dr. Mona Ali", email: "mona@example.com", role: "Doctor", status: "Approved" },
    { id: 3, name: "Kareem Hassan", email: "kareem@example.com", role: "Patient", status: "Approved" },
    { id: 4, name: "Dr. Rania Ahmed", email: "rania@example.com", role: "Doctor", status: "Blocked" },
  ]);

  // Handle User Status Actions (Approve / Block)
  const handleStatusChange = (id, newStatus) => {
    setUsers(prevUsers => 
      prevUsers.map(user => user.id === id ? { ...user, status: newStatus } : user)
    );
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#c2185b', mb: 3 }}>
        Admin System Management
      </Typography>

      {/* Users Moderation Table */}
      <Paper sx={{ p: 3, borderRadius: 2 }}>
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
                        <Button 
                          variant="contained" 
                          color="success" 
                          size="small" 
                          onClick={() => handleStatusChange(user.id, 'Approved')}
                        >
                          Approve
                        </Button>
                      )}
                      {user.status !== 'Blocked' && (
                        <Button 
                          variant="outlined" 
                          color="error" 
                          size="small" 
                          onClick={() => handleStatusChange(user.id, 'Blocked')}
                        >
                          Block
                        </Button>
                      )}
                    </Box>
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