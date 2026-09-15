/* ==========================================================================
   Tek dosyalık gezilebilir önizleme üreteci (Artifact yayını için).
   dist/ içindeki tüm sayfaları tek bir HTML'e gömer, iç linkleri hash
   yönlendirmesine çevirir. Gerçek site çok sayfalıdır — bu yalnızca
   paylaşılabilir önizleme içindir.
   Kullanım: node preview.js   → artifact/ klasörünü üretir
   ========================================================================== */
import fs from 'node:fs';
import path from 'node:path';

const DIST = 'dist';
const OUT = 'artifact';

const pages = [];
(function walk(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const f = path.join(d, e.name);
    if (e.isDirectory()) walk(f);
    else if (e.name.endsWith('.html')) pages.push(path.relative(DIST, f).split(path.sep).join('/'));
  }
})(DIST);

const routeOf = (rel) => (rel === 'index.html' ? '/' : '/' + rel.replace(/\.html$/, ''));

/** Bir sayfadaki göreli yolu dist köküne göre normalize eder. */
const resolveFrom = (pageRel, url) => {
  const dir = path.posix.dirname(pageRel);
  return path.posix.normalize(path.posix.join(dir === '.' ? '' : dir, url));
};

function rewrite(html, pageRel) {
  return html.replace(/(href|src|data-full)="([^"]+)"/g, (m, attr, url) => {
    if (/^(https?:|mailto:|tel:|data:|#)/.test(url)) return m;
    const clean = url.split('#')[0].split('?')[0];
    const abs = resolveFrom(pageRel, clean);
    if (abs.endsWith('.html')) return `${attr}="#${routeOf(abs)}"`;
    return `${attr}="${abs}"`;          // assets/... köke göre
  });
}

const views = {};
const titles = {};
for (const rel of pages) {
  const src = fs.readFileSync(path.join(DIST, rel), 'utf8');
  const main = /<main>([\s\S]*?)<\/main>/.exec(src);
  const title = /<title>([^<]*)<\/title>/.exec(src);
  if (!main) continue;
  views[routeOf(rel)] = rewrite(main[1], rel);
  titles[routeOf(rel)] = title ? title[1] : 'VET STRONG';
}

// Kabuk: index.html'in header + footer'ı
const idx = fs.readFileSync(path.join(DIST, 'index.html'), 'utf8');
const bodyInner = /<body>([\s\S]*)<\/body>/.exec(idx)[1];
const [beforeMain, afterMain] = bodyInner.split(/<main>[\s\S]*?<\/main>/);

const shellHead = rewrite(beforeMain, 'index.html');
const shellFoot = rewrite(afterMain, 'index.html');

const page = `<title>VET STRONG</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
<link rel="stylesheet" href="assets/css/style.css">
<style>
  .preview-note{background:#0F2E4C;color:rgba(255,255,255,.9);font-size:.8rem;text-align:center;padding:9px 16px}
  .preview-note b{color:#19B85F}
</style>
<div class="preview-note"><b>ÖNİZLEME</b> — Ürün görselleri, logo ve firma metinleri geçicidir. Satın alma bağlantısı yalnızca Anti Hairball Malt Paste 100 gr ürününde gerçektir.</div>
${shellHead}
<main id="view"></main>
${shellFoot}
<script>
window.__VIEWS__ = ${JSON.stringify(views)};
window.__TITLES__ = ${JSON.stringify(titles)};
</script>
<script src="assets/js/site.js"></script>
<script>
(function () {
  var view = document.getElementById('view');
  function render() {
    var r = location.hash.replace(/^#/, '') || '/';
    var html = window.__VIEWS__[r];
    if (html === undefined) { r = '/'; html = window.__VIEWS__['/']; }
    view.innerHTML = html;
    document.title = window.__TITLES__[r] || 'VET STRONG';
    if (window.vsInitView) window.vsInitView(view);
    document.querySelectorAll('.nav__link[aria-current]').forEach(function (a) { a.removeAttribute('aria-current'); });
    window.scrollTo(0, 0);
  }
  window.addEventListener('hashchange', render);
  render();
})();
</script>`;

fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(OUT, { recursive: true });
fs.writeFileSync(path.join(OUT, 'index.html'), page, 'utf8');
fs.cpSync(path.join(DIST, 'assets'), path.join(OUT, 'assets'), { recursive: true });

console.log(`✓ artifact/ üretildi — ${Object.keys(views).length} görünüm, ${(page.length / 1024).toFixed(0)} KB tek dosya`);
