/* ==========================================================================
   Dummy görsel üreteci
   Gerçek fotoğraflar hazır olduğunda dist/assets/img/ içindeki dosyalar
   aynı isimle .jpg/.webp olarak değiştirilip build.js'teki uzantı
   güncellenmelidir.
   ========================================================================== */

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/* ── Logo ────────────────────────────────────────────────────────────────
   VET STRONG wordmark. vetQom'un "tek harfi renklendirme" yaklaşımı yerine
   kendi kimliğimiz: kalkan + ikinci kelimeyi vurgulama.
   DUMMY: gerçek logo dosyası geldiğinde değiştirilmeli.                     */
export function logo({ light = false } = {}) {
  const ink = light ? '#FFFFFF' : '#0F2E4C';
  const accent = '#19B85F';
  return `<svg viewBox="0 0 268 56" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="VET STRONG">
  <path d="M8 9.5 26 4l18 5.5v17.2c0 11.2-7.3 19.6-18 23.3-10.7-3.7-18-12.1-18-23.3V9.5Z" fill="${accent}"/>
  <path d="M18.5 26.5l5.6 6 9.6-12.2" fill="none" stroke="#fff" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"/>
  <text x="56" y="27" font-family="Poppins, Segoe UI, Arial, sans-serif" font-size="21" font-weight="700" letter-spacing="1.5" fill="${ink}">VET</text>
  <text x="103" y="27" font-family="Poppins, Segoe UI, Arial, sans-serif" font-size="21" font-weight="700" letter-spacing="1.5" fill="${accent}">STRONG</text>
  <text x="57" y="43" font-family="Poppins, Segoe UI, Arial, sans-serif" font-size="8.4" letter-spacing="3.6" fill="${light ? 'rgba(255,255,255,.62)' : '#6C7C8C'}">ANIMAL NUTRITION</text>
</svg>`;
}

/* ── Ürün görseli ───────────────────────────────────────────────────────
   vetQom'un kompozisyonunu referans alır: kutu + aplikatör + dairesel
   fayda rozeti + sol üstte alt marka adı. Tamamen vektörel dummy.          */
