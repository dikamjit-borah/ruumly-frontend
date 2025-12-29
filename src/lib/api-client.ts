/**
 * API client with automatic auth token injection
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://ruumly-backend.onrender.com';

interface RequestOptions extends RequestInit {
  skipAuth?: boolean;
}

async function apiCall(
  endpoint: string,
  options: RequestOptions = {}
) {
  const { skipAuth = false, ...requestOptions } = options;

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(requestOptions.headers as Record<string, string>),
  };

  // Add auth token if not skipped
  if (!skipAuth) {
    const token = localStorage.getItem('auth_token');
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }

  const url = `${API_BASE_URL}${endpoint}`;

  try {
    const response = await fetch(url, {
      ...requestOptions,
      headers,
    });

    // If unauthorized, clear auth and redirect to signin
    if (response.status === 401) {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user');
      document.cookie = 'auth_token=; path=/; max-age=0';
      // Redirect to signin page
      if (typeof window !== 'undefined') {
        window.location.href = '/auth/signin';
      }
    }

    return response;
  } catch (error) {
    console.error(`API call failed to ${url}:`, error);
    throw error;
  }
}

export const api = {
  get: (endpoint: string, options: RequestOptions = {}) =>
    apiCall(endpoint, { ...options, method: 'GET' }),

  post: (endpoint: string, data?: any, options: RequestOptions = {}) =>
    apiCall(endpoint, {
      ...options,
      method: 'POST',
      body: JSON.stringify(data),
    }),

  put: (endpoint: string, data?: any, options: RequestOptions = {}) =>
    apiCall(endpoint, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  patch: (endpoint: string, data?: any, options: RequestOptions = {}) =>
    apiCall(endpoint, {
      ...options,
      method: 'PATCH',
      body: JSON.stringify(data),
    }),

  delete: (endpoint: string, options: RequestOptions = {}) =>
    apiCall(endpoint, { ...options, method: 'DELETE' }),
};
