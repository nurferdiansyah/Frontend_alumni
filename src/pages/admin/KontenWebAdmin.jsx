import React, { useState, useEffect } from 'react';
import { AdminLayout } from '../../components/AdminLayout';
import { Button } from '../../components/Button';
import { Layout, Image as ImageIcon, Save, Type } from 'lucide-react';
import { getWebSettings } from '../../api/publicService';
import { updateWebSettings } from '../../api/adminService';

export function KontenWebAdmin() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    hero_title: 'Membangun Karir, Menghubungkan Alumni.',
    hero_description: 'Selamat datang di Pusat Pengembangan Karir dan Alumni Universitas Nurul Huda (UNUHA). Kami berkomitmen membantu setiap mahasiswa dan lulusan mencapai potensi karir maksimal mereka melalui jejaring profesional yang kuat.',
  });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await getWebSettings();
        const data = response.data.data || response.data;
        if (data) {
          setFormData({
            hero_title: data.hero_title || formData.hero_title,
            hero_description: data.hero_description || formData.hero_description,
          });
        }
      } catch (error) {
        console.error('Error fetching web settings:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateWebSettings(formData);
      alert('Berhasil menyimpan perubahan!');
    } catch (error) {
      console.error('Error updating settings:', error);
      alert('Gagal menyimpan perubahan.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <AdminLayout>
      <div className="p-6 md:p-8 min-h-full">
        <div className="max-w-4xl mx-auto space-y-8">
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Manajemen Konten Web</h1>
              <p className="text-gray-500">Ubah teks dan gambar pada halaman utama portal publik.</p>
            </div>
            <Button onClick={handleSave} disabled={saving} variant="primary" className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 shadow-md disabled:opacity-50">
              <Save size={18} /> {saving ? 'Menyimpan...' : 'Simpan Perubahan'}
            </Button>
          </div>

          <div className="space-y-8">
            
            {/* Bagian Hero Section */}
            <div className="bg-white p-6 sm:p-8 rounded-[24px] shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Layout size={20} className="text-blue-600" /> Pengaturan Banner Utama (Hero)
              </h2>
              
              <form className="space-y-6" onSubmit={e => e.preventDefault()}>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Kolom Teks */}
                  <div className="space-y-5">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                        <Type size={16} className="text-gray-400" /> Judul Utama
                      </label>
                      <textarea 
                        name="hero_title"
                        value={formData.hero_title}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all bg-gray-50 focus:bg-white h-24 resize-none"
                        placeholder="Membangun Karir, Menghubungkan Alumni."
                      ></textarea>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                        <Type size={16} className="text-gray-400" /> Deskripsi Paragraf
                      </label>
                      <textarea 
                        name="hero_description"
                        value={formData.hero_description}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all bg-gray-50 focus:bg-white h-32 resize-none leading-relaxed"
                        placeholder="Selamat datang di Pusat Pengembangan Karir..."
                      ></textarea>
                    </div>
                  </div>

                  {/* Kolom Gambar */}
                  <div className="space-y-5">
                    <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                      <ImageIcon size={16} className="text-gray-400" /> Gambar Samping
                    </label>
                    <div className="border-2 border-dashed border-gray-200 rounded-2xl p-4 bg-gray-50 hover:bg-gray-100 transition-colors group cursor-pointer text-center relative overflow-hidden h-[240px] flex flex-col items-center justify-center">
                      <div className="w-16 h-16 bg-white rounded-full shadow-sm flex items-center justify-center text-blue-600 mb-3 group-hover:scale-110 transition-transform">
                        <ImageIcon size={24} />
                      </div>
                      <p className="font-bold text-gray-700 mb-1">Klik untuk mengganti gambar</p>
                      <p className="text-xs text-gray-500">Format: JPG/PNG, Rasio 4:5, Maks 2MB</p>
                    </div>
                  </div>
                </div>

              </form>
            </div>

          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
