import React, { useState, useEffect } from 'react';
import { StudentLayout } from '../../components/StudentLayout';
import { CheckCircle, Briefcase, Bell, Info, AlertTriangle, XCircle } from 'lucide-react';
import { Button } from '../../components/Button';
import { getNotifications, markAsRead, markAllAsRead } from '../../api/notificationService';

export function Notifikasi() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNotifications = async () => {
    try {
      const res = await getNotifications();
      setNotifications(res.data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const handleMarkAsRead = async (id) => {
    try {
      await markAsRead(id);
      setNotifications(notifications.map(n => n.id === id ? { ...n, is_read: true } : n));
    } catch (e) {
      console.error(e);
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      await markAllAsRead();
      setNotifications(notifications.map(n => ({ ...n, is_read: true })));
    } catch (e) {
      console.error(e);
    }
  };

  const getIcon = (type) => {
    switch (type) {
      case 'success': return <CheckCircle size={24} />;
      case 'warning': return <AlertTriangle size={24} />;
      case 'error': return <XCircle size={24} />;
      default: return <Info size={24} />;
    }
  };

  const getIconColor = (type) => {
    switch (type) {
      case 'success': return 'bg-green-100 text-green-600';
      case 'warning': return 'bg-yellow-100 text-yellow-600';
      case 'error': return 'bg-red-100 text-red-600';
      default: return 'bg-blue-100 text-blue-600';
    }
  };

  return (
    <StudentLayout>
      <div className="p-6 md:p-8 min-h-full">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="mb-8 flex justify-between items-end">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Notifikasi</h1>
              <p className="text-gray-500">Pemberitahuan dan aktivitas terbaru Anda.</p>
            </div>
            {notifications.some(n => !n.is_read) && (
              <button 
                onClick={handleMarkAllAsRead}
                className="text-sm font-bold text-[#0F4C3A] hover:underline"
              >
                Tandai semua dibaca
              </button>
            )}
          </div>

          <div className="bg-white rounded-[24px] shadow-sm border border-gray-100 overflow-hidden">
            {loading ? (
              <div className="p-8 text-center text-gray-500">Memuat notifikasi...</div>
            ) : notifications.length === 0 ? (
              <div className="p-8 text-center text-gray-500">Belum ada notifikasi</div>
            ) : (
              notifications.map((notif, idx) => (
                <div 
                  key={notif.id} 
                  onClick={() => !notif.is_read && handleMarkAsRead(notif.id)}
                  className={`p-6 border-b border-gray-100 hover:bg-gray-50 transition-colors flex gap-5 cursor-pointer ${!notif.is_read ? 'bg-blue-50/20' : ''}`}
                >
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${getIconColor(notif.type)}`}>
                    {getIcon(notif.type)}
                  </div>
                  <div>
                    <p className={`text-lg mb-1 ${!notif.is_read ? 'text-gray-900 font-bold' : 'text-gray-600 font-semibold'}`}>
                      {notif.title}
                    </p>
                    <p className="text-gray-600 leading-relaxed mb-3">{notif.message}</p>
                    <p className="text-sm text-gray-400 font-medium">
                      {new Date(notif.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
          
        </div>
      </div>
    </StudentLayout>
  );
}
