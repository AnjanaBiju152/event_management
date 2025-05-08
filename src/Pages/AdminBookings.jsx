import React, { useState } from 'react';
import { Container, Table, Button, Badge } from 'react-bootstrap';
import AdminBookingDetail from './AdminBookingDetail';

const dummyAdminBookings = [
  {
    id: 1,
    userName: 'John Doe',
    eventType: 'Wedding',
    eventDate: '2025-12-15',
    status: 'Pending',
    flowerDesign: 'Modern',
    photography: 'Premium Photoshoot',
    catering: 'Mixed Menu',
    decoration: 'Royal Theme',
    music: 'DJ',
    destination: 'No'
  },
  {
    id: 2,
    userName: 'Jane Smith',
    eventType: 'Birthday Party',
    eventDate: '2025-10-05',
    status: 'Approved',
    flowerDesign: 'Traditional',
    photography: 'Standard Photoshoot',
    catering: 'Veg',
    decoration: 'Classic Theme',
    music: 'Live Band',
    destination: 'No'
  },
  {
    id: 3,
    userName: 'Mike Johnson',
    eventType: 'Corporate Event',
    eventDate: '2025-08-20',
    status: 'Pending',
    flowerDesign: 'Exotic',
    photography: 'Drone Coverage',
    catering: 'Non-Veg',
    decoration: 'Beach Theme',
    music: 'Traditional Dance Group',
    destination: 'No'
  },
];

const ImprovedAdminBookings = () => {
  const [bookings, setBookings] = useState(dummyAdminBookings);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  // Handle booking status change
  const handleApprove = (bookingId) => {
    const booking = bookings.find(b => b.id === bookingId);
    setSelectedBooking(booking);
    setShowDetailModal(true);
  };

  const handleReject = (bookingId) => {
    const updatedBookings = bookings.map(booking => {
      if (booking.id === bookingId) {
        return { ...booking, status: 'Rejected' };
      }
      return booking;
    });
    setBookings(updatedBookings);
  };

  const handleCloseModal = () => {
    setShowDetailModal(false);
    // Update the status in our dummy data (in real app would connect to API)
    const updatedBookings = bookings.map(booking => {
      if (booking.id === selectedBooking?.id) {
        return { ...booking, status: 'Approved' };
      }
      return booking;
    });
    setBookings(updatedBookings);
  };

  return (
    <Container className="py-5" style={{ minHeight: '80vh', marginTop: '86px' }}>
      <h2 className="fw-bold mb-4 text-center">Manage Bookings</h2>
      <Table striped bordered hover responsive className="shadow-sm">
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>User Name</th>
            <th>Event Type</th>
            <th>Event Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking, index) => (
            <tr key={booking.id}>
              <td>{index + 1}</td>
              <td>{booking.userName}</td>
              <td>{booking.eventType}</td>
              <td>{booking.eventDate}</td>
              <td>
                <Badge bg={
                  booking.status === 'Approved' ? 'success' :
                  booking.status === 'Rejected' ? 'danger' :
                  'warning'
                }>
                  {booking.status}
                </Badge>
              </td>
              <td>
                {booking.status === 'Pending' && (
                  <>
                    <Button 
                      variant="success" 
                      size="sm" 
                      className="me-2"
                      onClick={() => handleApprove(booking.id)}
                    >
                      Review & Price
                    </Button>
                    <Button 
                      variant="danger" 
                      size="sm"
                      onClick={() => handleReject(booking.id)}
                    >
                      Reject
                    </Button>
                  </>
                )}
                {booking.status === 'Approved' && (
                  <Button variant="info" size="sm">
                    View Details
                  </Button>
                )}
                {booking.status === 'Rejected' && (
                  <Badge bg="secondary">No Actions</Badge>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Detail Modal for Pricing */}
      <AdminBookingDetail 
        show={showDetailModal} 
        handleClose={handleCloseModal} 
        booking={selectedBooking}
      />
    </Container>
  );
};

export default ImprovedAdminBookings;