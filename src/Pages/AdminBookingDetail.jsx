// frontend/components/AdminBookingDetail.jsx
import { useNavigate } from 'react-router-dom';

import React, { useState, useEffect } from 'react';
import {
    Modal,
    Button,
    Badge,
    Alert,
    Form,
    Card,
    Table
} from 'react-bootstrap';
import { updateBookingApi } from '../services/allApi';
import { toast } from 'react-toastify';
import {
    Calendar,
    Palette,
    CheckCircle,
    Utensils,
    Music,
    Globe,
    DollarSign,
    Plus,
    X,
    User,
    AlertCircle,
    Download
} from 'lucide-react';
const AdminBookingDetail = ({ show, handleClose, booking }) => {
    const navigate = useNavigate();
    const [adminComment, setAdminComment] = useState('');
    const [bookingStatus, setBookingStatus] = useState(booking?.bookingStatus || 'Pending');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [additionalFees, setAdditionalFees] = useState(booking?.additionalFees || []);
    const [newFee, setNewFee] = useState({ description: '', amount: 0 });
    const [showRejectModal, setShowRejectModal] = useState(false);
    const [rejectReason, setRejectReason] = useState('');
    const [showApproveModal, setShowApproveModal] = useState(false);
    const [approvalConfirmed, setApprovalConfirmed] = useState(false);
    const [showBillModal, setShowBillModal] = useState(false);

    useEffect(() => {
        if (booking) {
            setBookingStatus(booking.bookingStatus || 'Pending');
            setAdminComment(booking.adminComment || '');
            setAdditionalFees(booking.additionalFees || []);
        }
    }, [booking]);

    const statusDescriptions = {
        Pending: 'Awaiting admin review',
        Approved: 'Confirmed - awaiting payment',
        Rejected: 'Declined by admin',
        Cancelled: 'Cancelled by client'
    };

    const getReadableValue = (field, value) => {
        if (value === undefined || value === null) return 'Not provided';

        if (field === 'date' && value) {
            return new Date(value).toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        }

        const mappings = {
            type: {
                wedding: 'Wedding',
                birthday: 'Birthday',
                corporate: 'Corporate Event',
                anniversary: 'Anniversary',
                conference: 'Conference'
            },
            serviceStyle: {
                buffet: 'Buffet Style',
                plated: 'Plated Service',
                familystyle: 'Family Style',
                foodstations: 'Food Stations',
                cocktailstyle: 'Cocktail Style'
            },
            packageType: {
                standard: 'Standard Package',
                premium: 'Premium Package',
                deluxe: 'Deluxe Package',
                basic: 'Basic Package'
            },
            venue: {
                luxury: 'Luxury Venue',
                standard: 'Standard Venue',
                budget: 'Budget-Friendly Venue',
                beach: 'Beach Venue',
                garden: 'Garden Venue'
            },
            entertainment: {
                dj: 'DJ Services',
                liveband: 'Live Band',
                performers: 'Performers',
                interactive: 'Interactive Entertainment',
                none: 'No Entertainment'
            },
            services: {
                decor: 'Decoration',
                photography: 'Photography',
                music: 'Music & DJ',
                flowers: 'Flowers & Bouquets',
                invitation: 'Invitations',
                emcee: 'Professional MC',
                cake: 'Custom Cake',
                entertainment: 'Entertainment',
                av: 'AV Equipment',
                printing: 'Printing Materials',
                speaker: 'Speaker Support',
                awards: 'Awards & Gifts'
            },
            dietaryRestrictions: {
                vegetarian: 'Vegetarian',
                vegan: 'Vegan',
                glutenfree: 'Gluten-Free',
                dairyfree: 'Dairy-Free',
                nutfree: 'Nut-Free',
                halal: 'Halal',
                kosher: 'Kosher'
            }
        };

        if (mappings[field] && mappings[field][value]) {
            return mappings[field][value];
        }

        if (typeof value === 'boolean') return value ? 'Yes' : 'No';

        if (Array.isArray(value)) {
            if (value.length === 0) return 'None selected';
            return value.map(item => mappings[field]?.[item] || item).join(', ');
        }

        if (field === 'transportation' && typeof value === 'object') {
            const { vehicleType, numberOfVehicles } = value;
            return vehicleType && numberOfVehicles
                ? `${numberOfVehicles} ${vehicleType.charAt(0).toUpperCase() + vehicleType.slice(1)}(s)`
                : 'Not specified';
        }

        if (field === 'accommodation' && typeof value === 'object') {
            const { hotelPreference, numberOfRooms, checkInDate, checkOutDate } = value;
            return hotelPreference || numberOfRooms || checkInDate || checkOutDate
                ? `${hotelPreference || 'Hotel'} (${numberOfRooms || 'TBD'} rooms, ${checkInDate || 'TBD'} to ${checkOutDate || 'TBD'})`
                : 'Not specified';
        }

        return value || 'Not specified';
    };

    const getStatusBadge = (status) => {
        if (!status) return null;

        const variants = {
            Pending: 'warning',
            Approved: 'success',
            Rejected: 'danger',
            Cancelled: 'secondary',
        };

        return <Badge bg={variants[status]} className="text-capitalize px-3 py-2 fs-6 rounded-pill">{status}</Badge>;
    };

   const handleUpdateBooking = async (newStatus, customRejectReason = '') => {
  const token = sessionStorage.getItem('token');
  if (!token) {
    toast.error('Please log in again.');
    navigate('/login');
    return;
  }

  setIsSubmitting(true);

  try {
    const result = await updateBookingApi(booking._id, {
      bookingStatus: newStatus,
      adminComment,
      rejectReason: newStatus === 'Rejected' ? customRejectReason : booking.rejectReason,
      additionalFees,
      totalEstimate: calculateTotalEstimate(),
    }, token);

    if (result.status === 200) {
      toast.success(`Booking ${newStatus}!`);
      setBookingStatus(newStatus);
      handleClose(true); // This triggers the parent to refresh
    } else {
      toast.error(result.data?.message || `Failed to ${newStatus.toLowerCase()} booking.`);
    }
  } catch (err) {
    console.error('Update error:', err);
    toast.error(err.response?.data?.message || `Failed to ${newStatus.toLowerCase()} booking.`);
  } finally {
    setIsSubmitting(false);
  }
};
    const calculateTotalEstimate = () => {
        const baseEstimate = booking?.totalEstimate || 0;
        const feesTotal = additionalFees.reduce((sum, fee) => sum + (fee.amount || 0), 0);
        return baseEstimate + feesTotal;
    };

    const handleAddFee = () => {
        if (!newFee.description || !newFee.amount) {
            toast.warn('Please enter both description and amount for the additional fee.');
            return;
        }
        if (newFee.amount <= 0) {
            toast.warn('Amount must be greater than 0');
            return;
        }

        setAdditionalFees([
            ...additionalFees,
            {
                ...newFee,
                dateAdded: new Date().toISOString(),
                id: Date.now()
            }
        ]);
        setNewFee({ description: '', amount: 0 });
    };

    const handleRemoveFee = (index) => {
        const updatedFees = [...additionalFees];
        updatedFees.splice(index, 1);
        setAdditionalFees(updatedFees);
    };

    if (!booking) return null;

    const isEditable = booking.bookingStatus === 'Pending' || booking.bookingStatus === 'Approved';

    const transformedBooking = {
        ...booking,
        client: {
            name: booking.userId?.name || 'Not provided',
            email: booking.userId?.email || 'Not provided',
            phone: booking.userId?.phone || 'Not provided'
        },
        catering: booking.catering || {
            cuisine: null,
            dietaryRestrictions: [],
            serviceStyle: null
        },
        additionalServices: booking.additionalServices || {
            entertainment: null,
            transportation: null,
            accommodation: null
        },
        services: booking.services || [],
        culturalOption: booking.culturalOption || 'Not specified',
        theme: booking.theme || 'Not specified',
        colorPalette: booking.colorPalette || 'Not specified',
        packageType: booking.packageType || 'Not specified'
    };

    const eventSections = [
        {
            title: 'Client Information',
            icon: <User className="me-2" size={20} />,
            items: [
                { label: 'Name', value: transformedBooking.client.name },
                { label: 'Email', value: transformedBooking.client.email },
                { label: 'Phone', value: transformedBooking.client.phone }
            ]
        },
        {
            title: 'Event Basics',
            icon: <Calendar className="me-2" size={20} />,
            items: [
                { label: 'Event Type', value: getReadableValue('type', transformedBooking.eventType) },
                { label: 'Date', value: getReadableValue('date', transformedBooking.eventDate) },
                { label: 'Time', value: transformedBooking.eventTime || 'Not specified' },
                { label: 'Duration', value: `${transformedBooking.duration || 0} hours` },
                { label: 'Guest Count', value: `${transformedBooking.guestCount || 0} guests` },
                { label: 'Venue', value: getReadableValue('venue', transformedBooking.venue) }
            ]
        },
        {
            title: 'Theme & Style',
            icon: <Palette className="me-2" size={20} />,
            items: [
                { label: 'Theme', value: transformedBooking.theme },
                { label: 'Color Palette', value: transformedBooking.colorPalette },
                { label: 'Cultural Style', value: getReadableValue('culturalOption', transformedBooking.culturalOption) }
            ]
        },
        {
            title: 'Services & Package',
            icon: <CheckCircle className="me-2" size={20} />,
            items: [
                { label: 'Selected Services', value: getReadableValue('services', transformedBooking.services) },
                { label: 'Package Type', value: getReadableValue('packageType', transformedBooking.packageType) }
            ]
        },
        {
            title: 'Food & Catering',
            icon: <Utensils className="me-2" size={20} />,
            items: [
                { label: 'Cuisine', value: transformedBooking.catering.cuisine || 'Not specified' },
                { label: 'Dietary Restrictions', value: getReadableValue('dietaryRestrictions', transformedBooking.catering.dietaryRestrictions) },
                { label: 'Service Style', value: getReadableValue('serviceStyle', transformedBooking.catering.serviceStyle) }
            ]
        },
        {
            title: 'Additional Services',
            icon: <Music className="me-2" size={20} />,
            items: [
                { label: 'Entertainment', value: getReadableValue('entertainment', transformedBooking.additionalServices.entertainment) },
                { label: 'Transportation', value: getReadableValue('transportation', transformedBooking.additionalServices.transportation) },
                { label: 'Accommodation', value: getReadableValue('accommodation', transformedBooking.additionalServices.accommodation) }
            ]
        }
    ];

    return (
        <>
            <style jsx>{`
                .modal-backdrop {
                    backdrop-filter: blur(4px);
                }
                .gradient-header {
                    background: #6c757d;
                    border-radius: 20px 20px 0 0;
                }
                .glass-card {
                    background: white;
                    border: 1px solid rgba(108, 117, 125, 0.1);
                    border-radius: 20px;
                    box-shadow: 0 8px 32px rgba(108, 117, 125, 0.1);
                }
                .section-header {
                    background: #6c757d;
                    color: white;
                    border-radius: 15px;
                    padding: 15px 20px;
                    margin-bottom: 15px;
                    font-weight: 600;
                }
                .info-item {
                    padding: 12px 0;
                    border-bottom: 1px solid rgba(108, 117, 125, 0.1);
                }
                .budget-card {
                    background: #6c757d;
                    color: white;
                    border-radius: 20px;
                }
                .fee-item {
                    background: rgba(108, 117, 125, 0.05);
                    border-radius: 15px;
                    padding: 20px;
                    margin-bottom: 15px;
                    border: 1px solid rgba(108, 117, 125, 0.1);
                }
                .status-alert {
                    background: rgba(255, 193, 7, 0.1);
                    border: 1px solid rgba(255, 193, 7, 0.2);
                    border-radius: 15px;
                    padding: 20px;
                }
                .btn-modern {
                    border-radius: 25px;
                    padding: 12px 30px;
                    font-weight: 600;
                }
                .btn-approve {
                    background: #28a745;
                    color: white;
                }
                .btn-reject {
                    background: #dc3545;
                    color: white;
                }
                .invoice-header {
                    background: #4a6bff;
                    border-radius: 20px 20px 0 0;
                }
                .invoice-table th {
                    background-color: #f8f9fa;
                }
            `}</style>

            <Modal show={show} onHide={() => handleClose(false)} size="xl" backdrop="static" centered>
                <div className="gradient-header">
                    <Modal.Header closeButton className="border-0 pb-0 text-white">
                        <Modal.Title className="w-100">
                            <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    <h3 className="mb-0 fw-bold">Booking Management</h3>
                                    <small className="opacity-85">ID: #{booking?._id?.slice(-6)?.toUpperCase() || 'N/A'}</small>
                                </div>
                                <div className="d-flex align-items-center gap-3">
                                    {getStatusBadge(bookingStatus)}
                                    <Badge bg={booking?.paymentStatus === 'Fully Paid' ? 'success' : 'warning'} className="text-capitalize px-3 py-2 fs-6 rounded-pill">
                                        {booking?.paymentStatus || 'Unpaid'}
                                    </Badge>
                                </div>
                            </div>
                        </Modal.Title>
                    </Modal.Header>
                </div>

                <Modal.Body className="p-4" style={{ maxHeight: '70vh', overflowY: 'auto' }}>
                    <Card className="budget-card mb-4 border-0">
                        <Card.Body className="p-4">
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="d-flex align-items-center">
                                    <div className="bg-white bg-opacity-20 p-3 rounded-circle me-4">
                                        <DollarSign size={32} />
                                    </div>
                                    <div>
                                        <h6 className="mb-1 opacity-85">Total Investment</h6>
                                        <div className="d-flex align-items-baseline">
                                            <h1 className="mb-0 fw-bold">₹{calculateTotalEstimate().toLocaleString()}</h1>
                                            {additionalFees.length > 0 && (
                                                <small className="ms-3 opacity-85">
                                                    Base: ₹{(booking?.totalEstimate || 0).toLocaleString()} + Fees: ₹{additionalFees.reduce((sum, fee) => sum + (fee.amount || 0), 0).toLocaleString()}
                                                </small>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="text-end">
                                    <div className="opacity-85 small">Submitted</div>
                                    <div className="fw-bold">{new Date(booking?.createdAt).toLocaleDateString()}</div>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>

                    <Alert className="status-alert mb-4">
                        <div className="d-flex align-items-center">
                            <AlertCircle className="me-3 text-warning" size={24} />
                            <div>
                                <h6 className="mb-0 text-warning">Current Status</h6>
                                <span className="text-muted">{statusDescriptions[bookingStatus]}</span>
                            </div>
                        </div>
                    </Alert>

                    <div className="row g-4">
                        {eventSections.map((section, index) => (
                            <div key={index} className="col-12">
                                <div className="glass-card p-0 border-0">
                                    <div className="section-header">
                                        <div className="d-flex align-items-center">
                                            {section.icon}
                                            <h5 className="mb-0">{section.title}</h5>
                                        </div>
                                    </div>
                                    <div className="p-4">
                                        <div className="row g-3">
                                            {section.items.map((item, itemIndex) => (
                                                <div key={itemIndex} className="col-md-6">
                                                    <div className="info-item">
                                                        <div className="d-flex justify-content-between align-items-start">
                                                            <span className="text-muted fw-medium">{item.label}</span>
                                                            <span className="fw-bold text-end flex-grow-1 ms-3">
                                                                {item.value}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {transformedBooking.culturalNotes && (
                            <div className="col-12">
                                <div className="glass-card p-0 border-0">
                                    <div className="section-header">
                                        <div className="d-flex align-items-center">
                                            <Globe className="me-2" size={20} />
                                            <h5 className="mb-0">Cultural Notes</h5>
                                        </div>
                                    </div>
                                    <div className="p-4">
                                        <div className="bg-light p-3 rounded-3">
                                            <p className="mb-0">{transformedBooking.culturalNotes}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="col-12">
                            <div className="glass-card p-0 border-0">
                                <div className="section-header">
                                    <div className="d-flex align-items-center">
                                        <DollarSign className="me-2" size={20} />
                                        <h5 className="mb-0">Additional Fees</h5>
                                    </div>
                                </div>
                                <div className="p-4">
                                    {additionalFees.length > 0 ? (
                                        <div className="mb-4">
                                            {additionalFees.map((fee, index) => (
                                                <div key={index} className="fee-item">
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <div className="d-flex align-items-center">
                                                            <div className="bg-primary bg-opacity-10 p-3 rounded-circle me-3">
                                                                <DollarSign size={20} className="text-primary" />
                                                            </div>
                                                            <div>
                                                                <h6 className="mb-1 fw-bold">{fee.description}</h6>
                                                                <small className="text-muted">
                                                                    Added on {new Date(fee.dateAdded || Date.now()).toLocaleDateString()}
                                                                </small>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex align-items-center">
                                                            <span className="fw-bold fs-5 me-3">
                                                                ₹{fee.amount.toLocaleString()}
                                                            </span>
                                                            {isEditable && (
                                                                <Button
                                                                    variant="outline-danger"
                                                                    size="sm"
                                                                    onClick={() => handleRemoveFee(index)}
                                                                    className="rounded-circle p-2"
                                                                >
                                                                    <X size={16} />
                                                                </Button>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="text-center py-5 text-muted">
                                            <DollarSign size={48} className="opacity-25 mb-3" />
                                            <p className="mb-0">No additional fees have been added</p>
                                        </div>
                                    )}

                                    {isEditable && (
                                        <div className="glass-card p-4">
                                            <h6 className="mb-3">Add New Fee</h6>
                                            <div className="row g-3">
                                                <div className="col-md-6">
                                                    <Form.Control
                                                        type="text"
                                                        placeholder="Fee description"
                                                        value={newFee.description}
                                                        onChange={(e) => setNewFee({ ...newFee, description: e.target.value })}
                                                        className="form-control"
                                                        required
                                                    />
                                                </div>
                                                <div className="col-md-4">
                                                    <Form.Control
                                                        type="number"
                                                        placeholder="Amount"
                                                        min="1"
                                                        step="0.01"
                                                        value={newFee.amount}
                                                        onChange={(e) => setNewFee({ ...newFee, amount: parseFloat(e.target.value) || 0 })}
                                                        className="form-control"
                                                        required
                                                    />
                                                </div>
                                                <div className="col-md-2">
                                                    <Button
                                                        onClick={handleAddFee}
                                                        className="btn-modern w-100"
                                                        style={{ background: '#4a6bff', color: 'white' }}
                                                    >
                                                        <Plus size={18} className="me-1" /> Add
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>


                    </div>

                    {!isEditable && (
                        <Alert className="mt-4 text-center border-0 rounded-4" variant="light">
                            <div className="py-2">
                                <strong>This booking is {booking?.bookingStatus}</strong> and can no longer be modified.
                            </div>
                        </Alert>
                    )}
                </Modal.Body>

                <Modal.Footer className="border-0 p-4">
                    <div className="d-flex justify-content-between w-100">
                        <Button
                            variant="outline-secondary"
                            onClick={() => handleClose(false)}
                            disabled={isSubmitting}
                            className="btn-modern"
                        >
                            Close
                        </Button>
                        {isEditable && (
                            <div className="d-flex gap-3">
                                <Button
                                    onClick={() => setShowRejectModal(true)}
                                    disabled={isSubmitting}
                                    className="btn-modern btn-reject"
                                >
                                    {isSubmitting ? (
                                        <span className="spinner-border spinner-border-sm me-2" />
                                    ) : (
                                        <X size={18} className="me-2" />
                                    )}
                                    Reject Booking
                                </Button>

                                <Button
                                    onClick={() => setShowApproveModal(true)}
                                    disabled={isSubmitting}
                                    className="btn-modern btn-approve"
                                >
                                    <CheckCircle size={18} className="me-2" />
                                    Confirm Approval
                                </Button>

                            </div>
                        )}
                    </div>
                </Modal.Footer>
            </Modal>

            {/* Reject Booking Modal */}
            <Modal show={showRejectModal} onHide={() => setShowRejectModal(false)} centered>
                <div style={{ background: '#dc3545', borderRadius: '20px 20px 0 0' }}>
                    <Modal.Header closeButton className="border-0 text-white">
                        <Modal.Title className="d-flex align-items-center">
                            <X size={24} className="me-2" />
                            Rejection Confirmation
                        </Modal.Title>
                    </Modal.Header>
                </div>
                <Modal.Body className="p-4">
                    <div className="text-center mb-4">
                        <div className="bg-danger bg-opacity-10 p-4 rounded-circle d-inline-flex mb-3">
                            <AlertCircle size={48} className="text-danger" />
                        </div>
                        <p className="text-muted">Please provide a detailed reason for rejecting this booking:</p>
                    </div>
                    <Form.Control
                        as="textarea"
                        rows={4}
                        placeholder="Example: The requested date is unavailable, conflicting schedules, insufficient information..."
                        value={rejectReason}
                        onChange={(e) => setRejectReason(e.target.value)}
                        className="form-control"
                    />
                </Modal.Body>
                <Modal.Footer className="border-0 p-4">
                    <Button
                        variant="outline-secondary"
                        onClick={() => setShowRejectModal(false)}
                        className="btn-modern"
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={() => {
                            if (!rejectReason.trim()) {
                                toast.warn('Please provide a rejection reason');
                                return;
                            }
                            handleUpdateBooking('Rejected', rejectReason);
                            setShowRejectModal(false);
                        }}
                        className="btn-modern btn-reject"
                    >
                        Confirm Rejection
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Approve Booking Modal */}
            <Modal show={showApproveModal} onHide={() => setShowApproveModal(false)} centered>
                <div style={{ background: '#28a745', borderRadius: '20px 20px 0 0' }}>
                    <Modal.Header closeButton className="border-0 text-white">
                        <Modal.Title className="d-flex align-items-center">
                            <CheckCircle size={24} className="me-2" />
                            Approval Confirmation
                        </Modal.Title>
                    </Modal.Header>
                </div>
                <Modal.Body className="p-4">
                    <div className="text-center mb-4">
                        <div className="bg-success bg-opacity-10 p-4 rounded-circle d-inline-flex mb-3">
                            <CheckCircle size={48} className="text-success" />
                        </div>
                        <h5 className="mb-3">You are about to approve this booking:</h5>
                    </div>

                    <div className="glass-card p-4 mb-4">
                        <div className="row g-3">
                            <div className="col-6">
                                <div className="d-flex justify-content-between">
                                    <span className="text-muted">Event:</span>
                                    <span className="fw-bold">{getReadableValue('type', transformedBooking.eventType)}</span>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="d-flex justify-content-between">
                                    <span className="text-muted">Date:</span>
                                    <span className="fw-bold">{getReadableValue('date', transformedBooking.eventDate)}</span>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="d-flex justify-content-between">
                                    <span className="text-muted">Client:</span>
                                    <span className="fw-bold">{transformedBooking.client.name || 'Unknown'}</span>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="d-flex justify-content-between">
                                    <span className="text-muted">Total:</span>
                                    <span className="fw-bold text-success">₹{calculateTotalEstimate().toLocaleString()}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="form-check p-3 rounded-3" style={{ background: 'rgba(40, 167, 69, 0.1)' }}>
                        <input
                            className="form-check-input"
                            type="checkbox"
                            id="approval-confirmation"
                            checked={approvalConfirmed}
                            onChange={(e) => setApprovalConfirmed(e.target.checked)}
                        />
                        <label className="form-check-label fw-medium" htmlFor="approval-confirmation">
                            I confirm all details are correct and the client has been notified
                        </label>
                    </div>
                </Modal.Body>
                <Modal.Footer className="border-0 p-4">
                    <div className="d-flex flex-wrap justify-content-between w-100 gap-3">
                        <Button
                            variant="outline-secondary"
                            onClick={() => setShowApproveModal(false)}
                            className="btn-modern"
                        >
                            Cancel
                        </Button>

                        <div className="d-flex gap-3">
                            <Button
                                onClick={() => {
                                    if (!approvalConfirmed) {
                                        toast.warn('Please confirm all details are correct');
                                        return;
                                    }
                                    handleUpdateBooking('Approved');
                                    setShowApproveModal(false);
                                }}
                                disabled={!approvalConfirmed}
                                className="btn-modern btn-approve"
                            >
                                Confirm Approval
                            </Button>

                            {approvalConfirmed && (
                                <>
                                    <Button
                                        onClick={() => {
                                            setShowBillModal(true);
                                            setShowApproveModal(false);
                                        }}
                                        variant="outline-primary"
                                        className="btn-modern"
                                    >
                                        View Bill
                                    </Button>

                                </>
                            )}
                        </div>
                    </div>
                </Modal.Footer>
            </Modal>

            {/* Bill Modal */}
            <Modal show={showBillModal} onHide={() => setShowBillModal(false)} centered size="lg">
                <div className="invoice-header">
                    <Modal.Header closeButton className="border-0 text-white">
                        <Modal.Title className="d-flex align-items-center">
                            <DollarSign size={24} className="me-2" />
                            Booking Invoice
                        </Modal.Title>
                    </Modal.Header>
                </div>
                <Modal.Body className="p-4">
                    <div className="glass-card p-4 mb-4">
                        <div className="row mb-4">
                            <div className="col-md-6">
                                <h5 className="fw-bold">Event Details</h5>
                                <div className="mb-2">
                                    <span className="text-muted">Event ID:</span>
                                    <span className="fw-bold ms-2">#{booking?._id?.slice(-6)?.toUpperCase()}</span>
                                </div>
                                <div className="mb-2">
                                    <span className="text-muted">Type:</span>
                                    <span className="fw-bold ms-2">{getReadableValue('type', transformedBooking.eventType)}</span>
                                </div>
                                <div className="mb-2">
                                    <span className="text-muted">Date:</span>
                                    <span className="fw-bold ms-2">{getReadableValue('date', transformedBooking.eventDate)}</span>
                                </div>
                                <div className="mb-2">
                                    <span className="text-muted">Client:</span>
                                    <span className="fw-bold ms-2">{transformedBooking.client.name}</span>
                                </div>
                            </div>
                            <div className="col-md-6 text-end">
                                <h5 className="fw-bold">Payment Summary</h5>
                                <div className="mb-2">
                                    <span className="text-muted">Base Estimate:</span>
                                    <span className="fw-bold ms-2">₹{(booking?.totalEstimate || 0).toLocaleString()}</span>
                                </div>
                                <div className="mb-2">
                                    <span className="text-muted">Additional Fees:</span>
                                    <span className="fw-bold ms-2">₹{additionalFees.reduce((sum, fee) => sum + (fee.amount || 0), 0).toLocaleString()}</span>
                                </div>
                                <div className="mb-2">
                                    <span className="text-muted">Total Amount:</span>
                                    <span className="fw-bold ms-2 text-success">₹{calculateTotalEstimate().toLocaleString()}</span>
                                </div>
                            </div>
                        </div>

                        <div className="mb-4">
                            <h6 className="fw-bold mb-3">Breakdown</h6>
                            <div className="table-responsive">
                                <Table className="invoice-table">
                                    <thead>
                                        <tr>
                                            <th>Item</th>
                                            <th className="text-end">Amount</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Venue Charges</td>
                                            <td className="text-end">₹{(calculateTotalEstimate() * 0.3).toLocaleString()}</td>
                                        </tr>
                                        <tr>
                                            <td>Catering Services</td>
                                            <td className="text-end">₹{(calculateTotalEstimate() * 0.35).toLocaleString()}</td>
                                        </tr>
                                        <tr>
                                            <td>Decoration</td>
                                            <td className="text-end">₹{(calculateTotalEstimate() * 0.2).toLocaleString()}</td>
                                        </tr>
                                        <tr>
                                            <td>Additional Services</td>
                                            <td className="text-end">₹{(calculateTotalEstimate() * 0.15).toLocaleString()}</td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </div>
                        </div>

                        <div className="p-3 rounded-3" style={{ background: 'rgba(74, 107, 255, 0.1)' }}>
                            <p className="mb-0 fw-medium">Note: Payment is due within 7 days of invoice date. Late payments may incur additional fees.</p>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer className="border-0 p-4">
                    <div className="d-flex justify-content-between w-100">
                        <Button
                            variant="outline-secondary"
                            onClick={() => setShowBillModal(false)}
                            className="btn-modern"
                        >
                            Close
                        </Button>
                        <div className="d-flex gap-3">

                            <Button
                                onClick={() => {
                                    toast.success('Bill sent to client successfully');
                                    setShowBillModal(false);
                                }}
                                className="btn-modern"
                                style={{ background: '#4a6bff', color: 'white' }}
                            >
                                Send to Client
                            </Button>
                        </div>
                    </div>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default AdminBookingDetail;




