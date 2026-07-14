import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Home, User, Briefcase, Settings, LogOut, Menu, X, Bell, CheckCircle, Info, AlertTriangle, XCircle } from 'lucide-react';
import { getProfile } from '../api/alumniService';
import { getNotifications } from '../api/notificationService';

export function StudentLayout({ children }) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isCheckingProfile, setIsCheckingProfile] = useState(true);
  const [userData, setUserData] = useState({ name: 'Alumni', prodi: '', angkatan: '', initials: 'AL', foto_profil: null });
  
  const [showNotif, setShowNotif] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [hasUnread, setHasUnread] = useState(false);
  const notifRef = useRef(null);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchNotifs = async () => {
      try {
        const res = await getNotifications();
        const notifs = res.data || [];
        setNotifications(notifs);
        
        const unreadNotifs = notifs.filter(n => !n.is_read);
        const seenIds = JSON.parse(localStorage.getItem('alumniSeenNotifs') || '[]');
        
        const hasNewUnseen = unreadNotifs.some(n => !seenIds.includes(n.id));
        if (hasNewUnseen) {
          setHasUnread(true);
        } else {
          setHasUnread(false);
        }
      } catch (e) {
        console.error(e);
      }
    };

    fetchNotifs();
    const interval = setInterval(fetchNotifs, 10000); // 10 detik polling
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
      const unreadIds = notifications.filter(n => !n.is_read).map(n => n.id);
      
      // Gabungkan dengan yang sudah pernah dilihat agar tidak hilang jika ada banyak
      const seenIds = JSON.parse(localStorage.getItem('alumniSeenNotifs') || '[]');
      const newSeenIds = Array.from(new Set([...seenIds, ...unreadIds]));
      
      localStorage.setItem('alumniSeenNotifs', JSON.stringify(newSeenIds));
    }
  };

  const getNotifIcon = (type) => {
    switch (type) {
      case 'success': return <CheckCircle size={16} />;
      case 'warning': return <AlertTriangle size={16} />;
      case 'error': return <XCircle size={16} />;
      default: return <Info size={16} />;
    }
  };

  const getNotifIconColor = (type) => {
    switch (type) {
      case 'success': return 'bg-green-100 text-green-600';
      case 'warning': return 'bg-yellow-100 text-yellow-600';
      case 'error': return 'bg-red-100 text-red-600';
      default: return 'bg-blue-100 text-blue-600';
    }
  };

  useEffect(() => {
    const checkProfileCompleteness = async () => {
      try {
        const response = await getProfile();
        const data = response.data.data || response.data;
        
        if (!data.alamat || !data.angkatan || !data.nomor_telepon || !data.nama_lengkap || !data.nim) {
          navigate('/lengkapi-profil');
          return;
        }

        const name = data.nama_lengkap || 'Alumni';
        const nameParts = name.split(' ');
        let initials = nameParts[0].charAt(0);
        if (nameParts.length > 1) {
          initials += nameParts[1].charAt(0);
        }

        setUserData({
          name: name,
          prodi: data.prodi?.nama_prodi || '',
          angkatan: data.angkatan || '',
          initials: initials.toUpperCase(),
          foto_profil: data.foto_profil || localStorage.getItem('foto_profil')
        });
      } catch (error) {
        console.error('Gagal mengecek profil:', error);
      } finally {
        setIsCheckingProfile(false);
      }
    };
    
    checkProfileCompleteness();
  }, [navigate]);

  const menuGroups = [
    {
      title: 'UTAMA',
      items: [
        { name: 'Dashboard', icon: Home, path: '/dashboard' },
        { name: 'Profil Saya', icon: User, path: '/profil-saya' },
      ]
    },
    {
      title: 'MANAJEMEN',
      items: [
        { name: 'Lowongan', icon: Briefcase, path: '/dashboard/lowongan' },
        { name: 'Notifikasi', icon: Bell, path: '/dashboard/notifikasi' },
      ]
    },
    {
      title: 'SISTEM',
      items: [
        { name: 'Pengaturan', icon: Settings, path: '/dashboard/pengaturan' },
      ]
    }
  ];

  const handleLogout = () => navigate('/login');

  return (
    <div className="min-h-screen bg-[#F4F7FA] flex font-sans text-gray-800">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 w-64 bg-white border-r border-gray-100 z-50 transform transition-transform duration-300 flex flex-col ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#0F4C3A] rounded-lg flex items-center justify-center text-white font-black text-sm">UN</div>
            <span className="font-bold text-xl tracking-tight text-gray-900">Alumni</span>
          </Link>
          <button className="lg:hidden text-gray-500" onClick={() => setSidebarOpen(false)}><X size={20} /></button>
        </div>
        <div className="flex-1 overflow-y-auto py-6 px-4 space-y-6">
          {menuGroups.map((group, idx) => (
            <div key={idx} className="space-y-1">
              <p className="px-4 text-[11px] font-bold text-gray-400 tracking-wider uppercase mb-2">
                {group.title}
              </p>
              {group.items.map(item => {
                const isActive = location.pathname === item.path || (location.pathname === '/' && item.path === '/dashboard');
                return (
                  <Link key={item.name} to={item.path} className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${isActive ? 'bg-[#0F4C3A]/10 text-[#0F4C3A] font-bold' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900 font-medium'}`}>
                    <item.icon size={20} className={isActive ? 'text-[#0F4C3A]' : 'text-gray-400'} />
                    {item.name}
                  </Link>
                );
              })}
            </div>
          ))}
        </div>
        <div className="p-4 border-t border-gray-100">
          <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-red-500 hover:bg-red-50 transition-colors font-medium">
            <LogOut size={20} /> Keluar
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-gray-100 h-20 px-6 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-4">
            <button className="lg:hidden text-gray-500" onClick={() => setSidebarOpen(true)}><Menu size={24} /></button>
          </div>
          <div className="flex items-center gap-2 md:gap-4 relative">
            <div className="relative" ref={notifRef}>
              <button 
                onClick={handleBellClick}
                className="relative p-2 text-gray-400 hover:text-[#0F4C3A] transition-colors rounded-full hover:bg-[#7FE0B0]/20"
              >
                <Bell size={20} />
                {hasUnread && (
                  <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
                )}
              </button>

              {showNotif && (
                <div className="absolute right-0 mt-3 w-80 sm:w-96 bg-white border border-gray-100 shadow-xl rounded-2xl overflow-hidden z-50">
                  <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                    <h3 className="font-bold text-gray-900">Notifikasi</h3>
                    <span className="text-xs font-medium text-gray-500 bg-gray-200/60 px-2 py-1 rounded-full">{notifications.filter(n => !n.is_read).length} Baru</span>
                  </div>
                  <div className="max-h-[320px] overflow-y-auto divide-y divide-gray-50">
                    {notifications.length === 0 ? (
                      <div className="p-6 text-center text-sm text-gray-500">Belum ada notifikasi</div>
                    ) : (
                      notifications.slice(0, 5).map(notif => (
                        <div key={notif.id} className={`p-4 flex gap-3 transition-colors cursor-pointer ${!notif.is_read ? 'bg-blue-50/20 hover:bg-blue-50/40' : 'hover:bg-gray-50'}`}>
                          <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${getNotifIconColor(notif.type)}`}>
                            {getNotifIcon(notif.type)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className={`text-sm truncate ${!notif.is_read ? 'font-bold text-gray-900' : 'font-semibold text-gray-700'}`}>{notif.title}</h4>
                            <p className="text-[13px] text-gray-600 line-clamp-2 mt-0.5">{notif.message}</p>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                  <div className="p-3 border-t border-gray-100 bg-gray-50/50 text-center">
                    <Link to="/dashboard/notifikasi" onClick={() => setShowNotif(false)} className="text-[13px] font-bold text-[#0F4C3A] hover:text-[#0a3629]">
                      Lihat Semua Notifikasi
                    </Link>
                  </div>
                </div>
              )}
            </div>
            
            <div className="h-8 w-px bg-gray-200 mx-1 md:mx-2"></div>
            <Link to="/profil-saya" className="flex items-center gap-3 group">
              <div className="text-right hidden sm:block">
                {isCheckingProfile ? (
                  <div className="flex flex-col items-end gap-1.5">
                    <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-3 w-16 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                ) : (
                  <>
                    <p className="text-sm font-bold text-gray-900 group-hover:text-[#0F4C3A] transition-colors">{userData.name}</p>
                    <p className="text-xs text-gray-500">{userData.prodi} {userData.angkatan}</p>
                  </>
                )}
              </div>
              <div className={`w-10 h-10 ${isCheckingProfile ? 'bg-gray-200 animate-pulse' : 'bg-[#7FE0B0]'} rounded-full border-2 border-white shadow-sm flex items-center justify-center text-[#0F4C3A] font-bold overflow-hidden relative`}>
                {!isCheckingProfile && (
                  userData.foto_profil ? (
                    <img src={userData.foto_profil} alt="Avatar" className="w-full h-full object-cover absolute inset-0" />
                  ) : (
                    userData.initials
                  )
                )}
              </div>
            </Link>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {isCheckingProfile ? (
            <div className="h-full flex items-center justify-center">
              <div className="flex flex-col items-center text-gray-500">
                <div className="w-8 h-8 border-4 border-[#7FE0B0] border-t-[#0F4C3A] rounded-full animate-spin mb-3"></div>
                <p className="font-medium text-sm">Memuat data...</p>
              </div>
            </div>
          ) : (
            children
          )}
        </div>
      </main>
    </div>
  );
}
