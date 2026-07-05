import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Home } from './pages/Home';
import { Jobs } from './pages/Jobs';
import { Campus } from './pages/Campus';
import { VisiMisi } from './pages/VisiMisi';
import { Berita } from './pages/Berita';
import { DetailBerita } from './pages/DetailBerita';
import { DetailLowongan } from './pages/DetailLowongan';
import { Kontak } from './pages/Kontak';
import { Login } from './pages/Login';

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
      </Routes>
    </Router>
  );
}

export default App;
