# Finans uyarıları

Döviz, altın ve hisse fiyatları koşulları sağlayınca e-posta atar. GitHub Actions
üzerinde 15 dakikada bir çalışır (bilgisayarın kapalıyken de).

## Kurulum
1. Google Hesabı → Güvenlik → 2 adımlı doğrulamayı aç → "Uygulama şifreleri"nden bir şifre üret.
2. Repo → Settings → Secrets and variables → Actions → şu secret'ları ekle:
   - `SMTP_USER`: gmail adresin
   - `SMTP_PASSWORD`: 16 haneli uygulama şifresi
   - `MAIL_TO`: (opsiyonel) bildirimin gideceği adres, boşsa kendine gönderir
3. `config.json` içindeki uyarıları düzenle, ana dala (main) merge et — zamanlanmış çalışma sadece varsayılan daldan tetiklenir.
4. Actions sekmesinden "Finans uyarıları" → Run workflow ile elle dene.

## Koşul türleri
- `above` / `below`: fiyat eşiğin üstüne / altına geçince
- `change_pct`: önceki kapanışa göre günlük değişim ±% eşiği aşınca

Semboller: `USDTRY`, `EURTRY`, `GRAM_ALTIN` (ons × USD/TRY ÷ 31,1035), `ONS_ALTIN`,
BIST için `THYAO.IS`, `XU100.IS`, ABD için `AAPL` gibi Yahoo Finance sembolleri.

Aynı uyarı, koşul bozulup tekrar sağlanana kadar bir kez gönderilir.
Yerelde deneme: `python3 finance-alerts/check.py --dry-run`

Telefona SMS istersen: e-posta yerine Telegram botu eklemek çok kolay (ücretsiz).
