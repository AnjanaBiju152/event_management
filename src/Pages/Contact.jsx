import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import '../assets/styles/About.css';

const Contact = () => {
  return (
    <section className="cta-section py-5">
      <div className="cta-overlay"></div>
      <Container className="position-relative">
        <Row className="justify-content-center text-center">
          <Col lg={8}>
            <div className="cta-content text-white">
              <h2 className="cta-title mb-4">Ready to Plan Your Perfect Event?</h2>
              <p className="cta-text lead mb-4" style={{color:'black'}}>
                Let's create an unforgettable experience together. Contact us today to start planning your next event.
              </p>
              <div className="cta-buttons" >
                <Button 
                  as={Link} 
                  to="/contact" 
                  variant="primary" 
                  size="lg" 
                  className="me-3 mb-2 mb-md-0"
                >
                  <FontAwesomeIcon icon={faCalendarAlt} className="me-2" />
                  Contact us
                </Button>
                
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Contact;