
import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Badge, Form, Row, Col, InputGroup } from 'react-bootstrap';
import { Search, Calendar, Filter } from 'react-bootstrap-icons';
import AdminBookingDetail from './AdminBookingDetail';

const dummyAdminBookings = [
  {
    id: 1,
    userName: 'John Doe',
    userEmail: 'john.doe@example.com',
    eventType: 'Wedding',
    eventDate: '2025-12-15',
    guestCount: 150,
    budget: 25000,
    status: 'Pending',
    flowerDesign: 'Modern',
    photography: 'Premium Photoshoot',
    catering: 'Mixed Menu',
    decoration: 'Royal Theme',
    music: 'DJ',
    destination: 'No',
    specialRequirements: 'Vegan options for 20 guests',
    createdAt: '2025-05-01'
  },
  {
    id: 2,
    userName: 'Jane Smith',
    userEmail: 'jane.smith@example.com',
    eventType: 'Birthday Party',
    eventDate: '2025-10-05',
    guestCount: 50,
    budget: 8000,
    status: 'Approved',
    flowerDesign: 'Traditional',
    photography: 'Standard Photoshoot',
    catering: 'Veg',
    decoration: 'Classic Theme',
    music: 'Live Band',
    destination: 'No',
    specialRequirements: 'Gluten-free cake',
    createdAt: '2025-04-25'
  },
  {
    id: 3,
    userName: 'Mike Johnson',
    userEmail: 'mike.j@example.com',
    eventType: 'Corporate Event',
    eventDate: '2025-08-20',
    guestCount: 200,
    budget: 30000,
    status: 'Pending',
    flowerDesign: 'Exotic',
    photography: 'Drone Coverage',
    catering: 'Non-Veg',
    decoration: 'Beach Theme',
    music: 'Traditional Dance Group',
    destination: 'No',
    specialRequirements: 'Projector setup for presentations',
    createdAt: '2025-05-02'
  },
];

