import axiosInstance from './axiosInstance';

export const getJobs = () => axiosInstance.get('/jobs');
export const getJobById = (id) => axiosInstance.get(`/jobs/${id}`);
export const getNews = () => axiosInstance.get('/news');
export const getNewsById = (id) => axiosInstance.get(`/news/${id}`);
export const getInfo = () => axiosInstance.get('/info');
export const getWebSettings = () => axiosInstance.get('/web-settings');
export const getStats = () => axiosInstance.get('/stats');
