import React, { useState, useEffect } from 'react';
import { AdminLayout } from '../../components/AdminLayout';
import { Search, Plus, Filter, MoreVertical, Edit, Trash2 } from 'lucide-react';
import { Button } from '../../components/Button';
import { getJobs } from '../../api/publicService';
import { createJob, updateJob, deleteJob } from '../../api/adminService';
import Swal from 'sweetalert2';

export function LowonganAdmin() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [selectedJob, setSelectedJob] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    description: '',
    url: '',
    deadline: '',
    type: 'Penuh Waktu',
    experience: 'Fresh Graduate'
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await getJobs();
      const data = response.data.data || response.data;
      setJobs(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (mode, job = null) => {
    setModalMode(mode);
    setSelectedJob(job);
    if (mode === 'edit' && job) {
      setFormData({
        title: job.title || '',
        company: job.company || '',
        location: job.location || '',
        description: job.description || '',
        url: job.url || '',
        deadline: job.deadline ? job.deadline.split('T')[0] : '',
        type: job.type || 'Penuh Waktu',
        experience: job.experience || 'Fresh Graduate'
      });
    } else {
      setFormData({ title: '', company: '', location: '', description: '', url: '', deadline: '', type: 'Penuh Waktu', experience: 'Fresh Graduate' });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedJob(null);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      if (modalMode === 'add') {
        await createJob(formData);
      } else {
        await updateJob(selectedJob.id_lowongan, formData);
      }
      await fetchJobs();
      handleCloseModal();
    } catch (error) {
      console.error('Failed to save job:', error);
      Swal.fire('Informasi', 'Gagal menyimpan lowongan! Pastikan semua kolom wajib diisi.', 'info');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Konfirmasi',
      text: 'Yakin ingin menghapus lowongan ini?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#0F4C3A',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya, Lanjutkan',
      cancelButtonText: 'Batal'
    });
    if (result.isConfirmed) {
      try {
        await deleteJob(id);
        fetchJobs();
      } catch (error) {
        console.error('Failed to delete:', error);
        Swal.fire('Informasi', 'Gagal menghapus lowongan!', 'info');
      }
    }
  };

  return (
    <AdminLayout>
      <div className="p-6 lg:p-8">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Manajemen Lowongan</h1>
            <p className="text-gray-500 mt-1">Kelola informasi lowongan pekerjaan untuk mahasiswa.</p>
          </div>
          <div className="flex gap-3">
            <Button variant="primary" className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 shadow-md" onClick={() => handleOpenModal('add')}>
              <Plus size={16} /> Tambah Lowongan
            </Button>
          </div>
        </div>

        <div className="bg-white rounded-[20px] shadow-sm border border-gray-100 overflow-hidden">
          
          <div className="p-5 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3 px-4 py-2 bg-gray-50 border border-gray-100 rounded-xl w-full sm:w-72 focus-within:ring-2 focus-within:ring-blue-100 focus-within:border-blue-500 transition-all">
              <Search size={18} className="text-gray-400" />
              <input type="text" placeholder="Cari posisi atau perusahaan..." className="bg-transparent border-none outline-none w-full text-sm" />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="px-4 border-gray-200 text-gray-600 bg-white hover:bg-[#0F4C3A] hover:text-white hover:border-[#0F4C3A] rounded-xl flex items-center gap-2 transition-colors">
                <Filter size={16} /> Filter
              </Button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/50">
                  <th className="px-6 py-4 font-bold text-gray-900 text-sm border-b border-gray-100">Posisi & Perusahaan</th>
                  <th className="px-6 py-4 font-bold text-gray-900 text-sm border-b border-gray-100">Tipe</th>
                  <th className="px-6 py-4 font-bold text-gray-900 text-sm border-b border-gray-100">Batas Waktu</th>
                  <th className="px-6 py-4 font-bold text-gray-900 text-sm border-b border-gray-100">Status</th>
                  <th className="px-6 py-4 font-bold text-gray-900 text-sm border-b border-gray-100 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {loading ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-8 text-center text-gray-500">Memuat data...</td>
                  </tr>
                ) : jobs.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-8 text-center text-gray-500">Belum ada lowongan.</td>
                  </tr>
                ) : (
                  jobs.map((job) => {
                    const status = job.status || 'Aktif'; // Asumsi jika tidak ada status
                    const statusColor = status.toLowerCase() === 'aktif' ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-700';
                    return (
                      <tr key={job.id} className="hover:bg-blue-50/30 transition-colors group">
                        <td className="px-6 py-4">
                          <p className="font-bold text-gray-900 text-sm">{job.title}</p>
                          <p className="text-xs text-gray-500 mt-0.5">{job.company || job.company_name}</p>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">{job.location || 'Indonesia'}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{job.deadline ? new Date(job.deadline).toLocaleDateString('id-ID') : '-'}</td>
                        <td className="px-6 py-4">
                          <span className={`inline-block px-3 py-1 rounded-lg text-xs font-bold ${statusColor}`}>
                            {status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" onClick={() => handleOpenModal('edit', job)}>
                              <Edit size={18} />
                            </button>
                            <button className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors" onClick={() => handleDelete(job.id_lowongan || job.id)}>
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
          
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white z-10">
              <h2 className="text-xl font-bold text-gray-900">{modalMode === 'add' ? 'Tambah Lowongan' : 'Edit Lowongan'}</h2>
              <button onClick={handleCloseModal} className="text-gray-400 hover:text-gray-600">&times;</button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-5">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Posisi / Judul Lowongan <span className="text-red-500">*</span></label>
                  <input type="text" name="title" value={formData.title} onChange={handleChange} required className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none" placeholder="e.g. Software Engineer" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Nama Perusahaan <span className="text-red-500">*</span></label>
                  <input type="text" name="company" value={formData.company} onChange={handleChange} required className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none" placeholder="e.g. PT Maju Bersama" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Lokasi Kerja <span className="text-red-500">*</span></label>
                  <input type="text" name="location" value={formData.location} onChange={handleChange} required className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none" placeholder="e.g. Jakarta Pusat" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Batas Akhir (Deadline)</label>
                  <input type="date" name="deadline" value={formData.deadline} onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Tipe Pekerjaan <span className="text-red-500">*</span></label>
                  <select name="type" value={formData.type} onChange={handleChange} required className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none bg-white">
                    <option value="Penuh Waktu">Penuh Waktu</option>
                    <option value="Paruh Waktu">Paruh Waktu</option>
                    <option value="Magang">Magang</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Pengalaman <span className="text-red-500">*</span></label>
                  <select name="experience" value={formData.experience} onChange={handleChange} required className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none bg-white">
                    <option value="Fresh Graduate">Fresh Graduate</option>
                    <option value="1 - 3 Tahun">1 - 3 Tahun</option>
                    <option value="3+ Tahun">3+ Tahun</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Link Pendaftaran / URL</label>
                <input type="url" name="url" value={formData.url} onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none" placeholder="https://..." />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Deskripsi Lowongan <span className="text-red-500">*</span></label>
                <textarea name="description" value={formData.description} onChange={handleChange} required rows={5} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none resize-none" placeholder="Deskripsikan kualifikasi dan persyaratan..."></textarea>
              </div>

              <div className="flex justify-end gap-3 mt-4 pt-4 border-t border-gray-100">
                <Button type="button" variant="outline" onClick={handleCloseModal} className="px-6 text-gray-600 bg-gray-50 border-gray-200 hover:bg-gray-100">Batal</Button>
                <Button type="submit" variant="primary" disabled={submitting} className="px-6 bg-blue-600 hover:bg-blue-700">
                  {submitting ? 'Menyimpan...' : 'Simpan Lowongan'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
