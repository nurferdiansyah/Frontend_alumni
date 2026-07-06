import React, { useState, useEffect, useMemo } from 'react';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { Button } from '../../components/Button';
import { JobListItem } from '../../components/JobListItem';
import { Search, MapPin, Briefcase } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ScrollReveal } from '../../components/ScrollReveal';
import { motion } from 'framer-motion';
import { getJobs } from '../../api/publicService';

const initialJobs = [
  { id: 1, position: "Senior Software Engineer", company: "PT. Teknologi Maju Bersama", location: "Jakarta Selatan", deadline: "20 Nov 2026", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/1200px-Google_%22G%22_logo.svg.png", type: "Penuh Waktu", experience: "3+ Tahun" },
  { id: 2, position: "Management Trainee", company: "Bank Mandiri (Persero) Tbk", location: "Palembang", deadline: "15 Nov 2026", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Logo_of_Bank_Mandiri.svg/1200px-Logo_of_Bank_Mandiri.svg.png", type: "Penuh Waktu", experience: "Fresh Graduate" },
  { id: 3, position: "Tenaga Pengajar (Dosen)", company: "Yayasan Nurul Huda", location: "OKU Timur", deadline: "10 Nov 2026", logo: null, type: "Penuh Waktu", experience: "1 - 3 Tahun" },
  { id: 4, position: "UI/UX Designer", company: "Gojek Indonesia", location: "Remote", deadline: "30 Nov 2026", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Gojek_logo_2019.svg/1200px-Gojek_logo_2019.svg.png", type: "Paruh Waktu", experience: "1 - 3 Tahun" },
  { id: 5, position: "Data Analyst", company: "PT. Telekomunikasi Indonesia", location: "Bandung", deadline: "25 Nov 2026", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Telkom_Indonesia_2013.svg/1200px-Telkom_Indonesia_2013.svg.png", type: "Magang", experience: "Fresh Graduate" }
];

export function Jobs() {
  const [allJobs, setAllJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('Terbaru Dipublikasi');

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await getJobs();
        const data = response.data.data || response.data;
        setAllJobs(Array.isArray(data) ? data.map(job => ({
          id: job.id_lowongan || job.id,
          position: job.title,
          company: job.company || job.company_name,
          location: job.location || 'Indonesia',
          deadline: job.deadline ? new Date(job.deadline).toLocaleDateString('id-ID') : '-',
          logo: job.logo || null,
          type: job.type || 'Penuh Waktu',
          experience: job.experience || 'Fresh Graduate',
          rawDeadline: job.deadline ? new Date(job.deadline).getTime() : 0,
          rawCreatedAt: job.created_at ? new Date(job.created_at).getTime() : 0
        })) : []);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const [selectedTypes, setSelectedTypes] = useState({
    "Penuh Waktu": false,
    "Paruh Waktu": false,
    "Magang": false
  });

  const [selectedExperiences, setSelectedExperiences] = useState({
    "Fresh Graduate": false,
    "1 - 3 Tahun": false,
    "3+ Tahun": false
  });

  const handleTypeChange = (type) => {
    setSelectedTypes(prev => ({ ...prev, [type]: !prev[type] }));
  };

  const handleExpChange = (exp) => {
    setSelectedExperiences(prev => ({ ...prev, [exp]: !prev[exp] }));
  };

  const handleReset = () => {
    setSelectedTypes({
      "Penuh Waktu": false,
      "Paruh Waktu": false,
      "Magang": false
    });
    setSelectedExperiences({
      "Fresh Graduate": false,
      "1 - 3 Tahun": false,
      "3+ Tahun": false
    });
  };

  const filteredJobs = useMemo(() => {
    const activeTypes = Object.keys(selectedTypes).filter(k => selectedTypes[k]);
    const activeExps = Object.keys(selectedExperiences).filter(k => selectedExperiences[k]);

    let result = allJobs.filter(job => {
      const typeMatch = activeTypes.length === 0 || activeTypes.includes(job.type);
      const expMatch = activeExps.length === 0 || activeExps.includes(job.experience);
      return typeMatch && expMatch;
    });

    if (sortBy === 'Terbaru Dipublikasi') {
      result.sort((a, b) => b.rawCreatedAt - a.rawCreatedAt);
    } else if (sortBy === 'Terlama Dipublikasi') {
      result.sort((a, b) => a.rawCreatedAt - b.rawCreatedAt);
    } else if (sortBy === 'Tenggat Waktu Terdekat') {
      result.sort((a, b) => {
        if (!a.rawDeadline) return 1;
        if (!b.rawDeadline) return -1;
        return a.rawDeadline - b.rawDeadline;
      });
    }

    return result;
  }, [selectedTypes, selectedExperiences, allJobs, sortBy]);

  return (
    <div className="min-h-screen bg-white font-sans text-gray-800 flex flex-col">
      <Navbar />

      <section className="bg-[#0F4C3A] text-white pt-36 pb-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
        <motion.div 
          className="max-w-[1200px] mx-auto text-center relative z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[#7FE0B0]">Temukan Pekerjaan Impianmu</h1>
          <p className="text-white/80 text-[16px] max-w-2xl mx-auto mb-10 leading-relaxed">Jelajahi ratusan lowongan kerja dari perusahaan mitra Universitas Nurul Huda khusus untuk alumni.</p>
          
          <div className="bg-white p-2.5 rounded-2xl flex flex-col md:flex-row gap-2 max-w-4xl mx-auto shadow-2xl">
            <div className="flex-1 flex items-center px-4 py-2 text-gray-700">
              <Search className="w-5 h-5 text-gray-400 mr-3 flex-shrink-0" />
              <input type="text" placeholder="Posisi, kata kunci, atau perusahaan" className="w-full bg-transparent outline-none border-none text-[15px]" />
            </div>
            <div className="hidden md:block w-[1px] bg-gray-200 my-2"></div>
            <div className="flex-1 flex items-center px-4 py-2 text-gray-700 border-t border-gray-100 md:border-none">
              <MapPin className="w-5 h-5 text-gray-400 mr-3 flex-shrink-0" />
              <input type="text" placeholder="Kota atau provinsi" className="w-full bg-transparent outline-none border-none text-[15px]" />
            </div>
            <Button variant="primary" className="bg-[#7FE0B0] hover:bg-[#66c698] text-[#0F4C3A] font-bold rounded-xl px-8 py-3.5 shadow-md">Cari Lowongan</Button>
          </div>
        </motion.div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-[1200px] mx-auto flex-grow w-full">
        <div className="flex flex-col md:flex-row gap-8">
          
          {/* Sidebar Filter */}
          <ScrollReveal className="w-full md:w-1/4">
            <div className="bg-gray-50/80 rounded-[20px] p-6 border border-gray-100 sticky top-28">
              <div className="flex justify-between items-center mb-6 border-b border-gray-200 pb-4">
                <h3 className="font-bold text-[18px] text-gray-900">Filter Pencarian</h3>
                <span onClick={handleReset} className="text-[13px] text-red-500 font-medium cursor-pointer hover:underline">Reset</span>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h4 className="font-bold text-[15px] text-gray-900 mb-3">Tipe Pekerjaan</h4>
                  {Object.keys(selectedTypes).map(type => (
                    <label key={type} className="flex items-center gap-3 mb-2.5 text-[14px] text-gray-600 cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="w-4 h-4 rounded text-[#0F4C3A] focus:ring-[#0F4C3A] cursor-pointer" 
                        checked={selectedTypes[type]}
                        onChange={() => handleTypeChange(type)}
                      /> {type}
                    </label>
                  ))}
                </div>
                
                <div className="border-t border-gray-200 pt-5">
                  <h4 className="font-bold text-[15px] text-gray-900 mb-3">Pengalaman</h4>
                  {Object.keys(selectedExperiences).map(exp => (
                    <label key={exp} className="flex items-center gap-3 mb-2.5 text-[14px] text-gray-600 cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="w-4 h-4 rounded text-[#0F4C3A] cursor-pointer" 
                        checked={selectedExperiences[exp]}
                        onChange={() => handleExpChange(exp)}
                      /> {exp}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>
          
          {/* Job List */}
          <div className="w-full md:w-3/4 flex flex-col gap-4">
            <ScrollReveal>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4 bg-white p-2">
                <h2 className="font-bold text-[20px] text-gray-900">{loading ? 'Memuat...' : `Menampilkan ${filteredJobs.length} Lowongan`}</h2>
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <span className="text-[13px] text-gray-500 font-medium whitespace-nowrap">Urutkan:</span>
                  <select 
                    className="w-full sm:w-auto bg-white border border-gray-200 font-medium text-gray-700 text-[13px] rounded-lg px-4 py-2.5 outline-none cursor-pointer"
                    value={sortBy}
                    onChange={e => setSortBy(e.target.value)}
                  >
                    <option value="Terbaru Dipublikasi">Terbaru Dipublikasi</option>
                    <option value="Terlama Dipublikasi">Terlama Dipublikasi</option>
                    <option value="Tenggat Waktu Terdekat">Tenggat Waktu Terdekat</option>
                  </select>
                </div>
              </div>
            </ScrollReveal>
            
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job, index) => (
                <ScrollReveal key={job.id} delay={index * 0.1}>
                  <JobListItem 
                    id={job.id}
                    position={job.position} 
                    company={job.company} 
                    location={job.location} 
                    deadline={job.deadline} 
                    logo={job.logo} 
                  />
                </ScrollReveal>
              ))
            ) : (
              <div className="bg-gray-50 rounded-2xl p-12 text-center mt-4">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Tidak ada lowongan ditemukan</h3>
                <p className="text-gray-500">Coba ubah kriteria filter pencarian Anda untuk melihat hasil lainnya.</p>
                <Button variant="outline" className="mt-6 font-semibold" onClick={handleReset}>Reset Filter</Button>
              </div>
            )}
            
            {filteredJobs.length > 0 && (
              <ScrollReveal delay={0.6}>
                <div className="mt-10 flex justify-center pb-8">
                  <Button variant="outline" className="rounded-xl px-8 py-3.5 font-bold text-gray-700 bg-white border-2 border-gray-200 hover:border-[#0F4C3A] hover:bg-[#0F4C3A] hover:text-white transition-all hover:-translate-y-0.5 hover:shadow-md">Muat Lebih Banyak</Button>
                </div>
              </ScrollReveal>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
