import React, { useState, useEffect } from 'react';
import { Button } from './Button';
import { GraduationCap, Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredAuth, setHoveredAuth] = useState('daftar');
  const location = useLocation();

  const navLinks = [
    { name: 'Beranda', path: '/' },
    { name: 'Visi & Misi', path: '/visi-misi' },
    { name: 'Info Kampus', path: '/campus' },
    { name: 'Berita', path: '/berita' },
    { name: 'Lowongan', path: '/jobs' },
    { name: 'Kontak', path: '/kontak' }
  ];

  return (
    <nav className="absolute w-full z-50 bg-white py-5 border-b border-gray-100">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">

          <div className="flex items-center gap-3 cursor-pointer">
            <div className="bg-[#F3F4F6] p-2 rounded-xl">
              <GraduationCap className="text-[#0F4C3A] w-6 h-6" />
            </div>
            <span className="font-bold text-[22px] tracking-tight text-[#0F4C3A]">UNUHA Alumni</span>
          </div>

          <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <div key={link.name} className="relative">
                  <Link to={link.path} className={`font-semibold text-[15px] transition-colors ${isActive ? 'text-[#0F4C3A]' : 'text-gray-500 hover:text-[#0F4C3A]'}`}>
                    {link.name}
                  </Link>
                  {isActive && <div className="absolute -bottom-1 left-0 w-full h-[3px] bg-[#0F4C3A] rounded-t-sm"></div>}
                </div>
              );
            })}
          </div>

          <div
            className="hidden md:flex items-center p-1 bg-white rounded-2xl"
            onMouseLeave={() => setHoveredAuth('daftar')}
          >
            {['masuk', 'daftar'].map((item) => (
              <Link
                to={item === 'masuk' ? '/login' : '/register'}
                key={item}
                className="relative"
                onMouseEnter={() => setHoveredAuth(item)}
              >
                <div className={`relative z-10 px-6 py-2.5 text-[14px] font-semibold transition-colors duration-300 capitalize ${hoveredAuth === item ? 'text-white' : 'text-gray-700 hover:text-[#0F4C3A]'}`}>
                  {item}
                </div>
                {hoveredAuth === item && (
                  <motion.div
                    layoutId="auth-background"
                    className="absolute inset-0 bg-[#0F4C3A] rounded-xl shadow-sm"
                    initial={false}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-gray-600">
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 absolute w-full shadow-lg">
          <div className="px-4 pt-2 pb-4 space-y-1">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link key={link.name} to={link.path} onClick={() => setIsMobileMenuOpen(false)} className={`block px-3 py-2 text-base font-medium rounded-md ${isActive ? 'text-[#0F4C3A] bg-gray-50' : 'text-gray-700 hover:text-[#0F4C3A] hover:bg-gray-50'}`}>
                  {link.name}
                </Link>
              );
            })}
            <div className="mt-4 pt-4 border-t border-gray-100 flex flex-col gap-3 px-3">
              <Link to="/login">
                <Button variant="outline" className="w-full">Masuk</Button>
              </Link>
              <Link to="/register">
                <Button variant="primary" className="w-full">Daftar</Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
