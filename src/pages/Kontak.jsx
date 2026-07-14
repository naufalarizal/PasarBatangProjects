import React, { useState } from 'react';
import { supabase, isSupabaseConfigured } from '../supabaseClient';
import { addLocalMessage } from '../mockData';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, AlertCircle } from 'lucide-react';

export default function Kontak() {
  const [formData, setFormData] = useState({
    nama: '',
    email: '',
    subjek: '',
    pesan: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    setSuccess(false);

    if (isSupabaseConfigured) {
      try {
        const { error } = await supabase
          .from('pesan_kontak')
          .insert([formData]);
        
        if (error) throw error;
        
        setSuccess(true);
        setFormData({ nama: '', email: '', subjek: '', pesan: '' });
      } catch (err) {
        console.error("Gagal mengirim pesan ke Supabase:", err);
        setErrorMsg('Gagal mengirim pesan ke server. Silakan coba lagi.');
      }
    } else {
      // Demo Mode: LocalStorage
      try {
        addLocalMessage(formData);
        setSuccess(true);
        setFormData({ nama: '', email: '', subjek: '', pesan: '' });
      } catch (err) {
        setErrorMsg('Gagal memproses pesan lokal.');
      }
    }
    setLoading(false);
  };

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <section style={{
        background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))',
        color: 'white',
        padding: '4rem 0',
        textAlign: 'center'
      }}>
        <div className="container">
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'white', marginBottom: '0.5rem' }}>Hubungi Kami</h1>
          <p style={{ opacity: 0.9, fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
            Hubungi kantor kelurahan atau ajukan pengaduan/saran seputar fasilitas dan pelayanan di lingkungan Kelurahan Pasarbatang.
          </p>
        </div>
      </section>

      {/* Grid Content */}
      <section className="section-padding container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(320px, 100%), 1fr))',
          gap: '4rem',
          alignItems: 'start'
        }}>
          {/* Column 1: Info & Map */}
          <div>
            <div style={{ marginBottom: '2.5rem' }}>
              <span style={{ color: 'var(--color-primary)', fontWeight: 700, fontSize: '0.9rem', textTransform: 'uppercase' }}>Informasi Kontak</span>
              <h2 style={{ fontSize: '2rem', margin: '0.25rem 0 1rem 0', fontFamily: 'var(--font-display)' }}>Kantor Kelurahan</h2>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem' }}>
                Kami siap membantu menjawab kebutuhan administrasi Anda. Anda dapat berkunjung langsung, menghubungi nomor hotline, atau berkirim surel resmi.
              </p>
            </div>

            {/* Info Cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2.5rem' }}>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <div style={{
                  backgroundColor: 'var(--color-primary-light)',
                  color: 'var(--color-primary)',
                  padding: '0.75rem',
                  borderRadius: '12px',
                  display: 'flex'
                }}>
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 style={{ fontSize: '1rem', marginBottom: '0.25rem' }}>Alamat Kantor</h4>
                  <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', lineHeight: '1.5' }}>
                    Jl. Melati No. 12, Kebayoran, Jakarta Selatan, DKI Jakarta 12160
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <div style={{
                  backgroundColor: 'var(--color-primary-light)',
                  color: 'var(--color-primary)',
                  padding: '0.75rem',
                  borderRadius: '12px',
                  display: 'flex'
                }}>
                  <Phone size={24} />
                </div>
                <div>
                  <h4 style={{ fontSize: '1rem', marginBottom: '0.25rem' }}>Hotline Telepon</h4>
                  <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>(021) 7654-3210</p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <div style={{
                  backgroundColor: 'var(--color-primary-light)',
                  color: 'var(--color-primary)',
                  padding: '0.75rem',
                  borderRadius: '12px',
                  display: 'flex'
                }}>
                  <Mail size={24} />
                </div>
                <div>
                  <h4 style={{ fontSize: '1rem', marginBottom: '0.25rem' }}>Surel Resmi</h4>
                  <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>kontak@mekarsari-kel.go.id</p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <div style={{
                  backgroundColor: 'var(--color-primary-light)',
                  color: 'var(--color-primary)',
                  padding: '0.75rem',
                  borderRadius: '12px',
                  display: 'flex'
                }}>
                  <Clock size={24} />
                </div>
                <div>
                  <h4 style={{ fontSize: '1rem', marginBottom: '0.25rem' }}>Jam Operasional Pelayanan</h4>
                  <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>Senin - Jumat | 08:00 - 16:00 WIB</p>
                </div>
              </div>
            </div>

            {/* Google Map */}
            <div style={{
              borderRadius: 'var(--border-radius-md)',
              overflow: 'hidden',
              height: '240px',
              border: '1px solid var(--color-border)',
              boxShadow: 'var(--shadow-sm)'
            }}>
              <iframe 
                title="Peta Detail Kantor Kelurahan Mekarsari"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m12!1m3!1d15862.911364506041!2d106.77298647035515!3d-6.299525712173456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f1ee32ca7a65%3s0x2e69f1ee34b22fb7%3A0xeab50d4b998cfb15!2sCilandak+Barat%2C+Cilandak%2C+South+Jakarta+City%2C+Jakarta!5e0!3m2!1sen!2sid!4v1700000000000!5m2!1sen!2sid"
                width="100%" 
                height="100%" 
                style={{ border: 0 }}
                allowFullScreen="" 
                loading="lazy"
              ></iframe>
            </div>
          </div>

          {/* Column 2: Form Kontak */}
          <div className="card">
            <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', fontFamily: 'var(--font-display)' }}>Form Pengaduan & Saran</h2>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', marginBottom: '2rem' }}>
              Silakan tulis pesan, kritik, saran, atau laporan pengaduan Anda di bawah ini secara bertanggung jawab.
            </p>

            {success && (
              <div style={{
                backgroundColor: 'var(--color-primary-light)',
                border: '1px solid var(--color-primary)',
                color: 'var(--color-primary-hover)',
                padding: '1rem 1.25rem',
                borderRadius: 'var(--border-radius-sm)',
                marginBottom: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem'
              }}>
                <CheckCircle2 size={24} style={{ flexShrink: 0 }} />
                <div>
                  <strong style={{ display: 'block' }}>Pesan Terkirim!</strong>
                  <span style={{ fontSize: '0.85rem' }}>
                    Pesan Anda berhasil diterima dan akan ditindaklanjuti oleh sekretariat kelurahan. Terima kasih atas partisipasi Anda.
                  </span>
                </div>
              </div>
            )}

            {errorMsg && (
              <div style={{
                backgroundColor: '#fef2f2',
                border: '1px solid var(--color-danger)',
                color: 'var(--color-danger)',
                padding: '1rem 1.25rem',
                borderRadius: 'var(--border-radius-sm)',
                marginBottom: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem'
              }}>
                <AlertCircle size={24} style={{ flexShrink: 0 }} />
                <span style={{ fontSize: '0.85rem' }}>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Nama Lengkap Pemohon *</label>
                <input 
                  type="text" 
                  className="form-control"
                  name="nama"
                  value={formData.nama}
                  onChange={handleChange}
                  placeholder="Contoh: Budi Hartono"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Alamat Email *</label>
                <input 
                  type="email" 
                  className="form-control"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="budi@email.com"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Subjek / Judul Laporan *</label>
                <input 
                  type="text" 
                  className="form-control"
                  name="subjek"
                  value={formData.subjek}
                  onChange={handleChange}
                  placeholder="Contoh: Pengaduan Jalan Rusak"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Isi Pesan / Laporan *</label>
                <textarea 
                  className="form-control"
                  name="pesan"
                  rows={5}
                  value={formData.pesan}
                  onChange={handleChange}
                  placeholder="Tulis detail keluhan atau saran Anda di sini..."
                  required
                ></textarea>
              </div>

              <button 
                type="submit" 
                className="btn btn-primary" 
                style={{ width: '100%', marginTop: '1rem' }}
                disabled={loading}
              >
                {loading ? 'Mengirim...' : <><Send size={18} /> Kirim Pesan / Laporan</>}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
