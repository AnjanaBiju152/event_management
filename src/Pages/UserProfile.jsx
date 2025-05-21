import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { FaUserCircle, FaArrowLeft } from "react-icons/fa";

const UserProfile = () => {
  return (
    <Container className="py-5" style={{ minHeight: '80vh', marginTop: '86px' }}>
      <div className="mb-4">
        <a href="/user/dashboard" className="text-decoration-none text-secondary">
          <FaArrowLeft className="me-2" />
          Back
        </a>
      </div>
      <Row className="justify-content-center">
        <Col md={6}>
          <Card className="text-center shadow p-4">
            <FaUserCircle size={100} className="mb-3" />
            <Card.Title>Anjana</Card.Title>
            <Card.Text>Email: anjana@example.com</Card.Text>
            <Button variant="primary">Edit Profile</Button>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default UserProfile; 