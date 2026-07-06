import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { StudentLayout } from '../../components/StudentLayout';
import { ScrollReveal } from '../../components/ScrollReveal';
import { ArrowLeft, MapPin, Calendar, Building, Briefcase } from 'lucide-react';
import { Button } from '../../components/Button';
import { getJobById } from '../../api/publicService';

export function DetailLowongan() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchJob = async () => {
      try {
        const response = await getJobById(id);
        setJob(response.data.data || response.data);
      } catch (error) {
        console.error('Error fetching job detail:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [id]);

  if (loading) {
    return (
      <StudentLayout>
        <div className="p-6 md:p-8 min-h-full flex items-center justify-center">
          <p className="text-gray-500">Memuat lowongan...</p>
        </div>
      </StudentLayout>
    );
  }

  if (!job) {
    return (
      <StudentLayout>
        <div className="p-6 md:p-8 min-h-full flex items-center justify-center">
          <p className="text-gray-500">Lowongan tidak ditemukan.</p>
        </div>
      </StudentLayout>
    );
  }

  return (
    <StudentLayout>
      <div className="p-6 md:p-8 min-h-full">
        <div className="max-w-[800px] mx-auto">
          <ScrollReveal>
            <Link to="/dashboard/lowongan" className="inline-flex items-center gap-2 text-gray-500 hover:text-[#0F4C3A] font-medium transition-colors mb-6 group">
              <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
              Kembali ke Daftar Lowongan
            </Link>

            <div className="bg-white rounded-[32px] p-8 md:p-12 shadow-sm border border-gray-100 mb-8">
              <div className="flex flex-col md:flex-row gap-8 items-start mb-10">
                <div className="w-24 h-24 bg-[#F8FAFC] rounded-2xl border border-gray-100 flex items-center justify-center flex-shrink-0">
                  <Building size={40} className="text-gray-400" />
                </div>
                <div>
                  <h1 className="text-3xl font-extrabold text-gray-900 mb-2">{job.title}</h1>
                  <p className="text-xl text-gray-600 mb-6">{job.company_name}</p>
                  
                  <div className="flex flex-wrap gap-4">
                    <div className="flex items-center text-gray-600 text-[14px] bg-[#F8FAFC] px-4 py-2.5 rounded-xl border border-gray-100 font-medium">
                      <MapPin className="w-4 h-4 mr-2 text-gray-400" /> {job.location || 'Indonesia'}
                    </div>
                    <div className="flex items-center text-[#E11D48] text-[14px] font-medium bg-[#FFF1F2] px-4 py-2.5 rounded-xl border border-[#FFE4E6]">
                      <Calendar className="w-4 h-4 mr-2" /> Tutup: {job.deadline ? new Date(job.deadline).toLocaleDateString('id-ID') : '-'}
                    </div>
                    <div className="flex items-center text-[#0F4C3A] text-[14px] font-medium bg-[#7FE0B0]/20 px-4 py-2.5 rounded-xl border border-[#7FE0B0]/30">
                      <Briefcase className="w-4 h-4 mr-2" /> {job.type || 'Full-Time'}
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                <section>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Deskripsi Pekerjaan</h3>
                  <div className="text-gray-600 leading-relaxed text-[15px]" dangerouslySetInnerHTML={{ __html: job.description || 'Deskripsi belum tersedia.' }}></div>
                </section>
                
                {job.requirements && (
                  <section>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Persyaratan</h3>
                    <div className="text-gray-600 leading-relaxed text-[15px]" dangerouslySetInnerHTML={{ __html: job.requirements }}></div>
                  </section>
                )}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </StudentLayout>
  );
}
