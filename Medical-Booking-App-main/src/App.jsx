import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DoctorDashboard from './pages/Doctor/DoctorDashboard';
import AdminDashboard from './pages/Admin/AdminDashboard';
import PatientDashboard from './pages/Patient/PatientDashboard';
import Login from './pages/Auth/Login';

function App() {
  return (
    <Router>
      <Routes>
        {/* Default route loads the Login page */}
        <Route path="/" element={<Login />} />
        
        {/* Role-based portal routes */}
        <Route path="/patient" element={<PatientDashboard />} />
        <Route path="/doctor" element={<DoctorDashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;