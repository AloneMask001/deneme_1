/* VET STRONG — arayüz etkileşimleri */
(function () {
  'use strict';

  var $  = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  /* ── Mobil menü ─────────────────────────────────────────────── */
  var nav = $('#nav'), burger = $('#burger'), scrim = $('#scrim');
  function closeNav() {
    if (!nav) return;
    nav.classList.remove('open');
    scrim && scrim.classList.remove('open');
    burger && burger.setAttribute('aria-expanded', 'false');
  }
  burger && burger.addEventListener('click', function () {
    var open = nav.classList.toggle('open');
    scrim && scrim.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', String(open));
  });
  scrim && scrim.addEventListener('click', closeNav);
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeNav(); });

  /* ── Arama ──────────────────────────────────────────────────── */
  var st = $('#searchToggle'), sb = $('#searchbar'), si = $('#siteSearch');
  st && st.addEventListener('click', function () {
    var open = sb.classList.toggle('open');
    st.setAttribute('aria-expanded', String(open));
    if (open && si) si.focus();
  });
  si && si.addEventListener('keydown', function (e) {
    if (e.key !== 'Enter') return;
    var q = si.value.trim();
    if (!q) return;
    var base = si.getAttribute('data-base') || '';
    location.href = base + 'urunler.html?q=' + encodeURIComponent(q);
  });

  /* ── Görünüm içi etkileşimler (SPA önizlemesinde her sayfa
        değişiminde yeniden çalıştırılır) ──────────────────────────── */
  function initView(scope) {
    var root = scope || document;
    var $v  = function (s) { return root.querySelector(s); };
    var $$v = function (s) { return Array.prototype.slice.call(root.querySelectorAll(s)); };

  /* ── Akordeon ───────────────────────────────────────────────── */
  $$v('.acc__btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var acc = btn.closest('.acc');
      var closed = acc.classList.toggle('closed');
      var ic = $('.acc__icon', btn);
      if (ic) ic.textContent = closed ? '+' : '−';
    });
  });

  /* ── Sekmeler ───────────────────────────────────────────────── */
  $$v('.tabs').forEach(function (tabs) {
    $$('.tabs__btn', tabs).forEach(function (btn) {
      btn.addEventListener('click', function () {
        $$('.tabs__btn', tabs).forEach(function (b) { b.classList.remove('active'); });
        $$('.tabs__panel', tabs).forEach(function (p) { p.classList.remove('active'); });
        btn.classList.add('active');
        var panel = $('#' + btn.dataset.tab, tabs);
        panel && panel.classList.add('active');
      });
    });
  });

  /* ── Ürün galerisi ──────────────────────────────────────────── */
  (function () {
    var main = $v('#galleryMain');
    if (!main) return;
    var thumbs = $$v('.gallery__thumb');
    var i = 0;
    function show(n) {
      i = (n + thumbs.length) % thumbs.length;
      main.src = thumbs[i].dataset.full;
      thumbs.forEach(function (t, k) { t.classList.toggle('active', k === i); });
    }
    thumbs.forEach(function (t, k) { t.addEventListener('click', function () { show(k); }); });
    var p = $v('#galPrev'), n = $v('#galNext');
    p && p.addEventListener('click', function () { show(i - 1); });
    n && n.addEventListener('click', function () { show(i + 1); });
  })();

  /* ── Katalog filtreleri ─────────────────────────────────────── */
  (function () {
    var croot = $v('#catalog');
    if (!croot) return;
    var root2 = croot;

    var cards   = $$('.pcard[data-slug]', root2);
    var countEl = $v('#catalogCount');
    var emptyEl = $v('#catalogEmpty');
    var searchEl= $v('#filterSearch');
    var boxes   = $$('.fpill input', root2);

    // URL'den gelen arama terimi
    var params = new URLSearchParams(location.search);
    if (searchEl && params.get('q')) searchEl.value = params.get('q');

    function apply() {
      var q = (searchEl && searchEl.value || '').trim().toLocaleLowerCase('tr');
      var sel = {};
      boxes.forEach(function (b) {
        if (!b.checked) return;
        (sel[b.name] = sel[b.name] || []).push(b.value);
      });

      var shown = 0;
      cards.forEach(function (card) {
        var ok = true;
        Object.keys(sel).forEach(function (group) {
          var vals = (card.dataset[group] || '').split(' ').filter(Boolean);
          if (!sel[group].some(function (v) { return vals.indexOf(v) > -1; })) ok = false;
        });
        if (ok && q) {
          ok = (card.dataset.search || '').toLocaleLowerCase('tr').indexOf(q) > -1;
        }
        card.hidden = !ok;
        if (ok) shown++;
      });

      if (countEl) countEl.textContent = shown + ' ürün';
      if (emptyEl) emptyEl.hidden = shown > 0;
    }

    boxes.forEach(function (b) { b.addEventListener('change', apply); });
    searchEl && searchEl.addEventListener('input', apply);

    var clear = $v('#filterClear');
    clear && clear.addEventListener('click', function () {
      boxes.forEach(function (b) { b.checked = false; });
      if (searchEl) searchEl.value = '';
      apply();
    });

    // Grup aç/kapa
    $$('.fgroup__title', root2).forEach(function (t) {
      t.addEventListener('click', function () { t.closest('.fgroup').classList.toggle('collapsed'); });
    });

    // Mobil filtre paneli
    var ft = $v('#filtersToggle'), fb = $v('#filtersBody');
    ft && ft.addEventListener('click', function () { fb.classList.toggle('open'); });

    apply();
  })();
  }

  window.vsInitView = initView;
  initView(document);
})();
