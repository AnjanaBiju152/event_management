import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ReviewCard from './ReviewCard';

import user1 from '../../assets/images/review/user4.jpeg';
import user2 from '../../assets/images/review/user2.jpeg';
import user3 from '../../assets/images/review/user3.jpeg';

const ReviewsSection = () => (
  <section id="reviews" className="py-5 bg-light">
    <Container>
      <h2 className="text-center mb-4 fw-bold">What Our Customers Say</h2>
      <Row className="g-4">
        <Col md={4}>
          <ReviewCard
            name="Anjali S."
            image={user1}
            review="Eventara made my wedding stress-free and magical. Loved the decor and coordination!"
          />
        </Col>
        <Col md={4}>
          <ReviewCard
            name="Rahul M."
            image={user2}
            review="Amazing birthday setup for my son — the music and theme were spot on!"
          />
        </Col>
        <Col md={4}>
          <ReviewCard
            name="Priya R."
            image={user3}
            review="Our company event was professionally handled, guests were super impressed."
          />
        </Col>
      </Row>
    </Container>
  </section>
);

export default ReviewsSection;
