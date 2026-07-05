import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Home, User, Briefcase, Settings, LogOut, Menu, X, Search, Bell } from 'lucide-react';

export function StudentLayout({ children }) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { name: 'Dashboard', icon: Home, path: '/dashboard' },
    { name: 'Profil Saya', icon: User, path: '/profil-saya' },
    { name: 'Lowongan', icon: Briefcase, path: '/dashboard/lowongan' },
    { name: 'Pengaturan', icon: Settings, path: '#' },
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
        <div className="flex-1 overflow-y-auto py-6 px-4 space-y-2">
          {menuItems.map(item => {
            const isActive = location.pathname === item.path || (location.pathname === '/' && item.path === '/dashboard');
            return (
              <Link key={item.name} to={item.path} className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${isActive ? 'bg-[#0F4C3A]/10 text-[#0F4C3A] font-bold' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900 font-medium'}`}>
                <item.icon size={20} className={isActive ? 'text-[#0F4C3A]' : 'text-gray-400'} />
                {item.name}
              </Link>
            );
          })}
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
            <div className="hidden md:flex items-center bg-gray-50 px-4 py-2.5 rounded-xl border border-gray-200 focus-within:border-[#7FE0B0] focus-within:ring-4 focus-within:ring-[#7FE0B0]/10 transition-all w-80">
              <Search size={18} className="text-gray-400 mr-3" />
              <input type="text" placeholder="Cari..." className="bg-transparent border-none outline-none w-full text-sm" />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative p-2 text-gray-400 hover:text-[#0F4C3A] transition-colors rounded-full hover:bg-gray-100">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="h-8 w-px bg-gray-200 mx-2"></div>
            <Link to="/profil-saya" className="flex items-center gap-3 group">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-gray-900 group-hover:text-[#0F4C3A] transition-colors">Budi Santoso</p>
                <p className="text-xs text-gray-500">Informatika 2026</p>
              </div>
              <div className="w-10 h-10 bg-[#7FE0B0] rounded-full border-2 border-white shadow-sm flex items-center justify-center text-[#0F4C3A] font-bold">BS</div>
            </Link>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
