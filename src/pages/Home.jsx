import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, FileText, CheckCircle, Clock, Calendar, ChevronRight, MessageSquare } from 'lucide-react';
import { MOCK_STATS, MOCK_SERVICES } from '../mockData';
import { supabase, isSupabaseConfigured } from '../supabaseClient';

export default function Home() {
  const [latestNews, setLatestNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNews() {
      if (isSupabaseConfigured) {
        try {
          const { data, error } = await supabase
            .from('berita')
            .select('*')
            .order('tanggal_publish', { ascending: false })
            .limit(3);
          
          if (!error && data && data.length > 0) {
            setLatestNews(data);
            setLoading(false);
            return;
          }
        } catch (e) {
          console.error("Gagal memuat berita dari Supabase, memuat mock data.", e);
        }
      }
      
      // Fallback ke mock data lokal
      const localNews = localStorage.getItem('kelurahan_mekarsari_news');
      if (localNews) {
        setLatestNews(JSON.parse(localNews).slice(0, 3));
      } else {
        // Ambil dari file mockData secara langsung
        import('../mockData').then((module) => {
          setLatestNews(module.MOCK_NEWS.slice(0, 3));
        });
      }
      setLoading(false);
    }
    fetchNews();
  }, []);

  return (
    <div className="animate-fade-in">
      {/* 1. Hero Section */}
      <section style={{
        position: 'relative',
        minHeight: '85vh',
        background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.9), rgba(5, 150, 105, 0.8)), url("https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=1600&h=900")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'center',
        color: 'white',
        padding: '2rem 0'
      }}>
        <div className="container" style={{ zindex: 2 }}>
          <div style={{ maxWidth: '750px' }}>
            <span style={{
              display: 'inline-block',
              background: 'rgba(16, 185, 129, 0.2)',
              border: '1px solid rgba(16, 185, 129, 0.4)',
              color: '#34d399',
              padding: '0.4rem 1rem',
              borderRadius: 'var(--border-radius-full)',
              fontSize: '0.85rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '1px',
              marginBottom: '1.5rem'
            }}>
              Selamat Datang di Portal Resmi
            </span>
            <h1 style={{
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              fontWeight: 800,
              lineHeight: 1.1,
              marginBottom: '1.5rem',
              fontFamily: 'var(--font-display)',
              color: '#ffffff'
            }}>
              Membangun Pelayanan Publik <span style={{ color: '#34d399' }}>Mekarsari</span> Lebih Prima
            </h1>
            <p style={{
              fontSize: 'clamp(1.05rem, 2vw, 1.25rem)',
              opacity: 0.9,
              marginBottom: '2.5rem',
              lineHeight: '1.7'
            }}>
              Akses informasi profil wilayah, berita kegiatan, persyaratan dokumen, hingga pengajuan administrasi mandiri secara online dan transparan.
            </p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Link to="/layanan" className="btn btn-primary" style={{ padding: '0.9rem 1.8rem' }}>
                Layanan Publik <ArrowRight size={18} />
              </Link>
              <Link to="/kontak" className="btn" style={{
                padding: '0.9rem 1.8rem',
                backgroundColor: 'var(--color-accent)',
                color: 'white',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem'
              }} onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#b45309'} onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'var(--color-accent)'}>
                Pengaduan Masyarakat <MessageSquare size={18} />
              </Link>
              <Link to="/profil" className="btn btn-outline-white" style={{ padding: '0.9rem 1.8rem' }}>
                Pelajari Profil
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Statistik Section */}
      <section style={{
        backgroundColor: '#ffffff',
        padding: '3rem 0',
        marginTop: '-4rem',
        position: 'relative',
        zIndex: 5,
        borderRadius: 'var(--border-radius-lg)',
        boxShadow: 'var(--shadow-lg)',
        marginRight: '1.5rem',
        marginLeft: '1.5rem'
      }} className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '2rem',
          textAlign: 'center'
        }}>
          {MOCK_STATS.map((stat, idx) => (
            <div key={idx} style={{
              padding: '1rem 0.5rem',
              borderRight: idx === MOCK_STATS.length - 1 ? 'none' : '1px solid var(--color-border)'
            }}>
              <h3 style={{
                fontSize: '2.5rem',
                fontWeight: 800,
                color: 'var(--color-primary)',
                fontFamily: 'var(--font-display)',
                marginBottom: '0.25rem'
              }}>{stat.value}</h3>
              <p style={{
                fontWeight: 600,
                color: 'var(--color-text-dark)',
                fontSize: '1rem',
                margin: 0
              }}>{stat.label}</p>
              <span style={{
                color: 'var(--color-text-muted)',
                fontSize: '0.85rem'
              }}>{stat.subtext}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Sambutan Lurah */}
      <section className="section-padding container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '4rem',
          alignItems: 'center'
        }}>
          {/* Photo */}
          <div style={{
            position: 'relative',
            display: 'flex',
            justifyContent: 'center'
          }}>
            <div style={{
              position: 'absolute',
              top: '20px',
              left: '20px',
              right: '-20px',
              bottom: '-20px',
              border: '4px solid var(--color-accent)',
              borderRadius: 'var(--border-radius-md)',
              zIndex: 1
            }}></div>
            <img 
              src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400&h=500" 
              alt="Lurah Mekarsari"
              style={{
                width: '100%',
                maxWidth: '380px',
                height: '450px',
                objectFit: 'cover',
                borderRadius: 'var(--border-radius-md)',
                position: 'relative',
                zIndex: 2,
                boxShadow: 'var(--shadow-lg)'
              }}
            />
          </div>
          {/* Text */}
          <div>
            <span style={{
              color: 'var(--color-primary)',
              fontWeight: 700,
              fontSize: '0.9rem',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}>Sambutan Pimpinan</span>
            <h2 style={{
              fontSize: '2.25rem',
              margin: '0.5rem 0 1.5rem 0',
              fontFamily: 'var(--font-display)'
            }}>Sambutan Lurah Mekarsari</h2>
            <p style={{ color: 'var(--color-text-muted)', marginBottom: '1rem', fontStyle: 'italic' }}>
              "Assalamu’alaikum Warahmatullahi Wabarakatuh,"
            </p>
            <p style={{ color: 'var(--color-text-muted)', marginBottom: '1.25rem', fontSize: '1rem' }}>
              Selamat datang di website profil resmi Kelurahan Mekarsari. Media komunikasi ini kami persembahkan sebagai sarana keterbukaan informasi publik dan peningkatan mutu pelayanan. 
            </p>
            <p style={{ color: 'var(--color-text-muted)', marginBottom: '2rem', fontSize: '1rem' }}>
              Melalui portal ini, warga dapat melihat perkembangan kelurahan, mengajukan administrasi secara mandiri, dan berinteraksi langsung dengan pamong kelurahan. Kami berkomitmen untuk terus berinovasi demi mewujudkan kelurahan yang bersih, tertib, sejahtera, dan ramah teknologi.
            </p>
            <div>
              <h4 style={{ margin: 0, fontSize: '1.2rem' }}>Drs. H. Mulyadi, M.Si</h4>
              <p style={{ color: 'var(--color-primary)', fontWeight: 600, fontSize: '0.9rem', margin: 0 }}>Lurah Mekarsari</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Layanan Pintasan */}
      <section style={{ backgroundColor: '#f1f5f9' }} className="section-padding">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <span style={{ color: 'var(--color-primary)', fontWeight: 700, fontSize: '0.9rem', textTransform: 'uppercase' }}>Pelayanan Warga</span>
            <h2 style={{ fontSize: '2.25rem', margin: '0.5rem 0', fontFamily: 'var(--font-display)' }}>Layanan Mandiri Online</h2>
            <p style={{ color: 'var(--color-text-muted)', maxWidth: '600px', margin: '0 auto' }}>
              Persiapkan berkas persyaratan administrasi Anda dan lakukan pengajuan secara langsung lewat formulir online kami.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem',
            marginBottom: '3rem'
          }}>
            {MOCK_SERVICES.slice(0, 3).map((svc) => (
              <div key={svc.id} className="card" style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{
                  backgroundColor: 'var(--color-primary-light)',
                  color: 'var(--color-primary)',
                  width: '50px',
                  height: '50px',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.5rem'
                }}>
                  <FileText size={24} />
                </div>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>{svc.nama_layanan}</h3>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem', flexGrow: 1 }}>
                  {svc.deskripsi}
                </p>
                <div style={{
                  borderTop: '1px solid var(--color-border)',
                  paddingTop: '1rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontSize: '0.85rem'
                }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--color-text-muted)' }}>
                    <Clock size={14} /> {svc.estimasi_waktu}
                  </span>
                  <Link to="/layanan" style={{ color: 'var(--color-primary)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.15rem' }}>
                    Detail <ChevronRight size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center' }}>
            <Link to="/layanan" className="btn btn-secondary">
              Lihat Seluruh Layanan <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* 5. Berita Terbaru */}
      <section className="section-padding container">
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          marginBottom: '4rem',
          flexWrap: 'wrap',
          gap: '1.5rem'
        }}>
          <div>
            <span style={{ color: 'var(--color-primary)', fontWeight: 700, fontSize: '0.9rem', textTransform: 'uppercase' }}>Kabar Terkini</span>
            <h2 style={{ fontSize: '2.25rem', margin: '0.5rem 0 0 0', fontFamily: 'var(--font-display)' }}>Berita & Kegiatan Kelurahan</h2>
          </div>
          <Link to="/berita" className="btn btn-secondary">
            Lihat Berita Lainnya <ArrowRight size={16} />
          </Link>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '3rem 0' }}>Memuat berita...</div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2rem'
          }}>
            {latestNews.map((news) => (
              <article key={news.id} className="card" style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                <div style={{ height: '220px', position: 'relative', overflow: 'hidden' }}>
                  <img 
                    src={news.gambar_url || 'https://images.unsplash.com/photo-1594708767771-a7502209ff51?auto=format&fit=crop&q=80&w=800&h=450'} 
                    alt={news.judul}
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
                    {news.kategori}
                  </span>
                </div>
                <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                  <div style={{ display: 'flex', gap: '1rem', fontSize: '0.8rem', color: 'var(--color-text-muted)', marginBottom: '0.75rem' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      <Calendar size={14} /> {news.tanggal_publish}
                    </span>
                    <span>• Oleh: {news.penulis}</span>
                  </div>
                  <h3 style={{ fontSize: '1.2rem', marginBottom: '0.75rem', lineHeight: '1.4' }}>
                    <Link to={`/berita/${news.id}`} style={{ hoverColor: 'var(--color-primary)' }}>
                      {news.judul}
                    </Link>
                  </h3>
                  <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem', flexGrow: 1 }}>
                    {news.ringkasan}
                  </p>
                  <Link to={`/berita/${news.id}`} style={{
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
