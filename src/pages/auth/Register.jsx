import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Eye, EyeOff, Mail, Lock, User, Hash, Phone, MapPin, Building, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '../../components/Button';
import axiosInstance from '../../api/axiosInstance';

export function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    password_confirmation: '',
    id_prodi: '1', // Default, should ideally be fetched from API
    nim: '',
    nama_lengkap: '',
    angkatan: '',
    nomor_telepon: '',
    alamat: ''
  });

  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      // Menyesuaikan payload ke API register
      const response = await axiosInstance.post('/auth/register', formData);
      
      // Biasanya kembalian berupa token
      if (response.data.access_token) {
        localStorage.setItem('access_token', response.data.access_token);
        localStorage.setItem('role', 'alumni');
        navigate('/lengkapi-profil'); // Arahkan sesuai kebutuhan setelah register
      } else {
        // Jika hanya berhasil buat akun tapi butuh login manual
        navigate('/login');
      }
    } catch (err) {
      if (err.response && err.response.data && err.response.data.errors) {
        // Handle Laravel validation errors
        const errorMessages = Object.values(err.response.data.errors).flat().join(', ');
        setError(errorMessages);
      } else {
        setError('Terjadi kesalahan saat mendaftar. Silakan coba lagi.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-white font-sans text-gray-800">
      {/* Left Side - Image & Branding (Hidden on mobile) */}
      <div className="hidden lg:flex w-1/2 bg-[#0F4C3A] relative overflow-hidden items-center justify-center flex-col p-16 fixed top-0 bottom-0 left-0">
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
              Bergabunglah <br /> <span className="text-[#7FE0B0]">Sekarang.</span>
            </h1>
            <p className="text-white/80 text-lg leading-relaxed mb-10 max-w-md">
              Buat akun Anda untuk terhubung dengan ribuan alumni, mencari lowongan pekerjaan, dan melihat kabar terbaru kampus.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Right Side - Register Form */}
      <div className="w-full lg:w-1/2 lg:ml-[50%] flex items-center justify-center p-6 sm:p-12 relative min-h-screen overflow-y-auto">
        <div className="absolute top-8 left-8 lg:hidden">
          <Link to="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-[#0F4C3A] font-medium transition-colors group">
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            Kembali
          </Link>
        </div>

        <div className="w-full max-w-md relative mt-12 lg:mt-0 py-10">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-8 text-center lg:text-left">
              <h2 className="text-3xl font-bold text-gray-900 mb-3">Daftar Akun</h2>
              <p className="text-gray-500">Lengkapi form di bawah ini untuk membuat akun baru.</p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-r-md">
                <p className="font-medium text-sm">{error}</p>
              </div>
            )}

            <form className="space-y-5" onSubmit={handleSubmit}>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Username</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-[#0F4C3A] transition-colors">
                      <User size={18} />
                    </div>
                    <input 
                      type="text" name="username" value={formData.username} onChange={handleChange}
                      placeholder="Username" 
                      className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:border-[#7FE0B0] focus:ring-4 focus:ring-[#7FE0B0]/10 transition-all text-gray-800 text-sm"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Email</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-[#0F4C3A] transition-colors">
                      <Mail size={18} />
                    </div>
                    <input 
                      type="email" name="email" value={formData.email} onChange={handleChange}
                      placeholder="Email" 
                      className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:border-[#7FE0B0] focus:ring-4 focus:ring-[#7FE0B0]/10 transition-all text-gray-800 text-sm"
                      required
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Nama Lengkap</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-[#0F4C3A] transition-colors">
                    <User size={18} />
                  </div>
                  <input 
                    type="text" name="nama_lengkap" value={formData.nama_lengkap} onChange={handleChange}
                    placeholder="Nama Lengkap" 
                    className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:border-[#7FE0B0] focus:ring-4 focus:ring-[#7FE0B0]/10 transition-all text-gray-800 text-sm"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">NIM</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-[#0F4C3A] transition-colors">
                      <Hash size={18} />
                    </div>
                    <input 
                      type="text" name="nim" value={formData.nim} onChange={handleChange}
                      placeholder="Nomor Induk Mahasiswa" 
                      className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:border-[#7FE0B0] focus:ring-4 focus:ring-[#7FE0B0]/10 transition-all text-gray-800 text-sm"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Angkatan</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-[#0F4C3A] transition-colors">
                      <Calendar size={18} />
                    </div>
                    <input 
                      type="text" name="angkatan" value={formData.angkatan} onChange={handleChange}
                      placeholder="Misal: 2020" 
                      className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:border-[#7FE0B0] focus:ring-4 focus:ring-[#7FE0B0]/10 transition-all text-gray-800 text-sm"
                      required
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Program Studi (ID)</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-[#0F4C3A] transition-colors">
                    <Building size={18} />
                  </div>
                  <input 
                    type="number" name="id_prodi" value={formData.id_prodi} onChange={handleChange}
                    placeholder="ID Prodi" 
                    className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:border-[#7FE0B0] focus:ring-4 focus:ring-[#7FE0B0]/10 transition-all text-gray-800 text-sm"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Kata Sandi</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-[#0F4C3A] transition-colors">
                    <Lock size={18} />
                  </div>
                  <input 
                    type={showPassword ? "text" : "password"} name="password" value={formData.password} onChange={handleChange}
                    placeholder="Masukkan kata sandi" 
                    className="w-full pl-11 pr-12 py-3.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:border-[#7FE0B0] focus:ring-4 focus:ring-[#7FE0B0]/10 transition-all text-gray-800 text-sm"
                    required
                  />
                  <div 
                    className="absolute inset-y-0 right-0 pr-4 flex items-center cursor-pointer text-gray-400 hover:text-[#0F4C3A] transition-colors"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Konfirmasi Kata Sandi</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-[#0F4C3A] transition-colors">
                    <Lock size={18} />
                  </div>
                  <input 
                    type={showPasswordConfirm ? "text" : "password"} name="password_confirmation" value={formData.password_confirmation} onChange={handleChange}
                    placeholder="Konfirmasi kata sandi" 
                    className="w-full pl-11 pr-12 py-3.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:border-[#7FE0B0] focus:ring-4 focus:ring-[#7FE0B0]/10 transition-all text-gray-800 text-sm"
                    required
                  />
                  <div 
                    className="absolute inset-y-0 right-0 pr-4 flex items-center cursor-pointer text-gray-400 hover:text-[#0F4C3A] transition-colors"
                    onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
                  >
                    {showPasswordConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <Button type="submit" disabled={loading} variant="primary" className="w-full py-4 rounded-xl text-[16px] font-bold shadow-lg shadow-[#0F4C3A]/20 bg-[#0F4C3A] hover:bg-[#0a3629] hover:-translate-y-1 transition-all text-white disabled:opacity-70 disabled:hover:translate-y-0">
                  {loading ? 'Mendaftar...' : 'Daftar Sekarang'}
                </Button>
              </div>
            </form>

            <div className="mt-8 text-center">
              <p className="text-gray-600 text-sm">
                Sudah punya akun? <Link to="/login" className="font-bold text-[#0F4C3A] hover:text-[#7FE0B0] transition-colors">Masuk di sini</Link>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
