# VET STRONG — Kurumsal & Ürün Kataloğu Web Sitesi

Kedi ve köpekler için malt, mama ve besin takviyesi üreten VET STRONG'un
tanıtım sitesi. **Site üzerinden satış yapılmaz**; satın alma, ürün
sayfalarındaki bağlantılarla Trendyol / Hepsiburada gibi pazaryerlerine
yönlendirilir.

## Çalıştırma

```bash
npm run build     # dist/ klasörünü üretir
npm run serve     # http://localhost:4173 önizleme sunucusu
npm run dev       # build + serve
```

Bağımlılık yoktur, sadece Node.js 18+ gerekir. Çıktı tamamen statiktir;
`dist/` klasörü herhangi bir statik hostinge (Netlify, Vercel, cPanel,
GitHub Pages) olduğu gibi yüklenebilir.

## Klasör yapısı

```
build.js                 Statik site üreteci (tüm sayfaları oluşturur)
serve.js                 Yerel önizleme sunucusu
src/data/site.js         Firma bilgileri, kategoriler, pazaryeri linkleri
src/data/products.js     Ürün kataloğu
src/data/blog.js         Blog yazıları
src/lib/layout.js        Header / footer / sayfa iskeleti
src/lib/svg.js           Dummy görsel üreteci
src/assets/css/style.css Tasarım sistemi
src/assets/js/site.js    Menü, filtre, sekme, galeri etkileşimleri
dist/                    Üretilen site (build çıktısı)
```

## Sayfalar

| Sayfa | URL |
|---|---|
| Anasayfa | `/index.html` |
| Tüm Ürünler (filtreli katalog) | `/urunler.html` |
| Kedi / Köpek ürünleri | `/urunler/kedi.html`, `/urunler/kopek.html` |
| Malt / Mama / Besin Takviyesi | `/urunler/malt.html` vb. |
| Ürün detay | `/urun/<slug>.html` |
| Hakkımızda · Üretim & Kalite · Kariyer | `/hakkimizda.html` vb. |
| Satış Noktaları | `/satis-noktalari.html` |
| Blog + yazılar | `/blog.html`, `/blog/<slug>.html` |
| İletişim | `/iletisim.html` |
| Gizlilik · KVKK | `/gizlilik-politikasi.html`, `/kvkk.html` |

Ayrıca `sitemap.xml` ve `robots.txt` otomatik üretilir.

## ⚠️ Gerçek içerikle değiştirilmesi gerekenler

Aşağıdakiler şu an **dummy**'dir:

1. **Logo** — `src/lib/svg.js` içindeki `logo()` fonksiyonu geçici bir
   wordmark üretir. Gerçek logo dosyası geldiğinde bu fonksiyon yerine
   `<img src="assets/img/logo.svg">` kullanılmalıdır.
2. **Ürün görselleri** — `src/lib/svg.js` vektörel placeholder üretir.
   Gerçek fotoğraflar `dist/assets/img/product-<slug>.jpg` olarak
   konulup `build.js` içindeki `imgOf()` uzantısı değiştirilmelidir.
3. **Ürünler** — `src/data/products.js` içinde **yalnızca ilk ürün
   gerçektir** (Anti Hairball Malt Paste 100gr, gerçek Trendyol linkiyle).
   Diğer 11 ürün `dummy: true` ile işaretlidir; gerçek katalog geldiğinde
   silinmeli ya da üzerine yazılmalıdır.
4. **Fiyatlar** — tamamı örnek değerdir. Gerçek tavsiye edilen perakende
   satış fiyatlarıyla güncellenmelidir.
5. **Yorumlar** — sadece gerçek ürün için örnek yorumlar vardır.
6. **Firma metinleri** — Hakkımızda, Üretim & Kalite, Kariyer sayfaları ve
   footer metni örnek içeriktir.
7. **İletişim bilgileri** — `src/data/site.js` içindeki telefon, e-posta,
   adres ve sosyal medya linkleri örnektir.
8. **Pazaryeri mağaza linkleri** — `site.stores` içindeki genel mağaza
   URL'leri `#` olarak bırakılmıştır.
9. **İletişim formu ve e-bülten** — şu an gönderim yapmaz; bir e-posta
   servisine (Formspree, kendi backend'iniz vb.) bağlanmalıdır.
10. **Satış noktaları şehir listesi** — gerçek bayi bilgileriyle
    doldurulmalıdır.

## Yeni ürün ekleme

`src/data/products.js` içine yeni bir nesne ekleyip `npm run build`
çalıştırmak yeterlidir. Ürün sayfası, katalog kartı, filtre sayaçları,
ilgili ürünler bölümü ve sitemap otomatik güncellenir.

Zorunlu alanlar: `slug`, `name`, `subBrand`, `benefit`, `animal`
(`kedi`/`kopek`), `type` (`malt`/`mama`/`besin-takviyeleri`), `topics[]`,
`size`, `badge`, `accent`, `price`, `rating`, `reviewCount`, `short`,
`bullets[]`, `ingredients`, `usageTitle`, `dosage`, `topicTabTitle`,
`topicTabText`, `links[]`, `reviews[]`.

`links: []` boş bırakılırsa ürün "Yakında" olarak işaretlenir ve satın alma
butonu yerine bilgilendirme kutusu gösterilir.
