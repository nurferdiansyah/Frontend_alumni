import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../../components/Button';
import { JobListItem } from '../../components/JobListItem';
import { Home, User, Briefcase, Settings, Bell, LogOut, Menu, X, Search, CheckCircle, Download } from 'lucide-react';

export function Dashboard() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const menuItems = [
    { name: 'Dashboard', icon: Home, active: true },
    { name: 'Profil Saya', icon: User, active: false },
    { name: 'Lowongan', icon: Briefcase, active: false },
    { name: 'Pengaturan', icon: Settings, active: false },
  ];

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-[#F4F7FA] flex font-sans text-gray-800">
      
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 w-64 bg-white border-r border-gray-100 z-50 transform transition-transform duration-300 flex flex-col ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#0F4C3A] rounded-lg flex items-center justify-center text-white font-black text-sm">
              UN
            </div>
            <span className="font-bold text-xl tracking-tight text-gray-900">Alumni</span>
          </Link>
          <button className="lg:hidden text-gray-500" onClick={() => setSidebarOpen(false)}>
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-6 px-4 space-y-2">
          {menuItems.map(item => (
            <a 
              key={item.name} 
              href="#" 
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${item.active ? 'bg-[#0F4C3A]/10 text-[#0F4C3A] font-bold' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900 font-medium'}`}
            >
              <item.icon size={20} className={item.active ? 'text-[#0F4C3A]' : 'text-gray-400'} />
              {item.name}
            </a>
          ))}
        </div>

        <div className="p-4 border-t border-gray-100">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-red-500 hover:bg-red-50 transition-colors font-medium"
          >
            <LogOut size={20} />
            Keluar
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-gray-100 h-20 px-6 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-4">
            <button className="lg:hidden text-gray-500" onClick={() => setSidebarOpen(true)}>
              <Menu size={24} />
            </button>
            <div className="hidden md:flex items-center bg-gray-50 px-4 py-2.5 rounded-xl border border-gray-200 focus-within:border-[#7FE0B0] focus-within:ring-4 focus-within:ring-[#7FE0B0]/10 transition-all w-80">
              <Search size={18} className="text-gray-400 mr-3" />
              <input type="text" placeholder="Cari lowongan, berita..." className="bg-transparent border-none outline-none w-full text-sm" />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="relative p-2 text-gray-400 hover:text-[#0F4C3A] transition-colors rounded-full hover:bg-gray-100">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="h-8 w-px bg-gray-200 mx-2"></div>
            <Link to="/lengkapi-profil" className="flex items-center gap-3 group">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-gray-900 group-hover:text-[#0F4C3A] transition-colors">Budi Santoso</p>
                <p className="text-xs text-gray-500">Informatika 2026</p>
              </div>
              <div className="w-10 h-10 bg-[#7FE0B0] rounded-full border-2 border-white shadow-sm flex items-center justify-center text-[#0F4C3A] font-bold">
                BS
              </div>
            </Link>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8">
          <div className="max-w-5xl mx-auto space-y-8">
            
            {/* Greeting */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#0F4C3A] rounded-[24px] p-8 md:p-10 text-white relative overflow-hidden shadow-xl"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#7FE0B0]/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
              
              <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <h1 className="text-3xl font-bold mb-2">Selamat pagi, Budi! 👋</h1>
                  <p className="text-white/80">Profil Anda sudah 100% lengkap. Terima kasih telah memperbarui data karir Anda.</p>
                </div>
                <Link to="/lengkapi-profil">
                  <Button variant="outlineWhite" className="bg-white/10 hover:bg-white text-white hover:text-[#0F4C3A] border-white/20 whitespace-nowrap">
                    Edit Profil
                  </Button>
                </Link>
              </div>
            </motion.div>

            {/* Success Card & Download */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white p-10 rounded-[24px] shadow-sm border border-gray-100 flex flex-col items-center text-center max-w-2xl mx-auto mt-10">
              <div className="w-24 h-24 bg-green-50 text-green-500 rounded-full flex items-center justify-center mb-6">
                <CheckCircle size={48} strokeWidth={1.5} />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">Pendataan Berhasil!</h2>
              <p className="text-gray-500 mb-8 max-w-md">
                Terima kasih, data diri Anda telah berhasil disimpan ke dalam sistem Portal Alumni. Anda dapat mengunduh bukti pendataan sebagai laporan.
              </p>
              <Button variant="primary" className="flex items-center gap-3 px-8 py-4 rounded-xl font-bold text-[16px] bg-[#0F4C3A] hover:bg-[#0a3629] text-white shadow-lg hover:-translate-y-1 transition-all">
                <Download size={20} />
                Unduh Bukti Pendataan
              </Button>
            </motion.div>

          </div>
        </div>
      </main>
    </div>
  );
}
