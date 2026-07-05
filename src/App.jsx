import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Home } from './pages/public/Home';
import { Berita } from './pages/public/Berita';
import { Jobs } from './pages/public/Jobs';
import { Campus } from './pages/public/Campus';
import { VisiMisi } from './pages/public/VisiMisi';
import { DetailBerita } from './pages/public/DetailBerita';
import { DetailLowongan } from './pages/public/DetailLowongan';
import { Kontak } from './pages/public/Kontak';
import { Login } from './pages/auth/Login';
import { LengkapiProfil } from './pages/student/LengkapiProfil';
import { Dashboard } from './pages/student/Dashboard';
import { ProfilSaya } from './pages/student/ProfilSaya';
import { Lowongan } from './pages/student/Lowongan';
import { DetailLowongan as StudentDetailLowongan } from './pages/student/DetailLowongan';
import { Pengaturan } from './pages/student/Pengaturan';
import { Notifikasi } from './pages/student/Notifikasi';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/jobs/:id" element={<DetailLowongan />} />
        <Route path="/campus" element={<Campus />} />
        <Route path="/visi-misi" element={<VisiMisi />} />
        <Route path="/berita" element={<Berita />} />
        <Route path="/berita/:id" element={<DetailBerita />} />
        <Route path="/kontak" element={<Kontak />} />
        <Route path="/login" element={<Login />} />
        <Route path="/lengkapi-profil" element={<LengkapiProfil />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profil-saya" element={<ProfilSaya />} />
        <Route path="/dashboard/lowongan" element={<Lowongan />} />
        <Route path="/dashboard/lowongan/:id" element={<StudentDetailLowongan />} />
        <Route path="/dashboard/notifikasi" element={<Notifikasi />} />
        <Route path="/dashboard/pengaturan" element={<Pengaturan />} />
      </Routes>
    </Router>
  );
}

export default App;
