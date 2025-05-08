import React, { useState } from 'react';
import { Container, Table, Button, Badge } from 'react-bootstrap';
import AdminBookingDetail from './AdminBookingDetail';

const dummyAdminPayments = [
  {
    id: 1,
    userName: 'John Doe',
    eventType: 'Wedding',
    eventDate: '2025-12-15',
    totalAmount: 100000,
    paidAmount: 50000,
    dueAmount: 50000,
    paymentStatus: 'Half Paid',
  },
  {
    id: 2,
    userName: 'Jane Smith',
    eventType: 'Birthday Party',
    eventDate: '2025-10-05',
    totalAmount: 30000,
    paidAmount: 30000,
    dueAmount: 0,
    paymentStatus: 'Fully Paid',
  },
  {
    id: 3,
    userName: 'Mike Johnson',
    eventType: 'Corporate Event',
    eventDate: '2025-08-20',
    totalAmount: 80000,
    paidAmount: 0,
    dueAmount: 80000,
    paymentStatus: 'Pending',
  },
];

const AdminPayment = () => {
  const [payments, setPayments] = useState(dummyAdminPayments);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);

  const handleSendBill = (payment) => {
    setSelectedPayment(payment);
    setShowDetailModal(true);
  };

  const handleCloseModal = () => {
    setShowDetailModal(false);
    // In a real application, you would update payment status here after API calls
    // For demo purposes, let's simulate updating the payment status
    if (selectedPayment) {
      const updatedPayments = payments.map(payment => {
        if (payment.id === selectedPayment.id) {
          return { 
            ...payment, 
            // This is just for demonstration - in a real app this would be updated based on actual payment received
            lastReminderSent: new Date().toISOString().split('T')[0]
          };
        }
        return payment;
      });
      setPayments(updatedPayments);
    }
  };

  return (
    <Container className="py-5" style={{ minHeight: '80vh', marginTop: '86px' }}>
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
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment, index) => (
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
                  <Button 
                    variant="primary" 
                    size="sm"
                    onClick={() => handleSendBill(payment)}
                  >
                    Send Bill
                  </Button>
                ) : (
                  <Badge bg="secondary">Paid</Badge>
                )}
                {payment.lastReminderSent && (
                  <div className="mt-1">
                    <small className="text-muted">
                      Last reminder: {payment.lastReminderSent}
                    </small>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Detail Modal for Sending Payment Reminders */}
      <AdminBookingDetail 
        show={showDetailModal} 
        handleClose={handleCloseModal} 
        booking={{
          id: selectedPayment?.id,
          userName: selectedPayment?.userName,
          eventType: selectedPayment?.eventType,
          eventDate: selectedPayment?.eventDate
        }}
        paymentInfo={selectedPayment ? {
          totalAmount: selectedPayment.totalAmount,
          paidAmount: selectedPayment.paidAmount,
          dueAmount: selectedPayment.dueAmount
        } : null}
      />
    </Container>
  );
};

export default AdminPayment;