const fs = require('fs');
const lines = fs.readFileSync('src/pages/Admin.jsx', 'utf8').split('\n');
const before = lines.slice(0, 430);
const after = lines.slice(829);

const newLayout = `      {/* Sidebar */}
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
        {/* Header */}
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

        {/* Content Scrollable Area */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '2rem' }}>
          
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

          {activeTab === 'requests' && (
            <div className="card animate-fade-in" style={{ padding: '2rem', minHeight: '60vh' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
                <h2 style={{ fontSize: '1.25rem', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <FileText size={22} style={{ color: 'var(--color-primary)' }} /> Daftar Pengajuan
                </h2>
                <div style={{ position: 'relative', width: '100%', maxWidth: '300px' }}>
                  <Search size={18} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Cari nama atau NIK..." 
                    style={{ width: '100%', paddingLeft: '2.5rem' }}
                    value={searchRequest}
                    onChange={(e) => setSearchRequest(e.target.value)}
                  />
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
                        <th style={{ padding: '1rem' }}>Layanan & Keterangan</th>
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
                              <button onClick={() => handleStatusChange(req.id, 'Diproses')} title="Proses Surat" style={{ backgroundColor: '#2563eb', color: 'white', border: 'none', padding: '0.35rem 0.75rem', borderRadius: '4px', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 600 }}>Proses</button>
                              <button onClick={() => handleStatusChange(req.id, 'Selesai')} title="Selesaikan Surat" style={{ backgroundColor: '#059669', color: 'white', border: 'none', padding: '0.35rem 0.75rem', borderRadius: '4px', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 600 }}>Selesai</button>
                              <button onClick={() => handleDeleteRequest(req.id)} title="Hapus" style={{ backgroundColor: '#fee2e2', color: '#dc2626', border: 'none', padding: '0.35rem', borderRadius: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center' }}><Trash2 size={16} /></button>
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

          {activeTab === 'messages' && (
            <div className="card animate-fade-in" style={{ padding: '2rem', minHeight: '60vh' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
                <h2 style={{ fontSize: '1.25rem', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <MessageSquare size={22} style={{ color: 'var(--color-primary)' }} /> Pesan & Aduan Masuk
                </h2>
                <div style={{ position: 'relative', width: '100%', maxWidth: '300px' }}>
                  <Search size={18} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Cari pengirim atau subjek..." 
                    style={{ width: '100%', paddingLeft: '2.5rem' }}
                    value={searchMessage}
                    onChange={(e) => setSearchMessage(e.target.value)}
                  />
                </div>
              </div>

              {filteredMessages.length === 0 ? (
                <p style={{ textAlign: 'center', color: 'var(--color-text-muted)', padding: '3rem 0' }}>Tidak ada aduan ditemukan.</p>
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                  {filteredMessages.map((msg) => (
                    <div key={msg.id} style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--border-radius-sm)', padding: '1.5rem', backgroundColor: '#fff', boxShadow: 'var(--shadow-sm)', display: 'flex', flexDirection: 'column' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                        <div>
                          <span style={{ fontWeight: 700, color: 'var(--color-text-dark)', display: 'block', fontSize: '1rem' }}>{msg.nama}</span>
                          <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>{msg.email} • {new Date(msg.created_at).toLocaleDateString('id-ID')}</span>
                        </div>
                        <button onClick={() => handleDeleteMessage(msg.id)} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }} onMouseOver={(e) => e.currentTarget.style.color = '#dc2626'} onMouseOut={(e) => e.currentTarget.style.color = '#94a3b8'} title="Hapus Pesan">
                          <Trash2 size={18} />
                        </button>
                      </div>
                      <h4 style={{ fontSize: '0.95rem', color: 'var(--color-text-dark)', marginBottom: '0.5rem' }}>{msg.subjek}</h4>
                      <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', margin: 0, whiteSpace: 'pre-line', flexGrow: 1 }}>{msg.pesan}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

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
      </div>`;

const fileContent = before.join('\n') + '\n' + newLayout + '\n' + after.join('\n');
fs.writeFileSync('src/pages/Admin.jsx', fileContent);
console.log('Layout replaced successfully!');
