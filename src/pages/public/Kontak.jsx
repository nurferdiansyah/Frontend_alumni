import React from 'react';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { Button } from '../../components/Button';
import { ScrollReveal } from '../../components/ScrollReveal';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const FacebookIcon = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
  </svg>
);

const InstagramIcon = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
  </svg>
);

const YoutubeIcon = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s-.002 3.254-.42 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.812.419-7.812.419s-6.252 0-7.812-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.254 2 12 2 12s.002-3.254.42-4.814a2.507 2.507 0 0 1 1.768-1.768C5.748 5 12 5 12 5s6.252 0 7.812.418ZM15.194 12 10 15V9l5.194 3Z" clipRule="evenodd" />
  </svg>
);

const TiktokIcon = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.01.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.12-3.44-3.17-3.49-5.46-.05-2.04.94-4.01 2.65-5.18 1.63-1.12 3.73-1.37 5.61-.71 0 1.48 0 2.96 0 4.44-.64-.26-1.39-.23-1.99.11-.82.46-1.29 1.43-1.16 2.37.13.93.75 1.72 1.61 2.02.86.3 1.83.13 2.55-.42.71-.55 1.13-1.41 1.13-2.31.02-6.52.01-13.04.02-19.56z"/>
  </svg>
);

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
        <div className="flex justify-center">

          {/* Contact Information */}
          <div className="w-full max-w-3xl flex flex-col gap-8">
            <ScrollReveal>
              <div className="bg-white rounded-[32px] p-10 shadow-xl shadow-gray-200/50 border border-gray-100">
                <h3 className="text-2xl font-extrabold text-gray-900 mb-8 text-center">Informasi Kontak</h3>

                <div className="space-y-8">
                  <div className="flex gap-4 group">
                    <div className="w-12 h-12 rounded-2xl bg-[#0F4C3A]/5 text-[#0F4C3A] flex items-center justify-center flex-shrink-0 group-hover:bg-[#0F4C3A] group-hover:text-white transition-colors duration-300">
                      <MapPin size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">Alamat Kampus</h4>
                      <div className="flex flex-col text-[14px] space-y-2 text-gray-600">
                        <span><strong className="text-gray-800">Kampus A & B:</strong> Jl. Kota Baru, Desa Sukaraja, Kec. Buay Madang, OKU Timur, Sumatera Selatan 32161.</span>
                        <span><strong className="text-gray-800">Kampus C:</strong> Jl. Tanah Merah Jembatan 2, Desa Tanah Merah, Kec. Belitang Madang Raya, OKU Timur, Sumatera Selatan.</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4 group">
                    <div className="w-12 h-12 rounded-2xl bg-[#0F4C3A]/5 text-[#0F4C3A] flex items-center justify-center flex-shrink-0 group-hover:bg-[#0F4C3A] group-hover:text-white transition-colors duration-300">
                      <Phone size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">Telepon & Kontak Resmi</h4>
                      <div className="flex flex-col text-[14px] space-y-1 text-gray-600">
                        <span><strong className="text-gray-800">Telepon Utama (FST/Umum):</strong> 0735-4840646</span>
                        <span><strong className="text-gray-800">WA PMB (Kampus A & B):</strong> 0821-8466-0898</span>
                        <span><strong className="text-gray-800">WA PMB (Kampus C):</strong> 0857-5833-9135</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4 group">
                    <div className="w-12 h-12 rounded-2xl bg-[#0F4C3A]/5 text-[#0F4C3A] flex items-center justify-center flex-shrink-0 group-hover:bg-[#0F4C3A] group-hover:text-white transition-colors duration-300">
                      <Mail size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-1">Email</h4>
                      <p className="text-gray-500 text-[15px] leading-relaxed">
                        info@unuha.ac.id
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
                  <h4 className="font-bold text-gray-900 mb-4 text-center">Media Sosial Kami</h4>
                  <div className="flex justify-center gap-3">
                    {[
                      { icon: <FacebookIcon className="w-5 h-5" />, href: "https://web.facebook.com/univ.nurulhuda/?_rdc=1&_rdr#" },
                      { icon: <InstagramIcon className="w-5 h-5" />, href: "https://www.instagram.com/universitasnurulhuda/" },
                      { icon: <TiktokIcon className="w-5 h-5" />, href: "https://www.tiktok.com/@pmb.unuha" },
                      { icon: <YoutubeIcon className="w-5 h-5" />, href: "https://www.youtube.com/@universitasnurulhuda" }
                    ].map((item, idx) => (
                      <a key={idx} href={item.href} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-50 text-gray-500 flex items-center justify-center hover:bg-[#0F4C3A] hover:text-white transition-all duration-300 hover:-translate-y-1">
                        {item.icon}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>

        </div>
      </section>

      <Footer />
    </div>
  );
}
