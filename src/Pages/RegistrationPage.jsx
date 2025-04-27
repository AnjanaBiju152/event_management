import React from 'react';
import { Container, Form, Button, Card } from 'react-bootstrap';

const RegisterPage = () => (
  <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
    <Card className="p-4 shadow" style={{ width: '400px' }}>
      <h2 className="text-center mb-4 fw-bold">Register at Eventara</h2>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Full Name</Form.Label>
          <Form.Control type="text" placeholder="Enter full name" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email Address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control type="password" placeholder="Confirm password" />
        </Form.Group>

        <Button variant="success" type="submit" className="w-100">
          Register
        </Button>
      </Form>
    </Card>
  </Container>
);

export default RegisterPage;
