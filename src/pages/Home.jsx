import React from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Button } from '../components/Button';
import { CardInfo } from '../components/CardInfo';
import { JobListItem } from '../components/JobListItem';
import { ScrollReveal } from '../components/ScrollReveal';
import { BookOpen, Award, Building, Users, Briefcase, GraduationCap, CheckCircle2, Info, ChevronRight, Laptop, FileText, ArrowRight, BookMarked } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Home() {
  return (
    <div className="min-h-screen bg-white font-sans text-gray-800">
      <Navbar />

      {/* 2. Hero Section */}
      <section className="bg-[#0F4C3A] text-white pt-36 pb-28 px-4 sm:px-6 lg:px-8 overflow-hidden relative">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
          <ScrollReveal>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/20 bg-white/10 text-[11px] font-bold mb-8 text-white/90 tracking-widest uppercase">
              <span className="w-2 h-2 rounded-full bg-[#7FE0B0]"></span> RESMI: CAREER CENTER UNUHA
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-[56px] font-bold leading-[1.1] mb-6 tracking-tight">
              <span className="block text-white">Membangun Karir,</span>
              <span className="block text-[#7FE0B0]">Menghubungkan Alumni.</span>
            </h1>
            <p className="text-white/80 text-[17px] mb-10 max-w-lg leading-relaxed">
              Selamat datang di Pusat Pengembangan Karir dan Alumni Universitas Nurul Huda (UNUHA). Kami berkomitmen membantu setiap mahasiswa dan lulusan mencapai potensi karir maksimal mereka melalui jejaring profesional yang kuat.
            </p>
            <div className="flex flex-col sm:flex-row gap-5">
              <Button variant="accent" className="text-base px-8 py-3.5 rounded-xl font-bold shadow-lg shadow-[#7FE0B0]/20 text-[#0F4C3A] bg-[#7FE0B0] hover:bg-[#66c698]">Eksplorasi Karir</Button>
              <Button variant="outlineWhite" className="text-base px-8 py-3.5 rounded-xl font-bold border-2 border-white/30 hover:border-white hover:bg-white/10 text-white">Tentang Kami</Button>
            </div>
          </ScrollReveal>
          
          <ScrollReveal delay={0.2} className="relative h-full min-h-[500px] hidden lg:block">
            <div className="absolute top-0 right-0 w-[95%] h-[550px] rounded-[32px] overflow-hidden shadow-2xl z-10 border-[6px] border-white/10">
              <img src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop" alt="Wisudawan UNUHA" className="w-full h-full object-cover object-top" />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 3. Informasi Kampus */}
      <section id="campus" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#F7F8FA]">
        <div className="max-w-[1200px] mx-auto">
          <ScrollReveal>
            <div className="text-center mb-14">
              <h2 className="text-[32px] font-bold text-gray-900 mb-4">Informasi Kampus</h2>
              <p className="text-gray-500 max-w-2xl mx-auto text-[15px]">Dapatkan kabar terbaru dan profil lengkap Universitas Nurul Huda untuk menunjang wawasan akademik Anda.</p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <ScrollReveal delay={0.1} className="md:row-span-2">
              <CardInfo 
                icon={BookMarked}
                title="Profil Singkat UNUHA" 
                description="Universitas Nurul Huda terus berkembang menjadi pusat keunggulan pendidikan di wilayah Sumatera Selatan dengan mengedepankan nilai-nilai Islami dan kemajuan teknologi."
                image="https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=2086&auto=format&fit=crop"
              />
            </ScrollReveal>
            
            <ScrollReveal delay={0.2}>
              <CardInfo 
                icon={BookOpen}
                title="Kegiatan Akademik" 
                description="Update jadwal perkuliahan, seminar nasional, dan workshop rutin kampus."
              />
            </ScrollReveal>
            
            <ScrollReveal delay={0.3}>
              <CardInfo 
                icon={Award}
                title="Prestasi" 
                description="Capaian membanggakan mahasiswa dan dosen UNUHA di kancah nasional."
              />
            </ScrollReveal>

            <ScrollReveal delay={0.4} className="md:col-span-2">
              <div className="bg-[#0F4C3A] rounded-[24px] p-10 flex flex-col items-start justify-center gap-4 shadow-xl h-full relative overflow-hidden">
                <div className="relative z-10">
                  <h3 className="text-white font-bold text-[22px] mb-3">Informasi Penting</h3>
                  <p className="text-white/80 text-[15px] mb-8 max-w-[400px] leading-relaxed">Akses portal akademik, kalender pendidikan, dan pengumuman rektorat dalam satu pintu.</p>
                  <Link to="/campus">
                    <Button variant="outlineWhite" className="text-[14px] px-6 py-2.5 rounded-xl bg-white text-gray-900 border-none hover:bg-gray-100 font-semibold shadow-sm">Lihat Selengkapnya</Button>
                  </Link>
                </div>
                <div className="absolute -right-10 -bottom-10 text-white/5">
                  <Info size={250} strokeWidth={1} />
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 4. Informasi Karir */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#F4F7FA] border-t border-gray-100">
        <div className="max-w-[1200px] mx-auto">
          <ScrollReveal>
            <div className="flex flex-col sm:flex-row justify-between items-end mb-12 gap-4 border-b border-gray-200 pb-6">
              <div>
                <h2 className="text-[32px] font-bold text-gray-900 mb-2">Informasi Karir</h2>
                <p className="text-gray-500 text-[15px] max-w-lg">Program pengembangan kompetensi dan peluang profesional untuk mengantarkan masa depan gemilang.</p>
              </div>
              <Link to="/jobs" className="text-gray-700 font-semibold hover:text-gray-900 transition-colors flex items-center gap-1.5 text-[15px]">
                Semua Program Karir <ArrowRight size={16} />
              </Link>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Pengembangan Karir", desc: "Konsultasi karir individu dan pemetaan minat bakat untuk alumni.", icon: Users, color: "text-[#A855F7]", bg: "bg-[#F3E8FF]", items: ["Konseling 1-on-1", "Review CV & Portofolio"] },
              { title: "Program Magang", desc: "Kesempatan magang di berbagai perusahaan mitra industri UNUHA.", icon: Briefcase, color: "text-[#10B981]", bg: "bg-[#D1FAE5]", items: ["Magang BUMN", "Magang Startup"] },
              { title: "Pelatihan & Kursus", desc: "Tingkatkan skill digital dan soft skill melalui pelatihan bersertifikat.", icon: Laptop, color: "text-[#14B8A6]", bg: "bg-[#CCFBF1]", items: ["Sertifikasi IT", "Public Speaking"] },
              { title: "Info Pendukung", desc: "Berbagai template dokumen profesional dan tips melamar kerja.", icon: FileText, color: "text-[#6366F1]", bg: "bg-[#E0E7FF]", items: ["Template ATS CV", "Bank Soal Tes"] },
            ].map((card, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="bg-white rounded-[24px] p-7 shadow-sm hover:shadow-md transition-shadow h-full border border-gray-100 flex flex-col">
                  <div className={`${card.bg} ${card.color} w-12 h-12 rounded-xl flex items-center justify-center mb-6`}>
                    <card.icon size={24} />
                  </div>
                  <h3 className="font-bold text-[17px] text-gray-900 mb-3">{card.title}</h3>
                  <p className="text-gray-500 text-[14px] mb-6 leading-relaxed flex-grow">{card.desc}</p>
                  <ul className="space-y-3 pt-6">
                    {card.items.map((item, j) => (
                      <li key={j} className="flex items-center gap-2.5 text-gray-500 text-[13px]">
                        <CheckCircle2 size={16} className="text-gray-300 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Berita Kampus */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-[1200px] mx-auto">
        <ScrollReveal>
          <div className="text-center mb-14">
            <h2 className="text-[32px] font-bold text-gray-900 mb-3 relative inline-block">
              Berita Kampus
              <div className="absolute -bottom-3 left-[10%] right-[10%] h-[4px] bg-[#111827] rounded-full"></div>
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { img: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2070&auto=format&fit=crop", badge: "Akademik", date: "24 Okt 2026", title: "Pelepasan Alumni Gelombang II Tahun 2026 Berlangsung Khidmat", desc: "Rektor UNUHA secara resmi melepas 850 wisudawan dalam acara yang digelar di Gedung Serbaguna Kampus Pusat." },
            { img: "https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=2069&auto=format&fit=crop", badge: "Karir", date: "20 Okt 2026", title: "UNUHA Career Days: Hadirkan 20 Perusahaan Nasional untuk Alumni", desc: "Ribuan alumni dan mahasiswa tingkat akhir memadati area bursa kerja UNUHA Career Days yang diadakan selama dua hari." },
            { img: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070&auto=format&fit=crop", badge: "Prestasi", date: "15 Okt 2026", title: "Dosen Fakultas Teknik UNUHA Raih Penghargaan Peneliti Terbaik", desc: "Inovasi di bidang energi terbarukan membawa dosen UNUHA meraih medali emas dalam simposium di Singapura." }
          ].map((news, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <div className="bg-white rounded-[24px] overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-shadow group flex flex-col h-full">
                <div className="relative h-56 overflow-hidden">
                  <img src={news.img} alt={news.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-4 left-4 bg-[#0F4C3A] text-white text-[11px] font-bold px-3 py-1.5 rounded-lg tracking-wider">
                    {news.badge}
                  </div>
                </div>
                <div className="p-7 flex flex-col flex-grow">
                  <span className="text-[13px] text-gray-400 mb-2 block">{news.date}</span>
                  <h3 className="font-bold text-[18px] text-gray-900 mb-3 leading-snug">{news.title}</h3>
                  <p className="text-[14px] text-gray-500 mb-6 line-clamp-3 leading-relaxed">{news.desc}</p>
                  <a href="#" className="inline-flex items-center text-gray-900 font-bold hover:text-[#0F4C3A] transition-colors mt-auto text-[14px]">
                    Baca Selengkapnya <ArrowRight className="w-4 h-4 ml-1.5 text-gray-400" />
                  </a>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* 6. Stats Bar */}
      <section className="bg-[#0F4C3A] py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left relative">
          <div className="hidden md:block absolute left-1/3 top-0 bottom-0 w-px bg-white/10"></div>
          <div className="hidden md:block absolute left-2/3 top-0 bottom-0 w-px bg-white/10"></div>
          
          {[
            { num: "12,450+", label: "TOTAL ALUMNI", icon: Users },
            { num: "8", label: "TOTAL FAKULTAS", icon: Building },
            { num: "156", label: "LOWONGAN AKTIF", icon: Briefcase }
          ].map((stat, i) => (
            <ScrollReveal key={i} delay={i * 0.1} className="flex items-center justify-center md:justify-start gap-6 px-4">
              <stat.icon className="w-12 h-12 text-white/50 flex-shrink-0" />
              <div>
                <div className="text-[40px] font-bold text-white leading-none mb-1">{stat.num}</div>
                <div className="text-[12px] font-bold text-[#7FE0B0] tracking-[0.2em]">{stat.label}</div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* 7. Lowongan Kerja Terbaru */}
      <section id="jobs" className="py-24 px-4 sm:px-6 lg:px-8 max-w-[1200px] mx-auto">
        <ScrollReveal>
          <div className="flex flex-col sm:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <h2 className="text-[32px] font-bold text-gray-900 mb-2">Lowongan Kerja Terbaru</h2>
              <p className="text-gray-500 text-[15px]">Temukan peluang karir yang sesuai dengan kompetensi Anda.</p>
            </div>
            <div className="flex gap-3 w-full sm:w-auto">
              <Button variant="outline" className="flex-1 sm:flex-none text-[14px] px-6 py-2.5 rounded-xl border-gray-200 text-gray-600 bg-white shadow-sm font-semibold">Filter</Button>
              <Link to="/jobs" className="flex-1 sm:flex-none">
                <Button variant="primary" className="w-full text-[14px] px-6 py-2.5 rounded-xl shadow-sm bg-[#0F4C3A] hover:bg-[#0a3629] font-semibold text-white">Cari Kerja</Button>
              </Link>
            </div>
          </div>
        </ScrollReveal>

        <div className="flex flex-col gap-4">
          <ScrollReveal delay={0.1}>
            <JobListItem 
              position="Senior Software Engineer" 
              company="PT. Teknologi Maju Bersama" 
              location="Jakarta Selatan" 
              deadline="20 Nov 2026"
            />
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <JobListItem 
              position="Management Trainee" 
              company="Bank Mandiri (Persero) Tbk" 
              location="Palembang" 
              deadline="15 Nov 2026"
            />
          </ScrollReveal>
          <ScrollReveal delay={0.3}>
            <JobListItem 
              position="Tenaga Pengajar (Dosen)" 
              company="Yayasan Nurul Huda" 
              location="OKU Timur" 
              deadline="10 Nov 2026"
            />
          </ScrollReveal>
        </div>
      </section>

      {/* 8. CTA Banner */}
      <section className="pb-24 px-4 sm:px-6 lg:px-8 max-w-[1200px] mx-auto">
        <ScrollReveal>
          <div className="bg-[#0F4C3A] rounded-[32px] p-12 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left relative overflow-hidden shadow-2xl">
            <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
            
            <div className="relative z-10">
              <h2 className="text-[32px] font-bold text-white mb-4">Belum terdaftar di Portal Alumni?</h2>
              <p className="text-white/80 text-[16px] max-w-[600px] leading-relaxed">Bergabunglah dengan ribuan alumni lainnya. Dapatkan akses eksklusif ke lowongan kerja, jejaring profesional, dan informasi terbaru dari almamater tercinta.</p>
            </div>
            
            <div className="relative z-10 flex-shrink-0">
              <Button variant="accent" className="text-[16px] px-8 py-4 rounded-xl shadow-lg shadow-[#7FE0B0]/20 bg-[#7FE0B0] hover:bg-[#66c698] font-bold text-[#0F4C3A]">Daftar Sekarang</Button>
            </div>
          </div>
        </ScrollReveal>
      </section>

      <Footer />
    </div>
  );
}
