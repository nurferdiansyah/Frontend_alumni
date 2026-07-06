import React, { useState, useEffect } from 'react';
import { AdminLayout } from '../../components/AdminLayout';
import { Search, Plus, Filter, Edit, Trash2, Eye } from 'lucide-react';
import { Button } from '../../components/Button';
import { getNews } from '../../api/publicService';
import { createNews, updateNews, deleteNews } from '../../api/adminService';
import Swal from 'sweetalert2';

export function BeritaAdmin() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [selectedNews, setSelectedNews] = useState(null);
  const [formData, setFormData] = useState({
    judul: '',
    kategori: 'Akademik',
    konten: '',
    status: 'Diterbitkan',
    gambar_url: ''
  });
  const [submitting, setSubmitting] = useState(false);

  const fetchNews = async () => {
    try {
      const response = await getNews();
      const data = response.data.data || response.data;
      setNews(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching news:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const handleOpenModal = (mode, newsItem = null) => {
    setModalMode(mode);
    setSelectedNews(newsItem);
    if (mode === 'edit' && newsItem) {
      setFormData({
        judul: newsItem.judul || newsItem.title || '',
        kategori: newsItem.kategori || newsItem.category || 'Akademik',
        konten: newsItem.konten || '',
        status: newsItem.status || 'Diterbitkan',
        gambar_url: newsItem.gambar_url || ''
      });
    } else {
      setFormData({ judul: '', kategori: 'Akademik', konten: '', status: 'Diterbitkan', gambar_url: '' });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedNews(null);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      if (modalMode === 'add') {
        await createNews(formData);
      } else {
        await updateNews(selectedNews.id_news || selectedNews.id, formData);
      }
      await fetchNews();
      handleCloseModal();
    } catch (error) {
      console.error('Failed to save news:', error);
      Swal.fire('Informasi', 'Gagal menyimpan berita!', 'info');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Konfirmasi',
      text: 'Yakin ingin menghapus berita ini?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#0F4C3A',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya, Lanjutkan',
      cancelButtonText: 'Batal'
    });
    if (result.isConfirmed) {
      try {
        await deleteNews(id);
        fetchNews();
      } catch (error) {
        console.error('Failed to delete:', error);
        Swal.fire('Informasi', 'Gagal menghapus berita!', 'info');
      }
    }
  };

  return (
    <AdminLayout>
      <div className="p-6 lg:p-8">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Manajemen Berita</h1>
            <p className="text-gray-500 mt-1">Kelola artikel, pengumuman, dan berita seputar kampus.</p>
          </div>
          <div className="flex gap-3">
            <Button variant="primary" className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 shadow-md" onClick={() => handleOpenModal('add')}>
              <Plus size={16} /> Tulis Berita Baru
            </Button>
          </div>
        </div>

        <div className="bg-white rounded-[20px] shadow-sm border border-gray-100 overflow-hidden">
          
          <div className="p-5 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3 px-4 py-2 bg-gray-50 border border-gray-100 rounded-xl w-full sm:w-72 focus-within:ring-2 focus-within:ring-blue-100 focus-within:border-blue-500 transition-all">
              <Search size={18} className="text-gray-400" />
              <input type="text" placeholder="Cari judul berita..." className="bg-transparent border-none outline-none w-full text-sm" />
            </div>
            <div className="flex gap-2">
              <select className="bg-white border border-gray-200 text-sm rounded-xl px-4 py-2.5 outline-none font-medium text-gray-700 cursor-pointer">
                <option>Semua Kategori</option>
                <option>Akademik</option>
                <option>Karir</option>
                <option>Acara</option>
              </select>
              <Button variant="outline" className="px-4 border-gray-200 text-gray-600 bg-white hover:bg-[#0F4C3A] hover:text-white hover:border-[#0F4C3A] rounded-xl flex items-center gap-2 transition-colors">
                <Filter size={16} /> Filter
              </Button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/50">
                  <th className="px-6 py-4 font-bold text-gray-900 text-sm border-b border-gray-100">Judul Berita</th>
                  <th className="px-6 py-4 font-bold text-gray-900 text-sm border-b border-gray-100">Kategori</th>
                  <th className="px-6 py-4 font-bold text-gray-900 text-sm border-b border-gray-100">Tanggal Upload</th>
                  <th className="px-6 py-4 font-bold text-gray-900 text-sm border-b border-gray-100">Status</th>
                  <th className="px-6 py-4 font-bold text-gray-900 text-sm border-b border-gray-100 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {loading ? (
                  <tr><td colSpan="5" className="px-6 py-8 text-center text-gray-500">Memuat data berita...</td></tr>
                ) : news.length === 0 ? (
                  <tr><td colSpan="5" className="px-6 py-8 text-center text-gray-500">Belum ada berita.</td></tr>
                ) : (
                  news.map((item) => (
                    <tr key={item.id} className="hover:bg-blue-50/30 transition-colors group">
                      <td className="px-6 py-4">
                        <p className="font-bold text-gray-900 text-sm max-w-md truncate">{item.judul || item.title}</p>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{item.kategori || item.category || '-'}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{item.published_at || item.created_at ? new Date(item.published_at || item.created_at).toLocaleDateString('id-ID') : '-'}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-block px-3 py-1 rounded-lg text-xs font-bold ${item.status === 'Diterbitkan' ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-700'}`}>
                          {item.status || 'Diterbitkan'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button className="p-2 text-orange-500 hover:bg-orange-50 rounded-lg transition-colors" onClick={() => handleOpenModal('edit', item)}>
                            <Edit size={18} />
                          </button>
                          <button className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors" onClick={() => handleDelete(item.id_news || item.id)}>
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white z-10">
              <h2 className="text-xl font-bold text-gray-900">{modalMode === 'add' ? 'Tulis Berita Baru' : 'Edit Berita'}</h2>
              <button onClick={handleCloseModal} className="text-gray-400 hover:text-gray-600">&times;</button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-5">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="col-span-1 md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Judul Berita <span className="text-red-500">*</span></label>
                  <input type="text" name="judul" value={formData.judul} onChange={handleChange} required className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none" placeholder="Masukkan judul..." />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Kategori <span className="text-red-500">*</span></label>
                  <select name="kategori" value={formData.kategori} onChange={handleChange} required className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none bg-white">
                    <option value="Akademik">Akademik</option>
                    <option value="Karir">Karir</option>
                    <option value="Acara">Acara</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Status Publikasi <span className="text-red-500">*</span></label>
                  <select name="status" value={formData.status} onChange={handleChange} required className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none bg-white">
                    <option value="Diterbitkan">Diterbitkan (Publik)</option>
                    <option value="Draf">Draf (Disembunyikan)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">URL Gambar Sampul (Opsional)</label>
                <input type="url" name="gambar_url" value={formData.gambar_url} onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none" placeholder="https://..." />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Konten Berita <span className="text-red-500">*</span></label>
                <textarea name="konten" value={formData.konten} onChange={handleChange} required rows={8} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none resize-none" placeholder="Tulis isi berita di sini..."></textarea>
              </div>

              <div className="flex justify-end gap-3 mt-4 pt-4 border-t border-gray-100">
                <Button type="button" variant="outline" onClick={handleCloseModal} className="px-6 text-gray-600 bg-gray-50 border-gray-200 hover:bg-gray-100">Batal</Button>
                <Button type="submit" variant="primary" disabled={submitting} className="px-6 bg-blue-600 hover:bg-blue-700">
                  {submitting ? 'Menyimpan...' : 'Simpan Berita'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
