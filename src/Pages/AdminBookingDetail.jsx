import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Row, Col, ListGroup } from 'react-bootstrap';

const AdminBookingDetail = ({ show, handleClose, booking, paymentInfo }) => {
  const [totalAmount, setTotalAmount] = useState('');
  const [breakdown, setBreakdown] = useState({
    venueCharge: '',
    cateringCharge: '',
    decorationCharge: '',
    photographyCharge: '',
    musicCharge: '',
    otherCharges: '',
  });
  const [note, setNote] = useState('');
  
  // Set total amount if paymentInfo is provided (from AdminPayment)
  useEffect(() => {
    if (paymentInfo?.totalAmount) {
      setTotalAmount(paymentInfo.totalAmount);
      
      // Calculate approximate breakdown based on total
      const baseAmount = Math.floor(paymentInfo.totalAmount / 6);
      setBreakdown({
        venueCharge: baseAmount,
        cateringCharge: baseAmount,
        decorationCharge: baseAmount,
        photographyCharge: baseAmount,
        musicCharge: baseAmount,
        otherCharges: paymentInfo.totalAmount - (baseAmount * 5),
      });
    }
  }, [paymentInfo]);

  // Calculate total amount based on breakdown
  const calculateTotal = () => {
    const total = Object.values(breakdown).reduce((sum, value) => {
      return sum + (parseInt(value) || 0);
    }, 0);
    setTotalAmount(total);
  };

  // Handle field changes and recalculate total
  const handleBreakdownChange = (e) => {
    const { name, value } = e.target;
    setBreakdown({
      ...breakdown,
      [name]: value,
    });
  };

  // Handle note change
  const handleNoteChange = (e) => {
    setNote(e.target.value);
  };

  // Send pricing for approval or send bill reminder
  const handleSendBill = () => {
    // Here you would connect to your API to send the bill
    const isPendingPayment = paymentInfo && paymentInfo.dueAmount > 0;
    
    if (isPendingPayment) {
      // Send reminder for pending payment
      alert(`Payment reminder of ₹${paymentInfo.dueAmount} sent to ${booking?.userName} for ${booking?.eventType}`);
    } else {
      // Send new bill
      alert(`Bill of ₹${totalAmount} prepared for ${booking?.userName}'s ${booking?.eventType}`);
    }
    
    handleClose();
  };

  // Determine if this is a new bill or payment reminder
  const isPaymentReminder = paymentInfo && paymentInfo.dueAmount > 0;
  const buttonText = isPaymentReminder ? "Send Payment Reminder" : "Approve & Send Bill";
  const modalTitle = isPaymentReminder ? "Payment Reminder" : "Booking Details & Price Calculation";

  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>{modalTitle}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {booking ? (
          <>
            <h5>Event Details</h5>
            <ListGroup className="mb-4">
              <ListGroup.Item><strong>User:</strong> {booking.userName}</ListGroup.Item>
              <ListGroup.Item><strong>Event Type:</strong> {booking.eventType}</ListGroup.Item>
              {booking.eventDate && (
                <ListGroup.Item><strong>Date:</strong> {booking.eventDate}</ListGroup.Item>
              )}
              {isPaymentReminder && (
                <>
                  <ListGroup.Item><strong>Total Amount:</strong> ₹{paymentInfo.totalAmount}</ListGroup.Item>
                  <ListGroup.Item><strong>Paid Amount:</strong> ₹{paymentInfo.paidAmount}</ListGroup.Item>
                  <ListGroup.Item className="text-danger"><strong>Due Amount:</strong> ₹{paymentInfo.dueAmount}</ListGroup.Item>
                </>
              )}
            </ListGroup>
            
            <Form>
              {!isPaymentReminder ? (
                // Show price calculation form for new bills
                <>
                  <h5>Price Calculation</h5>
                  <Row className="mb-3">
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Venue Charge</Form.Label>
                        <Form.Control 
                          type="number" 
                          name="venueCharge"
                          value={breakdown.venueCharge} 
                          onChange={handleBreakdownChange} 
                          placeholder="Enter amount" 
                        />
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label>Catering Charge</Form.Label>
                        <Form.Control 
                          type="number" 
                          name="cateringCharge"
                          value={breakdown.cateringCharge} 
                          onChange={handleBreakdownChange} 
                          placeholder="Enter amount" 
                        />
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label>Decoration Charge</Form.Label>
                        <Form.Control 
                          type="number" 
                          name="decorationCharge"
                          value={breakdown.decorationCharge} 
                          onChange={handleBreakdownChange} 
                          placeholder="Enter amount" 
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Photography Charge</Form.Label>
                        <Form.Control 
                          type="number" 
                          name="photographyCharge"
                          value={breakdown.photographyCharge} 
                          onChange={handleBreakdownChange} 
                          placeholder="Enter amount" 
                        />
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label>Music & Entertainment</Form.Label>
                        <Form.Control 
                          type="number" 
                          name="musicCharge"
                          value={breakdown.musicCharge} 
                          onChange={handleBreakdownChange} 
                          placeholder="Enter amount" 
                        />
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label>Other Charges</Form.Label>
                        <Form.Control 
                          type="number" 
                          name="otherCharges"
                          value={breakdown.otherCharges} 
                          onChange={handleBreakdownChange} 
                          placeholder="Enter amount" 
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <div className="d-flex justify-content-end mb-3">
                    <Button variant="secondary" onClick={calculateTotal}>
                      Calculate Total
                    </Button>
                  </div>

                  <Form.Group className="mb-3">
                    <Form.Label><strong>Total Amount</strong></Form.Label>
                    <Form.Control 
                      type="number" 
                      value={totalAmount} 
                      readOnly 
                      className="fw-bold form-control-lg"
                    />
                  </Form.Group>
                </>
              ) : (
                // Show reminder message form for payment reminders
                <Form.Group className="mb-3">
                  <Form.Label><strong>Due Amount</strong></Form.Label>
                  <Form.Control 
                    type="number" 
                    value={paymentInfo.dueAmount} 
                    readOnly 
                    className="fw-bold form-control-lg text-danger"
                  />
                </Form.Group>
              )}
              
              <Form.Group className="mb-3">
                <Form.Label>{isPaymentReminder ? "Payment Reminder Message" : "Add Note (Optional)"}</Form.Label>
                <Form.Control 
                  as="textarea" 
                  rows={3} 
                  value={note}
                  onChange={handleNoteChange}
                  placeholder={isPaymentReminder ? 
                    "Add a payment reminder message for the client" : 
                    "Add any specific notes for the client"
                  }
                />
              </Form.Group>
            </Form>
          </>
        ) : (
          <p>Loading booking details...</p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button 
          variant={isPaymentReminder ? "warning" : "success"}
          onClick={handleSendBill}
          disabled={!isPaymentReminder && !totalAmount}
        >
          {buttonText}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AdminBookingDetail;