import React, { useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../supabaseClient';
import { 
  getLocalRequests, updateLocalRequestStatus, deleteLocalRequest,
  getLocalMessages, deleteLocalMessage,
  getLocalNews, addLocalNews, deleteLocalNews
} from '../mockData';
import { 
  FileText, MessageSquare, Newspaper, Check, X, ShieldAlert,
  Trash2, LogIn, LayoutDashboard, Plus, Eye, User, FilePlus2 
} from 'lucide-react';

export default function Admin() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  
  // Dashboard Tabs: 'requests' | 'messages' | 'news'
  const [activeTab, setActiveTab] = useState('requests');
  
  // Data States
  const [requests, setRequests] = useState([]);
  const [messages, setMessages] = useState([]);
  const [news, setNews] = useState([]);
  
  // Form Berita Baru
  const [newNews, setNewNews] = useState({
    judul: '',
    ringkasan: '',
    konten: '',
    kategori: 'Kegiatan',
    gambar_url: '',
    penulis: 'Pamong Kelurahan'
  });
  const [newsError, setNewsError] = useState('');
  const [newsSuccess, setNewsSuccess] = useState(false);

  // Custom Confirm Modal State
  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    title: '',
    message: '',
    onConfirm: null
  });

  const triggerConfirm = (title, message, onConfirmAction) => {
    setConfirmModal({
      isOpen: true,
      title,
      message,
      onConfirm: () => {
        onConfirmAction();
        setConfirmModal(prev => ({ ...prev, isOpen: false }));
      }
    });
  };

  const closeConfirmModal = () => {
    setConfirmModal(prev => ({ ...prev, isOpen: false }));
  };

  useEffect(() => {
    if (isLoggedIn) {
      loadDashboardData();
    }
  }, [isLoggedIn]);

  const loadDashboardData = async () => {
    if (isSupabaseConfigured) {
      try {
        // Load Requests
        const { data: reqData, error: reqErr } = await supabase
          .from('pengajuan_layanan')
          .select('*, layanan:layanan_id(nama_layanan)')
          .order('created_at', { ascending: false });
        if (!reqErr && reqData) {
          // Format nama_layanan jika dimuat
          const formatted = reqData.map(r => ({
            ...r,
            nama_layanan: r.layanan?.nama_layanan || 'Layanan'
          }));
          setRequests(formatted);
        }

        // Load Messages
        const { data: msgData, error: msgErr } = await supabase
          .from('pesan_kontak')
          .select('*')
          .order('created_at', { ascending: false });
        if (!msgErr && msgData) setMessages(msgData);

        // Load News
        const { data: newsData, error: newsErr } = await supabase
          .from('berita')
          .select('*')
          .order('tanggal_publish', { ascending: false });
        if (!newsErr && newsData) setNews(newsData);

        return; // Selesai loading Supabase
      } catch (err) {
        console.error("Gagal memuat data dari Supabase, beralih ke local storage.", err);
      }
    }

    // Demo Mode loading
    setRequests(getLocalRequests());
    setMessages(getLocalMessages());
    setNews(getLocalNews());
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin') {
      setIsLoggedIn(true);
      setLoginError('');
    } else {
      setLoginError('Username atau password salah (Gunakan username: admin, password: admin untuk masuk).');
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    if (isSupabaseConfigured) {
      try {
        const { error } = await supabase
          .from('pengajuan_layanan')
          .update({ status: newStatus })
          .eq('id', id);
        if (error) throw error;
        loadDashboardData();
      } catch (err) {
        console.error(err);
        alert('Gagal memperbarui status di Supabase.');
      }
    } else {
      updateLocalRequestStatus(id, newStatus);
      setRequests(getLocalRequests());
    }
  };

  const handleDeleteRequest = (id) => {
    triggerConfirm(
      'Hapus Riwayat Pengajuan',
      'Apakah Anda yakin ingin menghapus riwayat pengajuan surat ini? Data yang terhapus tidak dapat dikembalikan.',
      async () => {
        if (isSupabaseConfigured) {
          try {
            const { error } = await supabase
              .from('pengajuan_layanan')
              .delete()
              .eq('id', id);
            if (error) throw error;
            loadDashboardData();
          } catch (err) {
            console.error(err);
          }
        } else {
          deleteLocalRequest(id);
          setRequests(getLocalRequests());
        }
      }
    );
  };

  const handleDeleteMessage = (id) => {
    triggerConfirm(
      'Hapus Laporan/Pesan Warga',
      'Apakah Anda yakin ingin menghapus pesan aduan ini? Pesan yang dihapus akan hilang dari kotak masuk.',
      async () => {
        if (isSupabaseConfigured) {
          try {
            const { error } = await supabase
              .from('pesan_kontak')
              .delete()
              .eq('id', id);
            if (error) throw error;
            loadDashboardData();
          } catch (err) {
            console.error(err);
          }
        } else {
          deleteLocalMessage(id);
          setMessages(getLocalMessages());
        }
      }
    );
  };

  const handleAddNews = async (e) => {
    e.preventDefault();
    setNewsError('');
    setNewsSuccess(false);

    if (!newNews.judul || !newNews.ringkasan || !newNews.konten) {
      setNewsError('Judul, Ringkasan, dan Konten berita wajib diisi.');
      return;
    }

    const payload = {
      judul: newNews.judul,
      ringkasan: newNews.ringkasan,
      konten: newNews.konten,
      kategori: newNews.kategori,
      gambar_url: newNews.gambar_url || 'https://images.unsplash.com/photo-1594708767771-a7502209ff51?auto=format&fit=crop&q=80&w=800&h=450',
      penulis: newNews.penulis,
      tanggal_publish: new Date().toISOString().split('T')[0]
    };

    if (isSupabaseConfigured) {
      try {
        const { error } = await supabase
          .from('berita')
          .insert([payload]);
        if (error) throw error;
        setNewsSuccess(true);
        setNewNews({
          judul: '',
          ringkasan: '',
          konten: '',
          kategori: 'Kegiatan',
          gambar_url: '',
          penulis: 'Pamong Kelurahan'
        });
        loadDashboardData();
      } catch (err) {
        console.error(err);
        setNewsError('Gagal menambahkan berita ke database Supabase.');
      }
    } else {
      addLocalNews(payload);
      setNewsSuccess(true);
      setNewNews({
        judul: '',
        ringkasan: '',
        konten: '',
        kategori: 'Kegiatan',
        gambar_url: '',
        penulis: 'Pamong Kelurahan'
      });
      setNews(getLocalNews());
    }
  };

  const handleDeleteNewsItem = (id) => {
    triggerConfirm(
      'Hapus Publikasi Berita',
      'Apakah Anda yakin ingin menghapus berita ini secara permanen dari website?',
      async () => {
        if (isSupabaseConfigured) {
          try {
            const { error } = await supabase
              .from('berita')
              .delete()
              .eq('id', id);
            if (error) throw error;
            loadDashboardData();
          } catch (err) {
            console.error(err);
          }
        } else {
          deleteLocalNews(id);
          setNews(getLocalNews());
        }
      }
    );
  };

  const getStatusBadgeStyle = (status) => {
    const base = {
      display: 'inline-block',
      padding: '0.2rem 0.6rem',
      borderRadius: '4px',
      fontSize: '0.75rem',
      fontWeight: 700
    };
    switch (status) {
      case 'Pending':
        return { ...base, backgroundColor: '#fef3c7', color: '#d97706' };
      case 'Diproses':
        return { ...base, backgroundColor: '#dbeafe', color: '#2563eb' };
      case 'Selesai':
        return { ...base, backgroundColor: '#d1fae5', color: '#059669' };
      case 'Ditolak':
        return { ...base, backgroundColor: '#fee2e2', color: '#dc2626' };
      default:
        return base;
    }
  };

  // --- LOGIN PANEL RENDER ---
  if (!isLoggedIn) {
    return (
      <div style={{
        minHeight: '75vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem'
      }} className="animate-fade-in">
        <div className="card" style={{ maxWidth: '400px', width: '100%', padding: '2.5rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div style={{
              backgroundColor: 'var(--color-primary-light)',
              color: 'var(--color-primary)',
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1rem auto'
            }}>
              <LogIn size={28} />
            </div>
            <h2 style={{ fontSize: '1.5rem', fontFamily: 'var(--font-display)' }}>Admin Panel Login</h2>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem' }}>
              Silakan login untuk memantau administrasi pengajuan warga.
            </p>
          </div>

          {loginError && (
            <div style={{
              backgroundColor: '#fee2e2',
              color: '#dc2626',
              padding: '0.75rem 1rem',
              borderRadius: 'var(--border-radius-sm)',
              fontSize: '0.8rem',
              marginBottom: '1.25rem',
              border: '1px solid #fecaca'
            }}>
              {loginError}
            </div>
          )}

          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label className="form-label">Username</label>
              <input 
                type="text" 
                className="form-control"
                placeholder="Masukkan username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="form-group" style={{ marginBottom: '2rem' }}>
              <label className="form-label">Password</label>
              <input 
                type="password" 
                className="form-control"
                placeholder="Masukkan password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            
            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
              Masuk Dashboard
            </button>
          </form>

          <div style={{
            marginTop: '1.5rem',
            backgroundColor: 'var(--color-bg-light)',
            padding: '1rem',
            borderRadius: 'var(--border-radius-sm)',
            fontSize: '0.8rem',
            textAlign: 'center',
            border: '1px dashed var(--color-border)'
          }}>
            <strong style={{ display: 'block', color: 'var(--color-primary)', marginBottom: '0.25rem' }}>Kredensial Demo:</strong>
            Username: <code style={{ backgroundColor: '#e2e8f0', padding: '0.1rem 0.3rem', borderRadius: '4px' }}>admin</code><br/>
            Password: <code style={{ backgroundColor: '#e2e8f0', padding: '0.1rem 0.3rem', borderRadius: '4px' }}>admin</code>
          </div>
        </div>
      </div>
    );
  }

  // --- DASHBOARD PANEL RENDER ---
  return (
    <div className="animate-fade-in" style={{ backgroundColor: '#f8fafc', minHeight: '85vh', paddingBottom: '4rem' }}>
      {/* Header Dashboard */}
      <div style={{
        backgroundColor: '#fff',
        borderBottom: '1px solid var(--color-border)',
        padding: '1.5rem 0'
      }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <LayoutDashboard size={28} style={{ color: 'var(--color-primary)' }} />
            <div>
              <h1 style={{ fontSize: '1.5rem', fontWeight: 800, margin: 0 }}>Dashboard Admin</h1>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.8rem', margin: 0 }}>
                Kelola Pengajuan Surat, Pesan Kontak, dan Publikasi Berita.
              </p>
            </div>
          </div>
          <button onClick={() => setIsLoggedIn(false)} className="btn btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}>
            Logout Admin
          </button>
        </div>
      </div>

      {/* Main Container */}
      <div className="container" style={{ marginTop: '2.5rem' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '240px 1fr',
          gap: '2.5rem',
          alignItems: 'start'
        }}>
          {/* Navigation Sidebar */}
          <div className="card" style={{ padding: '1rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              <button
                onClick={() => setActiveTab('requests')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.75rem 1rem',
                  width: '100%',
                  border: 'none',
                  borderRadius: 'var(--border-radius-sm)',
                  backgroundColor: activeTab === 'requests' ? 'var(--color-primary-light)' : 'transparent',
                  color: activeTab === 'requests' ? 'var(--color-primary)' : 'var(--color-text-muted)',
                  fontWeight: activeTab === 'requests' ? 700 : 500,
                  fontSize: '0.9rem',
                  textAlign: 'left',
                  cursor: 'pointer',
                  transition: 'var(--transition-fast)'
                }}
              >
                <FileText size={18} />
                <span>Pengajuan Surat</span>
                <span style={{ 
                  marginLeft: 'auto', 
                  backgroundColor: activeTab === 'requests' ? 'var(--color-primary)' : 'var(--color-border)', 
                  color: activeTab === 'requests' ? '#fff' : 'var(--color-text-muted)',
                  padding: '0.1rem 0.4rem', 
                  borderRadius: '10px', 
                  fontSize: '0.75rem' 
                }}>
                  {requests.length}
                </span>
              </button>

              <button
                onClick={() => setActiveTab('messages')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.75rem 1rem',
                  width: '100%',
                  border: 'none',
                  borderRadius: 'var(--border-radius-sm)',
                  backgroundColor: activeTab === 'messages' ? 'var(--color-primary-light)' : 'transparent',
                  color: activeTab === 'messages' ? 'var(--color-primary)' : 'var(--color-text-muted)',
                  fontWeight: activeTab === 'messages' ? 700 : 500,
                  fontSize: '0.9rem',
                  textAlign: 'left',
                  cursor: 'pointer',
                  transition: 'var(--transition-fast)'
                }}
              >
                <MessageSquare size={18} />
                <span>Kotak Aduan</span>
                <span style={{ 
                  marginLeft: 'auto', 
                  backgroundColor: activeTab === 'messages' ? 'var(--color-primary)' : 'var(--color-border)', 
                  color: activeTab === 'messages' ? '#fff' : 'var(--color-text-muted)',
                  padding: '0.1rem 0.4rem', 
                  borderRadius: '10px', 
                  fontSize: '0.75rem' 
                }}>
                  {messages.length}
                </span>
              </button>

              <button
                onClick={() => setActiveTab('news')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.75rem 1rem',
                  width: '100%',
                  border: 'none',
                  borderRadius: 'var(--border-radius-sm)',
                  backgroundColor: activeTab === 'news' ? 'var(--color-primary-light)' : 'transparent',
                  color: activeTab === 'news' ? 'var(--color-primary)' : 'var(--color-text-muted)',
                  fontWeight: activeTab === 'news' ? 700 : 500,
                  fontSize: '0.9rem',
                  textAlign: 'left',
                  cursor: 'pointer',
                  transition: 'var(--transition-fast)'
                }}
              >
                <Newspaper size={18} />
                <span>Kelola Berita</span>
                <span style={{ 
                  marginLeft: 'auto', 
                  backgroundColor: activeTab === 'news' ? 'var(--color-primary)' : 'var(--color-border)', 
                  color: activeTab === 'news' ? '#fff' : 'var(--color-text-muted)',
                  padding: '0.1rem 0.4rem', 
                  borderRadius: '10px', 
                  fontSize: '0.75rem' 
                }}>
                  {news.length}
                </span>
              </button>
            </div>
          </div>

          {/* Active Panel Content */}
          <div style={{ backgroundColor: '#fff', padding: '2rem', borderRadius: 'var(--border-radius-md)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)' }}>
            
            {/* 1. PENGAJUAN SURAT TAB */}
            {activeTab === 'requests' && (
              <div>
                <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <FileText size={22} style={{ color: 'var(--color-primary)' }} /> Daftar Pengajuan Surat Keterangan Warga
                </h2>

                {requests.length === 0 ? (
                  <p style={{ textAlign: 'center', color: 'var(--color-text-muted)', padding: '2rem 0' }}>Belum ada pengajuan masuk.</p>
                ) : (
                  <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem', textAlign: 'left' }}>
                      <thead>
                        <tr style={{ borderBottom: '2px solid var(--color-border)', color: 'var(--color-text-dark)' }}>
                          <th style={{ padding: '0.75rem' }}>Pemohon / NIK</th>
                          <th style={{ padding: '0.75rem' }}>Layanan</th>
                          <th style={{ padding: '0.75rem' }}>Detail & No.HP</th>
                          <th style={{ padding: '0.75rem' }}>Status</th>
                          <th style={{ padding: '0.75rem', textAlign: 'center' }}>Tindakan</th>
                        </tr>
                      </thead>
                      <tbody>
                        {requests.map((req) => (
                          <tr key={req.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                            <td style={{ padding: '1rem 0.75rem' }}>
                              <strong style={{ display: 'block', color: 'var(--color-text-dark)' }}>{req.nama_pemohon}</strong>
                              <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>NIK: {req.nik}</span>
                            </td>
                            <td style={{ padding: '1rem 0.75rem' }}>
                              <span style={{ fontWeight: 500 }}>{req.nama_layanan}</span>
                            </td>
                            <td style={{ padding: '1rem 0.75rem' }}>
                              <span style={{ display: 'block', fontSize: '0.8rem', color: 'var(--color-text-muted)', marginBottom: '0.25rem' }}>"{req.keterangan}"</span>
                              <span style={{ fontSize: '0.75rem', fontWeight: 600 }}>HP: {req.no_hp}</span>
                            </td>
                            <td style={{ padding: '1rem 0.75rem' }}>
                              <span style={getStatusBadgeStyle(req.status)}>{req.status}</span>
                            </td>
                            <td style={{ padding: '1rem 0.75rem', textAlign: 'center' }}>
                              <div style={{ display: 'flex', gap: '0.25rem', justifyContent: 'center' }}>
                                <button 
                                  onClick={() => handleStatusChange(req.id, 'Diproses')}
                                  title="Proses Surat"
                                  style={{ backgroundColor: '#2563eb', color: 'white', border: 'none', padding: '0.25rem 0.5rem', borderRadius: '4px', cursor: 'pointer', fontSize: '0.75rem' }}
                                >
                                  Proses
                                </button>
                                <button 
                                  onClick={() => handleStatusChange(req.id, 'Selesai')}
                                  title="Selesaikan Surat"
                                  style={{ backgroundColor: '#059669', color: 'white', border: 'none', padding: '0.25rem 0.5rem', borderRadius: '4px', cursor: 'pointer', fontSize: '0.75rem' }}
                                >
                                  Selesai
                                </button>
                                <button 
                                  onClick={() => handleDeleteRequest(req.id)}
                                  title="Hapus"
                                  style={{ backgroundColor: '#ef4444', color: 'white', border: 'none', padding: '0.25rem 0.5rem', borderRadius: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                                >
                                  <Trash2 size={12} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {/* 2. KOTAK ADUAN TAB */}
            {activeTab === 'messages' && (
              <div>
                <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <MessageSquare size={22} style={{ color: 'var(--color-primary)' }} /> Kotak Masuk Aduan & Saran Warga
                </h2>

                {messages.length === 0 ? (
                  <p style={{ textAlign: 'center', color: 'var(--color-text-muted)', padding: '2rem 0' }}>Belum ada pesan masuk.</p>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    {messages.map((msg) => (
                      <div key={msg.id} style={{
                        border: '1px solid var(--color-border)',
                        borderRadius: 'var(--border-radius-sm)',
                        padding: '1.25rem',
                        position: 'relative',
                        backgroundColor: 'var(--color-bg-light)'
                      }}>
                        <button 
                          onClick={() => handleDeleteMessage(msg.id)}
                          style={{
                            position: 'absolute',
                            top: '15px',
                            right: '15px',
                            background: 'none',
                            border: 'none',
                            color: 'var(--color-danger)',
                            cursor: 'pointer'
                          }}
                          title="Hapus Pesan"
                        >
                          <Trash2 size={18} />
                        </button>
                        
                        <div style={{ display: 'flex', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--color-text-muted)', marginBottom: '0.5rem' }}>
                          <span style={{ fontWeight: 600, color: 'var(--color-text-dark)' }}>{msg.nama}</span>
                          <span>•</span>
                          <span>{msg.email}</span>
                          <span>•</span>
                          <span>{new Date(msg.created_at).toLocaleDateString('id-ID')}</span>
                        </div>
                        
                        <h4 style={{ fontSize: '1rem', color: 'var(--color-text-dark)', marginBottom: '0.5rem' }}>Subjek: {msg.subjek}</h4>
                        <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', margin: 0, whiteSpace: 'pre-line' }}>{msg.pesan}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* 3. KELOLA BERITA TAB */}
            {activeTab === 'news' && (
              <div>
                <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Newspaper size={22} style={{ color: 'var(--color-primary)' }} /> Kelola & Publikasi Berita Kelurahan
                </h2>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                  gap: '2.5rem',
                  alignItems: 'start'
                }}>
                  {/* Form input berita */}
                  <form onSubmit={handleAddNews} style={{
                    padding: '1.5rem',
                    border: '1px solid var(--color-border)',
                    borderRadius: 'var(--border-radius-sm)',
                    backgroundColor: 'var(--color-bg-light)'
                  }}>
                    <h3 style={{ fontSize: '1rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      <FilePlus2 size={18} style={{ color: 'var(--color-primary)' }} /> Tulis Berita Baru
                    </h3>
                    
                    {newsSuccess && <p style={{ color: 'var(--color-success)', fontSize: '0.8rem', fontWeight: 600, marginBottom: '1rem' }}>Berita berhasil dipublikasikan!</p>}
                    {newsError && <p style={{ color: 'var(--color-danger)', fontSize: '0.8rem', fontWeight: 600, marginBottom: '1rem' }}>{newsError}</p>}

                    <div className="form-group">
                      <label className="form-label" style={{ fontSize: '0.8rem' }}>Judul Berita *</label>
                      <input 
                        type="text" 
                        className="form-control"
                        placeholder="Contoh: Kerja Bakti RW 03"
                        style={{ padding: '0.5rem 0.75rem', fontSize: '0.9rem' }}
                        value={newNews.judul}
                        onChange={(e) => setNewNews({ ...newNews, judul: e.target.value })}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label" style={{ fontSize: '0.8rem' }}>Kategori *</label>
                      <select 
                        className="form-control"
                        style={{ padding: '0.5rem 0.75rem', fontSize: '0.9rem' }}
                        value={newNews.kategori}
                        onChange={(e) => setNewNews({ ...newNews, kategori: e.target.value })}
                      >
                        <option value="Kegiatan">Kegiatan</option>
                        <option value="Pengumuman">Pengumuman</option>
                        <option value="Edukasi">Edukasi</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label className="form-label" style={{ fontSize: '0.8rem' }}>Ringkasan *</label>
                      <input 
                        type="text" 
                        className="form-control"
                        placeholder="Ringkasan singkat berita..."
                        style={{ padding: '0.5rem 0.75rem', fontSize: '0.9rem' }}
                        value={newNews.ringkasan}
                        onChange={(e) => setNewNews({ ...newNews, ringkasan: e.target.value })}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label" style={{ fontSize: '0.8rem' }}>Konten Berita *</label>
                      <textarea 
                        className="form-control"
                        rows={4}
                        placeholder="Masukkan seluruh isi berita di sini..."
                        style={{ padding: '0.5rem 0.75rem', fontSize: '0.9rem' }}
                        value={newNews.konten}
                        onChange={(e) => setNewNews({ ...newNews, konten: e.target.value })}
                        required
                      ></textarea>
                    </div>

                    <div className="form-group">
                      <label className="form-label" style={{ fontSize: '0.8rem' }}>URL Gambar (Opsional)</label>
                      <input 
                        type="text" 
                        className="form-control"
                        placeholder="https://source.unsplash.com/..."
                        style={{ padding: '0.5rem 0.75rem', fontSize: '0.9rem' }}
                        value={newNews.gambar_url}
                        onChange={(e) => setNewNews({ ...newNews, gambar_url: e.target.value })}
                      />
                    </div>

                    <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '0.5rem', fontSize: '0.9rem', marginTop: '0.5rem' }}>
                      Publish Berita
                    </button>
                  </form>

                  {/* List berita eksisting */}
                  <div>
                    <h3 style={{ fontSize: '1rem', marginBottom: '1rem' }}>Daftar Berita Aktif</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      {news.map((item) => (
                        <div key={item.id} style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '1rem',
                          border: '1px solid var(--color-border)',
                          padding: '0.75rem',
                          borderRadius: 'var(--border-radius-sm)'
                        }}>
                          <img 
                            src={item.gambar_url} 
                            alt={item.judul} 
                            style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '4px' }}
                          />
                          <div style={{ flexGrow: 1, minWidth: 0 }}>
                            <h4 style={{ fontSize: '0.85rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', margin: 0 }}>
                              {item.judul}
                            </h4>
                            <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{item.tanggal_publish} • {item.kategori}</span>
                          </div>
                          <button 
                            onClick={() => handleDeleteNewsItem(item.id)}
                            style={{ background: 'none', border: 'none', color: 'var(--color-danger)', cursor: 'pointer', flexShrink: 0 }}
                            title="Hapus Berita"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Custom Confirmation Modal */}
      {confirmModal.isOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(15, 23, 42, 0.6)',
          backdropFilter: 'blur(4px)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1.5rem'
        }}>
          <div style={{
            backgroundColor: '#fff',
            borderRadius: 'var(--border-radius-md)',
            border: '1px solid var(--color-border)',
            boxShadow: 'var(--shadow-lg)',
            padding: '2rem',
            maxWidth: '400px',
            width: '100%',
            textAlign: 'center',
            animation: 'fadeIn 0.2s ease-out'
          }}>
            <div style={{
              backgroundColor: '#fee2e2',
              color: '#ef4444',
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.25rem auto'
            }}>
              <ShieldAlert size={28} />
            </div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', fontFamily: 'var(--font-display)', color: 'var(--color-text-dark)' }}>
              {confirmModal.title}
            </h3>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', marginBottom: '1.75rem', lineHeight: '1.5' }}>
              {confirmModal.message}
            </p>
            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
              <button 
                onClick={closeConfirmModal}
                style={{
                  padding: '0.6rem 1.25rem',
                  backgroundColor: '#f1f5f9',
                  color: 'var(--color-text-muted)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--border-radius-sm)',
                  fontWeight: 600,
                  cursor: 'pointer',
                  fontSize: '0.875rem',
                  transition: 'var(--transition-fast)'
                }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#e2e8f0'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#f1f5f9'}
              >
                Batal
              </button>
              <button 
                onClick={confirmModal.onConfirm}
                style={{
                  padding: '0.6rem 1.25rem',
                  backgroundColor: '#ef4444',
                  color: 'white',
                  border: 'none',
                  borderRadius: 'var(--border-radius-sm)',
                  fontWeight: 600,
                  cursor: 'pointer',
                  fontSize: '0.875rem',
                  transition: 'var(--transition-fast)'
                }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#dc2626'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#ef4444'}
              >
                Ya, Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
