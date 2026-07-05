import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { StudentLayout } from '../../components/StudentLayout';
import { Button } from '../../components/Button';
import { ArrowLeft, Save, Camera } from 'lucide-react';

const faculties = {
  "Fakultas Agama Islam": ["Pendidikan Agama Islam", "Pendidikan Guru Madrasah Ibtidaiyah"],
  "Fakultas Pendidikan": ["Pendidikan Fisika", "Pendidikan Ekonomi", "Pendidikan Bahasa Inggris", "Pendidikan Bahasa dan Sastra Indonesia", "Pendidikan Teknologi Informasi"],
  "Fakultas Sains dan Teknologi": ["Informatika", "Matematika", "Sains Pertanian"]
};

const locations = {
  "Indonesia": {
    "Sumatera Selatan": ["OKU Timur", "Palembang", "Ogan Ilir", "Ogan Komering Ulu"],
    "Lampung": ["Bandar Lampung", "Metro", "Way Kanan"],
    "Jawa Barat": ["Bandung", "Bogor", "Depok"],
    "DKI Jakarta": ["Jakarta Selatan", "Jakarta Pusat", "Jakarta Barat"]
  },
  "Malaysia": {
    "Kuala Lumpur": ["Bukit Bintang", "Cheras"],
    "Selangor": ["Petaling Jaya", "Shah Alam"]
  }
};

export function EditProfil() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nama: 'Budi Santoso, S.Kom', nim: '20123456', fakultas: 'Fakultas Sains dan Teknologi', prodi: 'Informatika', tahunLulus: '2026', noWa: '081234567890',
    negara: 'Indonesia', provinsi: 'DKI Jakarta', kabupaten: 'Jakarta Selatan', kecamatan: 'Kebayoran Baru', alamatDetail: 'Jl. Jend. Sudirman Kav 52-53, Gedung Karya, Lt. 12',
    statusKarir: 'bekerja',
    namaPerusahaan: 'PT. Teknologi Nusantara', jabatan: 'Frontend Developer'
  });

  const updateForm = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFakultasChange = (e) => {
    updateForm('fakultas', e.target.value);
    updateForm('prodi', '');
  };

  const handleNegaraChange = (e) => {
    updateForm('negara', e.target.value);
    updateForm('provinsi', '');
    updateForm('kabupaten', '');
  };

  const handleProvinsiChange = (e) => {
    updateForm('provinsi', e.target.value);
    updateForm('kabupaten', '');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/profil-saya');
  };

  return (
    <StudentLayout>
      <div className="p-6 md:p-8 min-h-full">
        <div className="max-w-4xl mx-auto space-y-6">
          
          <div className="flex items-center justify-between mb-8">
            <div>
              <Link to="/profil-saya" className="inline-flex items-center gap-2 text-gray-500 hover:text-[#0F4C3A] font-medium transition-colors mb-2 group">
                <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                Kembali ke Profil
              </Link>
              <h1 className="text-3xl font-bold text-gray-900">Edit Profil</h1>
            </div>
            <Button onClick={handleSubmit} className="flex items-center gap-2 bg-[#0F4C3A] hover:bg-[#0a3629]">
              <Save size={18} /> Simpan Perubahan
            </Button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* Foto Profil */}
            <div className="bg-white p-6 md:p-8 rounded-[24px] shadow-sm border border-gray-100 flex flex-col md:flex-row items-center gap-6">
              <div className="relative group cursor-pointer flex-shrink-0">
                <div className="w-28 h-28 bg-[#7FE0B0] text-[#0F4C3A] font-bold text-3xl rounded-full border-4 border-white shadow-md flex items-center justify-center overflow-hidden">
                  BS
                </div>
                <div className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Camera className="text-white w-8 h-8" />
                </div>
              </div>
              <div className="text-center md:text-left">
                <h3 className="font-bold text-gray-900 text-lg mb-1">Foto Profil</h3>
                <p className="text-gray-500 text-sm mb-4">Format JPG, PNG max 2MB. Rekomendasi rasio 1:1.</p>
                <div className="flex gap-3 justify-center md:justify-start">
                  <Button variant="outline" type="button" className="text-sm py-2 px-4 rounded-xl">Pilih Foto Baru</Button>
                  <Button variant="outline" type="button" className="text-sm py-2 px-4 rounded-xl text-red-500 border-red-100 hover:bg-red-50 hover:border-red-200">Hapus</Button>
                </div>
              </div>
            </div>

            {/* Informasi Dasar */}
            <div className="bg-white p-6 md:p-8 rounded-[24px] shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Informasi Dasar</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Nama Lengkap</label>
                  <input type="text" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:border-[#7FE0B0] transition-all text-gray-800" value={formData.nama} onChange={e => updateForm('nama', e.target.value)} />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">NIM</label>
                  <input type="text" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:border-[#7FE0B0] transition-all text-gray-800" value={formData.nim} onChange={e => updateForm('nim', e.target.value)} />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Fakultas</label>
                  <select className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:border-[#7FE0B0] transition-all text-gray-800" value={formData.fakultas} onChange={handleFakultasChange}>
                    {Object.keys(faculties).map(fak => <option key={fak} value={fak}>{fak}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Program Studi</label>
                  <select className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:border-[#7FE0B0] transition-all text-gray-800" value={formData.prodi} onChange={e => updateForm('prodi', e.target.value)} disabled={!formData.fakultas}>
                    {formData.fakultas && faculties[formData.fakultas].map(prodi => <option key={prodi} value={prodi}>{prodi}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Tahun Lulus</label>
                  <select className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:border-[#7FE0B0] transition-all text-gray-800" value={formData.tahunLulus} onChange={e => updateForm('tahunLulus', e.target.value)}>
                    {Array.from({length: 15}, (_, i) => 2026 - i).map(year => <option key={year} value={year}>{year}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Nomor WhatsApp Aktif</label>
                  <input type="tel" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:border-[#7FE0B0] transition-all text-gray-800" value={formData.noWa} onChange={e => updateForm('noWa', e.target.value)} />
                </div>
              </div>
            </div>

            {/* Domisili */}
            <div className="bg-white p-6 md:p-8 rounded-[24px] shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Alamat Domisili</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Negara</label>
                  <select className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:border-[#7FE0B0] transition-all text-gray-800" value={formData.negara} onChange={handleNegaraChange}>
                    {Object.keys(locations).map(negara => <option key={negara} value={negara}>{negara}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Provinsi</label>
                  <select className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:border-[#7FE0B0] transition-all text-gray-800" value={formData.provinsi} onChange={handleProvinsiChange} disabled={!formData.negara}>
                    {formData.negara && Object.keys(locations[formData.negara]).map(prov => <option key={prov} value={prov}>{prov}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Kabupaten/Kota</label>
                  <select className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:border-[#7FE0B0] transition-all text-gray-800" value={formData.kabupaten} onChange={e => updateForm('kabupaten', e.target.value)} disabled={!formData.provinsi}>
                    {formData.provinsi && locations[formData.negara][formData.provinsi].map(kab => <option key={kab} value={kab}>{kab}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Kecamatan</label>
                  <input type="text" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:border-[#7FE0B0] transition-all text-gray-800" value={formData.kecamatan} onChange={e => updateForm('kecamatan', e.target.value)} />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Detail Alamat</label>
                <textarea className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:border-[#7FE0B0] transition-all text-gray-800 h-24 resize-none" value={formData.alamatDetail} onChange={e => updateForm('alamatDetail', e.target.value)}></textarea>
              </div>
            </div>

          </form>
        </div>
      </div>
    </StudentLayout>
  );
}
