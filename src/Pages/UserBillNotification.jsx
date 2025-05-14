import React, { useState } from 'react';
import { Modal, Button, ListGroup, Row, Col, Card, Form } from 'react-bootstrap';
import { jsPDF } from 'jspdf';

const UserBillNotification = ({ show, handleClose, bill }) => {
  const [showPaymentOptions, setShowPaymentOptions] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('upi');

  const handleProceedToPayment = () => {
    setShowPaymentOptions(true);
    setPaymentAmount(bill.totalAmount * 0.5); // Default to 50% partial payment
  };

  const handlePaymentComplete = () => {
    alert(`Payment of ₹${paymentAmount} processed successfully via ${paymentMethod}!`);
    handleClose();
  };

  const handleContactAdmin = () => {
    const message = prompt('Please enter your query or clarification request:');
    if (message) {
      alert('Your query has been sent to the admin.');
    }
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('Eventara Bill', 20, 20);
    doc.setFontSize(12);
    doc.text(`Bill ID: ${bill.id}`, 20, 30);
    doc.text(`Event: ${bill.eventType}`, 20, 40);
    doc.text(`Date: ${bill.eventDate}`, 20, 50);
    doc.text('Price Breakdown:', 20, 60);
    doc.text(`Venue: ₹${bill.breakdown.venueCharge.toLocaleString()}`, 30, 70);
    doc.text(`Catering: ₹${bill.breakdown.cateringCharge.toLocaleString()}`, 30, 80);
    doc.text(`Decoration: ₹${bill.breakdown.decorationCharge.toLocaleString()}`, 30, 90);
    doc.text(`Photography: ₹${bill.breakdown.photographyCharge.toLocaleString()}`, 30, 100);
    doc.text(`Music: ₹${bill.breakdown.musicCharge.toLocaleString()}`, 30, 110);
    doc.text(`Other: ₹${bill.breakdown.otherCharges.toLocaleString()}`, 30, 120);
    doc.text(`Total: ₹${bill.totalAmount.toLocaleString()}`, 30, 130);
    if (bill.note) {
      doc.text('Note:', 20, 140);
      doc.text(bill.note, 30, 150, { maxWidth: 160 });
    }
    doc.save(`bill_${bill.id}.pdf`);
  };

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
      otherCharges: 2000,
    },
    note: 'Thank you for choosing Eventara. Your special day is confirmed!',
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
              <ListGroup.Item><strong>Bill ID:</strong> #{mockBill.id}</ListGroup.Item>
              <ListGroup.Item><strong>Event Type:</strong> {mockBill.eventType}</ListGroup.Item>
              <ListGroup.Item><strong>Date:</strong> {mockBill.eventDate}</ListGroup.Item>
            </ListGroup>

            <h5>Price Breakdown</h5>
            <Card className="mb-4 shadow-sm">
              <Card.Body>
                <Row className="mb-2">
                  <Col xs={8}>Venue Charges</Col>
                  <Col xs={4} className="text-end">₹{mockBill.breakdown.venueCharge.toLocaleString()}</Col>
                </Row>
                <Row className="mb-2">
                  <Col xs={8}>Catering Charges</Col>
                  <Col xs={4} className="text-end">₹{mockBill.breakdown.cateringCharge.toLocaleString()}</Col>
                </Row>
                <Row className="mb-2">
                  <Col xs={8}>Decoration Charges</Col>
                  <Col xs={4} className="text-end">₹{mockBill.breakdown.decorationCharge.toLocaleString()}</Col>
                </Row>
                <Row className="mb-2">
                  <Col xs={8}>Photography Charges</Col>
                  <Col xs={4} className="text-end">₹{mockBill.breakdown.photographyCharge.toLocaleString()}</Col>
                </Row>
                <Row className="mb-2">
                  <Col xs={8}>Music & Entertainment</Col>
                  <Col xs={4} className="text-end">₹{mockBill.breakdown.musicCharge.toLocaleString()}</Col>
                </Row>
                <Row className="mb-2">
                  <Col xs={8}>Other Charges</Col>
                  <Col xs={4} className="text-end">₹{mockBill.breakdown.otherCharges.toLocaleString()}</Col>
                </Row>
                <hr />
                <Row className="fw-bold">
                  <Col xs={8}>Total Amount</Col>
                  <Col xs={4} className="text-end">₹{mockBill.totalAmount.toLocaleString()}</Col>
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
            <h5 className="mb-3">Choose Payment Amount</h5>
            <Form.Group className="mb-4">
              <Form.Label>Payment Amount (₹)</Form.Label>
              <Slider
                min={mockBill.totalAmount * 0.2} // Minimum 20%
                max={mockBill.totalAmount}
                step={1000}
                value={paymentAmount}
                onChange={(e) => setPaymentAmount(Number(e.target.value))}
                className="mb-2"
              />
              <Form.Control
                type="number"
                value={paymentAmount}
                onChange={(e) => setPaymentAmount(Number(e.target.value))}
                min={mockBill.totalAmount * 0.2}
                max={mockBill.totalAmount}
                className="form-control-lg"
              />
              <Form.Text className="text-muted">
                Select between 20% (₹{(mockBill.totalAmount * 0.2).toLocaleString()}) and 100% of the total.
              </Form.Text>
            </Form.Group>

            <h5 className="mb-3">Choose Payment Method</h5>
            <Card className="mb-3">
              <Card.Body>
                <Form.Check
                  type="radio"
                  label="UPI Payment"
                  name="paymentMethod"
                  id="upi"
                  checked={paymentMethod === 'upi'}
                  onChange={() => setPaymentMethod('upi')}
                />
              </Card.Body>
            </Card>
            <Card className="mb-3">
              <Card.Body>
                <Form.Check
                  type="radio"
                  label="Credit/Debit Card"
                  name="paymentMethod"
                  id="card"
                  checked={paymentMethod === 'card'}
                  onChange={() => setPaymentMethod('card')}
                />
              </Card.Body>
            </Card>
            <Card className="mb-3">
              <Card.Body>
                <Form.Check
                  type="radio"
                  label="Net Banking"
                  name="paymentMethod"
                  id="netbanking"
                  checked={paymentMethod === 'netbanking'}
                  onChange={() => setPaymentMethod('netbanking')}
                />
              </Card.Body>
            </Card>

            <div className="d-flex justify-content-between align-items-center mt-4">
              <div>
                <h5 className="mb-0">Amount to Pay:</h5>
                <p className="text-muted">Selected amount</p>
              </div>
              <h4 className="text-primary mb-0">₹{paymentAmount.toLocaleString()}</h4>
            </div>
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        {!showPaymentOptions ? (
          <>
            <Button variant="outline-primary" onClick={generatePDF}>
              Download Bill
            </Button>
            <Button variant="outline-secondary" onClick={handleContactAdmin}>
              Contact Admin
            </Button>
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
            <Button
              variant="primary"
              onClick={handlePaymentComplete}
              disabled={paymentAmount < mockBill.totalAmount * 0.2 || paymentAmount > mockBill.totalAmount}
            >
              Pay ₹{paymentAmount.toLocaleString()}
            </Button>
          </>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default UserBillNotification;