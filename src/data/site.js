// VET STRONG — site geneli ayarlar
// DUMMY: Firma bilgileri örnek olarak dolduruldu, gerçek verilerle değiştirilmeli.

export const site = {
  name: 'VET STRONG',
  tagline: 'Güçlü Yaşam, Sağlıklı Dostlar',
  taglineEn: 'Strong Life, Healthy Friends...',
  description:
    'VET STRONG; kedi ve köpekler için malt, mama ve besin takviyesi üreten bir hayvan sağlığı firmasıdır.',
  url: 'https://www.vetstrong.com.tr',

  // DUMMY iletişim bilgileri
  email: 'info@vetstrong.com.tr',
  phone: '+90 224 000 00 00',
  phoneHref: '+902240000000',
  whatsapp: '905000000000',
  address: 'Organize Sanayi Bölgesi, 1. Cadde No: 1, Nilüfer / Bursa',
  mapQuery: 'Nilüfer+Bursa',

  social: {
    facebook: '#',
    instagram: '#',
    x: '#',
    youtube: '#',
    linkedin: '#',
  },

  // Pazaryeri mağaza sayfaları (genel) — gerçek mağaza linkleriyle değiştirilmeli
  stores: [
    { key: 'trendyol', name: 'Trendyol', url: '#', color: '#F27A1A' },
    { key: 'hepsiburada', name: 'Hepsiburada', url: '#', color: '#FF6000' },
  ],
};

// Ürün tipi (VET STRONG'un üç ürün hattı)
export const productTypes = [
  { slug: 'malt', name: 'Malt' },
  { slug: 'mama', name: 'Mama' },
  { slug: 'besin-takviyeleri', name: 'Besin Takviyesi' },
];

export const animals = [
  { slug: 'kedi', name: 'Kedi' },
  { slug: 'kopek', name: 'Köpek' },
];

// Sağlık konuları — katalog filtresinin üçüncü ekseni
export const topics = [
  { slug: 'tuy-yumagi', name: 'Tüy Yumağı Kontrolü' },
  { slug: 'sindirim', name: 'Sindirim Sistemi' },
  { slug: 'bagisiklik', name: 'Bağışıklık Desteği' },
  { slug: 'deri-tuy', name: 'Deri ve Tüy Sağlığı' },
  { slug: 'eklem', name: 'Eklem Sağlığı' },
  { slug: 'kilo-kontrolu', name: 'Kilo Kontrolü' },
  { slug: 'yavru', name: 'Yavru Dönem' },
  { slug: 'yasli', name: 'Yaşlı Dönem' },
];
