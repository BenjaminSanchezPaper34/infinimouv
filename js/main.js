/* ==========================================================================
   INFINI MOUV - Main JS
   Lenis (smooth scroll) + GSAP/ScrollTrigger (animations)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ------------------------------------------------------------------
     1. Lenis — smooth scroll
     ------------------------------------------------------------------ */
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  // Sync Lenis with GSAP ScrollTrigger
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);

  /* ------------------------------------------------------------------
     2. Navigation — scroll effect + mobile menu
     ------------------------------------------------------------------ */
  const nav = document.querySelector('.nav');
  const burger = document.getElementById('navBurger');
  const navLinks = document.getElementById('navLinks');

  // Nav background on scroll
  if (nav) {
    ScrollTrigger.create({
      start: 'top -80',
      onUpdate: (self) => {
        if (self.scroll() > 80) {
          nav.classList.add('scrolled');
        } else {
          nav.classList.remove('scrolled');
        }
      },
    });
  }

  // Mobile burger toggle
  if (burger && navLinks) {
    burger.addEventListener('click', () => {
      burger.classList.toggle('active');
      navLinks.classList.toggle('open');
    });

    // Close menu on link click
    navLinks.querySelectorAll('.nav__link').forEach((link) => {
      link.addEventListener('click', () => {
        burger.classList.remove('active');
        navLinks.classList.remove('open');
      });
    });

    // Keyboard accessibility
    burger.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        burger.click();
      }
    });
  }

  /* ------------------------------------------------------------------
     3. Hero animations
     ------------------------------------------------------------------ */
  const heroContent = document.querySelector('.hero__content');
  const heroVideo = document.querySelector('.hero__video');

  if (heroContent) {
    // Fade out + scale hero text on scroll
    gsap.to(heroContent, {
      opacity: 0,
      scale: 0.95,
      y: -50,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });
  }

  if (heroVideo) {
    // Parallax on video
    gsap.to(heroVideo, {
      y: 150,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });
  }

  /* ------------------------------------------------------------------
     4. Reveal animations (sections, cards)
     ------------------------------------------------------------------ */
  const revealElements = document.querySelectorAll('.reveal');

  revealElements.forEach((el) => {
    gsap.fromTo(
      el,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      }
    );
  });

  /* ------------------------------------------------------------------
     5. Services list — staggered reveal
     ------------------------------------------------------------------ */
  const serviceItems = document.querySelectorAll('.services-list__item');

  if (serviceItems.length) {
    gsap.fromTo(
      serviceItems,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.12,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.services-list',
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    );
  }

  /* ------------------------------------------------------------------
     6. Feature cards — staggered reveal
     ------------------------------------------------------------------ */
  const featureCards = document.querySelectorAll('.feature-card');

  if (featureCards.length) {
    gsap.fromTo(
      featureCards,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.15,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.features',
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    );
  }

  /* ------------------------------------------------------------------
     7. Equipment cards — staggered reveal (services page)
     ------------------------------------------------------------------ */
  const equipCards = document.querySelectorAll('.equip-card');

  if (equipCards.length) {
    gsap.fromTo(
      equipCards,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.equipment-grid',
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    );
  }

  /* ------------------------------------------------------------------
     8. Cours items — staggered reveal (services page)
     ------------------------------------------------------------------ */
  const coursItems = document.querySelectorAll('.cours-item');

  if (coursItems.length) {
    gsap.fromTo(
      coursItems,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.cours-grid',
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    );
  }

  /* ------------------------------------------------------------------
     9. Pricing cards — reveal
     ------------------------------------------------------------------ */
  const pricingCards = document.querySelectorAll('.pricing-card');

  if (pricingCards.length) {
    gsap.fromTo(
      pricingCards,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.pricing',
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    );
  }

  /* ------------------------------------------------------------------
     10. Section labels — gradient text reveal
     ------------------------------------------------------------------ */
  const sectionLabels = document.querySelectorAll('.section__label');

  sectionLabels.forEach((label) => {
    gsap.fromTo(
      label,
      { opacity: 0, x: -30 },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: label,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      }
    );
  });

});
