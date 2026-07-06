import React from 'react';
import { StudentLayout } from '../../components/StudentLayout';
import { CheckCircle, Briefcase, Bell } from 'lucide-react';
import { Button } from '../../components/Button';

export function Notifikasi() {
  return (
    <StudentLayout>
      <div className="p-6 md:p-8 min-h-full">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="mb-8 flex justify-between items-end">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Notifikasi</h1>
              <p className="text-gray-500">Pemberitahuan dan aktivitas terbaru Anda.</p>
            </div>
            <button className="text-sm font-bold text-[#0F4C3A] hover:underline">Tandai semua dibaca</button>
          </div>

          <div className="bg-white rounded-[24px] shadow-sm border border-gray-100 overflow-hidden">
            {/* Unread Item */}
            <div className="p-6 border-b border-gray-100 hover:bg-gray-50 transition-colors flex gap-5 bg-green-50/20 cursor-pointer">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 text-green-600">
                <CheckCircle size={24} />
              </div>
              <div>
                <p className="text-lg text-gray-900 font-bold mb-1">Pendataan Berhasil</p>
                <p className="text-gray-600 leading-relaxed mb-3">Terima kasih, data diri Anda telah berhasil disimpan ke dalam sistem Portal Alumni. Anda sekarang dapat mengunduh laporannya di Dasbor.</p>
                <p className="text-sm text-gray-400 font-medium">Baru saja</p>
              </div>
            </div>

            {/* Read Item */}
            <div className="p-6 border-b border-gray-100 hover:bg-gray-50 transition-colors flex gap-5 cursor-pointer">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 text-blue-600">
                <Briefcase size={24} />
              </div>
              <div>
                <p className="text-lg text-gray-900 font-bold mb-1">Lowongan Baru Sesuai Profilmu</p>
                <p className="text-gray-600 leading-relaxed mb-3">PT Teknologi Maju Bersama sedang mencari Frontend Developer (React). Batas waktu pendaftaran adalah 20 November 2026. Segera lamar!</p>
                <p className="text-sm text-gray-400 font-medium">2 jam yang lalu</p>
              </div>
            </div>
            
            {/* Read Item */}
            <div className="p-6 hover:bg-gray-50 transition-colors flex gap-5 cursor-pointer">
              <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 text-gray-500">
                <Bell size={24} />
              </div>
              <div>
                <p className="text-lg text-gray-900 font-bold mb-1">Selamat Datang di Portal Alumni!</p>
                <p className="text-gray-600 leading-relaxed mb-3">Terima kasih telah mendaftar. Silakan lengkapi profil Anda untuk mendapatkan rekomendasi lowongan pekerjaan yang sesuai.</p>
                <p className="text-sm text-gray-400 font-medium">1 hari yang lalu</p>
              </div>
            </div>
            
          </div>
          
          <div className="flex justify-center mt-8">
             <Button variant="outline" className="font-bold text-gray-600">Muat Lebih Banyak</Button>
          </div>
        </div>
      </div>
    </StudentLayout>
  );
}
