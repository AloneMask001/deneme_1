/* ==========================================================================
   VET STRONG — statik site üreteci
   Kullanım: npm run build   → dist/ klasörünü üretir
   ========================================================================== */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { site, productTypes, animals, topics } from './src/data/site.js';
import { products } from './src/data/products.js';
import { posts } from './src/data/blog.js';
import { shell, esc, price, stars, icons } from './src/lib/layout.js';
import * as art from './src/lib/svg.js';

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const SRC = path.join(ROOT, 'src');
const OUT = path.join(ROOT, 'dist');

/* ── yardımcılar ───────────────────────────────────────────────────────── */
const write = (rel, content) => {
  const file = path.join(OUT, rel);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content, 'utf8');
};
const copy = (from, to) => {
  fs.mkdirSync(path.dirname(path.join(OUT, to)), { recursive: true });
  fs.copyFileSync(path.join(SRC, from), path.join(OUT, to));
};
const nameOf = (list, slug) => (list.find((x) => x.slug === slug) || {}).name || slug;
const imgOf = (p) => `assets/img/product-${p.slug}.svg`;

/** vetQom formatı: "AltMarka Hayvan – Fayda – Hacim" */
const displayName = (p) =>
  `${p.subBrand} ${nameOf(animals, p.animal)} – ${p.benefit} – ${p.size}`;

/* ── bileşenler ────────────────────────────────────────────────────────── */
function productCard(p, base) {
  const flag = p.links.length
    ? ''
    : '<span class="pcard__flag pcard__flag--soon">Yakında</span>';
  const search = [p.name, p.subBrand, p.benefit, p.size, nameOf(animals, p.animal), nameOf(productTypes, p.type),
    ...p.topics.map((t) => nameOf(topics, t))].join(' ');
  return `<a class="pcard" href="${base}urun/${p.slug}.html"
  data-slug="${p.slug}" data-animal="${p.animal}" data-type="${p.type}"
  data-topic="${p.topics.join(' ')}" data-search="${esc(search)}">
  <div class="pcard__media">${flag}<img src="${base}${imgOf(p)}" alt="${esc(p.name)} ${esc(p.size)}" loading="lazy" width="560" height="560"></div>
  <span class="pcard__brand">${site.name}</span>
  <span class="pcard__title">${esc(displayName(p))}</span>
  ${stars(p.rating, p.reviewCount)}
  <span class="pcard__price">${price(p.price)}</span>
</a>`;
}

function photoTile(kind, base) {
  return `<div class="photo-tile"><img src="${base}assets/img/pet-${kind}.svg" alt="${kind === 'cat' ? 'Kedi' : 'Köpek'}" loading="lazy"></div>`;
}

function blogCard(post, base) {
  return `<a class="bcard" href="${base}blog/${post.slug}.html">
  <div class="bcard__media"><img src="${base}assets/img/blog-${post.slug}.svg" alt="${esc(post.title)}" loading="lazy"></div>
  <span class="bcard__cat">${esc(post.category)}</span>
  <h3>${esc(post.title)}</h3>
  <p>${esc(post.excerpt)}</p>
  <time>${esc(post.date)}</time>
</a>`;
}

const breadcrumb = (items, base) =>
  `<div class="wrap"><nav class="breadcrumb">${items
    .map((i, n) =>
      (n ? '<span>›</span>' : '') +
      (i.href ? `<a href="${base}${i.href}">${esc(i.label)}</a>` : `<span>${esc(i.label)}</span>`))
    .join('')}</nav></div>`;

