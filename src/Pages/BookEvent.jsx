import React from 'react';
import { Container, Form, Button, Card, Row, Col } from 'react-bootstrap';

const BookEvent = () => (
  <Container className="py-5" style={{ minHeight: '80vh' ,paddingTop:'100px' ,paddingBottom:'40px' }}>
    <Card className="p-4 shadow">
      <h2 className="text-center mb-4 fw-bold">Plan Your Event with Eventara</h2>
      <Form>
        
        <Form.Group className="mb-3" controlId="formEventType">
          <Form.Label>Event Type</Form.Label>
          <Form.Select>
            <option>Choose...</option>
            <option>Wedding</option>
            <option>Birthday Party</option>
            <option>Corporate Event</option>
            <option>Private Party</option>
          </Form.Select>
        </Form.Group>

        
        <Form.Group className="mb-3" controlId="formFlowerDesign">
          <Form.Label>Flower Design Preference</Form.Label>
          <Form.Select>
            <option>Choose...</option>
            <option>Traditional</option>
            <option>Modern</option>
            <option>Exotic</option>
          </Form.Select>
        </Form.Group>

        
        <Form.Group className="mb-3" controlId="formPhotography">
          <Form.Label>Photography Option</Form.Label>
          <Form.Select>
            <option>Choose...</option>
            <option>Standard Photoshoot</option>
            <option>Premium Photoshoot</option>
            <option>Drone Coverage</option>
          </Form.Select>
        </Form.Group>

        
        <Form.Group className="mb-3" controlId="formCatering">
          <Form.Label>Catering Style</Form.Label>
          <Form.Select>
            <option>Choose...</option>
            <option>Veg</option>
            <option>Non-Veg</option>
            <option>Mixed Menu</option>
          </Form.Select>
        </Form.Group>

        
        <Form.Group className="mb-3" controlId="formDecoration">
          <Form.Label>Decoration Style</Form.Label>
          <Form.Select>
            <option>Choose...</option>
            <option>Classic Theme</option>
            <option>Royal Theme</option>
            <option>Beach Theme</option>
          </Form.Select>
        </Form.Group>

  
        <Form.Group className="mb-3" controlId="formMusic">
          <Form.Label>Music & Entertainment</Form.Label>
          <Form.Select>
            <option>Choose...</option>
            <option>Live Band</option>
            <option>DJ</option>
            <option>Traditional Dance Group</option>
          </Form.Select>
        </Form.Group>

        
        <Form.Group className="mb-3" controlId="formDestination">
          <Form.Label>Destination Wedding</Form.Label>
          <Form.Select>
            <option>Choose...</option>
            <option>Yes</option>
            <option>No</option>
          </Form.Select>
        </Form.Group>

        
        <Form.Group className="mb-3" controlId="formDate">
          <Form.Label>Event Date</Form.Label>
          <Form.Control type="date" />
        </Form.Group>

        
        <Button variant="success" type="submit" className="w-100">
          Submit Booking Request
        </Button>
      </Form>
    </Card>
  </Container>
);

export default BookEvent;
