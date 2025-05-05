import React from 'react';
import { Container, Form, Button } from 'react-bootstrap';

const AdminAlert = () => {
  return (
    <Container className="py-5"  style={{ minHeight: '80vh' ,marginTop:'86px'}}>
      <h2 className="fw-bold mb-4 text-center">Send Alerts to Users </h2>

      <Form className="shadow-sm p-4 bg-light rounded">
        <Form.Group className="mb-3" controlId="userEmail">
          <Form.Label>Select User Email</Form.Label>
          <Form.Select>
            <option>Select a User</option>
            <option>johndoe@example.com</option>
            <option>janesmith@example.com</option>
            <option>mikejohnson@example.com</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3" controlId="subject">
          <Form.Label>Subject</Form.Label>
          <Form.Control type="text" placeholder="Enter Subject" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="message">
          <Form.Label>Message</Form.Label>
          <Form.Control as="textarea" rows={5} placeholder="Write your message here..." />
        </Form.Group>

        <Button variant="primary" type="submit">
          Send Alert
        </Button>
      </Form>
    </Container>
  );
};

export default AdminAlert;