/* ── ANASAYFA ──────────────────────────────────────────────────────────── */
function pageHome() {
  const base = '';
  const cats = products.filter((p) => p.animal === 'kedi').slice(0, 3);
  const dogs = products.filter((p) => p.animal === 'kopek').slice(0, 3);
  const subBrands = [...new Set(products.map((p) => p.subBrand))];

  const body = `
<section class="hero">
  <div class="wrap">
    <div>
      <span class="eyebrow" style="color:#19B85F">Kedi & Köpek Sağlığı</span>
      <h1>Dostlarınız için <span>güçlü</span> beslenme</h1>
      <p>${site.name}; kedi ve köpekler için malt, mama ve besin takviyesi üretir. Formüllerimiz veteriner hekimlerle birlikte geliştirilir, kendi tesisimizde üretilir.</p>
      <div class="hero__cta">
        <a class="btn btn--primary btn--lg" href="${base}urunler.html">Ürünleri İnceleyin</a>
        <a class="btn btn--ghost btn--lg" style="color:#fff;border-color:rgba(255,255,255,.35)" href="${base}satis-noktalari.html">Satış Noktaları</a>
      </div>
      <div class="hero__stats">
        <div class="hero__stat"><b>3</b><span>Ürün hattı</span></div>
        <div class="hero__stat"><b>${products.length}</b><span>Ürün çeşidi</span></div>
        <div class="hero__stat"><b>%100</b><span>Yerli üretim</span></div>
      </div>
    </div>
    <div class="hero__art">
      <div class="hero__showcase">
        <img src="${base}${imgOf(products[0])}" alt="${esc(products[0].name)}" width="560" height="560">
        <span class="hero__tag">${esc(products[0].badge)}</span>
      </div>
    </div>
  </div>
</section>

<section class="section">
  <div class="wrap">
    <div class="section-head">
      <span class="eyebrow">Konulara göre</span>
      <h2>İhtiyacınız olan desteği seçin</h2>
      <p>Ürünlerimizi hayvanınızın ihtiyacına göre filtreleyerek inceleyebilirsiniz.</p>
    </div>
    <div class="topics-row">
      ${topics.map((t) => `<a class="topic-circle" href="${base}urunler.html#${t.slug}">${esc(t.name)}</a>`).join('')}
    </div>
  </div>
</section>

<section class="section section--soft">
  <div class="wrap">
    <div class="section-head"><span class="eyebrow">Kedi</span><h2>Kedi Ürünleri</h2></div>
    <div class="grid-products">
      ${cats.map((p) => productCard(p, base)).join('')}
      ${photoTile('cat', base)}
    </div>
    <div class="center" style="margin-top:38px"><a class="btn btn--primary" href="${base}urunler/kedi.html">Tüm Kedi Ürünleri</a></div>
  </div>
</section>

<section class="section">
  <div class="wrap">
    <div class="section-head"><span class="eyebrow">Ürün ailelerimiz</span><h2>Alt Markalarımız</h2></div>
    <div class="brandstrip">
      ${subBrands.map((b, i) => `<a class="brandstrip__item" href="${base}urunler.html">${i < 3 ? '<span class="brandstrip__new">YENİ</span>' : ''}${esc(b)}</a>`).join('')}
    </div>
  </div>
</section>

<section class="section section--soft">
  <div class="wrap">
    <div class="section-head"><span class="eyebrow">Köpek</span><h2>Köpek Ürünleri</h2></div>
    <div class="grid-products">
      ${photoTile('dog', base)}
      ${dogs.map((p) => productCard(p, base)).join('')}
    </div>
    <div class="center" style="margin-top:38px"><a class="btn btn--primary" href="${base}urunler/kopek.html">Tüm Köpek Ürünleri</a></div>
  </div>
</section>

<section class="section">
  <div class="wrap">
    <div class="section-head">
      <span class="eyebrow">Nereden alabilirsiniz?</span>
      <h2>Ürünlerimize ulaşın</h2>
      <p>Satış işlemleri anlaşmalı pazaryerleri üzerinden gerçekleşir. Ürün sayfalarındaki bağlantılarla doğrudan mağazamıza gidebilirsiniz.</p>
    </div>
    <div class="stores-row">
      ${site.stores.map((s) => `<a class="store-card" href="${s.url}" target="_blank" rel="noopener"><b>${esc(s.name)}</b><span>Resmî mağazamız</span></a>`).join('')}
      <a class="store-card" href="${base}satis-noktalari.html"><b>Pet Shop & Veteriner</b><span>Size en yakın nokta</span></a>
    </div>
  </div>
</section>

<section class="section section--soft">
  <div class="wrap">
    <div class="section-head"><span class="eyebrow">Blog</span><h2>Bakım ve Beslenme Rehberi</h2></div>
    <div class="blog-grid">${posts.map((p) => blogCard(p, base)).join('')}</div>
  </div>
</section>

<section class="tagline-band"><div class="wrap"><p>${esc(site.taglineEn)}</p></div></section>`;

  return shell({
    title: 'Kedi ve Köpekler için Malt, Mama ve Besin Takviyesi',
    description: site.description,
    body, base, active: 'index.html',
  });
}

