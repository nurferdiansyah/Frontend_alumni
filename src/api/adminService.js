import axiosInstance from './axiosInstance';

// Fakultas & Prodi
export const getFakultas = () => axiosInstance.get('/admin/fakultas');
export const createFakultas = (data) => axiosInstance.post('/admin/fakultas', data);
export const deleteFakultas = (id) => axiosInstance.delete(`/admin/fakultas/${id}`);
export const getProdi = () => axiosInstance.get('/admin/prodi');
export const createProdi = (data) => axiosInstance.post('/admin/prodi', data);
export const deleteProdi = (id) => axiosInstance.delete(`/admin/prodi/${id}`);

// Alumni
export const getAlumni = () => axiosInstance.get('/admin/alumni');
export const updateAlumni = (id, data) => axiosInstance.put(`/admin/alumni/${id}`, data);
export const deleteAlumni = (id) => axiosInstance.delete(`/admin/alumni/${id}`);

// Jobs
export const createJob = (data) => axiosInstance.post('/admin/jobs', data);
export const updateJob = (id, data) => axiosInstance.put(`/admin/jobs/${id}`, data);
export const deleteJob = (id) => axiosInstance.delete(`/admin/jobs/${id}`);

// Info Kampus & Berita
export const createInfo = (data) => axiosInstance.post('/admin/info', data);
export const updateInfo = (id, data) => axiosInstance.put(`/admin/info/${id}`, data);
export const deleteInfo = (id) => axiosInstance.delete(`/admin/info/${id}`);
export const createNews = (data) => axiosInstance.post('/admin/news', data);
export const updateNews = (id, data) => axiosInstance.put(`/admin/news/${id}`, data);
export const deleteNews = (id) => axiosInstance.delete(`/admin/news/${id}`);

// Web Settings & TTD
export const updateWebSettings = (data) => {
    if (data instanceof FormData) {
        if (!data.has('_method')) data.append('_method', 'PUT');
        return axiosInstance.post('/admin/web-settings', data, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
    }
    return axiosInstance.put('/admin/web-settings', data);
};
export const uploadTtd = (data) => axiosInstance.post('/admin/ttd', data, {
    headers: { 'Content-Type': 'multipart/form-data' }
});
export const getTtd = () => axiosInstance.get('/admin/ttd');
