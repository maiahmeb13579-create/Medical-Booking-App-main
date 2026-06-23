import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  Container, Typography, Box, Paper, Grid, Card, CardContent, Button, TextField, MenuItem, Select, FormControl, InputLabel 
} from '@mui/material';
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import StarIcon from '@mui/icons-material/Star';

const initialBookings = [
    { id: 101, doctorName: "Dr. Mona Ali", specialty: "Pediatrics", date: "2026-06-25", time: "11:00", status: "Upcoming" },
    { id: 102, doctorName: "Dr. Mostafa Mahmoud", specialty: "Cardiology", date: "2026-05-10", time: "09:00", status: "Completed" },
];

export default function PatientDashboard() {
  const { user } = useAuth();
  
  const [doctors] = useState([
    { id: 1, name: "Dr. Mostafa Mahmoud", specialty: "Cardiology" },
    { id: 2, name: "Dr. Mona Ali", specialty: "Pediatrics" },
    { id: 3, name: "Dr. Rania Ahmed", specialty: "Dermatology" },
  ]);

  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");
  const [bookings, setBookings] = useState(initialBookings);

  const upcomingAppointmentsCount = bookings.filter(b => b.status === "Upcoming").length;
  const topSpecialty = bookings.length > 0 ? bookings[0].specialty : "N/A";

  const handleBookAppointment = (e) => {
    e.preventDefault();
    if (!selectedDoctor || !appointmentDate || !appointmentTime) return;
    const doctorDetails = doctors.find(doc => doc.id === selectedDoctor);
    const newBooking = {
      id: bookings.length + 101,
      doctorName: doctorDetails.name,
      specialty: doctorDetails.specialty,
      date: appointmentDate,
      time: appointmentTime,
      status: "Upcoming"
    };
    setBookings([newBooking, ...bookings]);
    setSelectedDoctor("");
    setAppointmentDate("");
    setAppointmentTime("");
    alert("Appointment Booked Successfully!");
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Upcoming': return 'info';
      case 'Completed': return 'success';
      default: return 'warning';
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#1976d2' }}>Welcome Back, {user ? user.name : 'Patient'}</Typography>
      </Box>

      <Grid container spacing={4}>
        <Grid item xs={12} md={5}>
          <Paper sx={{ p: 4, borderRadius: 3, boxShadow: 3 }}>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold' }}>Schedule New Appointment</Typography>
            <Box component="form" onSubmit={handleBookAppointment} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <FormControl fullWidth>
                <InputLabel>Select a Doctor</InputLabel>
                <Select value={selectedDoctor} label="Select a Doctor" onChange={(e) => setSelectedDoctor(e.target.value)} required>
                  {doctors.map((doc) => <MenuItem key={doc.id} value={doc.id}>{doc.name} ({doc.specialty})</MenuItem>)}
                </Select>
              </FormControl>
              
              {/* التعديلات هنا لضبط الشكل */}
              <TextField 
                type="date" 
                label="Preferred Date" 
                InputLabelProps={{ shrink: true }} 
                fullWidth 
                value={appointmentDate} 
                onChange={(e) => setAppointmentDate(e.target.value)} 
                sx={{ '& .MuiInputBase-input': { padding: '14px' } }}
                required 
              />
              <TextField 
                type="time" 
                label="Preferred Time" 
                InputLabelProps={{ shrink: true }} 
                fullWidth 
                value={appointmentTime} 
                onChange={(e) => setAppointmentTime(e.target.value)} 
                sx={{ '& .MuiInputBase-input': { padding: '14px' } }}
                required 
              />
              
              <Button type="submit" variant="contained" fullWidth size="large">Confirm Booking</Button>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={7}>
          <Paper sx={{ p: 4, borderRadius: 3, boxShadow: 3, minHeight: 400 }}>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold' }}>My Consultation History</Typography>
            {bookings.map((booking) => (
              <Card key={booking.id} variant="outlined" sx={{ mb: 2, borderRadius: 2 }}>
                <CardContent sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Box>
                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>{booking.doctorName}</Typography>
                        <Typography variant="body2" color="textSecondary">{booking.specialty}</Typography>
                    </Box>
                    <Box sx={{ textAlign: 'right' }}>
                        <Typography variant="body2">{booking.date}</Typography>
                        <Typography variant="caption" sx={{ fontWeight: 'bold' }}>{booking.time}</Typography>
                    </Box>
                </CardContent>
              </Card>
            ))}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}