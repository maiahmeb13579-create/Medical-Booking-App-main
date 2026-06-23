// ... (الـ imports زي ما هي)

export default function DoctorDashboard() {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null); // عشان نعرف أي زرار بيعمل Loading

  // ... (الـ useEffect زي ما هي)

  const handleStatusChange = async (id, newStatus) => {
    setActionLoading(id); // بنحدد الـ id بتاع الموعد اللي بيتعمله معالجة
    try {
      if (newStatus === "approved") await appointmentApi.approveAppointment(id);
      if (newStatus === "rejected") await appointmentApi.rejectAppointment(id);
      
      setAppointments(appointments.map(app => 
        app.id === id ? { ...app, status: newStatus } : app
      ));
    } catch (error) {
      console.error("Error updating status:", error);
    } finally {
      setActionLoading(null);
    }
  };

  if (loading) return <Container sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}><CircularProgress /></Container>;

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#2e7d32', mb: 1 }}>Doctor Dashboard</Typography>
      <Typography variant="h6" color="textSecondary" sx={{ mb: 4 }}>Welcome back, Dr. {user?.name}</Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
            {/* ... الـ TableHead زي ما هو ... */}
          </TableHead>
          <TableBody>
            {appointments.length > 0 ? (
              appointments.map((app) => (
                <TableRow key={app.id}>
                  <TableCell>{app.patientName}</TableCell>
                  <TableCell>{app.date}</TableCell>
                  <TableCell>{app.time}</TableCell>
                  <TableCell>
                    <Chip label={app.status} color={app.status === "approved" ? "success" : app.status === "rejected" ? "error" : "warning"} size="small" />
                  </TableCell>
                  <TableCell>
                    {app.status === "pending" && (
                      actionLoading === app.id ? <CircularProgress size={20} /> : (
                        <>
                          <Button onClick={() => handleStatusChange(app.id, "approved")} color="success" size="small" sx={{ mr: 1 }}>Approve</Button>
                          <Button onClick={() => handleStatusChange(app.id, "rejected")} color="error" size="small">Reject</Button>
                        </>
                      )
                    )}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  <Typography sx={{ py: 3, color: 'text.secondary' }}>No pending appointments found.</Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}