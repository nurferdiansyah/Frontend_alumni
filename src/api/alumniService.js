import axiosInstance from './axiosInstance';

export const getProfile = () => axiosInstance.get('/alumni/profile');
export const updateProfile = (data) => axiosInstance.put('/alumni/profile', data);
export const submitTracerStudy = (data) => axiosInstance.post('/alumni/tracer-study', data);
export const uploadIjazah = (formData) => axiosInstance.post('/alumni/surat-ijazah/upload', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
export const getIjazahHistory = () => axiosInstance.get('/alumni/surat-ijazah');
export const updatePassword = (data) => axiosInstance.put('/auth/password', data);
