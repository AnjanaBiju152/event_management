import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const AdminHome = () => {
  return (
    <Container className="py-5"  style={{ minHeight: '80vh' ,paddingTop:'100px' ,paddingBottom:'40px' }}>
      <h1 className="fw-bold mb-4 text-center">Welcome Admin </h1>
      <Row className="g-4">
        <Col md={4}>
          <Card className="shadow-sm text-center">
            <Card.Body>
              <Card.Title className="fs-3">Total Bookings</Card.Title>
              <Card.Text className="fs-2 fw-bold">120</Card.Text>
              <Button variant="primary" href="/admin/bookings" size="sm">
                View Bookings
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="shadow-sm text-center">
            <Card.Body>
              <Card.Title className="fs-3">Payments Collected</Card.Title>
              <Card.Text className="fs-2 fw-bold">₹6,50,000</Card.Text>
              <Button variant="success" href="/admin/payments" size="sm">
                Manage Payments
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="shadow-sm text-center">
            <Card.Body>
              <Card.Title className="fs-3">Pending Approvals</Card.Title>
              <Card.Text className="fs-2 fw-bold">8</Card.Text>
              <Button variant="warning" href="/admin/bookings" size="sm">
                Approve Now
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="g-4 mt-5">
        <Col md={12}>
          <Card className="shadow-sm p-4 text-center">
            <h4>Manage your event bookings and ensure every client's dream day is perfect! 🌟</h4>
            <Button variant="dark" href="/admin/bookings" className="mt-3">
              Go to Bookings
            </Button>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminHome;
