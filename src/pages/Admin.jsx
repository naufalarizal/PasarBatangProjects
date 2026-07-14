import React, { useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../supabaseClient';
import { 
  getLocalRequests, updateLocalRequestStatus, deleteLocalRequest,
  getLocalMessages, updateLocalMessageStatus, deleteLocalMessage,
  getLocalNews, addLocalNews, deleteLocalNews
} from '../mockData';
import { 
  FileText, MessageSquare, Newspaper, ShieldAlert,
  Trash2, LogIn, LayoutDashboard, User, FilePlus2,
  Search, BarChart3, Clock
} from 'lucide-react';

export default function Admin() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  
  // Dashboard Tabs: 'overview' | 'requests' | 'messages' | 'news'
  const [activeTab, setActiveTab] = useState('overview');
  const [searchRequest, setSearchRequest] = useState('');
  const [searchMessage, setSearchMessage] = useState('');
  
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

      // Auto-refresh setiap 3 detik agar data pengaduan baru muncul real-time
      const interval = setInterval(() => {
        loadDashboardData();
      }, 3000);

      // Tangkap perubahan localStorage dari tab/window lain
      const handleStorageChange = () => {
        loadDashboardData();
      };
      window.addEventListener('storage', handleStorageChange);

      return () => {
        clearInterval(interval);
        window.removeEventListener('storage', handleStorageChange);
      };
    }
  }, [isLoggedIn]);

  const loadDashboardData = async () => {
    // Selalu load dari localStorage terlebih dahulu (sebagai basis data yang pasti ada)
    let localReqs = getLocalRequests();
    let localMsgs = getLocalMessages();
    let localNews = getLocalNews();

    if (isSupabaseConfigured) {
      try {
        const { data: reqData, error: reqErr } = await supabase
          .from('pengajuan_layanan')
          .select('*, layanan:layanan_id(nama_layanan)')
          .order('created_at', { ascending: false });
        if (!reqErr && reqData && reqData.length > 0) {
          const formatted = reqData.map(r => ({
            ...r,
            nama_layanan: r.layanan?.nama_layanan || 'Layanan'
          }));
          // Gabungkan: Supabase data + local-only data
          const supaIds = new Set(formatted.map(r => r.id));
          const uniqueLocal = localReqs.filter(r => !supaIds.has(r.id));
          setRequests([...formatted, ...uniqueLocal]);
        } else {
          setRequests(localReqs);
        }

        const { data: msgData, error: msgErr } = await supabase
          .from('pesan_kontak')
          .select('*')
          .order('created_at', { ascending: false });
        if (!msgErr && msgData && msgData.length > 0) {
          const supaIds = new Set(msgData.map(m => m.id));
          const uniqueLocal = localMsgs.filter(m => !supaIds.has(m.id));
          setMessages([...msgData, ...uniqueLocal]);
        } else {
          setMessages(localMsgs);
        }

        const { data: newsData, error: newsErr } = await supabase
          .from('berita')
          .select('*')
          .order('tanggal_publish', { ascending: false });
        if (!newsErr && newsData && newsData.length > 0) {
          const supaIds = new Set(newsData.map(n => n.id));
          const uniqueLocal = localNews.filter(n => !supaIds.has(n.id));
          setNews([...newsData, ...uniqueLocal]);
        } else {
          setNews(localNews);
        }

        return;
      } catch (err) {
        console.warn("Supabase tidak tersedia, menggunakan data lokal.", err.message);
      }
    }

    // Fallback murni localStorage
    setRequests(localReqs);
    setMessages(localMsgs);
    setNews(localNews);
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

  // --- Helper Cek ID Lokal ---
  const isLocalId = (id) => typeof id === 'string' && (id.startsWith('req-') || id.startsWith('msg-') || id.startsWith('n-'));

  // --- Pengajuan Surat Handlers ---
  const handleStatusChange = async (id, newStatus) => {
    if (isSupabaseConfigured && !isLocalId(id)) {
      try {
        const { error } = await supabase
          .from('pengajuan_layanan')
          .update({ status: newStatus })
          .eq('id', id);
        if (error) throw error;
        loadDashboardData();
      } catch (err) {
        console.warn('Gagal update di Supabase, mencoba lokal.', err.message);
        updateLocalRequestStatus(id, newStatus);
        setRequests(getLocalRequests());
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
        if (isSupabaseConfigured && !isLocalId(id)) {
          try {
            const { error } = await supabase
              .from('pengajuan_layanan')
              .delete()
              .eq('id', id);
            if (error) throw error;
            loadDashboardData();
          } catch (err) {
            console.warn('Gagal hapus di Supabase, menghapus lokal.', err.message);
            deleteLocalRequest(id);
            setRequests(getLocalRequests());
          }
        } else {
          deleteLocalRequest(id);
          setRequests(getLocalRequests());
        }
      }
    );
  };

  // --- Kotak Aduan Handlers ---
  const handleMessageStatusChange = async (id, newStatus) => {
    if (isSupabaseConfigured && !isLocalId(id)) {
      try {
        const { error } = await supabase
          .from('pesan_kontak')
          .update({ status: newStatus })
          .eq('id', id);
        if (error) throw error;
        loadDashboardData();
      } catch (err) {
        console.warn('Gagal update di Supabase, mencoba lokal.', err.message);
        updateLocalMessageStatus(id, newStatus);
        setMessages(getLocalMessages());
      }
    } else {
      updateLocalMessageStatus(id, newStatus);
      setMessages(getLocalMessages());
    }
  };

  const handleDeleteMessage = (id) => {
    triggerConfirm(
      'Hapus Laporan/Pesan Warga',
      'Apakah Anda yakin ingin menghapus pesan aduan ini? Pesan yang dihapus akan hilang dari kotak masuk.',
      async () => {
        if (isSupabaseConfigured && !isLocalId(id)) {
          try {
            const { error } = await supabase
              .from('pesan_kontak')
              .delete()
              .eq('id', id);
            if (error) throw error;
            loadDashboardData();
          } catch (err) {
            console.warn('Gagal hapus di Supabase, mencoba lokal.', err.message);
            deleteLocalMessage(id);
            setMessages(getLocalMessages());
          }
        } else {
          deleteLocalMessage(id);
          setMessages(getLocalMessages());
        }
      }
    );
  };

  // --- Berita Handlers ---
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
        const { error } = await supabase.from('berita').insert([payload]);
        if (error) throw error;
        setNewsSuccess(true);
        setNewNews({ judul: '', ringkasan: '', konten: '', kategori: 'Kegiatan', gambar_url: '', penulis: 'Pamong Kelurahan' });
        loadDashboardData();
      } catch (err) {
        console.error(err);
        setNewsError('Gagal menambahkan berita ke database Supabase.');
      }
    } else {
      addLocalNews(payload);
      setNewsSuccess(true);
      setNewNews({ judul: '', ringkasan: '', konten: '', kategori: 'Kegiatan', gambar_url: '', penulis: 'Pamong Kelurahan' });
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
            const { error } = await supabase.from('berita').delete().eq('id', id);
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

  // --- Badge Styles ---
  const getStatusBadgeStyle = (status) => {
    const base = { display: 'inline-block', padding: '0.2rem 0.6rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 700 };
    switch (status) {
      case 'Pending':    return { ...base, backgroundColor: '#fef3c7', color: '#d97706' };
      case 'Diproses':   return { ...base, backgroundColor: '#dbeafe', color: '#2563eb' };
      case 'Selesai':    return { ...base, backgroundColor: '#d1fae5', color: '#059669' };
      case 'Ditolak':    return { ...base, backgroundColor: '#fee2e2', color: '#dc2626' };
      default:           return base;
    }
  };

  const getMessageBadgeStyle = (status) => {
    const base = { display: 'inline-block', padding: '0.2rem 0.6rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 700 };
    switch (status) {
      case 'Baru':      return { ...base, backgroundColor: '#fef3c7', color: '#d97706' };
      case 'Ditindak':  return { ...base, backgroundColor: '#dbeafe', color: '#2563eb' };
      case 'Selesai':   return { ...base, backgroundColor: '#d1fae5', color: '#059669' };
      default:          return { ...base, backgroundColor: '#f1f5f9', color: '#64748b' };
    }
  };

  // --- Derived State ---
  const filteredRequests = requests.filter(req =>
    req.nama_pemohon?.toLowerCase().includes(searchRequest.toLowerCase()) ||
    req.nik?.includes(searchRequest)
  );
  const filteredMessages = messages.filter(msg =>
    msg.nama?.toLowerCase().includes(searchMessage.toLowerCase()) ||
    msg.no_wa?.includes(searchMessage) ||
    msg.subjek?.toLowerCase().includes(searchMessage.toLowerCase())
  );

  const totalRequests = requests.length;
  const pendingRequests = requests.filter(r => r.status === 'Pending').length;
  const totalMessages = messages.length;
  const activeNews = news.length;

  // --- UI Helpers ---
  const getTabStyle = (isActive) => ({
    display: 'flex', alignItems: 'center', gap: '0.75rem',
    padding: '0.85rem 1rem', width: '100%', border: 'none',
    borderRadius: 'var(--border-radius-sm)',
    backgroundColor: isActive ? 'var(--color-primary)' : 'transparent',
    color: isActive ? '#fff' : 'var(--color-text-dark)',
    fontWeight: isActive ? 600 : 500, fontSize: '0.9rem',
    textAlign: 'left', cursor: 'pointer', transition: 'var(--transition-fast)'
  });

  const getBadgeStyle = (isActive) => ({
    marginLeft: 'auto',
    backgroundColor: isActive ? 'rgba(255,255,255,0.2)' : 'var(--color-border)',
    color: isActive ? '#fff' : 'var(--color-text-dark)',
    padding: '0.15rem 0.5rem', borderRadius: '12px',
    fontSize: '0.7rem', fontWeight: 700
  });

  // --- LOGIN PANEL ---
  if (!isLoggedIn) {
    return (
      <div style={{ minHeight: '75vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }} className="animate-fade-in">
        <div className="card" style={{ maxWidth: '400px', width: '100%', padding: '2.5rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div style={{ backgroundColor: 'var(--color-primary-light)', color: 'var(--color-primary)', width: '56px', height: '56px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem auto' }}>
              <LogIn size={28} />
            </div>
            <h2 style={{ fontSize: '1.5rem', fontFamily: 'var(--font-display)' }}>Admin Panel Login</h2>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem' }}>Silakan login untuk memantau administrasi pengajuan warga.</p>
          </div>

          {loginError && (
            <div style={{ backgroundColor: '#fee2e2', color: '#dc2626', padding: '0.75rem 1rem', borderRadius: 'var(--border-radius-sm)', fontSize: '0.8rem', marginBottom: '1.25rem', border: '1px solid #fecaca' }}>
              {loginError}
            </div>
          )}

          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label className="form-label">Username</label>
              <input type="text" className="form-control" placeholder="Masukkan username" value={username} onChange={(e) => setUsername(e.target.value)} required />
            </div>
            <div className="form-group" style={{ marginBottom: '2rem' }}>
              <label className="form-label">Password</label>
              <input type="password" className="form-control" placeholder="Masukkan password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Masuk Dashboard</button>
          </form>

          <div style={{ marginTop: '1.5rem', backgroundColor: 'var(--color-bg-light)', padding: '1rem', borderRadius: 'var(--border-radius-sm)', fontSize: '0.8rem', textAlign: 'center', border: '1px dashed var(--color-border)' }}>
            <strong style={{ display: 'block', color: 'var(--color-primary)', marginBottom: '0.25rem' }}>Kredensial Demo:</strong>
            Username: <code style={{ backgroundColor: '#e2e8f0', padding: '0.1rem 0.3rem', borderRadius: '4px' }}>admin</code><br/>
            Password: <code style={{ backgroundColor: '#e2e8f0', padding: '0.1rem 0.3rem', borderRadius: '4px' }}>admin</code>
          </div>
        </div>
      </div>
    );
  }

  // --- DASHBOARD PANEL ---
  return (
    <div className="animate-fade-in" style={{ display: 'flex', height: '100dvh', backgroundColor: '#f8fafc', overflow: 'hidden' }}>
      {/* Sidebar */}
      <div style={{ width: '260px', backgroundColor: '#fff', borderRight: '1px solid var(--color-border)', display: 'flex', flexDirection: 'column', flexShrink: 0 }}>
        <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <LayoutDashboard size={28} style={{ color: 'var(--color-primary)' }} />
          <div>
            <h1 style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0, lineHeight: '1.2', color: 'var(--color-text-dark)' }}>Admin Panel</h1>
            <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Kelurahan Pasarbatang</span>
          </div>
        </div>

        <div style={{ padding: '1.5rem 1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', flexGrow: 1 }}>
          <button onClick={() => setActiveTab('overview')} style={getTabStyle(activeTab === 'overview')}>
            <BarChart3 size={18} /><span>Ringkasan</span>
          </button>
          <button onClick={() => setActiveTab('requests')} style={getTabStyle(activeTab === 'requests')}>
            <FileText size={18} /><span>Pengajuan Surat</span>
            <span style={getBadgeStyle(activeTab === 'requests')}>{pendingRequests > 0 ? pendingRequests + ' Baru' : totalRequests}</span>
          </button>
          <button onClick={() => setActiveTab('messages')} style={getTabStyle(activeTab === 'messages')}>
            <MessageSquare size={18} /><span>Kotak Aduan</span>
            <span style={getBadgeStyle(activeTab === 'messages')}>{totalMessages}</span>
          </button>
          <button onClick={() => setActiveTab('news')} style={getTabStyle(activeTab === 'news')}>
            <Newspaper size={18} /><span>Kelola Berita</span>
            <span style={getBadgeStyle(activeTab === 'news')}>{activeNews}</span>
          </button>
        </div>

        <div style={{ padding: '1rem', borderTop: '1px solid var(--color-border)' }}>
          <button onClick={() => setIsLoggedIn(false)} className="btn btn-secondary" style={{ width: '100%', padding: '0.75rem', fontSize: '0.85rem' }}>
            <LogIn size={16} /> Logout Admin
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {/* Top Header */}
        <div style={{ height: '70px', backgroundColor: '#fff', borderBottom: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', padding: '0 2rem', justifyContent: 'space-between', flexShrink: 0 }}>
          <h2 style={{ fontSize: '1.25rem', margin: 0, fontWeight: 700, color: 'var(--color-text-dark)' }}>
            {activeTab === 'overview' && 'Ringkasan Dashboard'}
            {activeTab === 'requests' && 'Kelola Pengajuan Surat'}
            {activeTab === 'messages' && 'Kotak Aduan Warga'}
            {activeTab === 'news' && 'Publikasi Berita'}
          </h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ textAlign: 'right' }}>
              <strong style={{ display: 'block', fontSize: '0.9rem', color: 'var(--color-text-dark)' }}>Admin Kelurahan</strong>
              <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>admin@pasarbatang.go.id</span>
            </div>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'var(--color-primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-primary)' }}>
              <User size={20} />
            </div>
          </div>
        </div>

        {/* Scrollable Content */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '2rem' }}>

          {/* ===== TAB: OVERVIEW ===== */}
          {activeTab === 'overview' && (
            <div className="animate-fade-in">
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
                <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', padding: '1.5rem' }}>
                  <div style={{ padding: '1rem', backgroundColor: 'var(--color-primary-light)', color: 'var(--color-primary)', borderRadius: '12px' }}>
                    <FileText size={28} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '2rem', margin: 0, color: 'var(--color-text-dark)' }}>{totalRequests}</h3>
                    <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>Total Pengajuan</span>
                  </div>
                </div>
                <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', padding: '1.5rem' }}>
                  <div style={{ padding: '1rem', backgroundColor: '#fef3c7', color: '#d97706', borderRadius: '12px' }}>
                    <Clock size={28} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '2rem', margin: 0, color: 'var(--color-text-dark)' }}>{pendingRequests}</h3>
                    <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>Menunggu Proses</span>
                  </div>
                </div>
                <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', padding: '1.5rem' }}>
                  <div style={{ padding: '1rem', backgroundColor: '#e0e7ff', color: '#4f46e5', borderRadius: '12px' }}>
                    <MessageSquare size={28} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '2rem', margin: 0, color: 'var(--color-text-dark)' }}>{totalMessages}</h3>
                    <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>Aduan Masuk</span>
                  </div>
                </div>
                <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', padding: '1.5rem' }}>
                  <div style={{ padding: '1rem', backgroundColor: '#dcfce7', color: '#16a34a', borderRadius: '12px' }}>
                    <Newspaper size={28} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '2rem', margin: 0, color: 'var(--color-text-dark)' }}>{activeNews}</h3>
                    <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>Berita Aktif</span>
                  </div>
                </div>
              </div>
              <div className="card" style={{ padding: '2rem' }}>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>Selamat Datang di Panel Admin</h3>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', lineHeight: '1.6' }}>
                  Gunakan menu di sebelah kiri untuk mengelola berbagai layanan administrasi warga.
                  Anda dapat memproses surat keterangan, membaca masukan dari kotak aduan, serta menerbitkan berita kegiatan kelurahan terbaru.
                </p>
              </div>
            </div>
          )}

          {/* ===== TAB: PENGAJUAN SURAT ===== */}
          {activeTab === 'requests' && (
            <div className="card animate-fade-in" style={{ padding: '2rem', minHeight: '60vh' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
                <h2 style={{ fontSize: '1.25rem', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <FileText size={22} style={{ color: 'var(--color-primary)' }} /> Daftar Pengajuan
                </h2>
                <div style={{ position: 'relative', width: '100%', maxWidth: '300px' }}>
                  <Search size={18} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
                  <input type="text" className="form-control" placeholder="Cari nama atau NIK..." style={{ width: '100%', paddingLeft: '2.5rem' }} value={searchRequest} onChange={(e) => setSearchRequest(e.target.value)} />
                </div>
              </div>

              {filteredRequests.length === 0 ? (
                <p style={{ textAlign: 'center', color: 'var(--color-text-muted)', padding: '3rem 0' }}>Tidak ada pengajuan ditemukan.</p>
              ) : (
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem', textAlign: 'left' }}>
                    <thead>
                      <tr style={{ backgroundColor: '#f1f5f9', color: 'var(--color-text-dark)' }}>
                        <th style={{ padding: '1rem', borderTopLeftRadius: '8px', borderBottomLeftRadius: '8px' }}>Pemohon / NIK</th>
                        <th style={{ padding: '1rem' }}>Layanan &amp; Keterangan</th>
                        <th style={{ padding: '1rem' }}>Status</th>
                        <th style={{ padding: '1rem', textAlign: 'center', borderTopRightRadius: '8px', borderBottomRightRadius: '8px' }}>Tindakan</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredRequests.map((req) => (
                        <tr key={req.id} style={{ borderBottom: '1px solid var(--color-border)', transition: 'background-color 0.2s' }} onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f8fafc'} onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                          <td style={{ padding: '1.25rem 1rem' }}>
                            <strong style={{ display: 'block', color: 'var(--color-text-dark)', marginBottom: '0.25rem' }}>{req.nama_pemohon}</strong>
                            <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>NIK: {req.nik}</span>
                            <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '0.25rem' }}>HP: {req.no_hp}</span>
                          </td>
                          <td style={{ padding: '1.25rem 1rem' }}>
                            <span style={{ fontWeight: 600, display: 'block', marginBottom: '0.25rem' }}>{req.nama_layanan}</span>
                            <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>"{req.keterangan}"</span>
                          </td>
                          <td style={{ padding: '1.25rem 1rem' }}>
                            <span style={getStatusBadgeStyle(req.status)}>{req.status}</span>
                          </td>
                          <td style={{ padding: '1.25rem 1rem', textAlign: 'center' }}>
                            <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
                              <button onClick={() => handleStatusChange(req.id, 'Diproses')} style={{ backgroundColor: '#2563eb', color: 'white', border: 'none', padding: '0.35rem 0.75rem', borderRadius: '4px', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 600 }}>Proses</button>
                              <button onClick={() => handleStatusChange(req.id, 'Selesai')} style={{ backgroundColor: '#059669', color: 'white', border: 'none', padding: '0.35rem 0.75rem', borderRadius: '4px', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 600 }}>Selesai</button>
                              <button onClick={() => handleDeleteRequest(req.id)} style={{ backgroundColor: '#fee2e2', color: '#dc2626', border: 'none', padding: '0.35rem', borderRadius: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center' }}><Trash2 size={16} /></button>
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

          {/* ===== TAB: KOTAK ADUAN ===== */}
          {activeTab === 'messages' && (
            <div className="card animate-fade-in" style={{ padding: '2rem', minHeight: '60vh' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
                <h2 style={{ fontSize: '1.25rem', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <MessageSquare size={22} style={{ color: 'var(--color-primary)' }} /> Pesan &amp; Aduan Masuk
                </h2>
                <div style={{ position: 'relative', width: '100%', maxWidth: '300px' }}>
                  <Search size={18} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
                  <input type="text" className="form-control" placeholder="Cari nama atau No. WA..." style={{ width: '100%', paddingLeft: '2.5rem' }} value={searchMessage} onChange={(e) => setSearchMessage(e.target.value)} />
                </div>
              </div>

              {filteredMessages.length === 0 ? (
                <p style={{ textAlign: 'center', color: 'var(--color-text-muted)', padding: '3rem 0' }}>Tidak ada aduan ditemukan.</p>
              ) : (
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem', textAlign: 'left' }}>
                    <thead>
                      <tr style={{ backgroundColor: '#f1f5f9', color: 'var(--color-text-dark)' }}>
                        <th style={{ padding: '1rem', borderTopLeftRadius: '8px', borderBottomLeftRadius: '8px' }}>Pengirim</th>
                        <th style={{ padding: '1rem' }}>Subjek &amp; Pesan</th>
                        <th style={{ padding: '1rem' }}>Tanggal</th>
                        <th style={{ padding: '1rem' }}>Status</th>
                        <th style={{ padding: '1rem', textAlign: 'center', borderTopRightRadius: '8px', borderBottomRightRadius: '8px' }}>Tindakan</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredMessages.map((msg) => (
                        <tr key={msg.id} style={{ borderBottom: '1px solid var(--color-border)', transition: 'background-color 0.2s' }} onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f8fafc'} onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                          <td style={{ padding: '1.25rem 1rem' }}>
                            <strong style={{ display: 'block', color: 'var(--color-text-dark)', marginBottom: '0.25rem' }}>{msg.nama}</strong>
                            <a 
                              href={`https://wa.me/${(msg.no_wa || '').replace(/[^0-9]/g, '').replace(/^0/, '62')}`}
                              target="_blank" 
                              rel="noopener noreferrer"
                              style={{ fontSize: '0.75rem', color: '#16a34a', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}
                            >
                              📱 {msg.no_wa || '-'}
                            </a>
                          </td>
                          <td style={{ padding: '1.25rem 1rem', maxWidth: '320px' }}>
                            <span style={{ fontWeight: 600, display: 'block', marginBottom: '0.25rem', color: 'var(--color-text-dark)' }}>{msg.subjek}</span>
                            <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>"{msg.pesan}"</span>
                          </td>
                          <td style={{ padding: '1.25rem 1rem', whiteSpace: 'nowrap' }}>
                            <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>{new Date(msg.created_at).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
                          </td>
                          <td style={{ padding: '1.25rem 1rem' }}>
                            <span style={getMessageBadgeStyle(msg.status || 'Baru')}>{msg.status || 'Baru'}</span>
                          </td>
                          <td style={{ padding: '1.25rem 1rem', textAlign: 'center' }}>
                            <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
                              <button onClick={() => handleMessageStatusChange(msg.id, 'Ditindak')} style={{ backgroundColor: '#2563eb', color: 'white', border: 'none', padding: '0.35rem 0.75rem', borderRadius: '4px', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 600 }}>Ditindak</button>
                              <button onClick={() => handleMessageStatusChange(msg.id, 'Selesai')} style={{ backgroundColor: '#059669', color: 'white', border: 'none', padding: '0.35rem 0.75rem', borderRadius: '4px', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 600 }}>Selesai</button>
                              <button onClick={() => handleDeleteMessage(msg.id)} style={{ backgroundColor: '#fee2e2', color: '#dc2626', border: 'none', padding: '0.35rem', borderRadius: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center' }}><Trash2 size={16} /></button>
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

          {/* ===== TAB: KELOLA BERITA ===== */}
          {activeTab === 'news' && (
            <div className="card animate-fade-in" style={{ padding: '2rem', minHeight: '60vh' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem', alignItems: 'start' }}>
                <form onSubmit={handleAddNews} style={{ padding: '1.5rem', border: '1px solid var(--color-border)', borderRadius: 'var(--border-radius-sm)', backgroundColor: '#f8fafc' }}>
                  <h3 style={{ fontSize: '1.1rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <FilePlus2 size={20} style={{ color: 'var(--color-primary)' }} /> Buat Berita Baru
                  </h3>
                  {newsSuccess && <p style={{ color: 'var(--color-success)', fontSize: '0.85rem', fontWeight: 600, marginBottom: '1rem', padding: '0.5rem', backgroundColor: '#dcfce7', borderRadius: '4px' }}>Berita berhasil dipublikasikan!</p>}
                  {newsError && <p style={{ color: 'var(--color-danger)', fontSize: '0.85rem', fontWeight: 600, marginBottom: '1rem', padding: '0.5rem', backgroundColor: '#fee2e2', borderRadius: '4px' }}>{newsError}</p>}
                  <div className="form-group">
                    <label className="form-label" style={{ fontSize: '0.85rem' }}>Judul Berita *</label>
                    <input type="text" className="form-control" placeholder="Judul menarik..." style={{ fontSize: '0.9rem' }} value={newNews.judul} onChange={(e) => setNewNews({ ...newNews, judul: e.target.value })} required />
                  </div>
                  <div className="form-group">
                    <label className="form-label" style={{ fontSize: '0.85rem' }}>Kategori *</label>
                    <select className="form-control" style={{ fontSize: '0.9rem' }} value={newNews.kategori} onChange={(e) => setNewNews({ ...newNews, kategori: e.target.value })}>
                      <option value="Kegiatan">Kegiatan</option>
                      <option value="Pengumuman">Pengumuman</option>
                      <option value="Edukasi">Edukasi</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label" style={{ fontSize: '0.85rem' }}>Ringkasan *</label>
                    <input type="text" className="form-control" placeholder="Ringkasan singkat..." style={{ fontSize: '0.9rem' }} value={newNews.ringkasan} onChange={(e) => setNewNews({ ...newNews, ringkasan: e.target.value })} required />
                  </div>
                  <div className="form-group">
                    <label className="form-label" style={{ fontSize: '0.85rem' }}>Konten Berita *</label>
                    <textarea className="form-control" rows={6} placeholder="Isi berita..." style={{ fontSize: '0.9rem' }} value={newNews.konten} onChange={(e) => setNewNews({ ...newNews, konten: e.target.value })} required></textarea>
                  </div>
                  <div className="form-group">
                    <label className="form-label" style={{ fontSize: '0.85rem' }}>URL Gambar Utama (Opsional)</label>
                    <input type="text" className="form-control" placeholder="https://..." style={{ fontSize: '0.9rem' }} value={newNews.gambar_url} onChange={(e) => setNewNews({ ...newNews, gambar_url: e.target.value })} />
                  </div>
                  <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '0.5rem' }}>Publish Berita</button>
                </form>

                <div>
                  <h3 style={{ fontSize: '1.1rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Newspaper size={20} style={{ color: 'var(--color-primary)' }} /> Berita Aktif
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {news.length === 0 && <p style={{ color: 'var(--color-text-muted)' }}>Belum ada berita.</p>}
                    {news.map((item) => (
                      <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: '1rem', border: '1px solid var(--color-border)', padding: '1rem', borderRadius: 'var(--border-radius-sm)', backgroundColor: '#fff' }}>
                        <img src={item.gambar_url} alt={item.judul} style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '6px' }} />
                        <div style={{ flexGrow: 1, minWidth: 0 }}>
                          <h4 style={{ fontSize: '0.95rem', margin: '0 0 0.25rem 0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.judul}</h4>
                          <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>{item.tanggal_publish} • {item.kategori}</span>
                        </div>
                        <button onClick={() => handleDeleteNewsItem(item.id)} style={{ background: '#fee2e2', border: 'none', color: '#dc2626', cursor: 'pointer', padding: '0.5rem', borderRadius: '4px', flexShrink: 0 }} title="Hapus Berita">
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

      {/* Custom Confirmation Modal */}
      {confirmModal.isOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(4px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem' }}>
          <div style={{ backgroundColor: '#fff', borderRadius: 'var(--border-radius-md)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-lg)', padding: '2rem', maxWidth: '400px', width: '100%', textAlign: 'center', animation: 'fadeIn 0.2s ease-out' }}>
            <div style={{ backgroundColor: '#fee2e2', color: '#ef4444', width: '56px', height: '56px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem auto' }}>
              <ShieldAlert size={28} />
            </div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', fontFamily: 'var(--font-display)', color: 'var(--color-text-dark)' }}>{confirmModal.title}</h3>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', marginBottom: '1.75rem', lineHeight: '1.5' }}>{confirmModal.message}</p>
            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
              <button onClick={closeConfirmModal} style={{ padding: '0.6rem 1.25rem', backgroundColor: '#f1f5f9', color: 'var(--color-text-muted)', border: '1px solid var(--color-border)', borderRadius: 'var(--border-radius-sm)', fontWeight: 600, cursor: 'pointer', fontSize: '0.875rem' }} onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#e2e8f0'} onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#f1f5f9'}>
                Batal
              </button>
              <button onClick={confirmModal.onConfirm} style={{ padding: '0.6rem 1.25rem', backgroundColor: '#ef4444', color: 'white', border: 'none', borderRadius: 'var(--border-radius-sm)', fontWeight: 600, cursor: 'pointer', fontSize: '0.875rem' }} onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#dc2626'} onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#ef4444'}>
                Ya, Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
