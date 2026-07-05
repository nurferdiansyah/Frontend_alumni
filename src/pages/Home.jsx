import React from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Button } from '../components/Button';
import { CardInfo } from '../components/CardInfo';
import { JobListItem } from '../components/JobListItem';
import { ScrollReveal } from '../components/ScrollReveal';
import { BookOpen, Award, Building, Users, Briefcase, GraduationCap, CheckCircle2, Info, ChevronRight, Laptop, FileText, ArrowRight } from 'lucide-react';

export function Home() {
  return (
    <div className="min-h-screen bg-[#F7F8FA] font-sans">
      <Navbar />

      {/* 2. Hero Section */}
      <section className="bg-[#0F4C3A] text-white pt-32 pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
          <ScrollReveal>
            <div className="inline-block px-4 py-1.5 rounded-full border border-white/20 bg-white/10 text-xs font-semibold tracking-wider mb-6">
              RESMI: CAREER CENTER UNUHA
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              <span className="block text-white">Membangun Karir,</span>
              <span className="block text-[#7FE0B0]">Menghubungkan Alumni.</span>
            </h1>
            <p className="text-gray-300 text-lg mb-8 max-w-lg">
              Pusat karir dan jejaring alumni Universitas Nurul Huda. Temukan peluang baru dan tingkatkan potensi karir Anda bersama kami.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="accent" className="text-lg px-8 py-3">Eksplorasi Karir</Button>
              <Button variant="outlineWhite" className="text-lg px-8 py-3">Tentang Kami</Button>
            </div>
          </ScrollReveal>
          
          <ScrollReveal delay={0.2} className="relative">
            <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl relative z-10 border-4 border-white/10">
              <img src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop" alt="Wisudawan UNUHA" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-[#7FE0B0] rounded-full blur-3xl opacity-30 z-0"></div>
            <div className="absolute -top-8 -right-8 w-40 h-40 bg-white rounded-full blur-3xl opacity-10 z-0"></div>
          </ScrollReveal>
        </div>
      </section>

      {/* 3. Informasi Kampus */}
      <section id="campus" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Informasi Kampus</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Mengenal lebih dekat seputar kegiatan akademik dan pencapaian Universitas Nurul Huda.</p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          <ScrollReveal delay={0.1} className="lg:col-span-2">
            <CardInfo 
              title="Profil Singkat UNUHA" 
              description="Universitas Nurul Huda berkomitmen mencetak generasi unggul, berakhlak mulia, dan siap bersaing di era digital."
              image="https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=2086&auto=format&fit=crop"
              isLarge={true}
            />
          </ScrollReveal>
          <ScrollReveal delay={0.2} className="flex flex-col gap-6">
            <CardInfo 
              icon={BookOpen}
              title="Kegiatan Akademik" 
              description="Berbagai seminar, workshop, dan konferensi nasional maupun internasional."
            />
            <CardInfo 
              icon={Award}
              title="Prestasi" 
              description="Ragam pencapaian mahasiswa dan dosen di tingkat nasional."
            />
          </ScrollReveal>
        </div>
        
        <ScrollReveal delay={0.3}>
          <div className="bg-[#0F4C3A] rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg">
            <div className="flex items-center gap-4">
              <div className="bg-white/10 p-3 rounded-xl text-[#7FE0B0]">
                <Info size={32} />
              </div>
              <div>
                <h3 className="text-white font-bold text-xl mb-1">Informasi Penting</h3>
                <p className="text-gray-300">Pendaftaran Wisuda Gelombang II Tahun 2026 telah dibuka.</p>
              </div>
            </div>
            <Button variant="accent" className="flex-shrink-0 whitespace-nowrap">Lihat Selengkapnya</Button>
          </div>
        </ScrollReveal>
      </section>

      {/* 4. Informasi Karir */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="flex flex-col sm:flex-row justify-between items-end mb-12 gap-4">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Informasi Karir</h2>
                <p className="text-gray-600 max-w-xl">Berbagai program untuk mempersiapkan alumni dan mahasiswa tingkat akhir memasuki dunia kerja.</p>
              </div>
              <a href="#" className="text-[#0F4C3A] font-medium hover:text-[#7FE0B0] transition-colors flex items-center gap-1">
                Semua Program Karir <ChevronRight size={16} />
              </a>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Pengembangan Karir", icon: Users, color: "text-purple-600", bg: "bg-purple-50", items: ["Konseling 1-on-1", "Review CV & Portofolio"] },
              { title: "Program Magang", icon: Briefcase, color: "text-green-600", bg: "bg-green-50", items: ["Magang BUMN", "Magang Startup"] },
              { title: "Pelatihan & Kursus", icon: Laptop, color: "text-blue-600", bg: "bg-blue-50", items: ["Sertifikasi IT", "Public Speaking"] },
              { title: "Info Pendukung", icon: FileText, color: "text-orange-600", bg: "bg-orange-50", items: ["Template ATS CV", "Bank Soal Tes"] },
            ].map((card, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow h-full">
                  <div className={`${card.bg} ${card.color} w-12 h-12 rounded-xl flex items-center justify-center mb-6`}>
                    <card.icon size={24} />
                  </div>
                  <h3 className="font-bold text-lg text-gray-900 mb-4">{card.title}</h3>
                  <ul className="space-y-3">
                    {card.items.map((item, j) => (
                      <li key={j} className="flex items-start gap-2 text-gray-600 text-sm">
                        <CheckCircle2 size={16} className="text-[#7FE0B0] mt-0.5 flex-shrink-0" />
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
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-2 relative inline-block">
              Berita Kampus
              <div className="absolute -bottom-2 left-1/4 right-1/4 h-1 bg-[#7FE0B0] rounded-full"></div>
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { img: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2070&auto=format&fit=crop", badge: "Akademik", date: "24 Okt 2026", title: "Kuliah Umum Inovasi Teknologi Masa Depan" },
            { img: "https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=2069&auto=format&fit=crop", badge: "Karir", date: "20 Okt 2026", title: "Job Fair UNUHA 2026 Dihadiri 50+ Perusahaan" },
            { img: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070&auto=format&fit=crop", badge: "Prestasi", date: "15 Okt 2026", title: "Tim Robotik UNUHA Raih Juara 1 Nasional" }
          ].map((news, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow group flex flex-col h-full">
                <div className="relative h-48 overflow-hidden">
                  <img src={news.img} alt={news.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur text-[#0F4C3A] text-xs font-bold px-3 py-1 rounded-full">
                    {news.badge}
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <span className="text-sm text-gray-500 mb-2 block">{news.date}</span>
                  <h3 className="font-bold text-lg text-gray-900 mb-4 flex-grow leading-snug">{news.title}</h3>
                  <a href="#" className="inline-flex items-center text-[#0F4C3A] font-medium hover:text-[#7FE0B0] transition-colors mt-auto text-sm">
                    Baca Selengkapnya <ArrowRight className="w-4 h-4 ml-1" />
                  </a>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* 6. Stats Bar */}
      <section className="bg-[#0F4C3A] py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-white/20">
          {[
            { num: "12.450+", label: "Total Alumni", icon: Users },
            { num: "8", label: "Total Fakultas", icon: Building },
            { num: "156", label: "Lowongan Aktif", icon: Briefcase }
          ].map((stat, i) => (
            <ScrollReveal key={i} delay={i * 0.1} className="pt-8 md:pt-0 flex flex-col items-center justify-center">
              <stat.icon className="w-10 h-10 text-[#7FE0B0] mb-4" />
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">{stat.num}</div>
              <div className="text-gray-300 font-medium">{stat.label}</div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* 7. Lowongan Kerja Terbaru */}
      <section id="jobs" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="flex flex-col sm:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Lowongan Kerja Terbaru</h2>
              <p className="text-gray-600">Peluang karir terbaik dari mitra perusahaan kami.</p>
            </div>
            <div className="flex gap-4 w-full sm:w-auto">
              <Button variant="outline" className="flex-1 sm:flex-none">Filter</Button>
              <Button variant="primary" className="flex-1 sm:flex-none">Cari Kerja</Button>
            </div>
          </div>
        </ScrollReveal>

        <div className="flex flex-col gap-4">
          <ScrollReveal delay={0.1}>
            <JobListItem 
              position="Frontend Developer" 
              company="TechCorp Indonesia" 
              location="Jakarta Selatan" 
              deadline="12 Nov 2026"
            />
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <JobListItem 
              position="Management Trainee" 
              company="Bank Syariah Makmur" 
              location="Palembang" 
              deadline="15 Nov 2026"
            />
          </ScrollReveal>
          <ScrollReveal delay={0.3}>
            <JobListItem 
              position="Data Analyst" 
              company="Gojek" 
              location="Remote" 
              deadline="20 Nov 2026"
              logo="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Gojek_logo_2019.svg/1200px-Gojek_logo_2019.svg.png"
            />
          </ScrollReveal>
        </div>
      </section>

      {/* 8. CTA Banner */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-12">
        <ScrollReveal>
          <div className="bg-[#0F4C3A] rounded-3xl p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left relative overflow-hidden shadow-xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
            
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Belum terdaftar di Portal Alumni?</h2>
              <p className="text-gray-300 text-lg max-w-xl">Dapatkan akses ke ratusan lowongan kerja eksklusif, koneksi dengan sesama alumni, dan informasi kampus terbaru.</p>
            </div>
            
            <div className="relative z-10 flex-shrink-0">
              <Button variant="accent" className="text-lg px-8 py-4 shadow-lg shadow-[#7FE0B0]/20">Daftar Sekarang</Button>
            </div>
          </div>
        </ScrollReveal>
      </section>

      <Footer />
    </div>
  );
}
