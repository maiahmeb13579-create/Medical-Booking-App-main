import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  Container, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Chip 
} from '@mui/material';

export default function DoctorDashboard() {
  const { user } = useAuth(); // Get logged-in doctor data from context

  // Mock Data for Doctor's Appointments
  const [appointments, setAppointments] = useState([
    { id: 1, patientName: "Ahmed Ali", date: "2026-06-22", time: "10:30 AM", status: "Pending" },
    { id: 2, patientName: "Sara Mohamed", date: "2026-06-22", time: "11:15 AM", status: "Confirmed" },
    { id: 3, patientName: "Omar Hassan", date: "2026-06-23", time: "01:00 PM", status: "Pending" },
  ]);

  const handleStatusChange = (id, newStatus) => {
    setAppointments(appointments.map(app => 
      app.id === id ? { ...app, status: newStatus } : app
    ));
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {/* Dynamic Welcome Message showing the logged-in doctor's name */}
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#2e7d32', mb: 1 }}>
        Doctor Portal
      </Typography>
      <Typography variant="h6" color="textSecondary" sx={{ mb: 4 }}>
        Welcome back, Dr. {user ? user.name : 'Physician'}
      </Typography>

      <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 2 }}>
        <Table>
          <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>Patient Name</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Date</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Time</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 'bold', alignment: 'center' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {appointments.map((app) => (
              <TableRow key={app.id}>
                <TableCell>{app.patientName}</TableCell>
                <TableCell>{app.date}</TableCell>
                <TableCell>{app.time}</TableCell>
                <TableCell>
                  <Chip 
                    label={app.status} 
                    color={app.status === "Confirmed" ? "success" : "warning"} 
                    size="small" 
                  />
                </TableCell>
                <TableCell>
                  {app.status === "Pending" && (
                    <>
                      <Button 
                        variant="contained" 
                        color="success" 
                        size="small" 
                        sx={{ mr: 1 }}
                        onClick={() => handleStatusChange(app.id, "Confirmed")}
                      >
                        Accept
                      </Button>
                      <Button 
                        variant="outlined" 
                        color="error" 
                        size="small"
                        onClick={() => handleStatusChange(app.id, "Cancelled")}
                      >
                        Cancel
                      </Button>
                    </>
                  )}
                  {app.status !== "Pending" && (
                    <Typography variant="body2" color="textSecondary">No actions available</Typography>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}