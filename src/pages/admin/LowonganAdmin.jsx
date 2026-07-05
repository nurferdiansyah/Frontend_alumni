import React, { useState } from 'react';
import { AdminLayout } from '../../components/AdminLayout';
import { Search, Plus, Filter, MoreVertical, Edit, Trash2 } from 'lucide-react';
import { Button } from '../../components/Button';

export function LowonganAdmin() {
  const [jobs] = useState([
    { id: 1, posisi: 'Senior Software Engineer', perusahaan: 'PT. Teknologi Maju Bersama', tipe: 'Penuh Waktu', deadline: '20 Nov 2026', status: 'Aktif', statusColor: 'bg-emerald-100 text-emerald-700' },
    { id: 2, posisi: 'Management Trainee', perusahaan: 'Bank Mandiri', tipe: 'Penuh Waktu', deadline: '15 Nov 2026', status: 'Aktif', statusColor: 'bg-emerald-100 text-emerald-700' },
    { id: 3, posisi: 'Data Analyst', perusahaan: 'PT. Telekomunikasi Indonesia', tipe: 'Magang', deadline: '10 Nov 2026', status: 'Tutup', statusColor: 'bg-gray-100 text-gray-700' },
  ]);

  return (
    <AdminLayout>
      <div className="p-6 lg:p-8">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Manajemen Lowongan</h1>
            <p className="text-gray-500 mt-1">Kelola informasi lowongan pekerjaan untuk mahasiswa.</p>
          </div>
          <div className="flex gap-3">
            <Button variant="primary" className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 shadow-md">
              <Plus size={16} /> Tambah Lowongan
            </Button>
          </div>
        </div>

        <div className="bg-white rounded-[20px] shadow-sm border border-gray-100 overflow-hidden">
          
          <div className="p-5 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3 px-4 py-2 bg-gray-50 border border-gray-100 rounded-xl w-full sm:w-72 focus-within:ring-2 focus-within:ring-blue-100 focus-within:border-blue-500 transition-all">
              <Search size={18} className="text-gray-400" />
              <input type="text" placeholder="Cari posisi atau perusahaan..." className="bg-transparent border-none outline-none w-full text-sm" />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="px-4 border-gray-200 text-gray-600 bg-white hover:bg-[#0F4C3A] hover:text-white hover:border-[#0F4C3A] rounded-xl flex items-center gap-2 transition-colors">
                <Filter size={16} /> Filter
              </Button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/50">
                  <th className="px-6 py-4 font-bold text-gray-900 text-sm border-b border-gray-100">Posisi & Perusahaan</th>
                  <th className="px-6 py-4 font-bold text-gray-900 text-sm border-b border-gray-100">Tipe</th>
                  <th className="px-6 py-4 font-bold text-gray-900 text-sm border-b border-gray-100">Batas Waktu</th>
                  <th className="px-6 py-4 font-bold text-gray-900 text-sm border-b border-gray-100">Status</th>
                  <th className="px-6 py-4 font-bold text-gray-900 text-sm border-b border-gray-100 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {jobs.map((job) => (
                  <tr key={job.id} className="hover:bg-blue-50/30 transition-colors group">
                    <td className="px-6 py-4">
                      <p className="font-bold text-gray-900 text-sm">{job.posisi}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{job.perusahaan}</p>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{job.tipe}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{job.deadline}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-block px-3 py-1 rounded-lg text-xs font-bold ${job.statusColor}`}>
                        {job.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                          <Edit size={18} />
                        </button>
                        <button className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
        </div>
      </div>
    </AdminLayout>
  );
}
