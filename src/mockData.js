// Data Simulasi untuk Demo Website Kelurahan Mekarsari

export const MOCK_STATS = [
  { label: 'Jumlah Penduduk', value: '14,850', subtext: 'Jiwa' },
  { label: 'Luas Wilayah', value: '2.4', subtext: 'Km²' },
  { label: 'Rukun Warga (RW)', value: '12', subtext: 'Unit RW' },
  { label: 'Rukun Tetangga (RT)', value: '84', subtext: 'Unit RT' },
];

export const MOCK_OFFICIALS = [
  { name: 'Drs. H. Mulyadi, M.Si', role: 'Lurah Mekarsari', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=256&h=256' },
  { name: 'Siti Rahmawati, S.Sos', role: 'Sekretaris Kelurahan', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=256&h=256' },
  { name: 'Bambang Kusuma, SE', role: 'Kasi Pemerintahan', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=256&h=256' },
  { name: 'Rina Anggraeni, SH', role: 'Kasi Kesejahteraan Rakyat', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=256&h=256' },
];

export const MOCK_SERVICES = [
  {
    id: 's1',
    nama_layanan: 'Kartu Tanda Penduduk (KTP-el)',
    deskripsi: 'Pengajuan pembuatan KTP Baru, perpanjangan, penggantian karena rusak/hilang, atau perubahan data.',
    persyaratan: [
      'Berusia minimal 17 tahun atau sudah menikah',
      'Fotokopi Kartu Keluarga (KK)',
      'Surat Pengantar RT/RW setempat',
      'KTP lama asli (untuk penggantian rusak) atau Surat Kehilangan Kepolisian (untuk KTP hilang)'
    ],
    estimasi_waktu: '1-3 Hari Kerja'
  },
  {
    id: 's2',
    nama_layanan: 'Kartu Keluarga (KK)',
    deskripsi: 'Pengajuan pembuatan Kartu Keluarga baru, perubahan data KK (penambahan/pengurangan anggota keluarga), atau KK hilang/rusak.',
    persyaratan: [
      'Surat Pengantar RT/RW setempat',
      'KK Asli yang lama (bila ada)',
      'Fotokopi Akta Nikah/Buku Nikah',
      'Fotokopi Akta Kelahiran anggota keluarga baru'
    ],
    estimasi_waktu: '3-5 Hari Kerja'
  },
  {
    id: 's3',
    nama_layanan: 'Surat Keterangan Domisili',
    deskripsi: 'Pernyataan resmi mengenai alamat domisili atau keberadaan seseorang/lembaga di wilayah Kelurahan Mekarsari.',
    persyaratan: [
      'Surat Pengantar RT/RW setempat',
      'Fotokopi KTP Pemohon',
      'Fotokopi Kartu Keluarga (KK)',
      'Surat Kuasa bermaterai (jika diwakilkan)'
    ],
    estimasi_waktu: '1 Hari Kerja'
  },
  {
    id: 's4',
    nama_layanan: 'Surat Keterangan Usaha (SKU)',
    deskripsi: 'Surat keterangan untuk legalitas usaha mikro atau kecil sebagai syarat pengajuan bantuan atau modal usaha.',
    persyaratan: [
      'Surat Pengantar RT/RW setempat',
      'Fotokopi KTP & KK Pemohon',
      'Foto tempat/kegiatan usaha',
      'Surat Pernyataan Pemilik Usaha'
    ],
    estimasi_waktu: '1-2 Hari Kerja'
  },
  {
    id: 's5',
    nama_layanan: 'Surat Keterangan Tidak Mampu (SKTM)',
    deskripsi: 'Surat keterangan untuk keringanan biaya sekolah, kuliah, pengobatan kesehatan, atau urusan kedinasan sosial.',
    persyaratan: [
      'Surat Pengantar RT/RW setempat',
      'Fotokopi KTP & KK Pemohon',
      'Fotokopi Kartu Indonesia Pintar/Karta Sehat (jika ada)',
      'Pernyataan tidak mampu yang ditandatangani di atas materai'
    ],
    estimasi_waktu: '1-2 Hari Kerja'
  }
];

export const MOCK_NEWS = [
  {
    id: 'n1',
    judul: 'Kegiatan Kerja Bakti Massal Kebersihan Lingkungan Menyambut Musim Hujan',
    ringkasan: 'Warga Kelurahan Mekarsari bersama jajaran PPSU melaksanakan kerja bakti pembersihan saluran air guna mencegah genangan.',
    konten: 'Dalam rangka mengantisipasi datangnya musim penghujan, warga Kelurahan Mekarsari serentak menggelar aksi kerja bakti massal pada hari Minggu pagi. Kegiatan ini difokuskan pada pembersihan sampah di saluran air primer dan sekunder, pemotongan dahan pohon yang rimbun, serta penyemprotan sarang nyamuk (fogging) untuk mencegah demam berdarah.\n\nLurah Mekarsari, Drs. H. Mulyadi, M.Si, memimpin langsung jalannya kerja bakti ini. Beliau mengapresiasi antusiasme warga yang tinggi untuk menjaga kebersihan lingkungan. Sebanyak 50 personil PPSU (Penanganan Prasarana dan Sarana Umum) dikerahkan untuk membantu mengangkut sampah-sampah berat ke truk pembuangan akhir.',
    kategori: 'Kegiatan',
    gambar_url: 'https://images.unsplash.com/photo-1594708767771-a7502209ff51?auto=format&fit=crop&q=80&w=800&h=450',
    tanggal_publish: '2026-07-05',
    penulis: 'Sekretariat Kelurahan'
  },
  {
    id: 'n2',
    judul: 'Penyaluran Bantuan Pangan Sosial untuk Keluarga Prasejahtera di RW 04 dan RW 05',
    ringkasan: 'Sebanyak 250 paket sembako bantuan sosial didistribusikan secara tertib kepada warga penerima manfaat.',
    konten: 'Pemerintah Kelurahan Mekarsari menyalurkan bantuan pangan non-tunai (BPNT) berupa sembako dari Kementerian Sosial kepada keluarga prasejahtera yang berhak. Penyaluran dilaksanakan di aula kantor kelurahan dengan menggunakan sistem antrean terjadwal per RT untuk menghindari kerumunan.\n\nSetiap paket bantuan berisi beras premium 10kg, telur satu rak, minyak goreng 2 liter, dan kacang-kacangan. Warga yang mengantre wajib menunjukkan KTP asli dan undangan penerima bantuan. Bagi lansia yang berhalangan hadir, tim kader PKK kelurahan langsung mengantarkan paket bantuan ke rumah masing-masing.',
    kategori: 'Pengumuman',
    gambar_url: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=800&h=450',
    tanggal_publish: '2026-07-02',
    penulis: 'Kasi Kesejahteraan Rakyat'
  },
  {
    id: 'n3',
    judul: 'Sosialisasi Program Vaksinasi Anak dan Balita di Posyandu Melati RW 08',
    ringkasan: 'Kader Posyandu bekerja sama dengan Puskesmas menggelar imunisasi rutin dan edukasi gizi bagi ibu dan anak.',
    konten: 'Posyandu Melati RW 08 Kelurahan Mekarsari menggelar imunisasi polio dan campak bagi anak usia 0-5 tahun. Bersamaan dengan program imunisasi, diselenggarakan pula penyuluhan mengenai pencegahan stunting dan pola makan sehat tinggi protein hewani bagi tumbuh kembang anak.\n\nDokter Puskesmas menjelaskan bahwa stunting dapat dicegah dengan pemberian ASI eksklusif dan MPASI berkualitas tinggi. Sebanyak 80 balita mendapatkan imunisasi dasar lengkap hari ini, diikuti dengan pembagian makanan tambahan (PMT) bergizi tinggi seperti bubur kacang hijau, telur rebus, dan buah pisang.',
    kategori: 'Edukasi',
    gambar_url: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800&h=450',
    tanggal_publish: '2026-06-28',
    penulis: 'Kader PKK Mekarsari'
  },
  {
    id: 'n4',
    judul: 'Pelatihan Kewirausahaan UMKM Pembuatan Keripik Tempe Aneka Rasa',
    ringkasan: 'Untuk meningkatkan ekonomi warga, kelurahan menyelenggarakan workshop pembuatan dan pemasaran camilan lokal.',
    konten: 'Kelurahan Mekarsari bekerja sama dengan Dinas Koperasi dan UMKM menyelenggarakan pelatihan keterampilan pengolahan makanan bagi ibu-ibu rumah tangga. Pelatihan kali ini mengangkat tema inovasi keripik tempe dengan bumbu rasa kekinian seperti keju, balado, dan rumput laut.\n\nSelain teknik produksi higienis, peserta juga diajarkan cara pengemasan yang menarik dengan standing pouch aluminium foil serta manajemen pemasaran digital melalui media sosial dan e-commerce. Diharapkan kegiatan ini melahirkan wirausaha baru yang dapat membantu perekonomian keluarga pasca pandemi.',
    kategori: 'Kegiatan',
    gambar_url: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=800&h=450',
    tanggal_publish: '2026-06-25',
    penulis: 'Kasi Pemerintahan'
  }
];

export const MOCK_GALLERY = [
  { id: 'g1', judul: 'Kerja Bakti Kebersihan Saluran Air', keterangan: 'Aksi gotong royong warga membersihkan selokan lingkungan.', gambar_url: 'https://images.unsplash.com/photo-1594708767771-a7502209ff51?auto=format&fit=crop&q=80&w=600&h=450' },
  { id: 'g2', judul: 'Pembagian Sembako Bantuan Sosial', keterangan: 'Penyaluran sembako secara tertib kepada warga di aula kelurahan.', gambar_url: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=600&h=450' },
  { id: 'g3', judul: 'Imunisasi Balita di Posyandu Melati', keterangan: 'Kunjungan berkala balita untuk imunisasi rutin dan timbang berat badan.', gambar_url: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=600&h=450' },
  { id: 'g4', judul: 'Pelatihan Masak UMKM Keripik Tempe', keterangan: 'Ibu-ibu antusias mengikuti panduan pengolahan keripik tempe renyah.', gambar_url: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=600&h=450' },
  { id: 'g5', judul: 'Rapat Koordinasi Bulanan RT/RW', keterangan: 'Musyawarah bersama Ketua RT dan RW membahas pembangunan wilayah.', gambar_url: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=600&h=450' },
  { id: 'g6', judul: 'Senam Kebugaran Lansia', keterangan: 'Kegiatan rutin senam sehat jasmani khusus warga lanjut usia setiap Jumat pagi.', gambar_url: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=600&h=450' },
];

// Helper database simulasi lokal berbasis LocalStorage
const STORAGE_PREFIX = 'kelurahan_mekarsari_';

const getLocalStorageData = (key, defaultData) => {
  const data = localStorage.getItem(STORAGE_PREFIX + key);
  if (!data) {
    localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(defaultData));
    return defaultData;
  }
  return JSON.parse(data);
};

const saveLocalStorageData = (key, data) => {
  localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(data));
};

// Inisialisasi Default State Database Lokal
export const getLocalRequests = () => getLocalStorageData('requests', [
  {
    id: 'req-1',
    nama_pemohon: 'Ahmad Subagja',
    nik: '3174092104850001',
    email: 'ahmad.subagja@email.com',
    no_hp: '081234567890',
    layanan_id: 's1', // KTP-el
    nama_layanan: 'Kartu Tanda Penduduk (KTP-el)',
    keterangan: 'Penggantian KTP yang patah sudut kirinya.',
    status: 'Diproses',
    created_at: new Date(Date.now() - 24 * 60 * 60 * 1000 * 2).toISOString() // 2 hari lalu
  },
  {
    id: 'req-2',
    nama_pemohon: 'Dewi Lestari',
    nik: '3174095408920002',
    email: 'dewi.lestari@email.com',
    no_hp: '089876543210',
    layanan_id: 's3', // Domisili
    nama_layanan: 'Surat Keterangan Domisili',
    keterangan: 'Keperluan untuk melamar pekerjaan di luar kota.',
    status: 'Selesai',
    created_at: new Date(Date.now() - 24 * 60 * 60 * 1000 * 5).toISOString() // 5 hari lalu
  }
]);

export const addLocalRequest = (request) => {
  const requests = getLocalRequests();
  const service = MOCK_SERVICES.find(s => s.id === request.layanan_id);
  const newRequest = {
    id: 'req-' + Date.now(),
    ...request,
    nama_layanan: service ? service.nama_layanan : 'Layanan Umum',
    status: 'Pending',
    created_at: new Date().toISOString()
  };
  requests.unshift(newRequest);
  saveLocalStorageData('requests', requests);
  return newRequest;
};

export const updateLocalRequestStatus = (id, status) => {
  const requests = getLocalRequests();
  const index = requests.findIndex(r => r.id === id);
  if (index !== -1) {
    requests[index].status = status;
    saveLocalStorageData('requests', requests);
    return requests[index];
  }
  return null;
};

export const deleteLocalRequest = (id) => {
  const requests = getLocalRequests();
  const filtered = requests.filter(r => r.id !== id);
  saveLocalStorageData('requests', filtered);
};

export const getLocalMessages = () => getLocalStorageData('messages', [
  {
    id: 'msg-1',
    nama: 'Budi Hartono',
    email: 'budi.h@email.com',
    subjek: 'Keluhan Penerangan Jalan Raya',
    pesan: 'Mohon info mengenai perbaikan lampu jalan di sepanjang Jalan Melati Barat yang mati sudah hampir 2 minggu. Sangat rawan kecelakaan di malam hari.',
    created_at: new Date(Date.now() - 24 * 60 * 60 * 1000 * 1).toISOString()
  }
]);

export const addLocalMessage = (message) => {
  const messages = getLocalMessages();
  const newMessage = {
    id: 'msg-' + Date.now(),
    ...message,
    created_at: new Date().toISOString()
  };
  messages.unshift(newMessage);
  saveLocalStorageData('messages', messages);
  return newMessage;
};

export const deleteLocalMessage = (id) => {
  const messages = getLocalMessages();
  const filtered = messages.filter(m => m.id !== id);
  saveLocalStorageData('messages', filtered);
};

// Gabungan mock data berita untuk kelola admin lokal
export const getLocalNews = () => getLocalStorageData('news', MOCK_NEWS);

export const addLocalNews = (newsItem) => {
  const news = getLocalNews();
  const newItem = {
    id: 'n-' + Date.now(),
    ...newsItem,
    tanggal_publish: new Date().toISOString().split('T')[0],
    created_at: new Date().toISOString()
  };
  news.unshift(newItem);
  saveLocalStorageData('news', news);
  return newItem;
};

export const deleteLocalNews = (id) => {
  const news = getLocalNews();
  const filtered = news.filter(n => n.id !== id);
  saveLocalStorageData('news', filtered);
};
