import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faQuoteLeft } from '@fortawesome/free-solid-svg-icons';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../assets/styles/Review.css';

const Review = () => {
  const reviews = [
    {
      id: 1,
      name: 'Jennifer & Michael',
      event: 'Wedding',
      image: '/assets/images/review-1.jpg',
      rating: 5,
      text: 'EventAra made our wedding day absolutely flawless! From the stunning decor to the delicious catering, every detail was perfect. The team was professional, attentive, and made our vision come to life.',
      date: 'June 15, 2024'
    },
    {
      id: 2,
      name: 'Sarah Thompson',
      event: 'Corporate Conference',
      image: '/assets/images/review-2.jpg',
      rating: 5,
      text: 'Our annual company conference was a huge success thanks to EventAra. They handled everything from venue selection to coordinating speakers. The feedback from our employees was overwhelmingly positive.',
      date: 'March 22, 2024'
    },
    {
      id: 3,
      name: 'Robert Chen',
      event: 'Birthday Party',
      image: '/assets/images/review-3.jpg',
      rating: 5,
      text: 'I wanted to surprise my wife with a spectacular 40th birthday party, and EventAra delivered beyond my expectations. The theme execution was creative, and the entire event ran smoothly.',
      date: 'May 10, 2024'
    }
    
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <section className="customer-reviews-section py-5">
      <Container>
        <div className="text-center mb-5">
          <h2 className="section-title">What Our Clients Say</h2>
          <p className="section-subtitle text-muted">
            Read testimonials from our satisfied customers
          </p>
        </div>

        <Slider {...settings} className="review-slider">
          {reviews.map(review => (
            <div key={review.id} className="px-2">
              <Card className="review-card h-100 shadow-sm border-0">
                <Card.Body className="p-4">
                  <div className="quote-icon mb-3 text-primary">
                    <FontAwesomeIcon icon={faQuoteLeft} size="2x" />
                  </div>
                  <Card.Text className="review-text mb-4">{review.text}</Card.Text>
                  <div className="rating mb-3">
                    {[...Array(review.rating)].map((_, i) => (
                      <FontAwesomeIcon key={i} icon={faStar} className="text-warning me-1" />
                    ))}
                  </div>
                  <div className="d-flex align-items-center">
                    <img 
                      src={review.image} 
                      alt={review.name} 
                      className="reviewer-image rounded-circle me-3"
                    />
                    <div>
                      <h6 className="reviewer-name mb-0">{review.name}</h6>
                      <p className="reviewer-event text-muted mb-0">{review.event}</p>
                      <small className="text-muted">{review.date}</small>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </div>
          ))}
        </Slider>
      </Container>
    </section>
  );
};

export default Review;