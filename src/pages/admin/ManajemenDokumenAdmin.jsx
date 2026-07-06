import React, { useState, useEffect } from 'react';
import { AdminLayout } from '../../components/AdminLayout';
import { Button } from '../../components/Button';
import { Save, BookOpen, FileCheck } from 'lucide-react';
import { getWebSettings } from '../../api/publicService';
import { updateWebSettings, getSuratIjazah, verifySuratIjazah } from '../../api/adminService';

export function ManajemenDokumenAdmin() {
  const [activeTab, setActiveTab] = useState('template'); // 'template' or 'verifikasi'
  
  // State for Web Settings (Template)
  const [loadingTemplate, setLoadingTemplate] = useState(true);
  const [savingTemplate, setSavingTemplate] = useState(false);
  const [formData, setFormData] = useState({
    template_surat_ijazah: null,
  });
  const [previewImages, setPreviewImages] = useState({
    template_surat_ijazah: null,
  });

  // State for Surat Verifikasi
  const [suratData, setSuratData] = useState([]);
  const [loadingSurat, setLoadingSurat] = useState(false);

  useEffect(() => {
    fetchSettings();
    fetchSurat();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await getWebSettings();
      const data = response.data.data || response.data;
      if (data) {
          setPreviewImages({
            template_surat_ijazah: data.template_surat_ijazah || null,
          });
      }
    } catch (error) {
      console.error('Error fetching web settings:', error);
    } finally {
      setLoadingTemplate(false);
    }
  };

  const fetchSurat = async () => {
    setLoadingSurat(true);
    try {
      const response = await getSuratIjazah();
      const data = response.data.data || response.data;
      setSuratData(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching surat:', error);
    } finally {
      setLoadingSurat(false);
    }
  };

  const handleVerify = async (id, status, catatan) => {
    try {
      await verifySuratIjazah(id, { status, catatan });
      fetchSurat();
    } catch (e) {
      alert('Gagal memverifikasi');
    }
  };

  const handleTemplateChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData({ ...formData, template_surat_ijazah: file });
      setPreviewImages({ ...previewImages, template_surat_ijazah: file.name });
    }
  };

  const handleSaveTemplate = async () => {
    setSavingTemplate(true);
    try {
      const submitData = new FormData();
      if (formData.template_surat_ijazah) submitData.append('template_surat_ijazah', formData.template_surat_ijazah);
      
      await updateWebSettings(submitData);
      alert('Berhasil menyimpan template!');
    } catch (error) {
      console.error('Error updating template:', error);
      alert('Gagal menyimpan template.');
    } finally {
      setSavingTemplate(false);
    }
  };

  return (
    <AdminLayout>
      <div className="p-6 md:p-8 min-h-full">
        <div className="max-w-6xl mx-auto space-y-6">
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Manajemen Dokumen</h1>
              <p className="text-gray-500">Kelola template dokumen mahasiswa dan verifikasi kiriman mereka.</p>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-4 border-b border-gray-200">
            <button 
              onClick={() => setActiveTab('template')}
              className={`pb-3 px-2 text-sm font-bold border-b-2 transition-colors flex items-center gap-2 ${activeTab === 'template' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
            >
              <BookOpen size={16} /> Template Dokumen
            </button>
            <button 
              onClick={() => setActiveTab('verifikasi')}
              className={`pb-3 px-2 text-sm font-bold border-b-2 transition-colors flex items-center gap-2 ${activeTab === 'verifikasi' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
            >
              <FileCheck size={16} /> Verifikasi Unggahan
            </button>
          </div>

          <div className="pt-2">
            
            {activeTab === 'template' && (
              <div className="bg-white p-6 sm:p-8 rounded-[24px] shadow-sm border border-gray-100 max-w-3xl">
                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <BookOpen size={20} className="text-blue-600" /> Dokumen Template Ijazah
                </h2>
                
                <form className="space-y-6" onSubmit={e => e.preventDefault()}>
                  <div className="bg-gray-50 p-4 sm:p-6 rounded-2xl border border-gray-200">
                    <label className="block text-sm font-bold text-gray-700 mb-2">Unggah Template PDF Baru</label>
                    <input 
                      type="file" 
                      accept="application/pdf"
                      onChange={handleTemplateChange}
                      className="block w-full text-sm text-gray-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                    {previewImages.template_surat_ijazah && (
                      <p className="mt-3 text-sm text-gray-600 font-medium">
                        File aktif / terpilih: <a href={typeof previewImages.template_surat_ijazah === 'string' && previewImages.template_surat_ijazah.startsWith('http') ? previewImages.template_surat_ijazah : '#'} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">{typeof previewImages.template_surat_ijazah === 'string' ? previewImages.template_surat_ijazah.split('/').pop() : 'Terpilih baru'}</a>
                      </p>
                    )}
                  </div>
                  <div className="flex justify-end">
                    <Button onClick={handleSaveTemplate} disabled={savingTemplate} variant="primary" className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 shadow-md disabled:opacity-50">
                      <Save size={18} /> {savingTemplate ? 'Menyimpan...' : 'Simpan Template'}
                    </Button>
                  </div>
                </form>
              </div>
            )}

            {activeTab === 'verifikasi' && (
              <div className="bg-white rounded-[24px] shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                  <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                    <FileCheck size={20} className="text-blue-600" /> Verifikasi Dokumen Mahasiswa
                  </h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-gray-50/50">
                        <th className="px-6 py-4 font-bold text-gray-900 text-sm border-b border-gray-100">Nama & NIM</th>
                        <th className="px-6 py-4 font-bold text-gray-900 text-sm border-b border-gray-100">Waktu Upload</th>
                        <th className="px-6 py-4 font-bold text-gray-900 text-sm border-b border-gray-100">Status</th>
                        <th className="px-6 py-4 font-bold text-gray-900 text-sm border-b border-gray-100">Dokumen</th>
                        <th className="px-6 py-4 font-bold text-gray-900 text-sm border-b border-gray-100 text-right">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {loadingSurat ? (
                        <tr><td colSpan="5" className="px-6 py-8 text-center text-gray-500">Memuat data dokumen...</td></tr>
                      ) : suratData.length === 0 ? (
                        <tr><td colSpan="5" className="px-6 py-8 text-center text-gray-500">Belum ada dokumen yang diunggah.</td></tr>
                      ) : (
                        suratData.map((item) => {
                          let statusDisplay = item.status;
                          if ((item.status === 'Menunggu Upload' || item.status === 'Menunggu Validasi') && item.file_path) {
                            statusDisplay = 'Menunggu Verifikasi';
                          }

                          let statusColor = 'bg-yellow-100 text-yellow-700';
                          if (statusDisplay === 'Disetujui') statusColor = 'bg-green-100 text-green-700';
                          if (statusDisplay === 'Ditolak') statusColor = 'bg-red-100 text-red-700';
                          return (
                          <tr key={item.id_ijazah} className="hover:bg-gray-50/50 transition-colors">
                            <td className="px-6 py-4">
                              <p className="font-bold text-gray-900">{item.alumni?.nama_lengkap || 'Unknown'}</p>
                              <p className="text-sm text-gray-500">{item.alumni?.nim}</p>
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-600">
                              {new Date(item.created_at).toLocaleDateString('id-ID')}
                            </td>
                            <td className="px-6 py-4">
                              <span className={`px-3 py-1 rounded-full text-xs font-bold ${statusColor}`}>
                                {statusDisplay}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <a href={`http://localhost:8000/${item.file_path}`} target="_blank" rel="noreferrer" className="text-blue-600 font-medium text-sm hover:underline">
                                Lihat PDF
                              </a>
                            </td>
                            <td className="px-6 py-4 text-right">
                              {statusDisplay === 'Menunggu Verifikasi' ? (
                                <div className="flex justify-end gap-2">
                                  <Button size="sm" onClick={() => handleVerify(item.id_ijazah, 'Disetujui', '')} className="bg-green-600 hover:bg-green-700 text-white shadow-sm">Setuju</Button>
                                  <Button size="sm" onClick={() => handleVerify(item.id_ijazah, 'Ditolak', 'Dokumen tidak valid')} className="bg-red-600 hover:bg-red-700 text-white shadow-sm">Tolak</Button>
                                </div>
                              ) : (
                                <span className="text-sm text-gray-500 font-medium">Selesai</span>
                              )}
                            </td>
                          </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
            
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
