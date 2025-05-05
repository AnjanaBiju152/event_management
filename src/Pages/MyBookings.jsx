import React from 'react';
import { Container, Row, Col, Card, Badge } from 'react-bootstrap';

const dummyBookings = [
  {
    id: 1,
    eventType: 'Wedding',
    eventDate: '2025-12-15',
    bookingStatus: 'Approved',
    paymentStatus: 'Half Paid',
  },
  {
    id: 2,
    eventType: 'Birthday Party',
    eventDate: '2025-10-05',
    bookingStatus: 'Pending',
    paymentStatus: 'Pending',
  },
  {
    id: 3,
    eventType: 'Corporate Event',
    eventDate: '2025-08-20',
    bookingStatus: 'Cancelled',
    paymentStatus: 'Refunded',
  },
];

const MyBookings = () => (
  <Container className="py-5"  style={{ minHeight: '80vh',marginTop:'86px'}}>
    <h2 className="fw-bold mb-4 text-center">My Bookings</h2>
    <Row className="g-4">
      {dummyBookings.map((booking) => (
        <Col md={4} key={booking.id}>
          <Card className="shadow-sm">
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
                  'secondary'
                }>
                  {booking.paymentStatus}
                </Badge>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  </Container>
);

export default MyBookings;
