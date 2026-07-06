import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { ArrowLeft, Calendar, Share2, Tag } from 'lucide-react';
import { ScrollReveal } from '../../components/ScrollReveal';
import axiosInstance from '../../api/axiosInstance';

export function DetailCampusInfo() {
  const { id } = useParams();
  const [info, setInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInfoDetail = async () => {
      try {
        const response = await axiosInstance.get(`/info/${id}`);
        const data = response.data.data || response.data;
        setInfo(data);
      } catch (error) {
        console.error('Error fetching info detail:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchInfoDetail();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center pt-24 pb-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#0F4C3A]"></div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!info) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center pt-24 pb-12">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Informasi tidak ditemukan</h2>
            <p className="text-gray-500 mb-6">Informasi yang Anda cari mungkin sudah dihapus atau tidak tersedia.</p>
            <Link to="/campus" className="inline-flex bg-[#0F4C3A] text-white font-bold py-2 px-6 rounded-full hover:bg-emerald-800 transition-colors">
              Kembali ke Kampus
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-16 px-6 sm:px-10 lg:px-16 flex justify-center">
        <article className="w-full max-w-4xl bg-white rounded-[32px] p-8 md:p-12 shadow-xl shadow-gray-200/40 border border-gray-100">
          
          <ScrollReveal>
            <Link to="/campus" className="inline-flex items-center gap-2 text-gray-500 hover:text-[#0F4C3A] font-medium transition-colors mb-8 group">
              <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
              Kembali ke Info Kampus
            </Link>
            
            <div className="flex items-center gap-4 mb-4">
              <span className="bg-[#7FE0B0] text-[#0F4C3A] text-[12px] font-bold px-4 py-1.5 rounded-full uppercase tracking-wider shadow-sm">
                {info.tipe || info.type || 'Informasi'}
              </span>
              <span className="text-gray-400 text-[14px] flex items-center gap-1.5 font-medium">
                <Calendar size={14} /> {info.created_at ? new Date(info.created_at).toLocaleDateString('id-ID') : '-'}
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
              {info.judul || info.title}
            </h1>

            <div className="flex items-center justify-end pb-8 border-b border-gray-100 mb-8">
              <button className="w-10 h-10 rounded-full bg-gray-50 text-gray-500 hover:bg-[#0F4C3A] hover:text-white transition-colors flex items-center justify-center" aria-label="Share">
                <Share2 size={18} />
              </button>
            </div>
          </ScrollReveal>

          {info.gambar && (
            <ScrollReveal delay={0.1}>
              <div className="rounded-[24px] overflow-hidden mb-10 shadow-lg border border-gray-100">
                <img src={info.gambar} alt={info.judul} className="w-full h-auto max-h-[450px] object-cover" />
              </div>
            </ScrollReveal>
          )}

          <ScrollReveal delay={0.2}>
            <div className="prose prose-lg max-w-none text-gray-600 space-y-6 text-[17px] leading-relaxed whitespace-pre-wrap" dangerouslySetInnerHTML={{ __html: info.konten || info.content || '' }}>
            </div>

            <div className="mt-12 pt-8 border-t border-gray-100 flex flex-wrap items-center gap-3">
              <Tag size={18} className="text-gray-400" />
              <span className="text-[14px] font-bold text-gray-900">Tag:</span>
              {["Kampus", info.tipe || "Informasi", "UNUHA"].map((tag, i) => (
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
