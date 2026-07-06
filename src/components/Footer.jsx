import React from 'react';
import { Link } from 'react-router-dom';
import { Landmark, Phone, Mail, MapPin, Clock } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-wrapper">
      <div className="container">
        <div className="footer-grid">
          {/* Column 1: Brand & Bio */}
          <div className="footer-brand">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
              <Landmark size={28} style={{ color: 'var(--color-primary)' }} />
              <h3 style={{ fontSize: '1.25rem', margin: 0, color: 'white' }}>Kelurahan Mekarsari</h3>
            </div>
            <p style={{ fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>
              Website resmi pelayanan dan informasi publik Kelurahan Mekarsari. Berkomitmen mewujudkan pelayanan prima, transparan, dan akuntabel bagi seluruh warga.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="footer-title">Tautan Pintas</h4>
            <ul className="footer-links">
              <li><Link to="/" className="footer-link">Beranda</Link></li>
              <li><Link to="/profil" className="footer-link">Profil Kelurahan</Link></li>
              <li><Link to="/layanan" className="footer-link">Layanan Publik</Link></li>
              <li><Link to="/berita" className="footer-link">Berita & Kegiatan</Link></li>
              <li><Link to="/galeri" className="footer-link">Galeri Foto</Link></li>
            </ul>
          </div>

          {/* Column 3: Services */}
          <div>
            <h4 className="footer-title">Layanan Utama</h4>
            <ul className="footer-links">
              <li><Link to="/layanan" className="footer-link">Kartu Tanda Penduduk (KTP)</Link></li>
              <li><Link to="/layanan" className="footer-link">Kartu Keluarga (KK)</Link></li>
              <li><Link to="/layanan" className="footer-link">Surat Keterangan Domisili</Link></li>
              <li><Link to="/layanan" className="footer-link">Surat Pengantar Nikah</Link></li>
              <li><Link to="/layanan" className="footer-link">Surat Keterangan Tidak Mampu</Link></li>
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div>
            <h4 className="footer-title">Hubungi Kami</h4>
            <div className="footer-info-item">
              <MapPin size={20} style={{ color: 'var(--color-primary)', flexShrink: 0 }} />
              <span style={{ fontSize: '0.9rem' }}>Jl. Melati No. 12, Kebayoran, Jakarta Selatan, DKI Jakarta 12160</span>
            </div>
            <div className="footer-info-item">
              <Phone size={20} style={{ color: 'var(--color-primary)', flexShrink: 0 }} />
              <span style={{ fontSize: '0.9rem' }}>(021) 7654-3210</span>
            </div>
            <div className="footer-info-item">
              <Mail size={20} style={{ color: 'var(--color-primary)', flexShrink: 0 }} />
              <span style={{ fontSize: '0.9rem' }}>kontak@mekarsari-kel.go.id</span>
            </div>
            <div className="footer-info-item">
              <Clock size={20} style={{ color: 'var(--color-primary)', flexShrink: 0 }} />
              <span style={{ fontSize: '0.9rem' }}>Senin - Jumat | 08:00 - 16:00 WIB</span>
            </div>
          </div>
        </div>

        {/* Bottom footer */}
        <div className="footer-bottom">
          <p>© {currentYear} Pemerintah Kelurahan Mekarsari. Hak Cipta Dilindungi.</p>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <a href="#" style={{ hoverColor: 'white' }}>Kebijakan Privasi</a>
            <a href="#" style={{ hoverColor: 'white' }}>Syarat & Ketentuan</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
