import React from 'react';
import { GraduationCap, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

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

export function Footer() {
  return (
    <footer className="bg-[#E2E8F0]/60 pt-16 pb-8 border-t border-gray-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src="/logo.png" alt="Logo UNUHA" className="w-10 h-10 object-contain" />
              <span className="font-bold text-xl text-[#0F4C3A]">Alumni & Karir UNUHA</span>
            </div>
            <p className="text-gray-600 mb-6">Pusat pengembangan karir dan koneksi alumni Universitas Nurul Huda. Membangun masa depan bersama.</p>
            <div className="flex gap-3">
              <a href="https://web.facebook.com/univ.nurulhuda/?_rdc=1&_rdr#" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-500 hover:text-[#0F4C3A] hover:shadow-md transition-all shadow-sm border border-gray-100">
                <FacebookIcon className="w-5 h-5" />
              </a>
              <a href="https://www.instagram.com/universitasnurulhuda/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-500 hover:text-[#0F4C3A] hover:shadow-md transition-all shadow-sm border border-gray-100">
                <InstagramIcon className="w-5 h-5" />
              </a>
              <a href="https://www.tiktok.com/@pmb.unuha" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-500 hover:text-[#0F4C3A] hover:shadow-md transition-all shadow-sm border border-gray-100">
                <TiktokIcon className="w-5 h-5" />
              </a>
              <a href="https://www.youtube.com/@universitasnurulhuda" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-500 hover:text-[#0F4C3A] hover:shadow-md transition-all shadow-sm border border-gray-100">
                <YoutubeIcon className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-gray-900 mb-4">Tautan Cepat</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/visi-misi" className="text-gray-600 hover:text-[#0F4C3A] transition-colors">Visi & Misi</Link>
              </li>
              <li>
                <Link to="/campus" className="text-gray-600 hover:text-[#0F4C3A] transition-colors">Info Kampus</Link>
              </li>
              <li>
                <Link to="/berita" className="text-gray-600 hover:text-[#0F4C3A] transition-colors">Berita</Link>
              </li>
              <li>
                <Link to="/jobs" className="text-gray-600 hover:text-[#0F4C3A] transition-colors">Lowongan Kerja</Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-gray-900 mb-4">Kontak Kami</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-gray-600">
                <MapPin className="w-5 h-5 text-[#7FE0B0] mt-0.5 flex-shrink-0" />
                <div className="flex flex-col text-[14px]">
                  <span><strong className="text-gray-800">Kampus A & B:</strong> Jl. Kota Baru, Desa Sukaraja, Kec. Buay Madang, OKU Timur, Sumatera Selatan 32161.</span>
                  <span className="mt-2"><strong className="text-gray-800">Kampus C:</strong> Jl. Tanah Merah Jembatan 2, Desa Tanah Merah, Kec. Belitang Madang Raya, OKU Timur, Sumatera Selatan.</span>
                </div>
              </li>
              <li className="flex items-center gap-3 text-gray-600">
                <Mail className="w-5 h-5 text-[#7FE0B0]" />
                <span className="text-[14px]">info@unuha.ac.id</span>
              </li>
              <li className="flex items-start gap-3 text-gray-600">
                <Phone className="w-5 h-5 text-[#7FE0B0] mt-0.5 flex-shrink-0" />
                <div className="flex flex-col text-[14px]">
                  <span><strong className="text-gray-800">Telepon Utama (FST/Umum):</strong> 0735-4840646</span>
                  <span><strong className="text-gray-800">WA PMB (Kampus A & B):</strong> 0821-8466-0898</span>
                  <span><strong className="text-gray-800">WA PMB (Kampus C):</strong> 0857-5833-9135</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>© {new Date().getFullYear()} UNUHA Alumni. Hak Cipta Dilindungi.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-gray-900 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gray-900 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