/* ── KATALOG ───────────────────────────────────────────────────────────── */
function catalogPage({ title, intro, list, base, active, filterNote = '' }) {
  const count = (group, slug) =>
    list.filter((p) => (group === 'topic' ? p.topics.includes(slug) : p[group] === slug)).length;

  const group = (label, name, items, key) => {
    const rows = items
      .map((i) => {
        const n = count(key, i.slug);
        if (!n) return '';
        return `<label class="fpill"><input type="checkbox" name="${name}" value="${i.slug}"><span>${esc(i.name)}</span><em>(${n})</em></label>`;
      })
      .join('');
    if (!rows) return '';
    return `<div class="fgroup">
      <button class="fgroup__title" type="button">${label}<span>⌃</span></button>
      <div class="fgroup__body">${rows}</div>
    </div>`;
  };

  const body = `
${breadcrumb([{ label: 'Anasayfa', href: 'index.html' }, { label: title }], base)}
<section class="section" style="padding-top:0">
  <div class="wrap">
    <div class="catalog" id="catalog">
      <aside class="filters">
        <button class="btn btn--ghost filters__toggle" id="filtersToggle" type="button">Filtreler <span>⌃</span></button>
        <div class="filters__body" id="filtersBody">
          <input class="filters__search" id="filterSearch" type="search" placeholder="Ne aramıştınız?" autocomplete="off">
          ${group('Hayvan', 'animal', animals, 'animal')}
          ${group('Ürün Tipi', 'type', productTypes, 'type')}
          ${group('Konulara Göre İnceleme', 'topic', topics, 'topic')}
          <button class="filters__clear" id="filterClear" type="button">Filtreleri temizle</button>
        </div>
      </aside>

      <div>
        <div class="catalog__head">
          <h1>${esc(title)}</h1>
          <span class="catalog__count" id="catalogCount">${list.length} ürün</span>
        </div>
        ${intro ? `<p class="muted" style="margin-top:-18px;margin-bottom:28px;max-width:70ch">${esc(intro)}</p>` : ''}
        ${filterNote}
        <div class="grid-products grid-products--3">
          ${list.map((p) => productCard(p, base)).join('')}
        </div>
        <div class="empty-state" id="catalogEmpty" hidden>
          <p><b>Aradığınız kriterlere uygun ürün bulunamadı.</b></p>
          <p>Filtreleri temizleyerek tüm ürünleri görebilirsiniz.</p>
        </div>
      </div>
    </div>
  </div>
</section>`;

  return shell({ title, description: intro || `${title} — ${site.name}`, body, base, active });
}

/* ── ÜRÜN DETAY ────────────────────────────────────────────────────────── */
function pageProduct(p) {
  const base = '../';
  const related = products.filter((x) => x.slug !== p.slug && (x.type === p.type || x.topics.some((t) => p.topics.includes(t)))).slice(0, 4);
  const shareUrl = `${site.url}/urun/${p.slug}.html`;
  const shareText = encodeURIComponent(`${p.subBrand} – ${p.name} | ${site.name}`);

  const buy = p.links.length
    ? `<div class="buybox__links">${p.links
        .map((l) => `<a class="store-btn" href="${l.url}" target="_blank" rel="noopener nofollow">
          <span>${esc(l.name)}'da Satın Al</span>${icons.ext}</a>`)
        .join('')}</div>`
    : `<div class="soon-note">${icons.pin}<span>Bu ürün yakında satışa sunulacaktır. Satış noktaları için <a href="${base}iletisim.html" style="color:var(--accent-700);text-decoration:underline">bizimle iletişime geçebilirsiniz</a>.</span></div>`;

  const reviews = p.reviews.length
    ? p.reviews.map((r) => `<article class="review">
        <div class="review__stars">${'★'.repeat(r.stars)}${'☆'.repeat(5 - r.stars)}</div>
        <h4>${esc(r.title)}</h4>
        <div class="review__meta">${esc(r.date)} · ${esc(r.author)}</div>
        <p>${esc(r.body)}</p>
      </article>`).join('')
    : `<div class="empty-state"><p>Bu ürün için henüz değerlendirme yapılmamış.</p></div>`;

  const steps = [
    ['Tüpü kullanmadan önce oda sıcaklığında tutunuz ve kapağını çeviriniz.', 'Keep the tube at room temperature and twist the cap open.'],
    ['Önerilen miktarı tüpün ucundan ölçerek hazırlayınız.', 'Measure the recommended amount from the tip of the tube.'],
    ['Ürünü doğrudan verebilir ya da mamanın üzerine sıkabilirsiniz.', 'Give directly or squeeze onto the feed.'],
    ['Kullanım sonrası kapağı kapatarak serin ve kuru yerde saklayınız.', 'Close the cap and store in a cool, dry place after use.'],
  ];

  const body = `
${breadcrumb([
    { label: 'Anasayfa', href: 'index.html' },
    { label: `${nameOf(animals, p.animal)} Ürünleri`, href: `urunler/${p.animal}.html` },
    { label: nameOf(productTypes, p.type), href: `urunler/${p.type}.html` },
  ], base)}

