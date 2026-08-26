"use client";

import { useEffect } from "react";

/**
 * Reveal au scroll (IntersectionObserver sur [data-reveal]).
 * L'animation se REJOUE à chaque passage dans le champ, pas seulement la
 * première fois.
 * Respecte prefers-reduced-motion : reveal instantané.
 *
 * NB : le smooth scroll JS (Lenis) a été retiré — il entrait en conflit avec
 * les widgets Elfsight (iframes chargées en différé) : molette « freinée » sur
 * la section Contact et scroll bloqué avant le bas de page. Le défilement est
 * désormais 100 % natif (les ancres restent fluides via scroll-behavior CSS).
 */
export default function Motion() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const els = document.querySelectorAll<HTMLElement>("[data-reveal]");
    if (reduce) {
      els.forEach((el) => el.classList.add("is-in"));
      return;
    }

    /* L'observation est PERMANENTE (pas de unobserve) : l'animation se rejoue
       à chaque fois que l'élément revient dans le champ, dans un sens comme
       dans l'autre. En sortant, on remet l'élément à son état de départ. */
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          const el = e.target as HTMLElement;
          if (e.isIntersecting) {
            const delay = el.dataset.revealDelay;
            if (delay) el.style.transitionDelay = `${delay}ms`;
            el.classList.add("is-in");
          } else {
            // Retour à l'état initial, sans délai pour que le rejeu soit franc.
            el.style.transitionDelay = "0ms";
            el.classList.remove("is-in");
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
    );
    els.forEach((el) => io.observe(el));

    // Filet de sécurité : si rien n'a été révélé (environnements dégradés),
    // on affiche tout pour ne jamais laisser de contenu invisible.
    const safety = window.setTimeout(() => {
      const revealed = document.querySelectorAll("[data-reveal].is-in").length;
      if (revealed === 0) {
        els.forEach((el) => el.classList.add("is-in"));
      }
    }, 1200);

    return () => {
      clearTimeout(safety);
      io.disconnect();
    };
  }, []);

  return null;
}
