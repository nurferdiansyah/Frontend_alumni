import React, { useState, useEffect } from 'react';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { ScrollReveal } from '../../components/ScrollReveal';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowRight, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getNews } from '../../api/publicService';

export function Berita() {
  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await getNews();
        const data = response.data.data || response.data;
        setNewsList(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error fetching news:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  const featured = newsList.length > 0 ? newsList[0] : null;
  const regularNews = newsList.length > 1 ? newsList.slice(1) : [];

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

        {loading ? (
          <div className="text-center py-16 text-gray-500">Memuat berita...</div>
        ) : newsList.length === 0 ? (
          <div className="text-center py-16 text-gray-500">Belum ada berita.</div>
        ) : (
          <>
            {/* Featured News */}
            {featured && (
              <ScrollReveal>
                <Link to={`/berita/${featured.id_news || featured.id}`} className="bg-white rounded-[32px] overflow-hidden shadow-xl shadow-gray-200/40 border border-gray-100 flex flex-col lg:flex-row group mb-12 block hover:shadow-2xl transition-all duration-500">
                  <div className="w-full lg:w-1/2 relative overflow-hidden h-[300px] lg:h-auto">
                    <div className="absolute inset-0 bg-[#0F4C3A]/20 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
                    <img 
                      src={featured.gambar_url || featured.image || "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2070&auto=format&fit=crop"} 
                      alt={featured.judul || featured.title} 
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" 
                    />
                    <div className="absolute top-6 left-6 z-20 bg-[#7FE0B0] text-[#0F4C3A] font-bold text-[12px] uppercase tracking-wider px-4 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg">
                      <TrendingUp size={14} /> KABAR UTAMA
                    </div>
                  </div>
                  <div className="w-full lg:w-1/2 p-8 lg:p-14 flex flex-col justify-center">
                    <span className="text-[#0F4C3A] font-bold text-[13px] uppercase tracking-widest mb-4 inline-block">{featured.kategori || featured.category || 'Kampus'}</span>
                    <h2 className="text-2xl lg:text-3xl font-extrabold text-gray-900 mb-5 leading-tight group-hover:text-[#0F4C3A] transition-colors">{featured.judul || featured.title}</h2>
                    <p className="text-gray-500 text-[16px] leading-relaxed mb-8">{(featured.konten || featured.content) ? (featured.konten || featured.content).replace(/<[^>]*>?/gm, '').substring(0, 200) + '...' : ''}</p>
                    <div className="flex items-center justify-between mt-auto">
                      <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2 text-[14px] text-gray-500 font-medium">
                          <Calendar size={16} className="text-[#7FE0B0]" />
                          {featured.published_at || featured.created_at ? new Date(featured.published_at || featured.created_at).toLocaleDateString('id-ID') : '-'}
                        </div>
                      </div>
                      <div className="w-12 h-12 rounded-full bg-[#F3F4F6] flex items-center justify-center group-hover:bg-[#0F4C3A] group-hover:text-white text-gray-400 transition-colors">
                        <ArrowRight size={20} />
                      </div>
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            )}

            {/* Normal News Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularNews.map((news, idx) => (
                <ScrollReveal key={news.id_news || news.id || idx} delay={idx * 0.1} className="h-full">
                  <Link to={`/berita/${news.id_news || news.id}`} className="bg-white rounded-[24px] overflow-hidden shadow-lg shadow-gray-200/40 border border-gray-100 flex flex-col h-full group block hover:-translate-y-2 hover:shadow-xl transition-all duration-300">
                    <div className="relative overflow-hidden h-56">
                      <div className="absolute inset-0 bg-[#0F4C3A]/10 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
                      <img 
                        src={news.gambar_url || news.image || "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2070&auto=format&fit=crop"} 
                        alt={news.judul || news.title} 
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" 
                      />
                      <div className="absolute top-4 left-4 z-20 bg-white/90 backdrop-blur-sm text-[#0F4C3A] font-bold text-[11px] uppercase tracking-wider px-3 py-1 rounded-md shadow-sm">
                        {news.kategori || news.category || 'Kampus'}
                      </div>
                    </div>
                    <div className="p-6 flex flex-col flex-grow">
                      <h3 className="text-xl font-bold text-gray-900 mb-3 leading-snug group-hover:text-[#0F4C3A] transition-colors line-clamp-2">{news.judul || news.title}</h3>
                      <p className="text-gray-500 text-[15px] leading-relaxed mb-6 line-clamp-3">{(news.konten || news.content) ? (news.konten || news.content).replace(/<[^>]*>?/gm, '').substring(0, 150) : ''}</p>
                      
                      <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                        <div className="flex items-center gap-1.5 text-[13px] text-gray-500 font-medium">
                          <Calendar size={14} className="text-[#0F4C3A]" />
                          {news.published_at || news.created_at ? new Date(news.published_at || news.created_at).toLocaleDateString('id-ID') : '-'}
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
          </>
        )}

      </section>

      <Footer />
    </div>
  );
}
