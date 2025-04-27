import React from 'react';
import { Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const ReviewCard = ({ name, image, review }) => (
  <Card className="text-center p-3 border-0 shadow-sm h-100">
    <Card.Img
      variant="top"
      src={image}
      alt={name}
      className="rounded-circle mx-auto mt-3"
      style={{ width: '80px', height: '80px', objectFit: 'cover' }}
    />
    <Card.Body>
      <Card.Title className="fw-bold">{name}</Card.Title>
      <div className="text-warning mb-2">
        {[...Array(5)].map((_, i) => (
          <FontAwesomeIcon icon={faStar} key={i} />
        ))}
      </div>
      <Card.Text className="fst-italic">"{review}"</Card.Text>
    </Card.Body>
  </Card>
);

export default ReviewCard;
