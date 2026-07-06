import React, { useState, useEffect } from 'react';
import { AdminLayout } from '../../components/AdminLayout';
import { Search, Filter, Download, MoreVertical, Eye, Trash2, Edit } from 'lucide-react';
import { Button } from '../../components/Button';
import { getAlumni } from '../../api/adminService';

export function DataAlumni() {
  const [alumniData, setAlumniData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAlumni = async () => {
      try {
        const response = await getAlumni();
        const data = response.data.data || response.data;
        setAlumniData(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error fetching alumni:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchAlumni();
  }, []);

  return (
    <AdminLayout>
      <div className="p-6 lg:p-8">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Data Alumni</h1>
            <p className="text-gray-500 mt-1">Kelola dan pantau data seluruh alumni yang terdaftar.</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="flex items-center gap-2 bg-white text-gray-700 border-gray-200 hover:bg-[#0F4C3A] hover:text-white hover:border-[#0F4C3A] transition-colors">
              <Download size={16} /> Ekspor Data
            </Button>
          </div>
        </div>

        <div className="bg-white rounded-[20px] shadow-sm border border-gray-100 overflow-hidden">
          
          {/* Toolbar */}
          <div className="p-5 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <div className="flex items-center gap-3 px-4 py-2 bg-gray-50 border border-gray-100 rounded-xl w-full sm:w-72 focus-within:ring-2 focus-within:ring-blue-100 focus-within:border-blue-500 transition-all">
                <Search size={18} className="text-gray-400" />
                <input type="text" placeholder="Cari nama atau NIM..." className="bg-transparent border-none outline-none w-full text-sm" />
              </div>
            </div>
            <div className="flex gap-2">
              <select className="bg-white border border-gray-200 text-sm rounded-xl px-4 py-2.5 outline-none font-medium text-gray-700 hover:bg-gray-50 cursor-pointer">
                <option>Semua Fakultas</option>
                <option>Fakultas Sains dan Teknologi</option>
                <option>Fakultas Pendidikan</option>
              </select>
              <Button variant="outline" className="px-4 border-gray-200 text-gray-600 bg-white hover:bg-[#0F4C3A] hover:text-white hover:border-[#0F4C3A] rounded-xl flex items-center gap-2 transition-colors">
                <Filter size={16} /> Filter
              </Button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/50">
                  <th className="px-6 py-4 font-bold text-gray-900 text-sm border-b border-gray-100">Nama & NIM</th>
                  <th className="px-6 py-4 font-bold text-gray-900 text-sm border-b border-gray-100">Program Studi</th>
                  <th className="px-6 py-4 font-bold text-gray-900 text-sm border-b border-gray-100">Lulus</th>
                  <th className="px-6 py-4 font-bold text-gray-900 text-sm border-b border-gray-100">Status Karir</th>
                  <th className="px-6 py-4 font-bold text-gray-900 text-sm border-b border-gray-100 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {loading ? (
                  <tr><td colSpan="5" className="px-6 py-8 text-center text-gray-500">Memuat data alumni...</td></tr>
                ) : alumniData.length === 0 ? (
                  <tr><td colSpan="5" className="px-6 py-8 text-center text-gray-500">Belum ada data alumni.</td></tr>
                ) : (
                  alumniData.map((alumni) => (
                    <tr key={alumni.id} className="hover:bg-blue-50/30 transition-colors group">
                      <td className="px-6 py-4">
                        <p className="font-bold text-gray-900 text-sm">{alumni.nama_lengkap || alumni.nama}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{alumni.nim}</p>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{alumni.prodi?.nama_prodi || alumni.prodi || '-'}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{alumni.angkatan || alumni.tahun || '-'}</td>
                      <td className="px-6 py-4">
                        <span className="inline-block px-3 py-1 rounded-lg text-xs font-bold bg-emerald-100 text-emerald-700">
                          Terdaftar
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors tooltip relative">
                            <Eye size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          
          {/* Pagination Placeholder */}
          <div className="p-5 border-t border-gray-100 flex items-center justify-between text-sm text-gray-500">
            <p>Menampilkan {alumniData.length} data alumni</p>
            <div className="flex gap-1">
              <button className="px-3 py-1 border border-gray-200 rounded hover:bg-gray-50">Prev</button>
              <button className="px-3 py-1 bg-blue-600 text-white rounded font-medium">1</button>
              <button className="px-3 py-1 border border-gray-200 rounded hover:bg-gray-50">2</button>
              <button className="px-3 py-1 border border-gray-200 rounded hover:bg-gray-50">3</button>
              <button className="px-3 py-1 border border-gray-200 rounded hover:bg-gray-50">Next</button>
            </div>
          </div>

        </div>

      </div>
    </AdminLayout>
  );
}
