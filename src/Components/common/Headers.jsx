import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Container, Nav, Image } from 'react-bootstrap';

import Icon from '../../assets/icon.png';
import '../../assets/styles/Header.css';

const Headers = ({ isTransparent = true, onLogout }) => {
  const handleLogout = () => {
    // Call the onLogout prop if provided (for state management)
    if (onLogout) {
      onLogout();
    }
    
    
  };

  return (
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
          <Nav className="ms-auto">
            <Nav.Link 
              as={Link} 
              to="/"
               variant="outline-light" size="sm"
              onClick={handleLogout}
            >
              Logout
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Headers;


