/* ==========================================================================
   INFINI MOUV — Enhancements
   1. GSAP ScrollTrigger : reveal animations au scroll
   2. Hero : parallaxe + fade-out au scroll
   3. Popup promo moderne (remplace le PamphletWidget Muse)
   ========================================================================== */

/* ==========================================================================
   FAILSAFE VISIBILITÉ — anti runtime Adobe Muse obsolète
   --------------------------------------------------------------------------
   Le site repose sur le runtime Adobe Muse (logiciel ABANDONNÉ par Adobe en
   2020) + jQuery 1.8.3 (2012). Tout le <body> est masqué par defaut via
   `.js body { visibility:hidden }` et n'apparait QUE lorsque ce vieux code
   ajoute la classe `initialized` (cf. muse_init / require.js dans index.html).
   Si un de ces scripts tarde, est bloque (CDN, Safari, reseau) ou plante,
   la page reste BLANCHE et "les changements semblent invisibles".
   Filet de securite : on force la visibilite apres un court delai, que le
   runtime Muse ait reussi ou non. (Muse garde sa chance en premier -> pas de
   flash en cas normal ; on ne rattrape que les echecs.)
   ========================================================================== */
(function(){
  function forceVisible(){
    if (document.body && !document.body.classList.contains('initialized')) {
      document.body.classList.add('initialized');
    }
  }
  setTimeout(forceVisible, 1000);
  window.addEventListener('load', function(){ setTimeout(forceVisible, 200); });
})();

/* =====================================================================
   NAV ANCHORS — scroll fiable local + cross-page
   - Au clic sur un lien <a href="...#xxx"> :
     * meme page : laisse le navigateur scroll (CSS smooth + scroll-margin-top)
     * cross-page : enregistre l ancre dans sessionStorage avant navigation
   - Au chargement de page : si une ancre est en attente, scroll dessus
     avec plusieurs retry (les blocs deplaces par JS bougent au load).
   ===================================================================== */