<section class="wrap" style="padding-bottom:60px">
  <div class="pdp">
    <div class="gallery">
      <div class="gallery__thumbs">
        <button class="gallery__thumb active" type="button" data-full="${base}${imgOf(p)}"><img src="${base}${imgOf(p)}" alt="${esc(p.name)} ürün görseli"></button>
        <button class="gallery__thumb" type="button" data-full="${base}assets/img/info-${p.slug}.svg"><img src="${base}assets/img/info-${p.slug}.svg" alt="${esc(p.name)} içerik bilgisi"></button>
      </div>
      <div class="gallery__main">
        <button class="gallery__nav gallery__nav--prev" id="galPrev" type="button" aria-label="Önceki görsel">‹</button>
        <img id="galleryMain" src="${base}${imgOf(p)}" alt="${esc(p.name)}" width="560" height="560">
        <button class="gallery__nav gallery__nav--next" id="galNext" type="button" aria-label="Sonraki görsel">›</button>
      </div>
    </div>

    <div>
      <div class="pdp__brand">${site.name}</div>
      <h1 class="pdp__title">${esc(displayName(p))}</h1>
      ${stars(p.rating, p.reviewCount)}
      <div class="pdp__price">${price(p.price)}</div>
      <p class="pdp__price-note">Tavsiye edilen perakende satış fiyatıdır. Satış noktalarında farklılık gösterebilir.</p>

      <div class="buybox">
        <div class="buybox__title">Nereden satın alabilirsiniz?</div>
        <div class="buybox__sub">Sitemiz üzerinden satış yapılmaz. Aşağıdaki resmî mağazalarımızdan güvenle sipariş verebilirsiniz.</div>
        ${buy}
      </div>

      <div class="share">
        <span>Paylaş:</span>
        <a href="https://wa.me/?text=${shareText}%20${encodeURIComponent(shareUrl)}" target="_blank" rel="noopener" aria-label="WhatsApp'ta paylaş">${icons.wa}</a>
        <a href="https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${shareText}" target="_blank" rel="noopener" aria-label="Telegram'da paylaş">${icons.tg}</a>
      </div>

      <div class="acc">
        <button class="acc__btn" type="button">Ürün Açıklaması<span class="acc__icon">−</span></button>
        <div class="acc__body">
          <p><b>${esc(p.subBrand)}</b>, ${esc(p.short)}</p>
          <ul>${p.bullets.map((b) => `<li>${esc(b)}</li>`).join('')}</ul>
          <div class="acc__ing"><b>Ürün İçeriği:</b><span>${esc(p.ingredients)}</span></div>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="section section--soft">
  <div class="wrap tabs">
    <div class="tabs__nav">
      <button class="tabs__btn active" type="button" data-tab="tab-usage">${esc(p.usageTitle)}</button>
      <button class="tabs__btn" type="button" data-tab="tab-topic">${esc(p.topicTabTitle)}</button>
    </div>

    <div class="tabs__panel active" id="tab-usage">
      <div class="steps">
        ${steps.map(([tr, en], i) => `<div class="step">
          <div class="step__no">${i + 1}</div>
          <img src="${base}assets/img/step-${i + 1}.svg" alt="Adım ${i + 1}" loading="lazy">
          <p>${esc(tr)}</p><small>${esc(en)}</small>
        </div>`).join('')}
      </div>
      <p class="dosage"><b>Kullanım Şekli:</b> ${esc(p.dosage)}</p>
    </div>

    <div class="tabs__panel" id="tab-topic">
      <div class="prose">
        <h2 style="margin-top:0">${esc(p.topicTabTitle)}</h2>
        <p>${esc(p.topicTabText)}</p>
        <div class="callout">Belirtiler devam ediyorsa mutlaka veteriner hekiminize başvurun. Takviye ürünleri tedavinin yerini almaz, tedaviye destek olur.</div>
      </div>
    </div>
  </div>
</section>

<section class="section">
  <div class="wrap">
    <div class="reviews__head">
      <div><h2 style="margin:0">Yorumlar</h2>${p.reviewCount ? stars(p.rating, p.reviewCount) : ''}</div>
    </div>
    ${reviews}
  </div>
</section>

${related.length ? `<section class="section section--soft">
  <div class="wrap">
    <h2 style="margin-bottom:34px">İnceleyebileceğiniz Diğer Ürünler</h2>
    <div class="grid-products">${related.map((r) => productCard(r, base)).join('')}</div>
  </div>
</section>` : ''}`;

  return shell({
    title: displayName(p),
    description: p.short,
    body, base, active: 'urunler.html',
    ogImage: imgOf(p),
  });
}

/* ── İÇERİK SAYFALARI ──────────────────────────────────────────────────── */
function contentPage({ title, lead, body, base = '', active = '', description }) {
  const html = `
<section class="pagehero"><div class="wrap">
  <h1>${esc(title)}</h1>
  ${lead ? `<p>${esc(lead)}</p>` : ''}
