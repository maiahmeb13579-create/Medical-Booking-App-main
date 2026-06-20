import React, { useState } from 'react';
import { 
  Container, Typography, Box, Paper, Grid, Card, CardContent, Button, TextField, MenuItem, Select, FormControl, InputLabel 
} from '@mui/material';

export default function PatientDashboard() {
  const [doctors] = useState([
    { id: 1, name: "Dr. Mostafa Mahmoud", specialty: "Cardiology" },
    { id: 2, name: "Dr. Mona Ali", specialty: "Pediatrics" },
    { id: 3, name: "Dr. Rania Ahmed", specialty: "Dermatology" },
  ]);

  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [bookings, setBookings] = useState([]);

  const handleBookAppointment = (e) => {
    e.preventDefault();
    if (!selectedDoctor || !appointmentDate) return;

    const doctorDetails = doctors.find(doc => doc.id === selectedDoctor);
    const newBooking = {
      id: bookings.length + 1,
      doctorName: doctorDetails.name,
      specialty: doctorDetails.specialty,
      date: appointmentDate
    };

    setBookings([...bookings, newBooking]);
    setSelectedDoctor("");
    setAppointmentDate("");
    alert("Appointment Booked Successfully!");
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#1976d2', mb: 4 }}>
        Patient Care Portal
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} md={5}>
          <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 2 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 'medium' }}>Book an Appointment</Typography>
            <Box component="form" onSubmit={handleBookAppointment} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <FormControl fullWidth size="small">
                <InputLabel>Select Doctor</InputLabel>
                <Select value={selectedDoctor} label="Select Doctor" onChange={(e) => setSelectedDoctor(e.target.value)} required>
                  {doctors.map((doc) => (
                    <MenuItem key={doc.id} value={doc.id}>{doc.name} ({doc.specialty})</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField type="date" label="Appointment Date" InputLabelProps={{ shrink: true }} fullWidth size="small" value={appointmentDate} onChange={(e) => setAppointmentDate(e.target.value)} required />
              <Button type="submit" variant="contained" color="primary" fullWidth>Confirm Booking</Button>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={7}>
          <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 2, minHeight: 240 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 'medium' }}>Your Scheduled Appointments</Typography>
            {bookings.length === 0 ? (
              <Typography variant="body2" color="textSecondary">No upcoming appointments scheduled yet.</Typography>
            ) : (
              <Grid container spacing={2}>
                {bookings.map((booking) => (
                  <Grid item xs={12} key={booking.id}>
                    <Card variant="outlined" sx={{ backgroundColor: '#f9f9f9' }}>
                      <CardContent sx={{ pb: '16px !important' }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>{booking.doctorName}</Typography>
                        <Typography variant="body2" color="textSecondary">Specialty: {booking.specialty}</Typography>
                        <Typography variant="body2" color="primary" sx={{ mt: 1, fontWeight: 'medium' }}>Date: {booking.date}</Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}