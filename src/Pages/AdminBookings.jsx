import React from 'react';
import { Container, Table, Button, Badge } from 'react-bootstrap';

const dummyAdminBookings = [
  {
    id: 1,
    userName: 'John Doe',
    eventType: 'Wedding',
    eventDate: '2025-12-15',
    status: 'Pending',
  },
  {
    id: 2,
    userName: 'Jane Smith',
    eventType: 'Birthday Party',
    eventDate: '2025-10-05',
    status: 'Approved',
  },
  {
    id: 3,
    userName: 'Mike Johnson',
    eventType: 'Corporate Event',
    eventDate: '2025-08-20',
    status: 'Pending',
  },
];

const AdminBookings = () => (
  <Container className="py-5">
    <h2 className="fw-bold mb-4 text-center">Manage Bookings</h2>
    <Table striped bordered hover responsive className="shadow-sm">
      <thead className="table-dark">
        <tr>
          <th>#</th>
          <th>User Name</th>
          <th>Event Type</th>
          <th>Event Date</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {dummyAdminBookings.map((booking, index) => (
          <tr key={booking.id}>
            <td>{index + 1}</td>
            <td>{booking.userName}</td>
            <td>{booking.eventType}</td>
            <td>{booking.eventDate}</td>
            <td>
              <Badge bg={
                booking.status === 'Approved' ? 'success' :
                'warning'
              }>
                {booking.status}
              </Badge>
            </td>
            <td>
              {booking.status === 'Pending' && (
                <>
                  <Button variant="success" size="sm" className="me-2">
                    Approve
                  </Button>
                  <Button variant="danger" size="sm">
                    Reject
                  </Button>
                </>
              )}
              {booking.status === 'Approved' && (
                <Badge bg="secondary">No Actions</Badge>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  </Container>
);

export default AdminBookings;
