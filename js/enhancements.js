/* ==========================================================================
   INFINI MOUV — Enhancements
   1. GSAP ScrollTrigger : reveal animations au scroll
   2. Hero : parallaxe + fade-out au scroll
   3. Popup promo moderne (remplace le PamphletWidget Muse)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function () {

  /* Attendre que GSAP soit chargé */
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

  gsap.registerPlugin(ScrollTrigger);


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
     7. POPUP PROMO MODERNE
     Remplace le PamphletWidget Muse.
     - Apparaît 1.5s après le chargement
     - Backdrop blur + scale animation
     - Fermeture : bouton X, clic sur backdrop, touche Escape
     - sessionStorage pour ne montrer qu'une fois par session
     ================================================================== */

  /* Vérifier si déjà vu cette session */
  if (sessionStorage.getItem('im_promo_seen')) return;

  /* Créer le popup */
  var overlay = document.createElement('div');
  overlay.id = 'im-promo-overlay';
  overlay.innerHTML = [
    '<div id="im-promo-modal">',
    '  <button id="im-promo-close" aria-label="Fermer la promotion">&times;</button>',
    '  <div id="im-promo-content">',
    '    <img src="images/couverture-1250x462-infinimouv.jpg" alt="Promotion Infini Mouv Agde" loading="eager">',
    '  </div>',
    '</div>'
  ].join('\n');

  document.body.appendChild(overlay);

  /* Afficher après un délai */
  setTimeout(function () {
    overlay.classList.add('im-promo-visible');

    /* Focus trap pour accessibilité */
    var closeBtn = document.querySelector('#im-promo-close');
    if (closeBtn) closeBtn.focus();
  }, 1500);

  /* Fonctions de fermeture */
  function closePromo() {
    overlay.classList.remove('im-promo-visible');
    overlay.classList.add('im-promo-closing');
    sessionStorage.setItem('im_promo_seen', '1');

    setTimeout(function () {
      if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
    }, 400);
  }

  /* Event listeners */
  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) closePromo();
  });

  var closeBtn = document.querySelector('#im-promo-close');
  if (closeBtn) closeBtn.addEventListener('click', closePromo);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && overlay.classList.contains('im-promo-visible')) {
      closePromo();
    }
  });

});
