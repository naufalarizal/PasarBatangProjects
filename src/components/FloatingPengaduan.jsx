import React, { useState } from 'react';
import { MessageSquare } from 'lucide-react';
import { usePengaduan } from '../context/PengaduanContext';

export default function FloatingPengaduan() {
  const { openModal } = usePengaduan();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '30px',
        right: '30px',
        zIndex: 999,
        display: 'flex',
        alignItems: 'center'
      }}
    >
      <button
        onClick={openModal}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="floating-pulse"
        aria-label="Buka Form Pengaduan Masyarakat"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          backgroundColor: 'var(--color-accent)',
          color: 'white',
          padding: isHovered ? '0.75rem 1.25rem' : '0.9rem',
          borderRadius: '50px',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          boxShadow: '0 10px 25px -5px rgba(217, 119, 6, 0.4), 0 8px 10px -6px rgba(217, 119, 6, 0.3)',
          cursor: 'pointer',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
        }}
      >
        <MessageSquare size={22} style={{ flexShrink: 0 }} />
        <span
          style={{
            fontSize: '0.9rem',
            fontWeight: 700,
            whiteSpace: 'nowrap',
            maxWidth: isHovered ? '180px' : '0px',
            opacity: isHovered ? 1 : 0,
            overflow: 'hidden',
            display: 'inline-block',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
        >
          Laporan Pengaduan
        </span>
      </button>

      <style>{`
        @keyframes pulse-accent {
          0%   { box-shadow: 0 0 0 0 rgba(217, 119, 6, 0.6); }
          70%  { box-shadow: 0 0 0 14px rgba(217, 119, 6, 0); }
          100% { box-shadow: 0 0 0 0 rgba(217, 119, 6, 0); }
        }
        .floating-pulse {
          animation: pulse-accent 2s infinite;
        }
      `}</style>
    </div>
  );
}
