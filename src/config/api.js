// src/config/api.js


// api.js
const apiBase = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5002/';            //https://your-backend-url.com

export default {
  BACKEND: apiBase,

  authHeaders() {
    const token = sessionStorage.getItem('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
  },
};


