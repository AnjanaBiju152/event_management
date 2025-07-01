// frontend/src/services/allApi.js
import { commonApi } from './commonApi';
import { base_url } from './base_url';

// Register user
export const registerApi = async (userData) => {
  return await commonApi('POST', `${base_url}/user/register`, userData, '');
};

// Login
export const loginApi = async (data) => {
  return await commonApi('POST', `${base_url}/user/login`, data, '');
};

// Book event for users
export const bookEventApi = async (eventDetails, token) => {
  const reqHeader = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  };
  return await commonApi('POST', `${base_url}/user/book-event`, eventDetails, reqHeader);
};

// Get all bookings for a specific user
export const getUserBookingsApi = async (token) => {
  const reqHeader = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  };
  return await commonApi('GET', `${base_url}/user/bookings`, '', reqHeader);
};

// Get bill details for a specific booking
export const getBillDetailsApi = async (bookingId, token) => {
  const reqHeader = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  };
  return await commonApi('GET', `${base_url}/user/booking/${bookingId}/bill`, '', reqHeader);
};

// Mark bill as viewed
export const markBillViewedApi = async (bookingId, token) => {
  const reqHeader = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  };
  return await commonApi('PUT', `${base_url}/user/booking/${bookingId}/mark-bill-viewed`, {}, reqHeader);
};

// Get all bookings for admin
export const getAllBookingsApi = async (token) => {
  const reqHeader = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  };
  return await commonApi('GET', `${base_url}/admin/bookings`, '', reqHeader);
};

// Update a specific booking by admin
export const updateBookingApi = async (bookingId, updatedData, token) => {
  const reqHeader = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  };
  return await commonApi('PUT', `${base_url}/admin/bookings/${bookingId}`, updatedData, reqHeader);
};

// Update payment status
export const updatePaymentStatusApi = async (bookingId, payload, token) => {
  const reqHeader = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  };
  return await commonApi('PUT', `${base_url}/admin/bookings/${bookingId}/payment`, payload, reqHeader);
};

// User accepts booking and processes payment
export const acceptBookingApi = async (bookingId, paymentData, token) => {
  const reqHeader = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  };
  return await commonApi('PUT', `${base_url}/user/booking/${bookingId}/accept`, paymentData, reqHeader);
};

// Send payment reminder (placeholder)
export const sendPaymentReminderApi = async (bookingId, reminderData, token) => {
  const reqHeader = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  };
  return await commonApi('POST', `${base_url}/admin/bookings/${bookingId}/remind`, reminderData, reqHeader);
};