</div></section>
${body}`;
  return shell({ title, description: description || lead || title, body: html, base, active });
}

function pageAbout() {
  return contentPage({
    title: 'Hakkımızda',
    lead: 'Kedi ve köpeklerin sağlıklı beslenmesi için üretiyoruz.',
    active: 'hakkimizda.html',
    body: `
<section class="section"><div class="wrap prose">
  <p><b>DUMMY METİN —</b> Bu bölüm örnek içerikle doldurulmuştur, firma bilgileriyle güncellenmelidir.</p>
  <p>${site.name}, kedi ve köpekler için malt, mama ve besin takviyesi üreten bir hayvan sağlığı firmasıdır. Kuruluşumuzdan bu yana tek bir hedefe odaklandık: evcil dostlarımızın günlük beslenmesini bilimsel temellere dayanan, güvenilir ürünlerle desteklemek.</p>
  <p>Ürünlerimizin tamamı kendi tesisimizde, gıda güvenliği standartlarına uygun olarak üretilmektedir. Formüllerimiz veteriner hekimler ve beslenme uzmanlarıyla birlikte geliştirilir; her parti üretim öncesi ve sonrası analizlerden geçer.</p>
  <p>Amacımız, sahiplerin market rafında ürün seçerken içeriğe güvenebilmesi. Bu yüzden her ürünümüzün içeriğini, ne işe yaradığını ve nasıl kullanılacağını açıkça paylaşıyoruz.</p>
</div></section>

<section class="section section--soft"><div class="wrap">
  <div class="imgrid">
    <img src="assets/img/facility-1.svg" alt="Üretim tesisi" loading="lazy">
    <img src="assets/img/facility-2.svg" alt="Üretim hattı" loading="lazy">
    <img src="assets/img/facility-3.svg" alt="Kalite kontrol" loading="lazy">
  </div>
</div></section>

<section class="section"><div class="wrap">
  <div class="section-head"><span class="eyebrow">Neden ${site.name}?</span><h2>Değerlerimiz</h2></div>
  <div class="feature-grid">
    <div class="feature"><div class="feature__ico">✓</div><h3>Şeffaf içerik</h3><p>Her üründe tam içerik listesi ve her bileşenin ne işe yaradığı açıkça yazılır.</p></div>
    <div class="feature"><div class="feature__ico">⚗</div><h3>Kendi üretimimiz</h3><p>Fason üretim yapmıyoruz; tüm süreç kendi tesisimizde ve kontrolümüzde.</p></div>
    <div class="feature"><div class="feature__ico">♥</div><h3>Veteriner iş birliği</h3><p>Formüller sahada çalışan veteriner hekimlerin geri bildirimiyle geliştirilir.</p></div>
  </div>
</div></section>`,
  });
}

function pageQuality() {
  return contentPage({
    title: 'Üretim & Kalite',
    lead: 'Hammaddeden paketlemeye kadar her adım kontrol altında.',
    active: 'hakkimizda.html',
    body: `
<section class="section"><div class="wrap prose">
  <p><b>DUMMY METİN —</b> Kalite belgeleriniz ve üretim süreçleriniz ile güncellenmelidir.</p>
  <h2 style="margin-top:0">Üretim süreci</h2>
  <p>Üretim, hammadde kabulüyle başlar. Gelen her parti, tedarikçi analiz sertifikası ile birlikte kabul edilir ve kendi laboratuvarımızda doğrulanır. Onaylanmayan hammadde üretime alınmaz.</p>
  <ul>
    <li><b>Hammadde kabul:</b> Parti bazlı numune alma ve analiz</li>
    <li><b>Karışım:</b> Reçeteye uygun, kontrollü ortamda hazırlama</li>
    <li><b>Dolum ve paketleme:</b> Hijyenik koşullarda otomatik dolum</li>
    <li><b>Son kontrol:</b> Mikrobiyolojik analiz ve raf ömrü testi</li>
    <li><b>Sevkiyat:</b> Parti numarası ile tam izlenebilirlik</li>
  </ul>
  <div class="callout">Her ürünün ambalajındaki parti numarası ile üretim tarihine, kullanılan hammadde partilerine ve analiz sonuçlarına geriye dönük ulaşılabilir.</div>
  <h2>Laboratuvar</h2>
  <p>Kendi bünyemizdeki laboratuvarda stabilite, mikrobiyolojik analiz ve etkinlik takibi düzenli olarak yapılır. Yeni ürün geliştirme çalışmaları da aynı laboratuvarda yürütülür.</p>
</div></section>

