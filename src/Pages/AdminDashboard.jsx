import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import Sidebar from '../Components/common/Sidebar';

const adminLinks = [
  
  { name: 'My Profile', path: '/admin/profile' },
  { name: 'Manage Bookings', path: '/admin/bookings' },
  { name: 'Approve Payments', path: '/admin/payments' },
  { name: 'Send Alerts', path: '/admin/alerts' },
  { name: 'Logout', path: '/' },
];

const AdminDashboard = () => (
  <Container fluid className="p-0" style={{ minHeight: '80vh', marginTop: '86px' }}>
    <Row noGutters>
      <Col md={3}>
        <Sidebar links={adminLinks} />
      </Col>
      <Col md={9} className="p-4">
        <h2 className="fw-bold mb-4">Welcome, Admin!</h2>
        <p>Manage user bookings, approve payments, and send event notifications here.</p>
        <Row className="g-4">
          <Col md={3}>
            <Card className="text-center shadow-sm">
              <Card.Body>
                <Card.Title>Total Requests</Card.Title>
                <Card.Text className="fs-3 fw-bold">25</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="text-center shadow-sm bg-warning bg-opacity-10">
              <Card.Body>
                <Card.Title>Pending</Card.Title>
                <Card.Text className="fs-3 fw-bold">10</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="text-center shadow-sm bg-success bg-opacity-10">
              <Card.Body>
                <Card.Title>Approved</Card.Title>
                <Card.Text className="fs-3 fw-bold">12</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="text-center shadow-sm bg-danger bg-opacity-10">
              <Card.Body>
                <Card.Title>Rejected</Card.Title>
                <Card.Text className="fs-3 fw-bold">3</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Col>
    </Row>
  </Container>
);

export default AdminDashboard;