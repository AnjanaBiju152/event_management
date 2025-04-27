import React from 'react';
import { Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const SubServiceCard = ({ icon, title }) => (
  <Card className="text-center p-3 border-0 shadow-sm h-100">
    <FontAwesomeIcon icon={icon} size="3x" className="mb-3 text-primary" />
    <Card.Body>
      <Card.Title className="fw-bold">{title}</Card.Title>
    </Card.Body>
  </Card>
);

export default SubServiceCard;
