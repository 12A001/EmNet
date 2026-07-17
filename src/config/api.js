const apiBase =
  import.meta.env.VITE_API_URL ||
  'https://emnet-backend.onrender.com/api';

export default {
  BACKEND: apiBase,

  authHeaders() {
    const token = localStorage.getItem('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
  },
};
