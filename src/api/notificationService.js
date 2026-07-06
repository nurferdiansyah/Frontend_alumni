import axiosInstance from './axiosInstance';

export const getNotifications = () => axiosInstance.get('/notifications');
export const markAsRead = (id) => axiosInstance.put(`/notifications/${id}/read`);
export const markAllAsRead = () => axiosInstance.put('/notifications/read-all');
