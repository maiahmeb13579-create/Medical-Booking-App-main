import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  Container, Typography, Box, Paper, Grid, Card, CardContent, Button, TextField, MenuItem, Select, FormControl, InputLabel 
} from '@mui/material';
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import StarIcon from '@mui/icons-material/Star';

// Mock data for initial appointments and stats
const initialBookings = [
    { id: 101, doctorName: "Dr. Mona Ali", specialty: "Pediatrics", date: "2026-06-25", time: "11:00 AM", status: "Upcoming" },
    { id: 102, doctorName: "Dr. Mostafa Mahmoud", specialty: "Cardiology", date: "2026-05-10", time: "09:00 AM", status: "Completed" },
];

export default function PatientDashboard() {
  const { user } = useAuth(); // Get logged-in user data from context
  
  const [doctors] = useState([
    { id: 1, name: "Dr. Mostafa Mahmoud", specialty: "Cardiology" },
    { id: 2, name: "Dr. Mona Ali", specialty: "Pediatrics" },
    { id: 3, name: "Dr. Rania Ahmed", specialty: "Dermatology" },
  ]);

  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");
  const [bookings, setBookings] = useState(initialBookings);

  // Statistics Calculation
  const upcomingAppointmentsCount = bookings.filter(b => b.status === "Upcoming").length;
  const completedAppointmentsCount = bookings.filter(b => b.status === "Completed").length;
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

    setBookings([newBooking, ...bookings]); // Add new booking to the top
    setSelectedDoctor("");
    setAppointmentDate("");
    setAppointmentTime("");
    alert("Appointment Booked Successfully!");
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Upcoming': return 'info';
      case 'Completed': return 'success';
      case 'Cancelled': return 'error';
      default: return 'warning';
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {/* Dynamic Welcome Message */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#1976d2' }}>
          Welcome Back, {user ? user.name : 'Patient'}
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          Manage your health journey, book appointments, and connect with top doctors.
        </Typography>
      </Box>

      {/* Statistics Cards for a Richer UI */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={4}>
          <StatCard title="Upcoming Visits" value={upcomingAppointmentsCount} icon={<AccessTimeFilledIcon color="info" />} color="info.main" />
        </Grid>
        <Grid item xs={12} sm={4}>
          <StatCard title="Total Consultations" value={bookings.length} icon={<MedicalInformationIcon color="success" />} color="success.main" />
        </Grid>
        <Grid item xs={12} sm={4}>
          <StatCard title="My Primary Specialty" value={topSpecialty} icon={<StarIcon color="warning" />} color="warning.main" />
        </Grid>
      </Grid>

      <Grid container spacing={4}>
        {/* Booking Form (Left Side) */}
        <Grid item xs={12} md={5}>
          <Paper sx={{ p: 4, borderRadius: 3, boxShadow: 3, height: '100%' }}>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold' }}>Schedule New Appointment</Typography>
            <Box component="form" onSubmit={handleBookAppointment} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <FormControl fullWidth>
                <InputLabel>Select a Doctor</InputLabel>
                <Select value={selectedDoctor} label="Select a Doctor" onChange={(e) => setSelectedDoctor(e.target.value)} required>
                  {doctors.map((doc) => (
                    <MenuItem key={doc.id} value={doc.id}>{doc.name} ({doc.specialty})</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField type="date" label="Preferred Date" InputLabelProps={{ shrink: true }} fullWidth value={appointmentDate} onChange={(e) => setAppointmentDate(e.target.value)} required />
              <TextField type="time" label="Preferred Time" InputLabelProps={{ shrink: true }} fullWidth value={appointmentTime} onChange={(e) => setAppointmentTime(e.target.value)} required />
              <Button type="submit" variant="contained" color="primary" fullWidth size="large" sx={{ mt: 1, borderRadius: 2 }}>Confirm Booking</Button>
            </Box>
          </Paper>
        </Grid>

        {/* Appointments List (Right Side) */}
        <Grid item xs={12} md={7}>
          <Paper sx={{ p: 4, borderRadius: 3, boxShadow: 3, minHeight: 400 }}>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold' }}>My Consultation History</Typography>
            {bookings.length === 0 ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', flexDirection: 'column', color: 'text.secondary' }}>
                <MedicalInformationIcon sx={{ fontSize: 60, mb: 2 }} />
                <Typography variant="body1">No appointments scheduled yet.</Typography>
              </Box>
            ) : (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {bookings.map((booking) => (
                  <Card key={booking.id} variant="outlined" sx={{ borderRadius: 2, borderColor: '#e0e0e0' }}>
                    <CardContent sx={{ p: '16px !important', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Box>
                            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>{booking.doctorName}</Typography>
                            <Typography variant="body2" color="textSecondary">{booking.specialty}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', color: 'primary.main' }}>
                                <Typography variant="body2" sx={{fontWeight: 'medium'}}>{booking.date}</Typography>
                                <Typography variant="caption" sx={{fontWeight: 'bold'}}>{booking.time}</Typography>
                            </Box>
                            <Button variant="outlined" color={getStatusColor(booking.status)} size="small" sx={{ borderRadius: 1.5, minWidth: 90, cursor: 'default' }}>
                                {booking.status}
                            </Button>
                        </Box>
                    </CardContent>
                  </Card>
                ))}
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

// Reusable Statistics Card Component (Local to this file)
const StatCard = ({ title, value, icon, color }) => (
    <Paper sx={{ p: 2, borderRadius: 2, boxShadow: 1, display: 'flex', alignItems: 'center', gap: 2, borderLeft: `5px solid ${color}` }}>
        <Box sx={{ backgroundColor: '#f0f0f0', p: 1.5, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {icon}
        </Box>
        <Box>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{value}</Typography>
            <Typography variant="caption" color="textSecondary">{title}</Typography>
        </Box>
    </Paper>
);