// Attach Bearer token from localStorage if available
export async function authFetch(url: string, options: RequestInit = {}) {
  const token = window.localStorage.getItem('token');
  return fetch(url, {
    ...options,
    headers: {
      ...(options.headers || {}),
      ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    },
  });
} 