import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import logoBrebes from '../assets/img/brebes.png';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-wrapper">
      <div className="container">
        <div className="footer-grid">
          {/* Column 1: Brand & Bio */}
          <div className="footer-brand">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
              <img src={logoBrebes} alt="Logo Kabupaten Brebes" style={{ width: '32px', height: '32px', objectFit: 'contain' }} />
              <h3 style={{ fontSize: '1.25rem', margin: 0, color: 'white' }}>Kelurahan Pasarbatang</h3>
            </div>
            <p style={{ fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>
              Media informasi dan pelayanan digital resmi Kelurahan Pasarbatang. Berkomitmen memberikan kemudahan akses layanan publik yang cepat, tepat, dan terintegrasi untuk seluruh warga.
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

          {/* Column 4: Kontak */}
          <div>
            <h4 className="footer-title">Kontak Kami</h4>
            <ul className="footer-links" style={{ listStyle: 'none', padding: 0 }}>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', marginBottom: '0.75rem' }}>
                <MapPin size={16} style={{ color: 'var(--color-primary)', flexShrink: 0, marginTop: '2px' }} />
                <span>Jl. Melati No. 12, Kebayoran, Jakarta Selatan, DKI Jakarta 12160</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                <Phone size={16} style={{ color: 'var(--color-primary)', flexShrink: 0 }} />
                <span>(021) 7654-3210</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                <Mail size={16} style={{ color: 'var(--color-primary)', flexShrink: 0 }} />
                <span>kontak@mekarsari-kel.go.id</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Clock size={16} style={{ color: 'var(--color-primary)', flexShrink: 0 }} />
                <span>Senin - Jumat | 08:00 - 16:00 WIB</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom footer */}
        <div className="footer-bottom">
          <p>© {currentYear} Kelurahan PasarBatang. Hak Cipta Dilindungi.</p>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <a href="#" style={{ hoverColor: 'white' }}>Kebijakan Privasi</a>
            <a href="#" style={{ hoverColor: 'white' }}>Syarat & Ketentuan</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
