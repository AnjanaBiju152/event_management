// Assuming this is your AdminDashboard.jsx structure
import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap'; // Make sure Row is imported
import Sidebar from '../Components/common/Sidebar'; // Adjust path if needed
// Import any other components or APIs used in AdminDashboard

const adminLinks = [
  { name: 'Manage Bookings', path: '/admin/bookings' },
  { name: 'Approve Payments', path: '/admin/payments' },
  { name: 'Send Alerts', path: '/admin/alerts' },
  { name: 'Logout', path: '/' },
];

const AdminDashboard = () => {
  // You would typically fetch dashboard statistics here
  // For demonstration, using dummy data
  const stats = {
    totalRequests: 25,
    pendingRequests: 10,
    approvedRequests: 12,
    rejectedRequests: 3,
  };

  return (
    <Container fluid className="p-0" style={{ minHeight: '80vh', marginTop: '86px' }}>
      <Row className="g-0"> {/* FIX: Changed noGutters to className="g-0" */}
        <Col md={3}>
          <Sidebar links={adminLinks} />
        </Col>
        <Col md={9} className="p-4">
          <h2 className="fw-bold mb-4">Admin Dashboard Overview</h2>

          <Row className="mb-4">
            <Col md={6} lg={3} className="mb-3">
              <Card className="shadow-sm">
                <Card.Body>
                  <h5 className="card-title text-muted">Total Requests</h5>
                  <h3 className="card-text fw-bold text-primary">{stats.totalRequests}</h3>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6} lg={3} className="mb-3">
              <Card className="shadow-sm">
                <Card.Body>
                  <h5 className="card-title text-muted">Pending Requests</h5>
                  <h3 className="card-text fw-bold text-warning">{stats.pendingRequests}</h3>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6} lg={3} className="mb-3">
              <Card className="shadow-sm">
                <Card.Body>
                  <h5 className="card-title text-muted">Approved Requests</h5>
                  <h3 className="card-text fw-bold text-success">{stats.approvedRequests}</h3>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6} lg={3} className="mb-3">
              <Card className="shadow-sm">
                <Card.Body>
                  <h5 className="card-title text-muted">Rejected Requests</h5>
                  <h3 className="card-text fw-bold text-danger">{stats.rejectedRequests}</h3>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* You can add more dashboard content here, e.g., recent activities, charts */}
          
        </Col>
      </Row>
    </Container>
  );
};

export default AdminDashboard;