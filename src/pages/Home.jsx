import React, { useState, useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Button } from '../components/Button';
import { CardInfo } from '../components/CardInfo';
import { JobListItem } from '../components/JobListItem';
import { ScrollReveal } from '../components/ScrollReveal';
import { BookOpen, Award, Building, Users, Briefcase, GraduationCap, CheckCircle2, Info, ChevronRight, Laptop, FileText, ArrowRight, BookMarked } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Home() {
  const heroImages = [
    "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=2069&auto=format&fit=crop"
  ];
  
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 4000); // geser otomatis setiap 4 detik
    return () => clearInterval(timer);
  }, []);

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
              <Link to="/jobs">
                <Button variant="accent" className="w-full sm:w-auto text-base px-8 py-3.5 rounded-xl font-bold shadow-lg shadow-[#7FE0B0]/20 text-[#0F4C3A] bg-[#7FE0B0] hover:bg-[#66c698]">Eksplorasi Karir</Button>
              </Link>
              <Link to="/visi-misi">
                <Button variant="outlineWhite" className="w-full sm:w-auto text-base px-8 py-3.5 rounded-xl font-bold border-2 border-white/30 hover:border-[#7FE0B0] hover:bg-[#7FE0B0] hover:text-[#0F4C3A] text-white">Tentang Kami</Button>
              </Link>
            </div>
          </ScrollReveal>
          
          <ScrollReveal delay={0.2} className="relative h-full min-h-[500px] hidden lg:block">
            <div className="absolute top-0 right-0 w-[95%] h-[550px] rounded-[32px] overflow-hidden shadow-2xl z-10 border-[6px] border-white/10 group">
              {heroImages.map((img, idx) => (
                <img 
                  key={idx}
                  src={img} 
                  alt={`Hero ${idx + 1}`} 
                  className={`absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-1000 ${currentImageIndex === idx ? 'opacity-100 z-10' : 'opacity-0 z-0'}`} 
                />
              ))}
              
              {/* Indikator Titik (Pagination Dots) */}
              <div className="absolute bottom-6 left-0 right-0 z-20 flex justify-center gap-2">
                {heroImages.map((_, idx) => (
                  <button 
                    key={idx} 
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`h-2.5 rounded-full transition-all duration-300 ${currentImageIndex === idx ? 'bg-[#7FE0B0] w-8' : 'bg-white/60 hover:bg-white w-2.5'}`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 3. Informasi Kampus */}
      <section id="campus" className="py-20 px-6 md:px-12 lg:px-16 bg-[#F7F8FA]">
        <div className="w-full max-w-[1150px] mx-auto">
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
      <section className="py-20 px-6 md:px-12 lg:px-16 bg-[#F4F7FA] border-t border-gray-100 relative overflow-hidden">
        {/* Decorative background element */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#7FE0B0]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none"></div>

        <div className="w-full max-w-[1150px] mx-auto relative z-10">
          <ScrollReveal>
            <div className="flex flex-col sm:flex-row justify-between items-end mb-10 gap-4 border-b-2 border-gray-200/60 pb-6">
              <div>
                <h2 className="text-4xl md:text-[42px] font-extrabold text-gray-900 mb-3 tracking-tight">Informasi Karir</h2>
                <p className="text-gray-500 text-[16px] max-w-xl leading-relaxed">Program pengembangan kompetensi dan peluang profesional untuk mengantarkan masa depan gemilang.</p>
              </div>
              <Link to="/jobs" className="group flex items-center gap-2 px-6 py-2.5 bg-white rounded-full border border-gray-200 text-gray-800 font-bold hover:border-[#0F4C3A] hover:text-[#0F4C3A] transition-all duration-300 shadow-sm hover:shadow-md mb-2">
                Semua Program <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Pengembangan Karir", desc: "Konsultasi karir individu dan pemetaan minat bakat.", icon: Users, accent: "bg-[#0F4C3A]", textAccent: "text-[#0F4C3A]", border: "border-t-[5px] border-[#0F4C3A]", items: ["Konseling 1-on-1", "Review CV & Portofolio"] },
              { title: "Program Magang", desc: "Kesempatan magang di berbagai perusahaan mitra industri.", icon: Briefcase, accent: "bg-[#18755C]", textAccent: "text-[#18755C]", border: "border-t-[5px] border-[#18755C]", items: ["Magang BUMN", "Magang Startup"] },
              { title: "Pelatihan & Kursus", desc: "Tingkatkan skill digital melalui pelatihan bersertifikat.", icon: Laptop, accent: "bg-[#209C7A]", textAccent: "text-[#209C7A]", border: "border-t-[5px] border-[#209C7A]", items: ["Sertifikasi IT", "Public Speaking"] },
              { title: "Info Pendukung", desc: "Berbagai template dokumen profesional untuk melamar kerja.", icon: FileText, accent: "bg-[#29C49A]", textAccent: "text-[#29C49A]", border: "border-t-[5px] border-[#29C49A]", items: ["Template ATS CV", "Bank Soal Tes"] },
            ].map((card, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className={`bg-white rounded-b-[24px] rounded-t-sm p-7 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 h-full border-x border-b border-gray-100 flex flex-col group relative overflow-hidden ${card.border}`}>
                  {/* Decorative subtle background icon */}
                  <card.icon size={110} className={`absolute -bottom-6 -right-6 opacity-[0.03] ${card.textAccent} group-hover:scale-110 group-hover:opacity-[0.05] transition-all duration-500 pointer-events-none`} />
                  
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 ${card.accent} text-white shadow-md group-hover:scale-110 group-hover:rotate-3 origin-center`}>
                    <card.icon size={26} />
                  </div>
                  <h3 className="font-extrabold text-[18px] text-gray-900 mb-3 group-hover:text-[#0F4C3A] transition-colors relative z-10">{card.title}</h3>
                  <p className="text-gray-500 text-[14px] mb-6 leading-relaxed flex-grow relative z-10">{card.desc}</p>
                  <ul className="space-y-3 pt-5 border-t border-gray-100/80 relative z-10">
                    {card.items.map((item, j) => (
                      <li key={j} className="flex items-center gap-3 text-gray-600 text-[13px] font-medium group/item">
                        <span className={`w-6 h-6 rounded-full flex items-center justify-center ${card.accent} bg-opacity-10 ${card.textAccent} group-hover/item:scale-110 group-hover/item:bg-opacity-20 transition-all duration-300`}>
                          <CheckCircle2 size={13} strokeWidth={3} />
                        </span>
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
      <section className="py-20 px-6 md:px-12 lg:px-16 w-full">
        <div className="w-full max-w-[1150px] mx-auto">
          <ScrollReveal>
            <div className="flex flex-col sm:flex-row justify-between items-center sm:items-end mb-14 gap-6">
              <div className="flex-1 hidden sm:block"></div>
              <h2 className="text-[32px] font-bold text-gray-900 mb-3 sm:mb-0 relative inline-block text-center flex-shrink-0">
                Berita Kampus
                <div className="absolute -bottom-3 left-[10%] right-[10%] h-[4px] bg-[#111827] rounded-full"></div>
              </h2>
              <div className="flex-1 flex sm:justify-end">
                <Link to="/berita" className="inline-flex items-center gap-2 bg-white text-[#0F4C3A] font-bold text-[15px] px-7 py-3 rounded-full shadow-[0_4px_14px_rgba(0,0,0,0.05)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.1)] transition-all hover:-translate-y-0.5 border border-gray-100 group">
                  Lihat Semua Berita 
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { id: 1, img: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2070&auto=format&fit=crop", badge: "Akademik", date: "24 Okt 2026", title: "Pelepasan Alumni Gelombang II Tahun 2026 Berlangsung Khidmat", desc: "Rektor UNUHA secara resmi melepas 850 wisudawan dalam acara yang digelar di Gedung Serbaguna Kampus Pusat." },
            { id: 2, img: "https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=2069&auto=format&fit=crop", badge: "Karir", date: "20 Okt 2026", title: "UNUHA Career Days: Hadirkan 20 Perusahaan Nasional untuk Alumni", desc: "Ribuan alumni dan mahasiswa tingkat akhir memadati area bursa kerja UNUHA Career Days yang diadakan selama dua hari." },
            { id: 3, img: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070&auto=format&fit=crop", badge: "Prestasi", date: "15 Okt 2026", title: "Dosen Fakultas Teknik UNUHA Raih Penghargaan Peneliti Terbaik", desc: "Inovasi di bidang energi terbarukan membawa dosen UNUHA meraih medali emas dalam simposium di Singapura." }
          ].map((news, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <Link to={`/berita/${news.id}`} className="bg-white rounded-[24px] overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-shadow group flex flex-col h-full block">
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
                  <div className="inline-flex items-center text-gray-900 font-bold group-hover:text-[#0F4C3A] transition-colors mt-auto text-[14px]">
                    Baca Selengkapnya <ArrowRight className="w-4 h-4 ml-1.5 text-gray-400" />
                  </div>
                </div>
              </Link>
            </ScrollReveal>
          ))}
          </div>
        </div>
      </section>

      {/* 6. Stats Bar */}
      <section className="pb-20 px-6 md:px-12 lg:px-16 w-full max-w-[1150px] mx-auto">
        <div className="bg-[#0F4C3A] rounded-[32px] py-12 px-8 shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left relative z-10">
            <div className="hidden md:block absolute left-1/3 top-2 bottom-2 w-px bg-white/10"></div>
            <div className="hidden md:block absolute left-2/3 top-2 bottom-2 w-px bg-white/10"></div>
            
            {[
              { num: "12,450+", label: "TOTAL ALUMNI", icon: Users },
              { num: "3", label: "TOTAL FAKULTAS", icon: Building },
              { num: "156", label: "LOWONGAN AKTIF", icon: Briefcase }
            ].map((stat, i) => (
              <ScrollReveal key={i} delay={i * 0.1} className="flex flex-col items-center justify-center gap-3 px-4 text-center">
                <stat.icon className="w-[48px] h-[48px] text-white/50" strokeWidth={1.5} />
                <div className="flex flex-col gap-1.5">
                  <div className="text-[12px] font-bold text-[#7FE0B0] tracking-[0.2em] uppercase">{stat.label}</div>
                  <div className="text-[46px] font-extrabold text-white leading-none">{stat.num}</div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Lowongan Kerja Terbaru */}
      <section id="jobs" className="py-20 px-6 md:px-12 lg:px-16 w-full max-w-[1150px] mx-auto">
        <ScrollReveal>
          <div className="flex flex-col sm:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <h2 className="text-[32px] font-bold text-gray-900 mb-2">Lowongan Kerja Terbaru</h2>
              <p className="text-gray-500 text-[15px]">Temukan peluang karir yang sesuai dengan kompetensi Anda.</p>
            </div>
            <div className="w-full sm:w-auto mt-4 sm:mt-0">
              <Link to="/jobs" className="block w-full sm:inline-block">
                <Button variant="primary" className="w-full text-[15px] px-8 py-3 rounded-xl shadow-md bg-[#0F4C3A] hover:bg-[#0a3629] font-bold text-white transition-all hover:-translate-y-0.5">Cari Kerja</Button>
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
      <section className="pb-20 px-6 md:px-12 lg:px-16 w-full max-w-[1150px] mx-auto">
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
