import { apiRequest } from './client';

const encode = (value) => encodeURIComponent(value ?? '');

export const fetchAllCustomers = (options = {}) =>
  apiRequest('/admin/customers', {
    method: 'GET',
    ...options,
  });

export const fetchAllServiceProviders = (options = {}) =>
  apiRequest('/admin/service-providers', {
    method: 'GET',
    ...options,
  });

export const fetchAllServices = (options = {}) =>
  apiRequest('/admin/services', {
    method: 'GET',
    ...options,
  });

export const fetchAllAdmins = (options = {}) =>
  apiRequest('/admin/admins', {
    method: 'GET',
    ...options,
  });

export const approveProvider = (providerId, isFeatured = false) =>
  apiRequest(`/admin/providers/${encode(providerId)}/approve`, {
    method: 'POST',
    body: { isFeatured },
  });

export const rejectProvider = (providerId) =>
  apiRequest(`/admin/providers/${encode(providerId)}/reject`, {
    method: 'POST',
  });

export const updateProviderStatus = (providerId, status) => {
  // Map status strings to boolean values
  const isVerified = status === 'Activated' || status === 'Pending';
  const isFeatured = status === 'Activated';
  
  return apiRequest(`/admin/providers/${encode(providerId)}/status`, {
    method: 'PATCH',
    body: { isVerified, isFeatured },
  });
};

export const updateAdminRole = (adminId, role) =>
  apiRequest(`/admin/admins/${encode(adminId)}/role`, {
    method: 'PATCH',
    body: { role },
  });