<section class="section section--soft"><div class="wrap">
  <div class="imgrid">
    <img src="assets/img/lab-1.svg" alt="Laboratuvar" loading="lazy">
    <img src="assets/img/lab-2.svg" alt="Analiz cihazı" loading="lazy">
    <img src="assets/img/lab-3.svg" alt="Numune hazırlama" loading="lazy">
  </div>
</div></section>`,
  });
}

function pageCareer() {
  return contentPage({
    title: 'Kariyer',
    lead: 'Ekibimize katılmak ister misiniz?',
    active: 'hakkimizda.html',
    body: `<section class="section"><div class="wrap prose">
  <p><b>DUMMY METİN —</b> Açık pozisyonlar ve başvuru bilgileriyle güncellenmelidir.</p>
  <p>Büyüyen ekibimizde üretim, kalite kontrol, saha satış ve pazarlama alanlarında zaman zaman açık pozisyonlarımız oluyor. Özgeçmişinizi <a href="mailto:${site.email}" style="color:var(--accent-700)">${site.email}</a> adresine gönderebilirsiniz.</p>
  <div class="callout">Şu anda yayınlanmış açık pozisyon bulunmuyor. Başvurunuz havuzumuzda saklanır ve uygun pozisyon açıldığında sizinle iletişime geçilir.</div>
</div></section>`,
  });
}

function pageStores() {
  const cities = ['İstanbul', 'Ankara', 'İzmir', 'Bursa', 'Antalya', 'Kocaeli', 'Adana', 'Konya'];
  return contentPage({
    title: 'Satış Noktaları',
    lead: 'Ürünlerimize pazaryerlerinden, pet shop ve veteriner kliniklerinden ulaşabilirsiniz.',
    active: 'satis-noktalari.html',
    body: `
<section class="section"><div class="wrap">
  <div class="section-head"><span class="eyebrow">Online</span><h2>Resmî mağazalarımız</h2></div>
  <div class="stores-row" style="grid-template-columns:repeat(2,1fr);max-width:720px;margin-inline:auto">
    ${site.stores.map((s) => `<a class="store-card" href="${s.url}" target="_blank" rel="noopener"><b>${esc(s.name)}</b><span>Mağazaya git</span></a>`).join('')}
  </div>
</div></section>

<section class="section section--soft"><div class="wrap">
  <div class="section-head"><span class="eyebrow">Fiziksel noktalar</span><h2>Şehrinizi seçin</h2>
    <p>DUMMY — Şehir listeleri gerçek bayi bilgileriyle doldurulmalıdır.</p></div>
  <div class="city-grid">
    ${cities.map((c) => `<a class="city-card" href="iletisim.html"><b>${c}</b><span>Satış noktaları</span></a>`).join('')}
  </div>
</div></section>

<section class="section"><div class="wrap prose center">
  <h2>Bayimiz olmak ister misiniz?</h2>
  <p>Pet shop, veteriner kliniği ve toptancı iş ortaklarımız için özel çalışma koşullarımız bulunmaktadır.</p>
  <a class="btn btn--primary btn--lg" href="iletisim.html">İletişime Geçin</a>
</div></section>`,
  });
}

function pageContact() {
  return contentPage({
    title: 'İletişim',
    lead: 'Sorularınız için bize ulaşabilirsiniz.',
    active: 'iletisim.html',
    body: `
<section class="section"><div class="wrap">
  <div class="contact-grid">
    <div><b>E-Posta</b><a href="mailto:${site.email}">${site.email}</a></div>
    <div><b>Telefon</b><a href="tel:${site.phoneHref}">${site.phone}</a></div>
    <div><b>Adres</b><span class="muted">${esc(site.address)}</span></div>
  </div>
  <div class="map-frame">
    <iframe title="Konum" loading="lazy" referrerpolicy="no-referrer-when-downgrade"
      src="https://maps.google.com/maps?q=${site.mapQuery}&z=13&output=embed"></iframe>
  </div>
  <p class="center muted" style="font-size:.85rem;margin-top:14px">
    Harita görüntülenmiyorsa <a href="https://maps.google.com/?q=${site.mapQuery}" target="_blank" rel="noopener" style="color:var(--accent-700);text-decoration:underline">Google Haritalar'da açın</a>.
  </p>
</div></section>

