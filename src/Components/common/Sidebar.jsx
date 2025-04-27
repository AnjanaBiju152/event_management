import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Sidebar = ({ links }) => (
  <div className="bg-dark text-white p-3 vh-100" style={{ width: '250px' }}>
    <h3 className="mb-4 text-center">Eventara</h3>
    <Nav className="flex-column">
      {links.map((link, index) => (
        <Nav.Link
          as={Link}
          to={link.path}
          key={index}
          className="text-white mb-2"
          style={{ fontSize: '18px' }}
        >
          {link.name}
        </Nav.Link>
      ))}
    </Nav>
  </div>
);

export default Sidebar;
