import React, { useState, useEffect } from 'react';
import { Button } from './Button';
import { GraduationCap, Menu, X } from 'lucide-react';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-sm py-3' : 'bg-white/95 py-4 border-b border-gray-100'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer">
            <div className="bg-[#0F4C3A] p-2 rounded-lg">
              <GraduationCap className="text-white w-6 h-6" />
            </div>
            <span className="font-bold text-xl text-[#0F4C3A]">UNUHA Alumni</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-gray-600 hover:text-[#0F4C3A] font-medium transition-colors">Home</a>
            <a href="#jobs" className="text-gray-600 hover:text-[#0F4C3A] font-medium transition-colors">Jobs</a>
            <a href="#campus" className="text-gray-600 hover:text-[#0F4C3A] font-medium transition-colors">Campus Info</a>
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <a href="#" className="font-medium text-[#0F4C3A] hover:text-[#0a3629] transition-colors">Login</a>
            <Button variant="primary">Register</Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-gray-600">
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 absolute w-full shadow-lg">
          <div className="px-4 pt-2 pb-4 space-y-1">
            <a href="#" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-[#0F4C3A] hover:bg-gray-50 rounded-md">Home</a>
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
