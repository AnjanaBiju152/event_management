// frontend/src/Pages/UserBillNotification.jsx
import React, { useState } from 'react';
import { Modal, Button, ListGroup, Row, Col, Card, Form } from 'react-bootstrap';
import { jsPDF } from 'jspdf';
import { toast } from 'react-toastify';
import { acceptBookingApi } from '../services/allApi';

const UserBillNotification = ({ show, handleClose, bill, onPaymentSuccess }) => {
  const [showPaymentOptions, setShowPaymentOptions] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState(bill?.totalAmount * 0.5 || 0);
  const [paymentMethod, setPaymentMethod] = useState('upi');

  const handleProceedToPayment = () => {
    setShowPaymentOptions(true);
  };

  const handlePaymentComplete = async () => {
    try {
      const token = sessionStorage.getItem('token');
      if (!token) {
        toast.error('Please log in to process payment.');
        return;
      }
      const result = await acceptBookingApi(bill.id, { paymentAmount, paymentMethod }, token);
      if (result.status === 200) {
        toast.success(`Payment of ₹${paymentAmount.toLocaleString()} processed successfully via ${paymentMethod}!`);
        onPaymentSuccess();
        handleClose();
      } else {
        toast.error(result.data?.message || 'Failed to process payment.');
      }
    } catch (err) {
      console.error('Error processing payment:', err);
      toast.error('An error occurred while processing payment.');
    }
  };

  const handleContactAdmin = () => {
    const message = prompt('Please enter your query or clarification request:');
    if (message) {
      toast.success('Your query has been sent to the admin.');
    }
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('Eventara Bill', 20, 20);
    doc.setFontSize(12);
    doc.text(`Bill ID: ${bill.id.slice(-6)}`, 20, 30);
    doc.text(`Event: ${bill.eventType}`, 20, 40);
    doc.text(`Date: ${bill.eventDate}`, 20, 50);
    doc.text(`Location: ${bill.eventLocation}`, 20, 60);
    doc.text(`Venue: ${bill.venue}`, 20, 70);
    doc.text(`Guest Count: ${bill.guestCount}`, 20, 80);
    doc.text(`Client Notes: ${bill.clientNotes}`, 20, 90);
    doc.text(`Bill Sent On: ${bill.billSentDate}`, 20, 100);
    doc.text(`Last Updated By: ${bill.lastUpdatedBy}`, 20, 110);
    doc.text('Price Breakdown:', 20, 120);
    doc.text(`Venue: ₹${bill.breakdown.venueCharge.toLocaleString()}`, 30, 130);
    doc.text(`Catering: ₹${bill.breakdown.cateringCharge.toLocaleString()}`, 30, 140);
    doc.text(`Decoration: ₹${bill.breakdown.decorationCharge.toLocaleString()}`, 30, 150);
    doc.text(`Photography: ₹${bill.breakdown.photographyCharge.toLocaleString()}`, 30, 160);
    doc.text(`Music: ₹${bill.breakdown.musicCharge.toLocaleString()}`, 30, 170);
    doc.text(`Other: ₹${bill.breakdown.otherCharges.toLocaleString()}`, 30, 180); // Corrected field name
    doc.text(`Total: ₹${bill.totalAmount.toLocaleString()}`, 30, 190);
    if (bill.note) {
      doc.text('Note:', 20, 200);
      doc.text(bill.note, 30, 210, { maxWidth: 160 });
    }
    doc.save(`bill_${bill.id.slice(-6)}.pdf`);
  };

  if (!bill) return null;

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
              <ListGroup.Item><strong>Bill ID:</strong> #{bill.id.slice(-6)}</ListGroup.Item>
              <ListGroup.Item><strong>Event Type:</strong> {bill.eventType}</ListGroup.Item>
              <ListGroup.Item><strong>Date:</strong> {bill.eventDate}</ListGroup.Item>
              <ListGroup.Item><strong>Location:</strong> {bill.eventLocation}</ListGroup.Item>
              <ListGroup.Item><strong>Venue:</strong> {bill.venue}</ListGroup.Item>
              <ListGroup.Item><strong>Guest Count:</strong> {bill.guestCount}</ListGroup.Item>
              <ListGroup.Item><strong>Client Notes:</strong> {bill.clientNotes}</ListGroup.Item>
              <ListGroup.Item><strong>Bill Sent On:</strong> {bill.billSentDate}</ListGroup.Item>
              <ListGroup.Item><strong>Last Updated By:</strong> {bill.lastUpdatedBy}</ListGroup.Item>
            </ListGroup>

            <h5>Price Breakdown</h5>
            <Card className="mb-4 shadow-sm">
              <Card.Body>
                <Row className="mb-2">
                  <Col xs={8}>Venue Charges</Col>
                  <Col xs={4} className="text-end">₹{bill.breakdown.venueCharge.toLocaleString()}</Col>
                </Row>
                <Row className="mb-2">
                  <Col xs={8}>Catering Charges</Col>
                  <Col xs={4} className="text-end">₹{bill.breakdown.cateringCharge.toLocaleString()}</Col>
                </Row>
                <Row className="mb-2">
                  <Col xs={8}>Decoration Charges</Col>
                  <Col xs={4} className="text-end">₹{bill.breakdown.decorationCharge.toLocaleString()}</Col>
                </Row>
                <Row className="mb-2">
                  <Col xs={8}>Photography Charges</Col>
                  <Col xs={4} className="text-end">₹{bill.breakdown.photographyCharge.toLocaleString()}</Col>
                </Row>
                <Row className="mb-2">
                  <Col xs={8}>Music & Entertainment</Col>
                  <Col xs={4} className="text-end">₹{bill.breakdown.musicCharge.toLocaleString()}</Col>
                </Row>
                <Row className="mb-2">
                  <Col xs={8}>Other Charges</Col>
                  <Col xs={4} className="text-end">₹{bill.breakdown.otherCharges.toLocaleString()}</Col> {/* Corrected field name */}
                </Row>
                <hr />
                <Row className="fw-bold">
                  <Col xs={8}>Total Amount</Col>
                  <Col xs={4} className="text-end">₹{bill.totalAmount.toLocaleString()}</Col>
                </Row>
              </Card.Body>
            </Card>

            {bill.note && (
              <div className="mb-4">
                <h5>Note from Event Manager</h5>
                <p className="p-3 bg-light rounded">{bill.note}</p>
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
              <Form.Range
                min={bill.totalAmount * 0.2}
                max={bill.totalAmount}
                step={1000}
                value={paymentAmount}
                onChange={(e) => setPaymentAmount(Number(e.target.value))}
                className="mb-2"
              />
              <Form.Control
                type="number"
                value={paymentAmount}
                onChange={(e) => setPaymentAmount(Number(e.target.value))}
                min={bill.totalAmount * 0.2}
                max={bill.totalAmount}
                className="form-control-lg"
              />
              <Form.Text className="text-muted">
                Select between 20% (₹{(bill.totalAmount * 0.2).toLocaleString()}) and 100% of the total.
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
              disabled={paymentAmount < bill.totalAmount * 0.2 || paymentAmount > bill.totalAmount}
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