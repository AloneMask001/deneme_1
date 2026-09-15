import { site, productTypes, animals } from '../data/site.js';
import { logo } from './svg.js';

export const esc = (s) => String(s ?? '')
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export const price = (n) =>
  '₺ ' + n.toFixed(2).replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.');

export const stars = (n, count) =>
  `<span class="stars"><span class="stars__icons">${'★'.repeat(n)}${'☆'.repeat(5 - n)}</span>${
    count ? `<span>${count} değerlendirme</span>` : ''
  }</span>`;

export const icons = {
  search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></svg>',
  menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg>',
  close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>',
  caret: '<svg class="nav__caret" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M2 4.5L6 8.5l4-4"/></svg>',
  ext: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/></svg>',
  wa: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.6 15l-1.3 4.7 4.8-1.3A10 10 0 1 0 12 2Zm5.6 14.1c-.2.7-1.3 1.3-1.9 1.4-.5.1-1.1.1-1.8-.1-.4-.1-1-.3-1.7-.6-3-1.3-4.9-4.3-5-4.5-.2-.2-1.2-1.6-1.2-3s.7-2.1 1-2.4c.3-.3.6-.4.8-.4h.6c.2 0 .4 0 .6.5l.9 2c.1.2.1.4 0 .5l-.3.5-.4.4c-.1.1-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.4 2.4 1.5.3.1.5.1.6 0l.9-1c.2-.2.4-.2.6-.1l2 .9c.2.1.4.2.4.3.1.2.1.6 0 1Z"/></svg>',
  tg: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M21.9 4.3 18.9 19c-.2 1-.8 1.3-1.7.8l-4.6-3.4-2.2 2.2c-.3.3-.5.5-1 .5l.4-5 9.1-8.2c.4-.4-.1-.6-.6-.2L7.1 12.6 2.6 11.2c-1-.3-1-1 .2-1.5l17.7-6.8c.8-.3 1.5.2 1.4 1.4Z"/></svg>',
  fb: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M14 9h3V6h-3c-2.2 0-4 1.8-4 4v2H8v3h2v7h3v-7h3l1-3h-4v-2c0-.6.4-1 1-1Z"/></svg>',
  ig: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>',
  x: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.5 3h3l-6.6 7.5L21.8 21h-5.9l-4.3-5.6L6.5 21h-3l7-8L2.5 3h6l3.9 5.2ZM16.4 19.2h1.7L7.7 4.7H5.9Z"/></svg>',
  yt: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M22 12s0-3.2-.4-4.7a2.5 2.5 0 0 0-1.8-1.8C18.3 5 12 5 12 5s-6.3 0-7.8.5a2.5 2.5 0 0 0-1.8 1.8C2 8.8 2 12 2 12s0 3.2.4 4.7c.2.9.9 1.6 1.8 1.8C5.7 19 12 19 12 19s6.3 0 7.8-.5a2.5 2.5 0 0 0 1.8-1.8C22 15.2 22 12 22 12ZM10 15V9l5.2 3Z"/></svg>',
  in: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M6.9 8H4v12h2.9Zm.2-3.4a1.7 1.7 0 1 0-3.4 0 1.7 1.7 0 0 0 3.4 0ZM20 13.4c0-3.3-1.8-4.8-4.1-4.8-1.9 0-2.7 1-3.2 1.8V8H9.8v12h2.9v-6.7c0-1.4.7-2.3 2-2.3s1.9.9 1.9 2.3V20H20Z"/></svg>',
  pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 21s7-6.3 7-11a7 7 0 1 0-14 0c0 4.7 7 11 7 11Z"/><circle cx="12" cy="10" r="2.6"/></svg>',
};

const NAV = [
  { label: 'Anasayfa', href: 'index.html' },
  {
    label: 'Kurumsal',
    href: 'hakkimizda.html',
    children: [
      { label: 'Hakkımızda', href: 'hakkimizda.html' },
      { label: 'Üretim & Kalite', href: 'uretim-ve-kalite.html' },
      { label: 'Kariyer', href: 'kariyer.html' },
    ],
  },
  {
    label: 'Ürünler',
    href: 'urunler.html',
    children: [
      { label: 'Tüm Ürünler', href: 'urunler.html' },
      ...animals.map((a) => ({ label: `${a.name} Ürünleri`, href: `urunler/${a.slug}.html` })),
      { sep: true },
      ...productTypes.map((t) => ({ label: t.name, href: `urunler/${t.slug}.html` })),
    ],
  },
  { label: 'Satış Noktaları', href: 'satis-noktalari.html' },
  { label: 'Blog', href: 'blog.html' },
  { label: 'İletişim', href: 'iletisim.html' },
];

function navHtml(base, active) {
  return NAV.map((item) => {
    const isActive = item.href === active || item.children?.some((c) => c.href === active);
    const link = `<a class="nav__link" href="${base}${item.href}"${isActive ? ' aria-current="page"' : ''}>${item.label}${item.children ? icons.caret : ''}</a>`;
    if (!item.children) return `<div class="nav__item">${link}</div>`;
    const menu = item.children
      .map((c) => (c.sep ? '<hr>' : `<a href="${base}${c.href}">${c.label}</a>`))
      .join('');
    return `<div class="nav__item">${link}<div class="nav__menu">${menu}</div></div>`;
  }).join('');
}

