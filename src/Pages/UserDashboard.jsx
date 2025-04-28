import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Sidebar from '../Components/common/Sidebar';

const userLinks = [
  { name: 'My Profile', path: '/user/profile' },
  { name: 'Book Event', path: '/user/book-event' },
  { name: 'My Bookings', path: '/user/bookings' },
  { name: 'Payments', path: '/user/payments' },
  { name: 'Logout', path: '/' },
];

const UserDashboard = () => (
  <Container fluid className="p-0">
    <Row noGutters="true">
      <Col md={3}>
        <Sidebar links={userLinks} />
      </Col>
      <Col md={9} className="p-4">
        <h2 className="fw-bold mb-4">Welcome, User!</h2>
        <p>Here you can book events, manage your bookings, and check your payments.</p>
      
      </Col>
    </Row>
  </Container>
);

export default UserDashboard;
