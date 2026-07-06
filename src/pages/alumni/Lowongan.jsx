import React, { useState, useMemo } from 'react';
import { StudentLayout } from '../../components/StudentLayout';
import { Button } from '../../components/Button';
import { JobListItem } from '../../components/JobListItem';
import { Search, MapPin } from 'lucide-react';
import { ScrollReveal } from '../../components/ScrollReveal';

const initialJobs = [
  { id: 1, position: "Senior Software Engineer", company: "PT. Teknologi Maju Bersama", location: "Jakarta Selatan", deadline: "20 Nov 2026", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/1200px-Google_%22G%22_logo.svg.png", type: "Penuh Waktu", experience: "3+ Tahun" },
  { id: 2, position: "Management Trainee", company: "Bank Mandiri (Persero) Tbk", location: "Palembang", deadline: "15 Nov 2026", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Logo_of_Bank_Mandiri.svg/1200px-Logo_of_Bank_Mandiri.svg.png", type: "Penuh Waktu", experience: "Fresh Graduate" },
  { id: 3, position: "Tenaga Pengajar (Dosen)", company: "Yayasan Nurul Huda", location: "OKU Timur", deadline: "10 Nov 2026", logo: null, type: "Penuh Waktu", experience: "1 - 3 Tahun" },
  { id: 4, position: "UI/UX Designer", company: "Gojek Indonesia", location: "Remote", deadline: "30 Nov 2026", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Gojek_logo_2019.svg/1200px-Gojek_logo_2019.svg.png", type: "Paruh Waktu", experience: "1 - 3 Tahun" },
  { id: 5, position: "Data Analyst", company: "PT. Telekomunikasi Indonesia", location: "Bandung", deadline: "25 Nov 2026", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Telkom_Indonesia_2013.svg/1200px-Telkom_Indonesia_2013.svg.png", type: "Magang", experience: "Fresh Graduate" }
];

export function Lowongan() {
  const [selectedTypes, setSelectedTypes] = useState({
    "Penuh Waktu": true,
    "Paruh Waktu": true,
    "Magang": false
  });

  const [selectedExperiences, setSelectedExperiences] = useState({
    "Fresh Graduate": true,
    "1 - 3 Tahun": true,
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

    return initialJobs.filter(job => {
      const typeMatch = activeTypes.length === 0 || activeTypes.includes(job.type);
      const expMatch = activeExps.length === 0 || activeExps.includes(job.experience);
      return typeMatch && expMatch;
    });
  }, [selectedTypes, selectedExperiences]);

  return (
    <StudentLayout>
      <div className="p-6 md:p-8 min-h-full">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Informasi Lowongan Pekerjaan</h1>
            <p className="text-gray-500">Temukan informasi instansi yang membutuhkan tenaga kerja profesional.</p>
          </div>

          <div className="flex flex-col md:flex-row gap-8">
            {/* Sidebar Filter */}
            <ScrollReveal className="w-full md:w-1/4">
              <div className="bg-white rounded-[20px] p-6 border border-gray-100 shadow-sm sticky top-6">
                <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
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
                          className="w-4 h-4 rounded text-[#0F4C3A] focus:ring-[#0F4C3A] cursor-pointer border-gray-300" 
                          checked={selectedTypes[type]}
                          onChange={() => handleTypeChange(type)}
                        /> {type}
                      </label>
                    ))}
                  </div>
                  
                  <div className="border-t border-gray-100 pt-5">
                    <h4 className="font-bold text-[15px] text-gray-900 mb-3">Pengalaman</h4>
                    {Object.keys(selectedExperiences).map(exp => (
                      <label key={exp} className="flex items-center gap-3 mb-2.5 text-[14px] text-gray-600 cursor-pointer">
                        <input 
                          type="checkbox" 
                          className="w-4 h-4 rounded text-[#0F4C3A] cursor-pointer border-gray-300" 
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
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2 gap-4">
                  <h2 className="font-bold text-[18px] text-gray-900">Menampilkan {filteredJobs.length} Lowongan</h2>
                  <div className="flex items-center gap-3">
                    <span className="text-[13px] text-gray-500 font-medium">Urutkan:</span>
                    <select className="bg-white border border-gray-200 font-medium text-gray-700 text-[13px] rounded-lg px-4 py-2.5 outline-none cursor-pointer">
                      <option>Paling Relevan</option>
                      <option>Terbaru Dipublikasi</option>
                      <option>Gaji Tertinggi</option>
                    </select>
                  </div>
                </div>
              </ScrollReveal>
              
              {filteredJobs.length > 0 ? (
                filteredJobs.map((job, index) => (
                  <ScrollReveal key={job.id} delay={index * 0.1}>
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:border-[#7FE0B0] transition-colors">
                      <JobListItem 
                        id={job.id}
                        position={job.position} 
                        company={job.company} 
                        location={job.location} 
                        deadline={job.deadline} 
                        logo={job.logo} 
                        baseUrl="/dashboard/lowongan"
                      />
                    </div>
                  </ScrollReveal>
                ))
              ) : (
                <div className="bg-white rounded-2xl p-12 text-center border border-gray-100 shadow-sm">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Tidak ada lowongan ditemukan</h3>
                  <p className="text-gray-500">Coba ubah kriteria filter pencarian Anda untuk melihat hasil lainnya.</p>
                  <Button variant="outline" className="mt-6 font-semibold" onClick={handleReset}>Reset Filter</Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </StudentLayout>
  );
}
