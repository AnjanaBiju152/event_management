import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Sidebar from '../Components/common/Sidebar';

const userLinks = [

  { name: 'Book Event', path: '/user/book-event' },
  { name: 'My Bookings', path: '/user/bookings' },
  { name: 'Payments', path: '/user/payments' },
  { name: 'Logout', path: '/' },
];

const UserDashboard = () => {
  const [name, setName] = useState("");

  useEffect(() => {
    const userData = sessionStorage.getItem("existingUser");
    if (userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setName(parsedUser?.name || "User");
      } catch (error) {
        console.error("Invalid JSON in sessionStorage:", error);
      }
    } else {
      setName("User"); // fallback if session is empty
    }
  }, []);

  return (
    <Container fluid className="p-0" style={{ minHeight: '80vh', marginTop: '86px' }}>
      <Row>
        <Col md={3}>
          <Sidebar links={userLinks} />
        </Col>
        <Col md={9} className="p-4">
          <h2 className="fw-bold mb-4">Welcome {name}</h2>
          <p>Book events, manage your bookings, and track your payments here.</p>

          <div className="timeline mt-5">
            <h5>Event Progress</h5>
            <div className="timeline-item">
              <div className="timeline-marker bg-primary"></div>
              <div className="timeline-content">
                <h6>Request Submitted</h6>
                <p>Your event request has been sent to our team.</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-marker bg-warning"></div>
              <div className="timeline-content">
                <h6>Pending Review</h6>
                <p>Our team is reviewing your request.</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-marker bg-success"></div>
              <div className="timeline-content">
                <h6>Approved</h6>
                <p>Your event has been approved. Proceed to payment.</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-marker bg-info"></div>
              <div className="timeline-content">
                <h6>Partially Paid</h6>
                <p>Partial payment received. Balance due before event.</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-marker bg-success"></div>
              <div className="timeline-content">
                <h6>Fully Paid</h6>
                <p>All payments completed. Your event is confirmed!</p>
              </div>
            </div>
          </div>

          <style jsx="true">{`
            .timeline {
              position: relative;
              padding-left: 30px;
            }
            .timeline:before {
              content: '';
              position: absolute;
              left: 10px;
              top: 0;
              height: 100%;
              width: 2px;
              background: #e9ecef;
            }
            .timeline-item {
              position: relative;
              padding-bottom: 20px;
            }
            .timeline-marker {
              position: absolute;
              left: -30px;
              top: 0;
              width: 20px;
              height: 20px;
              border-radius: 50%;
            }
            .timeline-content {
              padding-bottom: 10px;
              border-bottom: 1px solid #e9ecef;
            }
          `}</style>
        </Col>
      </Row>
    </Container>
  );
};

export default UserDashboard;
