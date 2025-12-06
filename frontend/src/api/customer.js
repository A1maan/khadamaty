import { apiRequest } from './client';

const encode = (value) => encodeURIComponent(value ?? '');

export const fetchServices = (category, options = {}) => {
  const normalizedCategory = category && category !== 'all' ? `?category=${encode(category)}` : '';
  return apiRequest(`/customer/services${normalizedCategory}`, { method: 'GET', ...options });
};

export const signupCustomer = (payload) =>
  apiRequest('/customer/signup', {
    method: 'POST',
    body: payload,
  });

export const signinCustomer = (payload) =>
  apiRequest('/customer/signin', {
    method: 'POST',
    body: payload,
  });

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


export const saveService = (customerId, serviceId) =>
  apiRequest('/customer/save-service', {
    method: 'POST',
    body: { customerId, serviceId },
  });

export const fetchSavedServices = (customerId) =>
  apiRequest(`/customer/saved-services?id=${encode(customerId)}`, {
    method: 'GET',
  });

export const unsaveService = (customerId, savedServiceId) =>
  apiRequest('/customer/unsave-service', {
    method: 'DELETE',
    body: { customerId, savedServiceId },
  });

export const fetchFeaturedProviders = (options = {}) =>
  apiRequest('/public/providers/featured', {
    method: 'GET',
    ...options,
  });
