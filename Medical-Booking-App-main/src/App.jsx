import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DoctorDashboard from './pages/Doctor/DoctorDashboard';
import AdminDashboard from './pages/Admin/AdminDashboard';

function App() {
  return (
    <Router>
      <Routes>
        {/* Route for Doctor Dashboard */}
        <Route path="/" element={<DoctorDashboard />} />
        <Route path="/doctor" element={<DoctorDashboard />} />

        {/* Route for Admin Dashboard */}
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;