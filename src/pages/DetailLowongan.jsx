import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { ScrollReveal } from '../components/ScrollReveal';
import { ArrowLeft, MapPin, Calendar, Building, Briefcase } from 'lucide-react';
import { Button } from '../components/Button';

export function DetailLowongan() {
  const { id } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#F4F7FA] font-sans text-gray-800 flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-24">
        <div className="max-w-[800px] mx-auto px-6">
          <ScrollReveal>
            <Link to="/jobs" className="inline-flex items-center gap-2 text-gray-500 hover:text-[#0F4C3A] font-medium transition-colors mb-8 group">
              <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
              Kembali ke Daftar Lowongan
            </Link>

            <div className="bg-white rounded-[32px] p-8 md:p-12 shadow-xl shadow-gray-200/50 border border-gray-100 mb-8">
              <div className="flex flex-col md:flex-row gap-8 items-start mb-10">
                <div className="w-24 h-24 bg-[#F8FAFC] rounded-2xl border border-gray-100 flex items-center justify-center flex-shrink-0">
                  <Building size={40} className="text-gray-400" />
                </div>
                <div>
                  <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Senior Software Engineer</h1>
                  <p className="text-xl text-gray-600 mb-6">PT. Teknologi Maju Bersama</p>
                  
                  <div className="flex flex-wrap gap-4">
                    <div className="flex items-center text-gray-600 text-[14px] bg-[#F8FAFC] px-4 py-2.5 rounded-xl border border-gray-100 font-medium">
                      <MapPin className="w-4 h-4 mr-2 text-gray-400" /> Jakarta Selatan
                    </div>
                    <div className="flex items-center text-[#E11D48] text-[14px] font-medium bg-[#FFF1F2] px-4 py-2.5 rounded-xl border border-[#FFE4E6]">
                      <Calendar className="w-4 h-4 mr-2" /> Tutup: 20 Nov 2026
                    </div>
                    <div className="flex items-center text-[#0F4C3A] text-[14px] font-medium bg-[#7FE0B0]/20 px-4 py-2.5 rounded-xl border border-[#7FE0B0]/30">
                      <Briefcase className="w-4 h-4 mr-2" /> Full-Time
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                <section>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Deskripsi Pekerjaan</h3>
                  <p className="text-gray-600 leading-relaxed text-[15px]">Kami mencari individu yang kompeten dan berpengalaman untuk bergabung dengan tim kami. Anda akan bertanggung jawab untuk berkolaborasi dalam lingkungan yang dinamis, memberikan solusi yang efektif, dan berkontribusi langsung pada pencapaian tujuan perusahaan.</p>
                </section>
                
                <section>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Persyaratan</h3>
                  <ul className="list-disc list-inside text-gray-600 space-y-2 text-[15px]">
                    <li>Minimal pengalaman 2-3 tahun di posisi yang relevan.</li>
                    <li>Memiliki kemampuan komunikasi dan kerja sama tim yang baik.</li>
                    <li>Lulusan S1 atau setara dari universitas terkemuka.</li>
                    <li>Proaktif, disiplin, dan mampu bekerja di bawah tekanan.</li>
                  </ul>
                </section>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </main>

      <Footer />
    </div>
  );
}
