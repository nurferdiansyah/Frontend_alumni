import React from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Button } from '../components/Button';
import { BookMarked, Calendar, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Campus() {
  return (
    <div className="min-h-screen bg-white font-sans text-gray-800 flex flex-col">
      <Navbar />

      {/* Header */}
      <section className="bg-[#0F4C3A] text-white pt-36 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1200px] mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Informasi Kampus UNUHA</h1>
          <p className="text-white/80 text-[16px] max-w-2xl mx-auto leading-relaxed">Pusat informasi akademik, berita terkini, dan pengumuman resmi dari Universitas Nurul Huda untuk seluruh civitas akademika dan alumni.</p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-[1200px] mx-auto flex-grow w-full">
        
        {/* Tentang Kampus */}
        <div className="mb-24">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="w-full lg:w-1/2">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F3F4F6] text-[#0F4C3A] text-[11px] font-bold mb-6 tracking-widest uppercase">
                <BookMarked size={14} /> TENTANG KAMPUS
              </div>
              <h2 className="text-3xl lg:text-[36px] font-bold text-gray-900 mb-6 leading-tight">Mencetak Generasi Unggul Berwawasan Global</h2>
              <p className="text-gray-500 mb-6 leading-relaxed text-[15px]">Universitas Nurul Huda (UNUHA) adalah perguruan tinggi yang memadukan nilai-nilai keislaman dengan kemajuan ilmu pengetahuan dan teknologi. Kami berkomitmen penuh untuk menjadi pusat keunggulan pendidikan yang inovatif di wilayah Sumatera Selatan.</p>
              
              <div className="grid grid-cols-2 gap-8 mt-10">
                <div className="flex flex-col gap-1">
                  <span className="text-4xl font-bold text-[#0F4C3A]">8</span>
                  <span className="text-sm font-bold text-[#7FE0B0] tracking-wider uppercase">Fakultas</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-4xl font-bold text-[#0F4C3A]">24+</span>
                  <span className="text-sm font-bold text-[#7FE0B0] tracking-wider uppercase">Program Studi</span>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/2">
              <div className="relative">
                <div className="absolute inset-0 bg-[#0F4C3A] rounded-[32px] translate-x-4 translate-y-4"></div>
                <img src="https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=2086&auto=format&fit=crop" alt="Kampus UNUHA" className="relative w-full h-[400px] object-cover rounded-[32px] shadow-xl border-4 border-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Pengumuman & Agenda */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-16">
          
          <div className="lg:col-span-2">
            <div className="flex justify-between items-end mb-6">
              <h3 className="text-2xl font-bold text-gray-900">Pengumuman Terbaru</h3>
              <a href="#" className="text-gray-600 font-semibold hover:text-[#0F4C3A] transition-colors flex items-center gap-1 text-[14px]">
                Lihat Semua <ArrowRight size={14} />
              </a>
            </div>
            
            <div className="flex flex-col gap-4">
              {[
                { title: "Jadwal Pelaksanaan Wisuda Gelombang III Tahun 2026", date: "12 Nov 2026", type: "Akademik" },
                { title: "Penerimaan Mahasiswa Baru Jalur Beasiswa Prestasi Dibuka", date: "05 Nov 2026", type: "Pendaftaran" },
                { title: "Seminar Nasional Teknologi Informasi dan Komunikasi (SNTIK)", date: "28 Okt 2026", type: "Event" },
                { title: "Perpanjangan Masa Pengisian Kartu Rencana Studi (KRS)", date: "20 Okt 2026", type: "Akademik" }
              ].map((item, idx) => (
                <div key={idx} className="bg-white border border-gray-100 p-6 rounded-[20px] shadow-sm hover:shadow-md transition-all duration-300 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer group">
                  <div>
                    <div className="flex items-center gap-3 mb-2.5">
                      <span className="bg-[#F8FAFC] text-gray-700 text-[11px] px-3 py-1 rounded-md font-bold border border-gray-100 uppercase tracking-wide">{item.type}</span>
                      <span className="text-gray-400 text-[12px] flex items-center gap-1.5 font-medium"><Calendar size={12}/> {item.date}</span>
                    </div>
                    <h4 className="font-bold text-gray-900 text-[16px] group-hover:text-[#0F4C3A] transition-colors">{item.title}</h4>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-[#0F4C3A] transition-colors flex-shrink-0">
                    <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="lg:col-span-1">
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
          </div>

        </div>
      </section>

      <Footer />
    </div>
  );
}
