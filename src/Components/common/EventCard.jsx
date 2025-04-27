import React from 'react';
import { Card } from 'react-bootstrap';

const EventCard = ({ image, title, description }) => (
  <Card className="shadow-sm border-0">
    <Card.Img variant="top" src={image} height={200} style={{ objectFit: 'cover' }} />
    <Card.Body>
      <Card.Title className="fw-bold">{title}</Card.Title>
      <Card.Text>{description}</Card.Text>
    </Card.Body>
  </Card>
);

export default EventCard;
