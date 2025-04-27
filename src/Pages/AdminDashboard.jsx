import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Sidebar from '../Components/common/Sidebar';


const adminLinks = [
  { name: 'Dashboard', path: '/admin/dashboard' },
  { name: 'Manage Bookings', path: '/admin/bookings' },
  { name: 'Approve Payments', path: '/admin/payments' },
  { name: 'Send Mails', path: '/admin/alerts' },
  { name: 'Logout', path: '/' },
  
];

const AdminDashboard = () => (
  <Container fluid className="p-0">
    <Row noGutters="true">
      <Col md={3}>
        <Sidebar links={adminLinks} />
      </Col>
      <Col md={9} className="p-4">
        <h2 className="fw-bold mb-4">Welcome, Admin!</h2>
        <p>Manage user bookings, approve payments, and send event notifications here.</p>
        {/* Later show booking lists, approval buttons, etc */}
      </Col>
    </Row>
  </Container>
);

export default AdminDashboard;
