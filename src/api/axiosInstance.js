import axios from 'axios';
import Swal from 'sweetalert2';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000/api',
  headers: {
    'Accept': 'application/json',
  },
});

// Request interceptor untuk menambahkan token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor untuk handle error global
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // 401 Unauthorized (token expire / tidak valid)
      if (error.response.status === 401) {
        localStorage.removeItem('access_token');
        localStorage.removeItem('role');
        // Arahkan ke halaman login jika belum ada di halaman login
        if (window.location.pathname !== '/login') {
            window.location.href = '/login';
        }
      }
      
      // 403 Forbidden
      if (error.response.status === 403) {
        Swal.fire('Informasi', 'Akses Ditolak: Anda tidak memiliki izin untuk halaman ini.', 'info');
      }

      // 422 Unprocessable Entity - biarkan komponen yang menangani (via catch)
    }
    
    return Promise.reject(error);
  }
);

export default axiosInstance;
