import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Container, Nav, Button, Image } from 'react-bootstrap';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faUser, faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import Icon from '../../assets/icon.png';
import '../../assets/styles/Header.css';

const Headers = ({ isTransparent = true }) => (
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
     
    </Container>
  </Navbar>
);

export default Headers;
