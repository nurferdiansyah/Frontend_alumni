import React from 'react';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { Button } from '../../components/Button';
import { ScrollReveal } from '../../components/ScrollReveal';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';

export function Kontak() {
  return (
    <div className="min-h-screen bg-[#F4F7FA] font-sans text-gray-800 flex flex-col">
      <Navbar />

      {/* Header Section */}
      <section className="bg-[#0F4C3A] text-white pt-36 pb-28 px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#7FE0B0]/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#0F4C3A]/50 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3 pointer-events-none border-[20px] border-[#7FE0B0]/10"></div>

        <div className="max-w-[1200px] mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/20 bg-white/10 text-[12px] font-bold mb-6 text-[#7FE0B0] tracking-widest uppercase">
              Layanan Informasi
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 tracking-tight leading-tight text-white">
              Hubungi <span className="text-[#7FE0B0]">Kami</span>
            </h1>
            <p className="text-white/80 text-[18px] max-w-2xl mx-auto leading-relaxed">
              Punya pertanyaan, saran, atau butuh bantuan? Tim Universitas Nurul Huda siap membantu Anda dengan senang hati.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="pb-24 px-6 md:px-12 lg:px-16 flex-grow w-full max-w-[1200px] mx-auto -mt-16 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

          {/* Contact Information */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            <ScrollReveal>
              <div className="bg-white rounded-[32px] p-10 shadow-xl shadow-gray-200/50 border border-gray-100">
                <h3 className="text-2xl font-extrabold text-gray-900 mb-8">Informasi Kontak</h3>

                <div className="space-y-8">
                  <div className="flex gap-4 group">
                    <div className="w-12 h-12 rounded-2xl bg-[#0F4C3A]/5 text-[#0F4C3A] flex items-center justify-center flex-shrink-0 group-hover:bg-[#0F4C3A] group-hover:text-white transition-colors duration-300">
                      <MapPin size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-1">Alamat Kampus</h4>
                      <p className="text-gray-500 text-[15px] leading-relaxed">
                        Jl. Raya Lintas Timur KM. 15<br />
                        Kabupaten Ogan Komering Ulu Timur<br />
                        Sumatera Selatan, 32181
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 group">
                    <div className="w-12 h-12 rounded-2xl bg-[#0F4C3A]/5 text-[#0F4C3A] flex items-center justify-center flex-shrink-0 group-hover:bg-[#0F4C3A] group-hover:text-white transition-colors duration-300">
                      <Phone size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-1">Telepon</h4>
                      <p className="text-gray-500 text-[15px] leading-relaxed">
                        (0714) 321-4567<br />
                        +62 811-2233-4455 (WhatsApp)
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 group">
                    <div className="w-12 h-12 rounded-2xl bg-[#0F4C3A]/5 text-[#0F4C3A] flex items-center justify-center flex-shrink-0 group-hover:bg-[#0F4C3A] group-hover:text-white transition-colors duration-300">
                      <Mail size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-1">Email</h4>
                      <p className="text-gray-500 text-[15px] leading-relaxed">
                        info@unuha.ac.id<br />
                        alumni@unuha.ac.id
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 group">
                    <div className="w-12 h-12 rounded-2xl bg-[#0F4C3A]/5 text-[#0F4C3A] flex items-center justify-center flex-shrink-0 group-hover:bg-[#0F4C3A] group-hover:text-white transition-colors duration-300">
                      <Clock size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-1">Jam Operasional</h4>
                      <p className="text-gray-500 text-[15px] leading-relaxed">
                        Senin - Jumat: 08:00 - 16:00 WIB<br />
                        Sabtu & Minggu: Tutup
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-10 pt-8 border-t border-gray-100">
                  <h4 className="font-bold text-gray-900 mb-4">Media Sosial Kami</h4>
                  <div className="flex gap-3">
                    {[
                      { icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>, href: "#" },
                      { icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>, href: "#" },
                      { icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>, href: "#" },
                      { icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>, href: "#" }
                    ].map((item, idx) => (
                      <a key={idx} href={item.href} className="w-10 h-10 rounded-full bg-gray-50 text-gray-500 flex items-center justify-center hover:bg-[#0F4C3A] hover:text-white transition-all duration-300 hover:-translate-y-1">
                        {item.icon}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-7">
            <ScrollReveal delay={0.2}>
              <div className="bg-white rounded-[32px] p-10 md:p-12 shadow-xl shadow-gray-200/50 border border-gray-100">
                <div className="mb-8">
                  <h3 className="text-2xl font-extrabold text-gray-900 mb-2">Kirim Pesan</h3>
                  <p className="text-gray-500 text-[15px]">Silakan isi formulir di bawah ini dan kami akan segera membalas pesan Anda.</p>
                </div>

                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[14px] font-bold text-gray-700">Nama Lengkap</label>
                      <input type="text" placeholder="Masukkan nama Anda" className="w-full bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-3.5 outline-none focus:border-[#0F4C3A] focus:ring-1 focus:ring-[#0F4C3A] transition-all text-[15px]" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[14px] font-bold text-gray-700">Alamat Email</label>
                      <input type="email" placeholder="contoh@email.com" className="w-full bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-3.5 outline-none focus:border-[#0F4C3A] focus:ring-1 focus:ring-[#0F4C3A] transition-all text-[15px]" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[14px] font-bold text-gray-700">Kategori Pesan / Subjek</label>
                    <select className="w-full bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-3.5 outline-none focus:border-[#0F4C3A] focus:ring-1 focus:ring-[#0F4C3A] transition-all text-[15px] cursor-pointer text-gray-600">
                      <option>Pilih Kategori</option>
                      <option>Informasi Pendaftaran</option>
                      <option>Kerja Sama / Kemitraan</option>
                      <option>Dukungan Alumni</option>
                      <option>Lainnya</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[14px] font-bold text-gray-700">Isi Pesan</label>
                    <textarea rows="5" placeholder="Tuliskan pesan Anda di sini..." className="w-full bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-3.5 outline-none focus:border-[#0F4C3A] focus:ring-1 focus:ring-[#0F4C3A] transition-all text-[15px] resize-none"></textarea>
                  </div>

                  <Button variant="primary" className="w-full py-4 text-[16px] flex items-center justify-center gap-2 group mt-4">
                    Kirim Pesan Sekarang
                    <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </Button>
                </form>
              </div>
            </ScrollReveal>
          </div>

        </div>
      </section>

      <Footer />
    </div>
  );
}
