import React, { useState } from 'react';
import { StudentLayout } from '../../components/StudentLayout';
import { Button } from '../../components/Button';
import { Bell, Lock } from 'lucide-react';

export function Pengaturan() {
  const [emailNotif, setEmailNotif] = useState(true);

  return (
    <StudentLayout>
      <div className="p-6 md:p-8 min-h-full">
        <div className="max-w-3xl mx-auto space-y-8">
          
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Pengaturan Akun</h1>
            <p className="text-gray-500">Kelola keamanan akun dan preferensi notifikasi Anda.</p>
          </div>

          <div className="space-y-8">
            {/* Form Keamanan */}
            <div className="bg-white p-6 sm:p-8 rounded-[24px] shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Lock size={20} className="text-[#0F4C3A]" /> Ubah Kata Sandi
              </h2>
              
              <form className="space-y-5" onSubmit={e => e.preventDefault()}>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Kata Sandi Saat Ini</label>
                  <input 
                    type="password" 
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#7FE0B0] focus:ring-4 focus:ring-[#7FE0B0]/10 outline-none transition-all bg-gray-50 focus:bg-white"
                    placeholder="Masukkan kata sandi saat ini"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Kata Sandi Baru</label>
                  <input 
                    type="password" 
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#7FE0B0] focus:ring-4 focus:ring-[#7FE0B0]/10 outline-none transition-all bg-gray-50 focus:bg-white"
                    placeholder="Minimal 8 karakter"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Konfirmasi Kata Sandi Baru</label>
                  <input 
                    type="password" 
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#7FE0B0] focus:ring-4 focus:ring-[#7FE0B0]/10 outline-none transition-all bg-gray-50 focus:bg-white"
                    placeholder="Ulangi kata sandi baru"
                  />
                </div>
                <div className="pt-2">
                  <Button variant="primary" className="w-full sm:w-auto px-8 bg-[#0F4C3A] hover:bg-[#0a3629]">
                    Simpan Kata Sandi
                  </Button>
                </div>
              </form>
            </div>

            {/* Form Preferensi */}
            <div className="bg-white p-6 sm:p-8 rounded-[24px] shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Bell size={20} className="text-[#0F4C3A]" /> Preferensi Notifikasi
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-gray-900">Notifikasi Email</h4>
                    <p className="text-sm text-gray-500">Terima pembaruan lowongan & info kampus via email.</p>
                  </div>
                  <button 
                    onClick={() => setEmailNotif(!emailNotif)}
                    className={`w-12 h-6 rounded-full transition-colors relative flex items-center ${emailNotif ? 'bg-[#7FE0B0]' : 'bg-gray-200'}`}
                  >
                    <div className={`w-4 h-4 bg-white rounded-full shadow-sm transform transition-transform ${emailNotif ? 'translate-x-7' : 'translate-x-1'}`}></div>
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </StudentLayout>
  );
}
