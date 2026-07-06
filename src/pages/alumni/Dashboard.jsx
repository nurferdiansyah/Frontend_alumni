import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../../components/Button';
import { CheckCircle, Download, X, AlertCircle } from 'lucide-react';
import { StudentLayout } from '../../components/StudentLayout';
import { getProfile, getIjazahHistory, uploadIjazah } from '../../api/alumniService';

export function Dashboard() {
  const [profileName, setProfileName] = useState('');
  const [downloading, setDownloading] = useState(false);
  const [suratState, setSuratState] = useState(null);
  const [templateUrl, setTemplateUrl] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [modalConfig, setModalConfig] = useState({ isOpen: false, type: 'success', message: '' });

  const showModal = (type, message) => {
    setModalConfig({ isOpen: true, type, message });
    if (type === 'success') {
      setTimeout(() => setModalConfig(prev => ({ ...prev, isOpen: false })), 3000);
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getProfile();
        const data = response.data.data || response.data;
        setProfileName(data.nama_lengkap || 'Alumni');
      } catch (error) {
        console.error('Error fetching profile:', error);
        setProfileName('Alumni');
      }
    };
    const fetchSuratInfo = async () => {
      try {
        const response = await getIjazahHistory();
        const data = response.data;
        setSuratState(data.surat);
        setTemplateUrl(data.template_url);
      } catch (error) {
        console.error('Error fetching surat info:', error);
      }
    };
    fetchProfile();
    fetchSuratInfo();
  }, []);

  const handleDownloadTemplate = () => {
    if (templateUrl) {
      window.open(templateUrl, '_blank');
    } else {
      showModal('error', 'Template belum tersedia. Silakan hubungi admin.');
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      showModal('error', 'Silakan pilih file PDF terlebih dahulu (wajib diisi).');
      return;
    }
    setUploading(true);
    const formData = new FormData();
    formData.append('surat_file', selectedFile);
    try {
      await uploadIjazah(formData);
      showModal('success', 'Dokumen berhasil diunggah dan sedang menunggu verifikasi.');
      // Refresh state
      const response = await getIjazahHistory();
      setSuratState(response.data.surat);
      setSelectedFile(null);
    } catch (e) {
      showModal('error', 'Gagal mengunggah dokumen. Silakan coba lagi.');
    } finally {
      setUploading(false);
    }
  };


  return (
    <StudentLayout>
      <div className="p-6 md:p-8">
        <div className="max-w-5xl mx-auto space-y-8">
          
          {/* Greeting */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#0F4C3A] rounded-[24px] p-8 md:p-10 text-white relative overflow-hidden shadow-xl"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#7FE0B0]/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
            
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <h1 className="text-3xl font-bold mb-2 text-white">Selamat datang, <span className="text-[#7FE0B0]">{profileName}</span>! 👋</h1>
                <p className="text-white/80">Profil Anda sudah 100% lengkap. Terima kasih telah memperbarui data diri Anda.</p>
              </div>
            </div>
          </motion.div>

          {/* Success Card & Upload */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white p-10 rounded-[24px] shadow-sm border border-gray-100 flex flex-col items-center text-center max-w-2xl mx-auto mt-10">
            <div className={`w-24 h-24 rounded-full flex items-center justify-center mb-6 ${suratState?.status === 'Disetujui' ? 'bg-green-50 text-green-500' : 'bg-blue-50 text-blue-500'}`}>
              <CheckCircle size={48} strokeWidth={1.5} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Pendataan Berhasil!</h2>
            <p className="text-gray-500 mb-8 max-w-md">
              Terima kasih, data diri Anda telah berhasil disimpan ke dalam sistem Portal Alumni. Sebagai syarat pengambilan Ijazah asli, silakan unduh dan unggah kembali dokumen surat pernyataan di bawah ini.
            </p>

            <div className="w-full bg-gray-50 p-6 rounded-2xl border border-gray-100 text-left space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h3 className="font-bold text-gray-900">Langkah 1: Unduh Template</h3>
                  <p className="text-sm text-gray-500 mt-1">Unduh dan isi form surat kelulusan.</p>
                </div>
                <Button variant="outline" onClick={handleDownloadTemplate} className="whitespace-nowrap flex items-center gap-2 border-gray-300 text-gray-700 hover:bg-[#0F4C3A] hover:text-white hover:border-[#0F4C3A] transition-colors">
                  <Download size={16} /> Unduh PDF
                </Button>
              </div>
              
              <div className="h-px bg-gray-200 my-4"></div>
              
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900">Langkah 2: Unggah Dokumen</h3>
                  <p className="text-sm text-gray-500 mt-1">Unggah PDF yang sudah diisi dan ditandatangani.</p>
                  
                  {suratState && suratState.file_path && (
                    <div className="mt-4 mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="text-sm text-blue-800 font-bold">Dokumen telah diunggah</span>
                        <span className="text-xs text-blue-600 mt-0.5">File tersimpan di sistem</span>
                      </div>
                      <a href={`http://localhost:8000/${suratState.file_path}`} target="_blank" rel="noreferrer" className="text-sm px-3 py-1.5 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-colors">Lihat File</a>
                    </div>
                  )}

                  {(!suratState || suratState.status === 'Ditolak' || suratState.status === 'Menunggu Upload') && (
                    <div className="mt-4">
                      <input 
                        type="file" 
                        accept="application/pdf"
                        onChange={(e) => setSelectedFile(e.target.files[0])}
                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-[#0F4C3A] file:text-white hover:file:bg-[#0a3629] mb-3"
                      />
                      <Button variant="primary" onClick={handleUpload} disabled={uploading} className="w-full bg-[#0F4C3A] hover:bg-[#0a3629]">
                        {uploading ? 'Mengunggah...' : 'Unggah Sekarang'}
                      </Button>
                    </div>
                  )}
                </div>
              </div>

              <div className="h-px bg-gray-200 my-4"></div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900">Langkah 3: Status Persetujuan</h3>
                  <p className="text-sm text-gray-500 mt-1">Pantau status dokumen yang Anda unggah.</p>
                  
                  {suratState ? (
                    <div className="mt-3 inline-block">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        suratState.status === 'Disetujui' ? 'bg-green-100 text-green-700' : 
                        suratState.status === 'Ditolak' ? 'bg-red-100 text-red-700' : 
                        'bg-yellow-100 text-yellow-700'
                      }`}>
                        Status: {((suratState.status === 'Menunggu Upload' || suratState.status === 'Menunggu Validasi') && suratState.file_path) ? 'Menunggu Verifikasi' : suratState.status}
                      </span>
                      {suratState.catatan_admin && (
                        <p className="text-xs text-red-600 mt-2">Catatan: {suratState.catatan_admin}</p>
                      )}
                    </div>
                  ) : (
                    <div className="mt-3 inline-block">
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-gray-100 text-gray-700">
                        Status: Belum ada dokumen
                      </span>
                    </div>
                  )}

                  {suratState?.status === 'Disetujui' && (
                     <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-800 text-sm font-medium">
                       Dokumen Anda sudah diverifikasi. Anda sekarang dapat mengambil Ijazah.
                     </div>
                  )}
                </div>
              </div>
            </div>

          </motion.div>

        </div>
      </div>

      {/* Custom Modal */}
      {modalConfig.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="bg-white rounded-2xl shadow-xl w-full max-w-sm overflow-hidden"
          >
            <div className={`p-4 flex items-center gap-3 ${modalConfig.type === 'success' ? 'bg-green-50' : 'bg-red-50'}`}>
              <div className={`p-2 rounded-full ${modalConfig.type === 'success' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                {modalConfig.type === 'success' ? <CheckCircle size={24} /> : <AlertCircle size={24} />}
              </div>
              <h3 className="font-bold text-gray-900 flex-1">
                {modalConfig.type === 'success' ? 'Berhasil!' : 'Terjadi Kesalahan'}
              </h3>
              <button onClick={() => setModalConfig({ ...modalConfig, isOpen: false })} className="text-gray-400 hover:text-gray-600 transition-colors">
                <X size={20} />
              </button>
            </div>
            <div className="p-5">
              <p className="text-gray-600 text-sm">{modalConfig.message}</p>
            </div>
            {modalConfig.type === 'error' && (
              <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-end">
                <Button onClick={() => setModalConfig({ ...modalConfig, isOpen: false })} variant="primary" className="bg-[#0F4C3A] hover:bg-[#0a3629]">
                  Tutup
                </Button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </StudentLayout>
  );
}
