/* ==========================================================================
   INFINI MOUV — JS propre (rebuild sans Muse)
   Vanilla, aucune dépendance (ni jQuery, ni require.js, ni runtime Muse).
   ========================================================================== */
(function () {
  'use strict';

  /* ---- Nav mobile (burger) ---- */
  var burger = document.querySelector('.nav__burger');
  var links = document.querySelector('.nav__links');
  if (burger && links) {
    burger.addEventListener('click', function () {
      links.classList.toggle('open');
      burger.setAttribute('aria-expanded', links.classList.contains('open'));
    });
    links.addEventListener('click', function (e) {
      if (e.target.closest('a')) links.classList.remove('open');
    });
  }

  /* ---- Année dynamique footer ---- */
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  /* ---- Reveal au scroll (IntersectionObserver) ---- */
  var targets = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && targets.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    targets.forEach(function (el) { io.observe(el); });
  } else {
    targets.forEach(function (el) { el.classList.add('in'); });
  }

  /* ---- Chargement Elfsight uniquement quand un widget approche (perf) ---- */
  var widgets = document.querySelectorAll('[data-elfsight-app-lazy], [class^="elfsight-app-"]');
  if (widgets.length) {
    var loadElf = function () {
      if (document.getElementById('elfsight-platform')) return;
      var s = document.createElement('script');
      s.id = 'elfsight-platform';
      s.src = 'https://elfsightcdn.com/platform.js';
      s.async = true;
      document.body.appendChild(s);
    };
    if ('IntersectionObserver' in window) {
      var eo = new IntersectionObserver(function (entries) {
        if (entries.some(function (e) { return e.isIntersecting; })) { loadElf(); eo.disconnect(); }
      }, { rootMargin: '600px' });
      widgets.forEach(function (w) { eo.observe(w); });
    } else { loadElf(); }
  }
})();
