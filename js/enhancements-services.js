/* ==========================================================================
   INFINI MOUV — Enhancements (Page Services)
   GSAP ScrollTrigger : reveal animations au scroll
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function () {

  /* Mobile : Déplacer la nav hors du conteneur Muse pour position:fixed */
  if (window.innerWidth <= 768) {
    var navOriginal = document.querySelector('#u280-bw');
    if (navOriginal) {
      var navClone = navOriginal.cloneNode(true);
      navClone.id = 'u280-bw-mobile';
      navClone.style.cssText = '';
      document.body.insertBefore(navClone, document.body.firstChild);
      navOriginal.classList.add('nav-moved');
    }
  }

  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

  gsap.registerPlugin(ScrollTrigger);


  /* ------------------------------------------------------------------
     1. HERO IMAGE — Parallaxe
     ------------------------------------------------------------------ */
  var heroBg = document.querySelector('#u1329');

  if (heroBg) {
    gsap.to(heroBg, {
      backgroundPositionY: '30%',
      ease: 'none',
      scrollTrigger: {
        trigger: '#u1329-bw',
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    });
  }


  /* ------------------------------------------------------------------
     2. SECTION TITLE — Slide in
     ------------------------------------------------------------------ */
  var sectionTitle = document.querySelector('#u1322');

  if (sectionTitle) {
    gsap.from(sectionTitle, {
      opacity: 0,
      x: -40,
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: sectionTitle,
        start: 'top 85%',
        toggleActions: 'play none none none'
      }
    });
  }


  /* ------------------------------------------------------------------
     3. INTRO TEXT — Fade in
     ------------------------------------------------------------------ */
  var introText = document.querySelector('#u1346-4');

  if (introText) {
    gsap.from(introText, {
      opacity: 0,
      y: 30,
      duration: 0.7,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: introText,
        start: 'top 85%',
        toggleActions: 'play none none none'
      }
    });
  }


  /* ------------------------------------------------------------------
     4. EQUIPMENT CARDS — Staggered reveal
     ------------------------------------------------------------------ */
  var equipCards = document.querySelectorAll(
    '#u1364-7, #u1376-3, #u1408-7, #u1434-9, #u1437-3, #u1470-3, #u1479-3, #u1440-9, #u1476-3, #u1425-13'
  );

  equipCards.forEach(function (card, i) {
    gsap.from(card, {
      opacity: 0,
      y: 40,
      duration: 0.7,
      delay: (i % 3) * 0.12,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: card,
        start: 'top 88%',
        toggleActions: 'play none none none'
      }
    });
  });


  /* ------------------------------------------------------------------
     5. COURS COLLECTIFS TITLE — Slide in
     ------------------------------------------------------------------ */
  var coursTitle = document.querySelector('#u1525');

  if (coursTitle) {
    gsap.from(coursTitle, {
      opacity: 0,
      x: -40,
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: coursTitle,
        start: 'top 85%',
        toggleActions: 'play none none none'
      }
    });
  }


  /* ------------------------------------------------------------------
     6. COURS LIST — Staggered reveal
     ------------------------------------------------------------------ */
  var coursCol1 = document.querySelector('#u1615-21');
  var coursCol2 = document.querySelector('#u1627-16');

  [coursCol1, coursCol2].forEach(function (col, i) {
    if (col) {
      gsap.from(col, {
        opacity: 0,
        y: 40,
        duration: 0.7,
        delay: i * 0.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: col,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      });
    }
  });


  /* ------------------------------------------------------------------
     7. PLANNING — Scale reveal
     ------------------------------------------------------------------ */
  var planning = document.querySelector('#u1723');

  if (planning) {
    gsap.from(planning, {
      opacity: 0,
      scale: 0.95,
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: planning,
        start: 'top 85%',
        toggleActions: 'play none none none'
      }
    });
  }


  /* ------------------------------------------------------------------
     8. APP SECTION — Phone slide + info fade
     ------------------------------------------------------------------ */
  var appPhone = document.querySelector('#u1656');
  var appInfo = document.querySelector('#pu1635');

  if (appPhone) {
    gsap.from(appPhone, {
      opacity: 0,
      x: -60,
      duration: 0.9,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: appPhone,
        start: 'top 85%',
        toggleActions: 'play none none none'
      }
    });
  }

  if (appInfo) {
    gsap.from(appInfo, {
      opacity: 0,
      x: 40,
      duration: 0.9,
      delay: 0.15,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: appInfo,
        start: 'top 85%',
        toggleActions: 'play none none none'
      }
    });
  }


  /* ------------------------------------------------------------------
     9. FOOTER — Subtle reveal
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

});
