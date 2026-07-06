import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Calendar, User, ArrowLeft, Tag, AlertCircle } from 'lucide-react';
import { supabase, isSupabaseConfigured } from '../supabaseClient';

export default function BeritaDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchArticle() {
      if (isSupabaseConfigured) {
        try {
          const { data, error } = await supabase
            .from('berita')
            .select('*')
            .eq('id', id)
            .single();
          if (!error && data) {
            setArticle(data);
            setLoading(false);
            return;
          }
        } catch (e) {
          console.error("Gagal mengambil detail berita dari Supabase.", e);
        }
      }

      // Fallback ke localStorage / mockData
      const localNews = localStorage.getItem('kelurahan_mekarsari_news');
      if (localNews) {
        const parsed = JSON.parse(localNews);
        const found = parsed.find(n => n.id === id);
        if (found) {
          setArticle(found);
          setLoading(false);
          return;
        }
      }
      
      // Fallback ke static mockData
      import('../mockData').then((module) => {
        const found = module.MOCK_NEWS.find(n => n.id === id);
        setArticle(found || null);
        setLoading(false);
      });
    }

    fetchArticle();
  }, [id]);

  if (loading) {
    return (
      <div className="container section-padding" style={{ textAlign: 'center' }}>
        <p>Memuat Artikel...</p>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="container section-padding" style={{ textAlign: 'center' }}>
        <div style={{
          maxWidth: '500px',
          margin: '0 auto',
          padding: '3rem',
          background: '#fff',
          borderRadius: 'var(--border-radius-md)',
          boxShadow: 'var(--shadow-sm)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1.5rem'
        }}>
          <AlertCircle size={48} style={{ color: 'var(--color-danger)' }} />
          <h3>Artikel Tidak Ditemukan</h3>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem' }}>
            Maaf, berita yang Anda cari tidak tersedia atau telah dihapus.
          </p>
          <Link to="/berita" className="btn btn-primary">
            <ArrowLeft size={16} /> Kembali ke Berita
          </Link>
        </div>
      </div>
    );
  }

  return (
    <article className="animate-fade-in container" style={{ padding: '3rem 1.5rem', maxWidth: '850px' }}>
      {/* Back Button */}
      <button 
        onClick={() => navigate('/berita')} 
        style={{
          background: 'none',
          border: 'none',
          color: 'var(--color-primary)',
          fontWeight: 700,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          fontSize: '0.95rem',
          marginBottom: '2rem'
        }}
      >
        <ArrowLeft size={18} /> Kembali ke Daftar Berita
      </button>

      {/* Meta Info */}
      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
        <span style={{
          backgroundColor: 'var(--color-primary-light)',
          color: 'var(--color-primary)',
          padding: '0.25rem 0.75rem',
          fontSize: '0.8rem',
          fontWeight: 700,
          borderRadius: 'var(--border-radius-full)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.25rem'
        }}>
          <Tag size={12} /> {article.kategori}
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
          <Calendar size={14} /> {article.tanggal_publish}
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
          <User size={14} /> {article.penulis}
        </span>
      </div>

      {/* Title */}
      <h1 style={{
        fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
        lineHeight: 1.2,
        fontWeight: 800,
        marginBottom: '2rem',
        fontFamily: 'var(--font-display)'
      }}>
        {article.judul}
      </h1>

      {/* Featured Image */}
      <div style={{
        width: '100%',
        height: 'clamp(250px, 45vw, 450px)',
        borderRadius: 'var(--border-radius-md)',
        overflow: 'hidden',
        boxShadow: 'var(--shadow-md)',
        marginBottom: '2.5rem'
      }}>
        <img 
          src={article.gambar_url || 'https://images.unsplash.com/photo-1594708767771-a7502209ff51?auto=format&fit=crop&q=80&w=800&h=450'} 
          alt={article.judul}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
        />
      </div>

      {/* Article Content */}
      <div style={{
        fontSize: '1.05rem',
        lineHeight: '1.85',
        color: 'var(--color-text-dark)',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
        whiteSpace: 'pre-wrap'
      }}>
        {article.konten.split('\n\n').map((para, index) => (
          <p key={index}>{para}</p>
        ))}
      </div>
    </article>
  );
}
