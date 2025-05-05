import React, { useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearchPlus } from '@fortawesome/free-solid-svg-icons';
import '../assets/styles/About.css';

const GalleryPage = () => {
  const [filter, setFilter] = useState('all');
  
  const galleryItems = [
    {
      id: 1,
      image: '/gardenwedding.jpg',
      category: 'wedding',
      title: 'Garden Wedding'
    },
    {
      id: 2,
      image: '/beachwedding.jpg',
      category: 'wedding',
      title: 'Beach Wedding'
    },
    {
      id: 3,
      image: '/kidsbirthday.jpg',
      category: 'birthday',
      title: 'Kids Birthday'
    },
    {
      id: 4,
      image: '/conference.jpg',
      category: 'corporate',
      title: 'Annual Conference'
    },
    {
      id: 5,
      image: '/engagement.jpg',
      category: 'decor',
      title: 'Elegant Decoration'
    },
    {
      id: 6,
      image: '/dinning2.jpg',
      category: 'catering',
      title: 'Fine Dining Experience'
    }
  ];
  
  const categories = [
    { id: 'all', name: 'All Events' },
    { id: 'wedding', name: 'Weddings' },
    { id: 'birthday', name: 'Birthdays' },
    { id: 'corporate', name: 'Corporate' },
    { id: 'decor', name: 'Decorations' },
    { id: 'catering', name: 'Catering' }
  ];
  
  const filteredItems = filter === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === filter);

  // CSS styles for fixed size images
  const imageContainerStyle = {
    height: '250px',
    width: '100%',
    overflow: 'hidden',
    position: 'relative'
  };

  const imageStyle = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    objectPosition: 'center'
  };

  const galleryItemStyle = {
    marginBottom: '20px',
    borderRadius: '8px',
    overflow: 'hidden',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
  };

  const overlayStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0,
    transition: 'all 0.3s ease'
  };

  const infoStyle = {
    textAlign: 'center',
    color: 'white',
    padding: '15px'
  };

  return (
    <section className="gallery-section py-5 bg-light">
      <Container style={{ minHeight: '80vh', paddingTop: '100px', paddingBottom: '40px' }}>
        <div className="text-center mb-5">
          <h2 className="section-title">Event Gallery</h2>
          <p className="section-subtitle text-muted">
            Explore our portfolio of successful events
          </p>
        </div>
        
        <div className="gallery-filter text-center mb-4">
          <div className="btn-group">
            {categories.map(category => (
              <Button
                key={category.id}
                variant={filter === category.id ? 'primary' : 'outline-primary'}
                className="me-2 mb-2"
                onClick={() => setFilter(category.id)}
              >
                {category.name}
              </Button>
            ))}
          </div>
        </div>
        
        <Row className="g-4">
          {filteredItems.map(item => (
            <Col lg={4} md={6} key={item.id}>
              <div style={galleryItemStyle} className="gallery-item">
                {/* Fixed height/width container for images */}
                <div style={imageContainerStyle}>
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    style={imageStyle}
                  />
                  <div 
                    style={overlayStyle} 
                    className="gallery-overlay"
                    onMouseOver={(e) => e.currentTarget.style.opacity = '1'}
                    onMouseOut={(e) => e.currentTarget.style.opacity = '0'}
                  >
                    <div style={infoStyle}>
                      <h5 className="gallery-title">{item.title}</h5>
                      <p className="gallery-category text-capitalize">{item.category}</p>
                      <a href="#" className="gallery-link" style={{ color: 'white' }}>
                        <FontAwesomeIcon icon={faSearchPlus} />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          ))}
        </Row>
        
        <div className="text-center mt-5">
          <Button as={Link} to="/gallery" variant="outline-primary" size="lg">
            View Full Gallery
          </Button>
        </div>
      </Container>
    </section>
  );
};

export default GalleryPage;