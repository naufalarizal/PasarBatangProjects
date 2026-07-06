import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Menu, X, Landmark, AlertCircle } from 'lucide-react';
import { isSupabaseConfigured } from '../supabaseClient';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showBanner, setShowBanner] = useState(!isSupabaseConfigured);

  return (
    <>
      {showBanner && (
        <div className="demo-banner">
          <AlertCircle size={16} />
          <span>Mode Demo: Database Supabase belum terhubung. Menggunakan data simulasi lokal.</span>
          <button onClick={() => setShowBanner(false)}>Tutup</button>
        </div>
      )}
      <header className="navbar-wrapper">
        <div className="container navbar-container">
          <Link to="/" className="logo-link">
            <Landmark size={32} style={{ color: 'var(--color-primary)' }} />
            <div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span className="logo-text" style={{ fontSize: '1.3rem', fontWeight: 800 }}>
                  Kelurahan <span style={{ color: 'var(--color-primary)' }}>Mekarsari</span>
                </span>
                <span className="logo-subtext">Kec. Kebayoran, Kota Jakarta Selatan</span>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav>
            <ul className="nav-links">
              <li>
                <NavLink to="/" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} end>
                  Beranda
                </NavLink>
              </li>
              <li>
                <NavLink to="/profil" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                  Profil
                </NavLink>
              </li>
              <li>
                <NavLink to="/layanan" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                  Layanan Publik
                </NavLink>
              </li>
              <li>
                <NavLink to="/berita" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                  Berita
                </NavLink>
              </li>
              <li>
                <NavLink to="/galeri" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                  Galeri
                </NavLink>
              </li>
              <li>
                <NavLink to="/kontak" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                  Kontak
                </NavLink>
              </li>
            </ul>
          </nav>

          {/* Mobile Menu Toggler */}
          <button className="menu-toggle" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle Menu">
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Navigation Links */}
        {isOpen && (
          <div className="container" style={{ position: 'relative' }}>
            <ul className="nav-links mobile-open">
              <li>
                <NavLink to="/" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} end onClick={() => setIsOpen(false)}>
                  Beranda
                </NavLink>
              </li>
              <li>
                <NavLink to="/profil" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} onClick={() => setIsOpen(false)}>
                  Profil
                </NavLink>
              </li>
              <li>
                <NavLink to="/layanan" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} onClick={() => setIsOpen(false)}>
                  Layanan Publik
                </NavLink>
              </li>
              <li>
                <NavLink to="/berita" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} onClick={() => setIsOpen(false)}>
                  Berita
                </NavLink>
              </li>
              <li>
                <NavLink to="/galeri" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} onClick={() => setIsOpen(false)}>
                  Galeri
                </NavLink>
              </li>
              <li>
                <NavLink to="/kontak" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} onClick={() => setIsOpen(false)}>
                  Kontak
                </NavLink>
              </li>
            </ul>
          </div>
        )}
      </header>
    </>
  );
}
