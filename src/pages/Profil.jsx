import React from 'react';
import { MOCK_OFFICIALS } from '../mockData';
import { ShieldCheck, Target, Award, Users, MapPin, Milestone } from 'lucide-react';

export default function Profil() {
  const visi = "Mewujudkan Kelurahan Mekarsari yang Bersih, Tertib, Sejahtera, dan Responsif berbasis Pelayanan Prima Berbantuan Teknologi di Tahun 2029.";
  const misi = [
    "Meningkatkan kualitas tata kelola pelayanan publik yang cepat, tepat, ramah, dan bebas pungli.",
    "Menggalakkan program kebersihan dan kesehatan lingkungan melalui pelestarian bank sampah dan penghijauan terpadu.",
    "Mendorong kesejahteraan sosial ekonomi warga dengan pemberdayaan UMKM lokal dan program pembinaan keterampilan.",
    "Mewujudkan keamanan dan ketertiban lingkungan yang kondusif melalui sinergi tiga pilar (Lurah, Babinsa, Bhabinkamtibmas) dan peningkatan keaktifan pos ronda."
  ];

  const batasWilayah = {
    utara: 'Kelurahan Cilandak Barat',
    timur: 'Kelurahan Pondok Pinang',
    selatan: 'Kecamatan Pamulang (Tangerang Selatan)',
    barat: 'Kelurahan Lebak Bulus'
  };

  return (
    <div className="animate-fade-in">
      {/* 1. Header Page */}
      <section style={{
        background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))',
        color: 'white',
        padding: '4rem 0',
        textAlign: 'center'
      }}>
        <div className="container">
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'white', marginBottom: '0.5rem' }}>Profil Kelurahan</h1>
          <p style={{ opacity: 0.9, fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
            Kenali lebih dekat sejarah, visi misi, struktur tata kepemimpinan, dan batas administratif Kelurahan Mekarsari.
          </p>
        </div>
      </section>

      {/* 2. Sejarah Singkat */}
      <section className="section-padding container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '4rem',
          alignItems: 'center'
        }}>
          <div>
            <span style={{ color: 'var(--color-primary)', fontWeight: 700, fontSize: '0.9rem', textTransform: 'uppercase' }}>Lintasan Sejarah</span>
            <h2 style={{ fontSize: '2.25rem', margin: '0.5rem 0 1.5rem 0', fontFamily: 'var(--font-display)' }}>Sejarah Kelurahan Mekarsari</h2>
            <p style={{ color: 'var(--color-text-muted)', marginBottom: '1.25rem' }}>
              Nama **Mekarsari** secara etimologi berasal dari kata *Mekar* yang berarti tumbuh berkembang dan *Sari* yang bermakna inti atau bunga terindah. Didirikan pada awal tahun 1980-an sebagai pemekaran wilayah pertanian perkebunan, kelurahan ini berkembang pesat menjadi kawasan pemukiman perkotaan yang asri di selatan Jakarta.
            </p>
            <p style={{ color: 'var(--color-text-muted)', marginBottom: '1.25rem' }}>
              Dalam perjalanan sejarahnya, Kelurahan Mekarsari beberapa kali mendapatkan penghargaan di tingkat kota administratif Jakarta Selatan atas prestasi partisipasi gotong royong warga, integrasi bank sampah percontohan, serta digitalisasi pelayanan administrasi warga tercepat.
            </p>
            <p style={{ color: 'var(--color-text-muted)' }}>
              Kini, di era modern, Kelurahan Mekarsari terus berbenah mengadopsi teknologi informasi untuk mempercepat pelayanan kependudukan guna menjamin hak dan kesejahteraan seluruh warganya.
            </p>
          </div>
          <div>
            <img 
              src="https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&q=80&w=800&h=550" 
              alt="Gedung Kelurahan Mekarsari"
              style={{
                width: '100%',
                height: '380px',
                objectFit: 'cover',
                borderRadius: 'var(--border-radius-md)',
                boxShadow: 'var(--shadow-md)'
              }}
            />
          </div>
        </div>
      </section>

      {/* 3. Visi & Misi */}
      <section style={{ backgroundColor: '#f1f5f9' }} className="section-padding">
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '3rem'
          }}>
            {/* Visi */}
            <div className="card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
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
                <Target size={24} />
              </div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', fontFamily: 'var(--font-display)' }}>Visi Kami</h3>
              <p style={{ 
                color: 'var(--color-text-dark)', 
                fontSize: '1.1rem', 
                lineHeight: '1.7', 
                fontWeight: 500, 
                fontStyle: 'italic',
                backgroundColor: 'var(--color-bg-light)',
                padding: '1.5rem',
                borderRadius: 'var(--border-radius-sm)',
                borderLeft: '4px solid var(--color-primary)'
              }}>
                "{visi}"
              </p>
            </div>

            {/* Misi */}
            <div className="card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <div style={{
                backgroundColor: 'var(--color-accent-light)',
                color: 'var(--color-accent)',
                width: '50px',
                height: '50px',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.5rem'
              }}>
                <Award size={24} />
              </div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1.25rem', fontFamily: 'var(--font-display)' }}>Misi Kami</h3>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {misi.map((item, idx) => (
                  <li key={idx} style={{ display: 'flex', gap: '0.75rem', fontSize: '0.95rem', color: 'var(--color-text-muted)' }}>
                    <span style={{ 
                      backgroundColor: 'var(--color-accent)', 
                      color: 'white',
                      width: '24px', 
                      height: '24px', 
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      flexShrink: 0
                    }}>
                      {idx + 1}
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Struktur Organisasi */}
      <section className="section-padding container">
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <span style={{ color: 'var(--color-primary)', fontWeight: 700, fontSize: '0.9rem', textTransform: 'uppercase' }}>Aparatur Sipil Negara</span>
          <h2 style={{ fontSize: '2.25rem', margin: '0.5rem 0', fontFamily: 'var(--font-display)' }}>Struktur Organisasi Kelurahan</h2>
          <p style={{ color: 'var(--color-text-muted)', maxWidth: '600px', margin: '0 auto' }}>
            Pelayanan kelurahan didukung oleh para profesional yang berdedikasi penuh untuk melayani kepentingan warga.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '2.5rem'
        }}>
          {MOCK_OFFICIALS.map((official, idx) => (
            <div key={idx} className="card" style={{ padding: '1.5rem', textAlign: 'center' }}>
              <img 
                src={official.image} 
                alt={official.name}
                style={{
                  width: '120px',
                  height: '120px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  marginBottom: '1.25rem',
                  border: '3px solid var(--color-primary)',
                  boxShadow: 'var(--shadow-sm)'
                }}
              />
              <h4 style={{ fontSize: '1.1rem', marginBottom: '0.25rem' }}>{official.name}</h4>
              <p style={{ color: 'var(--color-primary)', fontWeight: 600, fontSize: '0.85rem', textTransform: 'uppercase', marginBottom: '1rem' }}>
                {official.role}
              </p>
              <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '0.75rem', fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                NIP: 19780512 200501 {idx} {idx + 3}45
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Geografis & Batas Wilayah */}
      <section style={{ backgroundColor: '#ffffff', borderTop: '1px solid var(--color-border)' }} className="section-padding">
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '4rem',
            alignItems: 'center'
          }}>
            <div>
              <span style={{ color: 'var(--color-primary)', fontWeight: 700, fontSize: '0.9rem', textTransform: 'uppercase' }}>Batas Administratif</span>
              <h2 style={{ fontSize: '2.25rem', margin: '0.5rem 0 1.5rem 0', fontFamily: 'var(--font-display)' }}>Geografis Wilayah Kelurahan</h2>
              <p style={{ color: 'var(--color-text-muted)', marginBottom: '1.5rem' }}>
                Kelurahan Mekarsari menempati wilayah seluas kurang lebih 240 hektar (2.4 Km²) yang didominasi kawasan hunian perkotaan, fasilitas pendidikan umum, dan pusat perdagangan UMKM.
              </p>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                  <MapPin size={20} style={{ color: 'var(--color-primary)' }} />
                  <div>
                    <strong style={{ display: 'block', fontSize: '0.85rem' }}>Ketinggian Rata-rata</strong>
                    <span style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>32 Meter DPL</span>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                  <Milestone size={20} style={{ color: 'var(--color-primary)' }} />
                  <div>
                    <strong style={{ display: 'block', fontSize: '0.85rem' }}>Koordinat</strong>
                    <span style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>6.2088° S, 106.8456° E</span>
                  </div>
                </div>
              </div>

              <h4 style={{ marginBottom: '0.75rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '0.5rem' }}>Batas Wilayah:</h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.95rem' }}>
                <li><strong>Utara:</strong> <span style={{ color: 'var(--color-text-muted)' }}>{batasWilayah.utara}</span></li>
                <li><strong>Timur:</strong> <span style={{ color: 'var(--color-text-muted)' }}>{batasWilayah.timur}</span></li>
                <li><strong>Selatan:</strong> <span style={{ color: 'var(--color-text-muted)' }}>{batasWilayah.selatan}</span></li>
                <li><strong>Barat:</strong> <span style={{ color: 'var(--color-text-muted)' }}>{batasWilayah.barat}</span></li>
              </ul>
            </div>
            {/* Embed Google Map Placeholder */}
            <div>
              <div style={{
                borderRadius: 'var(--border-radius-md)',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-md)',
                height: '380px',
                border: '1px solid var(--color-border)'
              }}>
                <iframe 
                  title="Peta Kelurahan Mekarsari"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m12!1m3!1d15862.911364506041!2d106.77298647035515!3d-6.299525712173456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f1ee32ca7a65%3s0x2e69f1ee34b22fb7%3A0xeab50d4b998cfb15!2sCilandak+Barat%2C+Cilandak%2C+South+Jakarta+City%2C+Jakarta!5e0!3m2!1sen!2sid!4v1700000000000!5m2!1sen!2sid"
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }}
                  allowFullScreen="" 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
