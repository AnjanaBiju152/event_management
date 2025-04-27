import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import SubServiceCard from './SubServiceCard';
import {
  faUtensils,
  faCamera,
  faMusic,
  faPalette,
  faMapMarkerAlt,
  faGlassCheers,
} from '@fortawesome/free-solid-svg-icons';

const SubServicesSection = () => (
  <section className="py-5 bg-white">
    <Container>
      <h2 className="text-center mb-4 fw-bold">Additional Services</h2>
      <Row className="g-4">
        <Col md={4} lg={3}>
          <SubServiceCard icon={faUtensils} title="Catering" />
        </Col>
        <Col md={4} lg={3}>
          <SubServiceCard icon={faCamera} title="Photography" />
        </Col>
        <Col md={4} lg={3}>
          <SubServiceCard icon={faMusic} title="Music & Entertainment" />
        </Col>
        <Col md={4} lg={3}>
          <SubServiceCard icon={faPalette} title="Decor & Design" />
        </Col>
        <Col md={4} lg={3}>
          <SubServiceCard icon={faMapMarkerAlt} title="Destination Setup" />
        </Col>
        <Col md={4} lg={3}>
          <SubServiceCard icon={faGlassCheers} title="Theme Parties" />
        </Col>
      </Row>
    </Container>
  </section>
);

export default SubServicesSection;
