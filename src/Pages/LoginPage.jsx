import React from 'react';
import { Container, Form, Button, Card } from 'react-bootstrap';

const LoginPage = () => (
  <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
    <Card className="p-4 shadow" style={{ width: '400px' }}>
      <h2 className="text-center mb-4 fw-bold">Login to Eventara</h2>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email Address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>

        <Button variant="primary" type="submit" className="w-100">
          Login
        </Button>
      </Form>
    </Card>
  </Container>
);

export default LoginPage;
