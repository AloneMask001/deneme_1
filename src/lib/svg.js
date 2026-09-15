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
  const ink = light ? '#FFFFFF' : '#16305E';
  const gold = '#A9853F';
  const sub = light ? 'rgba(255,255,255,.62)' : '#6E7480';
  return `<svg viewBox="0 0 272 58" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="VET STRONG">
  <circle cx="26" cy="27" r="21" fill="none" stroke="${gold}" stroke-width="2.4"/>
  <path d="M26 16v22M15 27h22" stroke="${gold}" stroke-width="5" stroke-linecap="round"/>
  <circle cx="26" cy="27" r="6.4" fill="${light ? '#16305E' : '#fff'}"/>
  <text x="60" y="30" font-family="Poppins, Segoe UI, Arial, sans-serif" font-size="23" font-weight="700" letter-spacing=".5" fill="${ink}">Vet</text>
  <text x="103" y="30" font-family="Poppins, Segoe UI, Arial, sans-serif" font-size="23" font-weight="700" letter-spacing="1.2" fill="${gold}">STRONG</text>
  <text x="61" y="45" font-family="Poppins, Segoe UI, Arial, sans-serif" font-size="8" letter-spacing="3.4" fill="${sub}">ANIMAL NUTRITION</text>
</svg>`;
}

/* ── Ürün görseli ───────────────────────────────────────────────────────
   Gerçek ambalaj tasarımını (lacivert + altın, dikey karton kutu) taklit
   eden vektörel yer tutucu. Gerçek ürün fotoğrafı
   src/assets/img/products/<slug>.(jpg|png|webp) olarak eklendiğinde
   build.js otomatik olarak onu kullanır ve bu görsel devre dışı kalır.  */
