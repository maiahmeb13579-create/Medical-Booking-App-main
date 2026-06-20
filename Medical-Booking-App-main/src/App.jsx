import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import AdminDashboard from './pages/Admin/AdminDashboard';
import DoctorDashboard from './pages/Doctor/DoctorDashboard';
import PatientDashboard from './pages/Patient/PatientDashboard';
import NotFound from './pages/NotFound'; // تم استيراد الصفحة الجديدة
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';

export default function App() {
  return (
    <Router>
      {/* Navbar يظهر في جميع الصفحات التي يوجد فيها مستخدم مسجل */}
      <Navbar />
      
      <Routes>
        {/* Auth Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Dashboards Routes */}
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute allowedRoles={['Admin']}>
              <AdminDashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/doctor" 
          element={
            <ProtectedRoute allowedRoles={['Doctor']}>
              <DoctorDashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/patient" 
          element={
            <ProtectedRoute allowedRoles={['Patient']}>
              <PatientDashboard />
            </ProtectedRoute>
          } 
        />

        {/* مسار الـ 404: سيظهر لأي رابط غير معروف */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}