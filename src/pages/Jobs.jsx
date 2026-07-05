import React from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Button } from '../components/Button';
import { JobListItem } from '../components/JobListItem';
import { Search, MapPin, Briefcase } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ScrollReveal } from '../components/ScrollReveal';
import { motion } from 'framer-motion';
export function Jobs() {
  return (
    <div className="min-h-screen bg-white font-sans text-gray-800 flex flex-col">
      <Navbar />

      <section className="bg-[#0F4C3A] text-white pt-36 pb-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
        <motion.div 
          className="max-w-[1200px] mx-auto text-center relative z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[#7FE0B0]">Temukan Pekerjaan Impianmu</h1>
          <p className="text-white/80 text-[16px] max-w-2xl mx-auto mb-10 leading-relaxed">Jelajahi ratusan lowongan kerja dari perusahaan mitra Universitas Nurul Huda khusus untuk alumni.</p>
          
          <div className="bg-white p-2.5 rounded-2xl flex flex-col md:flex-row gap-2 max-w-4xl mx-auto shadow-2xl">
            <div className="flex-1 flex items-center px-4 py-2 text-gray-700">
              <Search className="w-5 h-5 text-gray-400 mr-3 flex-shrink-0" />
              <input type="text" placeholder="Posisi, kata kunci, atau perusahaan" className="w-full bg-transparent outline-none border-none text-[15px]" />
            </div>
            <div className="hidden md:block w-[1px] bg-gray-200 my-2"></div>
            <div className="flex-1 flex items-center px-4 py-2 text-gray-700 border-t border-gray-100 md:border-none">
              <MapPin className="w-5 h-5 text-gray-400 mr-3 flex-shrink-0" />
              <input type="text" placeholder="Kota atau provinsi" className="w-full bg-transparent outline-none border-none text-[15px]" />
            </div>
            <Button variant="primary" className="bg-[#7FE0B0] hover:bg-[#66c698] text-[#0F4C3A] font-bold rounded-xl px-8 py-3.5 shadow-md">Cari Lowongan</Button>
          </div>
        </motion.div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-[1200px] mx-auto flex-grow w-full">
        <div className="flex flex-col md:flex-row gap-8">
          
          {/* Sidebar Filter */}
          <ScrollReveal className="w-full md:w-1/4">
            <div className="bg-gray-50/80 rounded-[20px] p-6 border border-gray-100 sticky top-28">
              <div className="flex justify-between items-center mb-6 border-b border-gray-200 pb-4">
                <h3 className="font-bold text-[18px] text-gray-900">Filter Pencarian</h3>
                <span className="text-[13px] text-red-500 font-medium cursor-pointer">Reset</span>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h4 className="font-bold text-[15px] text-gray-900 mb-3">Tipe Pekerjaan</h4>
                  <label className="flex items-center gap-3 mb-2.5 text-[14px] text-gray-600 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 rounded text-[#0F4C3A] focus:ring-[#0F4C3A]" defaultChecked /> Penuh Waktu
                  </label>
                  <label className="flex items-center gap-3 mb-2.5 text-[14px] text-gray-600 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 rounded text-[#0F4C3A] focus:ring-[#0F4C3A]" /> Paruh Waktu
                  </label>
                  <label className="flex items-center gap-3 mb-2.5 text-[14px] text-gray-600 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 rounded text-[#0F4C3A] focus:ring-[#0F4C3A]" /> Magang
                  </label>
                </div>
                
                <div className="border-t border-gray-200 pt-5">
                  <h4 className="font-bold text-[15px] text-gray-900 mb-3">Pengalaman</h4>
                  <label className="flex items-center gap-3 mb-2.5 text-[14px] text-gray-600 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 rounded text-[#0F4C3A]" defaultChecked /> Fresh Graduate
                  </label>
                  <label className="flex items-center gap-3 mb-2.5 text-[14px] text-gray-600 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 rounded text-[#0F4C3A]" /> 1 - 3 Tahun
                  </label>
                  <label className="flex items-center gap-3 mb-2.5 text-[14px] text-gray-600 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 rounded text-[#0F4C3A]" /> 3+ Tahun
                  </label>
                </div>
              </div>
            </div>
          </ScrollReveal>
          
          {/* Job List */}
          <div className="w-full md:w-3/4 flex flex-col gap-4">
            <ScrollReveal>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4 bg-white p-2">
                <h2 className="font-bold text-[20px] text-gray-900">Menampilkan 156 Lowongan</h2>
                <div className="flex items-center gap-3">
                  <span className="text-[13px] text-gray-500 font-medium">Urutkan:</span>
                  <select className="bg-gray-50 border border-gray-200 font-medium text-gray-700 text-[13px] rounded-lg px-4 py-2.5 outline-none cursor-pointer">
                    <option>Paling Relevan</option>
                    <option>Terbaru Dipublikasi</option>
                    <option>Gaji Tertinggi</option>
                  </select>
                </div>
              </div>
            </ScrollReveal>
            
            <ScrollReveal delay={0.1}>
              <JobListItem position="Senior Software Engineer" company="PT. Teknologi Maju Bersama" location="Jakarta Selatan" deadline="20 Nov 2026" logo="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/1200px-Google_%22G%22_logo.svg.png" />
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <JobListItem position="Management Trainee" company="Bank Mandiri (Persero) Tbk" location="Palembang" deadline="15 Nov 2026" logo="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Logo_of_Bank_Mandiri.svg/1200px-Logo_of_Bank_Mandiri.svg.png" />
            </ScrollReveal>
            <ScrollReveal delay={0.3}>
              <JobListItem position="Tenaga Pengajar (Dosen)" company="Yayasan Nurul Huda" location="OKU Timur" deadline="10 Nov 2026" />
            </ScrollReveal>
            <ScrollReveal delay={0.4}>
              <JobListItem position="UI/UX Designer" company="Gojek Indonesia" location="Remote" deadline="30 Nov 2026" logo="https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Gojek_logo_2019.svg/1200px-Gojek_logo_2019.svg.png" />
            </ScrollReveal>
            <ScrollReveal delay={0.5}>
              <JobListItem position="Data Analyst" company="PT. Telekomunikasi Indonesia" location="Bandung" deadline="25 Nov 2026" logo="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Telkom_Indonesia_2013.svg/1200px-Telkom_Indonesia_2013.svg.png" />
            </ScrollReveal>
            
            <ScrollReveal delay={0.6}>
              <div className="mt-10 flex justify-center pb-8">
                <Button variant="outline" className="rounded-xl px-8 py-3.5 font-bold text-gray-700 bg-white border-2 border-gray-200 hover:border-[#0F4C3A] hover:text-[#0F4C3A] transition-colors">Muat Lebih Banyak</Button>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
