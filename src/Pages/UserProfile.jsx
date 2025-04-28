import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";

const UserProfile = () => {
  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card className="text-center shadow p-4">
            <FaUserCircle size={100} className="mb-3" />
            <Card.Title>User Name</Card.Title>
            <Card.Text>Email: user@example.com</Card.Text>
            <Button variant="primary">Edit Profile</Button>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default UserProfile;