<section class="section section--soft"><div class="wrap">
  <div class="section-head"><h2>İletişim Formu</h2>
    <p>Görüş, öneri ya da sorularınızı iletmek için formu doldurabilirsiniz. En kısa sürede size geri döneceğiz.</p></div>
  <form class="form" onsubmit="event.preventDefault();this.reset();alert('Mesajınız alındı. (Demo form)')">
    <div class="form__row">
      <div class="field"><label for="f-ad"><span class="req">*</span> Ad</label><input id="f-ad" required></div>
      <div class="field"><label for="f-soyad"><span class="req">*</span> Soyad</label><input id="f-soyad" required></div>
    </div>
    <div class="form__row">
      <div class="field"><label for="f-mail"><span class="req">*</span> E-posta</label><input id="f-mail" type="email" required></div>
      <div class="field"><label for="f-tel">Telefon</label><input id="f-tel" type="tel" placeholder="+90"></div>
    </div>
    <div class="field"><label for="f-msg"><span class="req">*</span> Mesaj</label><textarea id="f-msg" required></textarea></div>
    <button class="btn btn--primary btn--block btn--lg" type="submit">Gönder</button>
    <p class="form__note">DUMMY — Form şu an gönderim yapmaz; bir e-posta servisine bağlanmalıdır.</p>
  </form>
</div></section>`,
  });
}

function pageBlogIndex() {
  return contentPage({
    title: 'Blog',
    lead: 'Kedi ve köpek bakımı, beslenmesi ve sağlığı üzerine rehberler.',
    active: 'blog.html',
    body: `<section class="section"><div class="wrap">
      <div class="blog-grid">${posts.map((p) => blogCard(p, '')).join('')}</div>
    </div></section>`,
  });
}

function pagePost(post) {
  const base = '../';
  const render = ([tag, val]) => {
    if (tag === 'h2') return `<h2>${esc(val)}</h2>`;
    if (tag === 'p') return `<p>${esc(val)}</p>`;
    if (tag === 'ul') return `<ul>${val.map((li) => `<li>${esc(li)}</li>`).join('')}</ul>`;
    if (tag === 'callout') return `<div class="callout">${esc(val)}</div>`;
    return '';
  };
  const others = posts.filter((p) => p.slug !== post.slug);

  const body = `
${breadcrumb([{ label: 'Anasayfa', href: 'index.html' }, { label: 'Blog', href: 'blog.html' }, { label: post.title }], base)}
<article class="section" style="padding-top:0"><div class="wrap prose">
  <span class="eyebrow">${esc(post.category)}</span>
  <h1>${esc(post.title)}</h1>
  <p class="muted" style="margin-bottom:30px">${esc(post.date)}</p>
  <img src="${base}assets/img/blog-${post.slug}.svg" alt="${esc(post.title)}" style="border-radius:var(--radius-lg);margin-bottom:34px">
  ${post.body.map(render).join('')}
</div></article>

<section class="section section--soft"><div class="wrap">
  <h2 style="margin-bottom:30px">Diğer Yazılar</h2>
  <div class="blog-grid">${others.map((p) => blogCard(p, base)).join('')}</div>
