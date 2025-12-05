import { apiRequest } from './client';

const encode = (value) => encodeURIComponent(value ?? '');

export const signupProvider = (payload) =>
  apiRequest('/provider/signup', {
    method: 'POST',
    body: payload,
  });

export const verifyProviderOtp = ({ id, otp }) =>
  apiRequest('/provider/verify-otp', {
    method: 'POST',
    body: { id, otp },
  });

export const signinProvider = (payload) =>
  apiRequest('/provider/signin', {
    method: 'POST',
    body: payload,
  });

export const fetchProviderServices = (providerId, options = {}) =>
  apiRequest(`/provider/services?providerId=${encode(providerId)}`, {
    method: 'GET',
    ...options,
  });

export const createProviderService = (providerId, payload) =>
  apiRequest(`/provider/services?providerId=${encode(providerId)}`, {
    method: 'POST',
    body: payload,
  });
