import React, { useState, useEffect } from 'react';
import { AdminLayout } from '../../components/AdminLayout';
import { Users, Building2, Briefcase, TrendingUp, GraduationCap, Download } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '../../components/Button';
import { getAlumni } from '../../api/adminService';
import { getJobs } from '../../api/publicService';

export function DashboardAdmin() {
  const [totalAlumni, setTotalAlumni] = useState(0);
  const [activeJobs, setActiveJobs] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [alumniRes, jobsRes] = await Promise.all([
          getAlumni(),
          getJobs()
        ]);
        
        const alumniData = alumniRes.data.data || alumniRes.data;
        const jobsData = jobsRes.data.data || jobsRes.data;
        
        setTotalAlumni(Array.isArray(alumniData) ? alumniData.length : 0);
        setActiveJobs(Array.isArray(jobsData) ? jobsData.length : 0);
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
      }
    };
    fetchData();
  }, []);

  const stats = [
    { label: 'Total Alumni Terdaftar', value: totalAlumni.toString(), icon: Users, color: 'text-blue-600', bg: 'bg-blue-100', trend: '+12% bulan ini' },
    { label: 'Alumni Bekerja', value: Math.floor(totalAlumni * 0.6).toString(), icon: Building2, color: 'text-emerald-600', bg: 'bg-emerald-100', trend: '+5% bulan ini' },
    { label: 'Lowongan Aktif', value: activeJobs.toString(), icon: Briefcase, color: 'text-purple-600', bg: 'bg-purple-100', trend: '4 baru minggu ini' },
    { label: 'Lanjut Studi', value: Math.floor(totalAlumni * 0.1).toString(), icon: GraduationCap, color: 'text-orange-600', bg: 'bg-orange-100', trend: '+2% bulan ini' },
  ];

  return (
    <AdminLayout>
      <div className="p-6 lg:p-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-500 mt-1">Ringkasan data alumni dan aktivitas portal.</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="flex items-center gap-2 bg-white text-gray-700 border-gray-200 hover:bg-[#0F4C3A] hover:text-white hover:border-[#0F4C3A] transition-colors">
              <Download size={16} /> Unduh Laporan
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm"
            >
              <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                  <stat.icon size={24} />
                </div>
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md flex items-center gap-1">
                  <TrendingUp size={12} /> {stat.trend.split(' ')[0]}
                </span>
              </div>
              <h3 className="text-3xl font-black text-gray-900 mb-1">{stat.value}</h3>
              <p className="text-sm font-medium text-gray-500">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Chart Placeholder */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-2 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-gray-900">Tren Pendaftaran Alumni (2026)</h2>
              <select className="bg-gray-50 border border-gray-200 text-sm rounded-lg px-3 py-1.5 outline-none">
                <option>Tahun Ini</option>
                <option>Tahun Lalu</option>
              </select>
            </div>
            <div className="h-72 bg-gray-50 rounded-xl border border-dashed border-gray-200 flex items-center justify-center">
              <p className="text-gray-400 font-medium">Grafik Data Alumni</p>
              {/* Di sini biasanya menggunakan Recharts atau Chart.js */}
            </div>
          </motion.div>

          {/* Recent Activity */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-gray-900">Alumni Terbaru</h2>
              <button className="text-sm font-bold text-blue-600 hover:underline">Lihat Semua</button>
            </div>
            
            <div className="space-y-6">
              {[
                { name: 'Siti Aminah', prodi: 'Pendidikan Agama Islam', time: '10 menit yang lalu', initials: 'SA', color: 'bg-purple-100 text-purple-600' },
                { name: 'Budi Santoso', prodi: 'Informatika', time: '1 jam yang lalu', initials: 'BS', color: 'bg-emerald-100 text-emerald-600' },
                { name: 'Ahmad Faisal', prodi: 'Agroteknologi', time: '3 jam yang lalu', initials: 'AF', color: 'bg-blue-100 text-blue-600' },
                { name: 'Diana Putri', prodi: 'Pendidikan Bahasa Inggris', time: '5 jam yang lalu', initials: 'DP', color: 'bg-orange-100 text-orange-600' },
              ].map((alumni, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${alumni.color}`}>
                    {alumni.initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-bold text-gray-900 truncate">{alumni.name}</h4>
                    <p className="text-xs text-gray-500 truncate">{alumni.prodi}</p>
                  </div>
                  <span className="text-[10px] text-gray-400 font-medium whitespace-nowrap">{alumni.time}</span>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </AdminLayout>
  );
}