export function productImage({ subBrand, chip, badge, size, accent = '#A9853F', animal = 'kedi', uid = 'p' }) {
  const NAVY = '#16305E';
  const GOLD = '#A9853F';
  const BLUE = '#2456A6';
  const words = String(subBrand).toLocaleUpperCase('tr').split(' ');
  const nameLines = words.length > 1 ? words : [words[0]];

  const pet = animal === 'kedi'
    ? `<g stroke="${NAVY}" stroke-width="5" fill="none" stroke-linecap="round" stroke-linejoin="round" opacity=".85">
         <path d="M232 214c-30 0-52 22-52 50 0 26 23 46 52 46s52-20 52-46c0-28-22-50-52-50Z"/>
         <path d="M190 226l-8-30 28 14M274 226l8-30-28 14"/>
         <path d="M214 258h.1M250 258h.1" stroke-width="9"/>
         <path d="M232 274l-8 7h16z" fill="${NAVY}" stroke="none"/>
         <path d="M168 268h-22M168 284h-22M296 268h22M296 284h22" stroke-width="3.4" opacity=".5"/>
       </g>`
    : `<g stroke="${NAVY}" stroke-width="5" fill="none" stroke-linecap="round" stroke-linejoin="round" opacity=".85">
         <path d="M232 212c-32 0-54 24-54 52 0 26 24 46 54 46s54-20 54-46c0-28-22-52-54-52Z"/>
         <path d="M182 234c-14-4-24 10-22 30 2 20 12 32 24 30M282 234c14-4 24 10 22 30-2 20-12 32-24 30"/>
         <path d="M214 258h.1M250 258h.1" stroke-width="9"/>
         <ellipse cx="232" cy="278" rx="13" ry="9" fill="${NAVY}" stroke="none"/>
       </g>`;

  return `<svg viewBox="0 0 560 560" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${esc(subBrand)} ${esc(size)} ambalaj görseli">
  <defs>
    <path id="seal-${uid}" d="M470 118 m -30,0 a 30,30 0 1,1 60,0 a 30,30 0 1,1 -60,0"/>
    <radialGradient id="sh-${uid}" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="${NAVY}" stop-opacity=".18"/>
      <stop offset="100%" stop-color="${NAVY}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="560" height="560" fill="#fff"/>
  <ellipse cx="270" cy="528" rx="170" ry="22" fill="url(#sh-${uid})"/>

  <!-- yan panel -->
  <path d="M96 44h56v484l-56 18z" fill="${NAVY}"/>
  <path d="M96 150h56v34H96z" fill="${GOLD}" opacity=".9"/>
  <text transform="translate(132 132) rotate(-90)" font-family="Poppins, Arial, sans-serif" font-size="17" font-weight="700" letter-spacing="1.6" fill="#fff">${esc(nameLines[0])}</text>

  <!-- ön yüz -->
  <rect x="152" y="44" width="292" height="484" fill="#fff" stroke="#E6E4DF" stroke-width="2"/>
  <rect x="152" y="44" width="292" height="52" fill="${NAVY}"/>

  <!-- logo -->
  <text x="298" y="146" text-anchor="middle" font-family="Poppins, Arial, sans-serif" font-size="25" font-weight="700" fill="${NAVY}">Vet<tspan fill="${GOLD}"> STRONG</tspan></text>

  <g transform="translate(0,-28)">${pet}</g>

  <!-- fayda bandı -->
  <rect x="152" y="300" width="292" height="36" fill="${GOLD}"/>
  <text x="298" y="325" text-anchor="middle" font-family="Poppins, Arial, sans-serif" font-size="14" font-weight="600" letter-spacing="2.4" fill="#fff">${esc(String(badge).toLocaleUpperCase('tr')).slice(0, 26)}</text>

  <!-- ürün adı -->
  ${nameLines.map((w, i) => `<text x="180" y="${372 + i * 38}" font-family="Poppins, Arial, sans-serif" font-size="38" font-weight="800" letter-spacing="-.5" fill="${NAVY}">${esc(w)}</text>`).join('')}

  <!-- bilgi çipi -->
  <rect x="180" y="${372 + nameLines.length * 38 + 8}" width="248" height="30" rx="5" fill="${BLUE}"/>
  <text x="192" y="${372 + nameLines.length * 38 + 28}" font-family="Poppins, Arial, sans-serif" font-size="11.5" fill="#fff">${esc(String(chip || '').replace(/\.$/, '')).slice(0, 42)}</text>

  <!-- gramaj -->
  <rect x="252" y="${372 + nameLines.length * 38 + 48}" width="92" height="26" rx="13" fill="${NAVY}"/>
  <text x="298" y="${372 + nameLines.length * 38 + 66}" text-anchor="middle" font-family="Poppins, Arial, sans-serif" font-size="13" font-weight="600" fill="#fff">${esc(size)}</text>

  <!-- kalite mührü -->
  <circle cx="470" cy="118" r="44" fill="#fff"/>
  <circle cx="470" cy="118" r="44" fill="none" stroke="${GOLD}" stroke-width="2.4"/>
  <circle cx="470" cy="118" r="33" fill="none" stroke="${GOLD}" stroke-width="1" opacity=".55"/>
  <text font-family="Poppins, Arial, sans-serif" font-size="9" font-weight="700" letter-spacing="1.6" fill="${NAVY}">
    <textPath href="#seal-${uid}" startOffset="0%">QUALITY • QUALITY • </textPath>
  </text>
  <path d="M456 118l9 10 20-22" fill="none" stroke="${GOLD}" stroke-width="4.4" stroke-linecap="round" stroke-linejoin="round"/>
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
  <rect width="560" height="560" fill="#F7F6F3"/>
  <text x="96" y="92" font-family="Poppins, Arial, sans-serif" font-size="26" font-weight="700" fill="#16305E">${esc(subBrand)}</text>
  <text x="96" y="122" font-family="Poppins, Arial, sans-serif" font-size="13" letter-spacing="2" fill="#8496A6">ÖNE ÇIKAN İÇERİK</text>
  <line x1="96" y1="140" x2="464" y2="140" stroke="#DDE4EA" stroke-width="1.5"/>
  ${items}
</svg>`;
}

/* ── Hayvan görseli (dummy fotoğraf yerine stilize illüstrasyon) ───────── */
export function petPhoto(kind = 'cat', w = 800, h = 800) {
  const bg = kind === 'cat' ? '#F7F1E3' : '#E8EDF6';
  const fg = kind === 'cat' ? '#A9853F' : '#16305E';
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
    brand:  ['#16305E', '#A9853F'],
    soft:   ['#F7F6F3', '#16305E'],
    accent: ['#A9853F', '#16305E'],
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
  const S = '#16305E';
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
