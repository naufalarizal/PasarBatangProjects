import React, { useState } from 'react';
import { X, Send, CheckCircle2, AlertCircle, MessageSquare } from 'lucide-react';
import { supabase, isSupabaseConfigured } from '../supabaseClient';
import { addLocalMessage } from '../mockData';
import { usePengaduan } from '../context/PengaduanContext';

export default function PengaduanModal() {
  const { isOpen, closeModal } = usePengaduan();

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
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleClose = () => {
    closeModal();
    // Reset form setelah modal ditutup
    setTimeout(() => {
      setFormData({ nama: '', email: '', subjek: '', pesan: '' });
      setSuccess(false);
      setErrorMsg('');
    }, 300);
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
        console.error('Gagal mengirim:', err);
        setErrorMsg('Gagal mengirim pengaduan. Silakan coba lagi atau hubungi kami langsung.');
      }
    } else {
      try {
        addLocalMessage(formData);
        setSuccess(true);
        setFormData({ nama: '', email: '', subjek: '', pesan: '' });
      } catch (err) {
        setErrorMsg('Gagal memproses pengaduan.');
      }
    }
    setLoading(false);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={handleClose}
        style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(15, 23, 42, 0.65)',
          backdropFilter: 'blur(6px)',
          zIndex: 1100,
          animation: 'fadeIn 0.2s ease-out'
        }}
      />

      {/* Modal Panel */}
      <div
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 1101,
          width: '100%',
          maxWidth: '520px',
          maxHeight: '90vh',
          overflowY: 'auto',
          padding: '0 1rem',
          animation: 'slideUpModal 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      >
        <style>{`
          @keyframes slideUpModal {
            from { opacity: 0; transform: translate(-50%, calc(-50% + 30px)); }
            to   { opacity: 1; transform: translate(-50%, -50%); }
          }
        `}</style>

        <div style={{
          backgroundColor: '#fff',
          borderRadius: 'var(--border-radius-lg)',
          boxShadow: '0 25px 50px -12px rgba(0,0,0,0.35)',
          overflow: 'hidden'
        }}>
          {/* Modal Header */}
          <div style={{
            background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))',
            padding: '1.75rem 2rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{
                backgroundColor: 'rgba(255,255,255,0.2)',
                borderRadius: '10px',
                padding: '0.5rem',
                display: 'flex'
              }}>
                <MessageSquare size={22} style={{ color: 'white' }} />
              </div>
              <div>
                <h2 style={{
                  color: 'white',
                  fontSize: '1.25rem',
                  fontWeight: 800,
                  margin: 0,
                  fontFamily: 'var(--font-display)'
                }}>
                  Form Pengaduan Masyarakat
                </h2>
                <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.82rem', margin: 0, marginTop: '0.2rem' }}>
                  Sampaikan keluhan, saran, atau laporan Anda kepada kami
                </p>
              </div>
            </div>
            <button
              onClick={handleClose}
              style={{
                background: 'rgba(255,255,255,0.15)',
                border: '1px solid rgba(255,255,255,0.25)',
                color: 'white',
                borderRadius: '8px',
                padding: '0.4rem',
                cursor: 'pointer',
                display: 'flex',
                transition: 'var(--transition-fast)',
                flexShrink: 0
              }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.3)'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.15)'}
              aria-label="Tutup"
            >
              <X size={20} />
            </button>
          </div>

          {/* Modal Body */}
          <div style={{ padding: '2rem' }}>
            {/* Success State */}
            {success ? (
              <div style={{
                textAlign: 'center',
                padding: '2rem 1rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '1rem'
              }}>
                <div style={{
                  backgroundColor: 'var(--color-primary-light)',
                  color: 'var(--color-primary)',
                  width: '70px',
                  height: '70px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <CheckCircle2 size={36} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', fontFamily: 'var(--font-display)' }}>
                    Pengaduan Terkirim!
                  </h3>
                  <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
                    Terima kasih. Laporan Anda telah diterima dan akan ditindaklanjuti oleh tim kelurahan secepatnya.
                  </p>
                </div>
                <button
                  onClick={handleClose}
                  className="btn btn-primary"
                  style={{ marginTop: '0.5rem' }}
                >
                  Tutup
                </button>
              </div>
            ) : (
              <>
                {errorMsg && (
                  <div style={{
                    backgroundColor: '#fef2f2',
                    border: '1px solid #fecaca',
                    color: '#dc2626',
                    padding: '0.875rem 1rem',
                    borderRadius: 'var(--border-radius-sm)',
                    marginBottom: '1.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.6rem',
                    fontSize: '0.875rem'
                  }}>
                    <AlertCircle size={18} style={{ flexShrink: 0 }} />
                    {errorMsg}
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div className="form-group" style={{ marginBottom: '1rem' }}>
                      <label className="form-label">Nama Lengkap *</label>
                      <input
                        type="text"
                        className="form-control"
                        name="nama"
                        value={formData.nama}
                        onChange={handleChange}
                        placeholder="Nama Anda"
                        required
                      />
                    </div>
                    <div className="form-group" style={{ marginBottom: '1rem' }}>
                      <label className="form-label">Email *</label>
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="email@domain.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group" style={{ marginBottom: '1rem' }}>
                    <label className="form-label">Subjek / Topik Laporan *</label>
                    <input
                      type="text"
                      className="form-control"
                      name="subjek"
                      value={formData.subjek}
                      onChange={handleChange}
                      placeholder="Contoh: Pengaduan Jalan Rusak, Saran Fasilitas Umum"
                      required
                    />
                  </div>

                  <div className="form-group" style={{ marginBottom: '1.75rem' }}>
                    <label className="form-label">Isi Pengaduan / Pesan *</label>
                    <textarea
                      className="form-control"
                      name="pesan"
                      rows={4}
                      value={formData.pesan}
                      onChange={handleChange}
                      placeholder="Sampaikan detail keluhan, saran, atau laporan Anda secara jelas dan bertanggung jawab..."
                      required
                    />
                  </div>

                  <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <button
                      type="button"
                      onClick={handleClose}
                      style={{
                        flex: 1,
                        padding: '0.75rem',
                        backgroundColor: '#f1f5f9',
                        color: 'var(--color-text-muted)',
                        border: '1px solid var(--color-border)',
                        borderRadius: 'var(--border-radius-sm)',
                        fontWeight: 600,
                        cursor: 'pointer',
                        fontSize: '0.9rem',
                        transition: 'var(--transition-fast)'
                      }}
                      onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#e2e8f0'}
                      onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#f1f5f9'}
                    >
                      Batal
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary"
                      style={{ flex: 2 }}
                      disabled={loading}
                    >
                      {loading
                        ? 'Mengirim...'
                        : <><Send size={16} /> Kirim Pengaduan</>
                      }
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
