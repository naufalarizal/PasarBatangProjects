import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare } from 'lucide-react';

export default function FloatingPengaduan() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      style={{
        position: 'fixed',
        bottom: '30px',
        right: '30px',
        zIndex: 999,
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        pointerEvents: 'none' // Let hover work on children
      }}
    >
      <Link 
        to="/kontak" 
        className="floating-pulse"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          pointerEvents: 'auto',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          backgroundColor: 'var(--color-accent)',
          color: 'white',
          padding: isHovered ? '0.75rem 1.25rem' : '0.9rem',
          borderRadius: '50px',
          boxShadow: '0 10px 25px -5px rgba(217, 119, 6, 0.4), 0 8px 10px -6px rgba(217, 119, 6, 0.4)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          cursor: 'pointer',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          textDecoration: 'none'
        }}
      >
        <MessageSquare size={22} style={{ flexShrink: 0 }} />
        
        {/* Label text that slides out on hover */}
        <span 
          style={{
            fontSize: '0.9rem',
            fontWeight: 700,
            whiteSpace: 'nowrap',
            maxWidth: isHovered ? '200px' : '0px',
            opacity: isHovered ? 1 : 0,
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            overflow: 'hidden',
            display: 'inline-block'
          }}
        >
          Laporan Pengaduan
        </span>
      </Link>

      {/* Embedded style tag for custom floating pulse animation */}
      <style>{`
        @keyframes pulse-accent {
          0% {
            box-shadow: 0 0 0 0 rgba(217, 119, 6, 0.6);
          }
          70% {
            box-shadow: 0 0 0 15px rgba(217, 119, 6, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(217, 119, 6, 0);
          }
        }
        
        .floating-pulse {
          animation: pulse-accent 2s infinite;
        }
      `}</style>
    </div>
  );
}
