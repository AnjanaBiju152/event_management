import React from 'react';
import { Container, Table, Button, Badge } from 'react-bootstrap';

const dummyAdminPayments = [
  {
    id: 1,
    userName: 'John Doe',
    eventType: 'Wedding',
    totalAmount: 100000,
    paidAmount: 50000,
    dueAmount: 50000,
    paymentStatus: 'Half Paid',
  },
  {
    id: 2,
    userName: 'Jane Smith',
    eventType: 'Birthday Party',
    totalAmount: 30000,
    paidAmount: 30000,
    dueAmount: 0,
    paymentStatus: 'Fully Paid',
  },
  {
    id: 3,
    userName: 'Mike Johnson',
    eventType: 'Corporate Event',
    totalAmount: 80000,
    paidAmount: 0,
    dueAmount: 80000,
    paymentStatus: 'Pending',
  },
];

const AdminPayment = () => (
  <Container className="py-5"  style={{ minHeight: '80vh',marginTop:'86px'}}>
    <h2 className="fw-bold mb-4 text-center">Manage Payments</h2>
    <Table striped bordered hover responsive className="shadow-sm">
      <thead className="table-dark">
        <tr>
          <th>#</th>
          <th>User Name</th>
          <th>Event Type</th>
          <th>Total Amount</th>
          <th>Paid Amount</th>
          <th>Due Amount</th>
          <th>Payment Status</th>
          <th>Send Bill</th>
        </tr>
      </thead>
      <tbody>
        {dummyAdminPayments.map((payment, index) => (
          <tr key={payment.id}>
            <td>{index + 1}</td>
            <td>{payment.userName}</td>
            <td>{payment.eventType}</td>
            <td>₹{payment.totalAmount}</td>
            <td>₹{payment.paidAmount}</td>
            <td>₹{payment.dueAmount}</td>
            <td>
              <Badge bg={
                payment.paymentStatus === 'Fully Paid' ? 'success' :
                payment.paymentStatus === 'Half Paid' ? 'info' :
                'warning'
              }>
                {payment.paymentStatus}
              </Badge>
            </td>
            <td>
              {payment.paymentStatus !== 'Fully Paid' ? (
                <Button variant="primary" size="sm">
                  Send Bill
                </Button>
              ) : (
                <Badge bg="secondary">Paid</Badge>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  </Container>
);

export default AdminPayment;
