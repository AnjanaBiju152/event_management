import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Badge, Modal, Form, Row, Col } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';

const dummyPayments = [
  {
    id: 1,
    eventType: 'Wedding',
    eventDate: '2025-12-15',
    totalAmount: 100000,
    paidAmount: 50000,
    dueAmount: 50000,
    status: 'Half Paid',
  },
  {
    id: 2,
    eventType: 'Birthday Party',
    eventDate: '2025-10-05',
    totalAmount: 30000,
    paidAmount: 0,
    dueAmount: 30000,
    status: 'Pending',
  },
  {
    id: 3,
    eventType: 'Corporate Event',
    eventDate: '2025-08-20',
    totalAmount: 80000,
    paidAmount: 0,
    dueAmount: 80000,
    status: 'Pending',
  },
];

const PaymentPage = () => {
  const [payments, setPayments] = useState(dummyPayments);
  const [showPayModal, setShowPayModal] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [paymentAmount, setPaymentAmount] = useState(0);
  
  const location = useLocation();

  // Check if there's any booking data passed through navigation
  useEffect(() => {
    if (location.state?.selectedBooking) {
      const booking = location.state.selectedBooking;
      
      // Find if this booking already exists in our payments list
      const existingPaymentIndex = payments.findIndex(p => p.id === booking.id);
      
      if (existingPaymentIndex >= 0) {
        // Select the existing payment for immediate payment
        handlePayNow(payments[existingPaymentIndex]);
      }
    }
  }, [location.state]);

  const handlePayNow = (payment) => {
    setSelectedPayment(payment);
    setPaymentAmount(payment.dueAmount);
    setShowPayModal(true);
  };

  const handleCloseModal = () => {
    setShowPayModal(false);
  };

  const handleCompletePayment = () => {
    // Update payment status
    const updatedPayments = payments.map(payment => {
      if (payment.id === selectedPayment.id) {
        const newPaidAmount = payment.paidAmount + parseInt(paymentAmount);
        const newDueAmount = payment.totalAmount - newPaidAmount;
        
        let newStatus = 'Pending';
        if (newDueAmount === 0) {
          newStatus = 'Fully Paid';
        } else if (newPaidAmount > 0) {
          newStatus = 'Half Paid';
        }
        
        return {
          ...payment,
          paidAmount: newPaidAmount,
          dueAmount: newDueAmount,
          status: newStatus
        };
      }
      return payment;
    });
    
    setPayments(updatedPayments);
    setShowPayModal(false);
    
    // Show success message (you might want to replace with a proper toast notification)
    alert('Payment successful!');
  };

  return (
    <Container className="py-5" style={{ minHeight: '80vh', marginTop: '86px' }}>
      <h2 className="fw-bold mb-4 text-center">My Payments</h2>
      <Table striped bordered hover responsive className="shadow-sm">
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>Event Type</th>
            <th>Total Amount</th>
            <th>Paid Amount</th>
            <th>Due Amount</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment, index) => (
            <tr key={payment.id}>
              <td>{index + 1}</td>
              <td>{payment.eventType}</td>
              <td>₹{payment.totalAmount}</td>
              <td>₹{payment.paidAmount}</td>
              <td>₹{payment.dueAmount}</td>
              <td>
                <Badge bg={
                  payment.status === 'Half Paid' ? 'info' :
                  payment.status === 'Pending' ? 'warning' :
                  'success'
                }>
                  {payment.status}
                </Badge>
              </td>
              <td>
                {payment.dueAmount > 0 ? (
                  <Button 
                    variant="success" 
                    size="sm"
                    onClick={() => handlePayNow(payment)}
                  >
                    Pay Now
                  </Button>
                ) : (
                  <Badge bg="secondary">Paid</Badge>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Payment Modal */}
      <Modal show={showPayModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Complete Payment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedPayment && (
            <>
              <div className="mb-4">
                <h5>{selectedPayment.eventType}</h5>
                <p className="text-muted">Event Date: {selectedPayment.eventDate}</p>
                <hr />
                <Row>
                  <Col><strong>Total Amount:</strong></Col>
                  <Col className="text-end">₹{selectedPayment.totalAmount}</Col>
                </Row>
                <Row>
                  <Col><strong>Already Paid:</strong></Col>
                  <Col className="text-end">₹{selectedPayment.paidAmount}</Col>
                </Row>
                <Row className="mb-3">
                  <Col><strong>Due Amount:</strong></Col>
                  <Col className="text-end">₹{selectedPayment.dueAmount}</Col>
                </Row>
              </div>

              <Form.Group className="mb-3">
                <Form.Label>Payment Amount</Form.Label>
                <Form.Control 
                  type="number" 
                  value={paymentAmount}
                  onChange={(e) => setPaymentAmount(e.target.value)}
                  max={selectedPayment.dueAmount}
                />
                <Form.Text className="text-muted">
                  You can pay partial or full amount
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Payment Method</Form.Label>
                <div>
                  <Form.Check
                    type="radio"
                    label="UPI"
                    name="paymentMethod"
                    id="upi"
                    checked={paymentMethod === 'upi'}
                    onChange={() => setPaymentMethod('upi')}
                  />
                  <Form.Check
                    type="radio"
                    label="Credit/Debit Card"
                    name="paymentMethod"
                    id="card"
                    checked={paymentMethod === 'card'}
                    onChange={() => setPaymentMethod('card')}
                  />
                  <Form.Check
                    type="radio"
                    label="Net Banking"
                    name="paymentMethod"
                    id="netbanking"
                    checked={paymentMethod === 'netbanking'}
                    onChange={() => setPaymentMethod('netbanking')}
                  />
                </div>
              </Form.Group>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button 
            variant="primary" 
            onClick={handleCompletePayment}
            disabled={paymentAmount <= 0 || paymentAmount > selectedPayment?.dueAmount}
          >
            Pay ₹{paymentAmount}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default PaymentPage;