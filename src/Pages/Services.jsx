import React from 'react';
import '../assets/styles/Services.css';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faRing,
  faBirthdayCake,
  faBuilding,
  faGlassCheers,
  faGraduationCap,
  faHandshake,
  faUtensils,
  faCamera,
  faMusic,
  faPalette,
  faMapMarkedAlt,
  faUmbrellaBeach
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';


const Services = () => {
  const mainServices = [
    {
      id: 1,
      title: 'Wedding Events',
      description: 'From intimate ceremonies to grand celebrations, we create the perfect wedding experience tailored to your dreams.',
      icon: faRing,
      link: '/register',
      image: '/wedding.jpg'
    },
    {
      id: 2,
      title: 'Birthday Parties',
      description: 'Celebrate another year with custom-designed birthday events for kids, teens, adults, and milestone celebrations.',
      icon: faBirthdayCake,
      link: '/register',
      image: '/birthday2.jpg'
    },
    {
      id: 3,
      title: 'Corporate Events',
      description: 'Impress clients and motivate teams with professionally planned corporate gatherings, conferences, and team-building events.',
      icon: faBuilding,
      link: '/register',
      image: '/coperative.jpg'
    },
    {
      id: 4,
      title: 'Social Gatherings',
      description: 'Host memorable social events from family reunions to holiday parties with our comprehensive planning services.',
      icon: faGlassCheers,
      link: '/register',
      image: '/conference.jpg'
    },
    {
      id: 5,
      title: 'Graduation Parties',
      description: 'Celebrate academic achievements with custom graduation events that mark this important milestone.',
      icon: faGraduationCap,
      link: '/register',
      image: '/graduation.jpg'
    },
    {
      id: 6,
      title: 'Engagement Parties',
      description: 'Begin your journey to marriage with a beautifully planned engagement celebration.',
      icon: faHandshake,
      link: '/register',
      image: '/engagement.jpg'
    }
  ];

  const featuredServices = [
    {
      id: 1,
      title: 'Catering Services',
      description: 'Exquisite culinary experiences tailored to your event and preferences.',
      icon: faUtensils,
      link: '/register'
    },
    {
      id: 2,
      title: 'Photography & Videography',
      description: 'Capture every special moment with our professional media team.',
      icon: faCamera,
      link: '/register'
    },
    {
      id: 3,
      title: 'Music & Entertainment',
      description: 'From DJs to live bands, we provide entertainment that keeps guests engaged.',
      icon: faMusic,
      link: '/register'
    },
    {
      id: 4,
      title: 'Decoration & Design',
      description: 'Transform venues with our custom design and decoration services.',
      icon: faPalette,
      link: '/register'
    },
    {
      id: 5,
      title: 'Destination Events',
      description: 'Plan your dream event at exotic locations worldwide.',
      icon: faMapMarkedAlt,
      link: '/register'
    },
    {
      id: 6,
      title: 'Beach Weddings',
      description: 'Say "I do" with the perfect beachfront ceremony and reception.',
      icon: faUmbrellaBeach,
      link: '/register'
    }
  ];

  return (
    <>
      {/* Main Services Section */}
      <section className="main-services-section py-5" >
        <Container  style={{ minHeight: '80vh' ,paddingTop:'100px' ,paddingBottom:'40px' }}>
          <div className="text-center mb-5">
            <h2 className="section-title">Our Event Services</h2>
            <p className="section-subtitle text-muted">
              We specialize in creating memorable experiences for every occasion
            </p>
          </div>
          
          <Row>
            {mainServices.map(service => (
              <Col lg={4} md={6} className="mb-4" key={service.id}>
                <Card className="service-card h-100 shadow-sm hover-effect">
                  <div className="service-card-img-container">
                    <Card.Img variant="top" src={service.image} className="service-card-img" />
                    <div className="service-card-icon">
                      <FontAwesomeIcon icon={service.icon} size="2x" />
                    </div>
                  </div>
                  <Card.Body>
                    <Card.Title className="mb-3">{service.title}</Card.Title>
                    <Card.Text className="text-muted">{service.description}</Card.Text>
                  </Card.Body>
                  <Card.Footer className="bg-white border-0 pb-4">
                    <Button 
                      as={Link}
                      to={service.link}
                      variant="outline-primary" 
                      className="w-100"
                    >
                      Explore Services
                    </Button>
                  </Card.Footer>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Featured Services Section */}
      <section className="featured-services-section py-5 bg-light">
        <Container>
          <div className="text-center mb-5">
            <h2 className="section-title">Our Premium Services</h2>
            <p className="section-subtitle text-muted">
              Discover our range of services to enhance your special event
            </p>
          </div>
          
          <Row>
            {featuredServices.map(service => (
              <Col md={6} lg={4} className="mb-4" key={service.id}>
                <Link to={service.link} className="text-decoration-none">
                  <Card className="featured-service-card text-center h-100 shadow-sm border-0">
                    <Card.Body className="p-4">
                      <div className="service-icon mb-3">
                        <FontAwesomeIcon icon={service.icon} size="2x" />
                      </div>
                      <Card.Title className="mb-3">{service.title}</Card.Title>
                      <Card.Text className="text-muted">{service.description}</Card.Text>
                    </Card.Body>
                  </Card>
                </Link>
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Services;