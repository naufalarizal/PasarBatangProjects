import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Search, ArrowRight, Grid, AlertCircle } from 'lucide-react';
import { supabase, isSupabaseConfigured } from '../supabaseClient';

export default function Berita() {
  const [news, setNews] = useState([]);
  const [filteredNews, setFilteredNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');

  const categories = ['Semua', 'Kegiatan', 'Pengumuman', 'Edukasi'];

  useEffect(() => {
    async function fetchNews() {
      if (isSupabaseConfigured) {
        try {
          const { data, error } = await supabase
            .from('berita')
            .select('*')
            .order('tanggal_publish', { ascending: false });
          if (!error && data && data.length > 0) {
            setNews(data);
            setFilteredNews(data);
            setLoading(false);
            return;
          }
        } catch (e) {
          console.error("Gagal memuat berita dari Supabase, memuat mock data.", e);
        }
      }
      
      // Fallback ke localStorage / mockData
      const localNews = localStorage.getItem('kelurahan_mekarsari_news');
      if (localNews) {
        const parsed = JSON.parse(localNews);
        setNews(parsed);
        setFilteredNews(parsed);
      } else {
        import('../mockData').then((module) => {
          setNews(module.MOCK_NEWS);
          setFilteredNews(module.MOCK_NEWS);
        });
      }
      setLoading(false);
    }
    fetchNews();
  }, []);

  // Filter & Search Logic
  useEffect(() => {
    let result = news;

    if (selectedCategory !== 'Semua') {
      result = result.filter(n => n.kategori.toLowerCase() === selectedCategory.toLowerCase());
    }

    if (searchTerm.trim() !== '') {
      result = result.filter(n => 
        n.judul.toLowerCase().includes(searchTerm.toLowerCase()) || 
        n.ringkasan.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredNews(result);
  }, [searchTerm, selectedCategory, news]);

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
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'white', marginBottom: '0.5rem' }}>Berita & Kegiatan</h1>
          <p style={{ opacity: 0.9, fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
            Temukan berita terkini, rilis pengumuman resmi, dan dokumentasi kegiatan warga Kelurahan Mekarsari.
          </p>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="section-padding container">
        {/* Filters and Search Bar */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '1.5rem',
          marginBottom: '3rem',
          flexWrap: 'wrap'
        }}>
          {/* Categories Tab */}
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  padding: '0.5rem 1.25rem',
                  borderRadius: 'var(--border-radius-full)',
                  border: '1px solid var(--color-border)',
                  backgroundColor: selectedCategory === cat ? 'var(--color-primary)' : '#fff',
                  color: selectedCategory === cat ? 'white' : 'var(--color-text-muted)',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  transition: 'var(--transition-fast)'
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div style={{ position: 'relative', minWidth: '280px', flexGrow: 0 }}>
            <input 
              type="text" 
              placeholder="Cari berita..." 
              className="form-control"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                paddingLeft: '2.5rem',
                borderRadius: 'var(--border-radius-full)',
                width: '100%'
              }}
            />
            <Search 
              size={18} 
              style={{
                position: 'absolute',
                left: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--color-text-muted)'
              }} 
            />
          </div>
        </div>

        {/* News Grid */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '3rem 0', color: 'var(--color-text-muted)' }}>Memuat Berita...</div>
        ) : filteredNews.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '4rem 2rem',
            background: '#fff',
            borderRadius: 'var(--border-radius-md)',
            border: '1px solid var(--color-border)',
            color: 'var(--color-text-muted)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1rem'
          }}>
            <AlertCircle size={40} style={{ color: 'var(--color-accent)' }} />
            <div>
              <h3>Tidak ada berita ditemukan</h3>
              <p style={{ fontSize: '0.9rem' }}>Coba ubah kata kunci pencarian Anda atau pilih kategori lain.</p>
            </div>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2rem'
          }}>
            {filteredNews.map((item) => (
              <article key={item.id} className="card" style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                <div style={{ height: '220px', position: 'relative', overflow: 'hidden' }}>
                  <img 
                    src={item.gambar_url || 'https://images.unsplash.com/photo-1594708767771-a7502209ff51?auto=format&fit=crop&q=80&w=800&h=450'} 
                    alt={item.judul}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.5s ease'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                    onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                  />
                  <span style={{
                    position: 'absolute',
                    top: '15px',
                    left: '15px',
                    backgroundColor: 'var(--color-primary)',
                    color: 'white',
                    padding: '0.25rem 0.75rem',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    borderRadius: 'var(--border-radius-full)'
                  }}>
                    {item.kategori}
                  </span>
                </div>
                <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                  <div style={{ display: 'flex', gap: '1rem', fontSize: '0.8rem', color: 'var(--color-text-muted)', marginBottom: '0.75rem' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      <Calendar size={14} /> {item.tanggal_publish}
                    </span>
                    <span>• Penulis: {item.penulis}</span>
                  </div>
                  <h3 style={{ fontSize: '1.2rem', marginBottom: '0.75rem', lineHeight: '1.4' }}>
                    <Link to={`/berita/${item.id}`} style={{ hoverColor: 'var(--color-primary)' }}>
                      {item.judul}
                    </Link>
                  </h3>
                  <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem', flexGrow: 1 }}>
                    {item.ringkasan}
                  </p>
                  <Link to={`/berita/${item.id}`} style={{
                    color: 'var(--color-primary)',
                    fontWeight: 700,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.25rem',
                    fontSize: '0.9rem'
                  }}>
                    Baca Selengkapnya <ArrowRight size={14} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
