import React, { useState, useEffect } from 'react';
import { AdminLayout } from '../../components/AdminLayout';
import { Search, Filter, MoreVertical, Eye, Trash2, Edit } from 'lucide-react';
import { Button } from '../../components/Button';
import { getAlumni, updateAlumni, deleteAlumni } from '../../api/adminService';
import Swal from 'sweetalert2';

export function DataAlumni() {
  const [alumniData, setAlumniData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('view');
  const [selectedAlumni, setSelectedAlumni] = useState(null);
  const [formData, setFormData] = useState({
    nama_lengkap: '',
    nim: '',
    angkatan: '',
    nomor_telepon: '',
    alamat: ''
  });
  const [submitting, setSubmitting] = useState(false);

  const fetchAlumni = async () => {
    try {
      const response = await getAlumni();
      const data = response.data.data || response.data;
      setAlumniData(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching alumni:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAlumni();
  }, []);

  const handleOpenModal = (mode, item) => {
    setModalMode(mode);
    setSelectedAlumni(item);
    setFormData({
      nama_lengkap: item.nama_lengkap || '',
      nim: item.nim || '',
      angkatan: item.angkatan || '',
      nomor_telepon: item.nomor_telepon || '',
      alamat: item.alamat || ''
    });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedAlumni(null);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await updateAlumni(selectedAlumni.id_alumni || selectedAlumni.id, formData);
      await fetchAlumni();
      handleCloseModal();
    } catch (error) {
      console.error('Failed to save:', error);
      Swal.fire('Informasi', 'Gagal mengupdate data alumni!', 'info');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Konfirmasi',
      text: 'Yakin ingin menghapus alumni ini secara permanen? Akunnya juga akan terhapus.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#0F4C3A',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya, Lanjutkan',
      cancelButtonText: 'Batal'
    });
    if (result.isConfirmed) {
      try {
        await deleteAlumni(id);
        fetchAlumni();
      } catch (error) {
        console.error('Failed to delete:', error);
        Swal.fire('Informasi', 'Gagal menghapus alumni!', 'info');
      }
    }
  };

  return (
    <AdminLayout>
      <div className="p-6 lg:p-8">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Data Alumni</h1>
            <p className="text-gray-500 mt-1">Kelola dan pantau data seluruh alumni yang terdaftar.</p>
          </div>
        </div>


          <div className="bg-white rounded-[20px] shadow-sm border border-gray-100 overflow-hidden">
            
            {/* Toolbar */}
            <div className="p-5 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <div className="flex items-center gap-3 px-4 py-2 bg-gray-50 border border-gray-100 rounded-xl w-full sm:w-72 focus-within:ring-2 focus-within:ring-blue-100 focus-within:border-blue-500 transition-all">
                  <Search size={18} className="text-gray-400" />
                  <input type="text" placeholder="Cari nama atau NIM..." className="bg-transparent border-none outline-none w-full text-sm" />
                </div>
              </div>
              <div className="flex gap-2">
                <select className="bg-white border border-gray-200 text-sm rounded-xl px-4 py-2.5 outline-none font-medium text-gray-700 hover:bg-gray-50 cursor-pointer">
                  <option>Semua Fakultas</option>
                  <option>Fakultas Sains dan Teknologi</option>
                  <option>Fakultas Pendidikan</option>
                </select>
                <Button variant="outline" className="px-4 border-gray-200 text-gray-600 bg-white hover:bg-[#0F4C3A] hover:text-white hover:border-[#0F4C3A] rounded-xl flex items-center gap-2 transition-colors">
                  <Filter size={16} /> Filter
                </Button>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50/50">
                    <th className="px-6 py-4 font-bold text-gray-900 text-sm border-b border-gray-100">Nama & NIM</th>
                    <th className="px-6 py-4 font-bold text-gray-900 text-sm border-b border-gray-100">Program Studi</th>
                    <th className="px-6 py-4 font-bold text-gray-900 text-sm border-b border-gray-100">Lulus</th>
                    <th className="px-6 py-4 font-bold text-gray-900 text-sm border-b border-gray-100">Status Karir</th>
                    <th className="px-6 py-4 font-bold text-gray-900 text-sm border-b border-gray-100 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {loading ? (
                    <tr><td colSpan="5" className="px-6 py-8 text-center text-gray-500">Memuat data alumni...</td></tr>
                  ) : alumniData.length === 0 ? (
                    <tr><td colSpan="5" className="px-6 py-8 text-center text-gray-500">Belum ada data alumni.</td></tr>
                  ) : (
                    alumniData.map((item) => (
                      <tr key={item.id} className="hover:bg-blue-50/30 transition-colors group">
                        <td className="px-6 py-4">
                          <p className="font-bold text-gray-900 text-sm">{item.nama_lengkap || item.nama}</p>
                          <p className="text-xs text-gray-500 mt-0.5">{item.nim}</p>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">{item.prodi?.nama_prodi || item.prodi || '-'}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{item.angkatan || item.tahun || '-'}</td>
                        <td className="px-6 py-4">
                          <span className="inline-block px-3 py-1 rounded-lg text-xs font-bold bg-emerald-100 text-emerald-700">
                            Terdaftar
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-end gap-2">
                            <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors tooltip relative" onClick={() => handleOpenModal('view', item)}>
                              <Eye size={18} />
                            </button>
                            <button className="p-2 text-orange-500 hover:bg-orange-50 rounded-lg transition-colors" onClick={() => handleOpenModal('edit', item)}>
                              <Edit size={18} />
                            </button>
                            <button className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors" onClick={() => handleDelete(item.id_alumni || item.id)}>
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
            
            {/* Pagination Placeholder */}
            <div className="p-5 border-t border-gray-100 flex items-center justify-between text-sm text-gray-500">
              <p>Menampilkan {alumniData.length} data alumni</p>
              <div className="flex gap-1">
                <button className="px-3 py-1 border border-gray-200 rounded hover:bg-gray-50">Prev</button>
                <button className="px-3 py-1 bg-blue-600 text-white rounded font-medium">1</button>
                <button className="px-3 py-1 border border-gray-200 rounded hover:bg-gray-50">2</button>
                <button className="px-3 py-1 border border-gray-200 rounded hover:bg-gray-50">3</button>
                <button className="px-3 py-1 border border-gray-200 rounded hover:bg-gray-50">Next</button>
              </div>
            </div>
          </div>

      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white z-10">
              <h2 className="text-xl font-bold text-gray-900">{modalMode === 'view' ? 'Detail Alumni' : 'Edit Alumni'}</h2>
              <button onClick={handleCloseModal} className="text-gray-400 hover:text-gray-600">&times;</button>
            </div>
            {modalMode === 'view' ? (
              <div className="p-6">
                <div className="flex flex-col items-center mb-6">
                  <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 mb-4 overflow-hidden shadow-sm">
                    {selectedAlumni.foto_profil ? (
                      <img src={selectedAlumni.foto_profil} alt={selectedAlumni.nama_lengkap} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-3xl font-bold">{selectedAlumni.nama_lengkap?.charAt(0)}</span>
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{selectedAlumni.nama_lengkap}</h3>
                  <p className="text-gray-500">{selectedAlumni.nim}</p>
                </div>
                <div className="grid grid-cols-2 gap-y-4 gap-x-8 bg-gray-50 p-5 rounded-xl border border-gray-100">
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide font-bold mb-1">Tahun Lulus</p>
                    <p className="font-medium text-gray-900">{selectedAlumni.angkatan || '-'}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide font-bold mb-1">Fakultas</p>
                    <p className="font-medium text-gray-900">{selectedAlumni.prodi?.fakultas?.nama_fakultas || '-'}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide font-bold mb-1">Program Studi</p>
                    <p className="font-medium text-gray-900">{selectedAlumni.prodi?.nama_prodi || '-'}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide font-bold mb-1">No. Telepon</p>
                    <p className="font-medium text-gray-900">{selectedAlumni.nomor_telepon || '-'}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-xs text-gray-500 uppercase tracking-wide font-bold mb-1">Alamat</p>
                    <p className="font-medium text-gray-900">{selectedAlumni.alamat || '-'}</p>
                  </div>
                </div>
                <div className="mt-6 flex justify-end">
                  <Button variant="outline" onClick={handleCloseModal} className="px-6 text-gray-600 bg-gray-50 border-gray-200 hover:bg-gray-100">Tutup</Button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Nama Lengkap <span className="text-red-500">*</span></label>
                    <input type="text" name="nama_lengkap" value={formData.nama_lengkap} onChange={handleChange} required className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">NIM <span className="text-red-500">*</span></label>
                    <input type="text" name="nim" value={formData.nim} onChange={handleChange} required className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Tahun Lulus <span className="text-red-500">*</span></label>
                    <input type="number" name="angkatan" value={formData.angkatan} onChange={handleChange} required className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Nomor Telepon</label>
                    <input type="text" name="nomor_telepon" value={formData.nomor_telepon} onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none" />
                  </div>
                  <div className="col-span-1 md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Alamat Lengkap</label>
                    <textarea name="alamat" value={formData.alamat} onChange={handleChange} rows={3} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none resize-none"></textarea>
                  </div>
                </div>

                <div className="flex justify-end gap-3 mt-4 pt-4 border-t border-gray-100">
                  <Button type="button" variant="outline" onClick={handleCloseModal} className="px-6 text-gray-600 bg-gray-50 border-gray-200 hover:bg-gray-100">Batal</Button>
                  <Button type="submit" variant="primary" disabled={submitting} className="px-6 bg-blue-600 hover:bg-blue-700">
                    {submitting ? 'Menyimpan...' : 'Simpan Perubahan'}
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
