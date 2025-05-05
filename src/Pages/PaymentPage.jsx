import React from 'react';
import { Container, Table, Button, Badge } from 'react-bootstrap';

const dummyPayments = [
  {
    id: 1,
    eventType: 'Wedding',
    totalAmount: 100000,
    paidAmount: 50000,
    dueAmount: 50000,
    status: 'Half Paid',
  },
  {
    id: 2,
    eventType: 'Birthday Party',
    totalAmount: 30000,
    paidAmount: 0,
    dueAmount: 30000,
    status: 'Pending',
  },
  {
    id: 3,
    eventType: 'Corporate Event',
    totalAmount: 80000,
    paidAmount: 80000,
    dueAmount: 0,
    status: 'Fully Paid',
  },
];

const PaymentPage = () => (
  <Container className="py-5"  style={{ minHeight: '80vh' ,marginTop:'86px'}}>
    <h2 className="fw-bold mb-4 text-center">Payments</h2>
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
        {dummyPayments.map((payment, index) => (
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
                <Button variant="success" size="sm">Pay Now</Button>
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

export default PaymentPage;
