// frontend/src/Pages/AdminBookings.jsx
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Container, Table, Badge } from 'react-bootstrap';
import { FaArrowLeft } from 'react-icons/fa';
import { getAllBookingsApi } from '../services/allApi';
import AdminBookingDetail from '../Pages/AdminBookingDetail';

const AdminBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const fetchBookings = async () => {
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
        setBookings(result.data);
        toast.success('Bookings fetched successfully!');
      } else {
        const errorMessage = result.data?.message || 'Failed to fetch bookings.';
        setError(errorMessage);
        toast.error(errorMessage);
      }
    } catch (err) {
      console.error('Error in fetchBookings:', err);
      setError('An unexpected error occurred while fetching bookings.');
      toast.error('An error occurred.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleRowClick = (booking) => {
    setSelectedBooking(booking);
    setShowModal(true);
  };

  const handleModalClose = (refresh = false) => {
    setShowModal(false);
    setSelectedBooking(null);
    if (refresh) {
      fetchBookings();
    }
  };

  if (loading) {
    return <div className="container mt-5"><p>Loading bookings...</p></div>;
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
      <h2 className="fw-bold mb-4 text-center">Admin Bookings</h2>
      {bookings.length > 0 ? (
        <>
          <Table striped bordered hover responsive className="shadow-sm">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>User</th>
                <th>Event Type</th>
                <th>Date</th>
                <th>Status</th>
                <th>Total Amount</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking._id} onClick={() => handleRowClick(booking)} style={{ cursor: 'pointer' }}>
                  <td>{booking._id.slice(-6)}</td>
                  <td>{booking.userId?.name || booking.userId?.username || 'N/A'}</td>
                  <td>{booking.eventType || 'N/A'}</td>
                  <td>{booking.eventDate ? new Date(booking.eventDate).toLocaleDateString() : 'N/A'}</td>
                  <td>
                    <Badge
                      bg={
                        booking.bookingStatus === 'Approved'
                          ? 'success'
                          : booking.bookingStatus === 'Rejected'
                            ? 'danger'
                            : booking.bookingStatus === 'Cancelled'
                              ? 'secondary'
                              : 'warning'
                      }
                    >
                      {booking.bookingStatus}
                    </Badge>
                  </td>
                  <td>₹{booking.totalEstimate?.toLocaleString() || '0'}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          {selectedBooking && (
            <AdminBookingDetail
              show={showModal}
              handleClose={handleModalClose}
              booking={selectedBooking}
            />
          )}
        </>
      ) : (
        <p className="text-center">No bookings found.</p>
      )}
    </Container>
  );
};

export default AdminBookings;