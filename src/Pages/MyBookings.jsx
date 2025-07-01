import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Badge, Button, ProgressBar } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { jsPDF } from 'jspdf';
import { FaArrowLeft } from "react-icons/fa";
import UserBillNotification from './UserBillNotification';
import { getUserBookingsApi } from '../services/allApi';

const MyBookings = () => {
  const [showBillModal, setShowBillModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const result = await getUserBookingsApi();
        if (result.status === 200) {
          setBookings(result.data);
        }
      } catch (error) {
        console.error('Error fetching bookings:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  const handleViewBill = (booking) => {
    setSelectedBooking(booking);
    setShowBillModal(true);
    if (booking.hasNewBill) {
      const updatedBookings = bookings.map((b) =>
        b._id === booking._id ? { ...b, hasNewBill: false } : b
      );
      setBookings(updatedBookings);
    }
  };

  const handlePayNow = (booking) => {
    navigate('/user/payments', { state: { selectedBooking: booking } });
  };

  const handleContactAdmin = (booking) => {
    const message = prompt(`Query for ${booking.eventId?.eventType} (ID: ${booking._id}):`);
    if (message) {
      alert('Your query has been sent to the admin.');
    }
  };

  const generateBillPDF = (booking) => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('Eventara Bill', 20, 20);
    doc.setFontSize(12);
    doc.text(`Bill ID: ${booking._id.slice(-6)}`, 20, 30);
    doc.text(`Event: ${booking.eventId?.eventType || 'N/A'}`, 20, 40);
    doc.text(`Date: ${new Date(booking.eventId?.eventDate).toLocaleDateString() || 'N/A'}`, 20, 50);
    doc.text('Price Breakdown:', 20, 60);
    
    const breakdown = booking.priceBreakdown || {
      venueCharge: booking.totalAmount * 0.3,
      cateringCharge: booking.totalAmount * 0.35,
      decorationCharge: booking.totalAmount * 0.2,
      photographyCharge: booking.totalAmount * 0.08,
      musicCharge: booking.totalAmount * 0.05,
      otherCharges: booking.totalAmount * 0.02,
    };

    doc.text(`Venue: ₹${breakdown.venueCharge?.toLocaleString() || '0'}`, 30, 70);
    doc.text(`Catering: ₹${breakdown.cateringCharge?.toLocaleString() || '0'}`, 30, 80);
    doc.text(`Decoration: ₹${breakdown.decorationCharge?.toLocaleString() || '0'}`, 30, 90);
    doc.text(`Photography: ₹${breakdown.photographyCharge?.toLocaleString() || '0'}`, 30, 100);
    doc.text(`Music: ₹${breakdown.musicCharge?.toLocaleString() || '0'}`, 30, 110);
    doc.text(`Other: ₹${breakdown.otherCharges?.toLocaleString() || '0'}`, 30, 120);
    doc.text(`Total: ₹${booking.totalAmount?.toLocaleString() || '0'}`, 30, 130);
    doc.text('Note: Thank you for choosing Eventara!', 20, 140);
    doc.save(`bill_${booking._id.slice(-6)}.pdf`);
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

  if (loading) {
    return (
      <Container className="py-5" style={{ minHeight: '80vh', marginTop: '86px' }}>
        <div className="text-center py-5">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-5" style={{ minHeight: '80vh', marginTop: '86px' }}>
      <div className="mb-4">
        <a href="/user/dashboard" className="text-decoration-none text-secondary">
          <FaArrowLeft className="me-2" />
          Back
        </a>
      </div>
      <h2 className="fw-bold mb-4 text-center">My Bookings</h2>
      
      {bookings.some((booking) => booking.hasNewBill) && (
        <div className="alert alert-info mb-4" role="alert">
          <i className="bi bi-bell-fill me-2"></i>
          You have new approved bookings with pending payments!
        </div>
      )}

      {bookings.length === 0 ? (
        <div className="text-center py-5">
          <h4>No bookings found</h4>
          <p>You haven't made any bookings yet.</p>
        </div>
      ) : (
        <Row className="g-4">
          {bookings.map((booking) => {
            const paidAmount = booking.paymentHistory?.reduce(
              (sum, payment) => sum + (payment.status === 'Completed' ? payment.amountPaid : 0),
              0
            ) || 0;
            const dueAmount = booking.totalAmount - paidAmount;

            return (
              <Col md={4} key={booking._id}>
                <Card className={`shadow-sm ${booking.hasNewBill ? 'border-primary' : ''}`}>
                  {booking.hasNewBill && (
                    <div className="position-absolute top-0 end-0 m-2">
                      <Badge bg="primary" pill>New</Badge>
                    </div>
                  )}
                  <Card.Body>
                    <Card.Title>{booking.eventId?.eventType || 'Event'}</Card.Title>
                    <Card.Text>
                      <strong>Date:</strong> {new Date(booking.eventId?.eventDate).toLocaleDateString()} <br />
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
                      {booking.bookingStatus === 'Rejected' && booking.rejectReason && (
                        <small className="text-danger d-block mt-1">
                          <strong>Reason:</strong> {booking.rejectReason}
                        </small>
                      )}
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
                          <strong>Total Amount:</strong> ₹{booking.totalAmount?.toLocaleString() || '0'} <br />
                          {booking.paymentStatus !== 'Pending' && (
                            <>
                              <strong>Paid:</strong> ₹{paidAmount.toLocaleString()} <br />
                              <strong>Due:</strong> ₹{dueAmount.toLocaleString()} <br />
                              <ProgressBar
                                now={(paidAmount / booking.totalAmount) * 100}
                                label={`${Math.round((paidAmount / booking.totalAmount) * 100)}% Paid`}
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
                                className={`mb-0 ${stage.completed ? `text-${stage.color}` : 'text-muted'}`}
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
                      {dueAmount > 0 && booking.bookingStatus === 'Approved' && (
                        <Button variant="success" onClick={() => handlePayNow(booking)}>
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
            );
          })}
        </Row>
      )}

      <UserBillNotification
        show={showBillModal}
        handleClose={() => setShowBillModal(false)}
        bill={
          selectedBooking
            ? {
                id: selectedBooking._id,
                eventType: selectedBooking.eventId?.eventType || 'Event',
                eventDate: new Date(selectedBooking.eventId?.eventDate).toLocaleDateString(),
                totalAmount: selectedBooking.totalAmount,
                breakdown: selectedBooking.priceBreakdown || {
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