(function(){
  var STORAGE_KEY = 'im_pending_anchor';

  function getCurrentFileName(){
    var p = location.pathname.replace(/\/$/, '');  // "/services-equipements.html" ou ""
    var f = p.substring(p.lastIndexOf('/') + 1);    // "services-equipements.html" ou ""
    return f || 'index.html';
  }

  function scrollToHash(hash){
    if (!hash || hash === '#') return false;
    var target = document.querySelector(hash);
    if (!target) return false;
    target.scrollIntoView({behavior: 'smooth', block: 'start'});
    return true;
  }

  /* Au load : check pending anchor */
  function processPending(){
    var pending = sessionStorage.getItem(STORAGE_KEY);
    if (!pending) return;
    sessionStorage.removeItem(STORAGE_KEY);
    /* Plusieurs essais : le DOM peut changer apres le load
       (ex: blocs deplaces par JS dans services-equipements.html) */
    [200, 500, 1000].forEach(function(delay){
      setTimeout(function(){ scrollToHash(pending); }, delay);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', processPending);
  } else {
    processPending();
  }
  window.addEventListener('load', processPending);

  /* Intercept clicks sur tous les liens avec ancre */
  document.addEventListener('click', function(e){
    var a = e.target.closest && e.target.closest('a[href*="#"]');
    if (!a) return;
    var href = a.getAttribute('href') || '';
    var hashIdx = href.indexOf('#');
    if (hashIdx === -1) return;
    var page = href.substring(0, hashIdx);
    var hash = href.substring(hashIdx);
    if (!hash || hash === '#' || hash === '#main-content') return;

    var currentFile = getCurrentFileName();
    var targetFile = page ? page.replace(/^\.?\//, '').split('?')[0] : currentFile;
    /* Normalise : "index.html" vs "" vs "/" */
    if (targetFile === '' || targetFile === '/' || targetFile === '.') targetFile = 'index.html';

    var isSamePage = (targetFile === currentFile);

    if (isSamePage) {
      /* Meme page : laisse le navigateur (CSS smooth + scroll-margin-top OK) */
      return;
    }
    /* Cross-page : sauve l ancre, laisse la navigation continuer */
    sessionStorage.setItem(STORAGE_KEY, hash);
  }, true);  /* capture phase pour intercepter avant les autres handlers */
})();


document.addEventListener('DOMContentLoaded', function () {

  /* ------------------------------------------------------------------
     -1. IM-SECTION FULL-BLEED — chaque section calcule sa propre
     compensation x via CSS variable --im-parent-x.
     Une section dans main-content (parent x=273.5) → comp -273.5
     Une section dans body (parent x=0) → comp 0
     ------------------------------------------------------------------ */
  function updateImParentOffsets() {
    document.querySelectorAll('.im-section').forEach(function (sec) {
      var x = sec.parentElement.getBoundingClientRect().left;
      sec.style.setProperty('--im-parent-x', x + 'px');
    });
  }
  updateImParentOffsets();
  window.addEventListener('resize', updateImParentOffsets);
  window.addEventListener('load', updateImParentOffsets);

  /* ------------------------------------------------------------------
     0. MOBILE : Déplacer la nav hors du conteneur Muse pour position:fixed
     ------------------------------------------------------------------ */
  var isMobile = window.innerWidth <= 768 || /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

  if (isMobile) {
    var navOriginal = document.querySelector('#u280-bw');
    if (navOriginal) {
      var navClone = navOriginal.cloneNode(true);
      navClone.id = 'u280-bw-mobile';
      navClone.style.cssText = '';
      document.body.insertBefore(navClone, document.body.firstChild);
      navOriginal.classList.add('nav-moved');
    }
  }

  /* ------------------------------------------------------------------
     FAQ : animation douce ouverture/fermeture + comportement accordéon
     (un seul bloc ouvert à la fois)
     ------------------------------------------------------------------ */
  function closeFaqItem(details, instant) {
    var content = details.querySelector('p');
    if (!content) return;
    if (instant) {
      details.removeAttribute('open');
      content.style.height = '0';
      content.style.opacity = '0';
      content.style.paddingTop = '0';
      content.style.paddingBottom = '0';
      return;
    }
    var currentHeight = content.scrollHeight;
    content.style.height = currentHeight + 'px';
    content.offsetHeight; // reflow
    content.style.height = '0';
    content.style.opacity = '0';
    content.style.paddingTop = '0';
    content.style.paddingBottom = '0';
    var onClose = function (ev) {
      if (ev.propertyName !== 'height') return;
      details.removeAttribute('open');
      content.removeEventListener('transitionend', onClose);
    };
    content.addEventListener('transitionend', onClose);
  }

  function openFaqItem(details) {
    var content = details.querySelector('p');
    if (!content) return;
    details.setAttribute('open', '');
    content.style.height = '0';
    content.style.opacity = '0';
    content.style.paddingTop = '0';
    content.style.paddingBottom = '0';
    requestAnimationFrame(function () {
      content.style.height = content.scrollHeight + 'px';
      content.style.opacity = '1';
      content.style.paddingTop = '';
      content.style.paddingBottom = '';
    });
    var onOpen = function (ev) {
      if (ev.propertyName !== 'height') return;
      content.style.height = ''; // libère pour reflow naturel
      content.removeEventListener('transitionend', onOpen);
    };
    content.addEventListener('transitionend', onOpen);
  }

  var faqItems = document.querySelectorAll('.im-faq-item');
  faqItems.forEach(function (details) {
    var summary = details.querySelector('summary');
    if (!summary) return;

    /* Reset propre au load (fermé par défaut) */
    closeFaqItem(details, true);

    summary.addEventListener('click', function (e) {
      e.preventDefault();
      var isOpen = details.hasAttribute('open');

      if (isOpen) {
        closeFaqItem(details);
      } else {
        /* Fermer les autres avant d'ouvrir celui-ci (accordéon single) */
        faqItems.forEach(function (other) {
          if (other !== details && other.hasAttribute('open')) {
            closeFaqItem(other);
          }
        });
        openFaqItem(details);
      }
    });
  });

  /* ------------------------------------------------------------------
     REVEAL AU SCROLL — IntersectionObserver léger, pas de GSAP
     Plus fiable que les gsap.from() qui restaient bloqués à opacity:0
     quand ScrollTrigger se calcule mal sur le layout Muse complexe.
     ------------------------------------------------------------------ */
  if (!('IntersectionObserver' in window) || isMobile) {
    /* Pas de reveal sur mobile (privilégie scroll fluide) ni si IO non supporté */
    return;
  }

  /* Marqueur de cibles : sections im-* + 7 mots services + cards Muse */
  var revealTargets = document.querySelectorAll(
    '.im-section, ' +
    '#u728, #u740, #u682, #u694, #u647, #u627, #u560, ' +  // 7 services
    '#u1750-26, ' +     // L'ABONNEMENT card verte
    '#u1287-3, ' +      // LES OPTIONS card blanche
    '#u429-9, #u478-9, #u484-7, ' +  // 3 avantages cards
    '.im-feature-card, .im-faq-item, .im-adv-text'
  );

  revealTargets.forEach(function (el) {
    el.classList.add('im-reveal', 'im-reveal-hidden');
  });

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.remove('im-reveal-hidden');
        entry.target.classList.add('im-reveal-in');
        io.unobserve(entry.target);  // one-shot, ne re-cache pas au scroll up
      }
    });
  }, {
    rootMargin: '0px 0px -8% 0px',
    threshold: 0.05
  });

  revealTargets.forEach(function (el) { io.observe(el); });

  /* Failsafe : si pour une raison X un élément reste hidden après 2s, on le révèle */
  setTimeout(function () {
    document.querySelectorAll('.im-reveal-hidden').forEach(function (el) {
      el.classList.remove('im-reveal-hidden');
      el.classList.add('im-reveal-in');
    });
  }, 2000);

  /* Stagger pour les groupes d'items (services en cascade) */
  var serviceItems = document.querySelectorAll('#u728, #u740, #u682, #u694, #u647, #u627, #u560');
  serviceItems.forEach(function (el, i) {
    el.style.setProperty('--reveal-delay', (i * 80) + 'ms');
  });


  /* ------------------------------------------------------------------
     1. HERO — Parallaxe vidéo + fade-out titre au scroll
     ------------------------------------------------------------------ */
  var heroTitle = document.querySelector('#u515');
  var heroPrice = document.querySelector('#u1876-10');
  var heroVideo = document.querySelector('#u350 video');

  if (heroTitle) {
    gsap.to(heroTitle, {
      opacity: 0,
      scale: 0.92,
      y: -60,
      ease: 'none',
      scrollTrigger: {
        trigger: '#pu350',
        start: 'top top',
        end: '60% top',
        scrub: true
      }
    });
  }

  if (heroPrice) {
    gsap.to(heroPrice, {
      opacity: 0,
      y: -40,
      ease: 'none',
      scrollTrigger: {
        trigger: '#pu350',
        start: '10% top',
        end: '60% top',
        scrub: true
      }
    });
  }

  if (heroVideo) {
    gsap.to(heroVideo, {
      y: 120,
      ease: 'none',
      scrollTrigger: {
        trigger: '#pu350',
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    });
  }


  /* clearProps:transform en defaut GLOBAL a partir d'ici (apres la parallaxe
     hero en scrub, qu'il ne faut PAS toucher). Chaque reveal one-shot ci-dessous
     efface ainsi sa transform residuelle (translate(0,0)) en fin d'anim : une
     transform residuelle garde l'element sur une couche composite et casse
     -webkit-background-clip:text -> titres degrades peints en NOIR. */
  if (typeof gsap !== 'undefined') {
    gsap.defaults({ clearProps: 'transform' });
  }


  /* ------------------------------------------------------------------
     2. SERVICES LIST — Apparition staggerée (MUSCULATION, CARDIO, etc.)
     ------------------------------------------------------------------ */
  var serviceItems = document.querySelectorAll('#u728, #u740, #u682, #u694, #u647, #u627, #u560');

  if (serviceItems.length) {
    /* Désactiver les scroll effects Muse sur ces éléments pour que GSAP prenne le relais */
    serviceItems.forEach(function (el) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(40px)';
    });

    gsap.to(serviceItems, {
      opacity: 1,
      y: 0,
      duration: 0.7,
      stagger: 0.12,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '#u728',
        start: 'top 85%',
        toggleActions: 'play none none none'
      }
    });
  }


  /* ------------------------------------------------------------------
     3. FEATURE CARDS — Reveal avec décalage (Accès libre, Air, Coaching)
     ------------------------------------------------------------------ */
  var featureCards = document.querySelectorAll('#u429-9, #u478-9, #u484-7');

  featureCards.forEach(function (card, i) {
    gsap.from(card, {
      opacity: 0,
      y: 50,
      duration: 0.8,
      delay: i * 0.15,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: card,
        start: 'top 85%',
        toggleActions: 'play none none none'
      }
    });
  });

  /* Icônes des avantages */
  var featureIcons = document.querySelectorAll('#u397, #u372, #u386');

  featureIcons.forEach(function (icon, i) {
    gsap.from(icon, {
      opacity: 0,
      scale: 0.5,
      duration: 0.6,
      delay: i * 0.15,
      ease: 'back.out(1.7)',
      scrollTrigger: {
        trigger: icon,
        start: 'top 88%',
        toggleActions: 'play none none none'
      }
    });
  });


  /* ------------------------------------------------------------------
     4. PRICING SECTION — Reveal des cards
     ------------------------------------------------------------------ */
  var pricingTitle = document.querySelector('#u1265');
  var pricingGradient = document.querySelector('#u1797');
  var pricingAbonnement = document.querySelector('#u1750-26');
  var pricingOptions = document.querySelector('#u1306');

  if (pricingTitle) {
    gsap.from(pricingTitle, {
      opacity: 0,
      x: -40,
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: pricingTitle,
        start: 'top 85%',
        toggleActions: 'play none none none'
      }
    });
  }

  if (pricingGradient) {
    gsap.from(pricingGradient, {
      opacity: 0,
      scale: 0.9,
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: pricingGradient,
        start: 'top 85%',
        toggleActions: 'play none none none'
      }
    });
  }

  if (pricingAbonnement) {
    gsap.from(pricingAbonnement, {
      opacity: 0,
      y: 40,
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: pricingAbonnement,
        start: 'top 85%',
        toggleActions: 'play none none none'
      }
    });
  }

  if (pricingOptions) {
    gsap.from(pricingOptions, {
      opacity: 0,
      y: 40,
      duration: 0.8,
      delay: 0.2,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: pricingOptions,
        start: 'top 85%',
        toggleActions: 'play none none none'
      }
    });
  }


  /* ------------------------------------------------------------------
     5. CONTACT + WIDGETS — Reveal
     ------------------------------------------------------------------ */
  var contactTitle = document.querySelector('#u929');
  var contactForm = document.querySelector('#u893');
  var instagramFeed = document.querySelector('#u892');

  [contactTitle, contactForm, instagramFeed].forEach(function (el, i) {
    if (el) {
      gsap.from(el, {
        opacity: 0,
        y: 30,
        duration: 0.7,
        delay: i * 0.15,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          toggleActions: 'play none none none'
        }
      });
    }
  });


  /* ------------------------------------------------------------------
     6. FOOTER — Subtle reveal
     ------------------------------------------------------------------ */
  var footer = document.querySelector('#u94');

  if (footer) {
    gsap.from(footer, {
      opacity: 0,
      y: 20,
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: footer,
        start: 'top 92%',
        toggleActions: 'play none none none'
      }
    });
  }


  /* ==================================================================
     7. POPUP PROMO — DÉSACTIVÉ (offre Summer Body expirée le 23/05/2026)
     Pour réactiver une nouvelle promo :
     1. Décommenter le bloc ci-dessous
     2. Remplacer l'image src par la nouvelle créa
     3. Changer le suffixe de PROMO_KEY pour forcer un nouvel affichage
     ================================================================== */
  /*
  var PROMO_KEY = 'im_promo_seen_NOUVELLE_PROMO';
  if (sessionStorage.getItem(PROMO_KEY)) return;

  var overlay = document.createElement('div');
  overlay.id = 'im-promo-overlay';
  overlay.innerHTML = [
    '<div id="im-promo-modal">',
    '  <button id="im-promo-close" aria-label="Fermer la promotion">&times;</button>',
    '  <div id="im-promo-content">',
    '    <a href="#tarifs" id="im-promo-link">',
    '      <img src="images/couverture-NOUVELLE.webp" alt="Nouvelle offre" loading="eager">',
    '    </a>',
    '  </div>',
    '</div>'
  ].join('\n');

  document.body.appendChild(overlay);

  setTimeout(function () {
    overlay.classList.add('im-promo-visible');
    var closeBtn = document.querySelector('#im-promo-close');
    if (closeBtn) closeBtn.focus();
  }, 1500);

  function closePromo() {
    overlay.classList.remove('im-promo-visible');
    overlay.classList.add('im-promo-closing');
    sessionStorage.setItem(PROMO_KEY, '1');
    setTimeout(function () {
      if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
    }, 400);
  }

  overlay.addEventListener('click', function (e) { if (e.target === overlay) closePromo(); });
  var closeBtn = document.querySelector('#im-promo-close');
  if (closeBtn) closeBtn.addEventListener('click', closePromo);
  var promoLink = document.querySelector('#im-promo-link');
  if (promoLink) promoLink.addEventListener('click', function () { closePromo(); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && overlay.classList.contains('im-promo-visible')) closePromo();
  });
  */

});
