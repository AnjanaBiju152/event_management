import React from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { FaUserCircle, FaArrowLeft } from "react-icons/fa";

const AdminAlert = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const userEmail = e.target.userEmail.value;
    const subject = e.target.subject.value;
    const message = e.target.message.value;
    if (userEmail && subject && message) {
      if (window.confirm(`Send alert to ${userEmail}?`)) {
        alert(`Alert sent to ${userEmail}: ${subject}`);
      }
    } else {
      alert('Please fill in all fields.');
    }
  };

  return (
    <Container className="py-5" style={{ minHeight: '80vh', marginTop: '86px' }}>
      <div className="mb-4">
        <a href="/admin/dashboard" className="text-decoration-none text-secondary">
          <FaArrowLeft className="me-2" />
          Back 
        </a>
      </div>
      <h2 className="fw-bold mb-4 text-center">Send Alerts to Users</h2>
      <Form className="shadow-sm p-4 bg-light rounded" onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="userEmail">
          <Form.Label>Select User Email</Form.Label>
          <Form.Select name="userEmail" required>
            <option value="">Select a User</option>
            <option value="johndoe@example.com">johndoe@example.com</option>
            <option value="janesmith@example.com">janesmith@example.com</option>
            <option value="mikejohnson@example.com">mikejohnson@example.com</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3" controlId="subject">
          <Form.Label>Subject</Form.Label>
          <Form.Control type="text" name="subject" placeholder="Enter Subject" required />
        </Form.Group>
        <Form.Group className="mb-3" controlId="message">
          <Form.Label>Message</Form.Label>
          <Form.Control
            as="textarea"
            rows={5}
            name="message"
            placeholder="Write your message here..."
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Send Alert
        </Button>
      </Form>
    </Container>
  );
};

export default AdminAlert;
