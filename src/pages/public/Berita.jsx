import React from 'react';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { ScrollReveal } from '../../components/ScrollReveal';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowRight, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Berita() {
  const newsCategories = ["Semua", "Akademik", "Kemahasiswaan", "Prestasi", "Penelitian", "Pengabdian"];

  const newsList = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2070&auto=format&fit=crop",
      category: "Akademik",
      title: "Universitas Nurul Huda Gelar Sidang Senat Terbuka Wisuda Sarjana Angkatan V",
      excerpt: "Ratusan mahasiswa dari berbagai program studi resmi dilepas dalam acara wisuda yang berlangsung khidmat di aula utama kampus.",
      date: "15 Okt 2026",
      author: "Humas UNUHA",
      featured: true
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop",
      category: "Prestasi",
      title: "Mahasiswa FST Raih Juara 1 Kompetisi Robotik Nasional 2026",
      excerpt: "Tim robotik Universitas Nurul Huda berhasil mengharumkan nama almamater dengan menyisihkan puluhan universitas ternama lainnya.",
      date: "02 Okt 2026",
      author: "BEM FST",
      featured: false
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2070&auto=format&fit=crop",
      category: "Penelitian",
      title: "Dosen Prodi Pendidikan Ekonomi Publikasikan Jurnal Internasional Scopus Q1",
      excerpt: "Penelitian kolaboratif tentang dampak digitalisasi ekonomi bagi UMKM pedesaan berhasil tembus jurnal internasional bergengsi.",
      date: "28 Sep 2026",
      author: "LPPM UNUHA",
      featured: false
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop",
      category: "Pengabdian",
      title: "KKN Tematik Mahasiswa UNUHA Sukses Berdayakan 15 Desa Binaan",
      excerpt: "Program kerja berfokus pada pengembangan ekonomi kreatif dan literasi digital di masyarakat mendapat apresiasi dari pemerintah daerah.",
      date: "15 Sep 2026",
      author: "Humas UNUHA",
      featured: false
    },
    {
      id: 5,
      image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070&auto=format&fit=crop",
      category: "Kemahasiswaan",
      title: "Pembukaan Pekan Olahraga dan Seni (PORSENI) Mahasiswa 2026",
      excerpt: "Ribuan mahasiswa antusias mengikuti berbagai perlombaan dalam ajang tahunan yang bertujuan mengasah bakat dan sportivitas.",
      date: "10 Sep 2026",
      author: "UKM Olahraga",
      featured: false
    },
    {
      id: 6,
      image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=2070&auto=format&fit=crop",
      category: "Akademik",
      title: "Tingkatkan Kualitas Pembelajaran, Dosen Ikuti Workshop Kurikulum Berbasis OBE",
      excerpt: "Langkah konkret universitas dalam menjamin mutu pendidikan yang berorientasi pada pencapaian luaran lulusan (Outcome-Based Education).",
      date: "05 Sep 2026",
      author: "Biro Akademik",
      featured: false
    }
  ];

  return (
    <div className="min-h-screen bg-[#F4F7FA] font-sans text-gray-800 flex flex-col">
      <Navbar />

      {/* Header Section */}
      <section className="bg-[#0F4C3A] text-white pt-36 pb-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#7FE0B0]/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#0F4C3A]/50 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3 pointer-events-none border-[20px] border-[#7FE0B0]/10"></div>
        
        <div className="max-w-[1200px] mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/20 bg-white/10 text-[12px] font-bold mb-6 text-[#7FE0B0] tracking-widest uppercase">
              PORTAL INFORMASI
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 tracking-tight leading-tight text-white">
              Berita Seputar <span className="text-[#7FE0B0]">Kampus</span>
            </h1>
            <p className="text-white/80 text-[18px] max-w-2xl mx-auto leading-relaxed">
              Dapatkan informasi terkini, artikel inspiratif, dan pengumuman terbaru seputar kegiatan Universitas Nurul Huda.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="pb-24 px-6 md:px-12 lg:px-16 flex-grow w-full max-w-[1200px] mx-auto -mt-10 relative z-20">
        
        <ScrollReveal>
          <div className="bg-white rounded-[24px] p-4 shadow-xl shadow-gray-200/50 flex flex-wrap items-center gap-2 mb-12">
            {newsCategories.map((cat, idx) => (
              <button 
                key={idx} 
                className={`px-6 py-2.5 rounded-[16px] text-[15px] font-bold transition-all duration-300 ${idx === 0 ? 'bg-[#0F4C3A] text-white shadow-md' : 'bg-transparent text-gray-500 hover:bg-gray-100 hover:text-gray-900'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Featured News */}
        {newsList.filter(n => n.featured).map((news, idx) => (
          <ScrollReveal key={`featured-${news.id}`}>
            <Link to={`/berita/${news.id}`} className="bg-white rounded-[32px] overflow-hidden shadow-xl shadow-gray-200/40 border border-gray-100 flex flex-col lg:flex-row group mb-12 block hover:shadow-2xl transition-all duration-500">
              <div className="w-full lg:w-1/2 relative overflow-hidden h-[300px] lg:h-auto">
                <div className="absolute inset-0 bg-[#0F4C3A]/20 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
                <img 
                  src={news.image} 
                  alt={news.title} 
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" 
                />
                <div className="absolute top-6 left-6 z-20 bg-[#7FE0B0] text-[#0F4C3A] font-bold text-[12px] uppercase tracking-wider px-4 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg">
                  <TrendingUp size={14} /> KABAR UTAMA
                </div>
              </div>
              <div className="w-full lg:w-1/2 p-8 lg:p-14 flex flex-col justify-center">
                <span className="text-[#0F4C3A] font-bold text-[13px] uppercase tracking-widest mb-4 inline-block">{news.category}</span>
                <h2 className="text-2xl lg:text-3xl font-extrabold text-gray-900 mb-5 leading-tight group-hover:text-[#0F4C3A] transition-colors">{news.title}</h2>
                <p className="text-gray-500 text-[16px] leading-relaxed mb-8">{news.excerpt}</p>
                <div className="flex items-center justify-between mt-auto">
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2 text-[14px] text-gray-500 font-medium">
                      <Calendar size={16} className="text-[#7FE0B0]" />
                      {news.date}
                    </div>
                    <div className="flex items-center gap-2 text-[14px] text-gray-500 font-medium">
                      <User size={16} className="text-[#7FE0B0]" />
                      {news.author}
                    </div>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-[#F3F4F6] flex items-center justify-center group-hover:bg-[#0F4C3A] group-hover:text-white text-gray-400 transition-colors">
                    <ArrowRight size={20} />
                  </div>
                </div>
              </div>
            </Link>
          </ScrollReveal>
        ))}

        {/* Normal News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsList.filter(n => !n.featured).map((news, idx) => (
            <ScrollReveal key={news.id} delay={idx * 0.1} className="h-full">
              <Link to={`/berita/${news.id}`} className="bg-white rounded-[24px] overflow-hidden shadow-lg shadow-gray-200/40 border border-gray-100 flex flex-col h-full group block hover:-translate-y-2 hover:shadow-xl transition-all duration-300">
                <div className="relative overflow-hidden h-56">
                  <div className="absolute inset-0 bg-[#0F4C3A]/10 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
                  <img 
                    src={news.image} 
                    alt={news.title} 
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" 
                  />
                  <div className="absolute top-4 left-4 z-20 bg-white/90 backdrop-blur-sm text-[#0F4C3A] font-bold text-[11px] uppercase tracking-wider px-3 py-1 rounded-md shadow-sm">
                    {news.category}
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 leading-snug group-hover:text-[#0F4C3A] transition-colors line-clamp-2">{news.title}</h3>
                  <p className="text-gray-500 text-[15px] leading-relaxed mb-6 line-clamp-3">{news.excerpt}</p>
                  
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-1.5 text-[13px] text-gray-500 font-medium">
                      <Calendar size={14} className="text-[#0F4C3A]" />
                      {news.date}
                    </div>
                    <div className="text-[#0F4C3A] text-[13px] font-bold flex items-center gap-1 group-hover:gap-2 transition-all">
                      Baca <ArrowRight size={14} />
                    </div>
                  </div>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>

        {/* Pagination placeholder */}
        <ScrollReveal delay={0.2}>
          <div className="mt-16 flex justify-center gap-2">
            {[1, 2, 3, '...', 12].map((page, idx) => (
              <button 
                key={idx} 
                className={`w-10 h-10 flex items-center justify-center rounded-xl font-bold text-[14px] transition-colors ${page === 1 ? 'bg-[#0F4C3A] text-white shadow-md' : page === '...' ? 'bg-transparent text-gray-400 cursor-default' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-[#0F4C3A]'}`}
              >
                {page}
              </button>
            ))}
          </div>
        </ScrollReveal>

      </section>

      <Footer />
    </div>
  );
}
