import React, { useState, useEffect } from 'react';
import { Button } from './Button';
import { GraduationCap, Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredAuth, setHoveredAuth] = useState('register');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-sm py-3' : 'bg-white py-5 border-b border-gray-100'}`}>
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          
          <div className="flex items-center gap-3 cursor-pointer">
            <div className="bg-[#F3F4F6] p-2 rounded-xl">
              <GraduationCap className="text-[#0F4C3A] w-6 h-6" />
            </div>
            <span className="font-bold text-[22px] tracking-tight text-[#0F4C3A]">UNUHA Alumni</span>
          </div>

          <div className="hidden md:flex items-center space-x-10">
            <div className="relative">
              <a href="#" className="text-[#0F4C3A] font-semibold transition-colors">Home</a>
              <div className="absolute -bottom-1 left-0 w-full h-[3px] bg-[#0F4C3A] rounded-t-sm"></div>
            </div>
            <a href="#jobs" className="text-gray-500 hover:text-[#0F4C3A] font-medium transition-colors">Jobs</a>
            <a href="#campus" className="text-gray-500 hover:text-[#0F4C3A] font-medium transition-colors">Campus Info</a>
          </div>

          <div 
            className="hidden md:flex items-center p-1 bg-white rounded-2xl"
            onMouseLeave={() => setHoveredAuth('register')}
          >
            {['login', 'register'].map((item) => (
              <a 
                href="#"
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
              </a>
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
            <a href="#" className="block px-3 py-2 text-base font-medium text-[#0F4C3A] bg-gray-50 rounded-md">Home</a>
            <a href="#jobs" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-[#0F4C3A] hover:bg-gray-50 rounded-md">Jobs</a>
            <a href="#campus" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-[#0F4C3A] hover:bg-gray-50 rounded-md">Campus Info</a>
            <div className="mt-4 pt-4 border-t border-gray-100 flex flex-col gap-3 px-3">
              <Button variant="outline" className="w-full">Login</Button>
              <Button variant="primary" className="w-full">Register</Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
