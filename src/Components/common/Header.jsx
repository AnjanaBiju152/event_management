
import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Container, Nav, Button, Image } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import Icon from '../../assets/icon.png';
import '../../assets/styles/Header.css';

const Header = ({ isTransparent = true }) => (
  <Navbar 
    expand="lg" 
    fixed="top" 
    className={`navbar-dark py-3 ${isTransparent ? 'bg-transparent' : 'bg-primary shadow-sm'}`}
    style={{ transition: 'background-color 0.3s ease' }}
  >
    <Container>
    
      <Navbar.Brand as={Link} to="/" className="fw-bold d-flex align-items-center text-white">
        <Image
          src={Icon}
          alt="Eventara Logo"
          width="40"
          height="40"
          className="me-2"
        />
        <span className="brand-text">Eventara</span>
      </Navbar.Brand>

      <Navbar.Toggle aria-controls="navbar-nav" />
      <Navbar.Collapse id="navbar-nav">
        
        <Nav className="mx-auto">
          <Nav.Link as={Link} to="/" className="text-white">Home</Nav.Link>
          <Nav.Link as={Link} to="/about" className="text-white">About Us</Nav.Link>
          <Nav.Link as={Link} to="/services" className="text-white">Services</Nav.Link>
          <Nav.Link as={Link} to="/gallery" className="text-white">Gallery</Nav.Link>
          <Nav.Link as={Link} to="/review" className="text-white">Reviews</Nav.Link>
          <Nav.Link as={Link} to="/contact" className="text-white">Contact Us</Nav.Link>
        </Nav>

        
        <div className="d-flex gap-2">
          <Button as={Link} to="/login" variant="outline-light" size="sm">
            <FontAwesomeIcon icon={faSignInAlt} className="me-2" />
            Login
          </Button>
          <Button as={Link} to="/register" variant="light" size="sm">
            <FontAwesomeIcon icon={faUser} className="me-2" />
            Register
          </Button>
        </div>
      </Navbar.Collapse>
    </Container>
  </Navbar>
);

export default Header;
