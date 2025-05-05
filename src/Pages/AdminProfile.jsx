import React from 'react';
import { Container, Card, Button, Row, Col } from 'react-bootstrap';

const AdminProfile = () => {
  return (
    <Container className="py-5"  style={{ minHeight: '80vh' ,marginTop:'85px' }}>
      <h2 className="fw-bold text-center mb-4">Admin Profile 👤</h2>

      <Row className="justify-content-center">
        <Col md={6}>
          <Card className="shadow-sm p-4">
            <Card.Body>
              <h4 className="fw-bold mb-3">Profile Information</h4>

              <p><strong>Name:</strong> Eventara Admin</p>
              <p><strong>Email:</strong> admin@eventara.com</p>
              <p><strong>Role:</strong> Administrator</p>

              <div className="d-flex justify-content-between mt-4">
                <Button variant="primary" size="sm">Edit Profile</Button>
                <Button variant="danger" size="sm">Logout</Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminProfile;
