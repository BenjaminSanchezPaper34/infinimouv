/* ==========================================================================
   INFINI MOUV — Enhancements
   1. GSAP ScrollTrigger : reveal animations au scroll
   2. Hero : parallaxe + fade-out au scroll
   3. Popup promo moderne (remplace le PamphletWidget Muse)
   ========================================================================== */

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

  /* GSAP COMPLÈTEMENT DÉSACTIVÉ pour l'instant.
     Les `gsap.from()` initialisaient opacity:0 et certaines cards ne se
     re-affichaient pas si ScrollTrigger calcule mal (transforms Muse).
     Resultat : cards semi-transparentes ou invisibles.
     A ré-activer plus tard quand le design est figé. */
  return;


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
