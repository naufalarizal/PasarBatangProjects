import React, { useState, useEffect } from 'react';
import { MOCK_SERVICES, addLocalRequest } from '../mockData';
import { supabase, isSupabaseConfigured } from '../supabaseClient';
import { FileText, Clock, AlertCircle, CheckCircle2, Send, HelpCircle } from 'lucide-react';

export default function Layanan() {
  const [services, setServices] = useState(MOCK_SERVICES);
  const [selectedService, setSelectedService] = useState(MOCK_SERVICES[0].id);
  const [formData, setFormData] = useState({
    nama_pemohon: '',
    nik: '',
    email: '',
    no_hp: '',
    keterangan: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [activeTab, setActiveTab] = useState(MOCK_SERVICES[0].id);

  // Ambil data layanan dari Supabase jika dikonfigurasi
  useEffect(() => {
    async function fetchServices() {
      if (isSupabaseConfigured) {
        try {
          const { data, error } = await supabase
            .from('layanan')
            .select('*');
          if (!error && data && data.length > 0) {
            setServices(data);
            setSelectedService(data[0].id);
            setActiveTab(data[0].id);
          }
        } catch (e) {
          console.error("Gagal memuat layanan dari Supabase, memuat mock data.", e);
        }
      }
    }
    fetchServices();
  }, []);

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

    // Validasi NIK
    if (formData.nik.length !== 16 || isNaN(formData.nik)) {
      setErrorMsg('NIK harus berupa 16 digit angka.');
      setLoading(false);
      return;
    }

    const payload = {
      layanan_id: selectedService,
      nama_pemohon: formData.nama_pemohon,
      nik: formData.nik,
      email: formData.email,
      no_hp: formData.no_hp,
      keterangan: formData.keterangan
    };

    if (isSupabaseConfigured) {
      try {
        const { error } = await supabase
          .from('pengajuan_layanan')
          .insert([payload]);
        
        if (error) throw error;
        
        setSuccess(true);
        resetForm();
      } catch (err) {
        console.error("Supabase insert error:", err);
        setErrorMsg('Gagal mengirim pengajuan ke server. Silakan coba lagi.');
      }
    } else {
      // Demo Mode: Simpan ke localStorage
      try {
        addLocalRequest(payload);
        setSuccess(true);
        resetForm();
      } catch (err) {
        setErrorMsg('Gagal memproses pengajuan lokal.');
      }
    }
    setLoading(false);
  };

  const resetForm = () => {
    setFormData({
      nama_pemohon: '',
      nik: '',
      email: '',
      no_hp: '',
      keterangan: ''
    });
    // Auto-scroll ke pesan sukses
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  const activeServiceDetails = services.find(s => s.id === activeTab);

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
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'white', marginBottom: '0.5rem' }}>Layanan Publik</h1>
          <p style={{ opacity: 0.9, fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
            Lihat persyaratan dokumen administratif dan ajukan permohonan surat keterangan secara online.
          </p>
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="section-padding container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(300px, 100%), 1fr))',
          gap: '3rem',
          alignItems: 'start'
        }}>
          {/* Column 1: Info Persyaratan */}
          <div>
            <div style={{ marginBottom: '2rem' }}>
              <span style={{ color: 'var(--color-primary)', fontWeight: 700, fontSize: '0.9rem', textTransform: 'uppercase' }}>Panduan Dokumen</span>
              <h2 style={{ fontSize: '1.85rem', margin: '0.25rem 0 1rem 0' }}>Persyaratan & Dokumen</h2>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem' }}>
                Silakan pilih kategori layanan di bawah untuk melihat persyaratan yang wajib disiapkan sebelum mengajukan permohonan.
              </p>
            </div>

            {/* Tabs List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '2rem' }}>
              {services.map((svc) => (
                <button
                  key={svc.id}
                  onClick={() => {
                    setActiveTab(svc.id);
                    setSelectedService(svc.id);
                  }}
                  style={{
                    textAlign: 'left',
                    padding: '1rem',
                    border: '1px solid var(--color-border)',
                    borderRadius: 'var(--border-radius-sm)',
                    backgroundColor: activeTab === svc.id ? 'var(--color-primary-light)' : '#fff',
                    color: activeTab === svc.id ? 'var(--color-primary)' : 'var(--color-text-dark)',
                    fontWeight: activeTab === svc.id ? 700 : 500,
                    cursor: 'pointer',
                    transition: 'var(--transition-fast)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem'
                  }}
                >
                  <FileText size={18} />
                  <span style={{ fontSize: '0.95rem' }}>{svc.nama_layanan}</span>
                </button>
              ))}
            </div>

            {/* Persyaratan Detail Card */}
            {activeServiceDetails && (
              <div className="card" style={{ borderLeft: '4px solid var(--color-primary)' }}>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>{activeServiceDetails.nama_layanan}</h3>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem', marginBottom: '1rem' }}>
                  {activeServiceDetails.deskripsi}
                </p>
                <div style={{ display: 'flex', gap: '1rem', fontSize: '0.85rem', color: 'var(--color-text-dark)', fontWeight: 600, marginBottom: '1.25rem' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <Clock size={16} style={{ color: 'var(--color-primary)' }} /> Estimasi: {activeServiceDetails.estimasi_waktu}
                  </span>
                </div>
                
                <h4 style={{ fontSize: '0.95rem', marginBottom: '0.5rem' }}>Berkas Persyaratan:</h4>
                <ul style={{ paddingLeft: '1.25rem', fontSize: '0.9rem', color: 'var(--color-text-muted)', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {activeServiceDetails.persyaratan.map((req, index) => (
                    <li key={index}>{req}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Column 2: Form Pengajuan */}
          <div className="card" style={{ position: 'sticky', top: '100px' }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', fontFamily: 'var(--font-display)' }}>Form Pengajuan Online</h2>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', marginBottom: '2rem' }}>
              Isi data diri Anda di bawah ini dengan lengkap untuk mengajukan surat permohonan secara mandiri.
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
                  <strong style={{ display: 'block' }}>Pengajuan Terkirim!</strong>
                  <span style={{ fontSize: '0.85rem' }}>
                    Surat permohonan Anda berhasil didaftarkan. Silakan cek status pengajuan secara berkala di Admin Panel.
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
                <label className="form-label">Jenis Layanan Surat *</label>
                <select 
                  className="form-control"
                  name="selectedService"
                  value={selectedService}
                  onChange={(e) => {
                    setSelectedService(e.target.value);
                    setActiveTab(e.target.value);
                  }}
                  required
                >
                  {services.map((svc) => (
                    <option key={svc.id} value={svc.id}>{svc.nama_layanan}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Nama Lengkap Pemohon *</label>
                <input 
                  type="text" 
                  className="form-control"
                  name="nama_pemohon"
                  placeholder="Contoh: Ahmad Subagja"
                  value={formData.nama_pemohon}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">NIK (Nomor Induk Kependudukan) *</label>
                <input 
                  type="text" 
                  className="form-control"
                  name="nik"
                  placeholder="16 Digit Angka KTP"
                  maxLength={16}
                  value={formData.nik}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Alamat Email (Opsional)</label>
                <input 
                  type="email" 
                  className="form-control"
                  name="email"
                  placeholder="nama@email.com"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Nomor WhatsApp/HP *</label>
                <input 
                  type="tel" 
                  className="form-control"
                  name="no_hp"
                  placeholder="Contoh: 08123456789"
                  value={formData.no_hp}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Keperluan / Keterangan Tambahan *</label>
                <textarea 
                  className="form-control"
                  name="keterangan"
                  rows={4}
                  placeholder="Tuliskan tujuan pengajuan surat (misalnya: 'Keperluan pendaftaran anak sekolah' atau 'Penggantian KTP rusak karena patah')"
                  value={formData.keterangan}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              <button 
                type="submit" 
                className="btn btn-primary" 
                style={{ width: '100%', marginTop: '1rem' }}
                disabled={loading}
              >
                {loading ? 'Mengirim...' : <><Send size={18} /> Kirim Pengajuan</>}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
