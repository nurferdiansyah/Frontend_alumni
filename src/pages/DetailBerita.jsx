import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { ScrollReveal } from '../components/ScrollReveal';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowLeft, Tag, Share2 } from 'lucide-react';

export function DetailBerita() {
  const { id } = useParams();

  // Mock data (same as in Berita.jsx)
  const newsList = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2070&auto=format&fit=crop",
      category: "Akademik",
      title: "Universitas Nurul Huda Gelar Sidang Senat Terbuka Wisuda Sarjana Angkatan V",
      excerpt: "Ratusan mahasiswa dari berbagai program studi resmi dilepas dalam acara wisuda yang berlangsung khidmat di aula utama kampus.",
      date: "15 Okt 2026",
      author: "Humas UNUHA",
      content: [
        "Universitas Nurul Huda (UNUHA) kembali menggelar Sidang Senat Terbuka dalam rangka Wisuda Sarjana Angkatan V. Acara yang berlangsung khidmat ini bertempat di aula utama kampus dan dihadiri oleh ratusan wisudawan, orang tua, staf akademik, serta tamu undangan dari berbagai institusi.",
        "Rektor UNUHA dalam pidato sambutannya menyampaikan rasa bangga dan harapan besar kepada para lulusan. Beliau menekankan pentingnya peran generasi muda dalam menghadapi tantangan global dengan berbekal ilmu pengetahuan, akhlak mulia, dan inovasi yang telah ditempa selama masa perkuliahan.",
        "Para lulusan tahun ini berasal dari berbagai fakultas, di antaranya Fakultas Ilmu Komputer, Fakultas Ekonomi, dan Fakultas Keguruan dan Ilmu Pendidikan. Masing-masing lulusan diharapkan dapat mengaplikasikan ilmu yang didapat untuk memberikan kontribusi nyata bagi masyarakat dan kemajuan bangsa.",
        "Acara wisuda diakhiri dengan prosesi penyerahan ijazah dan sesi foto bersama. Momen haru dan bahagia terlihat jelas di wajah para wisudawan dan keluarga yang hadir. Selamat kepada seluruh wisudawan, semoga sukses dalam meniti karir dan kehidupan selanjutnya!"
      ]
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop",
      category: "Prestasi",
      title: "Mahasiswa FST Raih Juara 1 Kompetisi Robotik Nasional 2026",
      excerpt: "Tim robotik Universitas Nurul Huda berhasil mengharumkan nama almamater dengan menyisihkan puluhan universitas ternama lainnya.",
      date: "02 Okt 2026",
      author: "BEM FST",
      content: [
        "Kabar gembira datang dari Fakultas Sains dan Teknologi (FST) Universitas Nurul Huda. Tim robotik kebanggaan kampus berhasil meraih Juara 1 dalam ajang Kompetisi Robotik Nasional 2026 yang diselenggarakan di Jakarta.",
        "Kompetisi ini diikuti oleh puluhan universitas ternama dari seluruh Indonesia. Tim UNUHA yang terdiri dari lima mahasiswa berprestasi ini berhasil memukau juri dengan inovasi robot cerdas mereka yang dirancang untuk membantu operasi pencarian dan penyelamatan di daerah bencana.",
        "Dekan FST mengapresiasi kerja keras dan dedikasi tim. Beliau berharap prestasi ini dapat memotivasi mahasiswa lainnya untuk terus berkarya dan berinovasi di bidang teknologi. Kemenangan ini juga semakin mengukuhkan posisi UNUHA sebagai institusi pendidikan yang unggul di bidang sains dan teknologi."
      ]
    }
  ];

  // If we had a real backend, we'd fetch the news item by ID.
  // For now, we'll try to find it in our mock array, or fallback to a default if ID > 2
  const news = newsList.find(n => n.id === parseInt(id)) || {
    ...newsList[0],
    title: "Detail Berita " + id + " - Universitas Nurul Huda",
    id: parseInt(id)
  };

  useEffect(() => {
    // Reset scroll on load
    window.scrollTo(0, 0);
  }, []);

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
            
            <div className="flex items-center gap-3 mb-6">
              <span className="bg-[#7FE0B0]/20 text-[#0F4C3A] font-bold text-[13px] uppercase tracking-wider px-3 py-1 rounded-md">
                {news.category}
              </span>
              <span className="text-gray-400 text-[14px] flex items-center gap-1.5 font-medium">
                <Calendar size={14} /> {news.date}
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
              {news.title}
            </h1>

            <div className="flex items-center justify-between pb-8 border-b border-gray-100 mb-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#F3F4F6] text-[#0F4C3A] flex items-center justify-center">
                  <User size={20} />
                </div>
                <div>
                  <p className="text-[14px] text-gray-500">Ditulis oleh</p>
                  <p className="font-bold text-gray-900 text-[15px]">{news.author}</p>
                </div>
              </div>
              
              <button className="w-10 h-10 rounded-full bg-gray-50 text-gray-500 hover:bg-[#0F4C3A] hover:text-white transition-colors flex items-center justify-center" aria-label="Share">
                <Share2 size={18} />
              </button>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="rounded-[24px] overflow-hidden mb-10 shadow-lg border border-gray-100">
              <img src={news.image} alt={news.title} className="w-full h-auto max-h-[450px] object-cover" />
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="prose prose-lg max-w-none text-gray-600 space-y-6 text-[17px] leading-relaxed">
              <p className="text-xl text-gray-800 font-medium leading-relaxed italic border-l-4 border-[#7FE0B0] pl-6 mb-8">
                {news.excerpt}
              </p>
              
              {news.content.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            <div className="mt-12 pt-8 border-t border-gray-100 flex flex-wrap items-center gap-3">
              <Tag size={18} className="text-gray-400" />
              <span className="text-[14px] font-bold text-gray-900">Tag:</span>
              {["Kampus", news.category, "UNUHA", "Berita Utama"].map((tag, i) => (
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
