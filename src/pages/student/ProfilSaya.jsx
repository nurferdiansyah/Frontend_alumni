import React from 'react';
import { motion } from 'framer-motion';
import { StudentLayout } from '../../components/StudentLayout';
import { Button } from '../../components/Button';
import { MapPin, Briefcase, GraduationCap, Edit, Phone, Building2 } from 'lucide-react';

export function ProfilSaya() {
  return (
    <StudentLayout>
      <div className="p-6 md:p-8">
        <div className="max-w-5xl mx-auto space-y-6">
          
          {/* Header Profil (Cover & Avatar) */}
          <div className="bg-white rounded-[24px] shadow-sm border border-gray-100 overflow-hidden relative">
            <div className="h-48 bg-[#0F4C3A] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#7FE0B0]/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
            </div>
            
            <div className="px-8 pb-8 relative">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 -mt-16 mb-4">
                <div className="flex flex-col md:flex-row gap-6 items-center md:items-end">
                  <div className="w-32 h-32 rounded-full border-4 border-white bg-[#7FE0B0] flex items-center justify-center text-4xl font-bold text-[#0F4C3A] shadow-md z-10 relative overflow-hidden">
                    BS
                    {/* If photo exists: <img src="..." className="w-full h-full object-cover" /> */}
                  </div>
                  <div className="text-center md:text-left pb-2">
                    <h1 className="text-2xl font-bold text-gray-900">Budi Santoso, S.Kom</h1>
                    <p className="text-gray-500 font-medium">NIM: 20123456</p>
                  </div>
                </div>
                
                <div className="flex justify-center md:justify-end pb-2">
                  <Button variant="outline" className="flex items-center gap-2 rounded-xl">
                    <Edit size={16} /> Edit Profil
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Info Dasar */}
            <div className="md:col-span-2 space-y-6">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-8 rounded-[24px] shadow-sm border border-gray-100">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                    <GraduationCap size={24} />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">Informasi Akademik & Kontak</h2>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-8">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Fakultas</p>
                    <p className="font-bold text-gray-900">Fakultas Sains dan Teknologi</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Program Studi</p>
                    <p className="font-bold text-gray-900">Informatika</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Tahun Lulus</p>
                    <p className="font-bold text-gray-900">2026</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Nomor WhatsApp</p>
                    <p className="font-bold text-gray-900 flex items-center gap-2">
                      <Phone size={14} className="text-green-600" />
                      0812-3456-7890
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Status Karir */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white p-8 rounded-[24px] shadow-sm border border-gray-100">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-orange-50 text-orange-600 rounded-lg">
                    <Briefcase size={24} />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">Status Karir Saat Ini</h2>
                </div>
                
                <div className="flex items-start gap-4 p-4 border border-gray-100 rounded-xl bg-gray-50">
                  <div className="p-3 bg-white text-[#0F4C3A] rounded-xl shadow-sm">
                    <Building2 size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">Bekerja</h3>
                    <p className="text-sm text-gray-500 mt-1">PT. Teknologi Nusantara</p>
                    <p className="text-sm text-gray-500">Frontend Developer</p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Sidebar Profil */}
            <div className="space-y-6">
              {/* Alamat */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white p-8 rounded-[24px] shadow-sm border border-gray-100">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-red-50 text-red-500 rounded-lg">
                    <MapPin size={24} />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">Domisili</h2>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Negara & Provinsi</p>
                    <p className="font-bold text-gray-900">Indonesia, DKI Jakarta</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Kabupaten/Kota</p>
                    <p className="font-bold text-gray-900">Jakarta Selatan</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Kecamatan</p>
                    <p className="font-bold text-gray-900">Kebayoran Baru</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Detail Alamat</p>
                    <p className="font-medium text-gray-900 text-sm leading-relaxed">
                      Jl. Jend. Sudirman Kav 52-53, Gedung Karya, Lt. 12
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
            
          </div>
        </div>
      </div>
    </StudentLayout>
  );
}
