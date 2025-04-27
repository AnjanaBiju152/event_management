import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import EventCard from './EventCard';

import marriageImg from '../../assets/images/services/wedding.jpg';

import birthdayImg from '../../assets/images/services/birthday.jpg';

import corporateImg from '../../assets/images/services/coperative.jpg';

const EventSection = () => (
  <section id="services" className="py-5 bg-light">
    <Container>
      <h2 className="text-center mb-4 fw-bold">Our Event Services</h2>
      <Row className="g-4">
        <Col md={4}>
          <EventCard
            image={marriageImg}
            title="Marriage Planning"
            description="Everything you need for a beautiful wedding: flowers, decor, photoshoot, destination, and more."
          />
        </Col>
        <Col md={4}>
          <EventCard
            image={birthdayImg}
            title="Birthday Parties"
            description="Celebrate birthdays in style with custom themes, cakes, music, games, and more!"
          />
        </Col>
        <Col md={4}>
          <EventCard
            image={corporateImg}
            title="Corporate Events"
            description="Plan professional and private gatherings with full service support and logistics."
          />
        </Col>
      </Row>
    </Container>
  </section>
);

export default EventSection;
