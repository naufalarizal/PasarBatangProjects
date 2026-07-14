import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Profil from './pages/Profil';
import Layanan from './pages/Layanan';
import Berita from './pages/Berita';
import BeritaDetail from './pages/BeritaDetail';
import Galeri from './pages/Galeri';
import Admin from './pages/Admin';
import FloatingPengaduan from './components/FloatingPengaduan';
import PengaduanModal from './components/PengaduanModal';
import { PengaduanProvider } from './context/PengaduanContext';
import './App.css';

// Layout wrapper: hides Navbar, Footer & floating widgets on /admin
function AppLayout() {
  const location = useLocation();
  const isAdmin = location.pathname === '/admin';

  return (
    <div style={isAdmin ? {} : { display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {!isAdmin && <Navbar />}
      <main style={isAdmin ? {} : { flexGrow: 1 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profil" element={<Profil />} />
          <Route path="/layanan" element={<Layanan />} />
          <Route path="/berita" element={<Berita />} />
          <Route path="/berita/:id" element={<BeritaDetail />} />
          <Route path="/galeri" element={<Galeri />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </main>
      {!isAdmin && <Footer />}
      {!isAdmin && <FloatingPengaduan />}
      {!isAdmin && <PengaduanModal />}
    </div>
  );
}

function App() {
  return (
    <PengaduanProvider>
      <Router>
        <AppLayout />
      </Router>
    </PengaduanProvider>
  );
}

export default App;
