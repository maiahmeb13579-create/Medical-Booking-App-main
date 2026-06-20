import React, { useState } from 'react';
import { 
  Container, Typography, Box, Paper, Table, TableBody, TableCell, 
  TableContainer, TableHead, TableRow, Button, Chip, Divider,
  FormGroup, FormControlLabel, Checkbox, TextField
} from '@mui/material';

export default function DoctorDashboard() {
  // 1. Mock Data for Upcoming and Past Appointments
  const [appointments, setAppointments] = useState([
    { id: 1, patientName: "Ahmed Ali", specialty: "Cardiology", timeSlot: "10:00 AM - 10:30 AM", status: "Pending" },
    { id: 2, patientName: "Sara Mohamed", specialty: "Cardiology", timeSlot: "11:00 AM - 11:30 AM", status: "Pending" },
    { id: 3, patientName: "John Doe", specialty: "Cardiology", timeSlot: "01:00 PM - 01:30 PM", status: "Accepted" },
  ]);

  // 2. State for Doctor Availability Scheduling
  const [availableDays, setAvailableDays] = useState({
    Sunday: true, Monday: false, Tuesday: true, Wednesday: false, Thursday: true, Friday: false, Saturday: false
  });
  const [startTime, setStartTime] = useState("16:00");
  const [endTime, setEndTime] = useState("20:00");

  // Handle Appointment Status Change
  const handleStatusChange = (id, newStatus) => {
    setAppointments(prev => prev.map(app => app.id === id ? { ...app, status: newStatus } : app));
  };

  // Handle Working Days Checkbox Change
  const handleDayChange = (event) => {
    setAvailableDays({ ...availableDays, [event.target.name]: event.target.checked });
  };

  // Handle Save Schedule Action
  const handleSaveSchedule = () => {
    alert(`Success! Availability schedule updated from ${startTime} to ${endTime}`);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#1976d2' }}>
        Doctor Dashboard
      </Typography>

      {/* Appointment Management Section */}
      <Paper sx={{ p: 3, mb: 4, borderRadius: 2 }}>
        <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
          Upcoming Appointments Management
        </Typography>
        <TableContainer>
          <Table>
            <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
              <TableRow>
                <TableCell>Patient Name</TableCell>
                <TableCell>Specialty</TableCell>
                <TableCell>Time Slot</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {appointments.map((app) => (
                <TableRow key={app.id}>
                  <TableCell>{app.patientName}</TableCell>
                  <TableCell>{app.specialty}</TableCell>
                  <TableCell>{app.timeSlot}</TableCell>
                  <TableCell>
                    <Chip 
                      label={app.status} 
                      color={app.status === 'Accepted' ? 'success' : app.status === 'Cancelled' ? 'error' : 'warning'} 
                      size="small" 
                    />
                  </TableCell>
                  <TableCell align="center">
                    {app.status === 'Pending' && (
                      <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                        <Button variant="contained" color="success" size="small" onClick={() => handleStatusChange(app.id, 'Accepted')}>Accept</Button>
                        <Button variant="outlined" color="error" size="small" onClick={() => handleStatusChange(app.id, 'Cancelled')}>Cancel</Button>
                      </Box>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Divider sx={{ mb: 4 }} />

      {/* Doctor Scheduling Section */}
      <Paper sx={{ p: 3, borderRadius: 2 }}>
        <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
          Set Your Availability Schedule
        </Typography>
        
        <Box sx={{ mb: 3 }}>
          <Typography variant="body2" color="textSecondary" gutterBottom>
            Select the days you are available for appointments:
          </Typography>
          <FormGroup row>
            {Object.keys(availableDays).map((day) => (
              <FormControlLabel
                key={day}
                control={<Checkbox checked={availableDays[day]} onChange={handleDayChange} name={day} color="primary" />}
                label={day}
              />
            ))}
          </FormGroup>
        </Box>

        <Box sx={{ display: 'flex', gap: 3, mb: 3, flexWrap: 'wrap' }}>
          <TextField
            label="Start Time"
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            InputLabelProps={{ shrink: true }}
            inputProps={{ step: 300 }} 
          />
          <TextField
            label="End Time"
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            InputLabelProps={{ shrink: true }}
            inputProps={{ step: 300 }} 
          />
        </Box>

        <Button variant="contained" color="primary" onClick={handleSaveSchedule}>
          Save Availability Schedule
        </Button>
      </Paper>
    </Container>
  );
}