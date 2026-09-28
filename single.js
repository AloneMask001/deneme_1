/* ==========================================================================
   Tek dosyalık sürüm üreteci.
   Önizleme çıktısını (artifact/) alır; CSS, JS ve tüm görselleri dosyanın
   içine gömerek tek bir .html üretir. Çift tıklayınca açılır, sunucu ya da
   ek dosya gerektirmez — e-posta ile gönderilebilir.
   Kullanım: npm run single   → dist-single/index.html
   ========================================================================== */
import fs from 'node:fs';
import path from 'node:path';

const SRC = 'artifact';
const OUT = 'dist-single';
const FILE = 'index.html';

if (!fs.existsSync(path.join(SRC, 'index.html'))) {
  console.error('artifact/index.html yok — önce `node preview.js` çalıştırın.');
  process.exit(1);
}

let html = fs.readFileSync(path.join(SRC, 'index.html'), 'utf8');

/** SVG'yi base64 yerine URL kodlamasıyla gömer — SVG metin olduğu için
 *  bu yöntem base64'ten belirgin şekilde küçük dosya üretir. */
function dataUri(file) {
  const ext = path.extname(file).toLowerCase();
  const buf = fs.readFileSync(file);
  if (ext === '.svg') {
    const cleaned = buf.toString('utf8').replace(/\s+/g, ' ').trim();
    return 'data:image/svg+xml,' + encodeURIComponent(cleaned).replace(/'/g, '%27').replace(/"/g, '%22');
  }
  const types = { '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp' };
  return `data:${types[ext] || 'application/octet-stream'};base64,${buf.toString('base64')}`;
}

// 1) CSS'i göm
const css = fs.readFileSync(path.join(SRC, 'assets/css/style.css'), 'utf8');
// DİKKAT: replace()'e metin verilirse `$$` tek `$`, `$&` eşleşme olarak
// yorumlanır ve gömülen kaynak bozulur. Bu yüzden işlev kullanıyoruz.
html = html.replace(
  /<link rel="stylesheet" href="assets\/css\/style\.css">/,
  () => `<style>\n${css}\n</style>`
);

// 2) JS'i göm
const js = fs.readFileSync(path.join(SRC, 'assets/js/site.js'), 'utf8');
html = html.replace(
  /<script src="assets\/js\/site\.js"[^>]*><\/script>/,
  () => `<script>\n${js}\n</script>`
);

// 3) Görselleri göm (hem düz HTML'de hem JSON'a gömülü görünümlerde)
const cache = new Map();
let embedded = 0, missing = 0;
const embed = (rel) => {
  if (cache.has(rel)) return cache.get(rel);
  const file = path.join(SRC, rel);
  if (!fs.existsSync(file)) { missing++; return null; }
  const uri = dataUri(file);
  cache.set(rel, uri);
  embedded++;
  return uri;
};

// Görünümler (window.__VIEWS__ JSON'u) aynı görseli defalarca içerir; her birini
// ayrı ayrı gömmek dosyayı katlar. Bu yüzden görünümlerde görseller __IMG_n__
// belirteciyle geçer, veri bir kez window.__IMGS__ dizisinde tutulur ve
// yönlendirici sayfayı çizerken belirteçleri yerine koyar.
const table = [];
const idOf = (rel) => {
  const uri = embed(rel);
  if (!uri) return null;
  let i = table.indexOf(uri);
  if (i === -1) { table.push(uri); i = table.length - 1; }
  return i;
};
const vStart = html.indexOf('window.__VIEWS__ = ');
const vEnd = html.indexOf('</script>', vStart);
let views = html.slice(vStart, vEnd);
views = views.replace(/(\\?")(assets\/img\/[^"\\]+)\1/g, (m, q, rel) => {
  const i = idOf(rel);
  return i === null ? m : `${q}__IMG_${i}__${q}`;
});
html = html.slice(0, vStart) + views + `\nwindow.__IMGS__ = ${JSON.stringify(table)};\n` + html.slice(vEnd);

// Görünüm dışındaki (kabuk) görseller doğrudan gömülür
html = html.replace(/(\\?")(assets\/img\/[^"\\]+)\1/g, (m, q, rel) => {
  const uri = embed(rel);
  return uri ? `${q}${uri}${q}` : m;
});

// Yönlendirici belirteçleri çizim anında çözsün
const renderLine = 'view.innerHTML = html;';
if (!html.includes(renderLine)) throw new Error('yönlendirici satırı bulunamadı');
html = html.replace(renderLine, () =>
  'view.innerHTML = html.replace(/__IMG_(\\d+)__/g, function (m, i) { return window.__IMGS__[i]; });');

fs.mkdirSync(OUT, { recursive: true });
const out = path.join(OUT, FILE);
fs.writeFileSync(out, html, 'utf8');

const kb = (fs.statSync(out).size / 1024).toFixed(0);
console.log(`✓ ${out} — ${kb} KB, ${embedded} görsel gömüldü${missing ? `, ${missing} bulunamadı` : ''}`);
