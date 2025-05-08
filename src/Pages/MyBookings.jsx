import React, { useState } from 'react';
import { Container, Row, Col, Card, Badge, Button } from 'react-bootstrap';
import UserBillNotification from './UserBillNotification';

const dummyBookings = [
  {
    id: 1,
    eventType: 'Wedding',
    eventDate: '2025-12-15',
    bookingStatus: 'Approved',
    paymentStatus: 'Half Paid',
    totalAmount: 100000,
    paidAmount: 50000,
    dueAmount: 50000,
    hasBill: true,
  },
  {
    id: 2,
    eventType: 'Birthday Party',
    eventDate: '2025-10-05',
    bookingStatus: 'Pending',
    paymentStatus: 'Pending',
    totalAmount: 0,
    paidAmount: 0,
    dueAmount: 0,
    hasBill: false,
  },
  {
    id: 3,
    eventType: 'Corporate Event',
    eventDate: '2025-08-20',
    bookingStatus: 'Approved',
    paymentStatus: 'Pending',
    totalAmount: 80000,
    paidAmount: 0,
    dueAmount: 80000,
    hasBill: true,
    hasNewBill: true,  // This indicates a new bill notification
  },
];

const MyBookings = () => {
  const [showBillModal, setShowBillModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [bookings, setBookings] = useState(dummyBookings);

  const handleViewBill = (booking) => {
    setSelectedBooking(booking);
    setShowBillModal(true);
    
    // Clear notification flag if present
    if (booking.hasNewBill) {
      const updatedBookings = bookings.map(b => {
        if (b.id === booking.id) {
          return { ...b, hasNewBill: false };
        }
        return b;
      });
      setBookings(updatedBookings);
    }
  };

  const handleCloseBillModal = () => {
    setShowBillModal(false);
  };

  return (
    <Container className="py-5" style={{ minHeight: '80vh', marginTop: '86px' }}>
      <h2 className="fw-bold mb-4 text-center">My Bookings</h2>
      
      {/* Alert for new bookings - this will appear if there are any new bills */}
      {bookings.some(booking => booking.hasNewBill) && (
        <div className="alert alert-info mb-4" role="alert">
          <i className="bi bi-bell-fill me-2"></i>
          You have new approved bookings with pending payments!
        </div>
      )}
      
      <Row className="g-4">
        {bookings.map((booking) => (
          <Col md={4} key={booking.id}>
            <Card className={`shadow-sm ${booking.hasNewBill ? 'border-primary' : ''}`}>
              {booking.hasNewBill && (
                <div className="position-absolute top-0 end-0 m-2">
                  <Badge bg="primary" pill>New</Badge>
                </div>
              )}
              <Card.Body>
                <Card.Title>{booking.eventType}</Card.Title>
                <Card.Text>
                  <strong>Date:</strong> {booking.eventDate} <br />
                  <strong>Booking Status:</strong>{' '}
                  <Badge bg={
                    booking.bookingStatus === 'Approved' ? 'success' :
                    booking.bookingStatus === 'Pending' ? 'warning' :
                    'danger'
                  }>
                    {booking.bookingStatus}
                  </Badge> <br />
                  <strong>Payment Status:</strong>{' '}
                  <Badge bg={
                    booking.paymentStatus === 'Half Paid' ? 'info' :
                    booking.paymentStatus === 'Pending' ? 'warning' :
                    booking.paymentStatus === 'Fully Paid' ? 'success' :
                    'secondary'
                  }>
                    {booking.paymentStatus}
                  </Badge>
                  
                  {booking.bookingStatus === 'Approved' && (
                    <>
                      <br />
                      <strong>Total Amount:</strong> ₹{booking.totalAmount} <br />
                      {booking.paymentStatus !== 'Pending' && (
                        <>
                          <strong>Paid:</strong> ₹{booking.paidAmount} <br />
                          <strong>Due:</strong> ₹{booking.dueAmount}
                        </>
                      )}
                    </>
                  )}
                </Card.Text>
                
                <div className="d-grid gap-2">
                  {booking.hasBill && (
                    <Button 
                      variant={booking.hasNewBill ? "primary" : "outline-primary"}
                      onClick={() => handleViewBill(booking)}
                    >
                      {booking.hasNewBill ? "View New Bill" : "View Bill"}
                    </Button>
                  )}
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Bill modal */}
      <UserBillNotification 
        show={showBillModal}
        handleClose={handleCloseBillModal}
        bill={{
          id: selectedBooking?.id,
          eventType: selectedBooking?.eventType,
          eventDate: selectedBooking?.eventDate,
          totalAmount: selectedBooking?.totalAmount,
          breakdown: {
            venueCharge: 30000,
            cateringCharge: 35000,
            decorationCharge: 20000,
            photographyCharge: 8000,
            musicCharge: 5000,
            otherCharges: 2000
          },
          note: 'Thank you for choosing Eventara. Your special day is confirmed!'
        }}
      />
    </Container>
  );
};

export default MyBookings;