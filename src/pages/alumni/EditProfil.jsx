import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { StudentLayout } from '../../components/StudentLayout';
import { Button } from '../../components/Button';
import { ArrowLeft, Save, Camera } from 'lucide-react';
import { getProfile, updateProfile } from '../../api/alumniService';
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

export function EditProfil() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [dbFakultas, setDbFakultas] = useState([]);
  const [dbProdis, setDbProdis] = useState([]);
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

  const hapusFoto = () => {
    setFotoFile(null);
    setFotoPreview(null);
    localStorage.removeItem('foto_profil');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const [provinces, setProvinces] = useState([]);
  const [regencies, setRegencies] = useState([]);
  const [districts, setDistricts] = useState([]);
  
  const [selectedProvId, setSelectedProvId] = useState('');
  const [selectedRegId, setSelectedRegId] = useState('');

  const [formData, setFormData] = useState({
    nama: '', nim: '', id_fakultas: '', id_prodi: '', tahunLulus: '', noWa: '',
    negara: 'Indonesia', provinsi: '', kabupaten: '', kecamatan: '', alamatDetail: '',
    statusKarir: '',
    namaPerusahaan: '', jabatan: ''
  });

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

    const fetchProfile = async () => {
      try {
        const response = await getProfile();
        const data = response.data.data || response.data;
        let parsedAlamat = data.alamat || '';
        let parsedKec = '';
        let parsedKab = '';
        let parsedProv = '';
        let parsedNegara = 'Indonesia';

        if (data.alamat && data.alamat.includes(', ')) {
          const parts = data.alamat.split(', ').reverse();
          if (parts.length >= 5) {
             parsedNegara = parts[0];
             parsedProv = parts[1];
             parsedKab = parts[2];
             parsedKec = parts[3];
             parsedAlamat = parts.slice(4).reverse().join(', ');
          }
        }

        setFormData(prev => ({
          ...prev,
          nama: data.nama_lengkap || data.nama || '',
          nim: data.nim || '',
          tahunLulus: data.angkatan || data.tahun_lulus || '',
          noWa: data.nomor_telepon || '',
          alamatDetail: parsedAlamat,
          kecamatan: parsedKec,
          kabupaten: parsedKab,
          provinsi: parsedProv,
          negara: parsedNegara,
          id_fakultas: data.prodi?.id_fakultas || '',
          id_prodi: data.id_prodi || '',
        }));

        if (data.foto_profil || localStorage.getItem('foto_profil')) {
          setFotoPreview(data.foto_profil || localStorage.getItem('foto_profil'));
        }
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
    if (provinces.length > 0 && formData.provinsi && !selectedProvId) {
      const p = provinces.find(x => x.name === formData.provinsi);
      if (p) setSelectedProvId(p.id);
    }
  }, [provinces, formData.provinsi, selectedProvId]);

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
    if (regencies.length > 0 && formData.kabupaten && !selectedRegId) {
      const r = regencies.find(x => x.name === formData.kabupaten);
      if (r) setSelectedRegId(r.id);
    }
  }, [regencies, formData.kabupaten, selectedRegId]);

  useEffect(() => {
    if (selectedRegId) {
      fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/districts/${selectedRegId}.json`)
        .then(res => res.json())
        .then(data => setDistricts(data));
    } else {
      setDistricts([]);
    }
  }, [selectedRegId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const fullAddressParts = [formData.alamatDetail, formData.kecamatan, formData.kabupaten, formData.provinsi, formData.negara].filter(Boolean);
      const fullAddress = fullAddressParts.join(', ');

      if (fotoPreview) {
        localStorage.setItem('foto_profil', fotoPreview);
      }

      // If backend supports base64 string for photo, we can send it here
      await updateProfile({
        nama_lengkap: formData.nama,
        nim: formData.nim,
        angkatan: formData.tahunLulus,
        nomor_telepon: formData.noWa,
        alamat: fullAddress,
        id_prodi: formData.id_prodi,
        foto_profil: fotoPreview 
      });
      navigate('/profil-saya');
    } catch (err) {
      if (err.response && err.response.data && err.response.data.errors) {
        setError(Object.values(err.response.data.errors).flat().join(', '));
      } else {
        setError('Gagal menyimpan profil. Silakan coba lagi.');
      }
    } finally {
      setSaving(false);
    }
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
            <Button onClick={handleSubmit} disabled={saving} className="flex items-center gap-2 bg-[#0F4C3A] hover:bg-[#0a3629] disabled:opacity-70">
              <Save size={18} /> {saving ? 'Menyimpan...' : 'Simpan Perubahan'}
            </Button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            
            {error && (
              <div className="p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-r-md text-sm">{error}</div>
            )}
            
            {/* Foto Profil */}
            <div className="bg-white p-6 md:p-8 rounded-[24px] shadow-sm border border-gray-100 flex flex-col md:flex-row items-center gap-6">
              <div className="relative group cursor-pointer flex-shrink-0" onClick={() => fileInputRef.current?.click()}>
                <div className="w-28 h-28 bg-[#7FE0B0] text-[#0F4C3A] font-bold text-3xl rounded-full border-4 border-white shadow-md flex items-center justify-center overflow-hidden relative">
                  {fotoPreview ? (
                    <img src={fotoPreview} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    formData.nama ? formData.nama.substring(0, 2).toUpperCase() : 'AL'
                  )}
                </div>
                <div className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Camera className="text-white w-8 h-8" />
                </div>
              </div>
              <input 
                type="file" 
                ref={fileInputRef}
                className="hidden" 
                accept="image/jpeg, image/png, image/jpg" 
                onChange={handleFotoChange} 
              />
              <div className="text-center md:text-left">
                <h3 className="font-bold text-gray-900 text-lg mb-1">Foto Profil</h3>
                <p className="text-gray-500 text-sm mb-4">Format JPG, PNG max 2MB. Rekomendasi rasio 1:1.</p>
                <div className="flex gap-3 justify-center md:justify-start">
                  <Button variant="outline" type="button" onClick={() => fileInputRef.current?.click()} className="text-sm py-2 px-4 rounded-xl">Pilih Foto Baru</Button>
                  <Button variant="outline" type="button" onClick={hapusFoto} className="text-sm py-2 px-4 rounded-xl text-red-500 border-red-100 hover:bg-red-500 hover:border-red-500 hover:text-white transition-colors duration-200">Hapus</Button>
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
                  <select 
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:border-[#7FE0B0] transition-all text-gray-800" 
                    value={formData.id_fakultas} 
                    onChange={e => {
                      updateForm('id_fakultas', e.target.value);
                      updateForm('id_prodi', '');
                    }}
                  >
                    <option value="" disabled>Pilih Fakultas</option>
                    {dbFakultas.map(fak => <option key={fak.id_fakultas} value={fak.id_fakultas}>{fak.nama_fakultas}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Program Studi</label>
                  <select 
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:border-[#7FE0B0] transition-all text-gray-800 disabled:opacity-50" 
                    value={formData.id_prodi} 
                    onChange={e => updateForm('id_prodi', e.target.value)} 
                    disabled={!formData.id_fakultas}
                  >
                    <option value="" disabled>{formData.id_fakultas ? 'Pilih Program Studi' : 'Pilih Fakultas Dulu'}</option>
                    {dbProdis.filter(p => p.id_fakultas == formData.id_fakultas).map(prodi => (
                      <option key={prodi.id_prodi} value={prodi.id_prodi}>{prodi.nama_prodi}</option>
                    ))}
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
                  <label className="block text-sm font-bold text-gray-700 mb-2">Negara <span className="text-red-500">*</span></label>
                  <select className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:border-[#7FE0B0] transition-all text-gray-800" value={formData.negara} onChange={handleNegaraChange}>
                    <option value="">Pilih Negara...</option>
                    <option value="Indonesia">Indonesia</option>
                    {Object.keys(locations).map(negara => <option key={negara} value={negara}>{negara}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Provinsi <span className="text-red-500">*</span></label>
                  {formData.negara === 'Indonesia' ? (
                    <select className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:border-[#7FE0B0] transition-all text-gray-800 disabled:opacity-50" value={selectedProvId ? `${selectedProvId}|${formData.provinsi}` : ''} onChange={handleProvinsiChange} disabled={!formData.negara}>
                      <option value="">Pilih Provinsi...</option>
                      {provinces.map(prov => <option key={prov.id} value={`${prov.id}|${prov.name}`}>{prov.name}</option>)}
                    </select>
                  ) : (
                    <select className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:border-[#7FE0B0] transition-all text-gray-800 disabled:opacity-50" value={formData.provinsi} onChange={handleProvinsiChange} disabled={!formData.negara}>
                      <option value="">{formData.negara ? 'Pilih Provinsi...' : 'Pilih Negara Terlebih Dahulu'}</option>
                      {formData.negara && locations[formData.negara] && Object.keys(locations[formData.negara]).map(prov => <option key={prov} value={prov}>{prov}</option>)}
                    </select>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Kabupaten/Kota <span className="text-red-500">*</span></label>
                  {formData.negara === 'Indonesia' ? (
                    <select className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:border-[#7FE0B0] transition-all text-gray-800 disabled:opacity-50" value={selectedRegId ? `${selectedRegId}|${formData.kabupaten}` : ''} onChange={handleKabupatenChange} disabled={!formData.provinsi}>
                      <option value="">{formData.provinsi ? 'Pilih Kabupaten/Kota...' : 'Pilih Provinsi Terlebih Dahulu'}</option>
                      {regencies.map(reg => <option key={reg.id} value={`${reg.id}|${reg.name}`}>{reg.name}</option>)}
                    </select>
                  ) : (
                    <select className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:border-[#7FE0B0] transition-all text-gray-800 disabled:opacity-50" value={formData.kabupaten} onChange={handleKabupatenChange} disabled={!formData.provinsi}>
                      <option value="">{formData.provinsi ? 'Pilih Kabupaten/Kota...' : 'Pilih Provinsi Terlebih Dahulu'}</option>
                      {formData.provinsi && locations[formData.negara] && locations[formData.negara][formData.provinsi] && locations[formData.negara][formData.provinsi].map(kab => <option key={kab} value={kab}>{kab}</option>)}
                    </select>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Kecamatan <span className="text-red-500">*</span></label>
                  {formData.negara === 'Indonesia' ? (
                    <select className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:border-[#7FE0B0] transition-all text-gray-800 disabled:opacity-50" onChange={handleKecamatanChange} disabled={!formData.kabupaten}>
                      <option value="">{formData.kabupaten ? 'Pilih Kecamatan...' : 'Pilih Kabupaten/Kota Terlebih Dahulu'}</option>
                      {districts.map(dist => <option key={dist.id} value={`${dist.id}|${dist.name}`} selected={formData.kecamatan === dist.name}>{dist.name}</option>)}
                    </select>
                  ) : (
                    <input type="text" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:border-[#7FE0B0] transition-all text-gray-800" placeholder="Ketik nama kecamatan" value={formData.kecamatan} onChange={e => updateForm('kecamatan', e.target.value)} />
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Detail Alamat / Jalan / Blok</label>
                <textarea className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:border-[#7FE0B0] transition-all text-gray-800 h-28 resize-none" placeholder="Masukkan alamat lengkap Anda..." value={formData.alamatDetail} onChange={e => updateForm('alamatDetail', e.target.value)}></textarea>
              </div>
            </div>

          </form>
        </div>
      </div>
    </StudentLayout>
  );
}
