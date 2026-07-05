import React from 'react';
import { GraduationCap, Globe, MessageCircle, Hash, Users, Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-[#F7F8FA] pt-16 pb-8 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-[#0F4C3A] p-2 rounded-lg">
                <GraduationCap className="text-white w-6 h-6" />
              </div>
              <span className="font-bold text-xl text-[#0F4C3A]">UNUHA Alumni</span>
            </div>
            <p className="text-gray-600 mb-6">Pusat pengembangan karir dan koneksi alumni Universitas Nurul Huda. Membangun masa depan bersama.</p>
            <div className="flex gap-3">
              {[Globe, MessageCircle, Hash, Users].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-500 hover:text-[#0F4C3A] hover:shadow-md transition-all shadow-sm border border-gray-100">
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold text-gray-900 mb-4">Tautan Cepat</h4>
            <ul className="space-y-3">
              {['Lowongan Kerja', 'Info Kampus', 'Data Alumni', 'Pelacakan Lulusan'].map((item, i) => (
                <li key={i}>
                  <a href="#" className="text-gray-600 hover:text-[#0F4C3A] transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-gray-900 mb-4">Kontak Kami</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-gray-600">
                <MapPin className="w-5 h-5 text-[#7FE0B0] mt-0.5 flex-shrink-0" />
                <span>Jl. Lintas Timur, Sukaraja, Kec. Buay Madang, Kab. OKU Timur, Sumatera Selatan</span>
              </li>
              <li className="flex items-center gap-3 text-gray-600">
                <Mail className="w-5 h-5 text-[#7FE0B0]" />
                <span>career@unuha.ac.id</span>
              </li>
              <li className="flex items-center gap-3 text-gray-600">
                <Phone className="w-5 h-5 text-[#7FE0B0]" />
                <span>+62 123 4567 890</span>
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
