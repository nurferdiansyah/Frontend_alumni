import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ProtectedRoute } from './components/ProtectedRoute';
import { useEffect } from 'react';
import { Home } from './pages/public/Home';
import { Berita } from './pages/public/Berita';
import { Jobs } from './pages/public/Jobs';
import { Campus } from './pages/public/Campus';
import { DetailCampusInfo } from './pages/public/DetailCampusInfo';
import { VisiMisi } from './pages/public/VisiMisi';
import { DetailBerita } from './pages/public/DetailBerita';
import { DetailLowongan } from './pages/public/DetailLowongan';
import { Kontak } from './pages/public/Kontak';
import { Login } from './pages/auth/Login';
import { Register } from './pages/auth/Register';
import { LengkapiProfil } from './pages/alumni/LengkapiProfil';
import { Dashboard } from './pages/alumni/Dashboard';
import { ProfilSaya } from './pages/alumni/ProfilSaya';
import { Lowongan } from './pages/alumni/Lowongan';
import { DetailLowongan as StudentDetailLowongan } from './pages/alumni/DetailLowongan';
import { Pengaturan } from './pages/alumni/Pengaturan';
import { Notifikasi } from './pages/alumni/Notifikasi';
import { EditProfil } from './pages/alumni/EditProfil';

// Admin Pages
import { DashboardAdmin } from './pages/admin/DashboardAdmin';
import { DataAlumni } from './pages/admin/DataAlumni';
import { LowonganAdmin } from './pages/admin/LowonganAdmin';
import { BeritaAdmin } from './pages/admin/BeritaAdmin';
import { InfoKampusAdmin } from './pages/admin/InfoKampusAdmin';
import { ManajemenDokumenAdmin } from './pages/admin/ManajemenDokumenAdmin';
import { PengaturanAdmin } from './pages/admin/PengaturanAdmin';
import { MasterDataAdmin } from './pages/admin/MasterDataAdmin';
import { NotifikasiAdmin } from './pages/admin/NotifikasiAdmin';

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
        <Route path="/campus/:id" element={<DetailCampusInfo />} />
        <Route path="/visi-misi" element={<VisiMisi />} />
        <Route path="/berita" element={<Berita />} />
        <Route path="/berita/:id" element={<DetailBerita />} />
        <Route path="/kontak" element={<Kontak />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/lengkapi-profil" element={<ProtectedRoute allowedRole="alumni"><LengkapiProfil /></ProtectedRoute>} />
        <Route path="/dashboard" element={<ProtectedRoute allowedRole="alumni"><Dashboard /></ProtectedRoute>} />
        <Route path="/profil-saya" element={<ProtectedRoute allowedRole="alumni"><ProfilSaya /></ProtectedRoute>} />
        <Route path="/dashboard/lowongan" element={<ProtectedRoute allowedRole="alumni"><Lowongan /></ProtectedRoute>} />
        <Route path="/dashboard/lowongan/:id" element={<ProtectedRoute allowedRole="alumni"><StudentDetailLowongan /></ProtectedRoute>} />
        <Route path="/dashboard/notifikasi" element={<ProtectedRoute allowedRole="alumni"><Notifikasi /></ProtectedRoute>} />
        <Route path="/dashboard/pengaturan" element={<ProtectedRoute allowedRole="alumni"><Pengaturan /></ProtectedRoute>} />
        <Route path="/dashboard/edit-profil" element={<ProtectedRoute allowedRole="alumni"><EditProfil /></ProtectedRoute>} />

        {/* Admin Routes */}
        <Route path="/admin/dashboard" element={<ProtectedRoute allowedRole="admin"><DashboardAdmin /></ProtectedRoute>} />
        <Route path="/admin/alumni" element={<ProtectedRoute allowedRole="admin"><DataAlumni /></ProtectedRoute>} />
        <Route path="/admin/lowongan" element={<ProtectedRoute allowedRole="admin"><LowonganAdmin /></ProtectedRoute>} />
        <Route path="/admin/berita" element={<ProtectedRoute allowedRole="admin"><BeritaAdmin /></ProtectedRoute>} />
        <Route path="/admin/info-kampus" element={<ProtectedRoute allowedRole="admin"><InfoKampusAdmin /></ProtectedRoute>} />
        <Route path="/admin/dokumen" element={<ProtectedRoute allowedRole="admin"><ManajemenDokumenAdmin /></ProtectedRoute>} />
        <Route path="/admin/master-data" element={<ProtectedRoute allowedRole="admin"><MasterDataAdmin /></ProtectedRoute>} />
        <Route path="/admin/notifikasi" element={<ProtectedRoute allowedRole="admin"><NotifikasiAdmin /></ProtectedRoute>} />
        <Route path="/admin/pengaturan" element={<ProtectedRoute allowedRole="admin"><PengaturanAdmin /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
