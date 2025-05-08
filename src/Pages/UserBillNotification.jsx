import React, { useState } from 'react';
import { Modal, Button, ListGroup, Row, Col, Card } from 'react-bootstrap';

const UserBillNotification = ({ show, handleClose, bill }) => {
  const [showPaymentOptions, setShowPaymentOptions] = useState(false);

  const handleProceedToPayment = () => {
    setShowPaymentOptions(true);
  };

  const handlePaymentComplete = () => {
    // Here you would integrate with your payment gateway
    alert('Payment processed successfully!');
    handleClose();
  };

  // Mock bill data (in production this would come from props)
  const mockBill = bill || {
    id: 1,
    eventType: 'Wedding',
    eventDate: '2025-12-15',
    totalAmount: 100000,
    breakdown: {
      venueCharge: 30000,
      cateringCharge: 35000,
      decorationCharge: 20000,
      photographyCharge: 8000,
      musicCharge: 5000,
      otherCharges: 2000
    },
    note: 'Thank you for choosing Eventara. Your special day is confirmed!'
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>
          {showPaymentOptions ? 'Complete Payment' : 'Event Booking Approved!'}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!showPaymentOptions ? (
          <>
            <div className="alert alert-success" role="alert">
              Good news! Your event booking has been approved. Please review the details and pricing below.
            </div>

            <h5>Event Details</h5>
            <ListGroup className="mb-4">
              <ListGroup.Item><strong>Event Type:</strong> {mockBill.eventType}</ListGroup.Item>
              <ListGroup.Item><strong>Date:</strong> {mockBill.eventDate}</ListGroup.Item>
            </ListGroup>
            
            <h5>Price Breakdown</h5>
            <Card className="mb-4">
              <Card.Body>
                <Row className="mb-2">
                  <Col xs={8}>Venue Charges</Col>
                  <Col xs={4} className="text-end">₹{mockBill.breakdown.venueCharge}</Col>
                </Row>
                <Row className="mb-2">
                  <Col xs={8}>Catering Charges</Col>
                  <Col xs={4} className="text-end">₹{mockBill.breakdown.cateringCharge}</Col>
                </Row>
                <Row className="mb-2">
                  <Col xs={8}>Decoration Charges</Col>
                  <Col xs={4} className="text-end">₹{mockBill.breakdown.decorationCharge}</Col>
                </Row>
                <Row className="mb-2">
                  <Col xs={8}>Photography Charges</Col>
                  <Col xs={4} className="text-end">₹{mockBill.breakdown.photographyCharge}</Col>
                </Row>
                <Row className="mb-2">
                  <Col xs={8}>Music & Entertainment</Col>
                  <Col xs={4} className="text-end">₹{mockBill.breakdown.musicCharge}</Col>
                </Row>
                <Row className="mb-2">
                  <Col xs={8}>Other Charges</Col>
                  <Col xs={4} className="text-end">₹{mockBill.breakdown.otherCharges}</Col>
                </Row>
                <hr />
                <Row className="fw-bold">
                  <Col xs={8}>Total Amount</Col>
                  <Col xs={4} className="text-end">₹{mockBill.totalAmount}</Col>
                </Row>
              </Card.Body>
            </Card>

            {mockBill.note && (
              <div className="mb-4">
                <h5>Note from Event Manager</h5>
                <p className="p-3 bg-light rounded">{mockBill.note}</p>
              </div>
            )}

            <div className="alert alert-info" role="alert">
              <strong>Payment Terms:</strong> 50% advance payment is required to confirm your booking.
            </div>
          </>
        ) : (
          <div className="payment-options">
            <h5 className="mb-3">Choose Payment Method</h5>
            
            <Card className="mb-3">
              <Card.Body>
                <div className="form-check">
                  <input className="form-check-input" type="radio" name="paymentMethod" id="upi" checked />
                  <label className="form-check-label" htmlFor="upi">
                    UPI Payment
                  </label>
                </div>
              </Card.Body>
            </Card>
            
            <Card className="mb-3">
              <Card.Body>
                <div className="form-check">
                  <input className="form-check-input" type="radio" name="paymentMethod" id="card" />
                  <label className="form-check-label" htmlFor="card">
                    Credit/Debit Card
                  </label>
                </div>
              </Card.Body>
            </Card>
            
            <Card className="mb-3">
              <Card.Body>
                <div className="form-check">
                  <input className="form-check-input" type="radio" name="paymentMethod" id="netbanking" />
                  <label className="form-check-label" htmlFor="netbanking">
                    Net Banking
                  </label>
                </div>
              </Card.Body>
            </Card>
            
            <div className="d-flex justify-content-between align-items-center mt-4">
              <div>
                <h5 className="mb-0">Amount to Pay:</h5>
                <p className="text-muted">(50% of total)</p>
              </div>
              <h4 className="text-primary mb-0">₹{mockBill.totalAmount / 2}</h4>
            </div>
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        {!showPaymentOptions ? (
          <>
            <Button variant="secondary" onClick={handleClose}>
              Decide Later
            </Button>
            <Button variant="success" onClick={handleProceedToPayment}>
              Proceed to Payment
            </Button>
          </>
        ) : (
          <>
            <Button variant="secondary" onClick={() => setShowPaymentOptions(false)}>
              Back
            </Button>
            <Button variant="primary" onClick={handlePaymentComplete}>
              Complete Payment
            </Button>
          </>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default UserBillNotification;