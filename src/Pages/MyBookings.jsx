import React, { useState } from 'react';
import { Container, Row, Col, Card, Badge, Button, ProgressBar } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { jsPDF } from 'jspdf';
import UserBillNotification from './UserBillNotification';

const dummyBookings = [
  {
    id: 1,
    eventType: 'Wedding',
    eventDate: '2025-12-15',
    bookingStatus: 'Approved',
    paymentStatus: 'Half Paid',
    totalAmount: 100000,
    paidAmount: 50000,
    dueAmount: 50000,
    hasBill: true,
    hasNewBill: false,
  },
  {
    id: 2,
    eventType: 'Birthday Party',
    eventDate: '2025-10-05',
    bookingStatus: 'Pending',
    paymentStatus: 'Pending',
    totalAmount: 0,
    paidAmount: 0,
    dueAmount: 0,
    hasBill: false,
    hasNewBill: false,
  },
  {
    id: 3,
    eventType: 'Corporate Event',
    eventDate: '2025-08-20',
    bookingStatus: 'Approved',
    paymentStatus: 'Pending',
    totalAmount: 80000,
    paidAmount: 0,
    dueAmount: 80000,
    hasBill: true,
    hasNewBill: true,
  },
];

const MyBookings = () => {
  const [showBillModal, setShowBillModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [bookings, setBookings] = useState(dummyBookings);
  const navigate = useNavigate();

  const handleViewBill = (booking) => {
    setSelectedBooking(booking);
    setShowBillModal(true);
    if (booking.hasNewBill) {
      const updatedBookings = bookings.map((b) => {
        if (b.id === booking.id) {
          return { ...b, hasNewBill: false };
        }
        return b;
      });
      setBookings(updatedBookings);
    }
  };

  const handlePayNow = (booking) => {
    navigate('/user/payments', { state: { selectedBooking: booking } });
  };

  const handleContactAdmin = (booking) => {
    const message = prompt(`Query for ${booking.eventType} (ID: ${booking.id}):`);
    if (message) {
      alert('Your query has been sent to the admin.');
    }
  };

  const generateBillPDF = (booking) => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('Eventara Bill', 20, 20);
    doc.setFontSize(12);
    doc.text(`Bill ID: ${booking.id}`, 20, 30);
    doc.text(`Event: ${booking.eventType}`, 20, 40);
    doc.text(`Date: ${booking.eventDate}`, 20, 50);
    doc.text('Price Breakdown:', 20, 60);
    const breakdown = {
      venueCharge: booking.totalAmount * 0.3,
      cateringCharge: booking.totalAmount * 0.35,
      decorationCharge: booking.totalAmount * 0.2,
      photographyCharge: booking.totalAmount * 0.08,
      musicCharge: booking.totalAmount * 0.05,
      otherCharges: booking.totalAmount * 0.02,
    };
    doc.text(`Venue: ₹${breakdown.venueCharge.toLocaleString()}`, 30, 70);
    doc.text(`Catering: ₹${breakdown.cateringCharge.toLocaleString()}`, 30, 80);
    doc.text(`Decoration: ₹${breakdown.decorationCharge.toLocaleString()}`, 30, 90);
    doc.text(`Photography: ₹${breakdown.photographyCharge.toLocaleString()}`, 30, 100);
    doc.text(`Music: ₹${breakdown.musicCharge.toLocaleString()}`, 30, 110);
    doc.text(`Other: ₹${breakdown.otherCharges.toLocaleString()}`, 30, 120);
    doc.text(`Total: ₹${booking.totalAmount.toLocaleString()}`, 30, 130);
    doc.text('Note: Thank you for choosing Eventara!', 20, 140);
    doc.save(`bill_${booking.id}.pdf`);
  };

  const getTimelineStages = (booking) => {
    const stages = [
      { name: 'Request Sent', completed: true, color: 'primary' },
      {
        name: 'Pending Review',
        completed: booking.bookingStatus !== 'Pending',
        color: 'warning',
      },
      {
        name: 'Approved',
        completed: booking.bookingStatus === 'Approved',
        color: 'success',
      },
      {
        name: 'Partially Paid',
        completed: booking.paymentStatus === 'Half Paid' || booking.paymentStatus === 'Fully Paid',
        color: 'info',
      },
      {
        name: 'Fully Paid',
        completed: booking.paymentStatus === 'Fully Paid',
        color: 'success',
      },
    ];
    return stages;
  };

  return (
    <Container className="py-5" style={{ minHeight: '80vh', marginTop: '86px' }}>
      <h2 className="fw-bold mb-4 text-center">My Bookings</h2>
      {bookings.some((booking) => booking.hasNewBill) && (
        <div className="alert alert-info mb-4" role="alert">
          <i className="bi bi-bell-fill me-2"></i>
          You have new approved bookings with pending payments!
        </div>
      )}
      <Row className="g-4">
        {bookings.map((booking) => (
          <Col md={4} key={booking.id}>
            <Card className={`shadow-sm ${booking.hasNewBill ? 'border-primary' : ''}`}>
              {booking.hasNewBill && (
                <div className="position-absolute top-0 end-0 m-2">
                  <Badge bg="primary" pill>New</Badge>
                </div>
              )}
              <Card.Body>
                <Card.Title>{booking.eventType}</Card.Title>
                <Card.Text>
                  <strong>Date:</strong> {booking.eventDate} <br />
                  <strong>Booking Status:</strong>{' '}
                  <Badge
                    bg={
                      booking.bookingStatus === 'Approved'
                        ? 'success'
                        : booking.bookingStatus === 'Pending'
                        ? 'warning'
                        : 'danger'
                    }
                  >
                    {booking.bookingStatus}
                  </Badge>{' '}
                  <br />
                  <strong>Payment Status:</strong>{' '}
                  <Badge
                    bg={
                      booking.paymentStatus === 'Half Paid'
                        ? 'info'
                        : booking.paymentStatus === 'Pending'
                        ? 'warning'
                        : booking.paymentStatus === 'Fully Paid'
                        ? 'success'
                        : 'secondary'
                    }
                  >
                    {booking.paymentStatus}
                  </Badge>
                  {booking.bookingStatus === 'Approved' && (
                    <>
                      <br />
                      <strong>Total Amount:</strong> ₹{booking.totalAmount.toLocaleString()} <br />
                      {booking.paymentStatus !== 'Pending' && (
                        <>
                          <strong>Paid:</strong> ₹{booking.paidAmount.toLocaleString()} <br />
                          <strong>Due:</strong> ₹{booking.dueAmount.toLocaleString()} <br />
                          <ProgressBar
                            now={(booking.paidAmount / booking.totalAmount) * 100}
                            label={`${Math.round((booking.paidAmount / booking.totalAmount) * 100)}% Paid`}
                            variant={
                              booking.paymentStatus === 'Fully Paid'
                                ? 'success'
                                : booking.paymentStatus === 'Half Paid'
                                ? 'info'
                                : 'warning'
                            }
                            className="mt-2"
                          />
                        </>
                      )}
                    </>
                  )}
                </Card.Text>
                <div className="mt-3">
                  <h6>Booking Progress</h6>
                  <div className="timeline">
                    {getTimelineStages(booking).map((stage, index) => (
                      <div className="timeline-item" key={index}>
                        <div
                          className={`timeline-marker bg-${stage.completed ? stage.color : 'secondary'}`}
                        ></div>
                        <div className="timeline-content">
                          <h6
                            className={`mb-0 ${
                              stage.completed ? `text-${stage.color}` : 'text-muted'
                            }`}
                          >
                            {stage.name}
                          </h6>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="d-grid gap-2 mt-3">
                  {booking.hasBill && (
                    <>
                      <Button
                        variant={booking.hasNewBill ? 'primary' : 'outline-primary'}
                        onClick={() => handleViewBill(booking)}
                      >
                        {booking.hasNewBill ? 'View New Bill' : 'View Bill'}
                      </Button>
                      <Button
                        variant="outline-secondary"
                        onClick={() => generateBillPDF(booking)}
                      >
                        Download Bill
                      </Button>
                    </>
                  )}
                  {booking.dueAmount > 0 && (
                    <Button
                      variant="success"
                      onClick={() => handlePayNow(booking)}
                    >
                      Pay Now
                    </Button>
                  )}
                  <Button
                    variant="outline-info"
                    onClick={() => handleContactAdmin(booking)}
                  >
                    Contact Admin
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <UserBillNotification
        show={showBillModal}
        handleClose={() => setShowBillModal(false)}
        bill={
          selectedBooking
            ? {
                id: selectedBooking.id,
                eventType: selectedBooking.eventType,
                eventDate: selectedBooking.eventDate,
                totalAmount: selectedBooking.totalAmount,
                breakdown: {
                  venueCharge: selectedBooking.totalAmount * 0.3,
                  cateringCharge: selectedBooking.totalAmount * 0.35,
                  decorationCharge: selectedBooking.totalAmount * 0.2,
                  photographyCharge: selectedBooking.totalAmount * 0.08,
                  musicCharge: selectedBooking.totalAmount * 0.05,
                  otherCharges: selectedBooking.totalAmount * 0.02,
                },
                note: 'Thank you for choosing Eventara!',
              }
            : null
        }
      />
      <style jsx="true">{`
        .timeline {
          position: relative;
          padding-left: 20px;
          margin-top: 10px;
        }
        .timeline:before {
          content: '';
          position: absolute;
          left: 8px;
          top: 0;
          height: 100%;
          width: 2px;
          background: #e9ecef;
        }
        .timeline-item {
          position: relative;
          padding-bottom: 10px;
        }
        .timeline-marker {
          position: absolute;
          left: -20px;
          top: 0;
          width: 16px;
          height: 16px;
          border-radius: 50%;
        }
        .timeline-content {
          padding-left: 10px;
        }
      `}</style>
    </Container>
  );
};

export default MyBookings;