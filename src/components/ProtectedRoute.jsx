import React from 'react';
import { Navigate } from 'react-router-dom';

export function ProtectedRoute({ children, allowedRole }) {
  const token = localStorage.getItem('access_token');
  const role = localStorage.getItem('role');

  if (!token) {
    // Belum login, arahkan ke login
    return <Navigate to="/login" replace />;
  }

  if (allowedRole && role !== allowedRole) {
    // Role tidak sesuai, arahkan ke dashboard yang sesuai atau ke login
    if (role === 'admin') {
      return <Navigate to="/admin/dashboard" replace />;
    }
    return <Navigate to="/dashboard" replace />;
  }

  // Jika token ada dan role sesuai (atau tidak dicek rolenya), render komponen
  return children;
}
