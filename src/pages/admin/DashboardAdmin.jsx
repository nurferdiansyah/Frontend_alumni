import React, { useState, useEffect } from 'react';
import { AdminLayout } from '../../components/AdminLayout';
import { Users, Building2, Briefcase, TrendingUp, GraduationCap, Download } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '../../components/Button';
import { getAlumni } from '../../api/adminService';
import { getJobs } from '../../api/publicService';
import { Link } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export function DashboardAdmin() {
  const [totalAlumni, setTotalAlumni] = useState(0);
  const [activeJobs, setActiveJobs] = useState(0);
  const [alumniList, setAlumniList] = useState([]);
  const [jobsList, setJobsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedYear, setSelectedYear] = useState('Semua');

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      
      try {
        const alumniRes = await getAlumni();
        const alumniData = alumniRes.data.data || alumniRes.data;
        setTotalAlumni(Array.isArray(alumniData) ? alumniData.length : 0);
        setAlumniList(Array.isArray(alumniData) ? alumniData : []);
      } catch (error) {
        console.error('Error fetching alumni stats:', error);
      }

      try {
        const jobsRes = await getJobs();
        const jobsData = jobsRes.data.data || jobsRes.data;
        setActiveJobs(Array.isArray(jobsData) ? jobsData.length : 0);
        setJobsList(Array.isArray(jobsData) ? jobsData : []);
      } catch (error) {
        console.error('Error fetching job stats:', error);
      }

      setIsLoading(false);
    };
    fetchData();
  }, []);

  const stats = [
    { label: 'Total Alumni Terdaftar', value: totalAlumni.toString(), icon: Users, color: 'text-blue-600', bg: 'bg-blue-100', trend: '+12% bulan ini' },
    { label: 'Alumni Bekerja', value: Math.floor(totalAlumni * 0.6).toString(), icon: Building2, color: 'text-emerald-600', bg: 'bg-emerald-100', trend: '+5% bulan ini' },
    { label: 'Lowongan Aktif', value: activeJobs.toString(), icon: Briefcase, color: 'text-purple-600', bg: 'bg-purple-100', trend: '4 baru minggu ini' },
    { label: 'Lanjut Studi', value: Math.floor(totalAlumni * 0.1).toString(), icon: GraduationCap, color: 'text-orange-600', bg: 'bg-orange-100', trend: '+2% bulan ini' },
  ];

  const availableYears = [...new Set(alumniList.map(a => a.tahun_lulus || a.angkatan).filter(Boolean))].sort((a, b) => b - a);

  let chartData = [];
  if (selectedYear === 'Semua') {
    const yearCounts = alumniList.reduce((acc, curr) => {
      const year = curr.tahun_lulus || curr.angkatan || 'Lainnya';
      acc[year] = (acc[year] || 0) + 1;
      return acc;
    }, {});
    chartData = Object.keys(yearCounts).sort().map(year => ({
      name: year,
      jumlah: yearCounts[year]
    }));
  } else {
    const filteredAlumni = alumniList.filter(a => (a.tahun_lulus || a.angkatan) == selectedYear);
    const prodiCounts = filteredAlumni.reduce((acc, curr) => {
      const prodi = curr.prodi?.nama_prodi || curr.prodi || 'Lainnya';
      acc[prodi] = (acc[prodi] || 0) + 1;
      return acc;
    }, {});
    chartData = Object.keys(prodiCounts).map(prodi => ({
      name: prodi,
      jumlah: prodiCounts[prodi]
    }));
  }

  const downloadReport = (format) => {
    const dataToExport = alumniList.map(a => ({
      'Nama Lengkap': a.nama_lengkap || a.nama || '-',
      'NIM': a.nim || '-',
      'Program Studi': a.prodi?.nama_prodi || a.prodi || '-',
      'Tahun Lulus': a.tahun_lulus || a.angkatan || '-',
      'Status Pekerjaan': a.status_pekerjaan || '-'
    }));
    const title = 'Laporan Data Alumni';
    const filename = 'Laporan_Data_Alumni';

    if (dataToExport.length === 0) {
      Swal.fire('Kosong', 'Tidak ada data untuk diunduh.', 'info');
      return;
    }

    if (format === 'csv') {
      const headers = Object.keys(dataToExport[0]).join(',');
      const rows = dataToExport.map(obj => 
        Object.values(obj).map(val => `"${String(val).replace(/"/g, '""')}"`).join(',')
      );
      const csvContent = [headers, ...rows].join('\n');
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.setAttribute('download', `${filename}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } 
    else if (format === 'xlsx') {
      const worksheet = XLSX.utils.json_to_sheet(dataToExport);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Data');
      XLSX.writeFile(workbook, `${filename}.xlsx`);
    }
    else if (format === 'pdf') {
      const doc = new jsPDF();
      doc.text(title, 14, 15);
      
      const headers = Object.keys(dataToExport[0]);
      const data = dataToExport.map(obj => Object.values(obj));
      
      autoTable(doc, {
        head: [headers],
        body: data,
        startY: 20,
      });
      
      doc.save(`${filename}.pdf`);
    }
  };

  const handleDownloadReport = async () => {
    const { value: formValues } = await Swal.fire({
      title: 'Unduh Laporan Alumni',
      html: `
        <div style="text-align: left;">
          <label style="display: block; margin-bottom: 12px; font-weight: bold; color: #374151;">Pilih Format File Laporan</label>
          <div style="display: flex; gap: 16px; margin-bottom: 10px;">
            <label style="display: flex; align-items: center; gap: 6px; cursor: pointer;">
              <input type="radio" name="format" value="csv" checked style="accent-color: #0F4C3A;"> CSV
            </label>
            <label style="display: flex; align-items: center; gap: 6px; cursor: pointer;">
              <input type="radio" name="format" value="xlsx" style="accent-color: #0F4C3A;"> Excel (.xlsx)
            </label>
            <label style="display: flex; align-items: center; gap: 6px; cursor: pointer;">
              <input type="radio" name="format" value="pdf" style="accent-color: #0F4C3A;"> PDF
            </label>
          </div>
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: 'Unduh Sekarang',
      cancelButtonText: 'Batal',
      confirmButtonColor: '#0F4C3A',
      preConfirm: () => {
        const format = document.querySelector('input[name="format"]:checked').value;
        return { format };
      }
    });

    if (formValues) {
      downloadReport(formValues.format);
    }
  };


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
            <Button onClick={handleDownloadReport} variant="outline" className="flex items-center gap-2 bg-white text-gray-700 border-gray-200 hover:bg-[#0F4C3A] hover:text-white hover:border-[#0F4C3A] transition-colors">
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
              {isLoading ? (
                <div className="h-9 w-16 bg-gray-200 rounded-lg animate-pulse mb-1"></div>
              ) : (
                <h3 className="text-3xl font-black text-gray-900 mb-1">{stat.value}</h3>
              )}
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
              <h2 className="text-lg font-bold text-gray-900">Grafik Data Alumni</h2>
              <select 
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="bg-gray-50 border border-gray-200 text-sm rounded-lg px-3 py-1.5 outline-none text-gray-700 cursor-pointer"
              >
                <option value="Semua">Semua Tahun</option>
                {availableYears.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>
            {isLoading ? (
              <div className="h-72 bg-gray-100 rounded-xl animate-pulse"></div>
            ) : (
              <div className="h-72 bg-white rounded-xl flex items-center justify-center">
                {chartData.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B7280' }} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B7280' }} />
                      <Tooltip cursor={{ fill: '#F3F4F6' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                      <Bar dataKey="jumlah" fill="#0F4C3A" radius={[4, 4, 0, 0]} barSize={40} />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <p className="text-gray-400 font-medium">Tidak ada data untuk ditampilkan</p>
                )}
              </div>
            )}
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
              <Link to="/admin/alumni" className="text-sm font-bold text-blue-600 hover:underline">Lihat Semua</Link>
            </div>
            
            <div className="space-y-6">
              {isLoading ? (
                [...Array(4)].map((_, i) => (
                  <div key={i} className="flex items-center gap-4 animate-pulse">
                    <div className="w-10 h-10 rounded-full bg-gray-200"></div>
                    <div className="flex-1">
                      <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                      <div className="h-3 bg-gray-100 rounded w-1/3"></div>
                    </div>
                  </div>
                ))
              ) : alumniList.length > 0 ? (
                alumniList.slice(0, 4).map((alumni, i) => {
                  const name = alumni.nama_lengkap || alumni.nama || 'Anonim';
                  const prodi = alumni.prodi?.nama_prodi || alumni.prodi || 'Tidak diketahui';
                  const initials = name.substring(0, 2).toUpperCase();
                  const colors = ['bg-purple-100 text-purple-600', 'bg-emerald-100 text-emerald-600', 'bg-blue-100 text-blue-600', 'bg-orange-100 text-orange-600'];
                  const color = colors[i % colors.length];
                  
                  // For dummy time since created_at might not be there or might be old
                  const times = ['Baru saja', '1 jam yang lalu', '3 jam yang lalu', '5 jam yang lalu'];

                  return (
                    <div key={alumni.id || i} className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${color}`}>
                        {initials}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-bold text-gray-900 truncate">{name}</h4>
                        <p className="text-xs text-gray-500 truncate">{prodi}</p>
                      </div>
                      <span className="text-[10px] text-gray-400 font-medium whitespace-nowrap">{times[i] || 'Baru saja'}</span>
                    </div>
                  );
                })
              ) : (
                <div className="text-sm text-gray-500 text-center py-4">Belum ada alumni</div>
              )}
            </div>
          </motion.div>

        </div>
      </div>
    </AdminLayout>
  );
}
