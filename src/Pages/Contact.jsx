import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faMapMarkerAlt, 
  faPhone, 
  faEnvelope, 
  faClock,
  faPaperPlane
} from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faInstagram, faTwitter, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import '../assets/styles/Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventType: '',
    date: '',
    message: ''
  });
  
  const [validated, setValidated] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    const form = e.currentTarget;
    e.preventDefault();
    
    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      // Form is valid, show success message
      setSubmitted(true);
      // In a real application, you would send the form data to your backend here
      console.log('Form submitted:', formData);
    }
    
    setValidated(true);
  };

  return (
    <div className="contact-page">
      {/* Hero Section */}
      <section className="contact-hero ">
        <Container  style={{ minHeight: '80vh', paddingTop: '100px', paddingBottom: '40px' }}>
          <Row className="justify-content-center text-center">
            <Col lg={8}>
              <h1 className="display-4 fw-bold mb-4">Get in Touch</h1>
              <p className="lead mb-4">
                We're here to answer any questions you have about our event planning services.
                Let us help you create memories that last a lifetime.
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Contact Information and Form */}
      <section className="contact-main ">
        <Container>
          <Row>
            {/* Contact Information */}
            <Col lg={5} className="mb-4 mb-lg-0">
              <Card className="contact-info-card h-100 border-0 shadow">
                <Card.Body className="p-4">
                  <h2 className="mb-4">Contact Information</h2>
                  
                  <div className="contact-info-item d-flex mb-4">
                    <div className="icon-container me-3">
                      <FontAwesomeIcon icon={faMapMarkerAlt} className="contact-icon" />
                    </div>
                    <div>
                      <h5 className="mb-1">Our Office</h5>
                      <p className="mb-0">123 Event Boulevard, Suite 200<br/>Celebration City, EC 12345</p>
                    </div>
                  </div>
                  
                  <div className="contact-info-item d-flex mb-4">
                    <div className="icon-container me-3">
                      <FontAwesomeIcon icon={faPhone} className="contact-icon" />
                    </div>
                    <div>
                      <h5 className="mb-1">Phone</h5>
                      <p className="mb-0">+1 (555) 123-4567</p>
                    </div>
                  </div>
                  
                  <div className="contact-info-item d-flex mb-4">
                    <div className="icon-container me-3">
                      <FontAwesomeIcon icon={faEnvelope} className="contact-icon" />
                    </div>
                    <div>
                      <h5 className="mb-1">Email</h5>
                      <p className="mb-0">info@eventthra.com</p>
                    </div>
                  </div>
                  
                  <div className="contact-info-item d-flex mb-4">
                    <div className="icon-container me-3">
                      <FontAwesomeIcon icon={faClock} className="contact-icon" />
                    </div>
                    <div>
                      <h5 className="mb-1">Business Hours</h5>
                      <p className="mb-0">Monday - Friday: 9:00 AM - 6:00 PM<br/>Saturday: 10:00 AM - 4:00 PM</p>
                    </div>
                  </div>
                  
                  <div className="social-links mt-4">
                    <h5 className="mb-3">Follow Us</h5>
                    <div className="d-flex">
                      <a href="#" className="social-icon me-3">
                        <FontAwesomeIcon icon={faFacebook} />
                      </a>
                      <a href="#" className="social-icon me-3">
                        <FontAwesomeIcon icon={faInstagram} />
                      </a>
                      <a href="#" className="social-icon me-3">
                        <FontAwesomeIcon icon={faTwitter} />
                      </a>
                      <a href="#" className="social-icon">
                        <FontAwesomeIcon icon={faLinkedin} />
                      </a>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            
            {/* Contact Form */}
            <Col lg={7}>
              <Card className="contact-form-card border-0 shadow">
                <Card.Body className="p-4">
                  <h2 className="mb-4">Send Us a Message</h2>
                  
                  {submitted ? (
                    <div className="thank-you-message text-center py-5">
                      <div className="checkmark-circle mb-3">
                        <i className="fas fa-check"></i>
                      </div>
                      <h3>Thank You!</h3>
                      <p className="lead">Your message has been sent successfully.</p>
                      <p>Our team will get back to you within 24 hours.</p>
                      <Button 
                        variant="outline-primary"
                        onClick={() => {
                          setSubmitted(false);
                          setFormData({
                            name: '',
                            email: '',
                            phone: '',
                            eventType: '',
                            date: '',
                            message: ''
                          });
                          setValidated(false);
                        }}
                      >
                        Send Another Message
                      </Button>
                    </div>
                  ) : (
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                      <Row>
                        <Col md={6} className="mb-3">
                          <Form.Group controlId="formName">
                            <Form.Label>Full Name</Form.Label>
                            <Form.Control
                              type="text"
                              name="name"
                              value={formData.name}
                              onChange={handleChange}
                              placeholder="Your full name"
                              required
                            />
                            <Form.Control.Feedback type="invalid">
                              Please provide your name.
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                        <Col md={6} className="mb-3">
                          <Form.Group controlId="formEmail">
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                              placeholder="Your email address"
                              required
                            />
                            <Form.Control.Feedback type="invalid">
                              Please provide a valid email.
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                      </Row>
                      
                      <Row>
                        <Col md={6} className="mb-3">
                          <Form.Group controlId="formPhone">
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control
                              type="tel"
                              name="phone"
                              value={formData.phone}
                              onChange={handleChange}
                              placeholder="Your phone number"
                            />
                          </Form.Group>
                        </Col>
                        <Col md={6} className="mb-3">
                          <Form.Group controlId="formEventType">
                            <Form.Label>Event Type</Form.Label>
                            <Form.Select
                              name="eventType"
                              value={formData.eventType}
                              onChange={handleChange}
                              required
                            >
                              <option value="">Select event type</option>
                              <option value="Wedding">Wedding</option>
                              <option value="Corporate">Corporate Event</option>
                              <option value="Birthday">Birthday Party</option>
                              <option value="Anniversary">Anniversary</option>
                              <option value="Conference">Conference</option>
                              <option value="Other">Other</option>
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">
                              Please select an event type.
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                      </Row>
                      
                      <Form.Group className="mb-3" controlId="formDate">
                        <Form.Label>Event Date</Form.Label>
                        <Form.Control
                          type="date"
                          name="date"
                          value={formData.date}
                          onChange={handleChange}
                        />
                      </Form.Group>
                      
                      <Form.Group className="mb-4" controlId="formMessage">
                        <Form.Label>Message</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={5}
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          placeholder="Tell us about your event and how we can help..."
                          required
                        />
                        <Form.Control.Feedback type="invalid">
                          Please provide some details about your event.
                        </Form.Control.Feedback>
                      </Form.Group>
                      
                      <Button type="submit" variant="primary" size="lg" className="w-100">
                        <FontAwesomeIcon icon={faPaperPlane} className="me-2" />
                        Send Message
                      </Button>
                    </Form>
                  )}
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Map Section */}
      <section className="map-section py-5">
        <Container>
          <Row className="justify-content-center">
            <Col lg={10}>
              <div className="map-container shadow">
                {/* Replace with your actual Google Maps embed code */}
                <div className="ratio ratio-21x9">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387193.3059445135!2d-74.25986613799748!3d40.69714941774136!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2s!4v1683893177447!5m2!1sen!2s" 
                    width="600" 
                    height="450" 
                    style={{ border: 0 }} 
                    allowFullScreen="" 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      
    </div>
  );
};

export default Contact;