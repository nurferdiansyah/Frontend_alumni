import React from 'react';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { motion } from 'framer-motion';
import { Target, Compass } from 'lucide-react';

export function VisiMisi() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const misiList = [
    "Menyelenggarakan pendidikan dan pengajaran yang bermutu, inovatif, dan terintegrasi dengan nilai-nilai keislaman.",
    "Melaksanakan penelitian yang berdampak positif bagi pengembangan ilmu pengetahuan, teknologi, dan kesejahteraan masyarakat.",
    "Melakukan pengabdian kepada masyarakat berbasis pemberdayaan yang berkelanjutan.",
    "Membangun tata kelola universitas yang baik (Good University Governance) dengan prinsip transparansi dan akuntabilitas.",
    "Menjalin kerja sama strategis dengan berbagai pihak di tingkat nasional maupun internasional untuk menunjang pencapaian visi."
  ];

  return (
    <div className="min-h-screen bg-[#F4F7FA] font-sans text-gray-800 flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-[#0F4C3A] text-white pt-36 pb-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#7FE0B0]/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
        
        <div className="max-w-[1000px] mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/20 bg-white/10 text-[12px] font-bold mb-6 text-[#7FE0B0] tracking-widest uppercase">
              UNIVERSITAS NURUL HUDA
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 tracking-tight leading-tight text-white">
              Arah & Tujuan <br className="hidden md:block"/> <span className="text-[#7FE0B0]">Masa Depan</span>
            </h1>
            <p className="text-white/80 text-[18px] max-w-2xl mx-auto leading-relaxed">
              Komitmen teguh kami dalam membentuk generasi yang unggul, berakhlak mulia, dan berwawasan global.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="pb-20 px-6 md:px-12 lg:px-16 flex-grow w-full max-w-[1150px] mx-auto -mt-16 relative z-20">
        
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-12 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {/* Visi */}
          <motion.div className="lg:col-span-5" variants={itemVariants}>
            <div className="bg-white rounded-[32px] p-10 shadow-2xl shadow-gray-200/50 border border-gray-100 h-full relative overflow-hidden group hover:-translate-y-2 transition-transform duration-500">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#7FE0B0]/10 rounded-bl-full transition-transform duration-500 group-hover:scale-125"></div>
              
              <motion.div 
                className="w-16 h-16 rounded-2xl bg-[#0F4C3A] text-white flex items-center justify-center mb-8 shadow-lg"
                whileHover={{ rotate: 10, scale: 1.1 }}
              >
                <Target size={32} />
              </motion.div>
              
              <h2 className="text-3xl font-extrabold text-gray-900 mb-6">Visi Kami</h2>
              <div className="relative">
                <span className="absolute -top-4 -left-3 text-6xl text-gray-100 font-serif leading-none">"</span>
                <p className="text-[20px] leading-relaxed text-gray-700 font-medium relative z-10 pt-2">
                  Menjadi Universitas yang <span className="text-[#0F4C3A] font-extrabold">Unggul</span>, <span className="text-[#0F4C3A] font-extrabold">Inovatif</span>, dan <span className="text-[#0F4C3A] font-extrabold">Terdepan</span> dalam mengintegrasikan keilmuan dan keislaman di tingkat nasional pada tahun 2035.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Misi */}
          <motion.div className="lg:col-span-7" variants={itemVariants}>
            <div className="bg-white rounded-[32px] p-10 shadow-2xl shadow-gray-200/50 border border-gray-100 h-full relative overflow-hidden hover:-translate-y-2 transition-transform duration-500">
              <div className="w-16 h-16 rounded-2xl bg-[#7FE0B0] text-[#0F4C3A] flex items-center justify-center mb-8 shadow-lg">
                <Compass size={32} />
              </div>
              
              <h2 className="text-3xl font-extrabold text-gray-900 mb-8">Misi Kami</h2>
              
              <div className="space-y-4">
                {misiList.map((misi, idx) => (
                  <motion.div 
                    key={idx}
                    className="flex gap-4 p-5 rounded-2xl hover:bg-[#F8FAFC] transition-colors border border-transparent hover:border-gray-100 group"
                    variants={itemVariants}
                    whileHover={{ scale: 1.02, x: 5, transition: { type: "spring", stiffness: 400, damping: 25 } }}
                  >
                    <div className="flex-shrink-0 mt-0.5">
                      <div className="w-9 h-9 rounded-full bg-[#0F4C3A]/10 text-[#0F4C3A] flex items-center justify-center font-bold text-[14px] group-hover:bg-[#0F4C3A] group-hover:text-white transition-colors duration-300">
                        {idx + 1}
                      </div>
                    </div>
                    <p className="text-gray-600 leading-relaxed text-[15.5px] font-medium">
                      {misi}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
