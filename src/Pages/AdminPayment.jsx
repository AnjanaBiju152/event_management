// frontend/src/Pages/AdminPayment.jsx
import React, { useState, useEffect } from 'react';
import { Container, Table, Badge } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { getAllBookingsApi } from '../services/allApi';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

const AdminPayment = () => {
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchPaymentHistory = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = sessionStorage.getItem('token');
      if (!token) {
        toast.error('Authentication required. Please log in.');
        navigate('/login');
        setLoading(false);
        return;
      }

      const result = await getAllBookingsApi(token);

      if (result.status === 200) {
        // Flatten paymentHistory from all bookings
        const history = result.data
          .filter((booking) => booking.paymentHistory && booking.paymentHistory.length > 0)
          .map((booking) =>
            booking.paymentHistory.map((payment) => ({
              bookingId: booking._id,
              user: booking.user?.username || 'N/A',
              eventType: booking.eventType || 'N/A',
              totalEstimate: booking.totalEstimate || 0,
              paymentStatus: booking.paymentStatus,
              amountPaid: payment.amountPaid,
              paymentDate: payment.paymentDate,
              paymentMethod: payment.paymentMethod,
              status: payment.status,
            }))
          )
          .flat();

        setPaymentHistory(history);
        toast.success('Payment history fetched successfully!');
        console.log('Payment history:', history);
      } else {
        const errorMessage = result.data?.message || 'Failed to fetch payment history.';
        setError(errorMessage);
        toast.error(errorMessage);
      }
    } catch (err) {
      console.error('Error fetching payment history:', err);
      setError('An unexpected error occurred while fetching payment history.');
      toast.error('An error occurred.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPaymentHistory();
  }, []);

  if (loading) {
    return <div className="container mt-5"><p>Loading payment history...</p></div>;
  }

  if (error) {
    return <div className="container mt-5"><p className="text-danger">Error: {error}</p></div>;
  }

  return (
    <Container className="py-5" style={{ minHeight: '80vh', marginTop: '86px' }}>
      <div className="mb-4">
        <a href="/admin/dashboard" className="text-decoration-none text-secondary">
          <FaArrowLeft className="me-2" />
          Back
        </a>
      </div>
      <h2 className="fw-bold mb-4 text-center">Payment History</h2>
      {paymentHistory.length > 0 ? (
        <Table striped bordered hover responsive className="shadow-sm">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Booking ID</th>
              <th>User</th>
              <th>Event Type</th>
              <th>Total Amount</th>
              <th>Amount Paid</th>
              <th>Payment Date</th>
              <th>Payment Method</th>
              <th>Payment Status</th>
            </tr>
          </thead>
          <tbody>
            {paymentHistory.map((payment, index) => (
              <tr key={`${payment.bookingId}-${index}`}>
                <td>{index + 1}</td>
                <td>{payment.bookingId.slice(-6)}</td>
                <td>{payment.user}</td>
                <td>{payment.eventType}</td>
                <td>₹{payment.totalEstimate.toLocaleString()}</td>
                <td>₹{payment.amountPaid.toLocaleString()}</td>
                <td>{new Date(payment.paymentDate).toLocaleString()}</td>
                <td>{payment.paymentMethod}</td>
                <td>
                  <Badge
                    bg={
                      payment.status === 'Completed'
                        ? 'success'
                        : payment.status === 'Pending'
                          ? 'warning'
                          : 'danger'
                    }
                  >
                    {payment.status}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <p className="text-center">No payment history found.</p>
      )}
    </Container>
  );
};

export default AdminPayment;