</div></section>`;

  return shell({ title: post.title, description: post.excerpt, body, base, active: 'blog.html' });
}

function pageLegal(title, slug, paragraphs) {
  return contentPage({
    title, active: '',
    body: `<section class="section"><div class="wrap prose">
      <p><b>DUMMY METİN —</b> Hukuki metinler avukat onayı ile hazırlanmalıdır.</p>
      ${paragraphs.map((p) => `<p>${esc(p)}</p>`).join('')}
    </div></section>`,
  });
}

/* ── GÖRSEL ÜRETİMİ ────────────────────────────────────────────────────── */
function buildAssets() {
  const img = (rel, svg) => write(path.join('assets/img', rel), svg);

  img('favicon.svg', `<svg viewBox="0 0 52 52" xmlns="http://www.w3.org/2000/svg"><rect width="52" height="52" rx="12" fill="#0F2E4C"/><path d="M12 15l14-5 14 5v13c0 9-5.7 15.3-14 18.2C17.7 43.3 12 37 12 28V15Z" fill="#19B85F"/><path d="M20 26.5l4.4 4.7L33 21" fill="none" stroke="#fff" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/></svg>`);
  img('logo.svg', art.logo());
  img('logo-light.svg', art.logo({ light: true }));
  img('og.svg', art.placeholder({ label: site.name, w: 1200, h: 630, tone: 'brand' }));
  img('hero.svg', art.placeholder({ label: 'Ürün Görseli', w: 900, h: 700, tone: 'accent' }));
  img('pet-cat.svg', art.petPhoto('cat'));
  img('pet-dog.svg', art.petPhoto('dog'));

  for (let i = 1; i <= 4; i++) img(`step-${i}.svg`, art.stepIllustration(i));

  ['facility-1', 'facility-2', 'facility-3'].forEach((n, i) =>
    img(`${n}.svg`, art.placeholder({ label: ['Tesis', 'Üretim Hattı', 'Kalite Kontrol'][i], w: 800, h: 600, tone: 'soft' })));
  ['lab-1', 'lab-2', 'lab-3'].forEach((n, i) =>
    img(`${n}.svg`, art.placeholder({ label: ['Laboratuvar', 'Analiz', 'Numune'][i], w: 800, h: 600, tone: 'soft' })));

  products.forEach((p) => {
    img(`product-${p.slug}.svg`, art.productImage({
      subBrand: p.subBrand, badge: p.badge, accent: p.accent,
      animal: p.animal, type: p.type, uid: p.slug.replace(/[^a-z0-9]/g, ''),
    }));
    img(`info-${p.slug}.svg`, art.infographic({
      subBrand: p.subBrand, accent: p.accent,
      rows: p.ingredients.split(',').map((s) => s.trim()).slice(0, 5),
    }));
  });

  posts.forEach((p) =>
    img(`blog-${p.slug}.svg`, art.placeholder({ label: p.category, w: 800, h: 500, tone: 'soft' })));

  copy('assets/css/style.css', 'assets/css/style.css');
  copy('assets/js/site.js', 'assets/js/site.js');
}

/* ── ÇALIŞTIR ──────────────────────────────────────────────────────────── */
function build() {
  fs.rmSync(OUT, { recursive: true, force: true });
  buildAssets();

  write('index.html', pageHome());

  write('urunler.html', catalogPage({
    title: 'Tüm Ürünler',
    intro: 'Kedi ve köpekler için ürettiğimiz malt, mama ve besin takviyelerinin tamamı.',
    list: products, base: '', active: 'urunler.html',
  }));

  animals.forEach((a) => write(`urunler/${a.slug}.html`, catalogPage({
    title: `${a.name} Ürünleri`,
    intro: `${a.name}ler için geliştirdiğimiz malt, mama ve besin takviyeleri.`,
    list: products.filter((p) => p.animal === a.slug),
    base: '../', active: `urunler/${a.slug}.html`,
  })));

  productTypes.forEach((t) => write(`urunler/${t.slug}.html`, catalogPage({
    title: t.name,
    intro: `${site.name} ${t.name.toLocaleLowerCase('tr')} ürünleri.`,
    list: products.filter((p) => p.type === t.slug),
    base: '../', active: `urunler/${t.slug}.html`,
  })));

  products.forEach((p) => write(`urun/${p.slug}.html`, pageProduct(p)));

  write('hakkimizda.html', pageAbout());
  write('uretim-ve-kalite.html', pageQuality());
  write('kariyer.html', pageCareer());
  write('satis-noktalari.html', pageStores());
  write('iletisim.html', pageContact());
  write('blog.html', pageBlogIndex());
  posts.forEach((p) => write(`blog/${p.slug}.html`, pagePost(p)));

  write('gizlilik-politikasi.html', pageLegal('Gizlilik Politikası', 'gizlilik', [
    'Bu politika, sitemizi ziyaret ettiğinizde hangi verilerin toplandığını ve nasıl işlendiğini açıklar.',
    'Site üzerinden satış yapılmadığı için ödeme bilgisi toplanmaz. İletişim formu ve e-bülten aboneliği dışında kişisel veri talep edilmez.',
    'Toplanan veriler yalnızca talebinizi yanıtlamak amacıyla kullanılır ve üçüncü taraflarla paylaşılmaz.',
  ]));
  write('kvkk.html', pageLegal('KVKK Aydınlatma Metni', 'kvkk', [
    '6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında veri sorumlusu sıfatıyla hazırlanmıştır.',
    'İletişim formu aracılığıyla ilettiğiniz ad, soyad, e-posta ve telefon bilgileri yalnızca talebinizin değerlendirilmesi amacıyla işlenir.',
    'Kanunun 11. maddesi kapsamındaki haklarınızı kullanmak için bizimle iletişime geçebilirsiniz.',
  ]));

  // sitemap
  const urls = [
    '', 'urunler.html', 'hakkimizda.html', 'uretim-ve-kalite.html', 'kariyer.html',
    'satis-noktalari.html', 'iletisim.html', 'blog.html', 'gizlilik-politikasi.html', 'kvkk.html',
    ...animals.map((a) => `urunler/${a.slug}.html`),
    ...productTypes.map((t) => `urunler/${t.slug}.html`),
    ...products.map((p) => `urun/${p.slug}.html`),
    ...posts.map((p) => `blog/${p.slug}.html`),
  ];
  write('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${site.url}/${u}</loc></url>`).join('\n')}
</urlset>`);
  write('robots.txt', `User-agent: *\nAllow: /\nSitemap: ${site.url}/sitemap.xml\n`);

  const count = urls.length;
  console.log(`✓ dist/ üretildi — ${count} sayfa, ${products.length} ürün, ${posts.length} blog yazısı`);
}

build();
