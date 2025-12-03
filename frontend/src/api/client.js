const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8000';

const defaultHeaders = {
  'Content-Type': 'application/json',
};

const parseJson = async (response) => {
  const text = await response.text();
  return text ? JSON.parse(text) : null;
};

export async function apiRequest(path, options = {}) {
  const { body, headers, ...rest } = options;
  const init = {
    method: options.method ?? (body ? 'POST' : 'GET'),
    headers: { ...defaultHeaders, ...(headers ?? {}) },
    ...rest,
  };

  if (body !== undefined) {
    init.body = typeof body === 'string' ? body : JSON.stringify(body);
  } else if (init.method && init.method.toUpperCase() !== 'GET') {
    init.body = '{}';
  }

  const response = await fetch(`${API_BASE_URL}${path}`, init);
  const data = await parseJson(response);

  if (!response.ok) {
    const error = new Error(data?.message ?? 'Request failed');
    error.status = response.status;
    error.details = data;
    throw error;
  }

  return data;
}

export { API_BASE_URL };

