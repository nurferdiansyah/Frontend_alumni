import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Eye, EyeOff, Mail, Lock } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '../components/Button';
import { useNavigate } from 'react-router-dom';

export function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex bg-white font-sans text-gray-800">
      {/* Left Side - Image & Branding (Hidden on mobile) */}
      <div className="hidden lg:flex w-1/2 bg-[#0F4C3A] relative overflow-hidden items-center justify-center flex-col p-16">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#7FE0B0]/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#18755C]/40 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3 pointer-events-none"></div>
        
        <div className="relative z-10 w-full max-w-lg text-white">
          <Link to="/" className="inline-block mb-12 opacity-80 hover:opacity-100 transition-opacity">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-[#0F4C3A] font-black text-xl shadow-lg">
                UN
              </div>
              <span className="font-bold text-2xl tracking-tight">Portal Alumni</span>
            </div>
          </Link>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight text-white">
              Selamat Datang <br /> <span className="text-[#7FE0B0]">Kembali.</span>
            </h1>
            <p className="text-white/80 text-lg leading-relaxed mb-10 max-w-md">
              Akses akun Anda untuk terhubung dengan ribuan alumni, mencari lowongan pekerjaan, dan melihat kabar terbaru kampus.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 relative">
        <div className="absolute top-8 left-8 lg:hidden">
          <Link to="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-[#0F4C3A] font-medium transition-colors group">
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            Kembali
          </Link>
        </div>

        <div className="w-full max-w-md relative mt-12 lg:mt-0">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-10 text-center lg:text-left">
              <h2 className="text-3xl font-bold text-gray-900 mb-3">Masuk ke Akun</h2>
              <p className="text-gray-500">Silakan masukkan email dan kata sandi Anda.</p>
            </div>

            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Email</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-[#0F4C3A] transition-colors">
                    <Mail size={20} />
                  </div>
                  <input 
                    type="email" 
                    placeholder="nama@email.com" 
                    className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:border-[#7FE0B0] focus:ring-4 focus:ring-[#7FE0B0]/10 transition-all text-gray-800"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Kata Sandi</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-[#0F4C3A] transition-colors">
                    <Lock size={20} />
                  </div>
                  <input 
                    type={showPassword ? "text" : "password"} 
                    placeholder="Masukkan kata sandi" 
                    className="w-full pl-12 pr-12 py-3.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:border-[#7FE0B0] focus:ring-4 focus:ring-[#7FE0B0]/10 transition-all text-gray-800"
                    required
                  />
                  <div 
                    className="absolute inset-y-0 right-0 pr-4 flex items-center cursor-pointer text-gray-400 hover:text-[#0F4C3A] transition-colors"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center">
                  <input type="checkbox" id="remember" className="w-4 h-4 rounded text-[#0F4C3A] focus:ring-[#0F4C3A] cursor-pointer" />
                  <label htmlFor="remember" className="ml-2 text-sm text-gray-600 cursor-pointer">Ingat saya</label>
                </div>
                <a href="#" className="text-sm font-bold text-[#0F4C3A] hover:text-[#7FE0B0] transition-colors">Lupa sandi?</a>
              </div>

              <Button type="button" onClick={() => navigate('/lengkapi-profil')} variant="primary" className="w-full py-4 rounded-xl text-[16px] font-bold shadow-lg shadow-[#0F4C3A]/20 bg-[#0F4C3A] hover:bg-[#0a3629] hover:-translate-y-1 transition-all text-white">
                Masuk Sekarang
              </Button>
            </form>

            <div className="mt-10 text-center">
              <p className="text-gray-600">
                Belum punya akun? <a href="#" className="font-bold text-[#0F4C3A] hover:text-[#7FE0B0] transition-colors">Daftar di sini</a>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
