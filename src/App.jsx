import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { Jobs } from './pages/Jobs';
import { Campus } from './pages/Campus';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/campus" element={<Campus />} />
      </Routes>
    </Router>
  );
}

export default App;
