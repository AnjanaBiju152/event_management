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
      image: '/assets/images/gallery/wedding-1.jpg',
      category: 'wedding',
      title: 'Garden Wedding'
    },
    {
      id: 2,
      image: '/assets/images/gallery/wedding-2.jpg',
      category: 'wedding',
      title: 'Beach Wedding'
    },
    {
      id: 3,
      image: '/assets/images/gallery/birthday-1.jpg',
      category: 'birthday',
      title: 'Kids Birthday'
    },
    {
      id: 4,
      image: '/assets/images/gallery/corporate-1.jpg',
      category: 'corporate',
      title: 'Annual Conference'
    },
    {
      id: 5,
      image: '/assets/images/gallery/decor-1.jpg',
      category: 'decor',
      title: 'Elegant Decoration'
    },
    {
      id: 6,
      image: '/assets/images/gallery/catering-1.jpg',
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

  return (
    <section className="gallery-section py-5 bg-light">
      <Container  style={{ minHeight: '80vh' ,paddingTop:'100px' ,paddingBottom:'40px' }}>
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
              <div className="gallery-item">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="img-fluid rounded shadow-sm"
                />
                <div className="gallery-overlay">
                  <div className="gallery-info">
                    <h5 className="gallery-title">{item.title}</h5>
                    <p className="gallery-category text-capitalize">{item.category}</p>
                    <a href="#" className="gallery-link">
                      <FontAwesomeIcon icon={faSearchPlus} />
                    </a>
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