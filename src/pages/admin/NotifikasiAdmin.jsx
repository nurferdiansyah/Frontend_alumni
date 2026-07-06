import React, { useState, useEffect } from 'react';
import { AdminLayout } from '../../components/AdminLayout';
import { Bell, UserPlus, FileCheck, CheckCircle } from 'lucide-react';
import { getAlumni, getSuratIjazah } from '../../api/adminService';

export function NotifikasiAdmin() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNotifications = async () => {
    try {
      const [resAlumni, resSurat] = await Promise.all([getAlumni(), getSuratIjazah()]);
      const alumni = resAlumni.data?.data || resAlumni.data || [];
      const surat = resSurat.data?.data || resSurat.data || [];

      const notifs = [];
      
      // Alumni Baru
      if (Array.isArray(alumni)) {
        alumni.forEach(a => {
          notifs.push({
            id: `alumni-${a.id_alumni}`,
            type: 'user',
            title: 'Pengguna Baru Terdaftar',
            message: `${a.nama_lengkap} (${a.nim}) telah mendaftar ke sistem.`,
            created_at: a.created_at || new Date().toISOString(),
          });
        });
      }

      // Surat Ijazah Baru
      if (Array.isArray(surat)) {
        surat.forEach(s => {
          if (s.status !== 'Disetujui' && s.status !== 'Ditolak') {
            notifs.push({
              id: `surat-${s.id_ijazah}`,
              type: 'document',
              title: 'Notifikasi Dokumen',
              message: `${s.alumni?.nama_lengkap || 'Seorang alumni'} memiliki dokumen dengan status: ${s.status}.`,
              created_at: s.updated_at || s.created_at || new Date().toISOString(),
            });
          }
        });
      }

      // Sort by newest
      notifs.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      
      setNotifications(notifs);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const getIcon = (type) => {
    if (type === 'user') return <UserPlus size={24} />;
    if (type === 'document') return <FileCheck size={24} />;
    return <Bell size={24} />;
  };

  const getIconColor = (type) => {
    if (type === 'user') return 'bg-blue-100 text-blue-600';
    if (type === 'document') return 'bg-yellow-100 text-yellow-600';
    return 'bg-gray-100 text-gray-600';
  };

  return (
    <AdminLayout>
      <div className="p-6 md:p-8 min-h-full">
        <div className="max-w-4xl mx-auto space-y-8">
          
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Pusat Notifikasi</h1>
              <p className="text-gray-500">Pemberitahuan aktivitas sistem dan pengguna.</p>
            </div>
            <button 
              className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
            >
              <CheckCircle size={16} /> Tandai semua dibaca
            </button>
          </div>

          <div className="bg-white rounded-[24px] shadow-sm border border-gray-100 overflow-hidden">
            {loading ? (
              <div className="p-8 text-center text-gray-500 font-medium">Memuat notifikasi...</div>
            ) : notifications.length === 0 ? (
              <div className="p-12 text-center">
                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
                  <Bell size={32} />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">Belum Ada Notifikasi</h3>
                <p className="text-gray-500">Saat ini tidak ada pemberitahuan baru di sistem.</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-50">
                {notifications.map((notif) => (
                  <div 
                    key={notif.id} 
                    className="p-6 flex gap-5 hover:bg-gray-50/50 transition-colors bg-blue-50/20"
                  >
                    <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${getIconColor(notif.type)}`}>
                      {getIcon(notif.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1 mb-1">
                        <h4 className="text-base font-bold text-gray-900">{notif.title}</h4>
                        <span className="text-xs font-bold text-blue-600 bg-blue-100 px-2.5 py-1 rounded-full whitespace-nowrap">
                          Baru
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 leading-relaxed mb-2">{notif.message}</p>
                      <p className="text-xs font-medium text-gray-400">
                        {new Date(notif.created_at).toLocaleDateString('id-ID', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
