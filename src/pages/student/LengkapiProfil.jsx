import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../../components/Button';
import { Camera, MapPin, Briefcase, GraduationCap, ChevronRight, ChevronLeft, Check, Building2, BookOpen, Clock } from 'lucide-react';

const faculties = {
  "Fakultas Agama Islam": ["Pendidikan Agama Islam", "Ekonomi Syariah"],
  "Fakultas Keguruan dan Ilmu Pendidikan": ["Pendidikan Bahasa Inggris", "Pendidikan Bahasa Indonesia", "Pendidikan Fisika"],
  "Fakultas Sains dan Teknologi": ["Informatika", "Sistem Informasi"],
  "Fakultas Pertanian": ["Agroteknologi"]
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

export function LengkapiProfil() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1
    nama: '', nim: '', fakultas: '', prodi: '', tahunLulus: '', noWa: '',
    // Step 2
    negara: '', provinsi: '', kabupaten: '', kecamatan: '', alamatDetail: '',
    // Step 3
    statusKarir: '',
    namaPerusahaan: '', jabatan: '', tahunMulaiKerja: '',
    namaUsaha: '', bidangUsaha: '',
    universitasLanjut: '', jurusanLanjut: '',
    minatKerja: ''
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [step]);

  const updateForm = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Reset dependent fields when parent changes
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

  const nextStep = () => {
    if (step < 3) setStep(step + 1);
  };
  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.statusKarir) {
      alert("Pilih status karir Anda terlebih dahulu sebelum menyimpan profil.");
      return;
    }
    navigate('/dashboard'); // Go to dashboard on success
  };

  const steps = [
    { num: 1, title: 'Data Diri', icon: GraduationCap },
    { num: 2, title: 'Alamat Lengkap', icon: MapPin },
    { num: 3, title: 'Status Karir', icon: Briefcase }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-gray-800">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 py-4 px-6 sticky top-0 z-20">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#0F4C3A] rounded-lg flex items-center justify-center text-white font-black text-sm">
              UN
            </div>
            <span className="font-bold text-xl tracking-tight text-gray-900">Portal Alumni</span>
          </div>
          <div className="text-sm font-semibold text-gray-500">
            Langkah {step} dari 3
          </div>
        </div>
      </header>

      <main className="flex-1 py-10 px-4">
        <div className="max-w-3xl mx-auto">
          
          {/* Stepper indicator */}
          <div className="mb-10 relative">
            <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 -translate-y-1/2 rounded-full z-0"></div>
            <div 
              className="absolute top-1/2 left-0 h-1 bg-[#7FE0B0] -translate-y-1/2 rounded-full z-0 transition-all duration-500"
              style={{ width: `${((step - 1) / 2) * 100}%` }}
            ></div>
            
            <div className="flex justify-between relative z-10">
              {steps.map((s) => {
                const isActive = step >= s.num;
                const isCurrent = step === s.num;
                return (
                  <div key={s.num} className="flex flex-col items-center gap-2">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center border-[3px] transition-all duration-300 ${
                      isActive ? 'bg-[#0F4C3A] border-[#0F4C3A] text-white shadow-lg' : 'bg-white border-gray-300 text-gray-400'
                    }`}>
                      {isActive && !isCurrent ? <Check size={20} /> : <s.icon size={20} />}
                    </div>
                    <span className={`text-sm font-bold ${isActive ? 'text-gray-900' : 'text-gray-400'}`}>{s.title}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-white rounded-[24px] shadow-sm border border-gray-100 p-6 md:p-10">
            <form onSubmit={handleSubmit}>
              <AnimatePresence mode="wait">
                
                {/* STEP 1: DATA DIRI */}
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <div className="mb-8">
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">Informasi Dasar</h2>
                      <p className="text-gray-500">Mari mulai dengan melengkapi identitas diri Anda sebagai alumni.</p>
                    </div>

                    <div className="flex justify-center mb-8">
                      <div className="relative group cursor-pointer">
                        <div className="w-28 h-28 bg-gray-100 rounded-full border-4 border-white shadow-md flex items-center justify-center overflow-hidden">
                          <Camera className="text-gray-400 w-8 h-8 group-hover:scale-110 transition-transform" />
                        </div>
                        <div className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <span className="text-white text-xs font-bold">Unggah Foto</span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Nama Lengkap (Sesuai Ijazah)</label>
                        <input type="text" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:border-[#7FE0B0] focus:ring-4 focus:ring-[#7FE0B0]/10 transition-all text-gray-800" placeholder="Budi Santoso, S.Kom" value={formData.nama} onChange={e => updateForm('nama', e.target.value)} />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Nomor Induk Mahasiswa (NIM)</label>
                        <input type="text" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:border-[#7FE0B0] focus:ring-4 focus:ring-[#7FE0B0]/10 transition-all text-gray-800" placeholder="20123456" value={formData.nim} onChange={e => updateForm('nim', e.target.value)} />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Fakultas</label>
                        <select className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:border-[#7FE0B0] focus:ring-4 focus:ring-[#7FE0B0]/10 transition-all text-gray-800 cursor-pointer" value={formData.fakultas} onChange={handleFakultasChange}>
                          <option value="">Pilih Fakultas...</option>
                          {Object.keys(faculties).map(fak => <option key={fak} value={fak}>{fak}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Program Studi</label>
                        <select className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:border-[#7FE0B0] focus:ring-4 focus:ring-[#7FE0B0]/10 transition-all text-gray-800 cursor-pointer disabled:opacity-50" value={formData.prodi} onChange={e => updateForm('prodi', e.target.value)} disabled={!formData.fakultas}>
                          <option value="">{formData.fakultas ? 'Pilih Program Studi...' : 'Pilih Fakultas Terlebih Dahulu'}</option>
                          {formData.fakultas && faculties[formData.fakultas].map(prodi => <option key={prodi} value={prodi}>{prodi}</option>)}
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Tahun Lulus</label>
                        <select className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:border-[#7FE0B0] focus:ring-4 focus:ring-[#7FE0B0]/10 transition-all text-gray-800 cursor-pointer" value={formData.tahunLulus} onChange={e => updateForm('tahunLulus', e.target.value)}>
                          <option value="">Pilih Tahun...</option>
                          {Array.from({length: 15}, (_, i) => 2026 - i).map(year => <option key={year} value={year}>{year}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Nomor WhatsApp Aktif</label>
                        <input type="tel" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:border-[#7FE0B0] focus:ring-4 focus:ring-[#7FE0B0]/10 transition-all text-gray-800" placeholder="0812xxxxxx" value={formData.noWa} onChange={e => updateForm('noWa', e.target.value)} />
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* STEP 2: ALAMAT LENGKAP */}
                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <div className="mb-8">
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">Alamat Domisili</h2>
                      <p className="text-gray-500">Mohon isikan alamat tempat tinggal Anda saat ini dengan urutan yang benar.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Negara</label>
                        <select className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:border-[#7FE0B0] focus:ring-4 focus:ring-[#7FE0B0]/10 transition-all text-gray-800 cursor-pointer" value={formData.negara} onChange={handleNegaraChange}>
                          <option value="">Pilih Negara...</option>
                          {Object.keys(locations).map(negara => <option key={negara} value={negara}>{negara}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Provinsi</label>
                        <select className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:border-[#7FE0B0] focus:ring-4 focus:ring-[#7FE0B0]/10 transition-all text-gray-800 cursor-pointer disabled:opacity-50" value={formData.provinsi} onChange={handleProvinsiChange} disabled={!formData.negara}>
                          <option value="">{formData.negara ? 'Pilih Provinsi...' : 'Pilih Negara Terlebih Dahulu'}</option>
                          {formData.negara && Object.keys(locations[formData.negara]).map(prov => <option key={prov} value={prov}>{prov}</option>)}
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Kabupaten/Kota</label>
                        <select className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:border-[#7FE0B0] focus:ring-4 focus:ring-[#7FE0B0]/10 transition-all text-gray-800 cursor-pointer disabled:opacity-50" value={formData.kabupaten} onChange={e => updateForm('kabupaten', e.target.value)} disabled={!formData.provinsi}>
                          <option value="">{formData.provinsi ? 'Pilih Kabupaten/Kota...' : 'Pilih Provinsi Terlebih Dahulu'}</option>
                          {formData.provinsi && locations[formData.negara][formData.provinsi].map(kab => <option key={kab} value={kab}>{kab}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Kecamatan</label>
                        <input type="text" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:border-[#7FE0B0] focus:ring-4 focus:ring-[#7FE0B0]/10 transition-all text-gray-800" placeholder="Ketik nama kecamatan" value={formData.kecamatan} onChange={e => updateForm('kecamatan', e.target.value)} />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Detail Jalan / Blok / Nomor Rumah</label>
                      <textarea className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:border-[#7FE0B0] focus:ring-4 focus:ring-[#7FE0B0]/10 transition-all text-gray-800 h-28 resize-none" placeholder="Contoh: Jl. Lintas Sumatera Km 15, RT 01 RW 02, Desa Suka Maju" value={formData.alamatDetail} onChange={e => updateForm('alamatDetail', e.target.value)}></textarea>
                    </div>
                  </motion.div>
                )}

                {/* STEP 3: STATUS KARIR */}
                {step === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <div className="mb-8">
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">Status Karir</h2>
                      <p className="text-gray-500">Pilih status kegiatan Anda saat ini agar kami dapat memberikan layanan dan informasi yang relevan.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                      {[
                        { id: 'bekerja', title: 'Bekerja', icon: Building2, desc: 'Pegawai, Karyawan, Instansi' },
                        { id: 'wirausaha', title: 'Wirausaha', icon: Briefcase, desc: 'Pemilik Usaha, Freelancer' },
                        { id: 'studi', title: 'Lanjut Studi', icon: BookOpen, desc: 'S2, S3, Pendidikan Profesi' },
                        { id: 'belum_bekerja', title: 'Belum Bekerja', icon: Clock, desc: 'Sedang mencari pekerjaan' }
                      ].map((status) => (
                        <div 
                          key={status.id}
                          className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${formData.statusKarir === status.id ? 'border-[#0F4C3A] bg-[#0F4C3A]/5 shadow-sm' : 'border-gray-100 hover:border-[#7FE0B0] bg-white'}`}
                          onClick={() => updateForm('statusKarir', status.id)}
                        >
                          <div className="flex items-center gap-4">
                            <div className={`p-3 rounded-xl ${formData.statusKarir === status.id ? 'bg-[#0F4C3A] text-white' : 'bg-gray-100 text-gray-500'}`}>
                              <status.icon size={24} />
                            </div>
                            <div>
                              <h3 className={`font-bold ${formData.statusKarir === status.id ? 'text-[#0F4C3A]' : 'text-gray-900'}`}>{status.title}</h3>
                              <p className="text-[12px] text-gray-500">{status.desc}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <AnimatePresence mode="wait">
                      {formData.statusKarir === 'bekerja' && (
                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="space-y-6 overflow-hidden">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <label className="block text-sm font-bold text-gray-700 mb-2">Nama Instansi / Perusahaan</label>
                              <input type="text" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:border-[#7FE0B0] focus:ring-4 focus:ring-[#7FE0B0]/10 transition-all" placeholder="PT. Inovasi Bangsa" />
                            </div>
                            <div>
                              <label className="block text-sm font-bold text-gray-700 mb-2">Jabatan / Posisi</label>
                              <input type="text" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:border-[#7FE0B0] focus:ring-4 focus:ring-[#7FE0B0]/10 transition-all" placeholder="Software Engineer" />
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {formData.statusKarir === 'wirausaha' && (
                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="space-y-6 overflow-hidden">
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <label className="block text-sm font-bold text-gray-700 mb-2">Nama Usaha</label>
                              <input type="text" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:border-[#7FE0B0] focus:ring-4 focus:ring-[#7FE0B0]/10 transition-all" placeholder="Kedai Kopi Kampus" />
                            </div>
                            <div>
                              <label className="block text-sm font-bold text-gray-700 mb-2">Bidang Usaha</label>
                              <input type="text" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:border-[#7FE0B0] focus:ring-4 focus:ring-[#7FE0B0]/10 transition-all" placeholder="F&B / Kuliner" />
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {formData.statusKarir === 'studi' && (
                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="space-y-6 overflow-hidden">
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <label className="block text-sm font-bold text-gray-700 mb-2">Nama Universitas / Institusi</label>
                              <input type="text" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:border-[#7FE0B0] focus:ring-4 focus:ring-[#7FE0B0]/10 transition-all" placeholder="Universitas Indonesia" />
                            </div>
                            <div>
                              <label className="block text-sm font-bold text-gray-700 mb-2">Program / Jurusan Studi</label>
                              <input type="text" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:border-[#7FE0B0] focus:ring-4 focus:ring-[#7FE0B0]/10 transition-all" placeholder="Magister Ilmu Komputer" />
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {formData.statusKarir === 'belum_bekerja' && (
                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="space-y-6 overflow-hidden">
                           <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Bidang Pekerjaan yang Diminati</label>
                            <input type="text" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:border-[#7FE0B0] focus:ring-4 focus:ring-[#7FE0B0]/10 transition-all" placeholder="Contoh: Administrasi, IT, Mengajar" />
                            <p className="text-xs text-gray-500 mt-2">Kami akan merekomendasikan lowongan sesuai minat Anda.</p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Navigation Buttons */}
              <div className="mt-12 pt-6 border-t border-gray-100 flex items-center justify-between">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={prevStep} 
                  className={`flex items-center gap-2 ${step === 1 ? 'opacity-0 pointer-events-none' : ''}`}
                >
                  <ChevronLeft size={16} /> Sebelumnya
                </Button>
                
                {step < 3 ? (
                  <Button type="button" variant="primary" onClick={nextStep} className="flex items-center gap-2 bg-[#0F4C3A] hover:bg-[#0a3629]">
                    Selanjutnya <ChevronRight size={16} />
                  </Button>
                ) : (
                  <Button type="submit" disabled={!formData.statusKarir} variant="primary" className="flex items-center gap-2 bg-[#7FE0B0] hover:bg-[#66c698] text-[#0F4C3A] font-bold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed">
                    Simpan Profil <Check size={18} />
                  </Button>
                )}
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