export function productImage({ subBrand, badge, accent = '#19B85F', animal = 'kedi', type = 'malt', uid = 'p' }) {
  const isTube = type === 'malt';
  const isBag = type === 'mama';
  const badgeText = `${esc(badge)} • ${esc(badge)} • `;

  const applicator = isTube
    ? `<g>
         <rect x="408" y="212" width="46" height="188" rx="16" fill="#F2F5F8" stroke="#D9E1E8" stroke-width="2"/>
         <rect x="414" y="228" width="34" height="120" rx="9" fill="${accent}" opacity=".16"/>
         <rect x="416" y="182" width="30" height="34" rx="7" fill="${accent}"/>
         <path d="M418 400h26l-4 24h-18z" fill="#DCE4EB"/>
       </g>`
    : `<g>
         <rect x="404" y="196" width="54" height="204" rx="12" fill="#F2F5F8" stroke="#D9E1E8" stroke-width="2"/>
         <rect x="416" y="176" width="30" height="26" rx="6" fill="${accent}"/>
         <path d="M414 240h34M414 272h34M414 304h34" stroke="#C6D2DC" stroke-width="3" stroke-linecap="round"/>
       </g>`;

  const pack = isBag
    ? `<path d="M120 150h210v272H120z" fill="#fff" stroke="#DDE4EA" stroke-width="2"/>
       <path d="M120 150l38-28h134l38 28z" fill="#F6F9FB" stroke="#DDE4EA" stroke-width="2"/>
       <rect x="120" y="318" width="210" height="104" fill="${accent}" opacity=".12"/>`
    : `<rect x="132" y="138" width="196" height="292" rx="6" fill="#fff" stroke="#DDE4EA" stroke-width="2"/>
       <rect x="132" y="330" width="196" height="100" rx="0" fill="#0F2E4C"/>
       <rect x="132" y="138" width="196" height="10" fill="${accent}"/>`;

  const pet = animal === 'kedi'
    ? `<path d="M232 372c-13 0-22 9-22 20 0 9 9 16 22 16s22-7 22-16c0-11-9-20-22-20Zm-16-16 6 12m26-12-6 12" stroke="#fff" stroke-width="2.6" fill="none" stroke-linecap="round"/>`
    : `<path d="M232 370c-14 0-24 10-24 21 0 10 10 17 24 17s24-7 24-17c0-11-10-21-24-21Zm-22-14c-5 0-8 5-6 11m50-11c5 0 8 5 6 11" stroke="#fff" stroke-width="2.6" fill="none" stroke-linecap="round"/>`;

  return `<svg viewBox="0 0 560 560" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${esc(subBrand)} ürün görseli">
  <defs>
    <path id="badge-${uid}" d="M108 176 m -58,0 a 58,58 0 1,1 116,0 a 58,58 0 1,1 -116,0"/>
    <radialGradient id="sh-${uid}" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#0F2E4C" stop-opacity=".16"/>
      <stop offset="100%" stop-color="#0F2E4C" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="560" height="560" fill="#fff"/>
  <ellipse cx="290" cy="448" rx="196" ry="30" fill="url(#sh-${uid})"/>
  ${pack}
  <rect x="152" y="176" width="156" height="118" rx="4" fill="${accent}" opacity=".10"/>
  <circle cx="230" cy="235" r="40" fill="none" stroke="${accent}" stroke-width="3.5" opacity=".55"/>
  <path d="M212 235h36M230 217v36" stroke="${accent}" stroke-width="3.5" stroke-linecap="round" opacity=".55"/>
  <text x="230" y="320" text-anchor="middle" font-family="Poppins, Arial, sans-serif" font-size="19" font-weight="700" fill="#0F2E4C">${esc(subBrand)}</text>
  <text x="230" y="342" text-anchor="middle" font-family="Poppins, Arial, sans-serif" font-size="10" letter-spacing="1.6" fill="#8496A6">VET STRONG</text>
  ${pet}
  <text x="230" y="418" text-anchor="middle" font-family="Poppins, Arial, sans-serif" font-size="10" letter-spacing="2" fill="rgba(255,255,255,.7)">${animal === 'kedi' ? 'FOR CATS' : 'FOR DOGS'}</text>
  ${applicator}
  <circle cx="108" cy="176" r="58" fill="#fff" opacity=".92"/>
  <circle cx="108" cy="176" r="58" fill="none" stroke="${accent}" stroke-width="2"/>
  <circle cx="108" cy="176" r="42" fill="none" stroke="${accent}" stroke-width="1" opacity=".45"/>
  <text font-family="Poppins, Arial, sans-serif" font-size="8.6" font-weight="700" letter-spacing="1.1" fill="#0F2E4C">
    <textPath href="#badge-${uid}" startOffset="0%">${badgeText}</textPath>
  </text>
  <path d="M96 176l8 9 20-22" fill="none" stroke="${accent}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;
}

/* ── Ürün içerik infografiği (galeri 2. görsel) ────────────────────────── */
export function infographic({ subBrand, accent = '#19B85F', rows = [] }) {
  const items = rows.slice(0, 5).map((r, i) => {
    const y = 168 + i * 62;
    return `<circle cx="96" cy="${y}" r="15" fill="${accent}" opacity=".14"/>
      <circle cx="96" cy="${y}" r="5" fill="${accent}"/>
      <text x="130" y="${y + 5}" font-family="Poppins, Arial, sans-serif" font-size="15" fill="#334553">${esc(r)}</text>`;
  }).join('');
  return `<svg viewBox="0 0 560 560" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${esc(subBrand)} içerik bilgisi">
  <rect width="560" height="560" fill="#F4F7F9"/>
  <text x="96" y="92" font-family="Poppins, Arial, sans-serif" font-size="26" font-weight="700" fill="#0F2E4C">${esc(subBrand)}</text>
  <text x="96" y="122" font-family="Poppins, Arial, sans-serif" font-size="13" letter-spacing="2" fill="#8496A6">ÖNE ÇIKAN İÇERİK</text>
  <line x1="96" y1="140" x2="464" y2="140" stroke="#DDE4EA" stroke-width="1.5"/>
  ${items}
</svg>`;
}

/* ── Hayvan görseli (dummy fotoğraf yerine stilize illüstrasyon) ───────── */
export function petPhoto(kind = 'cat', w = 800, h = 800) {
  const bg = kind === 'cat' ? '#E9F8F0' : '#E7EDF3';
  const fg = kind === 'cat' ? '#19B85F' : '#0F2E4C';
  const shape = kind === 'cat'
    ? `<path d="M400 250c-72 0-130 54-130 122 0 62 58 110 130 110s130-48 130-110c0-68-58-122-130-122Z" fill="${fg}" opacity=".9"/>
       <path d="M292 268l-16-74 68 34zM508 268l16-74-68 34z" fill="${fg}" opacity=".9"/>
       <circle cx="356" cy="356" r="13" fill="#fff"/><circle cx="444" cy="356" r="13" fill="#fff"/>
       <path d="M400 392l-14 12h28z" fill="#fff"/>
       <path d="M300 404h-58M300 424h-58M500 404h58M500 424h58" stroke="${fg}" stroke-width="5" stroke-linecap="round" opacity=".55"/>`
    : `<path d="M400 258c-76 0-136 56-136 126 0 64 60 112 136 112s136-48 136-112c0-70-60-126-136-126Z" fill="${fg}" opacity=".9"/>
       <path d="M272 300c-26-6-44 18-42 52 2 34 22 56 44 52zM528 300c26-6 44 18 42 52-2 34-22 56-44 52z" fill="${fg}" opacity=".9"/>
       <circle cx="356" cy="364" r="13" fill="#fff"/><circle cx="444" cy="364" r="13" fill="#fff"/>
       <ellipse cx="400" cy="416" rx="24" ry="17" fill="#fff"/>
       <path d="M400 433v22" stroke="#fff" stroke-width="6" stroke-linecap="round"/>`;
  return `<svg viewBox="0 0 800 800" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${kind === 'cat' ? 'Kedi' : 'Köpek'} görseli">
  <rect width="800" height="800" fill="${bg}"/>
  <circle cx="400" cy="380" r="300" fill="#fff" opacity=".55"/>
  ${shape}
  <text x="400" y="700" text-anchor="middle" font-family="Poppins, Arial, sans-serif" font-size="20" letter-spacing="5" fill="${fg}" opacity=".45">DUMMY GÖRSEL</text>
</svg>`;
}

/* ── Genel placeholder (hero, tesis, laboratuvar, blog kapağı) ─────────── */
export function placeholder({ label = 'Görsel', w = 1200, h = 800, tone = 'brand' }) {
  const map = {
    brand:  ['#0F2E4C', '#19B85F'],
    soft:   ['#F4F7F9', '#0F2E4C'],
    accent: ['#19B85F', '#0F2E4C'],
  };
  const [bg, fg] = map[tone] || map.brand;
  const dark = tone === 'brand' || tone === 'accent';
  return `<svg viewBox="0 0 ${w} ${h}" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${esc(label)}">
  <rect width="${w}" height="${h}" fill="${bg}"/>
  <g opacity=".28" fill="none" stroke="${fg}" stroke-width="2">
    <circle cx="${w * 0.78}" cy="${h * 0.3}" r="${h * 0.3}"/>
    <circle cx="${w * 0.2}" cy="${h * 0.74}" r="${h * 0.22}"/>
    <path d="M0 ${h * 0.82} Q ${w * 0.3} ${h * 0.58} ${w * 0.62} ${h * 0.8} T ${w} ${h * 0.66}"/>
  </g>
  <text x="${w / 2}" y="${h / 2}" text-anchor="middle" font-family="Poppins, Arial, sans-serif" font-size="${Math.round(h / 16)}" font-weight="700" fill="${dark ? '#fff' : fg}" opacity=".9">${esc(label)}</text>
  <text x="${w / 2}" y="${h / 2 + Math.round(h / 12)}" text-anchor="middle" font-family="Poppins, Arial, sans-serif" font-size="${Math.round(h / 34)}" letter-spacing="4" fill="${dark ? '#fff' : fg}" opacity=".5">DUMMY GÖRSEL</text>
</svg>`;
}

/* ── Kullanım adımı çizimleri (4 adım, çizgi illüstrasyon) ─────────────── */
export function stepIllustration(n, type = 'malt') {
  const S = '#0F2E4C';
  const common = `fill="none" stroke="${S}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"`;
  const tube = (x, y, rot = 0) =>
    `<g transform="translate(${x} ${y}) rotate(${rot})">
       <rect x="-20" y="0" width="40" height="96" rx="12" ${common}/>
       <rect x="-13" y="-22" width="26" height="24" rx="6" ${common}/>
       <path d="M-20 96h40l-6 16h-28z" ${common}/>
     </g>`;
  const art = {
    1: `${tube(100, 40)}<path d="M150 50c12-10 12-24 2-32M154 74c14-12 14-30 2-40" ${common}/>`,
    2: `${tube(96, 44, -28)}<path d="M150 112h44M172 92v40" ${common}/>`,
    3: `${tube(92, 40, -42)}<path d="M150 118c20 6 34 6 52 0" ${common}/><circle cx="176" cy="96" r="5" fill="${S}"/>`,
    4: `<path d="M52 128h116a58 58 0 0 1-116 0Z" ${common}/><path d="M74 128c8-14 22-20 36-20s28 6 36 20" ${common}/>${tube(150, 10, -34)}`,
  };
  return `<svg viewBox="0 0 220 180" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Kullanım adımı ${n}">
  <rect width="220" height="180" fill="#fff"/>
  ${art[n] || art[1]}
</svg>`;
}
