import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Profil from './pages/Profil';
import Layanan from './pages/Layanan';
import Berita from './pages/Berita';
import BeritaDetail from './pages/BeritaDetail';
import Galeri from './pages/Galeri';
import Kontak from './pages/Kontak';
import Admin from './pages/Admin';
import FloatingPengaduan from './components/FloatingPengaduan';
import './App.css';

function App() {
  return (
    <Router>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar />
        <main style={{ flexGrow: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profil" element={<Profil />} />
            <Route path="/layanan" element={<Layanan />} />
            <Route path="/berita" element={<Berita />} />
            <Route path="/berita/:id" element={<BeritaDetail />} />
            <Route path="/galeri" element={<Galeri />} />
            <Route path="/kontak" element={<Kontak />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </main>
        <Footer />
        <FloatingPengaduan />
      </div>
    </Router>
  );
}

export default App;
