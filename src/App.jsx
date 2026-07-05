import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Home } from './pages/Home';
import { Jobs } from './pages/Jobs';
import { Campus } from './pages/Campus';
import { VisiMisi } from './pages/VisiMisi';
import { Berita } from './pages/Berita';
import { Kontak } from './pages/Kontak';

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
        <Route path="/campus" element={<Campus />} />
        <Route path="/visi-misi" element={<VisiMisi />} />
        <Route path="/berita" element={<Berita />} />
        <Route path="/kontak" element={<Kontak />} />
      </Routes>
    </Router>
  );
}

export default App;
