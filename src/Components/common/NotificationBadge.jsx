import React from 'react';
import { Badge } from 'react-bootstrap';

// This component can be added to your admin navbar to show pending notifications
const NotificationBadge = ({ count }) => {
  return count > 0 ? (
    <Badge 
      bg="danger" 
      className="position-absolute top-0 start-100 translate-middle rounded-pill"
      style={{ fontSize: '0.6rem' }}
    >
      {count}
      <span className="visually-hidden">New notifications</span>
    </Badge>
  ) : null;
};

export default NotificationBadge;