const AdminBookings = () => {
  const [bookings, setBookings] = useState(dummyAdminBookings);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [adminComment, setAdminComment] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    eventType: '',
    status: '',
    dateRange: { start: '', end: '' },
  });
  const [showFilters, setShowFilters] = useState(false);
  const [filteredBookings, setFilteredBookings] = useState(bookings);

  useEffect(() => {
    let result = [...bookings];
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (booking) =>
          booking.userName.toLowerCase().includes(term) ||
          booking.userEmail.toLowerCase().includes(term) ||
          booking.id.toString().includes(term)
      );
    }
    if (filters.eventType) {
      result = result.filter((booking) => booking.eventType === filters.eventType);
    }
    if (filters.status) {
      result = result.filter((booking) => booking.status === filters.status);
    }
    if (filters.dateRange.start) {
      result = result.filter((booking) => booking.eventDate >= filters.dateRange.start);
    }
    if (filters.dateRange.end) {
      result = result.filter((booking) => booking.eventDate <= filters.dateRange.end);
    }
    setFilteredBookings(result);
  }, [searchTerm, filters, bookings]);

  const handleViewDetails = (booking) => {
    setSelectedBooking(booking);
    setAdminComment('');
    setShowDetailModal(true);
  };

  const handleApprove = (bookingId) => {
    if (window.confirm('Are you sure you want to approve this request?')) {
      const booking = bookings.find((b) => b.id === bookingId);
      setSelectedBooking(booking);
      setAdminComment('');
      setShowDetailModal(true);
    }
  };

  const handleReject = (bookingId) => {
    const rejectReason = window.prompt('Please provide a reason for rejection:');
    if (rejectReason !== null) {
      const updatedBookings = bookings.map((booking) => {
        if (booking.id === bookingId) {
          return {
            ...booking,
            status: 'Rejected',
            rejectReason: rejectReason || 'No reason provided',
          };
        }
        return booking;
      });
      setBookings(updatedBookings);
      alert(`Booking #${bookingId} has been rejected. User will be notified.`);
    }
  };

  const handleCloseModal = (approved = false, comment = '') => {
    setShowDetailModal(false);
    if (approved && selectedBooking) {
      const updatedBookings = bookings.map((booking) => {
        if (booking.id === selectedBooking?.id) {
          return {
            ...booking,
            status: 'Approved',
            adminComment: comment || 'No additional comments',
          };
        }
        return booking;
      });
      setBookings(updatedBookings);
      alert(`Booking #${selectedBooking.id} has been approved. User will be notified.`);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    if (name === 'start' || name === 'end') {
      setFilters({
        ...filters,
        dateRange: { ...filters.dateRange, [name]: value },
      });
    } else {
      setFilters({ ...filters, [name]: value });
    }
  };

  const resetFilters = () => {
    setFilters({ eventType: '', status: '', dateRange: { start: '', end: '' } });
    setSearchTerm('');
  };

  const eventTypes = [...new Set(bookings.map((booking) => booking.eventType))];

  return (
    <Container className="py-5" style={{ minHeight: '80vh', marginTop: '86px' }}>
      <h2 className="fw-bold mb-4 text-center">Event Request Management</h2>
      <div className="mb-4 bg-light p-3 rounded shadow-sm">
        <Row className="align-items-center mb-3">
          <Col md={6}>
            <InputGroup>
              <InputGroup.Text><Search /></InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Search by name, email or ID..."
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </InputGroup>
          </Col>
          <Col md={6} className="d-flex justify-content-end">
            <Button
              variant="outline-secondary"
              onClick={() => setShowFilters(!showFilters)}
              className="d-flex align-items-center gap-2"
            >
              <Filter /> {showFilters ? 'Hide Filters' : 'Show Filters'}
            </Button>
          </Col>
        </Row>
        {showFilters && (
          <Row className="g-3">
            <Col md={3}>
              <Form.Group>
                <Form.Label>Event Type</Form.Label>
                <Form.Select name="eventType" value={filters.eventType} onChange={handleFilterChange}>
                  <option value="">All Event Types</option>
                  {eventTypes.map((type, index) => (
                    <option key={index} value={type}>{type}</option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group>
                <Form.Label>Status</Form.Label>
                <Form.Select name="status" value={filters.status} onChange={handleFilterChange}>
                  <option value="">All Statuses</option>
                  <option value="Pending">Pending</option>
                  <option value="Approved">Approved</option>
                  <option value="Rejected">Rejected</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group>
                <Form.Label>From Date</Form.Label>
                <Form.Control
                  type="date"
                  name="start"
                  value={filters.dateRange.start}
                  onChange={handleFilterChange}
                />
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group>
                <Form.Label>To Date</Form.Label>
                <Form.Control
                  type="date"
                  name="end"
                  value={filters.dateRange.end}
                  onChange={handleFilterChange}
                />
              </Form.Group>
            </Col>
            <Col xs={12} className="d-flex justify-content-end">
              <Button variant="secondary" onClick={resetFilters}>Reset Filters</Button>
            </Col>
          </Row>
        )}
      </div>
      <div className="d-flex flex-wrap gap-3 mb-4">
        <div className="bg-light p-3 rounded flex-grow-1 text-center shadow-sm">
          <h6 className="text-secondary mb-1">Total Requests</h6>
          <h4>{bookings.length}</h4>
        </div>
        <div className="bg-warning bg-opacity-25 p-3 rounded flex-grow-1 text-center shadow-sm">
          <h6 className="text-warning mb-1">Pending</h6>
          <h4>{bookings.filter((b) => b.status === 'Pending').length}</h4>
        </div>
        <div className="bg-success bg-opacity-25 p-3 rounded flex-grow-1 text-center shadow-sm">
          <h6 className="text-success mb-1">Approved</h6>
          <h4>{bookings.filter((b) => b.status === 'Approved').length}</h4>
        </div>
        <div className="bg-danger bg-opacity-25 p-3 rounded flex-grow-1 text-center shadow-sm">
          <h6 className="text-danger mb-1">Rejected</h6>
          <h4>{bookings.filter((b) => b.status === 'Rejected').length}</h4>
        </div>
      </div>
      <div className="table-responsive">
        <Table striped bordered hover responsive className="shadow-sm">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>User</th>
              <th>Event Type</th>
              <th>Event Date</th>
              <th>Guest Count</th>
              <th>Budget</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredBookings.length > 0 ? (
              filteredBookings.map((booking) => (
                <tr key={booking.id}>
                  <td>#{booking.id}</td>
                  <td>
                    <div>{booking.userName}</div>
                    <small className="text-muted">{booking.userEmail}</small>
                  </td>
                  <td>{booking.eventType}</td>
                  <td>{new Date(booking.eventDate).toLocaleDateString()}</td>
                  <td>{booking.guestCount}</td>
                  <td>₹{booking.budget.toLocaleString()}</td>
                  <td>
                    <Badge
                      bg={
                        booking.status === 'Approved'
                          ? 'success'
                          : booking.status === 'Rejected'
                          ? 'danger'
                          : 'warning'
                      }
                      className="fs-6 w-100 text-center py-2"
                    >
                      {booking.status}
                    </Badge>
                  </td>
                  <td>
                    {booking.status === 'Pending' && (
                      <div className="d-flex flex-column gap-2">
                        <Button
                          variant="success"
                          size="sm"
                          className="w-100"
                          onClick={() => handleApprove(booking.id)}
                        >
                          Review & Price
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          className="w-100"
                          onClick={() => handleReject(booking.id)}
                        >
                          Reject
                        </Button>
                      </div>
                    )}
                    {booking.status !== 'Pending' && (
                      <Button
                        variant="info"
                        size="sm"
                        className="w-100"
                        onClick={() => handleViewDetails(booking)}
                      >
                        View Details
                      </Button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center py-4">
                  <div className="py-5">
                    <h5>No bookings found.</h5>
                    <p className="text-muted">Try adjusting your search or filters</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
      <div className="d-flex justify-content-between align-items-center mt-3">
        <div className="text-muted">
          Showing {filteredBookings.length} of {bookings.length} bookings
        </div>
        <div>
          <Button variant="outline-secondary" size="sm" disabled>
            Previous
          </Button>
          <Button variant="outline-primary" size="sm" className="ms-2" disabled>
            Next
          </Button>
        </div>
      </div>
      <AdminBookingDetail
        show={showDetailModal}
        handleClose={(approved) => handleCloseModal(approved, adminComment)}
        booking={selectedBooking}
        adminComment={adminComment}
        setAdminComment={setAdminComment}
      />
    </Container>
  );
};

export default AdminBookings;