function header(base, active) {
  return `<div class="topbar"><div class="wrap">
  <span>Kedi ve köpekler için malt, mama ve besin takviyesi üretimi</span>
  <span class="topbar__links">
    <a href="${base}satis-noktalari.html">Satış Noktaları</a>
    <a href="tel:${site.phoneHref}">${site.phone}</a>
  </span>
</div></div>

<header class="header">
  <div class="wrap">
    <a class="logo" href="${base}index.html" aria-label="${site.name} anasayfa">${logo()}</a>
    <nav class="nav" id="nav">${navHtml(base, active)}</nav>
    <div class="header__tools">
      <button class="icon-btn" id="searchToggle" aria-label="Ara" aria-expanded="false">${icons.search}</button>
      <button class="icon-btn burger" id="burger" aria-label="Menü" aria-expanded="false">${icons.menu}</button>
    </div>
  </div>
  <div class="searchbar" id="searchbar">
    <div class="wrap">
      <input type="search" id="siteSearch" data-base="${base}" placeholder="Ürün, kategori ya da konu arayın…" autocomplete="off">
    </div>
  </div>
</header>
<div class="scrim" id="scrim"></div>`;
}

function newsletter() {
  return `<section class="newsletter">
  <div class="wrap">
    <h2>E-bültenimize katılın</h2>
    <p>Yeni ürünler, bakım rehberleri ve kampanyalardan ilk siz haberdar olun.</p>
    <form class="newsletter__form" onsubmit="event.preventDefault();this.reset();alert('Teşekkürler! (Demo form)')">
      <input type="email" placeholder="E-posta adresiniz" required aria-label="E-posta adresiniz">
      <button class="btn btn--primary" type="submit">Katıl</button>
    </form>
    <label class="newsletter__kvkk"><input type="checkbox" required> Kişisel verilerin korunması metnini okudum, onaylıyorum.</label>
  </div>
</section>`;
}

function footer(base) {
  const col = (title, links) =>
    `<div><h4>${title}</h4><ul>${links
      .map((l) => `<li><a href="${l[1].startsWith('http') || l[1].startsWith('mailto') || l[1].startsWith('tel') ? l[1] : base + l[1]}">${l[0]}</a></li>`)
      .join('')}</ul></div>`;

  const social = Object.entries({ facebook: 'fb', instagram: 'ig', x: 'x', youtube: 'yt', linkedin: 'in' })
    .map(([k, i]) => `<a href="${site.social[k]}" aria-label="${k}" rel="noopener">${icons[i]}</a>`)
    .join('');

  return `${newsletter()}
<footer class="footer">
  <div class="wrap">
    <div class="footer__logo"><a href="${base}index.html">${logo()}</a></div>
    <div class="footer__top">
      ${col('Kurumsal', [['Hakkımızda', 'hakkimizda.html'], ['Üretim & Kalite', 'uretim-ve-kalite.html'], ['Kariyer', 'kariyer.html'], ['İletişim', 'iletisim.html']])}
      ${col('Ürünler', [['Tüm Ürünler', 'urunler.html'], ['Kedi Ürünleri', 'urunler/kedi.html'], ['Köpek Ürünleri', 'urunler/kopek.html'], ['Malt', 'urunler/malt.html'], ['Mama', 'urunler/mama.html'], ['Besin Takviyeleri', 'urunler/besin-takviyeleri.html']])}
      ${col('Bilgi', [['Satış Noktaları', 'satis-noktalari.html'], ['Blog', 'blog.html'], ['Gizlilik Politikası', 'gizlilik-politikasi.html'], ['KVKK Aydınlatma Metni', 'kvkk.html']])}
      ${col('İletişim', [[site.phone, `tel:${site.phoneHref}`], [site.email, `mailto:${site.email}`]])}
      <div class="footer__about">
        <h4>${site.name}</h4>
        <p>${site.description} Ürünlerimiz kendi tesislerimizde, kalite standartlarına uygun olarak üretilmektedir.</p>
      </div>
    </div>
    <div class="footer__bar">
      <div class="social">${social}</div>
      <span class="muted" style="font-size:.82rem">Ürünlerimiz anlaşmalı pazaryerleri, pet shop ve veteriner kliniklerinde satılmaktadır.</span>
    </div>
  </div>
  <div class="footer__copy"><div class="wrap">
    <span>© ${new Date().getFullYear()} ${site.name} · Tüm Hakları Saklıdır.</span>
    <span>Bu site tanıtım amaçlıdır; üzerinden satış yapılmaz.</span>
  </div></div>
</footer>`;
}

/** Tüm sayfaları saran iskelet. */
export function shell({ title, description, body, base = '', active = '', ogImage = 'assets/img/og.svg' }) {
  return `<!doctype html>
<html lang="tr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(title)} | ${site.name}</title>
<meta name="description" content="${esc(description)}">
<meta property="og:title" content="${esc(title)} | ${site.name}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:type" content="website">
<meta property="og:image" content="${base}${ogImage}">
<meta name="theme-color" content="#0F2E4C">
<link rel="icon" href="${base}assets/img/favicon.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
<link rel="stylesheet" href="${base}assets/css/style.css">
</head>
<body>
${header(base, active)}
<main>
${body}
</main>
${footer(base)}
<script src="${base}assets/js/site.js" defer></script>
</body>
</html>`;
}
