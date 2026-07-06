import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '../../components/Button';
import { CheckCircle, Download } from 'lucide-react';
import { StudentLayout } from '../../components/StudentLayout';

export function Dashboard() {
  return (
    <StudentLayout>
      <div className="p-6 md:p-8">
        <div className="max-w-5xl mx-auto space-y-8">
          
          {/* Greeting */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#0F4C3A] rounded-[24px] p-8 md:p-10 text-white relative overflow-hidden shadow-xl"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#7FE0B0]/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
            
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <h1 className="text-3xl font-bold mb-2">Selamat pagi, Budi! 👋</h1>
                <p className="text-white/80">Profil Anda sudah 100% lengkap. Terima kasih telah memperbarui data diri Anda.</p>
              </div>
            </div>
          </motion.div>

          {/* Success Card & Download */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white p-10 rounded-[24px] shadow-sm border border-gray-100 flex flex-col items-center text-center max-w-2xl mx-auto mt-10">
            <div className="w-24 h-24 bg-green-50 text-green-500 rounded-full flex items-center justify-center mb-6">
              <CheckCircle size={48} strokeWidth={1.5} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Pendataan Berhasil!</h2>
            <p className="text-gray-500 mb-8 max-w-md">
              Terima kasih, data diri Anda telah berhasil disimpan ke dalam sistem Portal Alumni. Anda dapat mengunduh bukti pendataan sebagai laporan.
            </p>
            <Button variant="primary" className="flex items-center gap-3 px-8 py-4 rounded-xl font-bold text-[16px] bg-[#0F4C3A] hover:bg-[#0a3629] text-white shadow-lg hover:-translate-y-1 transition-all">
              <Download size={20} />
              Unduh Bukti Pendataan
            </Button>
          </motion.div>

        </div>
      </div>
    </StudentLayout>
  );
}
