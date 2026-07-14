import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../../components/Button';
import { Camera, MapPin, Briefcase, GraduationCap, ChevronRight, ChevronLeft, Check, Building2, BookOpen, Clock } from 'lucide-react';
import { getProfile, updateProfile, submitTracerStudy } from '../../api/alumniService';
import { getProdi, getFakultas } from '../../api/publicService';

const locations = {
  "Malaysia": {
    "Kuala Lumpur": ["Bukit Bintang", "Cheras"],
    "Selangor": ["Petaling Jaya", "Shah Alam"]
  },
  "Singapura": {
    "Singapura": ["Central Area", "Jurong East", "Woodlands"]
  }
};

export function LengkapiProfil() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [dbFakultas, setDbFakultas] = useState([]);
  const [dbProdis, setDbProdis] = useState([]);
  const [formData, setFormData] = useState({
    // Step 1
    nama: '', nim: '', id_fakultas: '', id_prodi: '', tahunLulus: '', noWa: '',
    // Step 2
    negara: '', provinsi: '', kabupaten: '', kecamatan: '', alamatDetail: '',
    // Step 3
    statusKarir: '',
    namaPerusahaan: '', jabatan: '', tahunMulaiKerja: '',
    namaUsaha: '', bidangUsaha: '',
    minatKerja: '',
    universitasLanjut: '',
    jurusanLanjut: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  const [fotoFile, setFotoFile] = useState(null);
  const [fotoPreview, setFotoPreview] = useState(null);
  const fileInputRef = useRef(null);

  const handleFotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setError('Ukuran foto maksimal 2MB. Silakan pilih foto lain.');
        return;
      }
      setError(null);
      setFotoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setFotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const [provinces, setProvinces] = useState([]);
  const [regencies, setRegencies] = useState([]);
  const [districts, setDistricts] = useState([]);
  
  const [selectedProvId, setSelectedProvId] = useState('');
  const [selectedRegId, setSelectedRegId] = useState('');

  useEffect(() => {
    const fetchMasterData = async () => {
      try {
        const resF = await getFakultas();
        const resP = await getProdi();
        setDbFakultas(resF.data.data || resF.data);
        setDbProdis(resP.data.data || resP.data);
      } catch (e) { console.error('Error fetching master data', e); }
    };
    fetchMasterData();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [step]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getProfile();
        const data = response.data.data || response.data;
        setFormData(prev => ({
          ...prev,
          nama: data.nama_lengkap || '',
          nim: data.nim || '',
          tahunLulus: data.angkatan || '',
          noWa: data.nomor_telepon || '',
          alamatDetail: data.alamat || '',
          fakultas: data.prodi?.fakultas?.nama_fakultas || '',
          id_fakultas: data.prodi?.id_fakultas || '',
          id_prodi: data.id_prodi || '',
        }));
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const updateForm = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Reset dependent fields when parent changes
  const handleFakultasChange = (e) => {
    updateForm('id_fakultas', e.target.value);
    updateForm('id_prodi', '');
  };

  const handleNegaraChange = (e) => {
    const val = e.target.value;
    updateForm('negara', val);
    updateForm('provinsi', '');
    updateForm('kabupaten', '');
    updateForm('kecamatan', '');
    setSelectedProvId('');
    setSelectedRegId('');
  };

  const handleProvinsiChange = (e) => {
    if (formData.negara === 'Indonesia') {
      const [id, name] = e.target.value.split('|');
      setSelectedProvId(id);
      updateForm('provinsi', name);
    } else {
      updateForm('provinsi', e.target.value);
    }
    updateForm('kabupaten', '');
    updateForm('kecamatan', '');
    setSelectedRegId('');
  };

  const handleKabupatenChange = (e) => {
    if (formData.negara === 'Indonesia') {
      const [id, name] = e.target.value.split('|');
      setSelectedRegId(id);
      updateForm('kabupaten', name);
    } else {
      updateForm('kabupaten', e.target.value);
    }
    updateForm('kecamatan', '');
  };

  const handleKecamatanChange = (e) => {
    if (formData.negara === 'Indonesia') {
      const [, name] = e.target.value.split('|');
      updateForm('kecamatan', name);
    } else {
      updateForm('kecamatan', e.target.value);
    }
  };

  useEffect(() => {
    if (formData.negara === 'Indonesia') {
      fetch('https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json')
        .then(res => res.json())
        .then(data => setProvinces(data));
    }
  }, [formData.negara]);

  useEffect(() => {
    if (selectedProvId) {
      fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${selectedProvId}.json`)
        .then(res => res.json())
        .then(data => setRegencies(data));
    } else {
      setRegencies([]);
    }
  }, [selectedProvId]);

  useEffect(() => {
    if (selectedRegId) {
      fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/districts/${selectedRegId}.json`)
        .then(res => res.json())
        .then(data => setDistricts(data));
    } else {
      setDistricts([]);
    }
  }, [selectedRegId]);

  const nextStep = () => {
    if (step < 3) setStep(step + 1);
  };
  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const isStepComplete = () => {
    if (step === 1) {
      return formData.nama && formData.nim && formData.id_fakultas && formData.id_prodi && formData.tahunLulus && formData.noWa;
    }
    if (step === 2) {
      return formData.negara && formData.provinsi && formData.kabupaten && formData.alamatDetail;
    }
    if (step === 3) {
      if (!formData.statusKarir) return false;
      if (formData.statusKarir === 'bekerja') return formData.namaPerusahaan && formData.jabatan;
      if (formData.statusKarir === 'wirausaha') return formData.namaUsaha && formData.bidangUsaha;
      if (formData.statusKarir === 'studi') return formData.universitasLanjut && formData.jurusanLanjut;
      if (formData.statusKarir === 'belum_bekerja') return formData.minatKerja;
    }
    return false;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const missing = [];
    if (!formData.statusKarir) {
      missing.push('Status Karir');
    } else {
      if (formData.statusKarir === 'bekerja') {
        if (!formData.namaPerusahaan) missing.push('Nama Instansi / Perusahaan');
        if (!formData.jabatan) missing.push('Jabatan / Posisi');
      } else if (formData.statusKarir === 'wirausaha') {
        if (!formData.namaUsaha) missing.push('Nama Usaha');
        if (!formData.bidangUsaha) missing.push('Bidang Usaha');
      } else if (formData.statusKarir === 'studi') {
        if (!formData.universitasLanjut) missing.push('Nama Universitas / Institusi');
        if (!formData.jurusanLanjut) missing.push('Program / Jurusan Studi');
      } else if (formData.statusKarir === 'belum_bekerja') {
        if (!formData.minatKerja) missing.push('Bidang Pekerjaan yang Diminati');
      }
    }

    if (missing.length > 0) {
      setError('Harap lengkapi kolom berikut: ' + missing.join(', '));
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    
    setSaving(true);
    setError(null);
    try {
      const fullAddressParts = [formData.alamatDetail, formData.kecamatan, formData.kabupaten, formData.provinsi, formData.negara].filter(Boolean);
      const fullAddress = fullAddressParts.join(', ');

      // Update basic profile
      // If there's an API for photo upload, you can handle it here using fotoFile
      // e.g. await uploadFotoProfil(fotoFile);

      if (fotoPreview) {
        localStorage.setItem('foto_profil', fotoPreview);
      }

      await updateProfile({
        nama_lengkap: formData.nama,
        nim: formData.nim,
        angkatan: formData.tahunLulus,
        nomor_telepon: formData.noWa,
        alamat: fullAddress,
        id_prodi: formData.id_prodi,
        foto_profil: fotoPreview // Send base64 if backend supports it
      });

      // Submit Tracer Study based on status
      let jobTitle = '';
      let company = '';
      
      if (formData.statusKarir === 'bekerja') {
        jobTitle = formData.jabatan;
        company = formData.namaPerusahaan;
      } else if (formData.statusKarir === 'wirausaha') {
        jobTitle = formData.bidangUsaha;
        company = formData.namaUsaha;
      } else if (formData.statusKarir === 'studi') {
        jobTitle = formData.jurusanLanjut;
        company = formData.universitasLanjut;
      } else {
        jobTitle = formData.minatKerja;
      }

      await submitTracerStudy({
        job_status: formData.statusKarir,
        job_title: jobTitle,
        company: company,
        city: formData.kabupaten || formData.provinsi || 'Indonesia'
      });

      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      setError('Terjadi kesalahan saat menyimpan data. Pastikan semua kolom wajib terisi.');
    } finally {
      setSaving(false);
    }
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
            {error && <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm rounded-r-md">{error}</div>}
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
                      <div className="relative group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                        <div className="w-28 h-28 bg-gray-100 rounded-full border-4 border-white shadow-md flex items-center justify-center overflow-hidden relative">
                          {fotoPreview ? (
                            <img src={fotoPreview} alt="Preview" className="w-full h-full object-cover" />
                          ) : (
                            <Camera className="text-gray-400 w-8 h-8 group-hover:scale-110 transition-transform" />
                          )}
                        </div>
                        <div className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <span className="text-white text-xs font-bold">Unggah Foto</span>
                        </div>
                      </div>
                      <input 
                        type="file" 
                        ref={fileInputRef}
                        className="hidden" 
                        accept="image/jpeg, image/png, image/jpg" 
                        onChange={handleFotoChange} 
                      />
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
                        <label className="block text-sm font-bold text-gray-700 mb-2">Fakultas <span className="text-red-500">*</span></label>
                        <select className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:border-[#7FE0B0] focus:ring-4 focus:ring-[#7FE0B0]/10 transition-all text-gray-800 cursor-pointer" value={formData.id_fakultas} onChange={handleFakultasChange}>
                          <option value="">Pilih Fakultas...</option>
                          {dbFakultas.map(fak => <option key={fak.id_fakultas} value={fak.id_fakultas}>{fak.nama_fakultas}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Program Studi <span className="text-red-500">*</span></label>
                        <select className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:border-[#7FE0B0] focus:ring-4 focus:ring-[#7FE0B0]/10 transition-all text-gray-800 cursor-pointer disabled:opacity-50" value={formData.id_prodi} onChange={e => updateForm('id_prodi', e.target.value)} disabled={!formData.id_fakultas}>
                          <option value="">{formData.id_fakultas ? 'Pilih Program Studi...' : 'Pilih Fakultas Terlebih Dahulu'}</option>
                          {dbProdis.filter(p => p.id_fakultas == formData.id_fakultas).map(prodi => (
                            <option key={prodi.id_prodi} value={prodi.id_prodi}>{prodi.nama_prodi}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Tahun Lulus <span className="text-red-500">*</span></label>
                        <select className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:border-[#7FE0B0] focus:ring-4 focus:ring-[#7FE0B0]/10 transition-all text-gray-800 cursor-pointer" value={formData.tahunLulus} onChange={e => updateForm('tahunLulus', e.target.value)}>
                          <option value="">Pilih Tahun...</option>
                          {Array.from({length: 15}, (_, i) => 2026 - i).map(year => <option key={year} value={year}>{year}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Nomor WhatsApp Aktif <span className="text-red-500">*</span></label>
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
                        <label className="block text-sm font-bold text-gray-700 mb-2">Negara <span className="text-red-500">*</span></label>
                        <select className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:border-[#7FE0B0] focus:ring-4 focus:ring-[#7FE0B0]/10 transition-all text-gray-800 cursor-pointer" value={formData.negara} onChange={handleNegaraChange}>
                          <option value="">Pilih Negara...</option>
                          <option value="Indonesia">Indonesia</option>
                          {Object.keys(locations).map(negara => <option key={negara} value={negara}>{negara}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Provinsi <span className="text-red-500">*</span></label>
                        {formData.negara === 'Indonesia' ? (
                          <select className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:border-[#7FE0B0] focus:ring-4 focus:ring-[#7FE0B0]/10 transition-all text-gray-800 cursor-pointer disabled:opacity-50" value={selectedProvId ? `${selectedProvId}|${formData.provinsi}` : ''} onChange={handleProvinsiChange} disabled={!formData.negara}>
                            <option value="">Pilih Provinsi...</option>
                            {provinces.map(prov => <option key={prov.id} value={`${prov.id}|${prov.name}`}>{prov.name}</option>)}
                          </select>
                        ) : (
                          <select className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:border-[#7FE0B0] focus:ring-4 focus:ring-[#7FE0B0]/10 transition-all text-gray-800 cursor-pointer disabled:opacity-50" value={formData.provinsi} onChange={handleProvinsiChange} disabled={!formData.negara}>
                            <option value="">{formData.negara ? 'Pilih Provinsi...' : 'Pilih Negara Terlebih Dahulu'}</option>
                            {formData.negara && locations[formData.negara] && Object.keys(locations[formData.negara]).map(prov => <option key={prov} value={prov}>{prov}</option>)}
                          </select>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Kabupaten/Kota <span className="text-red-500">*</span></label>
                        {formData.negara === 'Indonesia' ? (
                          <select className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:border-[#7FE0B0] focus:ring-4 focus:ring-[#7FE0B0]/10 transition-all text-gray-800 cursor-pointer disabled:opacity-50" value={selectedRegId ? `${selectedRegId}|${formData.kabupaten}` : ''} onChange={handleKabupatenChange} disabled={!formData.provinsi}>
                            <option value="">{formData.provinsi ? 'Pilih Kabupaten/Kota...' : 'Pilih Provinsi Terlebih Dahulu'}</option>
                            {regencies.map(reg => <option key={reg.id} value={`${reg.id}|${reg.name}`}>{reg.name}</option>)}
                          </select>
                        ) : (
                          <select className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:border-[#7FE0B0] focus:ring-4 focus:ring-[#7FE0B0]/10 transition-all text-gray-800 cursor-pointer disabled:opacity-50" value={formData.kabupaten} onChange={handleKabupatenChange} disabled={!formData.provinsi}>
                            <option value="">{formData.provinsi ? 'Pilih Kabupaten/Kota...' : 'Pilih Provinsi Terlebih Dahulu'}</option>
                            {formData.provinsi && locations[formData.negara] && locations[formData.negara][formData.provinsi] && locations[formData.negara][formData.provinsi].map(kab => <option key={kab} value={kab}>{kab}</option>)}
                          </select>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Kecamatan <span className="text-red-500">*</span></label>
                        {formData.negara === 'Indonesia' ? (
                          <select className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:border-[#7FE0B0] focus:ring-4 focus:ring-[#7FE0B0]/10 transition-all text-gray-800 cursor-pointer disabled:opacity-50" onChange={handleKecamatanChange} disabled={!formData.kabupaten}>
                            <option value="">{formData.kabupaten ? 'Pilih Kecamatan...' : 'Pilih Kabupaten/Kota Terlebih Dahulu'}</option>
                            {districts.map(dist => <option key={dist.id} value={`${dist.id}|${dist.name}`} selected={formData.kecamatan === dist.name}>{dist.name}</option>)}
                          </select>
                        ) : (
                          <input type="text" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:border-[#7FE0B0] focus:ring-4 focus:ring-[#7FE0B0]/10 transition-all text-gray-800" placeholder="Ketik nama kecamatan" value={formData.kecamatan} onChange={e => updateForm('kecamatan', e.target.value)} />
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Detail Jalan / Blok / Nomor Rumah <span className="text-red-500">*</span></label>
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
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">Status Karir <span className="text-red-500">*</span></h2>
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
                              <label className="block text-sm font-bold text-gray-700 mb-2">Nama Instansi / Perusahaan <span className="text-red-500">*</span></label>
                              <input type="text" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:border-[#7FE0B0] focus:ring-4 focus:ring-[#7FE0B0]/10 transition-all" placeholder="PT. Inovasi Bangsa" value={formData.namaPerusahaan} onChange={e => updateForm('namaPerusahaan', e.target.value)} />
                            </div>
                            <div>
                              <label className="block text-sm font-bold text-gray-700 mb-2">Jabatan / Posisi <span className="text-red-500">*</span></label>
                              <input type="text" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:border-[#7FE0B0] focus:ring-4 focus:ring-[#7FE0B0]/10 transition-all" placeholder="Software Engineer" value={formData.jabatan} onChange={e => updateForm('jabatan', e.target.value)} />
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {formData.statusKarir === 'wirausaha' && (
                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="space-y-6 overflow-hidden">
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <label className="block text-sm font-bold text-gray-700 mb-2">Nama Usaha <span className="text-red-500">*</span></label>
                              <input type="text" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:border-[#7FE0B0] focus:ring-4 focus:ring-[#7FE0B0]/10 transition-all" placeholder="Kedai Kopi Kampus" value={formData.namaUsaha} onChange={e => updateForm('namaUsaha', e.target.value)} />
                            </div>
                            <div>
                              <label className="block text-sm font-bold text-gray-700 mb-2">Bidang Usaha <span className="text-red-500">*</span></label>
                              <input type="text" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:border-[#7FE0B0] focus:ring-4 focus:ring-[#7FE0B0]/10 transition-all" placeholder="F&B / Kuliner" value={formData.bidangUsaha} onChange={e => updateForm('bidangUsaha', e.target.value)} />
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {formData.statusKarir === 'studi' && (
                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="space-y-6 overflow-hidden">
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <label className="block text-sm font-bold text-gray-700 mb-2">Nama Universitas / Institusi <span className="text-red-500">*</span></label>
                              <input type="text" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:border-[#7FE0B0] focus:ring-4 focus:ring-[#7FE0B0]/10 transition-all" placeholder="Universitas Indonesia" value={formData.universitasLanjut} onChange={e => updateForm('universitasLanjut', e.target.value)} />
                            </div>
                            <div>
                              <label className="block text-sm font-bold text-gray-700 mb-2">Program / Jurusan Studi <span className="text-red-500">*</span></label>
                              <input type="text" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:border-[#7FE0B0] focus:ring-4 focus:ring-[#7FE0B0]/10 transition-all" placeholder="Magister Ilmu Komputer" value={formData.jurusanLanjut} onChange={e => updateForm('jurusanLanjut', e.target.value)} />
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {formData.statusKarir === 'belum_bekerja' && (
                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="space-y-6 overflow-hidden">
                           <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Bidang Pekerjaan yang Diminati <span className="text-red-500">*</span></label>
                            <input type="text" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:border-[#7FE0B0] focus:ring-4 focus:ring-[#7FE0B0]/10 transition-all" placeholder="Contoh: Administrasi, IT, Mengajar" value={formData.minatKerja} onChange={e => updateForm('minatKerja', e.target.value)} />
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
                  <Button type="button" variant="primary" onClick={nextStep} disabled={!isStepComplete()} className="flex items-center gap-2 bg-[#0F4C3A] hover:bg-[#0a3629] disabled:opacity-50 disabled:cursor-not-allowed transition-all">
                    Selanjutnya <ChevronRight size={16} />
                  </Button>
                ) : (
                  <Button type="submit" disabled={!isStepComplete() || saving} variant="primary" className="flex items-center gap-2 bg-[#7FE0B0] hover:bg-[#66c698] text-[#0F4C3A] font-bold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all">
                    {saving ? 'Menyimpan...' : 'Simpan Profil'} <Check size={18} />
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
