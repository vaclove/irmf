/**
 * API Configuration
 * Handles API base URL configuration based on environment variables
 */

export const getApiBaseUrl = (): string => {
  // For client-side (browser), use NEXT_PUBLIC_BACKEND_API
  if (typeof window !== 'undefined') {
    const clientApiUrl = process.env.NEXT_PUBLIC_BACKEND_API;
    console.log('Client API URL:', clientApiUrl);
    return clientApiUrl || 'https://guests.irmf.cz';
  }
  
  // For server-side, use BACKEND_API
  const serverApiUrl = process.env.BACKEND_API;
  console.log('Server API URL:', serverApiUrl);
  return serverApiUrl || 'http://localhost:3000';
};

export const buildApiUrl = (endpoint: string): string => {
  const baseUrl = getApiBaseUrl();
  const url = `${baseUrl}${endpoint}`;
  console.log('Built API URL:', url);
  return url;
};

export const apiRequest = async (endpoint: string, options?: RequestInit) => {
  const url = buildApiUrl(endpoint);
  console.log('Making API request to:', url);
  
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    ...options,
  });
  
  if (!response.ok) {
    console.error('API request failed:', response.status, response.statusText);
    throw new Error(`API request failed: ${response.status}`);
  }
  
  return response.json();
};