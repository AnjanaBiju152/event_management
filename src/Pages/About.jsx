import React from 'react';
import '../assets/styles/About.css';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCalendarCheck, 
  faUserFriends, 
  faClipboardCheck,
  faMagic 
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import aboutImg from '../assets/images/about/about2.jpeg';

const About = () => {
  const features = [
    {
      id: 1,
      icon: faCalendarCheck,
      title: 'Experienced Team',
      description: 'Our team has over a decade of experience planning and executing flawless events of all sizes.'
    },
    {
      id: 2,
      icon: faUserFriends,
      title: 'Client-Focused Approach',
      description: 'We listen to your vision and work closely with you to bring your dream event to life.'
    },
    {
      id: 3,
      icon: faClipboardCheck,
      title: 'Attention to Detail',
      description: 'From venue selection to the smallest decor elements, we ensure everything is perfect.'
    },
    {
      id: 4,
      icon: faMagic,
      title: 'Creative Solutions',
      description: 'We bring innovative ideas and unique concepts to make your event stand out.'
    }
  ];

  return (
    <section className="about-section py-5">
      <Container>
        <Row className="align-items-center">
          <Col lg={6} className="mb-4 mb-lg-0">
            <div className="about-image-wrapper">
              <img 
                src={aboutImg} 
                alt="EventAra Team" 
                className="about-image img-fluid rounded shadow"
              />
              <div className="experience-badge">
                <span className="years">10+</span>
                <span className="text">Years of Excellence</span>
              </div>
            </div>
          </Col>
          
          <Col lg={6}>
            <div className="about-content">
              <h6 className="text-primary text-uppercase mb-3">About EventAra</h6>
              <h2 className="section-title mb-4">Creating Memorable Events That Exceed Expectations</h2>
              <p className="lead mb-4">
                EventAra is a premier event planning service dedicated to creating unforgettable 
                experiences for all occasions. From intimate gatherings to grand celebrations, 
                we handle every detail with precision and creativity.
              </p>
              <p className="text-muted mb-4">
                Founded in 2014, our team combines creativity, logistics expertise, and personalized 
                service to deliver events that reflect your unique style and vision. We believe that 
                every event tells a story, and we're passionate about making yours remarkable.
              </p>
              
              <Row>
                {features.map(feature => (
                  <Col md={6} key={feature.id} className="mb-4">
                    <div className="feature d-flex">
                      <div className="feature-icon me-3">
                        <FontAwesomeIcon icon={feature.icon} className="text-primary" size="lg" />
                      </div>
                      <div className="feature-content">
                        <h5 className="feature-title mb-2">{feature.title}</h5>
                        <p className="feature-description text-muted mb-0">{feature.description}</p>
                      </div>
                    </div>
                  </Col>
                ))}
              </Row>
              
              <div className="mt-4">
                <Button 
                  as={Link} 
                  to="/about" 
                  variant="primary" 
                  size="lg" 
                  className="me-3"
                >
                  Learn More
                </Button>
                <Button 
                  as={Link} 
                  to="/contact" 
                  variant="outline-primary" 
                  size="lg"
                >
                  Contact Us
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default About;