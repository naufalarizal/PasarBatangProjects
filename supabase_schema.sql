-- SKEMA DATABASE SUPABASE UNTUK PORTAL KELURAHAN MEKARSARI
-- Copy skrip ini dan jalankan di SQL Editor Supabase Anda.

-- ==========================================
-- 1. TABEL LAYANAN PUBLIK
-- ==========================================
CREATE TABLE IF NOT EXISTS public.layanan (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nama_layanan VARCHAR(255) NOT NULL,
  deskripsi TEXT NOT NULL,
  persyaratan TEXT[] NOT NULL,
  estimasi_waktu VARCHAR(100),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Masukkan data layanan default
INSERT INTO public.layanan (nama_layanan, deskripsi, persyaratan, estimasi_waktu) VALUES
(
  'Kartu Tanda Penduduk (KTP-el)',
  'Pengajuan pembuatan KTP Baru, perpanjangan, penggantian karena rusak/hilang, atau perubahan data.',
  ARRAY['Berusia minimal 17 tahun atau sudah menikah', 'Fotokopi Kartu Keluarga (KK)', 'Surat Pengantar RT/RW setempat', 'KTP lama asli (untuk penggantian) atau Surat Kehilangan Kepolisian (jika hilang)'],
  '1-3 Hari Kerja'
),
(
  'Kartu Keluarga (KK)',
  'Pengajuan pembuatan Kartu Keluarga baru, perubahan data KK, atau KK hilang/rusak.',
  ARRAY['Surat Pengantar RT/RW setempat', 'KK Asli yang lama (bila ada)', 'Fotokopi Akta Nikah/Buku Nikah', 'Fotokopi Akta Kelahiran anggota keluarga baru'],
  '3-5 Hari Kerja'
),
(
  'Surat Keterangan Domisili',
  'Pernyataan resmi mengenai alamat domisili atau keberadaan seseorang/lembaga di wilayah kelurahan.',
  ARRAY['Surat Pengantar RT/RW setempat', 'Fotokopi KTP Pemohon', 'Fotokopi Kartu Keluarga (KK)', 'Surat Kuasa bermaterai (jika diwakilkan)'],
  '1 Hari Kerja'
),
(
  'Surat Keterangan Usaha (SKU)',
  'Surat keterangan untuk legalitas usaha mikro atau kecil sebagai syarat pengajuan bantuan atau modal usaha.',
  ARRAY['Surat Pengantar RT/RW setempat', 'Fotokopi KTP & KK Pemohon', 'Foto tempat/kegiatan usaha', 'Surat Pernyataan Pemilik Usaha'],
  '1-2 Hari Kerja'
),
(
  'Surat Keterangan Tidak Mampu (SKTM)',
  'Surat keterangan untuk keringanan biaya sekolah, kuliah, pengobatan kesehatan, atau urusan dinas sosial.',
  ARRAY['Surat Pengantar RT/RW setempat', 'Fotokopi KTP & KK Pemohon', 'Fotokopi Kartu Indonesia Pintar/Kartu Sehat (jika ada)', 'Pernyataan tidak mampu yang ditandatangani di atas materai'],
  '1-2 Hari Kerja'
);

-- ==========================================
-- 2. TABEL PENGAJUAN LAYANAN (OLEH WARGA)
-- ==========================================
CREATE TABLE IF NOT EXISTS public.pengajuan_layanan (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  layanan_id UUID REFERENCES public.layanan(id) ON DELETE SET NULL,
  nama_pemohon VARCHAR(255) NOT NULL,
  nik VARCHAR(16) NOT NULL,
  email VARCHAR(255),
  no_hp VARCHAR(20) NOT NULL,
  keterangan TEXT NOT NULL,
  status VARCHAR(50) DEFAULT 'Pending', -- Pending, Diproses, Selesai, Ditolak
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- ==========================================
-- 3. TABEL BERITA & KEGIATAN
-- ==========================================
CREATE TABLE IF NOT EXISTS public.berita (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  judul VARCHAR(255) NOT NULL,
  ringkasan TEXT NOT NULL,
  konten TEXT NOT NULL,
  kategori VARCHAR(100) DEFAULT 'Kegiatan', -- Kegiatan, Pengumuman, Edukasi
  gambar_url TEXT,
  tanggal_publish DATE DEFAULT CURRENT_DATE,
  penulis VARCHAR(100) DEFAULT 'Admin Kelurahan',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Masukkan berita awal
INSERT INTO public.berita (judul, ringkasan, konten, kategori, gambar_url, penulis) VALUES
(
  'Kegiatan Kerja Bakti Massal Kebersihan Lingkungan Menyambut Musim Hujan',
  'Warga Kelurahan Mekarsari bersama jajaran PPSU melaksanakan kerja bakti pembersihan saluran air guna mencegah genangan.',
  'Dalam rangka mengantisipasi datangnya musim penghujan, warga Kelurahan Mekarsari serentak menggelar aksi kerja bakti massal pada hari Minggu pagi. Kegiatan ini difokuskan pada pembersihan sampah di saluran air primer dan sekunder, pemotongan dahan pohon yang rimbun, serta penyemprotan sarang nyamuk (fogging) untuk mencegah demam berdarah.\n\nLurah Mekarsari, Drs. H. Mulyadi, M.Si, memimpin langsung jalannya kerja bakti ini. Beliau mengapresiasi antusiasme warga yang tinggi untuk menjaga kebersihan lingkungan. Sebanyak 50 personil PPSU (Penanganan Prasarana dan Sarana Umum) dikerahkan untuk membantu mengangkut sampah-sampah berat ke truk pembuangan akhir.',
  'Kegiatan',
  'https://images.unsplash.com/photo-1594708767771-a7502209ff51?auto=format&fit=crop&q=80&w=800&h=450',
  'Sekretariat Kelurahan'
),
(
  'Penyaluran Bantuan Pangan Sosial untuk Keluarga Prasejahtera di RW 04 dan RW 05',
  'Sebanyak 250 paket sembako bantuan sosial didistribusikan secara tertib kepada warga penerima manfaat.',
  'Pemerintah Kelurahan Mekarsari menyalurkan bantuan pangan non-tunai (BPNT) berupa sembako dari Kementerian Sosial kepada keluarga prasejahtera yang berhak. Penyaluran dilaksanakan di aula kantor kelurahan dengan menggunakan sistem antrean terjadwal per RT untuk menghindari kerumunan.\n\nSetiap paket bantuan berisi beras premium 10kg, telur satu rak, minyak goreng 2 liter, dan kacang-kacangan. Warga yang mengantre wajib menunjukkan KTP asli dan undangan penerima bantuan. Bagi lansia yang berhalangan hadir, tim kader PKK kelurahan langsung mengantarkan paket bantuan ke rumah masing-masing.',
  'Pengumuman',
  'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=800&h=450',
  'Kasi Kesejahteraan Rakyat'
);

-- ==========================================
-- 4. TABEL GALERI FOTO KEGIATAN
-- ==========================================
CREATE TABLE IF NOT EXISTS public.galeri (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  judul VARCHAR(255) NOT NULL,
  keterangan TEXT,
  gambar_url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Masukkan foto galeri default
INSERT INTO public.galeri (judul, keterangan, gambar_url) VALUES
('Kerja Bakti Kebersihan Saluran Air', 'Aksi gotong royong warga membersihkan selokan lingkungan.', 'https://images.unsplash.com/photo-1594708767771-a7502209ff51?auto=format&fit=crop&q=80&w=600&h=450'),
('Pembagian Sembako Bantuan Sosial', 'Penyaluran sembako secara tertib kepada warga di aula kelurahan.', 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=600&h=450'),
('Imunisasi Balita di Posyandu Melati', 'Kunjungan berkala balita untuk imunisasi rutin dan timbang berat badan.', 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=600&h=450');

-- ==========================================
-- 5. TABEL PESAN & ADUAN WARGA (KONTAK)
-- ==========================================
CREATE TABLE IF NOT EXISTS public.pesan_kontak (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nama VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  subjek VARCHAR(255),
  pesan TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- ==========================================
-- 6. KEBIJAKAN KEAMANAN (RLS - Row Level Security)
-- ==========================================
-- Agar mempermudah pembacaan publik dan penulisan publik di awal demo,
-- aktifkan RLS dan buat policy akses publik jika diperlukan.
-- Secara default untuk pengujian awal, skrip di bawah mengizinkan pembacaan & penulisan publik.

ALTER TABLE public.layanan ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pengajuan_layanan ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.berita ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.galeri ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pesan_kontak ENABLE ROW LEVEL SECURITY;

-- Policy Layanan (Semua bisa baca, hanya autentikasi bisa tulis)
CREATE POLICY "Allow public read access on layanan" ON public.layanan FOR SELECT USING (true);
CREATE POLICY "Allow admin write access on layanan" ON public.layanan FOR ALL TO authenticated USING (true);

-- Policy Pengajuan Layanan (Semua bisa tulis, hanya autentikasi/admin bisa baca/ubah)
CREATE POLICY "Allow public insert access on pengajuan_layanan" ON public.pengajuan_layanan FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow admin read access on pengajuan_layanan" ON public.pengajuan_layanan FOR SELECT USING (true); -- Dibuat simpel untuk keperluan demo
CREATE POLICY "Allow admin update access on pengajuan_layanan" ON public.pengajuan_layanan FOR UPDATE USING (true);
CREATE POLICY "Allow admin delete access on pengajuan_layanan" ON public.pengajuan_layanan FOR DELETE USING (true);

-- Policy Berita (Semua bisa baca, hanya admin/autentikasi bisa kelola)
CREATE POLICY "Allow public read access on berita" ON public.berita FOR SELECT USING (true);
CREATE POLICY "Allow admin manage access on berita" ON public.berita FOR ALL USING (true);

-- Policy Galeri (Semua bisa baca, hanya admin/autentikasi bisa kelola)
CREATE POLICY "Allow public read access on galeri" ON public.galeri FOR SELECT USING (true);
CREATE POLICY "Allow admin manage access on galeri" ON public.galeri FOR ALL USING (true);

-- Policy Pesan Kontak (Semua bisa tulis, hanya admin/autentikasi bisa baca/hapus)
CREATE POLICY "Allow public insert access on pesan_kontak" ON public.pesan_kontak FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow admin read access on pesan_kontak" ON public.pesan_kontak FOR SELECT USING (true);
CREATE POLICY "Allow admin delete access on pesan_kontak" ON public.pesan_kontak FOR DELETE USING (true);
