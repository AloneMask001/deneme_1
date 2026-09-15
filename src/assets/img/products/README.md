# Gerçek ürün fotoğrafları

Bu klasöre `<ürün-slug>.jpg` (veya `.png` / `.webp`) adıyla dosya
koyduğunuzda, `npm run build` o ürün için otomatik olarak gerçek
fotoğrafı kullanır ve üretilen vektörel yer tutucuyu devre dışı bırakır.
Kod değişikliği gerekmez.

Örnek:

    src/assets/img/products/anti-hairball-malt-paste-100gr.jpg

Slug listesini `src/data/products.js` içinde bulabilirsiniz.

Öneriler: kare (1:1) kadraj, beyaz zemin, en az 1000×1000 px.
