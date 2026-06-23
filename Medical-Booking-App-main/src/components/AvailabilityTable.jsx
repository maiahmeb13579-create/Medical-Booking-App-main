import React, { useState } from 'react';
import { Paper, TextField, Button, Box, Typography } from '@mui/material';
import { doctorApi } from '../api/doctorApi';

export default function AvailabilityManager() {
  const [slot, setSlot] = useState({ date: '', startTime: '', endTime: '' });

  const handleCreate = async () => {
    try {
      await doctorApi.createAvailability(slot);
      alert('Slot created successfully!');
    } catch (error) {
      console.error('Error creating slot', error);
    }
  };

  return (
    <Paper sx={{ p: 3, mb: 4 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>Add New Availability Slot</Typography>
      <Box sx={{ display: 'flex', gap: 2 }}>
        <TextField type="date" size="small" onChange={(e) => setSlot({...slot, date: e.target.value})} />
        <TextField label="Start" type="time" size="small" onChange={(e) => setSlot({...slot, startTime: e.target.value})} />
        <TextField label="End" type="time" size="small" onChange={(e) => setSlot({...slot, endTime: e.target.value})} />
        <Button variant="contained" onClick={handleCreate}>Add</Button>
      </Box>
    </Paper>
  );
}