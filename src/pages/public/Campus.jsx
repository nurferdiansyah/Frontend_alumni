import React, { useState, useEffect } from 'react';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { Button } from '../../components/Button';
import { BookMarked, Calendar, ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ScrollReveal } from '../../components/ScrollReveal';
import { motion } from 'framer-motion';
import { getInfo } from '../../api/publicService';

export function Campus() {
  const [infoList, setInfoList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const response = await getInfo();
        const data = response.data.data || response.data;
        setInfoList(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error fetching info:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchInfo();
  }, []);
  return (
    <div className="min-h-screen bg-white font-sans text-gray-800 flex flex-col">
      <Navbar />

      {/* Header */}
      <section className="bg-[#0F4C3A] text-white pt-36 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
        <motion.div 
          className="max-w-[1200px] mx-auto text-center relative z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[#7FE0B0]">Informasi Kampus UNUHA</h1>
          <p className="text-white/80 text-[16px] max-w-2xl mx-auto leading-relaxed">Pusat informasi akademik, berita terkini, dan pengumuman resmi dari Universitas Nurul Huda untuk seluruh civitas akademika dan alumni.</p>
        </motion.div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-[1200px] mx-auto flex-grow w-full">
        
        {/* Tentang Kampus */}
        <div className="mb-24">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <ScrollReveal className="w-full lg:w-1/2">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F3F4F6] text-[#0F4C3A] text-[11px] font-bold mb-6 tracking-widest uppercase">
                <BookMarked size={14} /> TENTANG KAMPUS
              </div>
              <h2 className="text-3xl lg:text-[36px] font-bold text-gray-900 mb-6 leading-tight">Mencetak Generasi Unggul Berwawasan Global</h2>
              <p className="text-gray-500 mb-6 leading-relaxed text-[15px]">Universitas Nurul Huda (UNUHA) adalah perguruan tinggi yang memadukan nilai-nilai keislaman dengan kemajuan ilmu pengetahuan dan teknologi. Kami berkomitmen penuh untuk menjadi pusat keunggulan pendidikan yang inovatif di wilayah Sumatera Selatan.</p>
              
              <div className="grid grid-cols-2 gap-8 mt-10">
                <div className="flex flex-col gap-1">
                  <span className="text-4xl font-bold text-[#0F4C3A]">3</span>
                  <span className="text-sm font-bold text-[#7FE0B0] tracking-wider uppercase">Fakultas</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-4xl font-bold text-[#0F4C3A]">10</span>
                  <span className="text-sm font-bold text-[#7FE0B0] tracking-wider uppercase">Program Studi</span>
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.2} className="w-full lg:w-1/2">
              <div className="relative">
                <div className="absolute inset-0 bg-[#0F4C3A] rounded-[32px] translate-x-4 translate-y-4"></div>
                <img src="https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=2086&auto=format&fit=crop" alt="Kampus UNUHA" className="relative w-full h-[400px] object-cover rounded-[32px] shadow-xl border-4 border-white" />
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* CTA Bergabung */}
        <ScrollReveal>
          <div className="bg-[#0F4C3A] rounded-[32px] p-10 md:p-14 mb-16 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>
            <div className="relative z-10 text-center md:text-left">
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-3">Mau bergabung ke Universitas Nurul Huda?</h3>
              <p className="text-white/80 text-[17px] max-w-xl">Jadilah bagian dari generasi unggul berwawasan global bersama kami. Daftar sekarang untuk masa depan yang lebih cerah.</p>
            </div>
            <div className="relative z-10 flex-shrink-0">
              <Button variant="accent" className="bg-[#7FE0B0] text-[#0F4C3A] font-bold px-10 py-4 text-[17px] rounded-xl shadow-xl hover:bg-[#66c698] transition-all hover:scale-105">Bergabung Sekarang</Button>
            </div>
          </div>
        </ScrollReveal>

        {/* Fakultas & Program Studi */}
        <div className="bg-white rounded-[32px] p-8 md:p-14 mb-16 relative overflow-hidden border border-gray-100 shadow-sm">
          {/* Decorative background matching user's image vibe */}
          <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle at 10px 10px, #0F4C3A 1.5px, transparent 0)', backgroundSize: '40px 40px' }}></div>
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#7FE0B0]/20 rounded-full blur-3xl pointer-events-none"></div>
          
          <ScrollReveal>
            <div className="flex items-center gap-3 mb-12 relative z-10">
              <h3 className="text-4xl md:text-5xl font-extrabold text-[#0F4C3A] tracking-tight">FAKULTAS</h3>
              <Sparkles className="w-10 h-10 text-[#0F4C3A]" strokeWidth={1.5} />
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">
            
            {/* Fakultas Agama Islam */}
            <ScrollReveal delay={0.1}>
              <div className="bg-[#F8FAFC] rounded-[24px] p-8 border border-gray-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 h-full">
                <h4 className="text-[22px] font-bold text-[#0F4C3A] mb-5 pb-5 border-b border-gray-200">Fakultas Agama Islam</h4>
                <ul className="space-y-4">
                  {[
                    'Pendidikan Agama Islam', 
                    'Pendidikan Guru Madrasah Ibtidaiyah'
                  ].map(prodi => (
                    <li key={prodi} className="flex items-start gap-3 group">
                      <div className="w-2 h-2 rounded-full bg-[#7FE0B0] mt-2 flex-shrink-0 group-hover:scale-150 transition-transform"></div>
                      <span className="text-gray-700 font-bold text-[16px] leading-snug group-hover:text-[#0F4C3A] transition-colors">{prodi}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>

            {/* Fakultas Pendidikan */}
            <ScrollReveal delay={0.2}>
              <div className="bg-[#F8FAFC] rounded-[24px] p-8 border border-gray-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 h-full">
                <h4 className="text-[22px] font-bold text-[#0F4C3A] mb-5 pb-5 border-b border-gray-200">Fakultas Pendidikan</h4>
                <ul className="space-y-4">
                  {[
                    'Pendidikan Fisika', 
                    'Pendidikan Ekonomi', 
                    'Pendidikan Bahasa Inggris', 
                    'Pendidikan Bahasa dan Sastra Indonesia', 
                    'Pendidikan Teknologi Informasi'
                  ].map(prodi => (
                    <li key={prodi} className="flex items-start gap-3 group">
                      <div className="w-2 h-2 rounded-full bg-[#7FE0B0] mt-2 flex-shrink-0 group-hover:scale-150 transition-transform"></div>
                      <span className="text-gray-700 font-bold text-[16px] leading-snug group-hover:text-[#0F4C3A] transition-colors">{prodi}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>

            {/* Fakultas Sains dan Teknologi */}
            <ScrollReveal delay={0.3}>
              <div className="bg-[#F8FAFC] rounded-[24px] p-8 border border-gray-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 h-full">
                <h4 className="text-[22px] font-bold text-[#0F4C3A] mb-5 pb-5 border-b border-gray-200">Fakultas Sains dan Teknologi</h4>
                <ul className="space-y-4">
                  {[
                    'Informatika', 
                    'Matematika', 
                    'Sains Pertanian'
                  ].map(prodi => (
                    <li key={prodi} className="flex items-start gap-3 group">
                      <div className="w-2 h-2 rounded-full bg-[#7FE0B0] mt-2 flex-shrink-0 group-hover:scale-150 transition-transform"></div>
                      <span className="text-gray-700 font-bold text-[16px] leading-snug group-hover:text-[#0F4C3A] transition-colors">{prodi}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>

          </div>
        </div>

        {/* Pengumuman & Agenda */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-16">
          
          <div className="lg:col-span-2">
            <ScrollReveal>
              <div className="flex justify-between items-end mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Pengumuman Terbaru</h3>
              </div>
            </ScrollReveal>
            
            <div className="flex flex-col gap-4">
              {loading ? (
                <p className="text-gray-500">Memuat pengumuman...</p>
              ) : infoList.length > 0 ? (
                infoList.map((item, idx) => (
                  <ScrollReveal key={item.id_info || item.id || idx} delay={idx * 0.1}>
                    <Link to={`/campus/${item.id_info || item.id}`} className="bg-white border border-gray-100 p-6 rounded-[20px] shadow-sm hover:shadow-md transition-all duration-300 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group block">
                      <div>
                        <div className="flex items-center gap-3 mb-2.5">
                          <span className="bg-[#F8FAFC] text-gray-700 text-[11px] px-3 py-1 rounded-md font-bold border border-gray-100 uppercase tracking-wide">{item.type || item.tipe || 'Informasi'}</span>
                          <span className="text-gray-400 text-[12px] flex items-center gap-1.5 font-medium"><Calendar size={12}/> {item.created_at ? new Date(item.created_at).toLocaleDateString('id-ID') : (item.tanggal || '-')}</span>
                        </div>
                        <h4 className="font-bold text-gray-900 text-[16px] group-hover:text-[#0F4C3A] transition-colors">{item.title || item.judul}</h4>
                      </div>
                      <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-[#0F4C3A] transition-colors flex-shrink-0">
                        <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                      </div>
                    </Link>
                  </ScrollReveal>
                ))
              ) : (
                <p className="text-gray-500">Belum ada pengumuman kampus saat ini.</p>
              )}
            </div>
          </div>
          
          <ScrollReveal delay={0.2} className="lg:col-span-1">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Agenda Kampus</h3>
            <div className="bg-[#F8FAFC] rounded-[24px] p-8 border border-gray-100">
              <div className="relative border-l-2 border-[#7FE0B0] ml-2.5 pl-6 space-y-8 py-2">
                
                <div className="relative">
                  <div className="absolute -left-[31px] bg-white border-[3px] border-[#7FE0B0] w-[14px] h-[14px] rounded-full"></div>
                  <div className="text-[12px] font-bold text-[#0F4C3A] mb-1 uppercase tracking-wider">15 - 20 Nov 2026</div>
                  <div className="font-bold text-gray-900 text-[15px]">Ujian Tengah Semester (UTS)</div>
                </div>
                
                <div className="relative">
                  <div className="absolute -left-[31px] bg-white border-[3px] border-gray-300 w-[14px] h-[14px] rounded-full"></div>
                  <div className="text-[12px] font-bold text-gray-500 mb-1 uppercase tracking-wider">01 Des 2026</div>
                  <div className="font-bold text-gray-900 text-[15px]">Batas Akhir Pembayaran SPP</div>
                </div>

                <div className="relative">
                  <div className="absolute -left-[31px] bg-white border-[3px] border-gray-300 w-[14px] h-[14px] rounded-full"></div>
                  <div className="text-[12px] font-bold text-gray-500 mb-1 uppercase tracking-wider">20 Des 2026</div>
                  <div className="font-bold text-gray-900 text-[15px]">Libur Semester Ganjil</div>
                </div>

                <div className="relative">
                  <div className="absolute -left-[31px] bg-white border-[3px] border-gray-300 w-[14px] h-[14px] rounded-full"></div>
                  <div className="text-[12px] font-bold text-gray-500 mb-1 uppercase tracking-wider">15 Jan 2027</div>
                  <div className="font-bold text-gray-900 text-[15px]">Awal Perkuliahan Genap</div>
                </div>

              </div>
              <Button variant="outline" className="w-full mt-10 rounded-xl bg-white text-gray-700 font-bold border-gray-200">Lihat Kalender Akademik</Button>
            </div>
          </ScrollReveal>

        </div>
      </section>

      <Footer />
    </div>
  );
}
