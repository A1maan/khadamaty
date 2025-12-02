import { apiRequest } from './client';

const encode = (value) => encodeURIComponent(value ?? '');

export const fetchServices = (category, options = {}) => {
  const normalizedCategory = category && category !== 'all' ? `?category=${encode(category)}` : '';
  return apiRequest(`/customer/services${normalizedCategory}`, { method: 'GET', ...options });
};

export const verifyCustomerOtp = ({ id, otp }) =>
  apiRequest('/customer/verify-otp', {
    method: 'POST',
    body: { id, otp },
  });

export const createCustomerBooking = (customerId, payload) =>
  apiRequest(`/customer/book?id=${encode(customerId)}`, {
    method: 'POST',
    body: payload,
  });

export const fetchActiveRequests = (customerId, options = {}) =>
  apiRequest(`/customer/active-requests?customerId=${encode(customerId)}`, {
    method: 'GET',
    ...options,
  });

export const fetchPastRequests = (customerId, options = {}) =>
  apiRequest(`/customer/past-requests?customerId=${encode(customerId)}`, {
    method: 'GET',
    ...options,
  });

