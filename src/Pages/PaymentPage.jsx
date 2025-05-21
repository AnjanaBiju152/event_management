import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Badge, Modal, Form, Row, Col } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { jsPDF } from 'jspdf';
import { FaUserCircle, FaArrowLeft } from "react-icons/fa";

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
    totalAmount: 0,
    paidAmount: 0,
    dueAmount: 0,
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
  const navigate = useNavigate();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const bookingId = queryParams.get('bookingId');
    if (bookingId) {
      const payment = payments.find((p) => p.id === parseInt(bookingId));
      if (payment && payment.dueAmount > 0) {
        handlePayNow(payment);
      }
    }
  }, [location.search, payments]);

  const handlePayNow = (payment) => {
    setSelectedPayment(payment);
    setPaymentAmount(payment.dueAmount * 0.5); // Default to 50% of due amount
    setPaymentMethod('upi');
    setShowPayModal(true);
  };

  const handleCloseModal = () => {
    setShowPayModal(false);
    setSelectedPayment(null);
    setPaymentAmount(0);
  };

  const generateReceipt = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('Eventara Payment Receipt', 20, 20);
    doc.setFontSize(12);
    doc.text(`Payment ID: ${selectedPayment.id}`, 20, 30);
    doc.text(`Event: ${selectedPayment.eventType}`, 20, 40);
    doc.text(`Date: ${selectedPayment.eventDate}`, 20, 50);
    doc.text(`Amount Paid: ₹${paymentAmount.toLocaleString()}`, 20, 60);
    doc.text(`Payment Method: ${paymentMethod.toUpperCase()}`, 20, 70);
    doc.text(`Transaction Date: ${new Date().toLocaleString()}`, 20, 80);
    doc.text(`Remaining Balance: ₹${(selectedPayment.dueAmount - paymentAmount).toLocaleString()}`, 20, 90);
    doc.save(`receipt_${selectedPayment.id}_${Date.now()}.pdf`);
  };

  const handleCompletePayment = () => {
    const updatedPayments = payments.map((payment) => {
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
          status: newStatus,
        };
      }
      return payment;
    });
    setPayments(updatedPayments);
    generateReceipt();
    alert(`Payment of ₹${paymentAmount.toLocaleString()} successful! Receipt downloaded.`);
    handleCloseModal();
    navigate('/user/bookings'); // Redirect back to MyBookings
  };

  return (
    <Container className="py-5" style={{ minHeight: '80vh', marginTop: '86px' }}>
      <div className="mb-4">
              <a href="/user/dashboard" className="text-decoration-none text-secondary">
                <FaArrowLeft className="me-2" />
                Back 
              </a>
            </div>
      <h2 className="fw-bold mb-4 text-center">My Payments</h2>
      <Table striped bordered hover responsive className="shadow-sm">
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>Event Type</th>
            <th>Event Date</th>
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
              <td>{payment.eventDate}</td>
              <td>₹{payment.totalAmount.toLocaleString()}</td>
              <td>₹{payment.paidAmount.toLocaleString()}</td>
              <td>₹{payment.dueAmount.toLocaleString()}</td>
              <td>
                <Badge
                  bg={
                    payment.status === 'Fully Paid'
                      ? 'success'
                      : payment.status === 'Half Paid'
                        ? 'info'
                        : 'warning'
                  }
                >
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

      <Modal show={showPayModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Complete Payment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedPayment ? (
            <>
              <div className="mb-4">
                <h5>{selectedPayment.eventType}</h5>
                <p className="text-muted">Event Date: {selectedPayment.eventDate}</p>
                <hr />
                <Row>
                  <Col><strong>Total Amount:</strong></Col>
                  <Col className="text-end">₹{selectedPayment.totalAmount.toLocaleString()}</Col>
                </Row>
                <Row>
                  <Col><strong>Already Paid:</strong></Col>
                  <Col className="text-end">₹{selectedPayment.paidAmount.toLocaleString()}</Col>
                </Row>
                <Row className="mb-3">
                  <Col><strong>Due Amount:</strong></Col>
                  <Col className="text-end">₹{selectedPayment.dueAmount.toLocaleString()}</Col>
                </Row>
              </div>

              <Form.Group className="mb-3">
                <Form.Label>Payment Amount (₹)</Form.Label>
                <Form.Control
                  type="number"
                  value={paymentAmount}
                  onChange={(e) => setPaymentAmount(Number(e.target.value))}
                  min={selectedPayment.dueAmount * 0.2}
                  max={selectedPayment.dueAmount}
                  className="form-control-lg"
                />
                <Form.Text className="text-muted">
                  You can pay between 20% (₹{(selectedPayment.dueAmount * 0.2).toLocaleString()}) and the full amount.
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

              <div className="d-flex justify-content-between align-items-center mt-4">
                <div>
                  <h5 className="mb-0">Amount to Pay:</h5>
                  <p className="text-muted">Selected amount</p>
                </div>
                <h4 className="text-primary mb-0">₹{paymentAmount.toLocaleString()}</h4>
              </div>
            </>
          ) : (
            <p>Loading payment details...</p>
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
            Pay ₹{paymentAmount.toLocaleString()}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default PaymentPage;