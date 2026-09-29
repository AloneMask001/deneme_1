#!/usr/bin/env python3
"""Finans uyarıları: koşul sağlanınca e-posta gönderir. Sadece standart kütüphane."""
import json, os, smtplib, ssl, sys, urllib.request
from email.message import EmailMessage
from pathlib import Path

HERE = Path(__file__).parent
OUNCE_GRAM = 31.1035
# Kısa ad -> Yahoo Finance sembolü. Listede olmayan semboller olduğu gibi kullanılır.
YAHOO = {"USDTRY": "USDTRY=X", "EURTRY": "EURTRY=X", "ONS_ALTIN": "GC=F"}


def fetch(symbol):
    """(son fiyat, önceki kapanış) döndürür."""
    url = f"https://query1.finance.yahoo.com/v8/finance/chart/{symbol}?range=5d&interval=1d"
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(req, timeout=30) as r:
        meta = json.load(r)["chart"]["result"][0]["meta"]
    return meta["regularMarketPrice"], meta.get("chartPreviousClose")


def get_quote(name):
    if name == "GRAM_ALTIN":
        (ons, ons_prev), (usd, usd_prev) = fetch("GC=F"), fetch("USDTRY=X")
        prev = ons_prev * usd_prev / OUNCE_GRAM if ons_prev and usd_prev else None
        return ons * usd / OUNCE_GRAM, prev
    return fetch(YAHOO.get(name, name))


def triggered(alert, price, prev):
    t, v = alert["type"], alert["value"]
    if t == "above":
        return price > v, f"{price:,.2f} > {v}"
    if t == "below":
        return price < v, f"{price:,.2f} < {v}"
    if t == "change_pct":
        if not prev:
            return False, "önceki kapanış yok"
        pct = (price - prev) / prev * 100
        return abs(pct) >= v, f"günlük değişim %{pct:+.2f} (eşik ±%{v})"
    raise ValueError(f"bilinmeyen tür: {t}")


def send_mail(lines):
    user, pw = os.environ["SMTP_USER"], os.environ["SMTP_PASSWORD"]
    to = os.environ.get("MAIL_TO", user)
    msg = EmailMessage()
    msg["Subject"] = f"Finans uyarısı: {len(lines)} koşul sağlandı"
    msg["From"], msg["To"] = user, to
    msg.set_content("\n".join(lines))
    with smtplib.SMTP_SSL("smtp.gmail.com", 465, context=ssl.create_default_context()) as s:
        s.login(user, pw)
        s.send_message(msg)


def main():
    cfg = json.loads((HERE / "config.json").read_text(encoding="utf-8"))
    state_file = HERE / "state.json"
    state = json.loads(state_file.read_text()) if state_file.exists() else {}
    dry = "--dry-run" in sys.argv
    new_alerts, cache = [], {}

    for a in cfg["alerts"]:
        sym = a["symbol"]
        try:
            cache.setdefault(sym, get_quote(sym))
        except Exception as e:  # tek sembol hatası diğerlerini durdurmasın
            print(f"[HATA] {sym}: {e}")
            continue
        price, prev = cache[sym]
        hit, detail = triggered(a, price, prev)
        print(f"[{'TETİK' if hit else 'ok   '}] {a['name']}: {detail}")
        # Aynı uyarıyı tekrar tekrar göndermemek için: koşul bozulunca yeniden silahlanır.
        if hit and not state.get(a["name"]):
            new_alerts.append(f"{a['name']} — {detail}")
        state[a["name"]] = hit

    if new_alerts:
        print("Gönderiliyor:", *new_alerts, sep="\n  ")
        if not dry:
            send_mail(new_alerts)
    if not dry:
        state_file.write_text(json.dumps(state, ensure_ascii=False, indent=2), encoding="utf-8")


if __name__ == "__main__":
    main()
