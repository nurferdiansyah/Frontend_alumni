import React, { useState, useEffect } from 'react';
import { AdminLayout } from '../../components/AdminLayout';
import { Search, Plus, Filter, Edit, Trash2, Eye } from 'lucide-react';
import { Button } from '../../components/Button';
import { getInfo } from '../../api/publicService';

export function InfoKampusAdmin() {
  const [infoList, setInfoList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const response = await getInfo();
        const data = response.data.data || response.data;
        setInfoList(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error fetching info:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchInfo();
  }, []);

  return (
    <AdminLayout>
      <div className="p-6 lg:p-8">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Manajemen Info Kampus</h1>
            <p className="text-gray-500 mt-1">Tambah, edit, dan hapus informasi atau pengumuman kampus.</p>
          </div>
          <div className="flex gap-3">
            <Button variant="primary" className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 shadow-md">
              <Plus size={16} /> Tambah Info Baru
            </Button>
          </div>
        </div>

        <div className="bg-white rounded-[20px] shadow-sm border border-gray-100 overflow-hidden">
          
          <div className="p-5 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3 px-4 py-2 bg-gray-50 border border-gray-100 rounded-xl w-full sm:w-72 focus-within:ring-2 focus-within:ring-blue-100 focus-within:border-blue-500 transition-all">
              <Search size={18} className="text-gray-400" />
              <input type="text" placeholder="Cari info kampus..." className="bg-transparent border-none outline-none w-full text-sm" />
            </div>
            <div className="flex gap-2">
              <select className="bg-white border border-gray-200 text-sm rounded-xl px-4 py-2.5 outline-none font-medium text-gray-700 cursor-pointer">
                <option>Semua Tipe</option>
                <option>Pengumuman</option>
                <option>Panduan</option>
                <option>Informasi</option>
              </select>
              <Button variant="outline" className="px-4 border-gray-200 text-gray-600 bg-white hover:bg-[#0F4C3A] hover:text-white hover:border-[#0F4C3A] rounded-xl flex items-center gap-2 transition-colors">
                <Filter size={16} /> Filter
              </Button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/50">
                  <th className="px-6 py-4 font-bold text-gray-900 text-sm border-b border-gray-100">Judul Informasi</th>
                  <th className="px-6 py-4 font-bold text-gray-900 text-sm border-b border-gray-100">Tipe</th>
                  <th className="px-6 py-4 font-bold text-gray-900 text-sm border-b border-gray-100">Tanggal Posting</th>
                  <th className="px-6 py-4 font-bold text-gray-900 text-sm border-b border-gray-100">Status</th>
                  <th className="px-6 py-4 font-bold text-gray-900 text-sm border-b border-gray-100 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {loading ? (
                  <tr><td colSpan="5" className="px-6 py-8 text-center text-gray-500">Memuat data info...</td></tr>
                ) : infoList.length === 0 ? (
                  <tr><td colSpan="5" className="px-6 py-8 text-center text-gray-500">Belum ada info kampus.</td></tr>
                ) : (
                  infoList.map((item) => (
                    <tr key={item.id} className="hover:bg-blue-50/30 transition-colors group">
                      <td className="px-6 py-4">
                        <p className="font-bold text-gray-900 text-sm max-w-md truncate">{item.title || item.judul}</p>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{item.type || item.tipe || '-'}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{item.created_at ? new Date(item.created_at).toLocaleDateString('id-ID') : '-'}</td>
                      <td className="px-6 py-4">
                        <span className="inline-block px-3 py-1 rounded-lg text-xs font-bold bg-emerald-100 text-emerald-700">
                          Aktif
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors tooltip relative">
                            <Eye size={18} />
                          </button>
                          <button className="p-2 text-orange-500 hover:bg-orange-50 rounded-lg transition-colors">
                            <Edit size={18} />
                          </button>
                          <button className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          
        </div>
      </div>
    </AdminLayout>
  );
}
