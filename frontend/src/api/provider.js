import { apiRequest } from './client';

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

