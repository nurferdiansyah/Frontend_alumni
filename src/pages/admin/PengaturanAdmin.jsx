import React from 'react';
import { AdminLayout } from '../../components/AdminLayout';
import { Button } from '../../components/Button';
import { Lock, User } from 'lucide-react';

export function PengaturanAdmin() {

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

        </div>
      </div>
    </AdminLayout>
  );
}
