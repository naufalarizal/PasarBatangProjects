import React, { createContext, useContext, useState } from 'react';

const PengaduanContext = createContext(null);

export function PengaduanProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <PengaduanContext.Provider value={{ isOpen, openModal, closeModal }}>
      {children}
    </PengaduanContext.Provider>
  );
}

export function usePengaduan() {
  const ctx = useContext(PengaduanContext);
  if (!ctx) throw new Error('usePengaduan must be used inside PengaduanProvider');
  return ctx;
}
