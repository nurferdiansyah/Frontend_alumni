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
    hero_image_1: null,
    hero_image_2: null,
    hero_image_3: null,
  });
  const [previewImages, setPreviewImages] = useState({
    hero_image_1: null,
    hero_image_2: null,
    hero_image_3: null,
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
            hero_image_1: null,
            hero_image_2: null,
            hero_image_3: null,
          });
          setPreviewImages({
            hero_image_1: data.hero_image_1 || data.hero_image || null,
            hero_image_2: data.hero_image_2 || null,
            hero_image_3: data.hero_image_3 || null,
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

  const handleImageChange = (e, index) => {
    const key = `hero_image_${index}`;
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData({ ...formData, [key]: file });
      setPreviewImages({ ...previewImages, [key]: URL.createObjectURL(file) });
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const submitData = new FormData();
      submitData.append('hero_title', formData.hero_title);
      submitData.append('hero_description', formData.hero_description);
      if (formData.hero_image_1) submitData.append('hero_image_1', formData.hero_image_1);
      if (formData.hero_image_2) submitData.append('hero_image_2', formData.hero_image_2);
      if (formData.hero_image_3) submitData.append('hero_image_3', formData.hero_image_3);
      
      await updateWebSettings(submitData);
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
                      <ImageIcon size={16} className="text-gray-400" /> Gambar Slider (Maks 3)
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {[1, 2, 3].map(num => {
                        const key = `hero_image_${num}`;
                        return (
                          <label key={num} className="border-2 border-dashed border-gray-200 rounded-2xl p-2 bg-gray-50 hover:bg-gray-100 transition-colors group cursor-pointer text-center relative overflow-hidden h-[180px] sm:h-[120px] flex flex-col items-center justify-center">
                            <input type="file" className="hidden" accept="image/png, image/jpeg, image/jpg" onChange={(e) => handleImageChange(e, num)} />
                            {previewImages[key] ? (
                              <img src={previewImages[key]} alt={`Preview ${num}`} className="absolute inset-0 w-full h-full object-cover" />
                            ) : (
                              <>
                                <div className="w-10 h-10 sm:w-8 sm:h-8 bg-white rounded-full shadow-sm flex items-center justify-center text-blue-600 mb-2 group-hover:scale-110 transition-transform">
                                  <ImageIcon size={16} />
                                </div>
                                <p className="font-bold text-[11px] sm:text-[10px] text-gray-700">Gambar {num}</p>
                              </>
                            )}
                          </label>
                        );
                      })}
                    </div>
                    <p className="text-xs text-gray-500">Format: JPG/PNG, Rasio 4:5 atau 16:9, Maks 2MB</p>
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
