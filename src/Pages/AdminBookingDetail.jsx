import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Row, Col, ListGroup, Tabs, Tab, Badge } from 'react-bootstrap';
import { jsPDF } from 'jspdf';

const AdminBookingDetail = ({ show, handleClose, booking, adminComment, setAdminComment, paymentInfo }) => {
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
  const [activeTab, setActiveTab] = useState('details');
  const [approvalStatus, setApprovalStatus] = useState(false);

  useEffect(() => {
    if (paymentInfo?.totalAmount) {
      setTotalAmount(paymentInfo.totalAmount);
      const baseAmount = Math.floor(paymentInfo.totalAmount / 6);
      setBreakdown({
        venueCharge: baseAmount,
        cateringCharge: baseAmount,
        decorationCharge: baseAmount,
        photographyCharge: baseAmount,
        musicCharge: baseAmount,
        otherCharges: paymentInfo.totalAmount - baseAmount * 5,
      });
    }
  }, [paymentInfo]);

  useEffect(() => {
    if (booking) {
      if (booking.budget) {
        setTotalAmount(booking.budget);
        const baseAmount = Math.floor(booking.budget / 6);
        setBreakdown({
          venueCharge: baseAmount,
          cateringCharge: booking.eventType === 'Wedding' ? baseAmount * 1.5 : baseAmount,
          decorationCharge: booking.eventType === 'Corporate Event' ? baseAmount * 0.8 : baseAmount,
          photographyCharge: booking.eventType === 'Birthday Party' ? baseAmount * 0.7 : baseAmount,
          musicCharge: booking.eventType === 'Wedding' ? baseAmount * 1.2 : baseAmount,
          otherCharges: baseAmount * 0.5,
        });
      }
      setApprovalStatus(booking.status === 'Approved');
    }
  }, [booking]);

  const calculateTotal = () => {
    const total = Object.values(breakdown).reduce((sum, value) => sum + (parseInt(value) || 0), 0);
    setTotalAmount(total);
  };

  const handleBreakdownChange = (e) => {
    const { name, value } = e.target;
    setBreakdown({ ...breakdown, [name]: value });
  };

  const handleNoteChange = (e) => {
    setNote(e.target.value);
  };

  const handleAdminCommentChange = (e) => {
    if (setAdminComment) {
      setAdminComment(e.target.value);
    }
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text('Eventara Bill', 20, 20);
    doc.text(`Event: ${booking.eventType}`, 20, 30);
    doc.text(`User  Date: ${booking.eventDate}`, 20, 40);
    doc.text(`User: ${booking.userName}`, 20, 50);
    doc.text('Price Breakdown:', 20, 60);
    doc.text(`Venue: ₹${breakdown.venueCharge}`, 30, 70);
    doc.text(`Catering: ₹${breakdown.cateringCharge}`, 30, 80);
    doc.text(`Decoration: ₹${breakdown.decorationCharge}`, 30, 90);
    doc.text(`Photography: ₹${breakdown.photographyCharge}`, 30, 100);
    doc.text(`Music: ₹${breakdown.musicCharge}`, 30, 110);
    doc.text(`Other: ₹${breakdown.otherCharges}`, 30, 120);
    doc.text(`Total: ₹${totalAmount}`, 30, 130);
    if (note) {
      doc.text('Note:', 20, 140);
      doc.text(note, 30, 150);
    }
    doc.save(`bill_${booking.id}.pdf`);
  };

  const handleApproveAndSendBill = () => {
    if (window.confirm(isPaymentReminder ? 'Send payment reminder?' : 'Approve and send bill?')) {
      const isPaymentReminder = paymentInfo && paymentInfo.dueAmount > 0;
      if (isPaymentReminder) {
        alert(`Payment reminder of ₹${paymentInfo.dueAmount} sent to ${booking?.userName} for ${booking?.eventType}`);
      } else {
        alert(`Bill of ₹${totalAmount} prepared for ${booking?.userName}'s ${booking?.eventType}`);
      }
      handleClose(true);
    }
  };

  const isPaymentReminder = paymentInfo && paymentInfo.dueAmount > 0;
  const buttonText = isPaymentReminder ? 'Send Payment Reminder' : approvalStatus ? 'Update Details' : 'Approve & Send Bill';
  const modalTitle = isPaymentReminder ? 'Payment Reminder' : 'Event Request Details';

  const getStatusBadge = (status) => {
    let variant = 'secondary';
    switch (status) {
      case 'Approved':
        variant = 'success';
        break;
      case 'Rejected':
        variant = 'danger';
        break;
      case 'Pending':
        variant = 'warning';
        break;
      default:
        variant = 'secondary';
    }
    return <Badge bg={variant}>{status}</Badge>;
  };

  return (
    <Modal show={show} onHide={() => handleClose(false)} size="lg">
      <Modal.Header closeButton className="bg-light">
        <Modal.Title className="d-flex align-items-center gap-2">
          {modalTitle} {booking && getStatusBadge(booking.status)}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {booking ? (
          <Tabs activeKey={activeTab} onSelect={(k) => setActiveTab(k)} className="mb-3">
            <Tab eventKey="details" title="Event Details">
              <Row>
                <Col md={6}>
                  <ListGroup variant="flush" className="mb-3">
                    <ListGroup.Item className="d-flex justify-content-between">
                      <strong>Request ID:</strong> <span>#{booking.id}</span>
                    </ListGroup.Item>
                    <ListGroup.Item className="d-flex justify-content-between">
                      <strong>User:</strong> <span>{booking.userName}</span>
                    </ListGroup.Item>
                    <ListGroup.Item className="d-flex justify-content-between">
                      <strong>Email:</strong> <span>{booking.userEmail}</span>
                    </ListGroup.Item>
                    <ListGroup.Item className="d-flex justify-content-between">
                      <strong>Event Type:</strong> <span>{booking.eventType}</span>
                    </ListGroup.Item>
                    <ListGroup.Item className="d-flex justify-content-between">
                      <strong>Date:</strong> <span>{new Date(booking.eventDate).toLocaleDateString()}</span>
                    </ListGroup.Item>
                    <ListGroup.Item className="d-flex justify-content-between">
                      <strong>Guest Count:</strong> <span>{booking.guestCount}</span>
                    </ListGroup.Item>
                  </ListGroup>
                </Col>
                <Col md={6}>
                  <ListGroup variant="flush" className="mb-3">
                    <ListGroup.Item className="d-flex justify-content-between">
                      <strong>Budget:</strong> <span>₹{booking.budget?.toLocaleString()}</span>
                    </ListGroup.Item>
                    <ListGroup.Item className="d-flex justify-content-between">
                      <strong>Status:</strong> <span>{getStatusBadge(booking.status)}</span>
                    </ListGroup.Item>
                    <ListGroup.Item className="d-flex justify-content-between">
                      <strong>Destination:</strong> <span>{booking.destination}</span>
                    </ListGroup.Item>
                    <ListGroup.Item className="d-flex justify-content-between">
                      <strong>Request Date:</strong> <span>{new Date(booking.createdAt).toLocaleDateString()}</span>
                    </ListGroup.Item>
                  </ListGroup>
                </Col>
              </Row>
              <div className="mt-3">
                <h5>Services Requested</h5>
                <Row className="g-3">
                  <Col md={4}>
                    <div className="border rounded p-2">
                      <strong>Flower Design:</strong> {booking.flowerDesign}
                    </div>
                  </Col>
                  <Col md={4}>
                    <div className="border rounded p-2">
                      <strong>Photography:</strong> {booking.photography}
                    </div>
                  </Col>
                  <Col md={4}>
                    <div className="border rounded p-2">
                      <strong>Catering:</strong> {booking.catering}
                    </div>
                  </Col>
                  <Col md={4}>
                    <div className="border rounded p-2">
                      <strong>Decoration:</strong> {booking.decoration}
                    </div>
                  </Col>
                  <Col md={4}>
                    <div className="border rounded p-2">
                      <strong>Music:</strong> {booking.music}
                    </div>
                  </Col>
                </Row>
              </div>
              {booking.specialRequirements && (
                <div className="mt-4">
                  <h5>Special Requirements</h5>
                  <div className="border p-3 rounded bg-light">{booking.specialRequirements}</div>
                </div>
              )}
              {booking.rejectReason && (
                <div className="mt-4">
                  <h5>Rejection Reason</h5>
                  <div className="border p-3 rounded bg-danger bg-opacity-10 text-danger">{booking.rejectReason}</div>
                </div>
              )}
              {booking.adminComment && (
                <div className="mt-4">
                  <h5>Previous Admin Comments</h5>
                  <div className="border p-3 rounded bg-info bg-opacity-10">{booking.adminComment}</div>
                </div>
              )}
            </Tab>
            <Tab eventKey="pricing" title="Pricing & Approval" disabled={booking.status === 'Rejected'}>
              <Form>
                {!isPaymentReminder ? (
                  <>
                    <h5 className="mb-3">Price Calculation</h5>
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
                  <Form.Label>{booking.status === 'Pending' ? 'Add Comment for Client' : 'Add a Note'}</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={adminComment || note}
                    onChange={adminComment !== undefined ? handleAdminCommentChange : handleNoteChange}
                    placeholder={
                      booking.status === 'Pending'
                        ? 'Add any instructions, comments, or clarification for the client'
                        : 'Add internal notes about this booking'
                    }
                  />
                  <Form.Text className="text-muted">
                    {booking.status === 'Pending' ? 'This comment will be visible to the client' : 'This note is for admin reference only'}
                  </Form.Text>
                </Form.Group>
              </Form>
            </Tab>
            <Tab eventKey="timeline" title="Activity Timeline">
              <div className="timeline mt-3">
                <div className="timeline-item">
                  <div className="timeline-marker bg-primary"></div>
                  <div className="timeline-content">
                    <h6 className="mb-0">Booking Created</h6>
                    <p className="text-muted small mb-0">{new Date(booking.createdAt).toLocaleString()}</p>
                    <p>New booking request submitted by {booking.userName}</p>
                  </div>
                </div>
                {booking.status !== 'Pending' && (
                  <div className="timeline-item">
                    <div className={`timeline-marker ${booking.status === 'Approved' ? 'bg-success' : 'bg-danger'}`}></div>
                    <div className="timeline-content">
                      <h6 className="mb-0">Booking {booking.status}</h6>
                      <p className="text-muted small mb-0">
                        {new Date(Date.parse(booking.createdAt) + 86400000).toLocaleString()}
                      </p>
                      <p>
                        {booking.status === 'Approved'
                          ? `Booking approved with total amount of ₹${totalAmount}`
                          : `Booking rejected: ${booking.rejectReason || 'No reason provided'}`}
                      </p>
                    </div>
                  </div>
                )}
                {booking.status === 'Approved' && (
                  <div className="timeline-item">
                    <div className="timeline-marker bg-info"></div>
                    <div className="timeline-content">
                      <h6 className="mb-0">Confirmation Sent</h6>
                      <p className="text-muted small mb-0">
                        {new Date(Date.parse(booking.createdAt) + 86400000 + 3600000).toLocaleString()}
                      </p>
                      <p>Confirmation email sent to client with pricing details</p>
                    </div>
                  </div>
                )}
              </div>
              <style jsx="true">{`
                .timeline {
                  position: relative;
                  padding-left: 30px;
                }
                .timeline:before {
                  content: '';
                  position: absolute;
                  left: 10px;
                  top: 0;
                  height: 100%;
                  width: 2px;
                  background: #e9ecef;
                }
                .timeline-item {
                  position: relative;
                  padding-bottom: 20px;
                }
                .timeline-marker {
                  position: absolute;
                  left: -30px;
                  top: 0;
                  width: 20px;
                  height: 20px;
                  border-radius: 50%;
                }
                .timeline-content {
                  padding-bottom: 10px;
                  border-bottom: 1px solid #e9ecef;
                }
              `}</style>
            </Tab>
          </Tabs>
        ) : (
          <div className="text-center p-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3">Loading booking details...</p>
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => handleClose(false)}>
          Close
        </Button>
        {booking && booking.status === 'Pending' && (
          <Button variant="primary" onClick={generatePDF}>
            Preview Bill
          </Button>
        )}
        {booking && (
          <Button
            variant="success"
            onClick={handleApproveAndSendBill}
            disabled={!totalAmount && !isPaymentReminder}
          >
            {buttonText}
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default AdminBookingDetail;