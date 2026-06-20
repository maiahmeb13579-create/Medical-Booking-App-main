import React, { useState } from 'react';

const DoctorDashboard = () => {
  // State to manage appointments data
  const [appointments, setAppointments] = useState([
    { id: 1, patientName: "John Doe", specialty: "Dentistry", time: "10:00 AM", status: "Pending" },
    { id: 2, patientName: "Jane Smith", specialty: "Dentistry", time: "11:30 AM", status: "Pending" },
    { id: 3, patientName: "Michael Brown", specialty: "Dentistry", time: "01:00 PM", status: "Accepted" },
  ]);

  // Function to handle status update (Accept / Cancel)
  const handleStatusChange = (id, newStatus) => {
    setAppointments(prev => 
      prev.map(app => app.id === id ? { ...app, status: newStatus } : app)
    );
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-4">
          Doctor Dashboard - Appointment Management
        </h1>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-800 text-white">
                <th className="p-3">Patient Name</th>
                <th className="p-3">Specialty</th>
                <th className="p-3">Time Slot</th>
                <th className="p-3">Status</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map(app => (
                <tr key={app.id} className="border-b hover:bg-gray-50">
                  <td className="p-3 font-semibold">{app.patientName}</td>
                  <td className="p-3 text-gray-600">{app.specialty}</td>
                  <td className="p-3 text-blue-600 font-medium">{app.time}</td>
                  <td className="p-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      app.status === 'Accepted' ? 'bg-green-100 text-green-700' :
                      app.status === 'Cancelled' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {app.status}
                    </span>
                  </td>
                  <td className="p-3 space-x-2">
                    {app.status === 'Pending' && (
                      <>
                        <button 
                          onClick={() => handleStatusChange(app.id, 'Accepted')}
                          className="bg-green-500 hover:bg-green-600 text-white text-xs px-3 py-1 rounded-md transition"
                        >
                          Accept
                        </button>
                        <button 
                          onClick={() => handleStatusChange(app.id, 'Cancelled')}
                          className="bg-red-500 hover:bg-red-600 text-white text-xs px-3 py-1 rounded-md transition"
                        >
                          Cancel
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;