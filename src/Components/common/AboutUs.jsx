import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import aboutImg from '../../assets/images/about/about.jpeg';

const AboutUs = () => (
  <section id="about" className="py-5 bg-white">
    <Container>
      <Row className="align-items-center">
        <Col md={6} className="mb-4 mb-md-0">
          <Image src={aboutImg} alt="About Eventara" fluid rounded />
        </Col>
        <Col md={6}>
          <h2 className="fw-bold">About Eventara</h2>
          <p className="lead">
            Eventara is your one-stop destination for planning unforgettable moments.
            Whether it's a wedding, birthday, corporate gathering, or private celebration — we make it magical.
          </p>
          <ul className="list-unstyled">
            <li>🎯 Personalized event planning experience</li>
            <li>🎉 Variety of services: decor, catering, photography, music & more</li>
            <li>📆 Real-time availability & admin approval system</li>
            <li>💳 Partial payment & easy booking system</li>
            <li>🌍 Destination weddings & beach celebrations</li>
          </ul>
        </Col>
      </Row>
    </Container>
  </section>
);

export default AboutUs;
