// src/Components/common/Footer.jsx
import React, { useState } from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEnvelope,
  faPhone,
  faMapMarkerAlt,
  faArrowUp,
} from '@fortawesome/free-solid-svg-icons';
import {
  faInstagram,
  faWhatsapp,
  faTwitter,
  faFacebook,
} from '@fortawesome/free-brands-svg-icons';

import Icon from '../../assets/icon.png';

import '../../assets/styles/Footer.css';

const Footer = () => {
  const [showScroll, setShowScroll] = useState(false);

  // Scroll-to-top logic
  const handleScroll = () => {
    if (window.scrollY > 300) {
      setShowScroll(true);
    } else {
      setShowScroll(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  React.useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <footer className="footer bg-dark text-white pt-5 pb-4">
      <Container>
        <Row className="mb-4">
          <Col md={4} className="mb-4 mb-md-0">
            <div className="footer-logo d-flex align-items-center mb-3">
              <img src={Icon} alt="Eventara" width="40" height="40" className="me-2 rounded-circle" />
              <h5 className="mb-0 fw-bold">Eventara</h5>
            </div>
            <p>
              Your one-stop solution for weddings, parties, and corporate events.
              Making your special events memorable with professional planning.
            </p>
          </Col>

          <Col md={4} className="mb-4 mb-md-0">
            <h6 className="fw-bold mb-3">Newsletter</h6>
            <Form className="newsletter-form d-flex">
              <Form.Control type="email" placeholder="Enter your email" className="me-2" />
              <Button variant="warning">Subscribe</Button>
            </Form>
            <div className="social-icons mt-3">
              <a href="#"><FontAwesomeIcon icon={faInstagram} /></a>
              <a href="#"><FontAwesomeIcon icon={faWhatsapp} /></a>
              <a href="#"><FontAwesomeIcon icon={faTwitter} /></a>
              <a href="#"><FontAwesomeIcon icon={faFacebook} /></a>
            </div>
          </Col>

          <Col md={4}>
            <h6 className="fw-bold mb-3">Contact Us</h6>
            <p><FontAwesomeIcon icon={faEnvelope} className="me-2" /> support@eventara.com</p>
            <p><FontAwesomeIcon icon={faPhone} className="me-2" /> +91 98765 43210</p>
            <p><FontAwesomeIcon icon={faMapMarkerAlt} className="me-2" /> Chennai, India</p>
          </Col>
        </Row>

        <hr className="border-light" />
        <p className="text-center mb-0">&copy; 2025 Eventara. All rights reserved.</p>
      </Container>

      {showScroll && (
        <Button variant="primary" className="scroll-top" onClick={scrollToTop}>
          <FontAwesomeIcon icon={faArrowUp} />
        </Button>
      )}
    </footer>
  );
};

export default Footer;
