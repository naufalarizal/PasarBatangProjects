import React, { useState, useEffect } from 'react';
import { MOCK_GALLERY } from '../mockData';
import { supabase, isSupabaseConfigured } from '../supabaseClient';
import { X, ZoomIn, Eye, ChevronLeft, ChevronRight } from 'lucide-react';

export default function Galeri() {
  const [images, setImages] = useState(MOCK_GALLERY);
  const [loading, setLoading] = useState(true);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  useEffect(() => {
    async function fetchGallery() {
      if (isSupabaseConfigured) {
        try {
          const { data, error } = await supabase
            .from('galeri')
            .select('*')
            .order('created_at', { ascending: false });
          if (!error && data && data.length > 0) {
            setImages(data);
            setLoading(false);
            return;
          }
        } catch (e) {
          console.error("Gagal memuat galeri dari Supabase, memuat mock data.", e);
        }
      }
      
      // Fallback
      setImages(MOCK_GALLERY);
      setLoading(false);
    }
    fetchGallery();
  }, []);

  const openLightbox = (index) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setLightboxIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextImage = (e) => {
    e.stopPropagation();
    setLightboxIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
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
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'white', marginBottom: '0.5rem' }}>Galeri Foto Kegiatan</h1>
          <p style={{ opacity: 0.9, fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
            Dokumentasi visual berbagai program pembangunan, kerja bakti, sosial, dan kebudayaan di Kelurahan Mekarsari.
          </p>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="section-padding container">
        {loading ? (
          <div style={{ textAlign: 'center', padding: '3rem 0', color: 'var(--color-text-muted)' }}>Memuat Galeri...</div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2rem'
          }}>
            {images.map((img, idx) => (
              <div 
                key={img.id} 
                onClick={() => openLightbox(idx)}
                style={{
                  position: 'relative',
                  height: '260px',
                  borderRadius: 'var(--border-radius-md)',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  boxShadow: 'var(--shadow-sm)',
                  border: '1px solid var(--color-border)',
                  backgroundColor: '#fff'
                }}
                onMouseOver={(e) => {
                  const overlay = e.currentTarget.querySelector('.overlay-gallery');
                  if (overlay) overlay.style.opacity = '1';
                }}
                onMouseOut={(e) => {
                  const overlay = e.currentTarget.querySelector('.overlay-gallery');
                  if (overlay) overlay.style.opacity = '0';
                }}
              >
                <img 
                  src={img.gambar_url} 
                  alt={img.judul}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
                
                {/* Hover Overlay */}
                <div 
                  className="overlay-gallery"
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'linear-gradient(to top, rgba(15, 23, 42, 0.95), rgba(5, 150, 105, 0.4))',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    padding: '1.5rem',
                    opacity: 0,
                    transition: 'opacity var(--transition-fast) ease-in-out',
                    color: 'white',
                    zIndex: 2
                  }}
                >
                  <div style={{ alignSelf: 'flex-end', marginBottom: 'auto', backgroundColor: 'rgba(255,255,255,0.2)', padding: '0.5rem', borderRadius: '50%' }}>
                    <Eye size={20} />
                  </div>
                  <h3 style={{ color: 'white', fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.25rem' }}>{img.judul}</h3>
                  <p style={{ color: '#d1d5db', fontSize: '0.8rem', margin: 0 }}>{img.keterangan || 'Dokumentasi kegiatan kelurahan'}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && (
        <div 
          onClick={closeLightbox}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(15, 23, 42, 0.95)',
            zIndex: 1000,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '2rem'
          }}
        >
          {/* Close Button */}
          <button 
            onClick={closeLightbox}
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              background: 'rgba(255,255,255,0.1)',
              border: 'none',
              color: 'white',
              cursor: 'pointer',
              padding: '0.5rem',
              borderRadius: '50%',
              display: 'flex'
            }}
          >
            <X size={24} />
          </button>

          {/* Lightbox Image Container */}
          <div 
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'relative',
              maxWidth: '90%',
              maxHeight: '80%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            {/* Nav Arrows */}
            <button 
              onClick={prevImage}
              style={{
                position: 'absolute',
                left: '-60px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'rgba(255,255,255,0.1)',
                border: 'none',
                color: 'white',
                cursor: 'pointer',
                padding: '0.5rem',
                borderRadius: '50%',
                display: 'flex'
              }}
            >
              <ChevronLeft size={32} />
            </button>

            <img 
              src={images[lightboxIndex].gambar_url} 
              alt={images[lightboxIndex].judul}
              style={{
                maxWidth: '100%',
                maxHeight: '70vh',
                objectFit: 'contain',
                borderRadius: '8px',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
              }}
            />

            <button 
              onClick={nextImage}
              style={{
                position: 'absolute',
                right: '-60px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'rgba(255,255,255,0.1)',
                border: 'none',
                color: 'white',
                cursor: 'pointer',
                padding: '0.5rem',
                borderRadius: '50%',
                display: 'flex'
              }}
            >
              <ChevronRight size={32} />
            </button>

            {/* Captions */}
            <div style={{ color: 'white', marginTop: '1.5rem', textAlign: 'center' }}>
              <h3 style={{ color: 'white', fontSize: '1.3rem', fontWeight: 700 }}>{images[lightboxIndex].judul}</h3>
              <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginTop: '0.25rem' }}>{images[lightboxIndex].keterangan}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
