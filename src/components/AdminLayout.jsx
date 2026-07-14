import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, Briefcase, Newspaper, Layout, Megaphone, Settings, LogOut, Menu, X, Bell, BookOpen, Database, UserPlus, FileCheck } from 'lucide-react';
import { getAlumni, getSuratIjazah } from '../api/adminService';

export function AdminLayout({ children }) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const [showNotif, setShowNotif] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [hasUnread, setHasUnread] = useState(false);
  const notifRef = useRef(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const [resAlumni, resSurat] = await Promise.all([getAlumni(), getSuratIjazah()]);
        const alumni = resAlumni.data?.data || resAlumni.data || [];
        const surat = resSurat.data?.data || resSurat.data || [];

        const notifs = [];
        
        if (Array.isArray(alumni)) {
          alumni.forEach(a => {
            notifs.push({
              id: `alumni-${a.id_alumni}`,
              type: 'user',
              title: 'Pengguna Baru',
              message: `${a.nama_lengkap} telah mendaftar.`,
              created_at: a.created_at || new Date().toISOString(),
            });
          });
        }

        if (Array.isArray(surat)) {
          surat.forEach(s => {
            if (s.status !== 'Disetujui' && s.status !== 'Ditolak') {
              notifs.push({
                id: `surat-${s.id_ijazah}`,
                type: 'document',
                title: 'Dokumen Baru',
                message: `Status dokumen: ${s.status}.`,
                created_at: s.updated_at || s.created_at || new Date().toISOString(),
              });
            }
          });
        }

        notifs.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        setNotifications(notifs);

        const lastRead = localStorage.getItem('lastNotifRead');
        if (notifs.length > 0) {
          if (!lastRead || new Date(notifs[0].created_at).getTime() > Number(lastRead)) {
            setHasUnread(true);
          }
        }
      } catch (e) {
        console.error(e);
      }
    };

    fetchNotifications();
    const interval = setInterval(fetchNotifications, 10000); // refresh every 10 seconds for real-time feel
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setShowNotif(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleBellClick = () => {
    setShowNotif(!showNotif);
    if (hasUnread) {
      setHasUnread(false);
      localStorage.setItem('lastNotifRead', new Date().getTime().toString());
    }
  };

  const getIcon = (type) => {
    if (type === 'user') return <UserPlus size={16} />;
    if (type === 'document') return <FileCheck size={16} />;
    return <Bell size={16} />;
  };

  const getIconColor = (type) => {
    if (type === 'user') return 'bg-blue-100 text-blue-600';
    if (type === 'document') return 'bg-yellow-100 text-yellow-600';
    return 'bg-gray-100 text-gray-600';
  };

  const menuGroups = [
    {
      title: 'UTAMA',
      items: [
        { name: 'Dashboard', icon: LayoutDashboard, path: '/admin/dashboard' },
        { name: 'Data Alumni', icon: Users, path: '/admin/alumni' },
      ]
    },
    {
      title: 'MANAJEMEN',
      items: [
        { name: 'Lowongan', icon: Briefcase, path: '/admin/lowongan' },
        { name: 'Berita', icon: Newspaper, path: '/admin/berita' },
        { name: 'Info Kampus', icon: Megaphone, path: '/admin/info-kampus' },
        { name: 'Dokumen', icon: BookOpen, path: '/admin/dokumen' },
        { name: 'Master Data', icon: Database, path: '/admin/master-data' },
      ]
    },
    {
      title: 'SISTEM',
      items: [
        { name: 'Notifikasi', icon: Bell, path: '/admin/notifikasi' },
        { name: 'Pengaturan', icon: Settings, path: '/admin/pengaturan' },
      ]
    }
  ];

  const handleLogout = () => navigate('/login');

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex font-sans text-gray-800">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar - Dark Blue Theme for Admin */}
      <aside className={`fixed lg:static inset-y-0 left-0 w-64 bg-[#0F172A] text-white z-50 transform transition-transform duration-300 flex flex-col ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="p-6 border-b border-gray-800 flex items-center justify-between">
          <Link to="/admin/dashboard" className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-black text-sm">
              UN
            </div>
            <div>
              <span className="block font-bold text-lg tracking-tight leading-none">Admin Panel</span>
              <span className="block text-[11px] text-gray-400 mt-1">Portal Alumni</span>
            </div>
          </Link>
          <button className="lg:hidden text-gray-400" onClick={() => setSidebarOpen(false)}><X size={20} /></button>
        </div>
        <div className="flex-1 overflow-y-auto py-6 px-4 space-y-6">
          {menuGroups.map((group, idx) => (
            <div key={idx} className="space-y-1">
              <p className="px-4 text-[11px] font-bold text-gray-500 tracking-wider uppercase mb-2">
                {group.title}
              </p>
              {group.items.map(item => {
                const isActive = location.pathname.startsWith(item.path);
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                      isActive 
                        ? 'bg-blue-600 text-white font-bold shadow-lg shadow-blue-600/20' 
                        : 'text-gray-400 hover:bg-gray-800 hover:text-white font-medium'
                    }`}
                  >
                    <item.icon size={20} className={isActive ? 'text-white' : 'text-gray-400'} />
                    {item.name}
                  </Link>
                );
              })}
            </div>
          ))}
        </div>
        <div className="p-4 border-t border-gray-800">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 w-full text-red-400 hover:bg-red-500/10 rounded-xl transition-colors font-medium text-left"
          >
            <LogOut size={20} /> Keluar
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-gray-100 h-20 flex-shrink-0 flex items-center justify-between px-6 lg:px-10 z-10">
          <div className="flex items-center gap-4">
            <button className="lg:hidden p-2 text-gray-500 hover:bg-gray-100 rounded-lg" onClick={() => setSidebarOpen(true)}>
              <Menu size={24} />
            </button>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative" ref={notifRef}>
              <button 
                onClick={handleBellClick}
                className="relative p-2 text-gray-400 hover:text-blue-600 transition-colors rounded-full hover:bg-blue-50"
              >
                <Bell size={20} />
                {hasUnread && (
                  <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
                )}
              </button>

              {/* Popup Notifikasi */}
              {showNotif && (
                <div className="absolute right-0 mt-3 w-80 sm:w-96 bg-white border border-gray-100 shadow-xl rounded-2xl overflow-hidden z-50">
                  <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                    <h3 className="font-bold text-gray-900">Notifikasi</h3>
                    <span className="text-xs font-medium text-gray-500 bg-gray-200/60 px-2 py-1 rounded-full">{notifications.length} Baru</span>
                  </div>
                  <div className="max-h-[320px] overflow-y-auto divide-y divide-gray-50">
                    {notifications.length === 0 ? (
                      <div className="p-6 text-center text-sm text-gray-500">
                        Belum ada notifikasi
                      </div>
                    ) : (
                      notifications.slice(0, 5).map(notif => (
                        <div key={notif.id} className="p-4 flex gap-3 hover:bg-blue-50/30 transition-colors cursor-pointer">
                          <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${getIconColor(notif.type)}`}>
                            {getIcon(notif.type)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-bold text-gray-900 truncate">{notif.title}</h4>
                            <p className="text-[13px] text-gray-600 line-clamp-2 mt-0.5">{notif.message}</p>
                            <p className="text-[11px] font-medium text-gray-400 mt-1">
                              {new Date(notif.created_at).toLocaleDateString('id-ID', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                            </p>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                  <div className="p-3 border-t border-gray-100 bg-gray-50/50 text-center">
                    <Link to="/admin/notifikasi" onClick={() => setShowNotif(false)} className="text-[13px] font-bold text-blue-600 hover:text-blue-700">
                      Lihat Semua Notifikasi
                    </Link>
                  </div>
                </div>
              )}
            </div>
            <div className="h-8 w-px bg-gray-200 mx-1 md:mx-2"></div>
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-gray-900">Administrator</p>
                <p className="text-xs text-gray-500">Super Admin</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-blue-100 border-2 border-white shadow-sm flex items-center justify-center text-blue-600 font-bold">
                AD
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
