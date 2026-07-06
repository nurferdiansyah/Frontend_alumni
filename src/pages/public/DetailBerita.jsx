import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { ScrollReveal } from '../../components/ScrollReveal';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowLeft, Tag, Share2 } from 'lucide-react';
import { getNewsById } from '../../api/publicService';

export function DetailBerita() {
  const { id } = useParams();
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchNews = async () => {
      try {
        const response = await getNewsById(id);
        setNews(response.data.data || response.data);
      } catch (error) {
        console.error('Error fetching news detail:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white font-sans text-gray-800 flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <p className="text-gray-500">Memuat berita...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (!news) {
    return (
      <div className="min-h-screen bg-white font-sans text-gray-800 flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <p className="text-gray-500">Berita tidak ditemukan.</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-sans text-gray-800 flex flex-col">
      <Navbar />

      <main className="flex-grow pt-32 pb-24">
        <article className="max-w-[800px] mx-auto px-6">
          
          <ScrollReveal>
            <Link to="/berita" className="inline-flex items-center gap-2 text-gray-500 hover:text-[#0F4C3A] font-medium transition-colors mb-8 group">
              <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
              Kembali ke Daftar Berita
            </Link>
            
            <div className="flex items-center gap-4 mb-4">
              <span className="bg-[#7FE0B0] text-[#0F4C3A] text-[12px] font-bold px-4 py-1.5 rounded-full uppercase tracking-wider shadow-sm">
                {news.kategori || news.category || 'Kampus'}
              </span>
              <span className="text-gray-400 text-[14px] flex items-center gap-1.5 font-medium">
                <Calendar size={14} /> {news.published_at || news.created_at ? new Date(news.published_at || news.created_at).toLocaleDateString('id-ID') : '-'}
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
              {news.judul || news.title}
            </h1>

            <div className="flex items-center justify-between pb-8 border-b border-gray-100 mb-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#F3F4F6] text-[#0F4C3A] flex items-center justify-center">
                  <User size={20} />
                </div>
                <div>
                  <p className="text-[14px] text-gray-500">Ditulis oleh</p>
                  <p className="font-bold text-gray-900 text-[15px]">{news.author || 'Admin'}</p>
                </div>
              </div>
              
              <button className="w-10 h-10 rounded-full bg-gray-50 text-gray-500 hover:bg-[#0F4C3A] hover:text-white transition-colors flex items-center justify-center" aria-label="Share">
                <Share2 size={18} />
              </button>
            </div>
          </ScrollReveal>

          {(news.gambar_url || news.image) && (
            <ScrollReveal delay={0.1}>
              <div className="rounded-[24px] overflow-hidden mb-10 shadow-lg border border-gray-100">
                <img src={news.gambar_url || news.image} alt={news.judul || news.title} className="w-full h-auto max-h-[450px] object-cover" />
              </div>
            </ScrollReveal>
          )}

          <ScrollReveal delay={0.2}>
            <div className="prose prose-lg max-w-none text-gray-600 space-y-6 text-[17px] leading-relaxed" dangerouslySetInnerHTML={{ __html: news.konten || news.content || '' }}>
            </div>

            <div className="mt-12 pt-8 border-t border-gray-100 flex flex-wrap items-center gap-3">
              <Tag size={18} className="text-gray-400" />
              <span className="text-[14px] font-bold text-gray-900">Tag:</span>
              {["Kampus", news.category || "Berita", "UNUHA"].map((tag, i) => (
                <span key={i} className="bg-gray-100 text-gray-600 text-[13px] font-medium px-3 py-1 rounded-full hover:bg-[#0F4C3A] hover:text-white cursor-pointer transition-colors">
                  {tag}
                </span>
              ))}
            </div>
          </ScrollReveal>

        </article>
      </main>

      <Footer />
    </div>
  );
}
