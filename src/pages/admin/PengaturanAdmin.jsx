import React, { useState, useEffect } from 'react';
import { AdminLayout } from '../../components/AdminLayout';
import { Button } from '../../components/Button';
import { Lock, User, Building, BookOpen, Trash2, Plus } from 'lucide-react';
import { getFakultas, getProdi, createFakultas, deleteFakultas, createProdi, deleteProdi } from '../../api/adminService';
import Swal from 'sweetalert2';

export function PengaturanAdmin() {
  const [fakultas, setFakultas] = useState([]);
  const [prodi, setProdi] = useState([]);
  const [newFakultas, setNewFakultas] = useState('');
  const [newProdi, setNewProdi] = useState('');
  const [selectedFakultasForProdi, setSelectedFakultasForProdi] = useState('');

  useEffect(() => {
    fetchMasterData();
  }, []);

  const fetchMasterData = async () => {
    try {
      const resF = await getFakultas();
      setFakultas(resF.data.data || resF.data);
      const resP = await getProdi();
      setProdi(resP.data.data || resP.data);
    } catch (e) {
      console.error(e);
    }
  };

  const handleAddFakultas = async (e) => {
    e.preventDefault();
    if (!newFakultas) return;
    try {
      await createFakultas({ nama_fakultas: newFakultas });
      setNewFakultas('');
      fetchMasterData();
    } catch (e) { Swal.fire('Informasi', 'Gagal menambah fakultas', 'info'); }
  };

  const handleDeleteFakultas = async (id) => {
    const result = await Swal.fire({
      title: 'Konfirmasi',
      text: 'Hapus fakultas ini?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#0F4C3A',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya, Lanjutkan',
      cancelButtonText: 'Batal'
    });
    if (result.isConfirmed) {
      try {
        await deleteFakultas(id);
        fetchMasterData();
      } catch (e) { Swal.fire('Informasi', 'Gagal menghapus fakultas', 'info'); }
    }
  };

  const handleAddProdi = async (e) => {
    e.preventDefault();
    if (!newProdi || !selectedFakultasForProdi) return;
    try {
      await createProdi({ nama_prodi: newProdi, id_fakultas: selectedFakultasForProdi });
      setNewProdi('');
      fetchMasterData();
    } catch (e) { Swal.fire('Informasi', 'Gagal menambah prodi', 'info'); }
  };

  const handleDeleteProdi = async (id) => {
    const result = await Swal.fire({
      title: 'Konfirmasi',
      text: 'Hapus prodi ini?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#0F4C3A',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya, Lanjutkan',
      cancelButtonText: 'Batal'
    });
    if (result.isConfirmed) {
      try {
        await deleteProdi(id);
        fetchMasterData();
      } catch (e) { Swal.fire('Informasi', 'Gagal menghapus prodi', 'info'); }
    }
  };
  return (
    <AdminLayout>
      <div className="p-6 md:p-8 min-h-full">
        <div className="max-w-3xl mx-auto space-y-8">
          
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Pengaturan Administrator</h1>
            <p className="text-gray-500">Kelola kredensial akun admin Anda.</p>
          </div>

          <div className="space-y-8">
            
            {/* Form Profil Admin */}
            <div className="bg-white p-6 sm:p-8 rounded-[24px] shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <User size={20} className="text-blue-600" /> Profil Admin
              </h2>
              
              <form className="space-y-5" onSubmit={e => e.preventDefault()}>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Nama Lengkap</label>
                  <input 
                    type="text" 
                    defaultValue="Administrator"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all bg-gray-50 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Email Admin</label>
                  <input 
                    type="email" 
                    defaultValue="admin@un.ac.id"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all bg-gray-50 focus:bg-white"
                  />
                </div>
                <div className="pt-2">
                  <Button variant="primary" className="bg-blue-600 hover:bg-blue-700 px-8">
                    Simpan Profil
                  </Button>
                </div>
              </form>
            </div>

            {/* Form Keamanan */}
            <div className="bg-white p-6 sm:p-8 rounded-[24px] shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Lock size={20} className="text-blue-600" /> Ubah Kata Sandi
              </h2>
              
              <form className="space-y-5" onSubmit={e => e.preventDefault()}>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Kata Sandi Saat Ini</label>
                  <input 
                    type="password" 
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all bg-gray-50 focus:bg-white"
                    placeholder="Masukkan kata sandi saat ini"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Kata Sandi Baru</label>
                  <input 
                    type="password" 
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all bg-gray-50 focus:bg-white"
                    placeholder="Minimal 8 karakter"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Konfirmasi Kata Sandi Baru</label>
                  <input 
                    type="password" 
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all bg-gray-50 focus:bg-white"
                    placeholder="Ulangi kata sandi baru"
                  />
                </div>
                <div className="pt-2">
                  <Button variant="primary" className="bg-gray-800 hover:bg-gray-900 px-8">
                    Perbarui Kata Sandi
                  </Button>
                </div>
              </form>
            </div>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            {/* Master Data Fakultas */}
            <div className="bg-white p-6 sm:p-8 rounded-[24px] shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Building size={20} className="text-emerald-600" /> Master Data Fakultas
              </h2>
              <form onSubmit={handleAddFakultas} className="flex gap-2 mb-6">
                <input type="text" value={newFakultas} onChange={(e) => setNewFakultas(e.target.value)} placeholder="Nama Fakultas Baru" className="w-full px-4 py-2.5 rounded-xl border border-gray-200 outline-none focus:border-emerald-500" />
                <Button type="submit" variant="primary" className="bg-emerald-600 hover:bg-emerald-700 px-4 rounded-xl"><Plus size={18} /></Button>
              </form>
              <ul className="space-y-3">
                {fakultas.map(f => (
                  <li key={f.id_fakultas} className="flex justify-between items-center p-3 bg-gray-50 rounded-xl border border-gray-100 text-sm font-medium">
                    {f.nama_fakultas}
                    <button onClick={() => handleDeleteFakultas(f.id_fakultas)} className="text-red-500 hover:text-red-700 p-1.5"><Trash2 size={16}/></button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Master Data Prodi */}
            <div className="bg-white p-6 sm:p-8 rounded-[24px] shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <BookOpen size={20} className="text-emerald-600" /> Master Data Prodi
              </h2>
              <form onSubmit={handleAddProdi} className="flex flex-col gap-3 mb-6">
                <select value={selectedFakultasForProdi} onChange={(e) => setSelectedFakultasForProdi(e.target.value)} required className="w-full px-4 py-2.5 rounded-xl border border-gray-200 outline-none focus:border-emerald-500 bg-white">
                  <option value="">Pilih Fakultas...</option>
                  {fakultas.map(f => <option key={f.id_fakultas} value={f.id_fakultas}>{f.nama_fakultas}</option>)}
                </select>
                <div className="flex gap-2">
                  <input type="text" value={newProdi} onChange={(e) => setNewProdi(e.target.value)} required placeholder="Nama Prodi Baru" className="w-full px-4 py-2.5 rounded-xl border border-gray-200 outline-none focus:border-emerald-500" />
                  <Button type="submit" variant="primary" className="bg-emerald-600 hover:bg-emerald-700 px-4 rounded-xl"><Plus size={18} /></Button>
                </div>
              </form>
              <ul className="space-y-3">
                {prodi.map(p => (
                  <li key={p.id_prodi} className="flex justify-between items-center p-3 bg-gray-50 rounded-xl border border-gray-100 text-sm font-medium">
                    <div>
                      <p>{p.nama_prodi}</p>
                      <p className="text-[11px] text-gray-500 mt-0.5">{p.fakultas?.nama_fakultas}</p>
                    </div>
                    <button onClick={() => handleDeleteProdi(p.id_prodi)} className="text-red-500 hover:text-red-700 p-1.5"><Trash2 size={16}/></button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
